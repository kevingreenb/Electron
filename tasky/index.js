const path = require("path");
const electron = require("electron");
const TimerTray = require("./app/timer_tray");
const MainWindow = require("./app/main_window");

const { app, ipcMain } = electron;

let mainWindow;
let tray;

//Creates main window with fixed size, invisible at first
//with no frame
app.on("ready", () => {
	//Hide icon inside Dock since this is a Tray application
	app.dock.hide();
	mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);

	const iconName =
		process.platform === "win32" ? "windows-icon.png" : "iconTemplate.png";
	const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
	tray = new TimerTray(iconPath, mainWindow);
});

//IPC
ipcMain.on('update-timer', (event, timeLeft) =>{
	tray.setTitle(timeLeft);
})