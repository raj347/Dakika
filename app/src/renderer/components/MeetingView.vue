<template>

    <div class="container">

        <div class="nav">
            <attendant :saved_attendants="old_attendants" v-model="attendants"></attendant>

        </div>
        <div class="main">
            <minute :saved_minutes="old_minutes" :saved_agendas="old_agendas" v-model="minutes"
                    v-on:agenda="agendaUpdated"
                    :attendants="attendants"></minute>

        </div>

    </div>
</template>

<script>
    /* eslint-disable indent,semi,no-undef,no-unused-vars */

    import Attendant from './Attendant/Attendant.vue'
    import Setup from './MeetingSetup.vue'
    import Minute from './Minute/Minute.vue'
    import debounce from 'debounce';

    const ipc = require('electron').ipcRenderer
    const app = require('electron').remote.dialog;
    const jsonfile = require('jsonfile')

    export default {
      components: {
        Attendant,
        Minute,
        Setup
      },
      mounted: function () {
        // const app = require('electron').remote.app;

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
          console.log(arg)
        });
        ipc.on('save-file', (event, arg) => {
          this.saveFile()
        });

        ipc.on('print-pdf', (event, arg) => {
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
          attendants: [],
          minutes: [],
          meeting: [],
          agenda: [],
          old_minutes: [],
          old_attendants: [],
          old_agendas: [],
          filename: null,
          saving: 1,

        }
      },
      methods: {

        readFile: function () {
          var x = this;
          jsonfile.readFile(this.filename, function (err, obj) {
            if (x.checkFileValidity(obj) == false) {

              app.showMessageBox({
                title: 'Error Opening File',
                detail: 'The file you are opening is in the wrong format, Please make sure you are opening a .min file'
              });
              x.truncateData()
              return 0;
            }
            if (obj.minutes !== 'undefined' || obj.minutes !== null || obj.minutes !== undefined) {
              x.old_minutes = obj.minutes;
              x.minutes = obj.minutes;
            }
            if (obj.attendants !== 'undefined' || obj.attendants !== null || obj.attendants !== undefined) {
              x.old_attendants = obj.attendants;
              x.attendants = obj.attendants;
            }
            if (obj.agenda !== 'undefined' || obj.agenda !== null || obj.agenda !== undefined) {
              x.old_agendas = obj.agenda;
              x.agenda = obj.agenda;
            }

          })
          this.saving = 0;
        },
        setupMeeting: function () {
          $('.long.modal').modal('show')
        },
        attendantAdded: function ($attendants) {
          this.attendants = $attendants;
        },
        minuteChanged: function (minutes) {
          this.minutes = minutes;
        },
        agendaUpdated: function (agenda) {
          this.agenda = agenda
          this.saveFileDebounce();
        },
        checkFileValidity: function (obj) {
          try {
            JSON.parse(JSON.stringify(obj));
          } catch (e) {
            return false;
          }
          return true;

        },
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
        },
        saveFile: function () {
          if (this.saving === 1) {
            console.log(this.saving)
            return 0;
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
          var x = this;
          jsonfile.writeFile(this.filename, obj, function (err, obj) {
            if (err) throw err;
            x.saving = 0;
            ipc.send('data-saved')
            console.log('saved')
          });

        },
        saveFileDebounce: debounce(function () {
          this.saveFile()
        }, 10000)
      },
      watch: {
        attendants: function () {

          this.saveFileDebounce;

        }
        ,
        minutes: function () {

          this.saveFileDebounce;

        }
        ,
        agenda: function () {

        },
        filename: function () {
          document.title = 'Dakika : ' + this.filename.split('\\').pop().split('/').pop();
          ;
        }
      }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Roboto|Rubik');

    * {
        border-radius: 0px !important;
    }

    html,
    body {
        height: 100%;
        padding: 0;
        margin: 0;

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

    .nav {
        background: #fdfcfd; /*#fffeff*/
        width: 300px;
        -ms-flex: 0 100px;
        -webkit-box-flex: 0;
        -moz-box-flex: 0;
        -ms-box-flex: 0;
        box-flex: 0;
        height: 100%;
        position: fixed;
        overflow-y: scroll;
        border-right: 1px solid #e7e6e8;
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

        padding: 2px;

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
