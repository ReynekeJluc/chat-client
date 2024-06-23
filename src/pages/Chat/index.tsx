import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';

import { Button } from '../../components/Button';
import { Message } from '../../components/Message';
import { MyMessage } from '../../components/MyMessage';

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
	const [params, setParams] = useState<paramsState>();
	const [state, setState] = useState<MessageState>();

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

	const [isAdmin, setIsAdmin] = React.useState(true);
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
				<Message isAdmin={isAdmin} nickname='Admin'></Message>
				<MyMessage></MyMessage>
				<Message isAdmin={!isAdmin} nickname='User'></Message>
			</main>
			<div className={styles.input_block}>
				<input type='text' placeholder='Message...' />
				<div className={styles.right_side}>
					<div className={styles.emoji_block}>
						{/* <EmojiPicker></EmojiPicker> */}
					</div>
					<Button title='Send'></Button>
				</div>
			</div>
		</>
	);
};
