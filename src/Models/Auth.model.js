const mongoose = require('mongoose');
const Authschema = new mongoose.schema({// creating a schema for Authentication
      username: {
        type : String,
        required: true,
        unique: true
      } ,
      email : {
        type : String,
        required: true,
        unique: true
      },
      password : {
        type : String,
        required: true
        },
      role :{
        type : String,
        required :  true,
        enum : ['user', 'admin'], // select the role 
        default: 'user' // default role is user
      },
      isVerified : {
        type : Boolean,
        default: false // default value is false
      }
})
const authSchema = mongoose.model('Authentication', Authschema);
module.exports = authSchema;