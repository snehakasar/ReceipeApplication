import axios from './http'

class UserServices{
    login(data){
        return axios.post(`/users/login`,data)
        .then(response => {
            if (response.data) {
            sessionStorage.setItem("token", JSON.stringify(response.data));
            }
    
            return response.data;
          });
    }
    logout(){
        sessionStorage.removeItem("token")
    }
    getUsername(){
        return JSON.parse(sessionStorage.getItem('token'))
    }
    
}

export default new UserServices()