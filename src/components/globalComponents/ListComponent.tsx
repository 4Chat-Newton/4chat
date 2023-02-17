import RoomListItem from "./RoomListItem";

const ListComponent: any = (props: any) => {
    return (
        <ul className="listComponent">
            {props.rooms.map((r: any, index: number) => {                
                return <RoomListItem key={index} room={r} setRooms={props.setRooms} rooms={props.rooms} socketConnection={props.socketConnection}/>;
            })}
        </ul>
    );
};

export default ListComponent;
