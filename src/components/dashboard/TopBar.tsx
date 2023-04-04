import styles from "@styles/dashboard/TopBar.module.css";
import { useSession, signOut } from "next-auth/react";
const TopBar = () => {
	return (
		<div className={styles.TopBar}>
			<h1>Medical</h1>
			<div className={styles.Container}>
				<div></div>
				<p>{useSession().data?.user.name}</p>
				<button onClick={() => signOut()}>Cerrar sesion</button>
			</div>
		</div>
	);
};

export { TopBar };
