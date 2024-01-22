const express=require('express')
const router=express.Router()

const controller=require('../controllers/Users')


router.post('/login',controller.login)
router.post('/signup',controller.signup)
router.get('/logout',controller.logout)

module.exports=router;
