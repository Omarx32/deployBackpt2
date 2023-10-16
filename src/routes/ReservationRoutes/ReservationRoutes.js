const express = require('express');
const {createResHandler, getResHomeHandler, getResUserHandler,destroyResHandlers}= require('../../handlers/ReservationHandler/ReservationHandler')

const router = express.Router()

router.post('/create', createResHandler);
router.get('/home/:id', getResHomeHandler);
router.get('/user/:UserId', getResUserHandler);
router.delete('/delete/:id', destroyResHandlers);

module.exports= router;