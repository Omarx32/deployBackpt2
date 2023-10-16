const express = require('express');
const { handleCreateCategory, getCategories} = require('../../handlers/CategoryHandler/CategoryHandler') 
const router = express.Router();

router.post('/category', handleCreateCategory);
router.get('/get', getCategories)
module.exports = router;
