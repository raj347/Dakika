<template>

    <div>

        <div class="ui form" style="padding-left: 1px; padding-right:1px; padding-top: 5px;">
            <div class=" field">
                <div class="ui mini icon input">
                    <input v-on:keyup.enter="addAttendant" v-model="attendant" type="text" placeholder="Add Attendants">
                    <i class="add user icon"></i>
                </div>
            </div>
        </div>
        <div class="ui middle aligned selection list">
            <attendant :attendant="attendant" v-on:delete-item="deleteItem" v-for="attendant in attendants"></attendant>
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
            deleteItem: function (item) {
                var index = this.attendants.indexOf(item)
                if (index > -1) {
                    this.attendants.splice(index, 1);
                }
            },
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
