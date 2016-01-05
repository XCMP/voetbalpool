(function(express, path) {

  var PORT = 3000;
  var server = express();
  var router = express.Router();

  server.use(express.static('dist'));

  router.get("/",function(req,res){
      res.sendFile(path.join(__dirname + '/index.html'));
  });

  server.use('/',router);

  server.listen(PORT);
  console.log('Voetbalpool frontend server running on PORT %s', PORT);

})(require('express'), require('path'));
