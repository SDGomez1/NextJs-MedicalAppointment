import Link from "next/link";
import styles from "@styles/login.module.css";
import { type FormEvent, useState } from "react";
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
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

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
				<input
					name='Correo'
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<label>Contraseña</label>
				<input
					name='password'
					type='password'
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				<button type='submit'>Iniciar sesión</button>
			</form>
		</div>
	);
};

export default login;
