(function(express, proxy, bodyParser, path, multer, fs) {

  var PORT = process.env.OPENSHIFT_NODEJS_PORT || 3000;
  var IP = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
  var LOGO_DESTINATION_DIR = 'dist/images/logos/';
  var BACKEND_HOST = process.env.OPENSHIFT_APP_DNS? 'voetbalpoolbackend-xcmp.rhcloud.com' : 'localhost:3001';

  var upload = multer({ dest: LOGO_DESTINATION_DIR });
  var server = express();
  var router = express.Router();

  server.use(express.static('dist'));
  // proxy for api calls to back-end server
  server.use('/api', proxy(BACKEND_HOST));
  server.use(bodyParser.urlencoded({
    extended: true
  }));
  // index.html of voetbalpool app
  router.get('/',function(req,res){
      res.send(path.join(__dirname + '/index.html'));
  });

  // LOGOS
  // get list of logo files
  router.get('/logos/index.html', function(req,res){
    fs.readdir('dist/images/logos', function (err, files) {
      if (err) {
          throw err;
      }
      var result = '<table>';
      files.forEach(function(file, i, arr) {
        result += `<tr>
          <td>${file}</td>
          <td>
            <form method="POST" action="/delete/logo/index.html" style="margin-bottom: 0px;">
              <input type="hidden" name="logoFileName" value="${file}"/>
              <input type="submit" value="delete">
            </form>
          </td>
        </tr>`;
      });
      result += '</table>';
      res.send(result);
    });
  });

  // upload logos end point
  router.post('/upload/logo', upload.array('logos', 50), function(req,res,next){
    if (req.files.length > 0) {
      var logoFilename;
      req.files.forEach(function(e) {
        logoFilename = e.originalname;
        fs.rename(e.path, e.destination+e.originalname, function(err) {
          if (err) {
            console.log(err);
          }
        });
      });
      res.redirect('/#add/club?logoFilename=' + logoFilename);
    } else {
      res.redirect('/#add/club');
    }
  });

  // delete logo image
  router.post('/delete/logo/index.html', function(req,res){
    var logoFileName = req.body.logoFileName;
    if (logoFileName && logoFileName.indexOf('..') >= 0) {
      res.status(200).send('OK.');
      return;
    }
    var fileToRemove = LOGO_DESTINATION_DIR + logoFileName;
    fs.exists(fileToRemove, (exists) => {
      if (exists) {
        fs.unlink(fileToRemove, (err) => {
          if (err) throw err;
        });
        res.redirect('/logos/index.html');
      } else {
        res.status(404).send('Not found');
      }
    });
  });

  server.use('/',router);

  server.listen(PORT, IP);

  console.log('Voetbalpool frontend server running on %s:%s', IP, PORT);

})(require('express'), require('express-http-proxy'), require('body-parser'), require('path'), require('multer'), require('fs'));