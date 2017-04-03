<template>
    <div class="item item-minute" style="padding-top: 0.2em !important; padding-bottom: 0.2em !important;     padding-left: 0.3em;     border-top: 1px solid rgba(34, 36, 38, 0.05);">

        <div class="content">
            <div class="description">
                <p class="minute-text">{{minute.modified_minute}}</p>
            </div>
            <div class="extra">
                <div class="ui  green label">
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


</style>
