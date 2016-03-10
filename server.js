(function(express, path) {

  var PORT = process.env.OPENSHIFT_NODEJS_PORT || 3000
  var IP = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

  var server = express();
  var router = express.Router();

  server.use(express.static('dist'));

  router.get("/",function(req,res){
      res.sendFile(path.join(__dirname + '/index.html'));
  });

  server.use('/',router);

  server.listen(PORT, IP);

  console.log('Voetbalpool frontend server running on %s:%s', IP, PORT);

})(require('express'), require('path'));
