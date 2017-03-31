<template>
    <div class="container">
        <div class="nav">
            <sidebar v-on:addAttendant="attendantAdded"></sidebar>
        </div>

        <div class="main">
            <minute :attendants="attendants"></minute>
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
        },
        data: function () {
            return {
                attendants: [],
            }
        },
        methods: {
            attendantAdded: function ($attendants) {
                this.attendants = $attendants;
            }
        }
    }
</script>

<style>
    @import url(https://fonts.googleapis.com/css?family=Lato:300);

    html,
    body {
        height: 100%;
        padding: 0;
        margin: 0;
    }

    .container {
        height: 100%;
        display: -ms-flexbox;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-box;
        display: box;

        -ms-flex-direction: row;
        -webkit-box-orient: horizontal;
        -moz-box-orient: horizontal;
        -ms-box-orient: horizontal;
        box-orient: horizontal;
    }

    .nav {
        background: #f8f8f8;
        width: 400px;
        -ms-flex: 0 100px;
        -webkit-box-flex: 0;
        -moz-box-flex: 0;
        -ms-box-flex: 0;
        box-flex: 0;
        height: 100%;
        position: fixed;
        padding: 5px;
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    }

    .main {
        -ms-flex: 1;
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        -ms-box-flex: 1;
        box-flex: 1;
        margin-left: 400px;

    }

    .fixed-head {
        position: fixed;
        top: 0px;
        left: 400px;
        right: 0px;
        opacity: 0.8;
        background-color: #f8f8f8;
        padding: 2px;
        box-shadow: 0 4px 2px -2px gray;

    }

    .data-content {
        margin-top: 63px;
        padding: 5px;
    }

    .item {
        padding-top: 0.5em !important;
        padding-bottom: 0.5em !important;
    }

    .attendant {
        color: black !important;
    }
</style>
