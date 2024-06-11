import styles from './Message.module.scss';

interface Props {
	isAdmin: boolean;
	nickname: string;
}

export const Message = (props: Props) => {
	return (
		<div className={styles.message_block}>
			<h6
				style={{
					color: props.isAdmin ? 'var(--text-admin)' : 'var(--text-user)',
				}}
			>
				{props.nickname}
			</h6>
			<p className={styles.text_block}>Some text</p>
		</div>
	);
};
