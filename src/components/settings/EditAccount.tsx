import {useState} from "react"
import {Link} from "react-router-dom"; //TODO add "Navigate" when needed
import ButtonComponent from "../globalComponents/ButtonComponent";

export default function EditAccount() {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const handleUserInput = (e: any) => {
        const {id, value} = e.target;
        if (id === "SettingsEmail") {
            setEmail(value);
        }
        if (id === "SettingsPassword") {
            setPassword(value);
        }
        if (id === "SettingsConfirmPassword") {
            setConfirmPassword(value);
        }
    }

    const handleSubmitEditProfile = async () => {
        if (email && password && confirmPassword) {
            updateEmail()
         //   updatePassword()
        } else if (email && !password && !confirmPassword) {
            //PUT update email
            updateEmail()
        } else if (!email && password === confirmPassword) {
            //PUT update password
         //  updatePassword()
        }else{
            alert("Enter Email or Password or both! ")
        }
    }

    const updateEmailAndPassword = async () => {

    }

    const updateEmail = async () => {
        if (password === confirmPassword) {
            await fetch('http://localhost:8080/data/settings/email', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    email: email
                })
            }).then((response) => {
                if (response.ok) {
                    alert("E-mail changed successfully")
                } else {
                    alert("Could not change e-mail")
                }
            })
        }

    }

    const updatePassword =  async () => {
        if (password === confirmPassword) {
            await fetch('http://localhost:8080/data/settings/password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    password: password
                })
            }).then((response) => {
                if (response.ok) {
                    alert("Password changed successfully")
                } else {
                    alert("Could not change password")
                }
            })
        }
    }

    return (<>
        <div className="settingsBox">

            <h1 className="settingsH1">Edit Profile</h1>

            <div className="settingsFields">

                <input className="settingsInputFields"
                       id="SettingsEmail"
                       name="email"
                       type="email"
                       placeholder="Email"
                       autoComplete="email"
                       onChange={(e) => handleUserInput(e)}
                />
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
                <button id="editUpdate_btn" className="Update_btn" onClick={handleSubmitEditProfile}>Update</button>
            </div>
        </div>
    </>);
}