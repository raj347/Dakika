<template>
    <div class="item">
        <img class="ui avatar image" src="/dist/rachel.png">
        <div class="content">
            <a class="header">{{attendant.attendant}}-({{attendant.acronym}})</a>
            <div class="description">Items</div>
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
