<template>
    <div class="container">
        <div class="nav">

        </div>
        <div class="main">
            <div class="ui three column grid">
                <div class="column">
                <a class="ui card" href="http://www.dog.com">
                    <div class="content">
                        <div class="header">Cute Dog</div>
                        <div class="meta">
                            <span class="category">Animals</span>
                        </div>
                        <div class="description">
                            <p></p>
                        </div>
                    </div>
                    <div class="extra content">
                        <div class="right floated author">
                            <img class="ui avatar image" src="/images/avatar/small/matt.jpg"> Matt

                    </div>
                    </div>
                </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable indent,semi */
    export default {
      components: {},
      data: function () {
        return {
          attendants: [],
          minutes: []
        }
      },
      methods: {
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
