import { TopBar } from "@/components/dashboard/TopBar";
import styles from "@/styles/setUp/Doctor.module.css";
import { useState } from "react";

const doctorSetUp = () => {
	const [index, setIndex] = useState(1);
	if (index == 1) {
		return (
			<div className={styles.MainContainer}>
				<TopBar />
				<section>
					<div className={styles.InformationContainer}>
						<div className={styles.StatusContainer}>
							<span>1</span>
							<p> Ubicación y lugar de trabajo</p>
							<p> {">"} </p>
							<span className={index == 1 ? styles.Selected : undefined}>
								2
							</span>
							<p className={index == 1 ? styles.Selected : undefined}>
								Horario de disponibilidad
							</p>
						</div>

						<div className={styles.TitleContainer}>
							<h3>Ubicación y lugar de trabajo</h3>
							<p>
								Escoge en que sede vas a trabajar, Dependiendo de la sede que
								escojas tendrás diferentes opciones de horario
							</p>
						</div>

						<form>
							<div>
								<label>Ciudad</label>
								<input></input>
							</div>
							<div>
								<label>Sede</label>
								<input></input>
							</div>
							<button
								type='submit'
								onClick={(e) => {
									e.preventDefault();
									setIndex(2);
								}}
							>
								Siguiente
							</button>
						</form>
					</div>
				</section>
			</div>
		);
	} else {
		return (
			<div className={styles.MainContainer}>
				<TopBar />
				<section>
					<div className={styles.InformationContainer}>
						<div className={styles.StatusContainer}>
							<span>1</span>
							<p> Ubicación y lugar de trabajo</p>
							<p> {">"} </p>
							<span className={index == 1 ? styles.Selected : undefined}>
								2
							</span>
							<p className={index == 1 ? styles.Selected : undefined}>
								Horario de disponibilidad
							</p>
						</div>

						<div className={styles.TitleContainer}>
							<h3>Horario de disponibilidad</h3>
							<p>
								Escoge tu horario de disponibilidad, selecciona los días en los
								que atenderás, y tu hora de inicio de jornada y tu hora de
								finalización.
							</p>
						</div>

						<form>
							<div>
								<label>Dias de atención</label>
								<input></input>
							</div>
							<div>
								<label>Hora de inicio</label>
								<input></input>
							</div>
							<div>
								<label>Hora de finalización</label>
								<input></input>
							</div>
							<button>Finalizar</button>
						</form>
					</div>
				</section>
			</div>
		);
	}
};

export default doctorSetUp;
