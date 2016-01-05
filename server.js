(function(express, path) {

  var server = express();
  var router = express.Router();

  server.use(express.static('dist'));

  router.get("/",function(req,res){
      res.sendFile(path.join(__dirname + '/index.html'));
  });

  server.use('/',router);

  server.listen(3000);
  console.log("Listening to PORT 3000");

})(require('express'), require('path'));
