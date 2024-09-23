import SquirrelEvents from "./app/events/squirrel.events";
import ElectronEvents from "./app/events/electron.events";
import UpdateEvents from "./app/events/update.events";
import { app, BrowserWindow } from "electron";
import App from "./app/app";

export default class Main {
  static initialize() {
    if (SquirrelEvents.handleEvents()) {
      // squirrel event handled (except first run event) and app will exit in 1000ms, so don't do anything else
      app.quit();
    }
    // const x = "electron-debug";
    // import(x).then((a) => {
    //   // TypeScript knows that `x` is 'someplace' and will infer the type of `a` correctly
    //   a.debug();
    // });
  }

  static bootstrapApp() {
    App.main(app, BrowserWindow);
  }

  static bootstrapAppEvents() {
    ElectronEvents.bootstrapElectronEvents();

    // initialize auto updater service
    if (!App.isDevelopmentMode()) {
      // UpdateEvents.initAutoUpdateService();
    }
  }
}

// handle setup events as quickly as possible
Main.initialize();

// bootstrap app
Main.bootstrapApp();
Main.bootstrapAppEvents();
