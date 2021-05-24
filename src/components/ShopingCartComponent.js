import React from "react";
import {withRouter} from "react-router-dom";
import CardDetailCart from "./DetailCartComponent";
import {Utils} from "../res/Utils";
import {getShoppingCart, updateDirection} from "../services/ShoppongService";
import PayPal from "./PayPal";

class ShopingCartComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                total: 0
            },
            listProducts: [],
            destinationDir: "",
            isEditing: false,
            checkout:false
        }
    }

    async componentDidMount() {
        await this.loadData()
    }

    async loadData() {
        if(Utils.getOrder()){
            const res = await getShoppingCart(Utils.getOrder().id, Utils.getUser().id)
            this.setState({data: res, listProducts: res.shopoingcartList, destinationDir: res.destinationDir})
        }else{
            await Utils.swl({
                icon: 'info',
                title: 'Oops...',
                text: 'Auno no tienes nada en el carrito',
                allowOutsideClick:false
            })
        }
    }

    async updateDirection() {
        await updateDirection(this.state.destinationDir)
        this.setState({...this.state, isEditing: false})
    }

    handleChange = e => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        );
    }
    pay(){
        if(this.state.destinationDir!==""){
            Utils.swl({
                title: '¿Estas seguro?',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '¡Si!',
                cancelButtonText: "Cancelar",
                allowOutsideClick:false
            }).then((result) => {
                if (result.isConfirmed) {
                    this.setState({checkout: true})
                }
            })
        }else{
            Utils.swalError("Ingresa tu dirección de envio para poder continuar")
        }
    }

    render() {
        return (
            <div className='container-fluid shadow rounded'>
                <div className='row'>
                    <div className='col-sm-12 col-md-8 col-lg-8'>
                        <div className='container-fluid p-0'>
                            <div className='row bg-dark text-white'>
                                <h1 className='fw-bold'>Tu carrito</h1>
                            </div>
                        </div>
                        {this.state.listProducts.map(d => <CardDetailCart buttonsVisible={true} data={d} key={d.id}/>)}
                    </div>
                    <div className='mx-1 col-sm-12 col-md-3 col-lg-3'>
                        <div className='container-fluid p-0'>
                            <div className='row'>
                                <h1 className='fw-bold'>Resumen</h1>
                            </div>
                        </div>
                        <div className='container-fluid mt-3 p-0'>
                            <div className='row'>
                                <div className='col-12'>
                                    <hr/>
                                    <h3 className="fw-bold">Envío:</h3>
                                    <div className='container-fluid p-0'>
                                        <div className='row'>
                                            <div className='col-sm-12 col-md-12 col-lg-8'>
                                                <h4 className="fw-bold">Dirección:</h4>
                                                <input
                                                    placeholder="Ingresa tu direccion"
                                                    className="form-control"
                                                    name="destinationDir"
                                                    value={this.state.destinationDir}
                                                    onChange={this.handleChange}
                                                    type="text" readOnly={!this.state.isEditing}/>
                                            </div>
                                            <div className='col-sm-12 col-md-12 col-lg-4 align-items-center'>
                                                {this.state.isEditing ?
                                                    <button className="btn btn-success"
                                                            onClick={() => this.updateDirection()}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                             fill="currentColor" className="bi bi-save"
                                                             viewBox="0 0 16 16">
                                                            <path
                                                                d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
                                                        </svg>
                                                    </button> :
                                                    <button className='btn btn-outline-primary'
                                                            onClick={() => this.setState({
                                                                ...this.state,
                                                                isEditing: true
                                                            })}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                             fill="currentColor" className="bi bi-pencil"
                                                             viewBox="0 0 16 16">
                                                            <path
                                                                d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                                        </svg>
                                                    </button>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <hr/>
                                    <h3 className="fw-bold">Total: ${new Intl.NumberFormat().format(this.state.data.total)}</h3>
                                    <hr/>
                                </div>
                                {Utils.getOrder()?<div className="d-grid mb-3">
                                    {this.state.checkout ? <PayPal total={this.state.data.total}/> :
                                        <button className="btn btn-outline-success"
                                                onClick={() =>this.pay()}>Pagar</button>}
                                </div>:<></>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(ShopingCartComponent)

