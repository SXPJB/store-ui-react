import {Utils} from "../res/Utils";
import {Client} from "../res/Client";
import {Urls} from "../res/Urls";

export const  getHistory = idOrder =>{
    let res = null;
    try {
        res = Client.GET({
           url:Urls.apiTracking.findByOrder,
           params:{
               idOrder
           }
        })
    }catch (e){
        Utils.raise(e,"Error al encontrar el historial")
    }
    return res;
}

export const insert = async (idOrder,direction) =>{
    try {
        await Client.POST({
            url:Urls.apiTracking.insert,
            data:{
                direction,
                idOrder:{
                    id:idOrder
                },
                createdBy:Utils.getUser().id
            }
        })
    }catch (e) {
        Utils.raise(e,"Error al insertar")
    }
}
export const deleteTracking = async (id)=>{
    try {
        await Client.GET({
            url: `${Urls.apiTracking.delete}/${id}`,
        })
    }catch (e){
        Utils.raise(e,"Error al entregar el pedido")
    }
}