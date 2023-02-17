import JoinedListItem from "./JoinedListItem";


const JoinedComponent: any = (props: any) => {
    return (
        <ul className="listComponent">
            {props.rooms.map((r: any, index: number) => {
                return <JoinedListItem socketConnection={props.socketConnection} key={index} setRooms={props.setRooms} rooms={props.rooms} room={r} />;
            })}
        </ul>
    );
};

export default JoinedComponent;