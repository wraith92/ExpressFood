const mongoose = require('mongoose');
const db = process.env.ATLAS_URL;

connectDB = async () => {
    console.log("connexion");
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect('mongodb+srv://group:group@projet.qzgbbxd.mongodb.net/Projet?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB à l'écoute");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;
