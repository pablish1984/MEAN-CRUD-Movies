const actorModel = require('../model/actor.model');
const actorController = {};

// Obtener listado de actores
actorController.getActors = async(req, res) => {
    const list_actors = await actorModel.find();
    res.json(list_actors);
}

// Obtener actor por Id
actorController.getActorById = async(req, res) => {
    const singleActor = await actorModel.findById(req.params.id);

    res.json(singleActor);
}

// Insertar Actor
actorController.createActor = async(req, res) => {
    const newActor = new actorModel(req.body);
    await newActor.save();

    res.send('Actor creado correctamente');
}

// Actualizar Actor
actorController.updateActor = async(req, res) => {
    await actorModel.findOneAndUpdate(req.params.id, req.body);

    res.send('Actor actualizado');
}

// Eliminar Actor
actorController.deleteActor = async(req, res) => {
    await actorModel.findOneAndDelete(req.params.id);

    res.send('Actor eliminado correctamente');
}

module.exports = actorController;