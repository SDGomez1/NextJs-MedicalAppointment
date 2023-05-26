const MainInfoPanelCard = (props: {
  title: string;
  patient: string;
  site: string;
  hospital: string;
  link: string;
}) => {
  return (
    <div>
      <div>
        <h4>{props.title}</h4>
        <p>{props.patient}</p>
        <p>{props.site}</p>
        <p>{props.hospital}</p>
      </div>
      <div>
        <a href={props.link}>Más Información</a>
      </div>
    </div>
  );
};

export { MainInfoPanelCard };
