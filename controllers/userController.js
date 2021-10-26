const multer = require("multer") ;
const User = require("../models/usermodel") ;
const catchAsync = require("../shared/catchAsync");
const cloudinary = require('cloudinary').v2;
const path = require('path');
const Datauri= require('datauri/parser') ;





cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
}


 const storage = multer.memoryStorage()


 
 exports.upload = multer({ storage , fileFilter: multerFilter }).single('image');



 
  const dUri = new Datauri();


  const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

exports.uploadToCloudinary=(req,res)=>{

  if(req.file) {
    const file = dataUri(req).content;
    catchAsync(async () => {
      const photo = await cloudinary.uploader.upload(file, {
        use_filename: true,
        unique: false
      });
      return photo.url
        
        
      
         
        
    })}
} ;






exports.getMe =catchAsync( async (req,res,next)=>{
  const accessToken = req.header.authorization.split('')[1]
  const response = await axios.get('https://dev-b58ldaey.us.auth0.com/userinfo',{
    header: {
      authorization: `Bearer ${accessToken}`
    }
  })

  res.status(200).json(
    {
      data:{
        userInfo: response.data
      } 
    }

  )

})

//  async(req, res, next) => {
//   try {
//     const accessToken = req.header.authorization.split('')[1]
//   const user
// }catch
    // req.params.id = req.user.id;
    // next();
  

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });
    res.status(204).json({
      status: 'success',
      data: null
    });
  })
exports.updateMe = catchAsync(async (req, res, next) => {
    console.log(req.body);
    console.log(req.file);
    // create Error if user Posts password data
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          'This route is not for password updates. Please use /updateMyPassword.',
          400
        )
      );
    }
  
    // filter out unwanted field names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email');
    if (req.file) {
      filteredBody.photo = req.file.filename;
    }
  
    //update user document
    const updateduser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({ status: 'success', data: { user: updateduser } });
  });