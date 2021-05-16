import React from "react";
import {withRouter} from "react-router-dom";
import {insertProduct} from "../services/FormProductService";

class FromProductComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            id:0,
            title: "",
            description: "",
            price: 0.0,
            inventary: 0,
            image1: ""
        }
    }

    componentDidMount() {
        if(this.props.location && this.props.location.state){
            this.setState(this.props.location.state)
        }
    }

    resetState(){
        this.setState( {
            title: "",
            description: "",
            price: 0.0,
            inventary: 0,
            image1: ""
        })
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
        const res = await insertProduct(this.state)
        console.log("result",res)
        this.props.history.push('/productPanel')
    }

    cancelBtn=e=>{
        e.preventDefault()
        this.resetState()
        this.props.history.push('/productPanel')
    }
    viewImage = e =>{
        e.preventDefault()
        if(this.state.image1!==""){
            window.open(this.state.image1)
        }
    }

    render() {
        return (
            <div className="container-sm">
                <form onSubmit={this.handleSubmit}>
                    <label className="form-label">Titulo:</label>
                    <input className="form-control"
                           value={this.state.title}
                           onChange={this.handleChange}
                           type="text"
                           name="title"/>
                    <label className="form-label">Descipcion:</label>
                    <textarea className="form-control"
                              value={this.state.description}
                              onChange={this.handleChange}
                              name="description"
                              rows="4"/>
                    <div className="row mt-3 mb-3">
                        <div className="col-6">
                            <label className="form-label">Presio:</label>
                            <input className="form-control"
                                   value={this.state.price}
                                   onChange={this.handleChange}
                                   type="number"
                                   min="0" max="9999999.99" step="0.01"
                                   name="price"/>
                        </div>
                        <div className="col-6">
                            <label className="form-label">Inventario:</label>
                            <input className="form-control"
                                   value={this.state.inventary}
                                   onChange={this.handleChange}
                                   type="number"
                                   max="99999"
                                   min="0"
                                   name="inventary"
                            />
                        </div>
                    </div>
                    <label className="form-label">URL Imagen: </label>
                    <div className="row mb-3">
                        <div className="col-10">
                            <input className="form-control"
                                   value={this.state.image1}
                                   onChange={this.handleChange}
                                   name="image1"/>
                        </div>
                        <div className="col-2">
                            <button className="btn btn-secondary btn-block" onClick={this.viewImage}>Ver</button>
                        </div>
                    </div>
                    <div className="text-end mx-auto">
                        <button className="btn btn-danger m-1"
                                onClick={this.cancelBtn}>Cancelar
                        </button>
                        <button className="btn btn-primary m-1">Agregar</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(FromProductComponent)