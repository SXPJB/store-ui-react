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
            user = JSON.parse(sessionStorage.getItem("user"))
        }catch (e) {
            Utils.raise(e,"Error no se a logeado")
        }
        return user
    }

    static getActive(){
        let {isActive} =false
       try {
            isActive=JSON.parse(sessionStorage.getItem('user'))
       }catch (e){
            Utils.raise(e,"Error no se a logeado")
       }
        return isActive
    }
    static logout(){
        sessionStorage.removeItem("user")
        window.location.reload(false)
    }
}