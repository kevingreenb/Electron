const electron = require("electron");

//Destructuring the electron object
const { app, BrowserWindow, Menu, ipcMain } = electron;
let mainWindow;
let addWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({ title: "My Todo List" });
  mainWindow.loadURL(`file://${__dirname}/main.html`);
  mainWindow.on("closed", () => app.quit());

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

function createAddWindow() {
  addWindow = new BrowserWindow({
    widht: 300,
    height: 200,
    title: "Add New Todo"
  });
  addWindow.loadURL(`file://${__dirname}/add.html`);
  //garbage collection
  addWindow.on("closed", () => (addWindow = null));
}

ipcMain.on("todo:add", (event, todo) => {
  mainWindow.webContents.send("todo:add", todo);
  addWindow.close();
});


const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "New Todo",
        accelerator: process.platform === "darwin" ? "Command+D" : "Ctrl+D",
        click() {
          createAddWindow();
        }
      },

      {
        label: "Clear Todos",
        accelerator: process.platform === "darwin" ? "Command+X" : "Ctrl+X",
        click() {
          mainWindow.webContents.send('todo:clear');
        }
      },

      {
        label: "Quit",
        //Mac support and Windows for right shortcut
        accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        }
      }
    ]
  }
];

if (process.platform === "darwin") {
  //make support to put empty object in first of array
  menuTemplate.unshift({});
}
// render appropriate menuTemplate
if (process.env.NODE_ENV !== "production") {
  menuTemplate.push({
    label: "View",
    submenu: [
      { role: "reload" },
      {
        label: "Toggle Developer Tools",
        accelerator:
          process.platform === "darwin" ? "Command+Alt+I" : "Ctrl+Shift+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}
