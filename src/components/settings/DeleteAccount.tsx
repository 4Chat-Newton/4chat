import { useState } from "react"
import { Link } from "react-router-dom"; //TODO add "Navigate" when needed
import "./settings.css"
import ButtonComponent from "../globalComponents/ButtonComponent";

export default function DeleteAccount() {

    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const handleUserInput = (e: any) => {
        const { id, value } = e.target;
        if (id === "SettingsPassword") {
            setPassword(value);
        }
        if (id === "SettingsConfirmPassword") {
            setConfirmPassword(value);
        }
    }

    const handleSubmit = async () => {
        console.log("password === confirmPassword:", password === confirmPassword)
        if (password === confirmPassword) {
            //TODO fetch should be '/data/register'
            await fetch('http://localhost:8080/data/settings/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    username: localStorage.getItem("user_id"),
                    password: password
                })
            })
//                 .then(function (response) {
//                     // TODO remove when no longer needed after testing
//                     console.log(response)
//                     if (response.ok === true) {
//                         //TODO add online status to body json
//                         fetch('http://localhost:8080/data/settings/delete', {
//                             method: 'DELETE',
//                             headers: { 'Content-Type': 'application/json' },
//                             body: JSON.stringify({
//                                 id: id,
//                                 password: password,
//                             })
//                         }).then(function (response) {
//                             console.log(response)
//                             if (response.ok === true) {
//                                 alert("Your account is deleted.")
//                             } else {
//                                 alert("Something went wrong, Please check your password.")
//                             }
//
//                         });//.then(navigate("/room"))
//                     }
//                 });
        } else if (password !== confirmPassword) {
            alert("The passwords don't match!")
        }
    }


    return (<>

<div className="settingsBox">

                        <h1 className="settingsH1">Delete Profile</h1>

                        <div className="settingsFields">
                                <input className="settingsInputFields"
                                        id="SettingsPassword"
                                        name="password"
                                        type="test"
                                        autoComplete="current-password"
                                        placeholder="password"
                                        onChange={(e) => handleUserInput(e)}
                                />
                                <input className="settingsInputFields"
                                        id="SettingsConfirmPassword"
                                        name="password"
                                        type="test"
                                        placeholder="Confirm Password"
                                        onChange={(e) => handleUserInput(e)}
                                />
                                <button id="editUpdate_btn" className="Update_btn" onClick={handleSubmit} >Delete Account</button>
                        </div>
                </div>
</>);
}