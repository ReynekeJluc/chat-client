import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import styles from './Home.module.scss';

export const Home = () => {
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
					<Input title='Your nick:' placeholder='nickname...'></Input>
					<Input title='Room name:' placeholder='room name...'></Input>
				</div>
				<Button title='Connect'></Button>
			</form>
		</>
	);
};
