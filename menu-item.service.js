module.exports = function(MenuItem, Relationship, _) {

  let svc = {};

  svc.getMenuItemChildren = function() {
    return new Promise(resolve => {
      let result = [], count = 0;

      Relationship.find({parent: null}).populate('parent child').exec((err, topLevelItems) => {
        console.log(topLevelItems)
        topLevelItems.forEach((item, index) => {
          findChildren(item, (err, menuItem) => {
            result[index] = {item: menuItem.parent, children: menuItem.children};
            count++;
  
            if (count === topLevelItems.length) {
              return resolve(result);
            }
          });
        })
      });
    });
  }


  function findChildren(menuItem, callback) {
    Relationship.find({parent: menuItem.child}).populate('parent child').exec((err, children) => {    
      if (children.length === 0) {
        return callback(null, menuItem);
      }
      let result = [], count = 0;
      
      children.forEach((item, index) => {
        findChildren(item, (err, tmp) => {
          result[index] = tmp.child ? {item: tmp.child} : _.merge({item: tmp.parent}, {children: tmp.children});
          count++;

          if (count === children.length)
          return callback(null, _.merge({parent: menuItem.child}, {children: result}));
        });
      });
    });
  }

  svc.create = function(title, url, content) {
    return new Promise((resolve, reject) => {
      MenuItem.create({title: title, url: url, content: content}, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      })
    });
  }
  svc.edit = function(prev, next) {
    return new Promise((resolve, reject) => {
      prev.child.title = next.title;
      prev.child.url = next.url;
      prev.child.content = next.content;
      findChildren(prev, (err, menuItem) => {
        let result = {item: menuItem.parent, children: menuItem.children};
        return resolve(result);
        });
    })
  }
  svc.makeTopLevelItem = function(menuItem) {
    return svc.createRelationship(null, menuItem);
  }

  svc.createRelationship = function(parent, child) {
    return new Promise((resolve, reject) => {
      Relationship.create({parent: parent ? parent._id : parent, child: child._id}, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  svc.format = function(items) {
    return items.map(item => {
      if (!item.parent) {

      }
    })
  }

  svc.addParentUrl = function(parentUrl, menuItem) {
    if (menuItem && menuItem.constructor === Array && menuItem.length > 0) {
      return menuItem.map((child, index) => svc.addParentUrl(parentUrl, child));
    }

    const url = `${parentUrl}/${menuItem.item.url}`;
    menuItem.item.url = url;

    MenuItem.findOneAndUpdate({_id: menuItem.item._id}, {url: url}, {upsert: true})
    if (!menuItem.children) {
      return menuItem;
    }

    return menuItem.children.map((child, index) => {
      console.log(child.item._id);
      return svc.addParentUrl(url, child);
    });
  }

  return svc;
}