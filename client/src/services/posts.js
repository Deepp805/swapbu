import axios from 'axios'
const baseUrl = 'http://localhost:3001'

const home = () => {
    return axios.get(baseUrl+'/').then(response => response.data)
}

const getAll = () => {
    return axios.get(baseUrl + '/api/posts').then(response => response.data)
}

const create = (postObject) => {
    return axios.post(baseUrl + '/api/posts', postObject).then(response => response.data)
}

const getOne = (id) => {
    return axios.get(`${baseUrl}/api/posts/${id}`).then(response => response.data)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/api/posts/${id}`).then(response => response.data)
}

const update = (id, postObject) => {
    return axios.put(`${baseUrl}/api/posts/${id}`, postObject).then(response => response.data)
}

export default {
    home: home,
    getAll: getAll,
    create: create,
    getOne: getOne,
    remove: remove,
    update: update
}