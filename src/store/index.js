import Vuex from 'vuex';
import Vue from 'vue';
import scheduling from './modules/scheduling';
import school from './modules/school';
import user from './modules/user';
import curriculum from './modules/curriculum';
import accounting from './modules/accounting';
import dashboard from './modules/dashboard';

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        scheduling,
        school,
        user,
        curriculum,
        accounting,
        dashboard
    }
})