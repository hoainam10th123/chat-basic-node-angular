const express = require('express')
const {User} = require('../models/user')
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) =>{
    const userList = await User.find().select('-passwordHash')
    if(!userList){
        res.status(500).json({success: false})
    }
    res.send(userList)
})

router.get('/:id', async(req,res)=>{
    const user = await User.findById(req.params.id).select('-passwordHash')

    if(!user) {
        res.status(404).json({message: 'The user with the given ID was not found.'})
    } 
    res.status(200).send(user);
})

router.post('/register', async (req, res) =>{

    let user = new User({
        username: req.body.username,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        photoUrl: req.body.photoUrl,
        displayName: req.body.displayName,
    })
    user = await user.save();

    if(!user)
    return res.status(400).send('the user cannot be created!')

    res.send(user);
})

router.post('/login', async (req,res) => {
    // tim user co email = body truyen vao
    const user = await User.findOne({username: req.body.username})
    const secret = process.env.secret;
    if(!user) {
        return res.status(400).send('The user not found');
    }

    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
            },
            secret,
            {expiresIn : '1d'}
        )
       
        res.status(200).send(
            {
                username: user.username, 
                displayName: user.displayName, 
                photoUrl: user.photoUrl, 
                token: token
            }) 
    } else {
       res.status(400).send('password is wrong!');
    }
})

module.exports = router