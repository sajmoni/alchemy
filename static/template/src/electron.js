const { app, BrowserWindow } = require('electron')

const GAME_WIDTH = 1280
const GAME_HEIGHT = 720

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  // and load the index.html of the app.
  // win.loadFile('dist/index.html')
  win.loadURL('http://localhost:1234')

  win.webContents.openDevTools()
}

app.on('ready', createWindow)
