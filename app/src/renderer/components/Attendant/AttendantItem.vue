<template>
    <div class="item" style="padding-top: 0.2em !important; padding-bottom: 0.2em !important;     padding-left: 0.3em;     border-top: 1px solid rgba(34, 36, 38, 0.05);">
        <div class="content">
            <a class="header"><i class="user icon"></i>{{attendant.attendant}}-({{attendant.acronym}})</a>
            <div class="description">Email : {{attendant.email}}</div>
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
