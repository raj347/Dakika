<template>
    <div class="item item-minute" style="    padding-left: 0.3em;">

        <div class="ui tiny image">
            <img class="pic" src="veronika.jpg">
        </div>
        <div class="content">

            <div class="description">
                <p class="minute-text">{{minute.modified_minute}}</p>
            </div>
            <div class="extra">

                <div class="ui  orange label">
                    <i class="white clock icon"></i>{{minute.time}}

                </div>
                &nbsp;&nbsp;
                <a class="ui teal image label" v-for="person in minute.people">
                    <img src="jenny.jpg">
                    {{person}}

            </a>

                &nbsp;&nbsp;

                <div v-for="tag in minute.tags" class="ui violet  label">
                    <i class="briefcase icon"></i>
                    {{tag.replace('#', "")}}



                </div>


            </div>
        </div>
    </div>
</template>

<script>
    export default {
      props: ['minute']
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Roboto|Rubik');

    .minute-heading {
        font-size: 1.1em !important;
        font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
        font-weight: 800 !important;
        padding: 2px;
    }

    .description {
        padding-left: 2px;
    }
    .minute-text{
        font-family: 'Roboto', sans-serif;
        font-size: 13px;
    }

    .extra {
        font-family: 'Rubik', sans-serif;
        padding-right: 2px;
        padding-left: 2px;
        font-weight: bold;
    }


</style>
