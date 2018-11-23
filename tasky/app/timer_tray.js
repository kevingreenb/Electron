const electron = require("electron");
const { Tray, app, Menu } = electron;


class TimerTray extends Tray {
	constructor(iconPath, mainWindow) {
		super(iconPath);

		this.mainWindow = mainWindow;
		//This Toop Tip allows description upon hover over the icon
		this.setToolTip("Kevin's Timer");
		this.on("click", this.onClick.bind(this));
		this.on("right-click", this.onRightClick.bind(this));
	}

	onClick(event, bounds) {
		const { x, y } = bounds;

		const { height, width } = this.mainWindow.getBounds();

		if (this.mainWindow.isVisible()) {
			this.mainWindow.hide();
		} else {
			const yPosition = process.platform === "darwin" ? y : y - height;
			this.mainWindow.setBounds({
				x: x - width / 2,
				y,
				height,
				width
			});
			this.mainWindow.show();
		}
	}

	onRightClick() {
		const menuConfig = Menu.buildFromTemplate([
			{
				label: "Quit",
				accelerator: "Command+Q",
				click: () => app.quit()
			}
		]);

		this.popUpContextMenu(menuConfig);
	}
}

module.exports = TimerTray;