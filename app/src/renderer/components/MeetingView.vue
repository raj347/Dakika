<template>

    <div class="container">

        <div class="nav">
            <attendant :saved_attendants="old_attendants" v-model="attendants"></attendant>
            <div v-on:click="setupMeeting">Setup your Meeting</div>
        </div>
        <div class="main">
            <minute :saved_minutes="old_minutes" v-model="minutes" :attendants="attendants"></minute>
            <setup></setup>
        </div>
        <div id="overlay">
            <div class="ui icon buttons">
                <button v-on:click="newFile" class="ui violet button"><i class="align file outline icon"></i></button>
                <button v-on:click="openFile" class="ui green button"><i class="align folder open icon"></i></button>

            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable indent,semi,no-undef,no-unused-vars */

    import Attendant from './Attendant/Attendant.vue'
    import Setup from './MeetingSetup.vue'
    import Minute from './Minute/Minute.vue'
    import 'semantic-ui-css/components/modal.min.js'
    import 'semantic-ui-css/components/dimmer.min.js'
    import 'semantic-ui-css/components/transition.min.js'
    export default {
      components: {
        Attendant,
        Minute,
        Setup
      },
      mounted: function () {
        // const app = require('electron').remote.app;
        // console.log(app);

        this.filename = this.$route.query.name
        if (this.$route.query.type === 'new') {
          this.newFile();
        } else {
          this.readFile(this.filename);
        }

        this.saving = 0;
      },
      data: function () {
        return {
          attendants: [],
          minutes: [],
          meeting: [],
          agenda: [],
          old_minutes: [],
          old_attendants: [],
          filename: '',
          saving: 1
        }
      },
      methods: {
        readFile: function () {
          var jsonfile = require('jsonfile')
          var x = this;
          jsonfile.readFile(this.filename, function (err, obj) {
            if (x.checkFileValidity(obj) == false) {
              const app = require('electron').remote.dialog;
              app.showMessageBox({
                title: 'Error Opening File',
                detail: 'The file you are opening is in the wrong format, Please make sure you are opening a .min file'
              });
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
          })
          this.saving = 1;
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
        checkFileValidity: function (obj) {
          try {
            JSON.parse(JSON.stringify(obj));
          } catch (e) {
            return false;
          }
          return true;

        },
        newFile: function () {
          const app = require('electron').remote.dialog;

          var x = this;
          app.showSaveDialog({title: 'Create a New Meeting Recording'}, function (fileNames) {
            console.log('there')
            if (fileNames === undefined) {
              console.log('Error')
            } else {
              console.log('here')
              x.attendants = []
              x.minutes = []
              x.meeting = []
              x.agenda = []
              x.old_minutes = []
              x.old_attendants = []
              x.filename = ''
              x.filename = fileNames;
            }

          });
        },
        saveFile: function () {
          console.log('saving');
          this.saving = 1;
          const app = require('electron').remote.app;
          var jsonfile = require('jsonfile')
          var obj = {agenda: this.agenda, attendants: this.attendants, minutes: this.minutes}
          jsonfile.writeFile(this.filename, obj, function (err, obj) {
            console.dir(obj)
          });
          this.saving = 0;
        },
        openFile: function () {
          const app = require('electron').remote.dialog;
          var x = this;
          app.showOpenDialog({title: 'Open a Previous Meeting Recording'}, function (fileNames) {
            if (fileNames === undefined) {

            } else {
              x.filename = fileNames[0];
              x.readFile();
            }

          });
        }
      }
      ,
      watch: {
        attendants: function () {
          if (this.saving === 0) {
            this.saveFile();
          }
        }
        ,
        minutes: function () {
          if (this.saving === 0) {
            this.saveFile();
          }
        }
        ,
        agenda: function () {

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

    div#overlay {
        position: fixed;
        bottom: 0;
        right: 30%;
        background: rgba(0, 0, 0, 0.4);
        padding: 5px;
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
        background: #ffffff;
        width: 400px;
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
        margin-left: 400px;

    }

    .fixed-head {
        position: fixed;
        top: 0px;
        left: 400px;
        right: 0px;
        opacity: 0.8;
        background-color: #f8f8f8;
        padding: 2px;
        box-shadow: 0 4px 2px -2px gray;
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
        background: #f5f5f5;
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
