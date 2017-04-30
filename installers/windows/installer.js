const electronInstaller = require('electron-winstaller')
console.log('Building from this directory' + `${__dirname}/../../builds/Dakika-win32-x64`)
resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: `${__dirname}/../../builds/Dakika-win32-x64`,
    outputDirectory: './Dakika',
    version: '0.0.1',
    authors: 'CodedCell',
    description: 'Make Writing minutes a breeze',
    noMsi: true,
    overwrite: true,
    name: 'dakika',
    owners: 'CodedCell',
    title: 'Dakika',
    setupIcon: `${__dirname}\\pen.ico`,
    setupExe: 'Dakika_Setup.exe',
    iconUrl: `${__dirname}\\pen.ico`,
    remoteReleases: 'http://updates.codedcell.com/'
})

resultPromise.then(() => console.log('It worked!'), (e) => console.log(`No dice: ${e.message}`))