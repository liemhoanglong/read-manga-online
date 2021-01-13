const mongoose = require("mongoose");
/**
     * nhắc lại status chỉ có -1, 0, 1
      -1: là unverified là chưa được duyệt
      0: là bị banned
      1: là unbanned
      nếu chưa được duyệt nó sẽ không xuất hiện trên hệ thống đọc truyện, nếu admin từ chối thì xóa luôn khỏi db
     */
const { Schema } = mongoose;
const STATUSES = [-1, 0, 1];
const chapterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // Thuộc về match nào
    series: { type: Schema.Types.ObjectId, ref: "Series" },
    // series: { type: String },
    postedDate: {
      type: Date,
    },

    status: {
      type: Number,
      default: -1,
      enum: STATUSES,
    },
    // status: {
    //   type: String,
    //   default: "PENDING",
    //   enum: ["PENDING", "APPROVED", "REJECTED"],
    // },
    imageList: {
      type: Array,
      required: true,
    },
  }
  // { timestamps: true }
);

const Chapter = mongoose.model("Chapter", chapterSchema, "Chapter", true);

module.exports = Chapter;
