# Dakika
> A minute taking application that makes writing minutes a breeze.

> Dakika is Kiswahili for minute

#Get Started
Download an Executable [Here](https://github.com/Madawar/Dakika/releases/latest)

> Remember its unsigned so your antivirus may act up. If you want to help read Help Me section below

# Built With
* Electron
* Vue.js
* sox - For audio Recording

# Features
## Use Attendant name Shortcut for fast typing
Use name initials (e.g @LA gets extrapolated to Lydia Adego) that will be automatically extrapolated by the system

![Extrapolate Attendance](http://codedcell.com/storage/Extrapolate.gif)

## Record Audio
Record Multiple audio Clips

![Record Audio](http://codedcell.com/storage/MinutesAudioRecording.gif)

## Mark Minutes as incomplete
![Mark Minutes as Incomplete](http://codedcell.com/storage/IncompleteMinutes.gif)

## Mark Attendance as Present or Absent
![Attendance](http://codedcell.com/storage/UserPresence.gif)

## Generate PDFS
[PDF Sample](http://codedcell.com/storage/MeetingExamplePDF.pdf)

## Low Memory and Network Usage
Electron apps are notorious for high Memory and Network usage we use as little as possible.
Below screenshot was taken when opening a 500kb file. Your minute files will rarely get that big

![Low Memory](http://codedcell.com/storage/Memory.png)



## Keyboard Shortcuts
Action | Shortcut
------------ | -------------
Edit Last Item | Alt + e
Move to next Agenda | Alt + N

## TODO
* Post to web apps (Dropbox, OneNote, Evernote, Generate Word Docs)
* Online Version of Dakika (Sync Minutes and Share Online)
* Create VSTO Outlook Add-in that automatically loads recepients and Agenda from Emails :gem:

## Help Me
I need to get a CodeSigning Certificate for Dakika. This is to make Dakika Executables more safe and installable without tripping anitvirus softwares

This Costs anywhere from 100-250$ per year.

As a general requirement this also incurs me the below cost :-
* Business Registration
* Notary/Lawyer Fees

If you are not able to help with development please consider donating.

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=TPWD9LHWGDBFA)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron app for production
npm run build

# lint all JS/Vue component files in `app/src`
npm run lint

# run webpack in production
npm run pack
```
More information can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/docs/npm_scripts.html).

---

This project was generated from [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about this project can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
