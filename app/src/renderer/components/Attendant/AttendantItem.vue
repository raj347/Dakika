<template>

    <div class="item"
         style="padding-top: 0.2em !important; padding-bottom: 0.2em !important;     padding-left: 0.3em;     border-top: 1px solid rgba(34, 36, 38, 0.05);">
        <div class="right floated content">
            <div class="ui  red right floated label" v-on:click="deleteItem(attendant)" style="margin:0px;">
                Delete


            </div>
        </div>
        <img class="ui avatar image" src="veronika.jpg">
        <div class="content">
            <div class="name noselect" style="font-weight: bold;color: rgba(0, 0, 0, 0.87);">
                {{attendant.attendant}}-{{attendant.acronym}}

            </div>
        </div>
    </div>


</template>

<script>
    export default {
        props: ['attendant'],
        methods: {
            deleteItem: function (item) {
                this.$emit('delete-item', item)
            }
        }
    }
</script>

<style>


</style>
