import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import styles from './Home.module.scss';

interface ValuesState {
	[key: string]: string;
}

const NAME = 'name';
const ROOM = 'room';

export const Home = () => {
	const [values, setValues] = React.useState<ValuesState>({
		[NAME]: '',
		[ROOM]: '',
	});

	const handleChange = (
		name: string,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setValues({ ...values, [`${name}`]: e.target.value });
	};

	const handleClick = () => {
		console.log('Join');
	};

	return (
		<>
			<div className={styles.title_block}>
				<h2 className={styles.title}>ANONYM</h2>
				<h2 className={styles.title_sub}>OUS</h2>
			</div>
			<form className={styles.form_join} action='?'>
				<div className={styles.greeting}>
					<span>Greeting to you, </span>
					<span>stranger</span>
				</div>
				<div className={styles.fields}>
					<Input
						Title='Your nick:'
						Name={NAME}
						Placeholder='nickname...'
						Value={values[NAME]}
						OnChange={handleChange}
					></Input>
					<Input
						Title='Room name:'
						Name={ROOM}
						Placeholder='room name...'
						Value={values[ROOM]}
						OnChange={handleChange}
					></Input>
				</div>
				<Link to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}>
					<Button title='Connect' OnClick={handleClick}></Button>
				</Link>
			</form>
		</>
	);
};
