import { pool } from '../config/database.js'

const allEventsQuery = `
    SELECT id, title, TO_CHAR(date, \'Mon DD, YYYY\') as DATE, time, location, image, AGE(DATE, CURRENT_DATE) AS remaining
    FROM events
    ORDER BY id ASC
`

const getEvents = async (req, res) => {
    try {
        const results = await pool.query(allEventsQuery)
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(400).json( {error: error.message} )
    }
}

const eventsByIdQuery = `
    SELECT id, title, TO_CHAR(date, \'Mon DD, YYYY\') as DATE, time, location, image, AGE(DATE, CURRENT_DATE) AS remaining
    FROM events
    WHERE id=$1
`

const getEventsById = async (req, res) => {
    try {
        const eventId = parseInt(req.params.id)
        const results = await pool.query(eventsByIdQuery, [eventId])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(400).json( {error: error.message} )
    }
}

export default {
    getEvents,
    getEventsById
}