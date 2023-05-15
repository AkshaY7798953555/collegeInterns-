
const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");

const creatuser = async function(req,res){
let data = req.body;
let savedata = await userModel.create(data);
console.log("savedata :", savedata);
res.status(201).send({userdata :savedata})
}
//res.status(201).send({ msg: savedData })
//=============++++===============+++++===============++++++===========
const loginuseer = async function(req,res){
    let userName = req.body.emailId;
    let password = req.body.password;
    let user = await userModel.findOne({ emailId: userName, password: password});
    
    if (!user)
      return res.status(403).send({
        status: false,
        msg: "userid and  password is not valid",
      });
     
      let token = jwt.sign(
          {
            userId: user._id.toString(),
            batch: "californium",
          },
          "functionup-californium"
        );
        res.setHeader("x-auth-token", token);
        res.send({ status: true, data: token });
        console.log("token is generated");
      };
       //===========++++=================++++==============+++++============++===
       const getUserData = async function (req, res) {
        let userId = req.params.userId;
      let userDetails = await userModel.findById(userId);
      if (!userDetails)
        return res.send({ status: false, msg: "No such user exists" });
    
      res.send({ status: true, data: userDetails });
    };

    const postMessage = async function (req, res) {
        let message = req.body.message;
        let token = req.headers["x-auth-token"];
        if (!token)
          return res.send({
            status: false,
            msg: "token must be present in the request header",
          });
        let decodedToken = jwt.verify(token, "functionup-californium");
      
        if (!decodedToken)
          return res.send({ status: false, msg: "token is not valid" });
      
        let userToBeModified = req.params.userId;
        
        let userLoggedIn = decodedToken.user;
      
        if (userToBeModified != userLoggedIn)
          return res.send({
            status: false,
            msg: "User logged is not allowed to modify the requested users data",
          });
      
        let user = await userModel.findById(req.params.userId);
        if (!user) return res.send({ status: false, msg: "No such user exists" });
      
        let updatedPosts = user.posts;
        //add the message to user's posts
        updatedPosts.push(message);
        let updatedUser = await userModel.findOneAndUpdate(
          { _id: user._id },
          { posts: updatedPosts },
          { new: true }
        );
      
        //return the updated user document
        return res.send({ status: true, data: updatedUser });
      };
      const deleteUser = async function (req, res) {
       
        let userId = req.params.userId;
        let user = await userModel.findById(userId);
        if (!user) {
          return res.send("No such user exists");
        }
      
        let updatedUser = await userModel.findByIdAndUpdate(userId, {
          isDeleted: true,
        });
        res.send({ status: updatedUser, data: updatedUser });
      };



module.exports.getUserData = getUserData;
module.exports.creatuser = creatuser;
module.exports.loginuseer = loginuseer;
module.exports.postMessage=postMessage;
module.exports.deleteUser = deleteUser;
