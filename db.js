module.exports = function(mongoose, MONGO_URL) {
  
    mongoose.connect(MONGO_URL, {useMongoClient: true});
    return mongoose;
}