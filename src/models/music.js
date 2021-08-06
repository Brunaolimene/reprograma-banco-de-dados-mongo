const mongoose = require("mongoose");
//require('@mongoosejs/double');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;




const musicsSchema = new mongoose.Schema({
    id: {type: SchemaTypes.Double},
    title: {type: String},
    duration: {type: String},
    launchYear: {type: String},
    favorited: {type: Boolean},
    artists: {type: Array}

}, {
    versionKey: false
});

// musicsSchema.virtual("ticket")
// get(function (){
//     return this.id + '-' + this.destination.local;
// })
// set(function (v){
//     this.id = v.substr(0, v.indexOf('-'));
//     this.destination.local = v.substr(v.indexOf('-') + 1)
// });

const musics = mongoose.model("musics", musicsSchema)

module.exports = musics