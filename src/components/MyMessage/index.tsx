import styles from './MyMessage.module.scss';

export const MyMessage = () => {
	return (
		<div className={styles.message_block}>
			<h6>Ya</h6>
			<p className={styles.text_block}>Some text</p>
		</div>
	);
};
