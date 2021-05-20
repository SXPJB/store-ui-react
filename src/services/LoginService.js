import {Utils} from "../res/Utils";
import {Client} from "../res/Client";
import {Urls} from "../res/Urls";

export const login = async (user) => {
    const usertemp = await Client.POST({
        url:Urls.apiUserControl.login,
        data:user,
        muted:true
    })
    if(usertemp==null){
        Utils.swalError("Datos incorrectos")
        return
    }
    usertemp.isActive=true
    if(user.remember){
        localStorage.setItem("user",JSON.stringify(usertemp))
    }else{
        sessionStorage.setItem("user",JSON.stringify(usertemp))
    }
}

export const register = userInfo =>{
    data.push(userInfo)
    Utils.swalSuccess("Gracias por confiar en nostros")
    return userInfo;
}

let data = [
    {
        id:1,
        email: "admin@admin.com",
        password: "123456",
        rol:1
    },
    {
        id:2,
        email: "cliente@cliente.com",
        password: "123456",
        rol: 2
    },
    {
        id:3,
        email: "paqueteria@paqueteria.com",
        password: "123456",
        rol: 3
    }
]