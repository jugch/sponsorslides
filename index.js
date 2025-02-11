'use strict'

const express = require('express')
const path = require('path');

var app = module.exports = express()

app.use('/js', express.static('js'));
app.use('/less', express.static('less'));
app.use('/css', express.static('css'));
app.use('/images', express.static('images'));


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'))
});



/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}