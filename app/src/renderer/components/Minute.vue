<template>
    <div>
        <div class=" ui fixed-head">
            <div class="ui form">
                <div class="field">
                <textarea rows="2" v-model="minute" @keyup.alt.69="editLastMinute"
                          v-on:keyup.enter="addMinute" placeholder="Start Writing your minutes"></textarea>
                </div>
            </div>
        </div>
        <div class=" minute-body">

            <div class="data-content">
                <div class="ui divided items minute-item">
                    <Item :minute="minute" v-for="minute in minutes"></Item>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import Item from './MinuteItem.vue'
    export default {
        props: ['attendants'],
        components: {
            Item
        },
        data: function () {
            return {
                minutes: [],
                minute: '',
                tags: '',
                attendants: '',
                modified_minute: ''
            }
        },
        methods: {
            getTags: function findHashtags(searchText) {
                var regexp = /\B\#\w\w+\b/g
                var result = searchText.match(regexp);
                if (result) {
                    return result;
                } else {
                    return false;
                }
            },
            getPeople: function findHashtags(searchText) {
                var regexp = /\B\@\w\w+\b/g
                var result = searchText.match(regexp);
                var items = [];
                if (result == null) {
                    return []
                }
                for (var i = 0; i < result.length; i++) {
                    var item = result[i];
                    item = item.replace(/@(\w+)/g, "$1");
                    var x = this.attendants.findIndex(x => x.acronym == item)
                    console.log(x);
                    if (x > -1) {
                        items.push(this.attendants[x].attendant);
                    }

                }
                if (result) {
                    return items;
                } else {
                    return false;
                }
            },
            substitutePeople: function (minute) {
                console.log(this.attendants);
                for (var key in this.attendants) {
                    var attendant = this.attendants[key].attendant;
                    var acronym = this.attendants[key].acronym;
                    var replace = '@' + acronym;
                    minute = minute.replace(replace, attendant);
                }
                return minute;
            },
            addMinute: function () {
                this.tags = this.getTags(this.minute);
                this.people = this.getPeople(this.minute);
                this.modified_minute = this.minute.replace(/#(\w+)/g, "$1")
                this.modified_minute = this.substitutePeople(this.modified_minute);
                var minuteObject = {
                    minute: this.minute,
                    modified_minute: this.modified_minute,
                    tags: this.tags,
                    people: this.people,
                    attendants: this.attendants
                }

                this.minutes.push(minuteObject)
                this.minute = ''
            },
            deleteMinute: function () {

            },
            editLastMinute: function () {
                this.minute = this.minutes.slice(-1)[0].minute
            }
        }
    }
</script>

<style>


</style>
