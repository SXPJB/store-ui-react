import React from "react";
import {withRouter} from "react-router-dom";
import {getMyOrders} from "../services/MyOrdersServices";
import CardDetailCart from "./DetailCartComponent";

class MyOrdersComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                id:0,
                destinationDir:"",
                total:0.0,
                sate:"",
                shopoingcartList:[],
                delivered:false
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

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 bg-dark text-white">
                        <h1>Mis pedidos</h1>
                    </div>
                    {this.state.data.map(d => (
                        <div className="col mt-2 rounded shadow">
                            <h1>No. Pedido: {d.id}</h1>
                            {d.shopoingcartList.map(s=>(
                                <>
                                    <CardDetailCart buttonsVisible={false} data={s}/>
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