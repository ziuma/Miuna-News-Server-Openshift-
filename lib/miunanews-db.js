var dbcredential = process.env.OPENSHIFT_MONGODB_DB_URL;
var dbname = 'miunanews';

var url = dbcredential + dbname;
var mongoose = require('mongoose');

mongoose.connect(url, function(err){
	if(err) {
		console.log(err);
	} else {
		console.log('Connected to mongodb!');
	}
});

var newsSchema = mongoose.Schema({
	nick: String,
	uid: String,
	msg: String,
	tid: String,
	url: String,
	avatar: String,
	type: String,
	created: Date
});

var News = mongoose.model('news', newsSchema);

exports.getOldNews = function(data, cb){
	var query = News.find({});
	query.sort('-_id').limit(parseInt(data.newslimit)*3).exec(function(err, docs){
		cb(err, docs);
	});
}

exports.saveNews = function(data, cb){
	var newMsg = new News({nick: data.nick, uid: data.uid, msg: data.msg, tid: data.tid, url: data.url, avatar: data.avatar, type: data.type, created: data.created});
	News.find({}).count({}, function(err, docs){
		if (docs > parseInt(data.newslimit)*3) {
			News.find({}).sort('_id').findOneAndRemove().exec();
			newMsg.save(function(err, docs){cb(err, docs);});
		}
		else {
			newMsg.save(function(err, docs){cb(err, docs);});
		}
	});
};