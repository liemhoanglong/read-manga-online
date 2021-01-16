const Chapter = require("../model/chapter.model");

module.exports = {
  getById: async (id) => {
    try {
      const chapter = await Chapter.findById(id);
      return chapter;
    } catch (err) {
      return err;
    }
  },

  getBySeriesID:async (id) => {
    try {
      const chapter = await Chapter.find({series: id});
      return chapter;
    } catch (err) {
      return err;
    }
  },

  create: async (data) => {
    console.log(1, `chapter`, data);
    const chapter = new Chapter(data);
    return chapter.save();
  },

  update: async (data) => {
    console.log(1, `chapter`, data);
    const chapterId = data._id;
    const filter = { _id: chapterId };
    const updateData = { ...data };
    const chapter = Chapter.findOneAndUpdate(
      filter,
      { $set: updateData },
      { new: true }
    );
    return chapter;
  },
};
