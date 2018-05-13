const MONGO_URL = 'mongodb://admin:testing123@ds161148.mlab.com:61148/demo_chris'; // 'mongodb://localhost:27017/demo_chris';

const diContainer = require('./di-container')();

diContainer.register('_', require('lodash'));
diContainer.register('mongoose', require('mongoose'));
diContainer.register('MONGO_URL', MONGO_URL);

diContainer.factory('db', require('./db'));
diContainer.factory('MenuItem', require('./menu-item'));
diContainer.factory('Relationship', require('./relationship'));
diContainer.factory('MenuItemService', require('./menu-item.service'));
diContainer.factory('svc', require('./create-menu-items'));
const MenuItemService = diContainer.get('MenuItemService');
const svc = diContainer.get('svc');
const MenuItem = diContainer.get('MenuItem')
const Relationship = diContainer.get('Relationship')
// console.log(svc)
// MenuItem.remove().exec();
// Relationship.remove().exec();
// svc.run();

MenuItemService
  .getMenuItemChildren()
  .then(result => {
    // console.log(result)
    // console.log(`result: ${JSON.stringify(result, null, 4)}`);
    console.log(`result: ${JSON.stringify(MenuItemService.addParentUrl("", result), null, 4)}`);
   let testObj = {
     _id: '5af707efcefe851d0812b17b',
      parent: null,
      child:
       { _id: '5af707eecefe851d0812b175',
         title: 'Spss',
         url: 'spss',
         content: 'spssshit',
         __v: 0 },
      __v: 0 
    }
   let newData = {
     title: 'test2',
     url: 'test2',
     content: 'testtttcontent'
   }
   return MenuItemService.edit(testObj, newData);
  }).then(result => {
    // console.log(result);
    console.log(`result: ${JSON.stringify(MenuItemService.addParentUrl("", result), null, 4)}`);
    // console.log(result)
    // MenuItem.findOneAndUpdate({_id: result.item._id}, result, {new: true})
    function editMenu(data) {
      return new Promise((resolve) => {
        MenuItem.findOneAndUpdate({_id: data.item._id}, {title: data.item.title, url: data.item.url, content: data.item.content}, {upsert: true}, (err, newMenu) => {
          return resolve(newMenu);
        })
      });
    }
    return editMenu(result)
  }).then(result => {
    console.log(result)
  })
  .catch(err => console.log(`err: ${err}`));