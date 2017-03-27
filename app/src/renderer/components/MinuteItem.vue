<template>
    <div class="item">
        <div class="content">
            <a class="header">12 Years a Slave</a>
            <div class="description">
                <p>{{minute.minute}}</p>
            </div>
            <div class="extra">
                <div class="ui label">IMAX</div>
                <div class="ui label"><i class="globe icon"></i> Additional Languages</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['minute'],
    }
</script>

<style>
    @import url(https://fonts.googleapis.com/css?family=Lato:300);

</style>
