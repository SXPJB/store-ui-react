import React from "react";
import {Utils} from "../res/Utils";
import {withRouter} from "react-router-dom";
import {addCard, initialOrder} from "../services/ShoppongService";

class CardComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            idProduct:this.props.data.id,
            idOrder:0,
            amount:1
        }
    }

    handleChange = e => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        );
    }

    handleSubmit = async e => {
        e.preventDefault()
        if(!Utils.getUser()){
            this.props.history.push('/login')
        }else{
            if(!Utils.getOrder()||Utils.getOrder().state!=='C'){
                await initialOrder()
            }
            await addCard(this.state)
            setTimeout(()=>this.props.history.push('/checkout'),500)
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card">
                    <div className="card-header">
                        <h1>{this.props.data.title}</h1>
                    </div>
                    <div className="card-body">
                        <img
                            src={this.props.data.image1}
                            className="responsiveIMG"
                            alt={this.props.data.title}
                        />
                        <div className='py-3'>
                            <p>{this.props.data.description}</p>
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <p>
                                            Existencia: {this.props.data.inventary}
                                        </p>
                                    </div>
                                    <div className="col">
                                        <p className="text-end">
                                            Precio: ${new Intl.NumberFormat().format(this.props.data.price)}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <form className='row g-3 align-items-center'>
                            <div className="col-auto">
                                <label>Cantidad:</label>
                            </div>
                            <div className="col-4">
                                <input type="number"
                                       min="1"
                                       value={this.state.amount}
                                       onChange={this.handleChange}
                                       max={this.props.data.inventary}
                                       className="form-control"
                                       disabled={this.props.data.inventary === 0}
                                       name='amount'/>
                            </div>
                            <div className="col-auto">
                                <button type="submit"
                                        disabled={this.props.data.inventary === 0}
                                        onClick={this.handleSubmit}
                                        className="btn btn-outline-success">Agregar al carrito</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(CardComponent)