var Color = require("color").Color;
var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable");
var GroceryListViewModel = require("../../shared/view-models/grocery-list-view-model");
var socialShare = require("nativescript-social-share");
var setHintColor = require("../../shared/utils/hint-util").setHintColor;

var page;
var groceryList = new GroceryListViewModel([]);
var pageData = observableModule.fromObject({
  groceryList: groceryList,
  grocery: ""
});

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = pageData;

  groceryList.empty();
  pageData.set("isLoading", true);
  setHintColor({
    view: page.getViewById("grocery"),
    color: new Color("white")
  });

  groceryList.load().then(function() {
    pageData.set("isLoading", false);
    var listView = page.getViewById("groceryList");
    listView.className = listView.className + " visible";
  });
};

exports.add = function() {
  // Check for empty submissions
  if (pageData.get("grocery").trim() !== "") {
    // Dismiss the keyboard
    page.getViewById("grocery").dismissSoftInput();
    groceryList.add(pageData.get("grocery"))
      .catch(function(error) {
        console.log(error);
        dialogsModule.alert({
          message: "An error occurred while adding an item to your list.",
          okButtonText: "OK"
        });
      });
    // Empty the input field
    pageData.set("grocery", "");
  } else {
    dialogsModule.alert({
      message: "Enter a grocery item",
      okButtonText: "OK"
    });
  }
};

exports.share = function() {
  var list = [];
  var finalList = "";
  for (var i = 0, size = groceryList.length; i < size ; i++) {
    list.push(groceryList.getItem(i).name);
  }
  var listString = list.join(", ").trim();
  socialShare.shareText(listString);
};

exports.delete = function(args) {
  var item = args.view.bindingContext;
  var index = groceryList.indexOf(item);
  groceryList.delete(index);
};