import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import { Button } from '../../components/Button';

import { Message } from '../../components/Message';
import styles from './Chat.module.scss';

interface paramsState {
	[key: string]: string;
}
interface User {
	name: string;
}

interface MessageState {
	user: User;
	message: string;
}

const socket = io('https://chat-server-xkb3.onrender.com');

export const Chat = () => {
	const { search } = useLocation();
	const navigate = useNavigate();

	const pickerRef = useRef<HTMLDivElement | null>(null);
	const iconRef = useRef<HTMLDivElement | null>(null);

	const [params, setParams] = useState<paramsState>({ room: '', user: '' });
	const [state, setState] = useState<MessageState[]>([]);
	const [isDisable, setIsDisable] = useState(false);
	const [message, setMessage] = useState('');
	const [users, setUsers] = useState(0);

	useEffect(() => {
		const searchParams = Object.fromEntries(new URLSearchParams(search));
		setParams(searchParams);

		socket.emit('join', searchParams);
	}, []);

	useEffect(() => {
		socket.on('joinRoom', ({ data: { users } }) => {
			setUsers(users.length);
		});
	}, []);

	useEffect(() => {
		socket.on('message', ({ data }: { data: MessageState }) => {
			setState(st => [...st, data]);
		});
	}, []);

	useEffect(() => {
		function handleClickOutside(e: any) {
			if (
				pickerRef.current &&
				!pickerRef.current.contains(e.target) &&
				iconRef.current &&
				!iconRef.current.contains(e.target)
			) {
				setIsDisable(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [pickerRef, iconRef]);

	const handleClick = () => {
		setIsDisable(!isDisable);
	};

	const handleSend = (e: any) => {
		e.preventDefault();
		if (!message) return;

		socket.emit('sendMessage', { message, params });

		setMessage('');
	};

	const clickEmoji = (e: any) => {
		setMessage(`${message}` + `${e.native}`);
	};

	const clickLeftRoom = () => {
		socket.emit('leftRoom', { params });
		navigate('/');
	};

	return (
		<>
			<header>
				<h3>{params.room}</h3>
				<div className={styles.online}>
					<span>online: </span>
					<span>{users}</span>
				</div>
				<button onClick={clickLeftRoom} className={styles.leave_button}>
					Leave room
				</button>
			</header>
			<main>
				{state.map(({ message, user }, index) => (
					<Message
						key={index}
						nickname={user.name}
						messages={message}
						myNick={params.name}
					/>
				))}
			</main>
			<div className={styles.input_block}>
				<div className={styles.emoji_icon} onClick={handleClick} ref={iconRef}>
					<img src='../../../public/img/icons/emoji.png' alt='emoji' />
				</div>
				<div className={styles.emoji_block} ref={pickerRef}>
					{isDisable ? (
						<Picker
							data={data}
							onEmojiSelect={clickEmoji}
							maxFrequentRows={0}
							theme={'dark'}
							previewPosition={'none'}
						/>
					) : null}
				</div>
				<form onSubmit={handleSend}>
					<input
						value={message}
						onChange={e => setMessage(e.target.value)}
						type='text'
						placeholder='Message...'
					/>
				</form>
				<Button OnClick={handleSend} title='Send'></Button>
			</div>
		</>
	);
};
