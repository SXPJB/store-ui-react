import {Urls} from "../res/Urls";
import {Client} from "../res/Client"
import {Utils} from "../res/Utils";

export const insertProduct = async (product) =>{
    console.log("Procuto",product)
    let res = null
    try {
         res = await Client.POST({
            url:Urls.apiProducts.insert,
            data:product
        })
    }catch (e){
        Utils.raise(e,"Error al insertar")
    }
    return res
}