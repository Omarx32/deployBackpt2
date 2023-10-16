const express = require('express');
const createPropertyH = require('../../handlers/PropertyH/CreateNewRentH')
const {getProperty, getPropertybyId} = require('../../handlers/PropertyH/PropertyHand')

const router = express.Router()

router.get('/gproduct', getProperty)
router.get('/:id', getPropertybyId)
router.post('/post', createPropertyH);

module.exports = router;