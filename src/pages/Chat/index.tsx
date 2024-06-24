import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import { Button } from '../../components/Button';

import styles from './Chat.module.scss';

interface paramsState {
	[key: string]: string;
}
interface MessageState {
	[key: string]: Array<string>;
}

interface User {
	name: string;
}

interface MessageData {
	user: User;
	message: string;
}

const socket = io('http://localhost:3000');

export const Chat = () => {
	const { search } = useLocation();
	const pickerRef = useRef<HTMLDivElement | null>(null);
	const iconRef = useRef<HTMLDivElement | null>(null);
	const [params, setParams] = useState<paramsState>();
	const [state, setState] = useState<MessageState>();
	const [isDisable, setIsDisable] = useState(false);

	useEffect(() => {
		const searchParams = Object.fromEntries(new URLSearchParams(search));
		setParams(searchParams);

		socket.emit('join', searchParams);
	}, []);

	useEffect(() => {
		socket.on('message', ({ data }: { data: MessageData }) => {
			setState(s => {
				const newState = { ...s };
				if (!newState[data.user.name]) {
					newState[data.user.name] = [];
				}
				newState[data.user.name].push(data.message);
				return newState;
			});
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

	return (
		<>
			<header>
				<h3>Name room</h3>
				<div className={styles.online}>
					<span>online: </span>
					<span>5</span>
				</div>
				<a href='?' className={styles.leave_button}>
					Leave room
				</a>
			</header>
			<main>
				{/*<MyMessage></MyMessage>
				<Message isAdmin={!isAdmin} nickname='User'></Message> */}
			</main>
			<div className={styles.input_block}>
				<div className={styles.emoji_icon} onClick={handleClick} ref={iconRef}>
					<img src='../../../public/img/icons/emoji.png' alt='emoji' />
				</div>
				<div className={styles.emoji_block} ref={pickerRef}>
					{isDisable ? (
						<Picker
							data={data}
							onEmojiSelect={console.log}
							maxFrequentRows={0}
							theme={'dark'}
							previewPosition={'none'}
						/>
					) : null}
				</div>
				<input type='text' placeholder='Message...' />
				<Button title='Send'></Button>
			</div>
		</>
	);
};
