import Swal from "sweetalert2";

export class Utils {

    static successToast(props){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire(props)
    }
    static swal(){
        return Swal
    }
    static swl(props){
        return Swal.fire(props)
    }
    static swlToast(config) {
        this.swl( Object.assign(config, {
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        }));
    }

    static swalError(text){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: text
        });
    }

    static swalSuccess(msg){
        Swal.fire({
            icon: 'success',
            toast: true,
            title: msg,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3500
        });
    }

    static raise (e, msg) {
        if (typeof e === "string") {
            throw new Error(e);
        } else if (Object.keys(msg)===0) {
            console.error("Error de sistema:", e);
            throw new Error("Error de sistema");
        } else {
            console.error("Error en proceso: " + msg.toLowerCase(), e);
            throw new Error("Error en proceso: " + msg.toLowerCase());
        }
    }

    static handle(e, msg) {
        if (typeof e === "string") {
            console.error(e);
        } else {
            try {
                Utils.raise(e, msg);
            } catch (e2) {
                Utils.handle(e2);
            }
        }
    }

    static getUser(){
        let user = null
        try {
            if(JSON.parse(sessionStorage.getItem("user"))){
                user = JSON.parse(sessionStorage.getItem("user"))
            }else{
                user = JSON.parse(localStorage.getItem("user"))
            }
        }catch (e) {
            Utils.raise(e,"Error no se a logeado")
        }
        return user
    }

    static getActive(){
        let {isActive} =false
       try {
            if(sessionStorage.getItem('user')){
                isActive=JSON.parse(sessionStorage.getItem('user'))
            }else{
                isActive=JSON.parse(localStorage.getItem('user'))
            }
       }catch (e){
            Utils.raise(e,"Error no se a logeado")
       }
        return isActive
    }
    static logout(){
        if(JSON.parse(sessionStorage.getItem("user"))){
            sessionStorage.removeItem("user")
        }else{
            localStorage.removeItem("user")
        }
        localStorage.removeItem("order")
        window.location.reload(false);
    }
    static goHome(props){
        sessionStorage.removeItem("user")
        props.history.push('/');
        window.location.reload(false);
    }
    static setOrder(order){
        localStorage.setItem("order",JSON.stringify(order))
    }
    static getOrder(){
        return JSON.parse(localStorage.getItem("order"))
    }
}