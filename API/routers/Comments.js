const express=require('express')
const router=express.Router();

const controller=require("../controllers/Comments")

router.post('/comments',controller.createComment);
router.get('/comments',controller.getCommentForPost);
router.post('/comments/reply',controller.createReply)


module.exports=router;