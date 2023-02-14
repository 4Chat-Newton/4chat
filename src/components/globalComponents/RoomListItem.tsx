import { useState } from "react";
import { useGlobalState, GlobalStateInterface } from "../../GlobalContext";
import { useForm } from "react-hook-form";

const RoomListItem: any = (props: any) => {
    const [isShown, setIsShown] = useState(false);
    const { setUserContext, userContext } = useGlobalState();
    const { handleSubmit } = useForm();


    const joinRoom = async ()=>{
        console.log(props.room.id)
        if (props.room.id) {
            fetch("http://localhost:8080/data/room/join", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    user_id: localStorage.getItem("user_id"),
                    room_id: props.room.id
                }),
            }).then(function (response) {
                if (response.ok) {
                    alert(`Joined room #${props.room.name}!`);
                    //setUserContext((prev) => ({ ...prev, ...props.room.name }));
                    setUserContext(props.room.name)
                } else {
                    alert(`You've already joined #${props.room.name}!`);
                }
            });

        } else {
            alert(`#${props.room.name} doesn't exist!`)
        }
    }

    const submitFunction = (data: Partial<GlobalStateInterface>) => {
        setUserContext(props.room.name)
        setUserContext((prev) => ({ ...prev, ...props.room.name }));
        console.log(userContext.activeRoom)
      };

    return (
        <li className="listItemRoom" onMouseEnter={() => setIsShown(true)} onMouseLeave={()=>setIsShown(false)} onClick={handleSubmit(submitFunction)}>
            <div>
            <span>#</span>
            {props.room.name}
            </div>
            {isShown && (
                <button> + </button>
            )}
        </li>
    );
};

export default RoomListItem;
