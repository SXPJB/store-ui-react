import {Utils} from "../res/Utils";
import {Client} from "../res/Client"
import {Urls} from "../res/Urls";

export const getMyOrders = async () => {
    let res = null;
    try {
        res = await Client.GET({
            url:Urls.apiOrder.findOrderByUserPage,
            params:{
                idUser:Utils.getUser().id
            }
        })
    } catch (e) {
        Utils.raise(e, "Error al optener mis ordenes")
    }
    return res;
}