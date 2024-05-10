import jwt from "jsonwebtoken";

const jwt_SECRET = "saarthakisagoodboy";

function fetchUser(req, res, next){
    // get the user form jwt token and add id to request object
    const token = req.header('auth-token');    //   <======== We are sending auth token in the header
    if(!token){
        res.status(401).send({error: "Please authenticate using valid token"});
    }
    try {
        // we will use jwt to verify that token
        const data = jwt.verify(token, jwt_SECRET);
        req.user = data.user;
        next();
        
    } catch (error) {
        res.status(401).send({error: "Please authenticate user"})
    }
}

export default fetchUser;