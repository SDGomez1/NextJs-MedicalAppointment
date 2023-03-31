import styles from "@styles/DoctorPage.module.css";
import { DoctorPageCard } from "./DoctorPageCard";
import { signIn } from "next-auth/react";
const DoctorPage = () => {
	return (
		<section className={styles.DoctorPage}>
			<h3>¿ Eres doctor ?</h3>
			<p>Descubre los beneficios que tenemos para ti</p>
			<div>
				<DoctorPageCard
					title='Haz seguimiento a tus pacientes'
					text='Ten toda la información disponible en tiempo real de tus pacientes.'
				/>
				<DoctorPageCard
					title='Actualiza tus horarios de atención'
					text='Haz visible tus horarios de atención y mantenlos actualizados semana a semana'
				/>
				<DoctorPageCard
					title='Recuerda tus citas pendientes'
					text='La plataforma de muestra todas las citas agendas pendientes, y la información disponible '
				/>
			</div>
			<button onClick={() => signIn()}>Accede Ahora</button>
		</section>
	);
};

export { DoctorPage };
