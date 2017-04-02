<template>

    <div class="container">

        <div class="nav">
            <attendant v-on:addAttendant="attendantAdded"></attendant>
            <div v-on:click="setupMeeting">Setup your Meeting</div>
        </div>

        <div class="main">
            <minute v-on:minute="minuteChanged" :attendants="attendants"></minute>
            <setup></setup>
        </div>


    </div>
</template>

<script>
    /* eslint-disable indent,semi */

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

      },
      data: function () {
        return {
          attendants: [],
          minutes: [],
          meeting: [],
          agenda: []
        }
      },
      methods: {
        setupMeeting: function () {
          $('.long.modal').modal('show');
        },
        attendantAdded: function ($attendants) {
          this.attendants = $attendants;
        },
        minuteChanged: function (minutes) {
          this.minutes = minutes;
        }
      },
      watch: {
        attendants: function () {

        },
        minutes: function () {
          /*
          const app = require('electron').remote.app;
          var jsonfile = require('jsonfile')
          var file = 'data.json'
          jsonfile.writeFile(file, this.minutes, function(err, obj) {
            console.dir(obj)
          })
          */
        },
        agenda: function () {

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
        padding-left: 2px;
    }

    .minute-text {
        font-family: 'Roboto', sans-serif;
        font-size: 13px;
    }

    .extra {
        font-family: 'Rubik', sans-serif;
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
