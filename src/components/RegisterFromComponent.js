import React from "react";
import {Link, withRouter} from "react-router-dom";
import Logo from '../logo.svg'
import {register} from "../services/LoginService";

class RegisterFromComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            name:"",
            paternalSurname:"",
            maternalSurname:"",
            rfc:"",
            email:"",
            password:"",
            confirmPassword:"",
            idRol:0
        }
    }

    handleChange = e => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        );
    }

    handleSubmit = e => {
        e.preventDefault()
        console.log("data: ",this.state)
        const state = register(this.state)
        this.props.history.push({pathname:'/login',state})
    }

    render() {
        return(
            <div className="container w-75 mt-5 rounded shadow">
                <div className="row align-items-stretch">
                    <div className="col bg-login d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded">
                    </div>
                    <div className="col p-5 rounded-end">
                        <div className="text-center">
                            <img src={Logo} className="img-grande" alt="logo react js ecomers"/>
                        </div>
                        <h2 className="fw-bold text-center py-5">Registro</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className="mb-4">
                                <label className="form-label">Nombre</label>
                                <input className="form-control"
                                       name="name"
                                       value={this.state.name}
                                       onChange={this.handleChange}
                                       required={true}
                                       type="text"/>
                            </div>
                            <div className="mb-4">
                                <label className="form-label">Apellido Paterno</label>
                                <input className="form-control"
                                       name="paternalSurname"
                                       value={this.state.paternalSurname}
                                       onChange={this.handleChange}
                                       required={true}
                                       type="text"/>
                            </div>
                            <div className="mb-4">
                                <label className="form-label">Apellido Materno</label>
                                <input className="form-control"
                                       name="maternalSurname"
                                       value={this.state.maternalSurname}
                                       onChange={this.handleChange}
                                       required={true}
                                       type="text"/>
                            </div>
                            <div className="mb-4">
                                <label className="form-label">RFC</label>
                                <input className="form-control"
                                       name="rfc"
                                       value={this.state.rfc}
                                       onChange={this.handleChange}
                                       maxLength="13"
                                       required={true}
                                       type="text"/>
                            </div>
                            <div className="mb-4">
                                <label className="form-label">Tipo de usuario</label>
                                <select className="form-select"
                                        name="idRol"
                                        required={true}
                                        value={this.state.idRol}
                                        onChange={this.handleChange}
                                        aria-label="Default select example">
                                    <option selected value="">Tipo de usauario</option>
                                    <option value="1">Cliente</option>
                                    <option value="2">Paqueteria</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="form-label">Correo Electronico</label>
                                <input className="form-control"
                                       name="email"
                                       required={true}
                                       value={this.state.email}
                                       onChange={this.handleChange}
                                       type="email"/>
                            </div>
                            <div className="mb-4">
                                <label className="form-label">Contraseña</label>
                                <input className="form-control"
                                       name="password"
                                       required={true}
                                       value={this.state.password}
                                       onChange={this.handleChange}
                                       type="password"/>
                            </div>
                            <div className="mb-4">
                                <label className="form-label">Confirmar contraseña</label>
                                <input className="form-control"
                                       name="confirmPassword"
                                       required={true}
                                       value={this.state.confirmPassword}
                                       onChange={this.handleChange}
                                       type="password"/>
                            </div>
                            <div className="d-grid">
                                <button className="btn btn-outline-success">Registrase</button>
                                <Link className="link-info mt-4" to="/login">Inicio de Sesión</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(RegisterFromComponent)