const aama = require("../model/aamaModel");
const cloudinary = require('cloudinary');

const createAama = async (req, res) => {
  console.log(req.body);
  console.log(req.files);

  const {
    name,
    age,
    time,
    charge,
    experience,
    speciality,
    language,
    description,
    isVerified
  } = req.body;

  // Check if required fields are missing
  if (!name || !age || !time || !charge || !experience || !speciality || !language || !description) {
    return res.json({
      success: false,
      message: "All fields are required !!",
    });
  }

  try {
    let uploadedImage;

    if (req.files && req.files.aamaImage) {
      uploadedImage = await cloudinary.v2.uploader.upload(req.files.aamaImage.path, {
        folder: "users",
        crop: "scale",
      });
    }

    // create aama
    const newAama = new aama({
      name: name,
      age: age,
      time: time,
      charge: charge,
      experience: experience,
      speciality: speciality,
      language: language,
      description: description,
      isVerified: isVerified,
      aamaImageUrl: uploadedImage ? uploadedImage.secure_url : null,
    });
    console.log(newAama)

    await newAama.save();

    res.json({
      success: true,
      message: "Aama added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getAama = async (req,res) => {
    try {
        const aamaDetails = await aama.find().sort({_id: -1})
        res.json({
            success:true,
            message:"Aama fetched successfully",
            aama:aamaDetails
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}


const updateAamaVerification = async (req,res) => {
  try {
    const {isVerified} = req.body
    const {id} = req.body
    console.log(req.body)
    console.log(id)
    if(!isVerified) {
      return res.json({
        success: false,
        message: "No I won't allow it !!"
      })
    }
    const verifiedAama = {
      isVerified: isVerified
    }
    await aama.findByIdAndUpdate(id, verifiedAama)
    res.json({
      success:true,
      message:"Verified !!",
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

const getAamaById = async (req, res) => {
  console.log(req.body)
  try {
    const aamaId = req.params.id;
    const aamaDetail = await aama.findById(aamaId)
    res.status(200).json({
      success: true,
      message: 'Aama Fetched By Id',
      aamaDetail: aamaDetail
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
 }

 const deleteAamaById = async (req, res) => {
  const id=req.params.id
  if (!id) {
    return res.json({
      success: false,
      message: "Invalid AMA ID"
    })
  }
  try {
    await aama.findByIdAndDelete(id)
    res.status(200).json({
      success: true,
      message: "Aama Deleted Successfully!!"
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Server Error."
    })
  }
 }

 const updateAama = async (req, res) => {
  const id = req.params.id;
  console.log(id)
  console.log(req.body)
  console.log(req.files)
  
  const {
    name,
    age,
    time,
    charge,
    experience,
    speciality,
    language,
    description,
    isVerified
  } = req.body;

  // Check if required fields are missing
  if (!name || !age || !time || !charge || !experience || !speciality || !language || !description) {
    return res.json({
      success: false,
      message: "All fields are required !!",
    });
  }

  try {
    let uploadedImage;

    if (req.files && req.files.aamaImage) {
      uploadedImage = await cloudinary.v2.uploader.upload(req.files.aamaImage.path, {
        folder: "users",
        crop: "scale",
      });
    }

    // create aama
    const updatedAama = {
      name: name,
      age: age,
      time: time,
      charge: charge,
      experience: experience,
      speciality: speciality,
      language: language,
      description: description,
      isVerified: isVerified,
      aamaImageUrl: uploadedImage ? uploadedImage.secure_url : null,
    };

    await aama.findByIdAndUpdate(id,updatedAama);
    res.status(200).json({
      success: true,
      message: "Aama updated successfully",
      updatedAama: updatedAama
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
 }

module.exports = {
  createAama,
  getAama,
  updateAamaVerification,
  getAamaById,
  deleteAamaById,
  updateAama
};
