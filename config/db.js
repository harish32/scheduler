const mongoose = require("mongoose")

const connectdb = async ()=>{
    await mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify:false })
    console.log("mongodb connected")
}

module.exports = connectdb