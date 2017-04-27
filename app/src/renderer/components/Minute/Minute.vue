<template>
    <div style="height: 100%; overflow: hidden;" v-on:@keyup.alt.78="moveToNextAgenda">

        <div class=" ui fixed-head" style="border-bottom: 1px solid #e7e6e8;">
            <div class="ui form">
                <div class="field">
                <textarea rows="2" ref="minuteEditor" :disabled="filename == null ? true : false" v-model="minute"
                          @keyup.alt.69="editLastMinute"
                          v-on:keyup.enter="addMinute" placeholder="Start Writing your minutes"
                          v-on:keyup.esc="cancelEdit"
                          v-on:keyup.alt.78="moveToNextAgenda"
                ></textarea>
                </div>
            </div>
        </div>
        <div class="view-pane" style="margin-top: 86px; height: 100%; padding-top: 6px;">
            <div class="ui  grid" style="height: 100%;">
                <div class="ten wide column"
                     style=" border-right: 1px solid rgba(0,0,0,0.1); padding-right: 0px !important; padding-top: 0px !important;">
                    <div class="toolbar" style="border-bottom: 1px solid rgba(0,0,0,0.1);padding: 2px; display: none;">
                        <button class="mini ui icon blue button">
                            <i class="cloud icon"></i>
                        </button>
                        <button class="mini ui icon purple button">
                            <i class="file pdf 0utline icon"></i>
                        </button>
                    </div>
                    <div style="height: 100%; overflow-y: auto; padding-bottom: 80px;  ">
                        <div v-if="filename == null" style="margin: 10px;" class="ui blue message">
                            Please Open an existing or create a new
                            minutes file to start


                        </div>


                        <div class="ui divided items minute-item">

                            <Item :minute="minute" v-on:edit-item="editMinute" v-on:delete-item="deleteMinute"
                                  v-on:add-item-after="addItemAfter"
                                  v-for="minute in minutes.slice().reverse()"></Item>


                        </div>
                    </div>
                </div>
                <div class="six wide column"
                     style="   padding-top: 0px !important;height: 100%;  padding-left: 0px;padding-right: 4px;  ">

                    <agenda :filename="filename" :agendas="agendas" v-on:input="updateAgenda"></agenda>


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
      props: ['saved_minutes', 'attendants', 'saved_agendas', 'filename'],
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
          editing_minute: null,
          insert_after: null
        }
      },
      methods: {
        addItemAfter: function (item) {
          var index = this.minutes.indexOf(item)
          this.insert_after = index + 1
          this.$refs.minuteEditor.focus()
          this.$toasted.info('You are inserting a minute press ESC to discard', {
            theme: "bubble",
            position: "bottom-center",
            duration: 8000
          })
        },
        getTags: function findHashtags (searchText) {
          var regexp = /\B\#\w\w+\b/g
          var result = searchText.match(regexp)
          if (result) {
            return result
          } else {
            return false
          }
        },
        checkIfIncomplete: function (searchText) {
          var regexp = /\?{2}/g
          var result = searchText.match(regexp)
          console.log(result)
          if (result == null) {
            return false
          } else {
            this.minute = this.minute.replace(/\?{2}/g, '')
            return true
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
        cancelEdit: function () {
          this.editing_minute = null;
          this.insert_after = null;
          this.minute = '';
        },
        editMinute: function (item) {

          this.$refs.minuteEditor.focus()
          this.$toasted.info('You are editing a minute press ESC key to discard', {
            theme: "bubble",
            position: "bottom-center",
            duration: 8000
          })
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
          var incomplete = this.checkIfIncomplete(this.minute)
          this.tags = this.getTags(this.minute)
          this.people = this.getPeople(this.minute)
          this.modified_minute = this.minute.replace(/#(\w+)/g, '$1')
          this.modified_minute = this.modified_minute.replace(/^\@(\w+)/g, '@$1 :')
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
            time: moment().format('h:mm'),
            incomplete: incomplete
          }
          if (this.editing_minute !== null) {
            this.minutes[this.editing_minute] = minuteObject
            this.editing_minute = null
            this.$toasted.success('Minute Updated', {
              theme: "bubble",
              position: "bottom-center",
              duration: 5000
            })

          } else if (this.insert_after !== null) {
            this.minutes.splice(this.insert_after, 0, minuteObject);
            this.insert_after = null
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
          this.editMinute(this.minutes.slice(-1)[0])
        },
        moveToNextAgenda: function () {
          var x = this.agendas.findIndex(x => x.active == true)
          var index = 0;
          if (x > -1) {
            this.agendas[x].active = false
            index = x + 1
          }
          if (index > this.agendas.length - 1) {
            index = 0;
          }
          this.agendas[index].active = true
          this.agenda = this.agendas[index].text
          this.$toasted.error('You are now writing Minutes for agenda : ' + this.agenda, {
            theme: "bubble",
            position: "bottom-center",
            duration: 8000
          })
        }
      },
      watch: {
        minutes: function () {
          this.$emit('input', this.minutes)
        },
        agenda: function () {

        },
        saved_minutes: function () {
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
    .incomplete {
        background: rgba(214, 3, 3, 0.6) !important;
    }

    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }

    .list-enter, .list-leave-to /* .list-leave-active for <2.1.8 */
    {
        opacity: 0;
        transform: translateY(30px);
    }

</style>
