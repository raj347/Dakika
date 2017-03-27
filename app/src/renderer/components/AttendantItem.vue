<template>
    <div class="item">
        <i class="large user middle aligned icon"></i>
        <div class="content">
            <div class="header avatar-header">{{attendant.attendant}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['attendant'],
    }
</script>

<style>
    @import url(https://fonts.googleapis.com/css?family=Lato:300);

</style>
