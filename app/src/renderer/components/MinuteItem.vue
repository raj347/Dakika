<template>
    <div class="item item-minute">
        <div class="content">
            <div class="header minute-heading">
                     <span v-for="person in minute.people">
{{person}}
                     </span>
            </div>
            <div class="description">
                <p>{{minute.modified_minute}}</p>
            </div>
            <div class="extra">
                <span v-for="tag in minute.tags">
                     <div class="ui label">{{tag.replace('#', "")}}</div>
                </span>
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
    @import url(https://fonts.googleapis.com/css?family=Lato:300);

    .minute-heading {
        font-size: 1.1em !important;
        font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
        font-weight: 800 !important;
    }

</style>
