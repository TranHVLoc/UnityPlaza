import { request } from '../utilities/api'

const eventsURL = '/api/events'

const getAllEvents = () => request('GET', eventsURL)
const getEventsById = (id) => request('GET', `${eventsURL}/${id}`)

export default {
    getAllEvents,
    getEventsById,
}