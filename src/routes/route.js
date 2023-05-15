const express = require('express');
const jwt = require("jsonwebtoken");
const auth= require("../Middleware/auth")

const router = express.Router();
const usercontroller= require("../Controller/userController")
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createusers", usercontroller.creatuser)
//=============+++=========+++=========++++===========
router.post("/loginuseer",usercontroller.loginuseer)
//=============++++=========++++=======+++++==========
router.get("/getuserdata/:userId",auth.authenticate,auth.authorise,usercontroller.getUserData )
//============+++++============++++==========+++=======
router.post("/postmessage/:userId/posts",auth.authenticate,auth.authorise, usercontroller.postMessage)
//=============+++++===========++++==========+++++=====
router.delete('/isdelete/:userId',auth.authenticate,auth.authorise, usercontroller.deleteUser)
module.exports = router;