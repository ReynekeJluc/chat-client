import styles from './Button.module.scss';

interface Props {
	title: string;
	OnClick: (e: any) => void;
}

export const Button = (props: Props) => {
	return (
		<button onClick={props.OnClick} className={styles.connect}>
			{props.title}
		</button>
	);
};
