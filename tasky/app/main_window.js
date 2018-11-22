const electron = require('electron');
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
  constructor(url) {
    super({
      height: 500,
      width: 300,
      frame: false,
      resizable: false,
      show: false,
      //Application runs at full speed even if it's in background
      webPreferences: { backgroundThrottling: false }
    });
    //This loads the HTML content into the window
    //The HTML can be change to something like a login screen, etc...
    this.loadURL(url);
    this.on('blur', this.onBlur.bind(this));
  }

  onBlur() {
    this.hide();
  }
}

module.exports = MainWindow;
