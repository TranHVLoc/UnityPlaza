import React from 'react'
import Event from './Event'
import '../css/Event.css'
import '../css/FilteredEvents.css'

const FilteredEvents = ({data}) => {

    return (
        <div className='all-events'>
            {
                data && data.length > 0 ? data.map((item, index) =>
                    <Event
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        date={item.date}
                        time={item.time}
                        image={item.image}
                    />
                ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled in UnityGrid Plaza yet!'}</h2>
            }
        </div>
    )
}

export default FilteredEvents