const electronInstaller = require('electron-winstaller')
resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: "C:\\Users\\dwany\\Dakika\\builds\\Dakika-win32-x64",
    outputDirectory: '.',
    authors: 'My App Inc.',
    exe: 'Dakika.exe'
});

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));