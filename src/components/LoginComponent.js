import {useState} from "react";
import {Redirect} from "react-router-dom";
import {login} from "../services/LoginService";
import {Utils} from "../res/Utils";
import { withRouter } from "react-router-dom";

function Login(props) {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const validateFrom = (username, password) => {
        console.log(username, password)
        if (username === "" && password === "") {
            Utils.swalError("El usuario y contrseñase son requeridos")
            return false
        }
        if (username === "") {
            Utils.swalError("El usuario es requeridos")
            return false
        }
        if (password === "") {
            Utils.swalError("La contraseña es requeridos")
            return false
        }
        return true
    }

    const redirectToHome = () => {
       props.history.push('/');
       window.location.reload(false);
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (validateFrom(username, password)) {
            login(username, password)
            if(Utils.getActive()){
                redirectToHome()
            }
        }
    }

    if (sessionStorage.getItem("user")) {
        return <Redirect to={"/"}/>
    }
    return (
        <div className="container h-100">
            <div className="row justify-content-center h-100">
                <div className="col-sm-12 align-self-center">
                    <form onSubmit={handleSubmit}>
                        <label className="form-label">Usuario</label>
                        <input className="form-control"
                               onChange={e => setUserName(e.target.value)}
                               type="text"/>
                        <label className="form-label">Contraseña</label>
                        <input className="form-control"
                               onChange={e => setPassword(e.target.value)}
                               type="password"/>
                        <div>
                            <button className="btn btn-primary mt-3">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default withRouter(Login);
