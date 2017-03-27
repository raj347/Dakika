<template>
    <div class="ui padded grid">
        <sidebar></sidebar>

            <minute></minute>
        </div>
    </div>
</template>

<script>
    import Sidebar from './components/Sidebar.vue'
    import Minute from './components/Minute.vue'
    export default {
        components: {
            Sidebar,
            Minute
        }
    }
</script>

<style>
    @import url(https://fonts.googleapis.com/css?family=Lato:300);

    html,
    body,
    .grid,
    .column {
        min-height: 100% !important;
    }
</style>
