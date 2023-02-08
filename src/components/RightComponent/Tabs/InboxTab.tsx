import TabComponent from "../../GlobalComponents/TabComponent";

const InboxTab = () =>{

    return (
        <TabComponent className="InboxTab">
            <h2>DM</h2>
            {Array(50).fill(null).map(() => (<p>HelloHelloHelloHello</p>))}
        </TabComponent>
    );
};
export default InboxTab