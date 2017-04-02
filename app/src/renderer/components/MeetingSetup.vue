<template>
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
                            <div class="description">
                                Floated icons are by default top aligned. To have an icon top aligned try this example.







                            </div>
                        </div>
                    </a>
                    <a class="item">
                        <i class="right triangle icon"></i>
                        <div class="content">
                            <div class="description">
                                Floated icons are by default top aligned. To have an icon top aligned try this example.







                            </div>
                        </div>
                    </a>
                    <a class="item">
                        <i class="right triangle icon"></i>
                        <div class="content">
                            <div class="description">
                                Floated icons are by default top aligned. To have an icon top aligned try this example.







                            </div>
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
</template>
<script>
    /* eslint-disable indent,semi */
    export default {
      data: function () {
        return {
          agenda: []
        }
      },
      methods: {
        addAgenda: function () {

        }
      }
    }
</script>

<style>

</style>