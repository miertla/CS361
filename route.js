const router = require('express').Router()
const Profiles = require('./model')
const Users = require('./model')

router.get('/', async (req, res) => {
    const profiles = await Profiles.findAll()
    res.json(profiles)
})

router.post('/createProfile', async (req, res) => {
    const users = Users.createProfile()
   /// *** FIX/EXIT
})



module.exports = router