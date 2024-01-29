const User=require('../models/Users')
const jwt=require('jsonwebtoken')     //used for authentication
const bcrypt= require('bcrypt')       //used for password hashing

//function for cretaing tokens
async function createToken(id){
    const token=await jwt.sign({id},process.env.SECRET_KEY,{
        expiresIn:'2d'
    })
    return token;
}

const controller={
    //Login function
    async login(req,res,next){
        try{  
            const {emailID,password}=req.body
            const user=await User.findOne({emailID});                          //check if emailID exists in db
            if(user){
                const isCompare=await bcrypt.compare(password,user.password)   //if yes: compare the passwords
                if(isCompare){                                                 //Password match: login success
                    try{
                        const token=await createToken(user._id)                //generating token
                        res.cookie("jwt",token,{                               //generates cookie with max age of 2 days
                            maxAge:1000*60*60*24*2
                        })
                        res.json(user);
                    }catch{
                        res.status(404).json({message:"Problem to create tokens"})
                        return;
                    }
                }else{
                    res.status(400).send("Invalid user")                    //Password does not match: user is invalid
                }
            }
        }catch(error){
            res.status(404).json({message:"problem to get user details"})
            return;
        }
    },

    //Signup function
    async signup(req,res,next){
        const {username,emailID,password,name,age,gender}=req.body;

        const existingUser=await User.findOne({emailID:emailID})  //check whether user already exists
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        const salt=await bcrypt.genSalt()                        //adds a random piece of data
        const hashPass=await bcrypt.hash(password,salt)          //password hashing

        const user=await User.create({username,emailID,password:hashPass,name,age,gender})

        const token=await createToken(user._id)                  //generating token
        res.cookie('jwt',token,{
            maxAge: 1000*60*60*24*2
        })
        res.send(user)
    },

    //Logout function
    async logout(req,res,next){
        try{
            res.clearCookie('jwt')                               //clear the cookie
            res.send('Cookie Deleted')
        }catch(err){
            res.status(500).send(err);
        }
    },

    //To get Profile information
    async getProfile(req,res,next){
        const token=req.cookies.jwt
        jwt.verify(token,process.env.SECRET_KEY,async (err,info)=>{
            if(err){
                return res.status(401).json({ message: "Not authorized" })
            }
            const profileinfo= await User.findById(info.id)        //get user by Id
            const str=JSON.stringify(profileinfo)
            const getprofile=JSON.parse(str);
            res.json(getprofile);
        })
    }
};

module.exports=controller;