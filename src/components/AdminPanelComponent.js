import React from "react";
import {deleteProduct, getAllProducts} from "../services/GridService";
import {withRouter} from "react-router-dom";
import {Utils} from "../res/Utils";

class AdminPanelComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 0
        }
    }

    async componentDidMount() {
        await this.loadData(this.state.page)
    }

    async loadData(page) {
        const res = await getAllProducts(this.state.page)
        this.setState({data: res})
    }

    editRegister(state) {
        state.edit = true
        this.props.history.push({pathname: '/productPanel/from', state})
    }

    nextPage = async () => {
        const nextPage = this.state.page + 1
        this.setState({page: nextPage})
        await this.loadData(this.state.page)
    }

    previousPage = async () => {
        if (this.state.page >= 0) {
            const previousPage = this.state.page - 1
            this.setState({page: previousPage})
            await this.loadData(this.state.page)
        } else {
            this.setState({page: 0})
        }
    }

    async deleteProduct(id) {
        Utils.swl({
            title: '¿Estas seguro de eliminarlo?',
            text: "!No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, bórralo!',
            cancelButtonText: "Cancelar",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                await deleteProduct(id)
                window.location.reload(false)
            },
            allowOutsideClick: () => !Utils.swal().isLoading()
        })

    }

    render() {
        return (
            <div className="container text-center">
                <table className="table table-stripe">
                    <thead>
                    <tr className="table-dark">
                        <th>No.</th>
                        <th>Titulo del producto</th>
                        <th>Descipción</th>
                        <th>Precio</th>
                        <th>Inventario</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.data.map((d, i) =>
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{d.title}</td>
                                <td>{d.description.slice(0, 20)}...</td>
                                <td>{d.price}</td>
                                <td>{d.inventary}</td>
                                <td>
                                    <button className="btn btn-secondary m-1" onClick={() => this.editRegister(d)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                            <path
                                                d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                        </svg>
                                    </button>
                                    <button className="btn btn-danger m-1" onClick={() => this.deleteProduct(d.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path
                                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                            <path fillRule="evenodd"
                                                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item">
                            <button
                                onClick={this.previousPage}
                                className="page-link" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>
                        <li className="page-item">
                            <button className="page-link">1</button>
                        </li>
                        <li className="page-item">
                            <button className="page-link">2</button>
                        </li>
                        <li className="page-item">
                            <button className="page-link">3</button>
                        </li>
                        <li className="page-item">
                            <button
                                onClick={this.nextPage()}
                                className="page-link" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </li>
                    </ul>
                </nav>

                <div className="text-end">
                    <button className="btn btn-primary" onClick={() => this.props.history.push('/productPanel/from')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-plus-square" viewBox="0 0 16 16">
                            <path
                                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path
                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                        {" "}
                        Nuevo producto
                    </button>
                </div>

            </div>
        )
    }
}

export default withRouter(AdminPanelComponent);