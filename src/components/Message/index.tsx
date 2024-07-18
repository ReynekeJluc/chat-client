import classNames from 'classnames';

import styles from './Message.module.scss';

interface Props {
	nickname: string;
	messages: string;
	myNick: string;
}

export const Message = (props: Props) => {
	return props.myNick !== props.nickname ? (
		<div
			className={classNames(styles.message_block, styles.other_message_block)}
		>
			<h6
				style={{
					color: 'var(--text-user)',
				}}
			>
				{props.nickname}
			</h6>
			<p className={styles.text_block}>{props.messages}</p>
		</div>
	) : (
		<div className={classNames(styles.message_block, styles.my_message_block)}>
			<h6>{props.myNick}</h6>
			<p className={styles.text_block}>{props.messages}</p>
		</div>
	);
};
