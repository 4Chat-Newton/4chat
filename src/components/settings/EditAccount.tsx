import { useState } from "react"
import { Link } from "react-router-dom"; //TODO add "Navigate" when needed
import ButtonComponent from "../globalComponents/ButtonComponent";

export default function EditAccount() {

        const [email, setEmail] = useState(null);
        const [password, setPassword] = useState(null);
        const [confirmPassword, setConfirmPassword] = useState(null);

        const handleUserInput = (e: any) => {
                const { id, value } = e.target;
                if (id === "email") {
                        setEmail(value);
                }
                if (id === "password") {
                        setPassword(value);
                }
                if (id === "confirmPassword") {
                        setConfirmPassword(value);
                }
        }

        const handleSubmitEditProfile = async () => {
                      if(!email && !password){
                         //PUT update email && password
                              updateEmailAndPassword()
                      }else if(!email){
                      //PUT update email
                              updateEmail()
                }else if(!password){
                           //PUT update password
                             updatePassword()
                }
                //if (password === confirmPassword) {

                        //TODO fetch should be '/data/register'
                        await fetch('http://localhost:8080/data/settings/email', {
                                method: 'PUT',
                                headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                                },
                                body: JSON.stringify({
                                        email: localStorage.getItem("email")
                                })
                        }).then((response) => {
                                if (response.ok === true) {
                                        alert("E-mail changed successfully")
                                } else {
                                        alert("Could not change e-mail")
                                }
                        });
                }

        const updateEmailAndPassword = ()=>{


        }

        const updateEmail = ()=>{

        }

        const updatePassword = ()=>{

        }

// .then(function (response) {
//         // TODO remove when no longer needed after testing
//         console.log(response)
//         if (response.ok === true) {
//                 //TODO add online status to body json
//                 fetch('http://localhost:8080/data/settings/edit', {
//                         method: 'PUT',
//                         headers: { 'Content-Type': 'application/json' },
//                         body: JSON.stringify({
//                                 email: email,
//                                 password: password,
//                         })
// } else if (password !== confirmPassword) {
//         alert("The passwords don't match!")
// } else {
//         alert("You need to type in your new e-mail and password") // Ska man kunna byta e-mail?
// }

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