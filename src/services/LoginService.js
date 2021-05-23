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

export const register = async userInfo =>{
    let user = userInfo;
    try {
        await Client.POST({
            url:Urls.apiUserControl.register,
            data:{
                email: user.email,
                idPerson: {
                    maternalSurname: user.maternalSurname,
                    name: user.name,
                    paternalSurname: user.paternalSurname,
                    rfc: user.rfc,
                },
                idRol: {
                    id: user.idRol,
                },
                password: user.password
            }
        })
        Utils.swalSuccess("Gracias por confiar en nostros")
    }catch (e){
        user = null
        Utils.raise(e,"Error al regitrar el usuario")
    }
    return user;
}