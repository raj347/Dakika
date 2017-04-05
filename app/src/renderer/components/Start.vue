<template>
    <div class="Aligner">

        <div class="Aligner-item">
            <button v-on:click="newFile" class="circular ui green icon button">
                <i class="icon file text outline"></i>
            </button>
            <button v-on:click="openFile" class="circular ui violet icon button">
                <i class="icon folder open"></i>
            </button>
        </div>

    </div>
</template>
<script>
    /* eslint-disable indent,semi */
    const ipc = require('electron').ipcRenderer
    export default {

        data: function () {
            return {
                agenda: []
            }
        },
        mounted:function(){
            ipc.on('file-opened', (event, arg) => {
                console.log(arg)

            });
        },
        methods: {
            addAgenda: function () {

            },
            openFile: function () {
                const app = require('electron').remote.dialog;
                var x = this;
                app.showOpenDialog({title: 'Open a Previous Meeting Recording'}, function (fileNames) {
                    if (fileNames === undefined) {

                    } else {
                        console.log(fileNames)
                        x.$router.push({path: '/meeting', query: {name: fileNames[0], type: 'old'}})
                    }

                });
            },
            newFile: function () {
                const app = require('electron').remote.dialog;
                this.$router.push({path: '/meeting', query: {type: 'new'}})

            }
        }
    }
</script>

<style>
    html, body {
        height: 100%;
    }

    .Aligner {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .Aligner-item {
        max-width: 50%;
    }

    .Aligner-item--top {
        align-self: flex-start;
    }

    .Aligner-item--bottom {
        align-self: flex-end;
    }
</style>