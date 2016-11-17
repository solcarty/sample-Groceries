var applicationModule = require("application");
var setStatusBarColors = require("./shared/utils/status-bar-util").setStatusBarColors;

setStatusBarColors();
applicationModule.start({ moduleName: "views/login/login" });
