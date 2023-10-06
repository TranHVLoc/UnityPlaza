import React, { useState, useEffect } from 'react'
import LocationsAPI from '../services/LocationsAPI'
import EventsAPI from '../services/EventsAPI'
import FilteredEvents from '../components/FilteredEvents'
import '../css/LocationFilter.css'

const Events = () => {

    const [locations, setLocations] = useState([])
    const [events, setEvents] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const locationsData = await LocationsAPI.getAllLocations()
                setLocations(locationsData)
            }
            catch (error) {
                throw error
            }
        }) ()
    }, [])

    useEffect(() => {
        (async () => {
            try {
                getAllEvents()
            }
            catch (error) {
                throw error
            }
        }) ()
    }, [])

    const handleChange = (event) => {
        const {name, value} = event.target
        
        if (value === 'all') {
            getAllEvents()
        }
        else {
            getEventsByLocation(value)
        }
    }

    const getEventsByLocation = async (id) => {
        const eventsData = await LocationsAPI.getEventsByLocation(id)
        setEvents(eventsData)
    }

    const getAllEvents = async () => {
        const eventsData = await EventsAPI.getAllEvents()
        setEvents(eventsData)
    }

    return (
        <div className='all-events-main'>
            <div className='event-filters'>
                <select onChange={handleChange}>
                    <option value='all'>See events at . . .</option>
                    {
                        locations && locations.length > 0 ? locations.map((location, index) =>
                            <option key={location.id} name={location.name} value={location.id}>{location.name}</option>
                        ) : <option>{'No locations found in UnityGrid Plaza yet!'}</option>
                    }
                </select>

                <button onClick={getAllEvents}>Show All Events</button>
            </div>

            <FilteredEvents data={events} />
        </div>
    )
}

export default Events