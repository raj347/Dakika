<template>

    <div class="container">

        <div class="nav">
            <div class="audio-recorder" style="height: 79px; border-bottom: 1px solid #e7e6e8;">
                <div style="margin: 0 auto; text-align: center; padding-top: 5px;">
                    <select v-model="recording_device" style="">
                        <option v-for="device in audio_devices" v-bind:value="device.id">{{device.label}}</option>
                    </select>
                </div>
                <div style="text-align: center; margin: 0 auto; padding-top: 3px;">
                    <div v-if="recording == false" v-on:click="startAudioRecording" id="stop"><i class="big green play icon"></i>
                    </div>
                    <div v-else v-on:click="stopAudioRecording" id="start"><i class="big stop red icon"></i></div>
                </div>
                <div v-if="recording" class="blink_me" style="text-align: center; margin: 0 auto; padding-top: 1px;">
                    Recording
                </div>

            </div>

            <attendant :saved_attendants="old_attendants" :filename="filename" v-model="attendants"></attendant>

        </div>
        <div class="main">
            <minute :saved_minutes="old_minutes" :filename="filename" :saved_agendas="old_agendas" v-model="minutes"
                    v-on:agenda="agendaUpdated"
                    :attendants="attendants"></minute>

        </div>

    </div>
</template>

<script>
    /* eslint-disable indent,semi,no-undef,no-unused-vars */

    import Attendant from './Attendant/Attendant.vue'
    import Minute from './Minute/Minute.vue'
    import debounce from 'debounce';

    const ipc = require('electron').ipcRenderer
    const app = require('electron').remote.dialog;
    const fs = require('fs');
    var RecordRTC = require('recordrtc');
    export default {
      components: {
        Attendant,
        Minute
      },
      mounted: function () {
        // const app = require('electron').remote.app;
        var x = this;
        navigator.mediaDevices.enumerateDevices()
          .then(function (devices) {
            devices.forEach(function (device) {
              if (device.kind === 'audioinput') {
                x.audio_devices.push({label: device.label, id: device.deviceId})
                console.log(device.kind + ": " + device.label + " id = " + device.deviceId);
              }
            });
          })
          .catch(function (err) {
            console.log(err.name + ": " + err.message);
          });

        ipc.send('get-file-data');

        var filename = this.$route.params.fileName;
        if (typeof filename != 'undefined') {
          this.filename = filename
          this.readFile(filename);
        }
        ipc.on('file-opened', (event, arg) => {
          this.filename = arg;
          this.readFile(this.filename);

        });
        ipc.on('new-file', (event, arg) => {
          this.truncateData();
          this.filename = arg;
          this.saving = 0;
        });
        ipc.on('save-file', (event, arg) => {
          this.saveFile()
        });

        ipc.on('print-pdf', (event, arg) => {
          this.saveFile()
          this.readFile()
          this.$router.push({
            name: 'savepdf', params: {
              data: {
                agenda: this.agenda,
                attendants: this.attendants,
                minutes: this.minutes,
                fileName: this.filename
              },

            }
          })
        });

      },
      data: function () {
        return {
          stream: '',
          attendants: [],
          minutes: [],
          meeting: [],
          agenda: [],
          old_minutes: [],
          old_attendants: [],
          old_agendas: [],
          filename: null,
          saving: 1,
          recording: false,
          audio_devices: [],
          recording_device: null,
          rtc: null

        }
      },
      methods: {
        startAudioRecording: function () {
          var constraints = {
            audio: {exact: this.recording_device},
            video: false,
            deviceId: {exact: this.recording_device}
          };
          var recordRTC;
          navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            recordRTC = RecordRTC(stream, {
              type: 'audio',
              // recorderType: StereoAudioRecorder
            });
            window.rtc = recordRTC;

            recordRTC.startRecording()

          }).catch(function (err) {
            console.log('navigator.getUserMedia error: ', err);
          });

          this.recording = true;
        },
        stopAudioRecording: function () {
          window.rtc.stopRecording(function (audioURL) {
            var recordedBlob = window.rtc.getBlob();
            console.log(window.rtc.blob)
            try {
              window.rtc.save();

              //recordRTC.writeToDisk();

            } catch (error) {
              console.log(error)
              // if there was some kind of error, return the passed in defaults instead.
            }
            window.rtc.getDataURL(function (dataURL) {
              //fs.writeFileSync('C:\\record.webm', dataURL);
            });
          });
          this.recording = false;
        },
        getFileStatus: function () {
          var x = this;
          fs.readFile(x.filename, function (err, data) {
            try {
              var obj = JSON.parse(data)
            } catch (e) {
              document.title = 'Dakika : ' + x.filename.split('\\').pop().split('/').pop() + ' - Unsaved';
              return 0;
            }

            var liveObj = {agenda: x.agenda, attendants: x.attendants, minutes: x.minutes}
            if (JSON.stringify(liveObj) == JSON.stringify(obj)) {
              document.title = 'Dakika : ' + x.filename.split('\\').pop().split('/').pop();
            } else {
              document.title = 'Dakika : ' + x.filename.split('\\').pop().split('/').pop() + ' - Unsaved';
            }
          });

        },
        readFile: function () {
          this.saving = 1;
          try {
            var obj = JSON.parse(fs.readFileSync(this.filename));
            if (this.checkFileValidity(obj) == false) {

              app.showMessageBox({
                title: 'Error Opening File',
                detail: 'The file you are opening is in the wrong format, Please make sure you are opening a .min file'
              });
              this.truncateData()
              return 0;
            }
            if (obj.minutes !== 'undefined' || obj.minutes !== null || obj.minutes !== undefined) {
              this.old_minutes = obj.minutes;
              this.minutes = obj.minutes;
            }
            if (obj.attendants !== 'undefined' || obj.attendants !== null || obj.attendants !== undefined) {
              this.old_attendants = obj.attendants;
              this.attendants = obj.attendants;
            }
            if (obj.agenda !== 'undefined' || obj.agenda !== null || obj.agenda !== undefined) {
              this.old_agendas = obj.agenda;
              this.agenda = obj.agenda;
            }

          } catch (error) {
            // if there was some kind of error, return the passed in defaults instead.
            console.log(error)

          }
          this.saving = 0;

        }
        ,
        attendantAdded: function ($attendants) {
          this.attendants = $attendants;
        }
        ,
        minuteChanged: function (minutes) {
          this.minutes = minutes;
        }
        ,
        agendaUpdated: function (agenda) {
          this.agenda = agenda
          this.saveFileDebounce();
        }
        ,
        checkFileValidity: function (obj) {
          try {
            JSON.parse(JSON.stringify(obj));
          } catch (e) {
            return false;
          }
          return true;

        }
        ,
        truncateData: function () {
          this.attendants = []
          this.minutes = []
          this.meeting = []
          this.agenda = []
          this.old_minutes = []
          this.old_attendants = []
          this.old_agendas = []
          this.editing_minute = null
          this.filename = null
          this.saving = 1
        }
        ,
        saveFile: function () {
          if (this.saving === 1) {
            console.log("Not Saving")
            return 0;
          } else {
            console.log("Saving File")
          }
          if (this.filename === null) {
            app.showMessageBox({
              title: 'Error Opening File',
              detail: 'You have not opened a file for saving, Please make sure you have opened a .min file'
            });
            return 0;
          }
          this.saving = 1;

          var obj = {agenda: this.agenda, attendants: this.attendants, minutes: this.minutes}
          try {
            fs.writeFileSync(this.filename, JSON.stringify(obj));
            this.getFileStatus()
            this.saving = 0;
          } catch (error) {
            console.log(error)
            // if there was some kind of error, return the passed in defaults instead.

          }

        },
        saveFileDebounce: debounce(function () {
          this.saveFile()
        }, 10000)
      },
      watch: {
        attendants: function () {
          this.getFileStatus();
          this.saveFileDebounce;

        },
        minutes: function () {
          this.getFileStatus();
          this.saveFileDebounce;

        },
        agenda: function () {
          this.getFileStatus();
        },
        filename: function () {
          this.getFileStatus();
        }
      }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Roboto|Rubik');

    html,
    body {
        height: 100%;
        padding: 0;
        margin: 0;

    }
    .blink_me {
        animation: blinker 1s linear infinite;
    }

    @keyframes blinker {
        50% { opacity: 0; }
    }
    .modal {
        border-radius: 0px;
    }

    .container {
        height: 100%;
        display: -ms-flexbox;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-box;
        display: box;

        -ms-flex-direction: row;
        -webkit-box-orient: horizontal;
        -moz-box-orient: horizontal;
        -ms-box-orient: horizontal;
        box-orient: horizontal;
    }

    .noselect {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none;
        /* Non-prefixed version, currently
                                         supported by Chrome and Opera */
    }

    .nav {
        background: #fafafa;
        /*background: -moz-linear-gradient(272deg, rgba(250, 250, 250, 1) 0%, rgba(255, 255, 255, 1) 100%); !* ff3.6+ *!*/
        /*background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(250, 250, 250, 1)), color-stop(100%, rgba(255, 255, 255, 1))); !* safari4+,chrome *!*/
        /*background: -webkit-linear-gradient(272deg, rgba(250, 250, 250, 1) 0%, rgba(255, 255, 255, 1) 100%); !* safari5.1+,chrome10+ *!*/
        /*background: -o-linear-gradient(272deg, rgba(250, 250, 250, 1) 0%, rgba(255, 255, 255, 1) 100%); !* opera 11.10+ *!*/
        /*background: -ms-linear-gradient(272deg, rgba(250, 250, 250, 1) 0%, rgba(255, 255, 255, 1) 100%); !* ie10+ *!*/
        /*background: linear-gradient(178deg, rgba(250, 250, 250, 1) 0%, rgba(255, 255, 255, 1) 100%); !* w3c *!*/
        /*filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FAFAFA', endColorstr='#FFFFFF', GradientType=0); !* ie6-9 *!*/
        /*filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f3f3f3', endColorstr='#FAFAFA', GradientType=0); !* ie6-9 *!*/
        width: 300px;
        -ms-flex: 0 100px;
        -webkit-box-flex: 0;
        -moz-box-flex: 0;
        -ms-box-flex: 0;
        box-flex: 0;
        height: 100%;
        position: fixed;

        border-right: 1px solid #e7e6e8;
    }

    .gradient {
        background: #fafafa;
        /*background: -moz-linear-gradient(272deg, rgba(250, 250, 250, 1) 0%, rgba(255, 255, 255, 1) 100%); !* ff3.6+ *!*/
        /*background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(250, 250, 250, 1)), color-stop(100%, rgba(255, 255, 255, 1))); !* safari4+,chrome *!*/
        /*background: -webkit-linear-gradient(272deg, rgba(250, 250, 250, 1) 0%, rgba(255, 255, 255, 1) 100%); !* safari5.1+,chrome10+ *!*/
        /*background: -o-linear-gradient(272deg, rgba(250, 250, 250, 1) 0%, rgba(255, 255, 255, 1) 100%); !* opera 11.10+ *!*/
        /*background: -ms-linear-gradient(272deg, rgba(250, 250, 250, 1) 0%, rgba(255, 255, 255, 1) 100%); !* ie10+ *!*/
        /*background: linear-gradient(178deg, rgba(250, 250, 250, 1) 0%, rgba(255, 255, 255, 1) 100%); !* w3c *!*/
        /*filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FAFAFA', endColorstr='#FFFFFF', GradientType=0); !* ie6-9 *!*/
        /*filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f3f3f3', endColorstr='#FAFAFA', GradientType=0); !* ie6-9 *!*/

    }

    .main {
        -ms-flex: 1;
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        -ms-box-flex: 1;
        box-flex: 1;
        margin-left: 300px;
        height: 100%;
    }

    .fixed-head {
        position: fixed;
        top: 0px;
        left: 300px;
        right: 0px;
        opacity: 0.8;
        background: rgba(243, 243, 243, 0.17);
        padding: 10px;
        background: -moz-linear-gradient(272deg, rgba(250, 250, 250, 1) 0%, rgba(255, 255, 255, 1) 100%); /* ff3.6+ */
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(250, 250, 250, 1)), color-stop(100%, rgba(255, 255, 255, 1))); /* safari4+,chrome */
        background: -webkit-linear-gradient(272deg, rgba(250, 250, 250, 1) 0%, rgba(255, 255, 255, 1) 100%); /* safari5.1+,chrome10+ */
        background: -o-linear-gradient(272deg, rgba(250, 250, 250, 1) 0%, rgba(255, 255, 255, 1) 100%); /* opera 11.10+ */
        background: -ms-linear-gradient(272deg, rgba(250, 250, 250, 1) 0%, rgba(255, 255, 255, 1) 100%); /* ie10+ */
        background: linear-gradient(178deg, rgba(250, 250, 250, 1) 0%, rgba(255, 255, 255, 1) 100%); /* w3c */
        z-index: 1000;

    }

    .data-content {
        margin-top: 75px;

    }

    .item {
        padding-top: 0.5em !important;
        padding-bottom: 0.5em !important;
    }

    .attendant {
        color: black !important;
    }

    textarea, input {
        border-radius: 0px !important;
    }

    .pic {
        padding-left: 2px;
    }

    .avatar-header {
        color: white !important;
    }

    .title-h {
        border-bottom: 1px solid rgba(34, 36, 38, 0.15) !important;
        padding-bottom: 0.5em !important;
        padding-top: 0.5em !important;
        text-align: center;
        font-weight: bold !important;
        background-color: #f7f8f9;
        margin-bottom: 3px !important;
    }

    .minute-heading {
        font-size: 1.1em !important;
        font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
        font-weight: 800 !important;
        padding: 2px;
    }

    .description {
        padding-left: 0px;
    }

    .minute-text {

        font-size: 13px;
    }

    .extra {

        padding-right: 2px;
        padding-left: 2px;
        font-weight: bold;
    }

    .hidden {
        border: none;
        width: 300px;
    }

    .hidden:focus {
        outline: none;
    }
</style>
