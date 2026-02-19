import axios from 'axios'
const url = 'http://localhost:3001/persons'

const getAllPersons = () => {
    return axios.get(url).then(response => response.data)
}

const createPerson = newPerson => {
    return axios.post(url, newPerson).then(response => response.data)
}

const deletePerson = id => {
    return axios.delete(`${url}/${id}`).then(response => response.data)
}

const updatePerson = (personUpdate) => {
    return axios.put(`${url}/${personUpdate.id}`, personUpdate).then(response => response.data)
}

export default {getAllPersons, createPerson, deletePerson, updatePerson}