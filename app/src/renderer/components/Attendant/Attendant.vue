<template>

    <div>
        <div class="ui tiny header title-h"
             style="margin-top: 0px; height: 29px;   border-top: 1px solid rgba(0, 0, 0, 0.05); ">
            Attendants ({{attendants.length}})






        </div>
        <div class="ui form" style="padding-left: 1px; padding-right:1px;">
            <div class=" field">
                <div class="ui mini icon input">
                    <input v-on:keyup.enter="addAttendant" v-model="attendant" type="text" placeholder="Add Attendants">
                    <i class="add user icon"></i>
                </div>
            </div>
        </div>
        <div class="ui relaxed divided list" style="margin-top: 1px; ">
            <attendant :attendant="attendant" v-for="attendant in attendants"></attendant>
        </div>


    </div>


</template>

<script>
    /* eslint-disable indent */

    import Attendant from './AttendantItem.vue'
    export default {
        props: ['minutes', 'saved_attendants'],
        components: {
            Attendant
        },
        data: function () {
            return {
                attendants: [],
                attendant: '',
                autoSave: ''
            }
        },
        mounted: function () {

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
                this.$emit('input', this.attendants)
                this.attendant = ''
            },
            deleteattendant: function () {

            },
            editLastAttendant: function () {
                this.attendant = this.attendants.slice(-1)[0].attendant
            }
        },
        watch: {
            saved_attendants: function () {
                this.attendants = this.saved_attendants
            }
        }
    }
</script>

<style>

</style>
