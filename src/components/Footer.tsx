import styles from "@styles/Footer.module.css";

const Footer = () => {
	return (
		<footer className={styles.Footer}>
			<div>
				<p className={styles.Title}>Nosotros</p>
				<p className={styles.Text}>Conoce mas</p>
			</div>
			<div>
				<p className={styles.Title}>Servicios</p>
				<p className={styles.Text}> Pacientes</p>
				<p className={styles.Text}>Doctores</p>
			</div>
			<div>
				<p className={styles.Title}>Hecho para</p>
				<p className={styles.LlamaText}>
					Creadores de Next Js y llamas enfermas
				</p>
				<a className={styles.Text}>GitHub</a>
			</div>
		</footer>
	);
};

export { Footer };
