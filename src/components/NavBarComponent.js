import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import GridCardComponent from "./GridCardComponent";
import Login from "./LoginComponent";
import {Utils} from "../res/Utils";
import AdminPanelComponent from "./AdminPanelComponent";
import FromProductComponent from "./FromProductComponent";

function NavBarComponent(props) {

    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Store</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {
                                Utils.getUser() != null && Utils.getUser().rol === 1 ? <li className="nav-item">
                                    <Link to="/productPanel" className="nav-link active" aria-current="page" href="#">
                                        Administracion de productos
                                    </Link>
                                </li> : <></>
                            }
                            {
                                Utils.getUser() != null && Utils.getUser().rol === 2 ?
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Mis pedidos</a>
                                    </li> : <></>
                            }
                        </ul>
                        <div className="d-flex">
                            <button className="btn btn-dark m-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-cart-check" viewBox="0 0 16 16">
                                    <path
                                        d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                                    <path
                                        d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                </svg>
                            </button>
                            {
                                Utils.getUser() != null ?
                                    <button className="btn btn-outline-danger m-1" onClick={()=>Utils.logout()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" className="bi bi-power" viewBox="0 0 16 16">
                                            <path d="M7.5 1v7h1V1h-1z"/>
                                            <path
                                                d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z"/>
                                        </svg>
                                        {" "}Cerrar Sesion
                                    </button> :
                                    <Link to="/login" className="btn btn-outline-success m-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                            <path fill-rule="evenodd"
                                                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                        </svg>
                                        {" "}Iniciar Sesion
                                    </Link>
                            }
                        </div>
                    </div>
                </div>
            </nav>
            <div className="container-fluid py-3">
                <Switch>
                    <Route path="/productPanel/insert">
                        <FromProductComponent/>
                    </Route>
                    <Route path="/productPanel">
                        <AdminPanelComponent/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/">
                        <GridCardComponent/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
export default NavBarComponent