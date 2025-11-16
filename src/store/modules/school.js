import axios from 'axios'
import {api_url} from '../../main'

const state = {
    currentSY : '',
    currentSem: {},
    rooms: [],
    courses: [],
}

const getters = {
    currentSY: state => state.currentSY,
    currentSem: state => state.currentSem,
    rooms: state=> state.rooms,
    courses: state=> state.courses
}

const actions = {
    async fetchCurrentSem({commit}) {
        const response = await axios.get(api_url+'school/current_sem');
        commit('setCurrentSem', response.data);
    },
    async fetchCurrentSY({commit}) {
        const response = await axios.get(api_url+'school/current_sy');
        commit('setCurrentSY', response.data);
    },
    async fetchRooms({commit}) {
        const response = await axios.get(api_url+'school/rooms');
        commit('setRooms', response.data);
    },
    async fetchCourses({commit}) {
        const response = await axios.get(api_url+'school/courses');
        commit('setCourses', response.data);
    },
    async submitGrade({commit}, data) {
        const response = await axios.post(api_url+'school/submit_grade', data);
        console.log(response);

        return response.data
    },
    async fetchSubjectCredential({commit}, where){
        const response = await axios.post(api_url+'school/subject_credential', where);
        console.log(response);

        return response.data
    }
}

const mutations = {
    setCurrentSem: (state, currentSem) => (state.currentSem = currentSem),
    setCurrentSY: (state, currentSY) => (state.currentSY = currentSY),
    setRooms: (state, rooms) => (state.rooms = rooms),
    setCourses: (state, courses) => (state.courses = courses)
}

export default {
    state,
    getters,
    actions,
    mutations
}