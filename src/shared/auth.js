import {api_url, http, base_url} from '../main';

export const auth_api = {
    login: async(loginData) => {
        let res = await http.post(api_url+'auth/login', loginData)
        return res.data
    }
}

export const isLogged = async () => {
    let ret = false;
    if(localStorage.getItem('username') && localStorage.getItem('token') && 
    localStorage.getItem('role_id')){
        let checkData = {
            username: localStorage.getItem('username'),
            token: localStorage.getItem('token'),
            role_id: localStorage.getItem('role_id')
        }
        
        let res = await http.post(api_url+'auth/checkLogin', checkData)

        if(res.data.message == "Existing"){
            ret = true;
        } else {
            ret = false;
        }
          
    } else {
        ret = false;
    }

    return ret;
}

export const isPermitted = (route_role = null) => {
    let count = 0;
    let ret = true;
    
    if(route_role != null && route_role != undefined){
        
        route_role.forEach(el => {
            if(el == localStorage.getItem('role_id')){
                count++;
                
            }
            
        });

        if(count > 0){
            ret = true;
        } else {
            ret = false;
        }
    } 

    return ret;
}