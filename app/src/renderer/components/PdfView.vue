<template>
    <div  style="margin: 5px;">
        <div v-on:click="printData" class="no-print ui secondary button">Print</div>
        <div v-on:click="back" class="no-print ui primary button">Go Back</div>

        <table class="ui striped table" style="padding: 0px;">
            <thead>
            <tr>
                <th>Attendants</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="attendant in data.attendants">
                <td>{{attendant.attendant}}</td>
            </tr>
            </tbody>
        </table>
        <table class="ui striped table" style="    padding-right: 0rem;  padding-left: 0rem;">
            <tr v-for="minute in data.minutes" style="display: block;  page-break-inside: avoid; ">
                <td style="  page-break-inside: avoid; ">

                    <b>Agenda :</b> {{minute.agenda}}<br/>
                    <p style="text-align: justify; text-justify: inter-word; padding: 2px;   page-break-inside: avoid; ">{{minute.modified_minute}}</p>
                    <b>Participants :</b> <span style="  page-break-inside: avoid; " v-for="person in minute.people">{{person}}</span> &nbsp








                </td>
            </tr>
        </table>
        <b style="text-align: center;">End of Meeting</b>
    </div>
</template>

<script>
    /* eslint-disable indent,semi,no-undef,no-unused-vars */
    const ipc = require('electron').ipcRenderer
    export default {
        components: {},
        mounted: function () {

            this.data = this.$route.params.data



            ipc.on('wrote-pdf', (event, arg) => {
                console.log(arg)
            });

        },
        data: function () {
            return {
                data: {}

            }
        },
        methods: {
            back: function () {
                 this.$router.push({name: 'landing-page', params: {fileName: this.data.fileName}})
            },
            printData: function () {
                const dialog = require('electron').remote.dialog;
                var x = this;
                dialog.showSaveDialog({filters: [

                    { name: 'PDF File', extensions: ['pdf'] }

                ],title: 'Create PDF of Minutes'}, function (fileNames) {
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
