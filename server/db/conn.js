const mongoose=require('mongoose');
const db= process.env.ATLAS_URL;

connectDB= async() =>{
    console.log("connexion")
    try{
        mongoose.set('strictQuery',true);
        await mongoose.connect(db);

        console.log("MongoDB à l'écoute");
    }
    catch(err){
        console.error(err.message);
        process.exit(1);
    }
}
module.exports=connectDB;