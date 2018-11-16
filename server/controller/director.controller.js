const directorModel = require('../model/director.model');
const directorController = {};

// Devolver Listado de directores
directorController.getDirectors = async(req, res) => {
    const list_directors = await directorModel.find();

    res.json(list_directors);
}

// Devolver Director por Id
directorController.getDirectorById = async(req, res) => {
    const singleDirector = await directorModel.findById(req.params.id);

    res.json(singleDirector);
}

// Insertar Director
directorController.createDirector = async(req, res) => {
    const director = new directorModel(req.body);

    await director.save();
    res.send('Director creado correctamente');
}

// Eliminar director
directorController.deleteDirector = async(req, res) => {
    await directorModel.findOneAndDelete(req.params.id);

    res.send('Director eliminado correctamente');
}

// Actualizar Director
directorController.updateDirector = async(req, res) => {
    await directorModel.findOneAndUpdate(req.params.id, req.body);

    res.send('Director actualizado correctamente');
}

module.exports = directorController;