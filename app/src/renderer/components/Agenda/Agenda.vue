<template>

    <div class="gradient" style="padding-right: 0.5em !important; height: 100%;">
        <div class="ui form" style="padding-left: 1px; padding-right:1px; padding-top: 4px; width: 99%;">
            <div class=" field">
                <div class="ui mini icon input">
                    <input v-on:keyup.enter="addAgenda" v-model="agenda" type="text" placeholder="Add Agenda">
                    <i class="add user icon"></i>
                </div>
            </div>
        </div>
        <div class="ui middle aligned selection list" style="margin-top: 1px; ">
            <a class="item" v-for="agenda in agendas" v-bind:class="{ active_agenda: agenda.active }"
               v-on:click="addActive(agenda)">

                <div class="ui  red right floated " v-on:click="deleteAgenda(agenda)" style="margin:0px;">
                    <i class="remove icon "></i>
                </div>
                <div v-bind:class="{ active_agenda: agenda.active }" class="content">
                    <i v-bind:class="{ green: agenda.active }" class="right triangle icon"></i>
                    <span class="name" style="color: rgba(0, 0, 0, 0.87);">
                        {{agenda.text}}

                    </span>

                </div>


            </a>
        </div>


    </div>


</template>

<script>
    /* eslint-disable indent */


    export default {
        props: ['agendas'],
        components: {},
        data: function () {
            return {
                agenda: ''
            }
        },
        mounted: function () {

        },
        methods: {

            addAgenda: function () {
                var agenda = this.agenda

                this.agendas.push({
                    text: this.agenda,
                    active: false
                })

                this.agenda = ''
            },
            deleteAgenda: function (agenda) {
                var index = this.agendas.indexOf(agenda)
                if (index > -1) {
                    this.agendas.splice(index, 1);
                }
            },
            addActive: function (item) {
                for (var key in this.agendas) {
                    this.agendas[key].active = false
                }
                console.log(JSON.stringify(item));
                item.active = true;
                console.log(JSON.stringify(item));

            }
        },
        watch: {
            agenda: function () {
                this.$emit('input', this.agendas)
            }
        }
    }
</script>

<style>
    .active_agenda {
        font-weight: bold;
        color: green;
    }
</style>
