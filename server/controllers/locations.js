import { pool } from '../config/database.js'

const getLocations = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM locations ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(400).json( {error: error.message} )
    }
}

const getLocationsById = async (req, res) => {
    try {
        const locId = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM locations WHERE id=$1', [locId])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(400).json( {error: error.message} )
    }
}

const getEventsByLocation = async (req, res) => {
    try {
        const locId = parseInt(req.params.id)
        const results = await pool.query('SELECT id, title, TO_CHAR(date, \'Mon DD, YYYY\') AS date, time, location, image FROM events WHERE location=$1', [locId])
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(400).json( {error: error.message} )
    }
}

export default {
    getLocations,
    getLocationsById,
    getEventsByLocation
}