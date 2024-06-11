import styles from './Input.module.scss';

interface Props {
	title: string;
	placeholder: string;
}

export const Input = (props: Props) => {
	return (
		<div className={styles.field}>
			<div className={styles.left_block}>{props.title}</div>
			<input type='text' placeholder={props.placeholder} />
		</div>
	);
};
