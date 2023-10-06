import { pool } from './database.js'
import './dotenv.js'
import eventData from '../data/events.js'
import locationData from '../data/locations.js'

/**
 * Reset the locations table and populate it with the locationData
 */
const createLocationsTable = async () => {
    const createTabQuery = `
        DROP TABLE IF EXISTS locations;

        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            zip VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL
        );
    `;

    try {
        const res = await pool.query(createTabQuery);
        console.log('🎉 Locations table created successfully');
    } catch (error) {
        console.error('⚠️ Error creating locations table', error);
    }
}

/**
 * Seed the locations table with the locationData
 */
const seedLocationsTable = async () => {
    await createLocationsTable();

    // Traverse the locationData array and insert each location object into the locations table
    locationData.forEach((location) => {
        const insertQuery = {
            text: `
                INSERT INTO locations (name, address, city, state, zip, image)
                VALUES ($1, $2, $3, $4, $5, $6)
            `
        }
        // Define an array of values for the location object
        const values = [
            location.name,
            location.address,
            location.city,
            location.state,
            location.zip,
            location.image
        ];
    
        // Execute the query
        pool.query(insertQuery, values, (error, res) => {
            if (error) {
                console.error('⚠️ Error inserting location', error);
                return;
            }
            
            console.log(`✅ ${location.name} added successfully`);
        })
    })

}

/**
 * Reset the events table and populate it with the eventData
 */
const createEventsTable = async () => {
    const createTabQuery = `
        DROP TABLE IF EXISTS events;

        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            location VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL
        );
    `;

    try {
        const res = await pool.query(createTabQuery);
        console.log('🎉 Events table created successfully');
    } catch (error) {
        console.error('⚠️ Error creating events table', error);
    }
}


/**
 * Seed the events table with the eventData
 */
const seedEventsTable = async () => {
    await createEventsTable();

    // Traverse the eventData array and insert each event object into the events table
    eventData.forEach((event) => {
        const insertQuery = {
            text: `
                INSERT INTO events (title, date, time, location, image)
                VALUES ($1, $2, $3, $4, $5)
            `
        }
        // Define an array of values for the event object
        const values = [
            event.title,
            event.date,
            event.time,
            event.location,
            event.image
        ];
    
        // Execute the query
        pool.query(insertQuery, values, (error, res) => {
            if (error) {
                console.error('⚠️ Error inserting event', error);
                return;
            }
            
            console.log(`✅ ${event.title} added successfully`);
        })
    })

}

// Invoke the seedEventsTable function
seedEventsTable();
// Invoke the seedLocationsTable function
seedLocationsTable();

