import axios from "axios";
import { Utils } from "./Utils";

export class Client {

    static async GET(params) {
        let response = null;
        try {

            if (Object.keys(params) === 0 || params.url == null) {
                throw new Error("Falta url")
            }

            let requestParamas = {
                method: 'get',
                url: params.url,
                headers: params.headers,
                params: params.params,
                timeout: params.timeout,
                auth: params.auth,
                muted:params.muted||false,
                catch: function (e) {
                    if (e.response) {
                        let msg = null,
                            res = e.response;
                        switch (res.status) {
                            case 400:
                                if (res.message) {
                                    msg = res.message;
                                } else {
                                    msg = "Error de par\u00e1metros";
                                }
                                Utils.swalError(msg);
                                break;
                            case 401:
                                msg = "Usuario no autenticado o token vencido, favor de acceder nuevamente";
                                if (params.failureMsg) {
                                    msg = params.failureMsg + ". " + msg;
                                }
                                Utils.swalError(msg);
                                break;
                            case 403:
                                msg = "Permiso denegado";
                                if (params.failureMsg) {
                                    msg = params.failureMsg + ". " + msg;
                                }
                                Utils.swalError(msg);
                                break;
                            case 404:
                                if (res.message) {
                                    msg = res.message;
                                } else {
                                    msg = "No se encontraron datos";
                                }
                                if (params.failureMsg) {
                                    msg = params.failureMsg + ". " + msg;
                                }
                                Utils.swalError(msg);
                                console.error('Not found');
                                break;
                            case 500:
                                Utils.swalError("Error de servidor por favor comunicarse con el soporte tecnico");
                                break;
                            default:
                                if (res.message) {
                                    msg = res.message;
                                } else {
                                    msg = "Error de sistema";
                                }
                                if (params.failureMsg) {
                                    msg = params.failureMsg + ". " + msg;
                                }
                                Utils.swalError(msg);
                                Utils.raise(e,"Error en la peticion")
                        }
                    } else if (e.request) {
                        Utils.swalError('Error de servidor por favor comunicarse con el soporte tecnico');
                        Utils.raise(e,"Error en la comunicacion")
                    }
                    return
                }
            };

            let res = await axios(requestParamas).catch(requestParamas.catch)
            if (res === undefined) {
                response = []
            }else{
                if(res.data.success){
                    response = res.data.data;
                    if(response===null){
                        response = []
                    }
                    if(!params.muted){
                        Utils.swlToast({
                            icon: 'success',
                            text: res.data.message
                        })
                    }
                }
            }
        } catch (e) {
            Utils.raise(e, 'Error al proceso')
        }
        return response
    }

    static async POST(params){

        let response = null;
        try {

            if (Object.keys(params) === 0 || params.url == null) {
                throw new Error("Falta url")
            }

            let requestParamas = {
                method: 'post',
                url: params.url,
                headers: params.headers,
                params: params.params,
                data:params.data,
                timeout: params.timeout,
                auth: params.auth,
                muted:params.muted||false,
                catch: function (e) {
                    if (e.response) {
                        let msg = null,
                            res = e.response;
                        switch (res.status) {
                            case 400:
                                if (res.message) {
                                    msg = res.message;
                                } else {
                                    msg = "Error de par\u00e1metros";
                                }
                                Utils.swalError(msg);
                                break;
                            case 401:
                                msg = "Usuario no autenticado o token vencido, favor de acceder nuevamente";
                                if (params.failureMsg) {
                                    msg = params.failureMsg + ". " + msg;
                                }
                                Utils.swalError(msg);
                                break;
                            case 403:
                                msg = "Permiso denegado";
                                if (params.failureMsg) {
                                    msg = params.failureMsg + ". " + msg;
                                }
                                Utils.swalError(msg);
                                break;
                            case 404:
                                if (res.message) {
                                    msg = res.message;
                                } else {
                                    msg = "No se encontraron datos";
                                }
                                if (params.failureMsg) {
                                    msg = params.failureMsg + ". " + msg;
                                }
                                Utils.swalError(msg);
                                console.error('Not found');
                                break;
                            case 500:
                                Utils.swalError("Error de servidor por favor comunicarse con el soporte tecnico");
                                break;
                            default:
                                if (res.message) {
                                    msg = res.message;
                                } else {
                                    msg = "Error de sistema";
                                }
                                if (params.failureMsg) {
                                    msg = params.failureMsg + ". " + msg;
                                }
                                Utils.swalError(msg);
                        }
                    } else if (e.request) {
                        Utils.swalError('Error de servidor por favor comunicarse con el soporte tecnico');
                    }
                    return
                }
            };

            let res = await axios(requestParamas).catch(requestParamas.catch)
            if (res === undefined) {
                response = null
            }else{
                if(res.data.success){
                    response = res.data.data;
                    if(!params.muted){
                        Utils.swlToast({
                            icon: 'success',
                            text: res.data.message
                        })
                    }
                }else{
                    response = res.data.data;
                }
            }
        } catch (e) {
            Utils.raise(e, 'Error al proceso')
        }
        return response

    }
}