import styles from "@styles/DoctorPageCard.module.css";

const DoctorPageCard = (props: { title: string; text: string }) => {
	return (
		<div className={styles.DoctorPageCard}>
			<p className={styles.Title}>{props.title}</p>
			<p className={styles.Text}> {props.text}</p>
		</div>
	);
};

export { DoctorPageCard };
