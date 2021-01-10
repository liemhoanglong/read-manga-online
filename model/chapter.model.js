const mongoose = require("mongoose");

const { Schema } = mongoose;

const chapterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // Thuộc về match nào
    series: { type: Schema.Types.ObjectId, ref: "series" },
    postDate: {
      type: Date,
    },
    status: {
      type: String,
      default: "PENDING",
      enum: ["PENDING", "APPROVED", "REJECTED"],
    },
    imageList: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Chapter = mongoose.model("chapter", chatSchema);

module.exports = Chapter;
