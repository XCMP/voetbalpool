(function(mongoose) {

  mongoose.connect('mongodb://localhost:27017/voetbalpool');
  var mongoSchema =  mongoose.Schema;
  var Poolplayer  = {
      'name' : String,
      'birthday' : Date,
      'notes': String
  };

  module.exports = mongoose.model('poolplayer',Poolplayer);

})(require('mongoose'));