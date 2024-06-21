import styles from './Input.module.scss';

interface Props {
	Title: string;
	Name: string;
	Value: string;
	Placeholder: string;
	OnChange: (name: string, e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (props: Props) => {
	return (
		<div className={styles.field}>
			<div className={styles.left_block}>{props.Title}</div>
			<input
				type='text'
				placeholder={props.Placeholder}
				onChange={e => props.OnChange(props.Name, e)}
				value={props.Value}
				autoComplete='off'
			/>
		</div>
	);
};
