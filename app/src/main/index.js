'use strict'

import {app, BrowserWindow, Menu} from "electron";

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:${require('../../../config').port}`
    : `file://${__dirname}/index.html`

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 600,
        'minHeight': 600,
        'minWidth': 1200
    })

    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    Menu.setApplicationMenu(null);
    // eslint-disable-next-line no-console
    console.log('mainWindow opened')
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})
