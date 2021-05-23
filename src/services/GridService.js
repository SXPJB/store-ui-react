import {Client} from "../res/Client";
import {Urls} from "../res/Urls";
import {Utils} from "../res/Utils";

export const getAllProducts = async () =>{
    const res = await Client.GET({
        url:Urls.apiProducts.findAll,
        params:{
            page:0,
            size:8
        },
        muted:true
    })
    return res
}

export const deleteProduct = async id =>{
    try {
        await Client.GET({
            url:`${Urls.apiProducts.delete}/${id}`
        })
    }catch (e) {
        Utils.raise(e,"Error al eliminar el producto")
    }
}