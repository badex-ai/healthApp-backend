const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../shared/checkjwt');
// const app = express();


const router = express.Router();

router.use(auth.checkJwt);

router.get('/me',userController.getMe);

router.patch(
    '/updateMe',
    userController.updateMe
  );

router.delete('/deleteMe', userController.deleteMe);

module.exports= router;