import axios from 'axios'
import {api_url} from '../../main'

const state = {
    forDownPayments: [],
    accountSM: {},
    rates: [],
    accountStatements: [],
}

const getters = {
    forDownPayments: state=> state.forDownPayments,
    accountSM: state=> state.accountSM,
    rates: state=> state.rates,
    accountStatements: state=> state.accountStatements,
}

const actions = {
    async fetchForDownPayments({commit}) {
        const response = await axios.get(api_url+'accounting/for_down_payments');
        console.log(response.data)
        commit('setForDownPayments', response.data);
    },
    async fetchAccountSM({commit}, where) {
        const response = await axios.post(api_url+'accounting/account_sm', where);
        console.log(response.data)
        commit('setAccountSM', response.data);
    },
    async fetchRates({commit}) {
        const response = await axios.get(api_url+'accounting/rates');
        console.log(response.data)
        commit('setRates', response.data);
    },
    async fetchAccountStatements({commit}, where) {
        const response = await axios.post(api_url+'accounting/account_statements', where);
        console.log(response.data)
        commit('setAccountStatements', response.data);
    },
    async submitRate({commit}, rate) {
        const response = await axios.post(api_url+'accounting/submit_rate', rate);
        console.log(response.data);
        return response.data
    },
    async submitDownPayment({commit}, accountSM) {
        const response = await axios.post(api_url+'accounting/submit_down_payment', accountSM);
        console.log(response.data);
        return response.data
    },
    async submitPayment({commit}, receiptData) {
        const response = await axios.post(api_url+'accounting/submit_payment', receiptData);
        console.log(response.data);
        return response.data
    },
}

const mutations = {
    setForDownPayments: (state, forDownPayments) => (state.forDownPayments = forDownPayments),
    setAccountSM: (state, accountSM) => (state.accountSM = accountSM),
    setRates: (state, rates) => (state.rates = rates),
    setAccountStatements: (state, accountStatements) => (state.accountStatements = accountStatements)
}

export default {
    state,
    getters,
    actions,
    mutations
}