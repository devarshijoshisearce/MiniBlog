const User=require('../models/Users')
const jwt=require('jsonwebtoken')
const bcrypt= require('bcrypt')

//function for cretaing tokens
async function createToken(id){
    const token=await jwt.sign({id},process.env.SECRET_KEY,{
        expiresIn:'2d'
    })
    return token;
}

// async function userProfile(id){
//     const user= await User.findById(id);
//     return user;
// }


const controller={
    async login(req,res,next){
        try{
            
            const {emailID,password}=req.body
            const user=await User.findOne({emailID});
            if(user){
                const isCompare=await bcrypt.compare(password,user.password)
                if(isCompare){
                    try{
                        const token=await createToken(user._id)
                        res.cookie("jwt",token,{
                            maxAge:1000*60*60*24*2
                        })
                        res.json(user);
                        // res.send(token)
                    }catch{
                        res.status(404).json({message:"Problem to create tokens"})
                        return;
                    }
                    // const user=await User.login(req.body.emailID,req.body.password,res);
                }else{
                    res.status(400).send("Invalid user")
                }
            }
            // const user=await User.login(req.body.emailID,req.body.password,res);   //passed to middleware function to check if user exists
            
        }catch(error){
            res.status(404).json({message:"problem to get user details"})
            return;
        }
    },
    async signup(req,res,next){
        const {username,emailID,password,name,age,gender}=req.body;

        const existingUser=await User.findOne({emailID:emailID})  //check whether user already exists
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        const salt=await bcrypt.genSalt()   //adds a random piece of data
        const hashPass=await bcrypt.hash(password,salt) //password hashing

        const user=await User.create({username,emailID,password:hashPass,name,age,gender})

        const token=await createToken(user._id)   //generation of token
        res.cookie('jwt',token,{
            maxAge: 1000*60*60*24*2
        })
        res.send(user)
    },
    async logout(req,res,next){
        try{
            res.clearCookie('jwt')
            res.send('Cookie Deleted')
        }catch(err){
            res.status(500).send(err);
        }
    },
    async getProfile(req,res,next){
        const token=req.cookies.jwt

        jwt.verify(token,process.env.SECRET_KEY,async (err,info)=>{
            if(err){
                return res.status(401).json({ message: "Not authorized" })
            }
            const profileinfo= await User.findById(info.id)
            const str=JSON.stringify(profileinfo)
            const getprofile=JSON.parse(str);
            res.json(getprofile);
        })
    }
};

module.exports=controller;