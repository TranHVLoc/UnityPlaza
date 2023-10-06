import express from 'express'

import EventsController from '../controllers/events.js'
import LocationsController from '../controllers/locations.js'

const router = express.Router()

// events
router.get('/events', EventsController.getEvents)
router.get('/events/:id', EventsController.getEventsById)

// locations
router.get('/locations', LocationsController.getLocations)
router.get('/locations/:id', LocationsController.getLocationsById)
router.get('/locations/events/:id', LocationsController.getEventsByLocation)

export default router