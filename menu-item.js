
module.exports = function(db) {

  const MenuItem = new db.Schema({
    title: {type: String, required: true},
    url: {type: String, required: true}, // zelfde als slug, maar zorg er juist voor dat je de url dynamisch bepaald
    content: {type: String, required: false}
  });

  return db.model('MenuItem', MenuItem);
}