const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");



async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/tourisma");
}
main().then(()=>{
    console.log("DB connected");
})
.catch((err)=>{
    console.log(err);
})

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data=initData.data.map((obj)=>({...obj,owner:"67d8430442cf06da322b68a8"}));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();