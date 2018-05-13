
module.exports = function(db) {

  const Relationship = new db.Schema({
    parent: {type: db.Schema.Types.ObjectId, ref: 'MenuItem', required: false},
    child: {type: db.Schema.Types.ObjectId, ref: 'MenuItem', required: true}
  });

  return db.model('Relationship', Relationship);

}