const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configuration 
cloudinary.config({
  cloud_name:  process.env.cloud_name,
  api_key:  process.env.cloud_api_key,
  api_secret:  process.env.cloud_api_secret,
});


// cloudinary.config({
//   cloud_name: "dejqyvuqj",
//   api_key: "417793673286124",
//   api_secret: "hfqsAv740sSVcXiSdVb2RAaBp2s"
// });


module.exports = cloudinary;



// Upload

// const res = cloudinary.uploader.upload('https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg', {public_id: "olympic_flag"})

// res.then((data) => {
//   console.log(data);
//   console.log(data.secure_url);
// }).catch((err) => {
//   console.log(err);
// });


// // Generate 
// const url = cloudinary.url("olympic_flag", {
//   width: 100,
//   height: 150,
//   Crop: 'fill'
// });



// // The output url
// console.log(url);
// https://res.cloudinary.com/<cloud_name>/image/upload/h_150,w_100/olympic_flag