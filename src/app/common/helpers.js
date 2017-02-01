/** 
  format an ISO date using Moment.js
  http://momentjs.com/
  moment syntax example: moment(Date("2011-07-18T15:50:52")).format("MMMM YYYY")
  usage: {{dateFormat creation_date format="MMMM YYYY"}}
*/
Handlebars.registerHelper('formatDate', function(context, block) {
  if (window.moment && context) {
    if (block.hash.translate) {
      return VP.Translation.translate(moment(context).format(block.hash.format));
    } else {
      return moment(context).format(block.hash.format);
    }
  } else {
    return context;
  };
});