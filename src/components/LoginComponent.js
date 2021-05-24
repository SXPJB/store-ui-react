import React from "react";
import {Link, Redirect} from "react-router-dom";
import {login} from "../services/LoginService";
import {Utils} from "../res/Utils";
import {withRouter} from "react-router-dom";
import Logo from '../logo.svg'
import "../App.css"

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            email:'',
            password:'',
            remember:false
        }
    }

    componentDidMount() {
        if(this.props.location && this.props.location.state){
            this.setState(this.props.location.state)
        }
    }

    redirectToHome = () => {
        this.props.history.push('/');
        window.location.reload(false);
    }

    handleChange = e => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = async e => {
        e.preventDefault()
        await login(this.state)
        if (Utils.getActive()) {
            this.redirectToHome()
        }
    }

    render() {
        if (sessionStorage.getItem("user")) {
            return <Redirect to={"/"}/>
        }
        return (
            <div className="container w-75 mt-5 rounded shadow">
                <div className="row align-items-stretch">
                    <div className="col bg-login d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded">
                    </div>
                    <div className="col p-5 rounded-end">
                        <div className="text-center">
                            <img className="App-logo" src={Logo} alt="React"/>
                        </div>
                        <h2 className="fw-bold text-center py-5">Bienvenido</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className="mb-4">
                                <label className="form-label">Correo electronico</label>
                                <input className="form-control"
                                       name="email"
                                       value={this.state.email}
                                       required={true}
                                       onChange={this.handleChange}
                                       type="email"/>
                            </div>
                            <div className="mb-4">
                                <label className="form-label">Contraseña</label>
                                <input className="form-control"
                                       name="password"
                                       value={this.state.password}
                                       onChange={this.handleChange}
                                       required={true}
                                       type="password"/>
                            </div>
                            <div className="mb-4 form-check">
                                <input type="checkbox"
                                       name="remember"
                                       value={this.state.remember}
                                       onChange={this.handleChange}
                                       className="form-check-input"/>
                                <label className="form-label">Recordarme</label>
                            </div>
                            <div className="d-grid">
                                <button className="btn btn-outline-success">Iniciar Sesión</button>
                            </div>
                            <div className="my-3">
                                <span>No tienes cuenta? <Link to="/register" className="link-info">Registrate</Link></span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }


}

export default withRouter(Login);
