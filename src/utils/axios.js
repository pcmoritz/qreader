// axios instance
import axios from 'axios'

const instance = axios.create({
  // change this url to your api
  baseURL: 'http://52.43.230.181:5000',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

export default instance
