 const jwt = require("jsonwebtoken");

const authenticate = function (req, res, next) {
    
    try{
    console.log("Authenticating user...");
    console.log("Request headers : ",req.headers);
    let token = req.headers["x-auth-token"];
    if (!token) return res.send({ status: false, msg: "token must be present" });
  
    console.log(token);
  
    let decodedToken = jwt.verify(token, "functionup-californium");
    if (!decodedToken)
      return res.send({ status: false, msg: "token is invalid" });
  
    next();
    }catch(err){
      console.log("Exception : ",err);
      res.status(500).send({ msg: "Exception while creating user : "+err.message});
    }
  };
  
  const authorise = function (req, res, next) {
    // comapre the logged in user's id and the id in request
    try{
    let token = req.headers["x-auth-token"];
    
    let requestId = req.params.userId;
    let decodedToken = jwt.verify(token, "functionup-californium");
    let loggedInUser = decodedToken.userId;
    console.log("loginUSer:" ,loggedInUser)
    console.log("requstID :",requestId );
    if(loggedInUser!=requestId){
        return res.send({ status: false, msg: "Unauthorized access!!" });

    }


    next();
  }
  catch(err){
    console.log("Exception: ", err)
    res.status(500).send({msg: "Exception While Authorising user:" +err.message})
  }

  
  };


  

module.exports.authenticate=authenticate;
module.exports.authorise=authorise;