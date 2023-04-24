import styles from "@styles/dashboard/TopBar.module.css";
import { useSession, signOut } from "next-auth/react";
const TopBar = () => {
	const userName = useSession().data?.user.name;
	return (
		<div className={styles.TopBar}>
			<h1>Medical</h1>
			<div className={styles.Container}>
				<div>{userName?.charAt(1)}</div>
				<p>{userName}</p>
				<button onClick={() => signOut()}>Cerrar sesion</button>
			</div>
		</div>
	);
};

export { TopBar };
