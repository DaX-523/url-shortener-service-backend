const Urls = require('../models/urls')
const nanoid = require('nanoid');
const urlBase = "bit.ly";


exports.getIndex = async (req, res, next) => {
  try {
    const urlsList = await Urls.find();
    res.status(200).json({
      message: 'success',
      urls: urlsList
    })
  }
  catch(err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err)
  }
}

exports.getUrl = async (req, res, next) => {
  const urlid = req.params.urlid;
  try {
    const url = await Urls.findOne({urlId: urlid});
    if (!url) {
      const error = new Error('URL not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: 'success',
      url: url
    })
  } 
  catch(err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err)
    }
}

exports.postUrl = async (req, res, next) => {
  const urlToShort = req.body.url;


  try {
    const url = await Urls.findOne({originalUrl: urlToShort})
    if (url) {
      return res.status(200).json({newUrl: false, url: url})
    }
    const urlid = nanoid.nanoid()
    const shorturl = urlBase + '/' + urlid;
    const newUrl = new Urls({
      originalUrl: urlToShort,
      shortenedUrl: shorturl,
      urlId: urlid
    })
    await newUrl.save();
    console.log(newUrl)
    res.status(201).json({
      newUrl: true,
      url: newUrl
    })
  }
  catch(err) {
    if (!err.statusCode) {
      err.statusCode = 500;
  }
    next(err)}
}