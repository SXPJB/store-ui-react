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
        Utils.raise(e,"Error al guardar")
    }
    return res
}

export const updateProduct = async (product) => {
    try {
        product.price=parseFloat(product.price.toString()).toFixed(2)
        product.inventary=parseInt(product.inventary.toString())
        product.modifiedBy=Utils.getUser().id
        console.log("procudt",product)
        await Client.POST({
            url: `${Urls.apiProducts.update}/${product.id}`,
            data: product
        })
    }catch (e){
        Utils.raise(e,"Error al actualizar")
    }
}