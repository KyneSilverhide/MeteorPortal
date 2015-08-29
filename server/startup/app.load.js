Meteor.startup(function() {
  console.log("Application is starting with : " + Tasks.find().count() + " tasks, " + Albums.find().count() + " album(s) and " + Images.find().count() + " images");
  console.log("ImageMagic available : " + gm.isAvailable );
});
