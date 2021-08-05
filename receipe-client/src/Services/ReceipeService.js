import axios from './http'

class ReceipeServices{
    createReceipe(newReceipe){
      return axios.post("/receipe",newReceipe)
    }
    fetchAllDetails(){
      return axios.get(`/receipe`)
    }
    fetchOne(id){
      return axios.get(`/receipe/${id}`)
    }
    deleteRecord(id){
      return axios.delete(`/receipe/${id}`)
    }
    update(id,details){
      return axios.put(`/receipe/${id}`,details)
    }
}
export default new ReceipeServices()