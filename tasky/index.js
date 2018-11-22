const path = require("path");
const electron = require("electron");

const { app, BrowserWindow, Tray } = electron;

let mainWindow;
let tray;

//Creates main window that with fixed size, invisible
app.on("ready", () => {
	mainWindow = new BrowserWindow({
		height: 500,
		width: 300,
		frame: false,
		resizable: false,
		show: false
	});
	mainWindow.loadURL(`file://${__dirname}/src/index.html`);

	const iconeName =
		process.platform === "win32" ? "windows-icon.png" : "iconTemplate.png";
	const iconPath = path.join(__dirname, `./src/assets/${iconeName}`);
	tray = new Tray(iconPath);

	tray.on("click", (event, bounds) => {
		const { x, y} = bounds;

		//Window height and width
		const { height, width} = mainWindow.getBounds();


		if (mainWindow.isVisible()) {
			mainWindow.hide();
		} else {
			const yPosition = process.platform === 'darwin' ? y : y - height;
			mainWindow.setBounds({
				x: x - width /2,
				y,
				height,
				width
			});
			mainWindow.show();
		}
	});
});
