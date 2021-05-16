const baseURl='http://localhost:8080/';
//this is a explame data for base url api
const baseApi={
    product:baseURl+"tproducts/"
}
//this is a exmple data for enpoint api
export const Urls = {
    apiProducts:{
        findAll:baseApi.product+"findAll",
        insert:baseApi.product+"insert"
    }
}