var genre = require('../model/genre.model');

module.exports= {
    getAll: async() => {
        return genre.find({});
    },
    get: async(id) => {
        return genre.findOne({ _id: id });
    }
}
