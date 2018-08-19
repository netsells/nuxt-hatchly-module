<template>
    <span v-html="text"/>
</template>

<script>
    export default {
        name: 'attr',

        props: {
            text: {
                type: String,
                default() {
                    return '';
                },
            },
        },
    }
</script>
