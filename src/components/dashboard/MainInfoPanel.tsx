import styles from "@styles/dashboard/MainInfoPanel.module.css";

const MainInfoPanel = (props: { title: string }) => {
	return (
		<div className={styles.MainInfoPanel}>
			<h4>{props.title}</h4>
		</div>
	);
};

export { MainInfoPanel };
