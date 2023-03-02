var express = require('express')
var router = express.Router()

const path = require('path')

const basePath = path.join(__dirname, '../templates')

router.get('/page1', (req, res) => {
  res.sendFile(`${basePath}/page1.html`)
})

// antes do /
router.get('/page2', (req, res) => { 

  res.sendFile(`${basePath}/page2.html`)
})

module.exports = router;