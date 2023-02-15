import JoinedListItem from "./JoinedListItem";


const JoinedComponent: any = (props: any) => {
    return (
        <ul className="listComponent">
            {props.rooms.map((r: any, index: number) => {
                return <JoinedListItem key={index} room={r} />;
            })}
        </ul>
    );
};

export default JoinedComponent;