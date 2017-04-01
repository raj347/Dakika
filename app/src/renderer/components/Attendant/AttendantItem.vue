<template>
    <div class="item">
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

.hidden{
    border: none;
    width: 300px;
}
.hidden:focus{
    outline: none;
}
</style>
