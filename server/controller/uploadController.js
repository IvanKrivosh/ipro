const IncomingForm = require('formidable').IncomingForm;
const db = require('../config/db.config.js');
const File = db.files;
const appconfig = require('../config/app.config');
const Document = db.documents;

exports.getFiles = (req, res) => {
  let query =
    `select * from files f`;

  if (req.query.documentId != null) {
    query += ` WHERE f."documentId" = ${req.query.documentId}`;
  }

  db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT})
    .then(docs => {
      res.json(docs);
    }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};

exports.download = (req, res) => {

  File.findByPk(req.query.id).then(_file => {
    ext = _file.name.substring(_file.name.lastIndexOf('.'));
    filepath = appconfig.uploadpath + '\\' +_file.dataValues.uid + ext;
    res.download(filepath, _file.name);
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};

exports.upload = (req, res) => {
  var form = new IncomingForm();
  var uid;
  form.maxFieldsSize = 20 * 1024 * 1024;
  form.maxFileSize = 200 * 1024 * 1024;
  form.uploadDir = "./uploads";

  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  form.on('error', function (err) {
    throw err;
  });

  form.on('fileBegin', function (name, file) {
    uid = uuidv4();
    ext = file.name.substring(file.name.lastIndexOf('.'));
    file.path = form.uploadDir + "/" + uid + ext;
  });

  form.on('file', (field, file) => {
    _documentId = null;
    _mainDocId = null;
    if(req.query.documentId)
      _documentId = req.query.documentId;
    if(req.query.mainDocId)
      _mainDocId = req.query.mainDocId;

    tmpfile = {
      documentId: _documentId,
      uid: uid,
      name: file.name,
      path: file.path };

    File.create(tmpfile).then(_file => {
      if(_mainDocId) {
        const id = _mainDocId;
        Document.update( { idFile: _file.id },
          {
            where: {id: id} }).then(() => {
        }).catch(err => {
          console.log(err);
          res.status(500).json({msg: "error", details: err});
        });
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({msg: "error", details: err});
    });
  });

  form.on('progress', function (bytesReceived, bytesExpected) {
    var percent = (bytesReceived / bytesExpected * 100) | 0;
    process.stdout.write('Uploading: %' + percent + '\r');
  });

  form.on('end', () => {
    res.json();
  });

  form.parse(req);
};

exports.updateFile = (req, res) => {
  const id = req.query.id;
  File.update( req.body,
    {
      where: {id: id} }).then(() => {
    res.status(200).json({id: id});
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};

exports.deleteFile = (req, res) => {
  const id = req.query.id;
  File.destroy({
    where: { id: id }
  }).then(() => {
    res.status(200).json( { msg: 'Deleted Successfully'} );
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};

