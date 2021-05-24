import React from "react";
import {addCard, deleteCart} from "../services/ShoppongService";
import {Utils} from "../res/Utils";

export default class CardDetailCart extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            inventary:0
        }
    }

    componentDidMount() {
        this.setState({inventary:this.props.data.idProduct.inventary})
    }

    async deleteProduct(id){
        Utils.swl({
            title: '¿Estas seguro de eliminarlo?',
            text: "!No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, bórralo!',
            cancelButtonText:"Cancelar",
            showLoaderOnConfirm: true,
            preConfirm: async ()=>{
                await deleteCart(id)
                window.location.reload(false)
            },
            allowOutsideClick: () => !Utils.swal().isLoading()
        })
    }

    async addOneProduct(data){
        Utils.swl({
            title: 'Ingresa la cantidad de productos',
            input: 'number',
            max:this.state.inventary,
            inputValidator: (value) => {
                if (!value) {
                    return 'El campo es requerido'
                }
                if(value>this.state.inventary){
                    return 'La cantidad excede del inventario'
                }
            },
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            showLoaderOnConfirm: true,
            cancelButtonText:"Cancelar",
            preConfirm: async (amount) => {
                await addCard({
                    idProduct:data.idProduct.id,
                    amount:amount
                })
                window.location.reload(false)
            },
            allowOutsideClick: () => !Utils.swal().isLoading()
        })
    }

    render() {
        return(
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6 mb-3 mt-3'>
                        <div className='text-center'>
                            <img className='img-mediana'
                                 src={this.props.data.idProduct.image1} alt={this.props.data.title}/>
                        </div>
                    </div>
                    <div className='col-sm-12 col-md-6 mb-3 mt-3'>
                        <h3>{this.props.data.idProduct.title}</h3>
                        <hr/>
                        <p>Precio: ${new Intl.NumberFormat().format(this.props.data.idProduct.price)}</p>
                        <p>Cantidad: {this.props.data.amount}</p>
                        <hr/>
                        <p>Subtotal: ${new Intl.NumberFormat().format(this.props.data.amount*this.props.data.idProduct.price)}</p>
                        {this.props.buttonsVisible?<>
                            <button className='btn btn-danger mt-4' onClick={()=>this.deleteProduct(this.props.data.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                     fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path
                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fillRule="evenodd"
                                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                                {" "}Eliminar producto
                            </button>
                            <button className='btn btn-outline-success mt-4 mx-2' onClick={()=>this.addOneProduct(this.props.data)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                     fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                    <path
                                        d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
                                </svg>{" "}Agregar más
                            </button>
                        </>:<></>}
                    </div>
                </div>
            </div>
        )
    }
}