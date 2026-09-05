const mongoose = require('mongoose');


const DBconnect = async () => {
    try {
        await mongoose.connect(process.env.MongoDB_URI);
        console.log ('Database Connected Successfully');
    } catch (error) {
        console.error ('Database Connection Failed',error);
        process.exit();
    }
};

module.exports = DBconnect;