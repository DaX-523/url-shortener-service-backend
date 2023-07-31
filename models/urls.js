const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  originalUrl: {
    type: String,
    required: true,
    unique: true
  },
  shortenedUrl: {
    type: String,
    required: true,
    unique: true
  },
  urlId: {
    type: String,
    required: true,
    unique: true
  }
})

module.exports = mongoose.model('Urls', urlSchema);