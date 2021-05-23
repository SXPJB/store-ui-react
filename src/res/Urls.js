const baseURl = 'http://18.116.247.121:8080/';
//this is a explame data for base url api
const baseApi = {
    product: baseURl + "tproducts/",
    order: baseURl + "torders/",
    shoppingCart: baseURl + "tshopoingcart/",
    userControl: baseURl + "tusers/",
    tracking: baseURl + 'ttraking/'
}
//this is a exmple data for enpoint api
export const Urls = {
    apiProducts: {
        findAll: baseApi.product + 'findAll',
        insert: baseApi.product + 'insert',
        update: baseApi.product + 'update',
        delete: baseApi.product + 'delete'
    },
    apiOrder: {
        insert: baseApi.order + "insert",
        update: baseApi.order + "update",
        findAll: baseApi.order + "findAll",
        findOrderByUserPage: baseApi.order + "findOrderByUserPage",
        findOrderByUserSateC:baseApi.order + "findOrderByUserSateC"
    },
    apiShoppingCart: {
        insert: baseApi.shoppingCart + "insert",
        findShoppingCartByUserSateC: baseApi.shoppingCart + "findShoppingCartByUserSateC",
        delete: baseApi.shoppingCart + 'delete'
    },
    apiUserControl: {
        login: baseApi.userControl + "login",
        register: baseApi.userControl + "insert"
    },
    apiTracking: {
        findByOrder: baseApi.tracking + 'findByOrder',
        insert: baseApi.tracking + "insert",
        delete: baseApi.tracking + "delete"
    }
}