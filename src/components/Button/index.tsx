import styles from './Button.module.scss';

interface Props {
	title: string;
}

export const Button = (props: Props) => {
	return <button className={styles.connect}>{props.title}</button>;
};
