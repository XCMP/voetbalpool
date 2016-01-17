var clubs = [];

(function(){

  VP.Image2Base64Converter = function() {
    
    this.run = function(imageUrlArray) {
      _.each(imageUrlArray, function(url) {
        this.convert(url, function(data) {
          var club = {
            key: url.replace('http://localhost:3000/images/', '').replace('.jpg', ''),
            logoBase64Url: data 
          };
          this.clubs.push(club);
          console.log(JSON.stringify(this.clubs));
        });
      }, this);
    };

    this.convert = function convertImgToDataURLviaCanvas(url, callback, outputFormat) {
      var img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function() {
          var canvas = document.createElement('CANVAS'),
              ctx = canvas.getContext('2d'),
              dataURL;

          canvas.height = this.height;
          canvas.width = this.width;
          ctx.drawImage(this, 0, 0);
          dataURL = canvas.toDataURL(outputFormat);
          callback(dataURL);
          canvas = null; 

      };
      img.src = url;
    };

    return {
      run: this.run,
      convert: this.convert
    }

  }

})()

  VP.Image2Base64Converter().run([
    //'http://localhost:3000/images/adodenhaag.jpg',
    //'http://localhost:3000/images/ajax.jpg',
    //'http://localhost:3000/images/az.jpg',
    //'http://localhost:3000/images/excelsior.jpg',
    //'http://localhost:3000/images/fctwente.jpg',
    //'http://localhost:3000/images/feyenoord.jpg',
    //'http://localhost:3000/images/degraafschap.jpg',
    //'http://localhost:3000/images/fcgroningen.jpg',
    //'http://localhost:3000/images/scheerenveen.jpg',
    //'http://localhost:3000/images/heraclesalmelo.jpg',
    //'http://localhost:3000/images/nec.jpg',
    //'http://localhost:3000/images/peczwolle.jpg',
    //'http://localhost:3000/images/psv.jpg',
    //'http://localhost:3000/images/rodajc.jpg',
    //'http://localhost:3000/images/sccambuur.jpg',
    'http://localhost:3000/images/utrecht.jpg',
    'http://localhost:3000/images/vitesse.jpg',
    'http://localhost:3000/images/willemii.jpg'
  ]);

