import style from './loading1.module.css'

const Loading1 = () => {
	return (
		<div className={style.loader}>
			<span className={style.letter}>L</span>
			<span className={style.letter}>o</span>
			<span className={style.letter}>a</span>
			<span className={style.letter}>d</span>
			<span className={style.letter}>i</span>
			<span className={style.letter}>n</span>
			<span className={style.letter}>g</span>
			<span className={style.letter}>.</span>
			<span className={style.letter}>.</span>
			<span className={style.letter}>.</span>
		</div>
	);
}
export default Loading1;