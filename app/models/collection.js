const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
  name: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

module.exports = mongoose.model("Collection", CollectionSchema);
