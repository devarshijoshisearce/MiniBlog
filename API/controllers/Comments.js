const Comment = require('../models/Comments');
const jwt = require('jsonwebtoken')

const controller = {
    //how to take post id?? by url or req.body
    async createComment(req, res, next) {
        try {
            const token = req.cookies.jwt;
            jwt.verify(token, process.env.SECRET_KEY, async (err, info) => {
                if (err) {
                    return res.status(401).json({ message: "User not logged in" })
                }
                const { user, content, post } = req.body;
                const newComment = await Comment.create({ user: info.id, content, post })
                res.status(201).json(newComment)
            })

        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' })
            console.log(error)
        }
    },
    async getCommentForPost(req, res, next) {
        try {
            const { postId } = req.query
            const comments = await Comment.find({ post: postId })
            res.status(200).json(comments)
        } catch (error) {
            res.status(500).json({ error: 'Internal server Error' })
        }
    },
    async createReply(req, res, next) {
        try {
            const token = req.cookies.jwt;
            jwt.verify(token, process.env.SECRET_KEY, async (err, info) => {
                if (err) {
                    return res.status(401).json({ message: "User not logged in" })
                }
                const { commentId } = req.query
                const { content} = req.body
                const reply = await Comment.create({ user: info.id, content, parentComment: commentId })
                res.status(200).json(reply)
            })
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' })
            console.log(error)
        }
    }
}

module.exports = controller;