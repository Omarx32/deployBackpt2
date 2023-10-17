const express=require('express')
const {createReviewHandler, getReviewsHandler, destroyReviewHandler}= require('../../handlers/ReviewHandler/ReviewHandler');
const router= express.Router();

router.post('/create', createReviewHandler);
router.get('/home/:id', getReviewsHandler);
router.delete('/delete/:id', destroyReviewHandler);

module.exports=router