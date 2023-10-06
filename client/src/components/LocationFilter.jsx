import React, { useState, useEffect } from 'react'
import LocationsAPI from '../services/LocationsAPI'
import '../css/LocationFilter.css'

const LocationFilter = () => {
    const [locations, setLocations] = useState([])

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

    return (
        <div className='event-filters'>
            <details role='list'>
                <summary aria-haspopup='listbox'>See events at . . .</summary>
                <ul role='listbox'>
                    {
                        locations && locations.length > 0 ? locations.map((location, index) =>
                            <li key={location.id}>{location.name}</li>
                        ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No locations found in UnityGrid Plaza yet!'}</h2>
                    }
                </ul>
            </details>

            <button>Show All Events</button>
        </div>
    )
}

export default LocationFilter