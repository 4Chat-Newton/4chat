import { useState } from "react"
import { Link } from "react-router-dom"; //TODO add "Navigate" when needed
import "./settings.css"
import ButtonComponent from "../globalComponents/ButtonComponent";

export default function DeleteAccount() {

    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const handleUserInput = (e: any) => {
        const { id, value } = e.target;
        if (id === "password") {
            setPassword(value);
        }
        if (id === "confirmPassword") {
            setConfirmPassword(value);
        }
    }

    const handleSubmit = async (e: any) => {
        const {id} = e.target;
        if (password === confirmPassword) {
            //TODO fetch should be '/data/register'
            await fetch('http://localhost:8080/data/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    id: id,
                    password: password
                })
            })
                .then(function (response) {
                    // TODO remove when no longer needed after testing
                    console.log(response)
                    if (response.ok === true) {
                        //TODO add online status to body json
                        fetch('http://localhost:8080/data/login', {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                id: id,
                                password: password,
                            })
                        }).then(function (response) {
                            console.log(response)
                            if (response.ok === true) {
                                alert("Your account is deleted.")
                            } else {
                                alert("Something went wrong, Please check your password.")
                            }

                        });//.then(navigate("/room"))
                    }
                });
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
                                        type="password"
                                        autoComplete="current-password"
                                        placeholder="Password"
                                        onChange={(e) => handleUserInput(e)}
                                />
                                <input className="settingsInputFields"
                                        id="SettingsConfirmPassword"
                                        name="password"
                                        type="password"
                                        placeholder="Confirm password"
                                        onChange={(e) => handleUserInput(e)}
                                />
                                <ButtonComponent id="editUpdate_btn" className="Update_btn">Delete Account</ButtonComponent>
                        </div>
                </div>
</>);
}