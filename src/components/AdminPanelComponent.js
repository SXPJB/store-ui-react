import React from "react";
import {getAllProducts} from "../services/GridService";
import {withRouter} from "react-router-dom";

class AdminPanelComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            data:[]
        }
    }

    componentDidMount() {
        this.loadData()
    }

    async loadData(){
        const res = await getAllProducts()
        this.setState({data:res})
    }

    editRegister (state){
        this.props.history.push({pathname:'/productPanel/insert',state})
    }

    render() {
        return (
            <div className="container text-center">
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>No.</th>
                        <th>Titulo del producto</th>
                        <th>Descipción</th>
                        <th>Presio</th>
                        <th>Inventario</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map(d=>
                                <tr key={d.id}>
                                    <th>{d.id}</th>
                                    <th>{d.title}</th>
                                    <th>{d.description.slice(0,20)}...</th>
                                    <th>{d.price}</th>
                                    <th>{d.inventary}</th>
                                    <th>
                                        <button className="btn btn-secondary m-1" onClick={()=>this.editRegister(d)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                <path
                                                    d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                            </svg>
                                        </button>
                                        <button className="btn btn-danger m-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path
                                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                <path fill-rule="evenodd"
                                                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                            </svg>
                                        </button>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <div className="text-end">
                   <button className="btn btn-primary" onClick={()=>this.props.history.push('/productPanel/insert')}>
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            className="bi bi-plus-square" viewBox="0 0 16 16">
                           <path
                               d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                           <path
                               d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                       </svg>{" "}
                       Nuevo producto
                   </button>
                </div>
            </div>
        )
    }
}
export default withRouter(AdminPanelComponent);