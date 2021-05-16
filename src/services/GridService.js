import {Client} from "../res/Client";
import {Urls} from "../res/Urls";

export const getAllProducts = async () =>{
    const res = await Client.GET({
        url:Urls.apiProducts.findAll,
        params:{
            page:0,
            size:8
        }
    })
    return res
}