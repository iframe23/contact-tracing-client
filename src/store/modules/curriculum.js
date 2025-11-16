import axios from 'axios'
import {api_url} from '../../main'

const state = {
    prospectusByCourse: {},
    prospectusesByCourse: {},
    prospectuses: {},
    prospectus: {
        subjects: []
    },
    departments: [],
    coursesByDepartment: [],
    departmentByCourse: [],
    yearLevels: [],
    reportCard: {
        enrolled_subjects: []
    },
}

const getters = {
    prospectusByCourse: state=> state.prospectusByCourse,
    prospectusesByCourse: state=> state.prospectusesByCourse,
    prospectuses: state=> state.prospectuses,
    prospectus: state=> state.prospectus,
    coursesByDepartment: state=> state.coursesByDepartment,
    yearLevels: state=> state.yearLevels,
    departments: state=> state.departments,
    departmentByCourse: state=> state.departmentByCourse,
    reportCard: state=> state.reportCard
}

const actions = {
    async fetchProspectuses({commit}, where) {
        const response = await axios.post(api_url+'curriculum/prospectuses', where);
        console.log(response.data)
        commit('setProspectuses', response.data);
    },
    async fetchProspectusByCourse({commit}, course) {
        const response = await axios.post(api_url+'curriculum/prospectus_by_course', course);
        console.log(response.data)
        commit('setProspectusByCourse', response.data);
    },
    async fetchProspectusesByCourse({commit}, course) {
        const response = await axios.post(api_url+'curriculum/prospectuses_by_course', course);
        console.log(response.data)
        commit('setProspectusesByCourse', response.data);
    },
    async fetchProspectus({commit}, prospectus) {
        const response = await axios.post(api_url+'curriculum/prospectus', prospectus);
        console.log(response.data)
        commit('setProspectus', response.data);
    },
    async fetchCoursesByDepartment({commit}, department) {
        const response = await axios.post(api_url+'curriculum/courses_by_department', department);
        commit('setCoursesByDepartment', response.data);
    },
    async fetchYearLevels({commit}) {
        const response = await axios.get(api_url+'curriculum/year_levels');
        commit('setYearLevels', response.data);
    },
    async fetchDepartments({commit}) {
        const response = await axios.get(api_url+'school/departments');
        commit('setDepartments', response.data);
    },
    async fetchDepartmentByCourse({commit}, course) {
        const response = await axios.post(api_url+'curriculum/department_by_course', course);
        commit('setDepartmentByCourse', response.data);

        return response.data
    },
    async fetchReportCard({commit}, where) {
        const response = await axios.post(api_url+'curriculum/enrolled_subjects', where);
        commit('setReportCard', response.data);

        return response.data
    }
}

const mutations = {
    setProspectusByCourse: (state, prospectusByCourse) => (state.prospectusByCourse = prospectusByCourse),
    setProspectusesByCourse: (state, prospectusesByCourse) => (state.prospectusesByCourse = prospectusesByCourse),
    setProspectuses: (state, prospectuses) => (state.prospectuses = prospectuses),
    setProspectus: (state, prospectus) => (state.prospectus = prospectus),
    setCoursesByDepartment: (state, coursesByDepartment) => (state.coursesByDepartment = coursesByDepartment),
    setYearLevels: (state, yearLevels) => (state.yearLevels = yearLevels),
    setDepartments: (state, departments) => (state.departments = departments),
    setDepartmentByCourse: (state, departmentByCourse) => (state.departmentByCourse = departmentByCourse),
    setReportCard: (state, reportCard) => (state.reportCard = reportCard)
}

export default {
    state,
    getters,
    actions,
    mutations
}