import React from "react";
import {withRouter} from "react-router-dom";
import {deleteTracking, getHistory, insert} from "../services/TrackingService";
import {Utils} from "../res/Utils";

class TrackingOrderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:0,
            data: [],
            tracking: false
        }
    }

    async componentDidMount() {
        await this.loadData()
    }

    async loadData() {
        let data = await getHistory(this.props.location.state.id)
        this.setState({id:this.props.location.state.id,data, tracking: this.props.location.state.tracking})
    }

    async deleteTracking(id){
        await deleteTracking(id)
        window.location.reload(false)
    }

    insert(){
        Utils.swl({
            title: 'Ingresa la nueva direccion',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            showLoaderOnConfirm: true,
            cancelButtonText:"Cancelar",
            preConfirm: async (direction) => {
                await insert(this.state.id,direction)
                window.location.reload(false)
            },
            allowOutsideClick: () => !Utils.swal().isLoading()
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <table className="table table-stripe">
                    <thead className="table-dark">
                    <tr>
                        <th>Dirección</th>
                        <th>Fecha y hora</th>
                        {
                            this.state.tracking ? <th>
                                Acciones
                            </th> : <></>
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.data.map(d => (
                            <tr key={d.id}>
                                <td>{d.direction}</td>
                                <td>{d.createdAt}</td>
                                {
                                    this.state.tracking ?
                                        <td>
                                        <button className="btn btn-danger" onClick={()=>this.deleteTracking(d.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path
                                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                <path fillRule="evenodd"
                                                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                            </svg>
                                        </button>
                                        </td>
                                        : <></>
                                }
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                {
                    this.state.tracking ?
                        <div className="text-end">
                            <button className="btn btn-primary" onClick={()=>this.insert()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-plus-square" viewBox="0 0 16 16">
                                    <path
                                        d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                    <path
                                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                                {" "}
                                Nueva Direccion
                            </button>
                        </div> : <></>
                }
            </div>
        )
    }
}

export default withRouter(TrackingOrderComponent)