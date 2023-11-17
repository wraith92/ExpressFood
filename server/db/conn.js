const mongoose = require('mongoose');
const db = process.env.ATLAS_URL;

var c='mongodb+srv://group:group@projet.qzgbbxd.mongodb.net/Projet?retryWrites=true&w=majority'

connectDB = async () => {
    console.log("connexion");
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(c, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB à l'écoute");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;
