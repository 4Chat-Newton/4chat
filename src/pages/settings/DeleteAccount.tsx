import {useState} from "react"
import {Link, useNavigate} from "react-router-dom"; //TODO add "Navigate" when needed
import "./settings.css"
import ButtonComponent from "../../components/globalComponents/ButtonComponent";
import {response} from "express";
import {API_BASE_URL} from "../../consts";

export default function DeleteAccount() {

    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const navigate = useNavigate();

    const handleUserInput = (e: any) => {
        const {id, value} = e.target;
        if (id === "SettingsPassword") {
            setPassword(value);
        }
        if (id === "SettingsConfirmPassword") {
            setConfirmPassword(value);
        }
    }

    const handleSubmitDelete = async () => {
        if (password === confirmPassword) {
            //TODO fetch should be '/data/register'
            await fetch(API_BASE_URL+ '/data/settings/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    username: localStorage.getItem("user_id"),
                    password: password
                })
            }).then((response) => {
                if (response.ok) {
                    alert("Account deleted!")
                    return true
                } else {
                    alert("Failed to delete account!")
                    return false
                }
            }).then((status) => {
                if (status) {
                    localStorage.clear()
                    navigate("/login")
                }
            }).catch((error) => {
                console.log(error)
            })
        } else {
            alert("The passwords don't match!")
        }
    }


    return (
        <div className="settingsBox">

            <h1 className="settingsH1">Delete profile</h1>

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
                                <button id="deleteUpdate_btn" className="Update_btn" onClick={handleSubmitDelete} >Delete account</button>
                        </div>
                </div>
);
}