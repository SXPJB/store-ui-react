import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, Redirect
} from "react-router-dom";
import GridCardComponent from "./GridCardComponent";
import Login from "./LoginComponent";
import {Utils} from "../res/Utils";
import AdminPanelComponent from "./AdminPanelComponent";
import FromProductComponent from "./FromProductComponent";
import RegisterFromComponent from "./RegisterFromComponent";
import ShopingCartComponent from "./ShopingCartComponent";
import MyOrdersComponent from "./MyOrdersComponent";
import TrackingOrderComponent from "./TrakingOrderComponent";
import TrackingComponent from "./TrackingComponent";

function NavBarComponent() {

    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
                                Utils.getUser() != null && Utils.getUser().idRol.description === "Admin" ?
                                    <li className="nav-item">
                                        <Link to="/productPanel" className="nav-link active" aria-current="page"
                                              href="#">
                                            Administracion de productos
                                        </Link>
                                    </li> : <></>
                            }
                            {
                                Utils.getUser() != null ?
                                    <li className="nav-item">
                                        {
                                            Utils.getUser().idRol.description === "Paqueteria" || Utils.getUser().idRol.description === "Admin"?
                                                <Link className="nav-link" to="/tracking">Seguimiento</Link> :
                                                <Link className="nav-link" to="/myOrders">Mis pedidos</Link>
                                        }
                                    </li> : <></>
                            }
                        </ul>
                        <div className="d-flex">
                            {
                                Utils.getUser() != null  && (Utils.getUser().idRol.description === "Admin"||Utils.getUser().idRol.description === "Cliente")?
                                    <Link to="/checkout" className="btn btn-outline-primary m-1 text-white ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                                            <path
                                                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                        </svg>
                                    </Link> : <></>
                            }
                            {
                                Utils.getUser() != null ?
                                    <Link to="/" className="btn btn-outline-danger m-1 text-white"
                                          onClick={() => Utils.logout()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" className="bi bi-power" viewBox="0 0 16 16">
                                            <path d="M7.5 1v7h1V1h-1z"/>
                                            <path
                                                d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z"/>
                                        </svg>
                                    </Link> :
                                    <Link to="/login" className="btn btn-outline-success m-1 text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                            <path fillRule="evenodd"
                                                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                        </svg>
                                    </Link>
                            }
                        </div>
                    </div>
                </div>
            </nav>
            <div className="container-fluid py-3 mt-5">
                <Switch>
                    <Route path="/productPanel/from">
                        {Utils.getUser() != null ? <FromProductComponent/> : <Redirect to='/'/>}
                    </Route>
                    <Route path="/productPanel">
                        {Utils.getUser() != null ? <AdminPanelComponent/> : <Redirect to='/'/>}
                    </Route>
                    <Route path='/trackingOrder'>
                        {Utils.getUser() != null ? <TrackingOrderComponent/> : <Redirect to='/'/>}

                    </Route>
                    <Route path='/tracking'>
                        {Utils.getUser() != null ? <TrackingComponent/> : <Redirect to='/'/>}
                    </Route>
                    <Route path="/myOrders">
                        {Utils.getUser() != null ? <MyOrdersComponent/> : <Redirect to='/'/>}
                    </Route>
                    <Route path="/checkout">
                        {Utils.getUser() != null ? <ShopingCartComponent/> : <Redirect to='/'/>}
                    </Route>
                    <Route path="/register">
                        <RegisterFromComponent/>
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