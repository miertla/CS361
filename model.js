const { response } = require('express');
const { Pool } = require('pg');
const db = require('./data/db-config');

const findAll = () => {
    return db('profiles')
}

// GET all user trips by their profileId
const getUserTripsById = (request, response) => {
    const id = parseInt(request.params.id)
    db.query('SELECT location, startDate, endDate, travelBuddies FROM trips WHERE authorId = $1', [id], (error, results) => {
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// GET all user wishList items by their profileId
const getUserWishListById = (request, response) => {
    const id = parseInt(request.params.id)
    db.query('SELECT location, locationInfo FROM wishList WHERE authorId = $1', [id], (error, results) => {
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// POST: create a new profile 
const createProfile = (request, response) => {
    const { firstName, lastName, email, username, password } = request.body
    db.query('INSERT INTO profiles (firstName, lastName, email, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING profileId', [firstName, lastName, email, username, password], (error, result) => {
        if (error){
            throw error
        }
        response.status(201).send(`User added with ID: ${result.insertId}`)
    })
}

// POST: create a new previous trip entry 
const createTrip = (request, response) => {
    const { authorId, location, startDate, endDate, travelBuddies } = request.body
    db.query('INSERT INTO trips (authorId, location, startDate, endDate, travelBuddies) VALUES ($1, $2, $3, $4, $5) RETURNING tripsId', [authorId, location, startDate, endDate, travelBuddies], (error, result) => {
        if (error){
            throw error
        }
        response.status(201).send(`Trip added with ID: ${result.insertId}`)
    })
}

// POST: create a new wish list entry
const createWishListTrip = (request, response) => {
    const { authorId, location, locationInfo } = request.body
    db.query('INSERT INTO wishList (authorId, location, locationInfo) VALUES ($1, $2, $3) RETURNING wishListId', [authorId, location, locationInfo], (error, result) => {
        if (error){
            throw error
        }
        response.status(201).send(`WishList trip added with ID: ${result.insertId}`)
    })
}

// GET: search for a trip by location and profileId


// PUT: edit trip with given profileId and tripId


// DELETE a trip with the given tripId
const deleteTrip = (request, response) => {
    const id = parseInt(request.params.id)

    db.query('DELETE FROM trips WHERE tripsId = $1', [id], (error, results) => {
        if (error){
            throw error
        }
    response.status(200).send(`Trip deleted with ID: ${id}`)
})
}


module.exports = {
    findAll,
    getUserTripsById,
    getUserWishListById,
    createProfile,
    createTrip,
    createWishListTrip,

    deleteTrip
}