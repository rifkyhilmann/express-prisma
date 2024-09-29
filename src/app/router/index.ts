import express from 'express';
const router = express.Router();
const upload = require('../middlewares/multerConfig');
const { signUp, signIn, signOut } = require('./POST/auth')
const { getAllPosting } = require('./GET/posting')
const { getUserByEmail } = require('./GET/user');
const { postPostingan, postImage } = require('./POST/postingan');
const {authenticate} = require('../middlewares/authenticate');

router.get('/user/:email', authenticate, getUserByEmail);
router.get('/posting', authenticate, getAllPosting)

router.post('/postingan', authenticate, postPostingan);
router.post('/image', authenticate,  upload.single('image'), postImage);

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.post('/sign-out', signOut);


module.exports = router;