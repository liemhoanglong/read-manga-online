var genre = require('../model/genre.model');

module.exports= {
	getAllGenres: async () => {
		return await genre.find();
	},

	getGenre: async (id) => {
		return await genre.findById(id);
	},
}

