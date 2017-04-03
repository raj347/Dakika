<template>
    <div class="item" style="padding-top: 0.2em !important; padding-bottom: 0.2em !important;     padding-left: 0.3em;     border-top: 1px solid rgba(34, 36, 38, 0.05);">
        <img class="ui avatar image pic" src="matthew.png">
        <div class="content">
            <a class="header">{{attendant.attendant}}-({{attendant.acronym}})</a>
            <div class="description">Email : <input v-model="attendant.email" class="hidden"/></div>
        </div>
    </div>
</template>

<script>
    export default {
      props: ['attendant']
    }
</script>

<style>


</style>
