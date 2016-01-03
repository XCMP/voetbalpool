(function(express, path, bodyparser, mongoOp) {

  var server = express();
  var router = express.Router();

  server.use(bodyparser.json());
  server.use(bodyparser.urlencoded({"extended" : false}));
  server.use(express.static('dist'));

  router.get("/",function(req,res){
      res.sendFile(path.join(__dirname + '/index.html'));
  });

  router.route("/vp/poolplayers")
    .get(function(req,res){
      var response = {};
      mongoOp.find({},function(err,data){
      // Mongo command to fetch all data from collection.
          if(err) {
              response = {"error" : true,"message" : "Error fetching data"};
          } else {
              response = {"error" : false,"message" : data};
          }
          res.json(response.message);
      });
    });

  router.route("/vp/poolplayer")
    .post(function(req,res){
      var db = new mongoOp();
      var response = {};
      // fetch email and password from REST request.
      // Add strict validation when you use this in Production.
      db.name = req.body.name; 
      db.birthday =  new Date(req.body.birthday);
      db.notes = req.body.notes; 
      db.save(function(err){
      // save() will run insert() command of MongoDB.
      // it will add new data in collection.
        if(err) {
            response = {"error" : true,"message" : "Error adding data"};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
      })
    });

  router.route("/vp/poolplayer/:id")
    .delete(function(req,res){
      var response = {};
      // find the data
      mongoOp.findById(req.params.id,function(err,data){
          if(err) {
              response = {"error" : true,"message" : "Error fetching data"};
          } else {
              // data exists, remove it.
              mongoOp.remove({_id : req.params.id},function(err){
                  if(err) {
                      response = {"error" : true,"message" : "Error deleting data"};
                  } else {
                      response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
                  }
                  res.json(response);
              });
          }
      });
    });

  server.use('/',router);

  server.listen(3000);
  console.log("Listening to PORT 3000");

})(require('express'), require('path'), require('body-parser'), require('./src/app/models/mongo'));
