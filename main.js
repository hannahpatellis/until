const os = require('os');
const path = require('path');
const { app, BrowserWindow, Menu, globalShortcut, ipcMain, shell } = require('electron');

// Set env
process.env.NODE_ENV = 'production';

const isDev = process.env.NODE_ENV !== 'production' ? true : false;
const isMac = process.platform === 'darwin' ? true : false;

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: isDev ? 950 : 400,
    height: 400,
    title: 'Until',
    icon: path.join(__dirname, 'assets/icons/Icon_256x256.png'),
    resizable: isDev ? true : false,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadFile('./app/index.html');
}

app.on('ready', () => {
  createMainWindow();

  // const mainMenu = Menu.buildFromTemplate(menu);
  // Menu.setApplicationMenu(mainMenu);

  // Global shortcut without a menu item
  // globalShortcut.register('CmdOrCtrl+R', () => mainWindow.reload());
  // if (isDev) {
  //   globalShortcut.register(isMac ? 'Command+Alt+I' : 'Ctrl+Shift+I', () => mainWindow.toggleDevTools());
  // }

  // Garbage collection
  mainWindow.on('ready', () => mainWindow = null);
});

// const menu = [
//   ...(isMac ? [{ 
//     label: app.name,
//     submenu: [
//       {
//         label: 'About',
//         click: createAboutWindow
//       },
//       { type: 'separator'},
//       { role: 'hide' },
//       { role: 'hideothers' },
//       { role: 'unhide' },
//       { type: 'separator' },
//       { role: 'quit' }
//     ]
//    }] : []),
//   { role: 'fileMenu' },
//   ...(!isMac ? [
//     {
//       label: 'Help',
//       submenu: [
//         {
//           label: 'About',
//           click: createAboutWindow
//         }
//       ]
//     }
//   ] : []),
//   ...(isDev ? [{
//     label: 'Developer',
//     submenu: [
//       { role: 'reload' },
//       { role: 'forcereload'},
//       { type: 'separator' },
//       { role: 'toggledevtools' }
//     ]
//   }] : [])
// ];


// app.on('window-all-closed', () => {
//   if(!isMac) {
//     app.quit();
//   }
// });

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});