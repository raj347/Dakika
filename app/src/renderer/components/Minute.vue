<template>
    <div class="twelve wide column">
        <div class="ui form">
            <div class="field">
                <textarea rows="3" v-model="minute" @keyup.alt.69="editLastMinute"
                          v-on:keyup.enter="addMinute" placeholder="Start Writing your minutes"></textarea>
            </div>

        </div>
        <div class="ui divider"></div>
        <div class="ui divided items minute-item">
            <Item :minute="minute" v-for="minute in minutes"></Item>
        </div>
       
    </div>
</template>

<script>
    import Item from './MinuteItem.vue'
    export default {
        components: {
            Item
        },
        data: function () {
            return {
                minutes: [],
                minute: ''
            }
        },
        methods: {
            addMinute: function () {
                console.log(this.minute);
                var minuteObject = {
                    minute: this.minute
                };
                this.minutes.push(minuteObject);
                console.log(this.minutes);
                this.minute = '';
            },
            deleteMinute: function () {

            },
            editLastMinute: function () {
                this.minute = this.minutes.slice(-1)[0].minute;
            }
        }
    }
</script>

<style>
    @import url(https://fonts.googleapis.com/css?family=Lato:300);

    .minute-item {
        height: 83% !important;
        overflow-y: scroll !important;
        padding-top: 5px;
    }


</style>
