<template>

    <div class="gradient" style="padding-right: 0.5em !important; height: 100%;">
        <div class="ui form" style="padding-left: 1px; padding-right:1px; padding-top: 4px; width: 99%;">
            <div class=" field">
                <div class="ui mini icon input">
                    <input :disabled="filename == null ? true : false" v-on:keyup.enter="addAgenda" v-model="agenda"
                           type="text" placeholder="Add Agenda">
                    <i class="add user icon"></i>
                </div>
            </div>
        </div>

        <div class="ui middle aligned selection list">
            <div v-for="agenda in agendas" class="item" style="padding-top: 0.2em !important; padding-bottom: 0.2em !important; padding-left: 0.3em; border-top: 1px solid rgba(34, 36, 38, 0.0470588);">
                <div class="right floated content">
                    <div class="mini circular ui icon button red right floated" v-on:click="deleteAgenda(agenda)" style="margin: 0px;"><i
                            class="remove icon "></i></div>
                    <div v-on:click="addActive(agenda)" class="mini circular ui icon button  right floated " v-bind:class="[agenda.active ? activeClass : '', errorClass]" style="margin-right: 3px;"><i
                            class="flag checkered icon "></i></div>
                </div>
                <img src="list2.png" class="ui avatar image">
                <div class="content">
                    <div class="name noselect" style="font-weight: bold; color: rgba(0, 0, 0, 0.870588);">
                        {{agenda.text}}

                    </div>
                </div>
            </div>

        </div>

        <div style="margin: 10px;" class="ui blue message">
            Press Alt+N to move to the next Agenda, or just click on the flag icon.
        </div>
    </div>


</template>

<script>
    /* eslint-disable indent */

    export default {
      props: ['agendas', 'filename'],
      components: {},
      data: function () {
        return {
          agenda: '',
          activeClass: 'green',
          errorClass: 'gray',
        }
      },
      mounted: function () {

      },
      methods: {

        addAgenda: function () {
          var agenda = this.agenda

          if (this.agendas.length == 0) {
            this.agendas.push({
              text: this.agenda,
              active: true
            })
          } else {
            this.agendas.push({
              text: this.agenda,
              active: false
            })
          }
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
          var index = this.agendas.indexOf(item)
          if (index > -1) {
            this.agendas[index].active = !this.agendas[index].active
          }
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
