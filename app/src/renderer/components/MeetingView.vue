<template>
    <div class="container">
        <div class="nav">
            <attendant v-on:addAttendant="attendantAdded"></attendant>
            <div v-on:click="setupMeeting">Setup your Meeting</div>
        </div>

        <div class="main">
            <minute v-on:minute="minuteChanged" :attendants="attendants"></minute>
        </div>

        <div class="ui long test modal">
            <div class="header">
                Set Up your Meeting











            </div>
            <div class="image content">
                <div class="description">
                    <form class="ui form">
                        <div class="ui grid">
                            <div class="eight wide field">
                                <div class="ui icon input">
                                    <input type="text" placeholder="Agenda">
                                    <i class="inverted circular briefcase link icon"></i>
                                </div>
                            </div>
                            <div class="eight wide field">
                                <div class="ui icon input">
                                    <i class="inverted circular clock link icon"></i>
                                    <input type="text" placeholder="Minutes">
                                </div>
                            </div>

                        </div>
                    </form>

                    <div class="ui divider"></div>
                    <div class="ui list">
                        <a class="item">
                            <i class="right triangle icon"></i>
                            <div class="content">
                                <div class="description">Floated icons are by default top aligned. To have an icon top aligned try this example.</div>
                            </div>
                        </a>
                        <a class="item">
                            <i class="right triangle icon"></i>
                            <div class="content">
                                <div class="description">Floated icons are by default top aligned. To have an icon top aligned try this example.</div>
                            </div>
                        </a>
                        <a class="item">
                            <i class="right triangle icon"></i>
                            <div class="content">
                                <div class="description">Floated icons are by default top aligned. To have an icon top aligned try this example.</div>
                            </div>
                        </a>
                    </div>

                </div>
            </div>
            <div class="actions">
                <div class="ui primary approve button">
                    Proceed
                    <i class="right chevron icon"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable indent,semi */

    import Attendant from './Attendant/Attendant.vue'
    import Minute from './Minute/Minute.vue'
    import 'semantic-ui-css/components/modal.min.js'
    import 'semantic-ui-css/components/dimmer.min.js'
    import 'semantic-ui-css/components/transition.min.js'
    export default {
        components: {
            Attendant,
            Minute
        },
        mounted: function () {

        },
        data: function () {
            return {
                attendants: [],
                minutes: []
            }
        },
        methods: {
            setupMeeting: function () {
                $('.long.modal').modal('show');
            },
            attendantAdded: function ($attendants) {
                this.attendants = $attendants;
            },
            minuteChanged: function (minutes) {
                this.minutes = minutes;
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

    .modal {
        border-radius: 0px;
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
        background: #ffffff;
        width: 400px;
        -ms-flex: 0 100px;
        -webkit-box-flex: 0;
        -moz-box-flex: 0;
        -ms-box-flex: 0;
        box-flex: 0;
        height: 100%;
        position: fixed;
        overflow-y: scroll;
        border-right: 1px solid #e7e6e8;
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
        z-index: 1000;

    }

    .data-content {
        margin-top: 75px;

    }

    .item {
        padding-top: 0.5em !important;
        padding-bottom: 0.5em !important;
    }

    .attendant {
        color: black !important;
    }

    textarea, input {
        border-radius: 0px !important;
    }

    .pic {
        padding-left: 2px;
    }
</style>
