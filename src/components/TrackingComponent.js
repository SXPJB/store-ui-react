import React from "react";
import {withRouter} from "react-router-dom";
import {findAllOrders, setDelivered} from "../services/MyOrdersServices";

class TrackingComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    async componentDidMount() {
        await this.loadData()
    }

    async loadData() {
        let data = await findAllOrders()
        this.setState({data})
    }

    viewHistory(e,id){
        e.preventDefault()
        this.props.history.push({pathname: '/trackingOrder', state: {id,tracking:true}})
    }

    async setDelivered(id){
        await setDelivered(id)
        window.location.reload(false)
    }

    render() {
        return (
            <div className='container-fluid'>
                <table className="table table-stripe">
                    <thead className="text-center table-dark">
                    <tr>
                        <th>
                            No.
                        </th>
                        <th>
                            Cliente
                        </th>
                        <th>
                            Direccion de envio
                        </th>
                        <th>
                            Acciones
                        </th>
                    </tr>
                    </thead>
                    <tbody className='text-center'>
                    {
                        this.state.data.map(d => (
                            <tr key={d.id}>
                                <td>{d.id}</td>
                                <td>{d.idUser.idPerson.name}</td>
                                <td>{d.destinationDir}</td>
                                <td>
                                    {
                                        !d.delivered ? <button className="btn btn-info" onClick={()=>this.setDelivered(d.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor" className="bi bi-cart-check" viewBox="0 0 16 16">
                                                <path
                                                    d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                                                <path
                                                    d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                            </svg>
                                        </button> : <button className="btn btn-success" disabled={true}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor" className="bi bi-check-all" viewBox="0 0 16 16">
                                                <path
                                                    d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"/>
                                            </svg>
                                        </button>
                                    }
                                    <button className="btn btn-secondary mx-3" onClick={(event => {this.viewHistory(event,d.id)})}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" className="bi bi-book" viewBox="0 0 16 16">
                                            <path
                                                d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                                        </svg>
                                    </button>

                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default withRouter(TrackingComponent)