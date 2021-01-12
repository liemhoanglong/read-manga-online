const mongoose = require("mongoose");

const { Schema } = mongoose;
const STATUSES = [-1, 0, 1];
const chapterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // Thuộc về match nào
    series: { type: Schema.Types.ObjectId, ref: "series" },
    // series: { type: String },
    postDate: {
      type: Date,
    },
    /**
     * nhắc lại status chỉ có -1, 0, 1
      -1: là unverified là chưa được duyệt
      0: là bị banned
      1: là unbanned
      nếu chưa được duyệt nó sẽ không xuất hiện trên hệ thống đọc truyện, nếu admin từ chối thì xóa luôn khỏi db
     */
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
  },
  { timestamps: true }
);

const Chapter = mongoose.model("chapter", chapterSchema);

module.exports = Chapter;
