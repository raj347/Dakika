<template>
    <div class="item item-minute"
         style="padding-top: 0.2em !important; padding-bottom: 0.2em !important;     padding-left: 0.3em;     "
    >

        <div class="content" style="cursor: pointer">
            <div class="description" v-on:click="editItem(minute)" style="padding-right: 2px !important;">
                <p class="minute-text">{{minute.modified_minute}}</p>
            </div>
            <div class="extra noselect" style="padding-right: 2px;">
                <div class="ui  green label">
                    <i class="white clock icon"></i>{{minute.time}}

                </div>
                &nbsp;&nbsp;<a class="ui teal  label" v-if="minute.agenda"> <i class="tasks icon"></i> {{minute.agenda}}</a>
                <a class="ui teal image label" v-for="person in minute.people">
                    <img src="jenny.jpg">
                    {{person}}

                </a>

                &nbsp;&nbsp;

                <div v-for="tag in minute.tags" class="ui violet  label">
                    <i class="briefcase icon"></i>
                    {{tag.replace('#', "")}}


                </div>

                <div class="mini  ui icon button red right floated "  style="margin:0px; cursor: pointer">
                    <i class="remove icon " v-on:click="deleteItem(minute)"> </i> Delete


                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['minute'],
        methods: {
            deleteItem: function (item) {
                this.$emit('delete-item', item)
            },
            editItem: function (item) {
                this.$emit('edit-item', item)
            }
        }
    }
</script>

<style>


</style>
