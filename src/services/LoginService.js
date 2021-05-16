import {Utils} from "../res/Utils";

export const login = (email,password) => {
    let user = data.filter(d => d.email===email&&d.password===password)
    if(user.length===0) {
        Utils.swalError("Datos incorrectos")
        return
    }
    user[0].isActive=true
    sessionStorage.setItem("user",JSON.stringify(user[0]))
}

const data = [
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