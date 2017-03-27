<template>

    <div class="four wide blue column sidebar">

        <div class="ui form">
            <div class="sixteen wide field">
                <div class="ui mini icon input">
                    <input v-on:keyup.enter="addAttendant" v-model="attendant" type="text" placeholder="Add Attendants">
                    <i class="add user icon"></i>
                </div>
            </div>
        </div>

        <div class="ui relaxed divided list">
            <attendant :attendant="attendant" v-for="attendant in attendants"></attendant>
        </div>

    </div>


</template>

<script>
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
            addAttendant: function () {
                console.log(this.attendant);
                var attendantObject = {
                    attendant: this.attendant
                };
                this.attendants.push(attendantObject);
                console.log(this.attendants);
                this.attendant = '';
            },
            deleteattendant: function () {

            },
            editLastAttendant: function () {
                this.attendant = this.attendants.slice(-1)[0].attendant;
            }
        }
    }
</script>

<style>
    @import url(https://fonts.googleapis.com/css?family=Lato:300);

    .avatar-header {
        color: white !important;
    }
</style>
