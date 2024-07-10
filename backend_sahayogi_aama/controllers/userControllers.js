const Users = require("../model/userModel");
const bcrypt= require("bcrypt");
const jwt=require('jsonwebtoken')

const createUser = async (req, res) => {
    // step 1: check incoming data
    console.log(req.body); //body includes json data

    // step 2: destructure each data
    const { fullName, phoneNumber, email, password } = req.body;

    // step 3: validation
    if (!fullName || !phoneNumber || !email || !password) {
            return res.json({
                success:false,
                message:'All fields are required',
            })
    }
    // step 4: try catch block
    try{
        // step 5: check if the user already exists
        const existingUser =await Users.findOne({email:email}); // use await for each db query
        if(existingUser){
            return res.json({
                success:false,
                message:'Email is already in use'
            });
        }
        // password encryption
        const generatedSalt = await bcrypt.genSalt(10);
        const encryptedPassword= await bcrypt.hash(password,generatedSalt);
        //  step 6: create new user
        const newUser=new Users ({
            fullName, // should write dbName:destructuredName if they are not same
            phoneNumber,
            email,
            password:encryptedPassword
            });
        // step 7: save the user
        await newUser.save();
        // step 8: send response back to client
        res.status(200).json({
            success:true,
            message:'User created successfully',
        });
    } catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

const loginUser = async (req, res) => {
    // step 1: check for incoming data
     console.log(req.body); 
    //  step 2: destructure each data
     const {email, password } = req.body;
     // step 3: validation
     if (!email || !password) {
             return res.json({
                 success:false,
                 message:'All fields are required',
             })
     }
     // step 4: try catch block
     try{
        // step 5: find the user
        const foundUser= await Users.findOne({email:email})
        if(!foundUser){
            res.json({
                success:false,
                message:'User does not exist'
            })
        }
        // step 6: check the password
        const dbPassword= foundUser.password;
        const comparePassword= await bcrypt.compare(password,dbPassword);
        if (!comparePassword)
        {
            res.status(200).json({
                success:false,
                message:'The credentials do not match',
            })
        }
        // step 7: create a token
        const token= await jwt.sign(
            {id:foundUser._id},
            process.env.JWT_TOKEN_SECRET,
            )
        // step 8: send a response
        res.status(200).json({
            success:true,
            message:'Logged in successfully',
            token:token,
            userData:foundUser,
        })
        
     }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

const updateUserPassword = async (req, res) => {
    try {
        console.log(req.body);

        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.json({
                success: false,
                message: 'Please enter both old and new passwords',
            });
        }

        const id = req.user.id; 

        const user = await Users.findById(id);

        if (!user) {
            return res.json({
                success: false,
                message: 'User not found',
            });
        }

        const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordMatch) {
            return res.json({
                success: false,
                message: 'Invalid current password',
            });
        }

        const generateSalt = await bcrypt.genSalt(10);
        const encryptedNewPassword = await bcrypt.hash(newPassword, generateSalt);

        await Users.findByIdAndUpdate(id, { password: encryptedNewPassword });

        res.json({
            success: true,
            message: 'Password updated successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

const updateUser = async (req,res)=>{
    console.log(req.body);

    const {fullName, 
        email, 
        address, 
        phoneNumber} = req.body;

   const id = req.user.id;
   console.log(fullName ,email, address, phoneNumber)
   if (!fullName || !email ||!address||!phoneNumber)
    {
     res.json(
       {
         success: false,
         message:'Please fill all fields'
       });
     }
     try{
        const updatedUser= {
            fullName:fullName,
            email:email,
            address:address,
            phoneNumber:phoneNumber,
          }
          await Users.findByIdAndUpdate(id,updatedUser);
          res.json({
            success:true,
            message:"User Details Updated Successfully",
            user: updatedUser
          })
     }catch(error){
       console.log(error)
       res.status(500).json(
         {
           success:false,
           message:'Server Error'
         }
       )
    }
   }

module.exports = {
    createUser,loginUser,updateUserPassword, updateUser
}