<template>
    <div class="container">
        <div>
            <logo/>
            <h1 class="title">
                example
            </h1>
            <h2 class="subtitle">
                My good Nuxt.js project
            </h2>
            <div class="links">
                <a
                    class="button--green"
                    href="https://nuxtjs.org/"
                    target="_blank"
                >
                    Documentation
                </a>
                <a
                    class="button--grey"
                    href="https://github.com/nuxt/nuxt.js"
                    target="_blank"
                >
                    GitHub
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import Logo from '~/components/Logo.vue';

    export default {
        components: {
            Logo,
        },
    };
</script>

<style lang="scss">
    body {
        @include text-truncate;
    }
</style>
