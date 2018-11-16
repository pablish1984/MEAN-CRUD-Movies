const userCalificatModel = require('../model/user_calification.model');
const userCalificatController = {};

// Devuelve todos los usuarios ke han dado una calificacion
userCalificatController.getUserCalif = async(req, res) => {
    await userCalificatModel.find().populate('user').exec((err, users) => {
        if (!err) {
            res.json(users);
        } else {
            res.json(err);
        }
    })
}

// Devolver la Calificacion dada por un usuario
userCalificatController.getCalifByUser = async(req, res) => {
    // Necesito pasarle el id del usuario dentro de la funcion para buscar al usuario y obtener la calificacion ke dio
    await userCalificatModel.findOne();
}

userCalificatController.createCalification = async(req, res) => {
    try {

        const newCalif = new userCalificatModel(req.body);

        await newCalif.save();

        res.send("Calificacion guardada correctamente");
    } catch (error) {
        res.json(error);
    }
}

userCalificatController.deleteCalification = async(req, res) => {
    // Busco una calificacion por el usuario y la pelicula y lo elimino
    await userCalificatModel.findOneAndDelete();
}


module.exports = userCalificatController;