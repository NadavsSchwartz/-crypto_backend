import express from 'express';

const router = express.Router();

 router.post('/signup', (req, res) => {
     return res.send(200)
 })


export default router