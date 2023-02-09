const ListComponent: any = (props: any) => {
  return (
    <ul className="listComponent">
      {props.rooms.map((r: any, index: number) => {
        return (
          <li key={index}>
             <span>-- {r.name}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default ListComponent;
