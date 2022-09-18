import axios from 'axios'
const baseUrl = '/api/persons'

const getData = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const newEntry = (newName) => {
    const request = axios.post(baseUrl, newName)
    return request.then(response => response.data)
}

const deleteEntry = (id) => {
    axios.delete(`${baseUrl}/${id}`)
}

const updateEntry = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getData, newEntry, deleteEntry, updateEntry }