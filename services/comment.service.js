var comment = require('../model/comment.model');

module.exports = {

    getAllBySeries: async(seriesID) =>{
        return comment.find({series: seriesID}).populate("member");
    },

    create: async (data) => {
        // console.log(1, `comment`, data);
        const newComment = new comment(data);
        return newComment.save();
      },

}