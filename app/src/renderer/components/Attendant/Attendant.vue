<template>

    <div>
        <div class="ui form" style="padding: 3px">
            <div class=" field">
                <div class="ui mini icon input">
                    <input v-on:keyup.enter="addAttendant" v-model="attendant" type="text" placeholder="Add Attendants">
                    <i class="add user icon"></i>
                </div>
            </div>
        </div>
        <div class="ui tiny header">Attendants ({{attendants.length}})</div>
        <div class="ui relaxed divided list">
            <attendant :attendant="attendant" v-for="attendant in attendants"></attendant>
        </div>
        <div class="ui divider"></div>

    </div>


</template>

<script>
    /* eslint-disable indent */

    import Attendant from './AttendantItem.vue'
    export default {
      components: {
        Attendant
      },
      data: function () {
        return {
          attendants: [],
          attendant: ''
        }
      },
      methods: {
        createAcronym: function (str) {
          var matches = str.match(/\b(\w)/g)              // ['J','S','O','N']
          return matches.join('')
        },
        addAttendant: function () {
          var acronym = this.createAcronym(this.attendant)
          var attendantObject = {
            attendant: this.attendant,
            acronym: acronym,
            email: 'email@example.com'
          }
          this.attendants.push(attendantObject)
          this.$emit('addAttendant', this.attendants)
          this.attendant = ''
        },
        deleteattendant: function () {

        },
        editLastAttendant: function () {
          this.attendant = this.attendants.slice(-1)[0].attendant
        }
      }
    }
</script>

<style>
    .avatar-header {
        color: white !important;
    }
</style>
