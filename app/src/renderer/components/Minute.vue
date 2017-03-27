<template>
    <div class="twelve wide column">
        <div class="ui form">
            <div class="field">
                <textarea rows="2"></textarea>
            </div>
        </div>
        <div class="ui divider"></div>
        <div class="ui divided items">
            <Item></Item>
        </div>
    </div>
</template>

<script>
    import Item from './MinuteItem.vue'
    export default {
        components: {
            Item
        }
    }
</script>

<style>
    @import url(https://fonts.googleapis.com/css?family=Lato:300);

</style>
