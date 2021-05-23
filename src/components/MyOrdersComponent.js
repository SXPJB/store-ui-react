import React from "react";
import {withRouter} from "react-router-dom";
import {getMyOrders} from "../services/MyOrdersServices";
import CardDetailCart from "./DetailCartComponent";

class MyOrdersComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                id: 0,
                destinationDir: "",
                total: 0.0,
                sate: "",
                shopoingcartList: [],
                delivered: false
            }]
        }
    }


    async componentDidMount() {
        await this.loadData()
    }

    async loadData() {
        let res = await getMyOrders();
        this.setState({data: res})
    }

    viewDetail(event, id) {
        event.preventDefault()
        this.props.history.push({pathname: '/trackingOrder', state: {id}})
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 bg-dark text-white">
                        <h1>Mis pedidos</h1>
                    </div>
                    {this.state.data.map(d => (
                        <div className="col-11 mx-3 my-3 rounded shadow" key={d.id}>
                            <nav className="navbar navbar-dark bg-dark">
                                <div className="container-fluid">
                                    <h1 className="navbar-brand">No. {d.id}</h1>
                                    <h2 className="navbar-brand">Dirección de entrega: {d.destinationDir}</h2>
                                    <div className="d-flex">
                                        <h1 className="navbar-brand">
                                            {!d.delivered ?
                                                "En camino"
                                                : "Entregado"}
                                        </h1>
                                        <button className="btn btn-primary"
                                                data-toggle="tooltip" data-placement="top" title="Seguimiento de envio "
                                                onClick={(event) => this.viewDetail(event, d.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                                                <path
                                                    d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </nav>
                            {d.shopoingcartList.map((s, i) => (
                                <>
                                    <CardDetailCart buttonsVisible={false} data={s} key={i}/>
                                </>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default withRouter(MyOrdersComponent);