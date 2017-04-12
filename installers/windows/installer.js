const electronInstaller = require('electron-winstaller')
resultPromise = electronInstaller.createWindowsInstaller({
  appDirectory: 'C:\\Users\\dwanyoike\\Dakika\\builds\\Dakika-win32-x64',
  outputDirectory: './Dakika',
  version: '0.0.1',
  description: 'Make Writing minutes a breeze',
  noMsi: true,
  overwrite: true,
  name: 'dakika',
  title: 'Dakika',
  setupIcon: 'C:\\Users\\dwanyoike\\Dakika\\installers\\windows\\pen.ico',
  setupExe: 'Dakika.exe',
  iconUrl: 'C:\\Users\\dwanyoike\\Dakika\\installers\\windows\\pen.ico'
})

resultPromise.then(() => console.log('It worked!'), (e) => console.log(`No dice: ${e.message}`))