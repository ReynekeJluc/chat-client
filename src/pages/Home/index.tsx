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
					<div className={styles.field}>
						<div className={styles.left_block}>Your nick:</div>
						<input type='text' placeholder='nickname...' />
					</div>
					<div className={styles.field}>
						<div className={styles.left_block}>Room name:</div>
						<input type='text' placeholder='room name...' />
					</div>
				</div>
				<button className={styles.connect}>Connect</button>
			</form>
		</>
	);
};
