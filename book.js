const { default: mongoose } = require("mongoose");

const bookschema = mongoose.Schema({
    title: String,
    author: String,
    category: String,
    publicationYear: Number,
    price: Number,
    quantity: Number,
    description: String,
    imageUrl: String,
  }, { timestamps: true });

  const data = mongoose.model('book store',bookschema)

  module.exports = {data}