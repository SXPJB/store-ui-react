import CardComponent from "./CardComponent";
import React from "react";
import {getAllProducts} from "../services/GridService";

export default class GridCardComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            products:[]
        }
    }

    componentDidMount() {
        this.loadData()
    }

    async loadData(){
        const res = await getAllProducts()
        this.setState({products:res})
    }

    render() {
        return <div className="container">
            <div className="row">
                {this.state.products.map(d=>
                    <div key={d.id} className="col-sm-12 col-md-6 col-lg-4 py-3">
                        <CardComponent data={d}/>
                    </div>
                )}
            </div>
        </div>
    }
}