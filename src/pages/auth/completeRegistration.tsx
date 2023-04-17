import type { GetServerSideProps } from "next";
import { type FormEvent, useState } from "react";
import { useRouter } from "next/router";

import { getServerAuthSession } from "@/server/auth";
import { trpc } from "@/utils/trpc";

import { prisma } from "@/server/db";

import styles from "@styles/auth/completeRegistration.module.css";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const ctx = { req: context.req, res: context.res };
	const session = await getServerAuthSession(ctx);
	if (session?.user.email) {
		const dbUser = await prisma.user.findUnique({
			where: {
				email: session.user.email,
			},
		});
		if (dbUser?.phoneNumber != null) {
			if (!dbUser.isDoctor) {
				return {
					redirect: {
						destination: "/dashboard/patient",
						permanent: true,
					},
				};
			}
			return {
				redirect: {
					destination: "/dashboard/doctor",
					permanent: true,
				},
			};
		}
	}
	return {
		redirect: {
			destination: "/",
			permanent: true,
		},
	};
};

const completeRegistration = (): JSX.Element => {
	const [rolData, setRolData] = useState("");
	const [phNumberData, setPhNumberData] = useState("");
	const [dobData, setDobData] = useState("");

	const updateRole = trpc.user.updateRole.useMutation();
	const updatePhoneNumber = trpc.user.updatePhoneNumber.useMutation();
	const updateDOB = trpc.user.updateDateOfBirth.useMutation();

	const router = useRouter();

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		updateRole.mutate({
			data: rolData,
		});

		updatePhoneNumber.mutate({
			data: Number(phNumberData),
		});

		updateDOB.mutate({
			data: dobData,
		});

		router.push("/patientDashboard");
	};
	return (
		<div className={styles.Main}>
			<div className={styles.BulletContainer}>
				<h1>Medical</h1>
				<div className={styles.TextContainer}>
					<div className={styles.Bullet}></div>
					<div className={styles.Text}>
						<h2>Mantente al dia con tus citas</h2>
						<p>Verifica la fecha hora y lugar de todas tus citas agendadas. </p>
					</div>
				</div>
				<div className={styles.TextContainer}>
					<div className={styles.Bullet}></div>
					<div className={styles.Text}>
						<h2>Ten toda la información de us pacientes</h2>
						<p>Ten la información disponible en tiempo real</p>
					</div>
				</div>
				<div className={styles.TextContainer}>
					<div className={styles.Bullet}></div>
					<div className={styles.Text}>
						<h2>Agenda de forma fácil y rápida</h2>
						<p>Agenda con tan solo 2 clicks</p>
					</div>
				</div>
			</div>
			<div className={styles.FormContainer}>
				<p>Termina de configurar tu cuenta</p>
				<form onSubmit={handleSubmit}>
					<label>Rol</label>
					<select
						name='rol'
						onChange={(e) => {
							setRolData(e.target.value);
						}}
					>
						<option value='false'> Paciente</option>
						<option value='true'>Doctor</option>
					</select>
					<label>Numero de teléfono</label>
					<input
						type='text'
						name='phNumber'
						onChange={(e) => {
							setPhNumberData(e.target.value);
						}}
						required
						minLength={8}
						maxLength={10}
					></input>
					<label>Fecha de nacimiento</label>
					<input
						type='date'
						name='dob'
						onChange={(e) => {
							setDobData(e.target.value);
						}}
						required
					/>
					<button type='submit'>Crear cuenta</button>
				</form>
			</div>
		</div>
	);
};

export default completeRegistration;
