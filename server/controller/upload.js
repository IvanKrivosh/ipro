const IncomingForm = require('formidable').IncomingForm;
var fs = require("fs");

module.exports = function upload(req, res) {
  var form = new IncomingForm();
  form.maxFieldsSize = 20 * 1024 * 1024;
  form.maxFileSize = 200 * 1024 * 1024;
  form.uploadDir = "./uploads";

  form.on('error', function(err) {
    throw err;
  });

  form.on('fileBegin', function(name, file){
    file.path = form.uploadDir + "/" + file.name;
  });

  form.on('file', (field, file) => {
    console.log('ID doc: ' + req.query.id);
  });

  form.on('progress', function(bytesReceived, bytesExpected) {
  });

  form.on('end', () => {
    res.json();
  });

  form.parse(req);
};
