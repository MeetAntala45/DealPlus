const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

const connections = mongoose.connection;

connections.on('connected',()=>{
    console.log('mongo Db conncetion Sucessfully Connected');
})
connections.on('error',(err)=>{
    console.log(`mongo Db conncetion error ${err}`);
})

module.exports = connections;