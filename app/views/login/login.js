var Color = require("color").Color;
var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var UserViewModel = require("../../shared/view-models/user-view-model");
var setHintColor = require("../../shared/utils/hint-util").setHintColor;

var user = new UserViewModel();
var page;
var isLoggingIn = true;

exports.loaded = function(args) {
  page = args.object;
  page.backgroundImage = page.ios ? "res://bg_login.jpg" : "res://bg_login";
  page.actionBarHidden = true;
  page.bindingContext = user;
};

exports.submit = function() {
  if (!user.isValidEmail()) {
    alert("Enter a valid email address.");
    return;
  }

  if (isLoggingIn) {
    login();
  } else {
    signUp();
  }
};

function login() {
  user.login()
    .catch(function(error) {
      console.log(error);
      dialogsModule.alert({
        message: "Unfortunately we could not find your account.",
        okButtonText: "OK"
      });
      return Promise.reject();
    })
    .then(function() {
      frameModule.topmost().navigate("views/list/list");
    });
}

function signUp() {
  user.register()
    .then(function() {
      dialogsModule
        .alert("Your account was successfully created.")
        .then(function() {
          toggleDisplay();
        });
    }).catch(function(error) {
      console.log(error);
      dialogsModule
        .alert({
          message: "Unfortunately we were unable to create your account.",
          okButtonText: "OK"
        });
    });
}

function toggleDisplay() {
  isLoggingIn = !isLoggingIn;
  setTextFieldColors();
  var container = page.getViewById("container");
  container.animate({
    backgroundColor: isLoggingIn ? new Color("white") : new Color("#301217"),
    duration: 200
  });
}
exports.toggleDisplay = toggleDisplay;

function setTextFieldColors() {
  var emailTextField = page.getViewById("email");
  var passwordTextField = page.getViewById("password");

  var mainTextColor = new Color(isLoggingIn ? "black" : "#C4AFB4");
  emailTextField.color = mainTextColor;
  passwordTextField.color = mainTextColor;

  var hintColor = new Color(isLoggingIn ? "#ACA6A7" : "#C4AFB4");
  setHintColor({ view: emailTextField, color: hintColor });
  setHintColor({ view: passwordTextField, color: hintColor });
}
