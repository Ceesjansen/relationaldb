module.exports = function(MenuItemService) {

  let svc = {};
  
  svc.run = function() {  
    let spss, t_toets, anova_test, anova_deep;
    let parent_2, parent_2_deep;

    MenuItemService
      .create("Spss", 'spss', 'spssshit')
      .then(result => {
        spss = result;
        return MenuItemService.create("T-Toets", 't-toets', 't-toetsshit');
      })
      .then(result => {
        t_toets = result;
        return MenuItemService.create("Anova Test", 'anova-test', 'anovashit');
      })
      .then(result => {
        anova_test = result;
        return MenuItemService.create("Anova Deep", 'anova-deep', 'anovadeepshit');
      })
      .then(result => {
        anova_deep = result;
        return MenuItemService.create("Parent 2", 'parent-2', 'parent-2shit');
      })
      .then(result => {
        parent_2 = result;
        return MenuItemService.create("Parent 2 Deep", 'parent-2-deep', 'parent-2-deepshit');
      })
      .then(result => {
        parent_2_deep = result;
        return MenuItemService.makeTopLevelItem(spss);
      })
      .then(() => MenuItemService.createRelationship(spss, t_toets))
      .then(() => MenuItemService.createRelationship(spss, anova_test))
      .then(() => MenuItemService.createRelationship(anova_test, anova_deep))

      .then(() => MenuItemService.makeTopLevelItem(parent_2))
      .then(() => MenuItemService.createRelationship(parent_2, parent_2_deep))
      
      // .then(onSucces)
      .catch(err => {
        console.log(`error: ${err}`);
        process.exit();
      });
  } 

  return svc;
}