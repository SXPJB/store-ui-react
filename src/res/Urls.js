const baseURl = 'http://localhost:8080/';
//this is a explame data for base url api
const baseApi = {
    product: baseURl + "tproducts/",
    order: baseURl + "torders/",
    shoppingCart: baseURl + "tshopoingcart/",
    userControl: baseURl + "tusers/"
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
        findOrderByUserPage:baseApi.order + "findOrderByUserPage"
    },
    apiShoppingCart: {
        insert: baseApi.shoppingCart + "insert",
        findShoppingCartByUserSateC:baseApi.shoppingCart +"findShoppingCartByUserSateC"
    },
    apiUserControl:{
        login:baseApi.userControl+ "login"
    }
}