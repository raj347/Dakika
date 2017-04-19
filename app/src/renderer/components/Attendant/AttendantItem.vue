<template>

    <div class="item"
         style="padding-top: 0.2em !important; padding-bottom: 0.2em !important;     padding-left: 0.3em;     border-top: 1px solid rgba(34, 36, 38, 0.05);">
        <div class="right floated content">

            <div class="mini circular ui icon button red right floated" v-on:click="deleteItem(attendant)"
                 style="margin:0px;">


                <i class="remove icon " v-on:click="deleteItem(attendant)"></i>
            </div>
            <div data-variation="mini" data-position="left center" data-tooltip="Toogle User Presence" class="mini circular ui icon button  right floated" v-bind:class="[attendant.present ? activeClass : '', errorClass]" v-on:click="userPresent(attendant)"
                 style="margin-right:3px;">


                <i class="user icon " ></i>
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
    data: function () {
      return {
        activeClass: 'green',
        errorClass: 'gray',
      }
    },
    methods: {
      deleteItem: function (item) {
        this.$emit('delete-item', item)
      },
      userPresent: function (item) {
        this.$emit('user-present', item)
      }
    }
  }
</script>

<style>


</style>
