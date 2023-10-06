import { request } from '../utilities/api'

const locationsURL = '/api/locations'

const getAllLocations = () => request('GET', locationsURL)
const getLocationById = (id) => request('GET', `${locationsURL}/${id}`)
const getEventsByLocation = (id) => request('GET', `${locationsURL}/events/${id}`)

export default {
    getAllLocations,
    getLocationById,
    getEventsByLocation
}