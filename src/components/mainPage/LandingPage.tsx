import landingAsset from "@img/landingAsset.svg";
import Image from "next/image";
import styles from "@styles/mainPage/LandingPage.module.css";
import { signIn } from "next-auth/react";

const LandingPage = () => {
	return (
		<section className={styles.LandingPage}>
			<div className={styles.TextContainer}>
				<h2>Agenda tu cita medica de forma sencilla </h2>
				<p>
					Con esta app tienes la posibilidad de revisar tus citas medicas,
					reservar con el doctor que prefieras y mucho más. No esperes mas para
					conocer la forma mas sencilla de mantenerte al dia con tu salud.
				</p>
				<div>
					<button className={styles.Register}>Registrate</button>
					<button
						className={styles.Book}
						onClick={() => signIn()}
					>
						Agenda tu cita
					</button>
				</div>
			</div>
			<Image
				src={landingAsset}
				alt='LandingIcon'
			></Image>
		</section>
	);
};

export { LandingPage };
