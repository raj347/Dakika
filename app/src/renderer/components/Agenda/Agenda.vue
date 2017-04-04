<template>

    <div style="padding-right: 0.5em !important;">
        Meeting Agenda ({{agendas.length}}) :







        <div class="ui form" style="padding-left: 1px; padding-right:1px; width: 99%;">
            <div class=" field">
                <div class="ui mini icon input">
                    <input v-on:keyup.enter="addAgenda" v-model="agenda" type="text" placeholder="Add Agenda">
                    <i class="add user icon"></i>
                </div>
            </div>
        </div>
        <div class="ui relaxed divided list" style="margin-top: 1px; ">
            <a class="item" v-for="agenda in agendas" v-bind:class="{ active_agenda: agenda.active }"  v-on:click="addActive(agenda)">
                <i v-bind:class="{ green: agenda.active }" class="right triangle icon"></i>
                <div v-bind:class="{ active_agenda: agenda.active }" class="content">
                    <div class="description">
                        {{agenda.text}}







                    </div>
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
