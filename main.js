'use strict';

const path = require('path');
const { app, BrowserWindow } = require('electron');

function main() {
  

  // create new window
  let mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 1000,
    height: 1080,
    frame: false,
  })

  // load app/index.html as the window content
  mainWindow.loadFile(path.join('app', 'index.html'));

}

app.on('ready', main);

app.on('window-all-closed', function () {
  app.quit();
});