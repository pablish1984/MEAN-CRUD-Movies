const moviesModel = require('../model/movies.model')
const moviesController = {};

// Obtener una pelicula por el Id
moviesController.getMovieById = async(req, res) => {

    try {
        const temp = await moviesModel.findById(req.params.id).populate('director', '-_id -__v').populate('actors', '-_id -__v');

        res.json(temp);
    } catch (error) {
        res.json(error);
    }
}

// Listado de peliculas por Campos
moviesController.getMoviesByFields = async(req, res) => {
    var params = {}; // Objeto json que me guarda los campos con los valores para pasarlo a mi consulta

    for (key in req.query) {
        req.query != "" ? params[key] = req.query[key] : null; // Si la url trae parametros pues los annade a el objeto params
    }

    // Uso del metodo find(), pasandole parametros para filtrar mi buskeda
    await moviesModel.find({ $or: [params] }).populate('director', '-_id -__v').populate('actors', '-_id -__v').populate('user').exec((err, movies) => {
        if (!err)
            res.json(movies);
        else
            res.json(err);
    });
}

// Crear una pelicula
moviesController.createMovie = async(req, res) => {
    try {
        const singleMovie = new moviesModel(req.body);

        await singleMovie.save();

        res.send('Se ha creado la pelicula correctamente');
    } catch (error) {
        res.send(error);
    }
}

// Eliminar una pelicula
moviesController.deleteMovie = async(req, res) => {
    try {
        await moviesModel.findOneAndRemove(req.params.id);

        res.send('Pelicula eliminada correctamente');
    } catch (error) {
        res.send(error);
    }
}

// Actualizar una pelicula
moviesController.updateMovie = async(req, res) => {
    try {
        await moviesModel.findOneAndUpdate(req.params.id, req.body);

        res.send('Pelicula Actualizada');
    } catch (error) {
        res.send(error);
    }
}

moviesController.SetScore = async(req, res) => {
    var film = moviesModel.findById(req.params.id);

    // para darle score a la pelicula, uso el id del usuario ke esta logeado y lo inserto en list_users_calification, junto al score ke le dio a la pelicula. si ya esta insertado lo unico ke hago es actualizar el valor del score y vuelvo a recalcular el score general

}

moviesController.getScore = async(req, res) => {

    try {
        // Devuelvo el Score total de la pelicula y muestro una lista con los scores de los distintos usuarios 
        var movie = await moviesModel.findById(req.params.id, { "score": 1, "list_users_calification": 1 }); //findById(req.params.id);

        res.json(movie);
    } catch (error) {
        res.json(error);
    }
}

moviesController.computeScore = async(req, res) => {
    var array_users = await moviesModel.findById(req.params.id, { "list_users_calification": 1 });
    var total_score = 0;

    if (array_users) {
        for (let index = 0; index < array_users.length; index++) {
            total_score += array_users[index].personal_score;
        }

        res.send(array_users[1]);
        /*
                req.body = { score: total_score };

                var movie = await moviesModel.findByIdAndUpdate(req.params.id, aux);
                res.json(movie);*/
    } else {
        res.send({ message: "No hay elementos en el arreglo" });
    }

    // Recorro la lista de usuarios ke le han dado score a la pelicula sumando los scores, y cuando termine de sumarlos los divido por la cantidad de usuarios
    /*
    array_users.forEach(element => {

    });*/


}

module.exports = moviesController;