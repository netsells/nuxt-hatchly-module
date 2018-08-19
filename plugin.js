import Vue from 'vue';
import Attr from 'nuxt-hatchly-module/components/Attr.vue';
import PageMixin from 'nuxt-hatchly-module/mixins/page';

Vue.component('attr', Attr);
Vue.mixin(PageMixin);
