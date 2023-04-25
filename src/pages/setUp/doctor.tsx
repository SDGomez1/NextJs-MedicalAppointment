import { TopBar } from "@/components/dashboard/TopBar";
import { DayCheckBox } from "@/components/setUp/DayCheckBox";

import { type FormEvent, useEffect, useState } from "react";

import { getServerAuthSession } from "@/server/auth";
import { GetServerSideProps } from "next";

import styles from "@/styles/setUp/Doctor.module.css";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ctx = { req: context.req, res: context.res };
  const session = await getServerAuthSession(ctx);

  if (session) {
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

const doctorSetUp = () => {
  const router = useRouter()
  const updateInformation = trpc.doctor.updateFirstLogin.useMutation();
  const officesCities = trpc.office.getAllCities.useQuery().data;

  const [index, setIndex] = useState(1);

  const [city, setcity] = useState(
    officesCities != undefined ? officesCities[0].city : "Bogota"
  );

  const [sede, setSede] = useState(
    officesCities != undefined ? officesCities[0].name : "Sede Principal"
  );

  const [dayOfTheWeek, setDayOfTheWeek] = useState<string[]>([]);

  const sedesBycities = trpc.office.getSedesByCiudad.useQuery({ city: city });

  const citiesSelectors = officesCities?.map((cities) => {
    return (
      <option
        key={cities.id + "1"}
        value={cities.city}
      >
        {" "}
        {cities.city}
      </option>
    );
  });

  const sedesBycitiesSelector = sedesBycities.data?.map((sedes) => {
    return (
      <option
        key={sedes.id + "1"}
        value={sedes.name}
      >
        {" "}
        {sedes.name}
      </option>
    );
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
		console.log(sede)
      await updateInformation.mutateAsync({
        name: sede,
        dayOfTheWeek: "17:00",
        startTime: "08:00",
        endTime: "17:00",
      });
	  router.push('/dashboard/doctor')
	  
    } catch (e) {
      alert(e);
    }
  };
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
                <select onChange={(e) => setcity(e.currentTarget.value)}>
                  {citiesSelectors}
                </select>
              </div>
              <div>
                <label>Sede</label>
                <select
                  disabled={sedesBycitiesSelector ? false : true}
                  onChange={(e) => {
                    setSede(e.currentTarget.value);
                  }}
                >
                  {sedesBycitiesSelector}
                </select>
              </div>
              <button
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
              <p
                onClick={() => setIndex(1)}
                style={{ cursor: "pointer" }}
              >
                {" "}
                Ubicación y lugar de trabajo
              </p>
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

            <form onSubmit={handleSubmit}>
              <div className={styles.CheckboxContainer}>
                <label>Dias de atención</label>
                <DayCheckBox text='L' />
                <DayCheckBox text='M' />
                <DayCheckBox text='I' />
                <DayCheckBox text='J' />
                <DayCheckBox text='V' />
                <DayCheckBox text='S' />
                <DayCheckBox text='D' />
              </div>
              <div>
                <label>Hora de inicio</label>
                <input
                  type='time'
                  min='06:00'
                  required
                />
              </div>
              <div>
                <label>Hora de finalización</label>
                <input
                  type='time'
                  required
                />
              </div>
              <button type='submit' >Finalizar</button>
            </form>
          </div>
        </section>
      </div>
    );
  }
};

export default doctorSetUp;
