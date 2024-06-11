import EmojiPicker from 'emoji-picker-react';
import React from 'react';

import { Button } from '../../components/Button';
import { Message } from '../../components/Message';
import { MyMessage } from '../../components/MyMessage';

import styles from './Chat.module.scss';

export const Chat = () => {
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
						<EmojiPicker></EmojiPicker>
					</div>
					<Button title='Send'></Button>
				</div>
			</div>
		</>
	);
};
