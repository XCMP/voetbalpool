(function(express, path, multer, fs) {

  var PORT = process.env.OPENSHIFT_NODEJS_PORT || 3000;
  var IP = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

  var upload = multer({ dest: 'dist/images/logos/' });
  var server = express();
  var router = express.Router();

  var uploadMenu = '<div><a href="/logos/index.html">list of logos</a> <a href="/upload/logo/index.html">add logos</a></div>';
  var uploadTemplate = '<form action="/upload/logo" method="POST" enctype="multipart/form-data">'+
                          '<label for="logoFilename">Kies een logo</label>'+
                          '<input type="file" name="logos" multiple>'+
                          '<input type="submit" value="Upload Logo">'+
                        '</form>';

  server.use(express.static('dist'));

  // index.html of voetbalpool app
  router.get("/",function(req,res){
      res.send(path.join(__dirname + '/index.html'));
  });

  // LOGOS
  // get list of logo files
  router.get("/logos/index.html", function(req,res){
    fs.readdir('dist/images/logos', function (err, files) {
      if (err) {
          throw err;
      }
      var result = '<ul>';
      files.forEach(function(file, i, arr) {
        result += '<li>' + file + '</li>';
      });
      result += '</ul>';
      res.send(uploadMenu + result);
    });
  });

  // upload logo page
  router.get("/upload/logo/index.html", function(req,res){
      res.send(uploadMenu + uploadTemplate);
  });

  // upload logo end point
  router.post("/upload/logo", upload.array('logos', 50), function(req,res,next){
    var result = '<ul>';
    req.files.forEach(function(e, i, arr) {
      result += '<li>renamed from ' + e.path + ' to ' + e.destination + e.originalname + '</li>';
      fs.rename(e.path, e.destination+e.originalname, function(err) {
        if (err) {
          console.log(err);
        }
      });
    });
    result += '</ul>';
    res.send(uploadMenu + result);
  });

  server.use('/',router);

  server.listen(PORT, IP);

  console.log('Voetbalpool frontend server running on %s:%s', IP, PORT);

})(require('express'), require('path'), require('multer'), require('fs'));
