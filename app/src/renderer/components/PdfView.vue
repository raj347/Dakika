<template>
    <div style="margin: 5px;">
        <div class="no-print ui  center aligned segment">
            <button v-on:click="printData" class="no-print ui secondary button">
                <i class="icon print"></i>
                Print


            </button>
            <button v-on:click="back" class="no-print ui primary button">
                <i class="icon backward"></i>
                Go Back
            </button>
        </div>
        <table class="ui orange striped table" style="padding: 0px;">
            <thead>
            <tr>
                <th>Attendants</th>
                <th>Present</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="attendant in data.attendants">
                <td>{{attendant.attendant}}</td>
                <td>
                    <span v-if="attendant.present"> Present </span>
                    <span v-else> Not Present </span>
                </td>
            </tr>
            </tbody>
        </table>
        <table class="ui green striped table" style="    padding-right: 0rem;  padding-left: 0rem;">
            <thead>
            <tr>
                <th>Minutes of the Meeting</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="minute in data.minutes" style="  page-break-inside: avoid; ">
                <td style="  page-break-inside: avoid; ">

                    <b>Agenda :</b> {{minute.agenda}}<br/>
                    <p style="text-align: justify; text-justify: inter-word; padding: 2px;   page-break-inside: avoid; ">
                        {{minute.modified_minute}}</p>
                    <b>Participants :</b> <span style="  page-break-inside: avoid; " v-for="person in minute.people">{{person}} </span>
                    &nbsp

                </td>
            </tr>
            </tbody>
        </table>
        <div class=" ui center aligned segment">
            <b style="text-align: center;">End of Meeting</b>
        </div>
    </div>
</template>

<script>
    /* eslint-disable indent,semi,no-undef,no-unused-vars */
    const ipc = require('electron').ipcRenderer
    const fs = require('fs');
    export default {
      beforeRouteEnter(to, from, next) {
        console.log(JSON.stringify(to.params.data.minutes))
        console.log(from.params.data)
        next(vm => {
          try {
            var obj = JSON.parse(fs.readFileSync(to.params.data.fileName))
            vm.filename = to.params.data.fileName
            vm.data = obj
          } catch (error) {
            console.log(error)
          }

        })
      },
      components: {},
      mounted: function () {
        ipc.on('wrote-pdf', (event, arg) => {
          this.$toasted.info('Succesfuly created your PDF file ' + arg, {
            theme: "bubble",
            position: "bottom-center",
            duration: 8000
          })
        });

      },
      data: function () {
        return {
          data: {},
          filename:''

        }
      },
      methods: {
        back: function () {
          this.$router.push({name: 'landing-page', params: {fileName: this.filename}})
        },
        printData: function () {
          const dialog = require('electron').remote.dialog;
          var x = this;
          dialog.showSaveDialog({
            filters: [

              {name: 'PDF File', extensions: ['pdf']}

            ], title: 'Create PDF of Minutes'
          }, function (fileNames) {
            if (fileNames === undefined) {
              console.log('Error')
            } else {
              ipc.send('print-to-pdf', fileNames)

            }

          });

        },
      }
      ,
      watch: {}
    }
</script>

<style scoped>
    * {
        overflow: auto;
        border-radius: 0px;
    }

    * {
        border-radius: 0 !important;
        font-family: "Times New Roman", Times, serif;
    }

    html,
    body {
        height: auto;
        overflow: auto;
    }

    thead {
        display: table-header-group
    }

    tfoot {
        display: table-footer-group
    }

    @media print {
        .no-print, .no-print * {
            display: none !important;
        }
    }
</style>
