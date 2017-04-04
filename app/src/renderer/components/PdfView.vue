<template>
    <div class="ui grid" style="margin: 5px;">
        <div v-on:click="printData" class="no-print">Print</div>

        <table class="ui celled  table" style="  padding-right: 0rem;  padding-left: 0rem;">
            <tr v-for="minute in minutes">
                <td >
                    <b>Agenda :</b> {{minute.agenda}}<br/>
                    <p style="padding: 2px">{{minute.modified_minute}}</p>
                    <b>Participants :</b> <span v-for="person in minute.people">{{person}}</span> &nbsp
                </td>
            </tr>
        </table>
Saving Complete
    </div>
</template>

<script>
    /* eslint-disable indent,semi,no-undef,no-unused-vars */


    export default {
        components: {},
        mounted: function () {
            // const app = require('electron').remote.app;
            // console.log(app);
            this.filename = this.$route.query.fileName
            this.readFile()


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
            }
        },
        methods: {
            printData: function () {
                const ipc = require('electron').ipcRenderer
                ipc.send('print-to-pdf')
                alert('d');
            },
            readFile: function () {
                var jsonfile = require('jsonfile')
                var x = this;
                jsonfile.readFile(this.filename, function (err, obj) {

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

            },
        }
        ,
        watch: {}
    }
</script>

<style>
    html,
    body {

        overflow: scroll;
    }
    table { page-break-inside:auto }
    tr    { page-break-inside:avoid; page-break-after:auto }
    thead { display:table-header-group }
    tfoot { display:table-footer-group }
    @media print
    {
        .no-print, .no-print *
        {
            display: none !important;
        }
    }
</style>
