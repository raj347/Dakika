<template>
    <div style="height: 100%; overflow: hidden;">

            <div class=" ui fixed-head">
                <div class="ui form">
                    <div class="field">
                <textarea rows="2" v-model="minute" @keyup.alt.69="editLastMinute"
                          v-on:keyup.enter="addMinute" placeholder="Start Writing your minutes"></textarea>
                    </div>
                </div>
            </div>
            <div class="view-pane" style="margin-top: 83px; height: 100%; padding-top: 6px;">
                <div class="ui  grid" style="height: 100%;">
                    <div class="ten wide column"
                         style=" border-right: 1px solid rgba(0,0,0,0.1); padding-right: 0px !important; padding-top: 0px !important;">

                        <div style="height: 100%; overflow-y: scroll; padding-bottom: 80px;  ">


                            <div class="ui divided items minute-item">

                                <Item :minute="minute" v-on:edit-item="editMinute" v-on:delete-item="deleteMinute"
                                      v-for="minute in ordered_mins" ></Item>


                            </div>
                        </div>

                    </div>
                    <div class="six wide column"
                         style="   padding-top: 0px !important;height: 100%; overflow-y: scroll; padding-bottom: 80px; padding-left: 0px;padding-right: 4px;  ">

                        <agenda :agendas="agendas" v-on:input="updateAgenda"></agenda>


                    </div>
                </div>


            </div>

    </div>

</template>

<script>
    /* eslint-disable indent */
    import moment from 'moment'
    import Item from './MinuteItem.vue'
    import Agenda from '../Agenda/Agenda.vue'
    import Vue from 'vue'

    export default {
      props: ['saved_minutes', 'attendants', 'saved_agendas'],
      components: {
        Agenda,
        Item
      },
      mounted: function () {

      },
      data: function () {
        return {
          minutes: [],
          minute: '',
          tags: '',
          modified_minute: '',
          agenda: '',
          agendas: [],
          editing_minute: null
        }
      },
      methods: {
        getTags: function findHashtags (searchText) {
          var regexp = /\B\#\w\w+\b/g
          var result = searchText.match(regexp)
          if (result) {
            return result
          } else {
            return false
          }
        },
        getPeople: function findHashtags (searchText) {
          var regexp = /\B\@\w\w+\b/g
          var result = searchText.match(regexp)
          var items = []
          if (result == null) {
            return []
          }
          for (var i = 0; i < result.length; i++) {
            var item = result[i]
            item = item.replace(/@(\w+)/g, '$1')
            var x = this.attendants.findIndex(x => x.acronym == item)
            console.log(x)
            if (x > -1) {
              items.push(this.attendants[x].attendant)
            }
          }
          if (result) {
            return items
          } else {
            return false
          }
        },
        updateAgenda: function (agenda) {
          this.agendas = agenda;
          this.$emit('agenda', agenda)
        },
        editMinute: function (item) {
          this.editing_minute = this.minutes.indexOf(item)
          this.minute = item.minute.trim()
        },
        substitutePeople: function (minute) {
          for (var key in this.attendants) {
            var attendant = this.attendants[key].attendant
            var acronym = this.attendants[key].acronym
            var replace = '@' + acronym
            minute = minute.replace(replace, attendant)
          }
          return minute
        },
        getActiveAgenda: function () {
          var x = this.agendas.findIndex(x => x.active == true)
          if (x > -1) {
            this.agenda = this.agendas[x].text
          }
        },
        addMinute: function () {
          this.tags = this.getTags(this.minute)
          this.people = this.getPeople(this.minute)
          this.modified_minute = this.minute.replace(/#(\w+)/g, '$1')
          this.modified_minute = this.substitutePeople(this.modified_minute)
          this.getActiveAgenda()
          var minuteObject = {
            minute: this.minute.trim(),
            modified_minute: this.modified_minute,
            tags: this.tags,
            people: this.people,
            attendants: this.attendants,
            agenda: this.agenda,
            date: moment().format('YYYY-M-D'),
            time: moment().format('h:mm')
          }
          if (this.editing_minute !== null) {
            this.minutes[this.editing_minute] = minuteObject
            this.editing_minute = null

          } else {
            this.minutes.push(minuteObject)
            this.editing_minute = null
          }

          this.minute = ''
        },
        deleteMinute: function (item) {
          var index = this.minutes.indexOf(item)
          if (index > -1) {
            this.minutes.splice(index, 1);
          }
        },
        editLastMinute: function () {
          this.minute = this.minutes.slice(-1)[0].minute
        }
      },
      watch: {
        minutes: function () {
          this.$emit('input', this.minutes)
        },
        agenda: function () {

        },
        saved_minutes: function () {
          console.log(this.saved_minutes)
          this.minutes = this.saved_minutes
        },
        saved_agendas: function () {
          this.agendas = this.saved_agendas
        }
      },
      computed: {
        ordered_mins: function () {
          return this.minutes.slice().reverse();
        }
      }
    }
</script>

<style>
    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }

    .list-enter, .list-leave-to /* .list-leave-active for <2.1.8 */
    {
        opacity: 0;
        transform: translateY(30px);
    }

</style>
