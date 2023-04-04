import Link from "next/link";
import styles from "@styles/login.module.css";
import { FormEvent } from "react";
import { signIn } from "next-auth/react";

import type { GetServerSideProps } from "next";
import { getServerAuthSession } from "@/server/auth";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const ctx = { req: context.req, res: context.res };
	const session = await getServerAuthSession(ctx);

	if (!session) {
		return {
			props: {},
		};
	}

	return {
		redirect: {
			destination: "/",
			permanent: true,
		},
	};
};
const login = () => {
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const email = event.target.Correo.value;
		const password = event.target.password.value;

		await signIn("credentials", {
			redirect: true,
			username: email,
			password: password,
			callbackUrl: "/",
		});
	};

	return (
		<div className={styles.Main}>
			<Link href='/'>
				<h1>Medical</h1>
			</Link>
			<form onSubmit={handleSubmit}>
				<label>Correo</label>
				<input name='Correo' />
				<label>Contraseña</label>
				<input
					name='password'
					type='password'
				/>
				<button type='submit'>Iniciar sesión</button>
			</form>
		</div>
	);
};

export default login;
