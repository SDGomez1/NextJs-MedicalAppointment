import styles from "@styles/completeRegistration.module.css";
import { trpc } from "@/utils/trpc";
import type { FormEvent } from "react";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";

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
			if (!dbUser.IsDoctor) {
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

const completeRegistration = () => {
	const router = useRouter();
	const updateRole = trpc.user.updateRole.useMutation();
	const updatePhoneNumber = trpc.user.updatePhoneNumber.useMutation();
	const updateDOB = trpc.user.updateDateOfBirth.useMutation();

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const rolData: string = event.target.rol.value;
		const phNumberData: string = event.target.phNumber.value;
		const dobData: string = event.target.dob.valueAsDate;

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
					<select name='rol'>
						<option value='false'> Paciente</option>
						<option value='true'>Doctor</option>
					</select>
					<label>Numero de teléfono</label>
					<input
						type='text'
						name='phNumber'
					></input>
					<label>Fecha de nacimiento</label>
					<input
						type='date'
						name='dob'
						onChange={(e) => {
							e.target.valueAsDate;
						}}
					/>
					<button type='submit'>Crear cuenta</button>
				</form>
			</div>
		</div>
	);
};

export default completeRegistration;
