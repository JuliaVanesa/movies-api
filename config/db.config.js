const mongoose = require("mongoose")


const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('DB online');
        
    } catch (error) {
        console.log (error)
        throw new Error('Error al inicializar la db')
        
    }

}

module.exports = {
    dbConnection
}