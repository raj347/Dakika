'use strict'

import {app, BrowserWindow, dialog, globalShortcut, ipcMain, Menu, shell, Tray} from "electron";
const fs = require('fs')
var appIcon = null;
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
        'minWidth': 1200,
        icon: `${__dirname}/../../icons/pen.ico`
    })

    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    })
    const openFile = function () {
        dialog.showOpenDialog({title: 'Open a Previous Meeting Recording'}, function (fileNames) {

            if (fileNames === undefined) {

            } else {
                mainWindow.webContents.send('file-opened', fileNames[0]);
            }

        });
    }

    const newFile = function () {
        dialog.showSaveDialog({title: 'Create a New Meeting Recording'}, function (fileNames) {
            if (fileNames === undefined) {
                console.log('Error')
            } else {
                mainWindow.webContents.send('new-file', fileNames);
            }

        });
    }
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open Old Meeting Minutes',
                    accelerator: 'CmdOrCtrl+O',
                    click () {

                        openFile()
                    }
                },
                {
                    label: 'New Meeting Minutes',
                    accelerator: 'CmdOrCtrl+N',
                    click () {
                        newFile()

                    }
                },
                {
                    label: 'Save Minutes',
                    accelerator: 'CmdOrCtrl+S',
                    click () {
                        mainWindow.webContents.send('save-file');

                    }
                },
                {
                    label: 'Print as PDF',
                    accelerator: 'CmdOrCtrl+P',
                    click () {
                        mainWindow.webContents.send('print-pdf');

                    }
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {role: 'undo'},
                {role: 'redo'},
                {type: 'separator'},
                {role: 'cut'},
                {role: 'copy'},
                {role: 'paste'},
                {role: 'pasteandmatchstyle'},
                {role: 'delete'},
                {role: 'selectall'}
            ]
        },
        {
            label: 'View',
            submenu: [
                {role: 'reload'},
                {role: 'toggledevtools'},
                {type: 'separator'},
                {role: 'resetzoom'},
                {type: 'separator'},
            ]
        },
        {
            role: 'window',
            submenu: [
                {role: 'minimize'},
                {role: 'close'}
            ]
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'Learn More',
                    click () {
                        require('electron').shell.openExternal('https://electron.atom.io')
                    }
                }
            ]
        }
    ]
    const menu = Menu.buildFromTemplate(template);

    Menu.setApplicationMenu(menu);

    appIcon = new Tray(`${__dirname}/../../icons/pen.ico`);
    appIcon.setToolTip('Dakika');
    // eslint-disable-next-line no-console
    console.log('mainWindow opened')

}

app.on('ready', createWindow)

ipcMain.on('data-saved', function (event, args) {
    appIcon.displayBalloon({title: 'Dakika', content: 'Minutes Saved'})
})
ipcMain.on('print-to-pdf', function (event, args) {
    const pdfPath = args
    const win = BrowserWindow.fromWebContents(event.sender)
    // Use default printing options
    win.webContents.printToPDF({marginsType: 2, pageSize: 'A4'}, function (error, data) {
        if (error) throw error
        fs.writeFile(pdfPath, data, function (error) {
            if (error) {
                throw error
            }
            shell.openExternal('file://' + pdfPath)
            event.sender.send('wrote-pdf', pdfPath)
        })
    })
})

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
