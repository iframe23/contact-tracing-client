import axios from 'axios'
import {api_url} from '../../main'
import sidebar_nav from '../../sidebar_nav'

const state = {
    teachers : [],
    teachersCanTeach : [],
    subjectsCanTeach : [],
    subjectsToTeach : [],
    sidebarNav: [],
    loggedUser: {},
    enrollees: [],
    residents: [],
    residentsByStatus: [],
    visitors: [],
    residentLogs:[],
    contactLogs:[],
    contacts:[],
    healthLogs:[],
    studentsBySubject: [],
    student: {},
    user: {},
    visitingPoint: {},
    visitingPoints: [],
    transcript: {},
    topVisitingPoints: {},
    notifications: {},
}

const getters = {
    teachers: state => state.teachers,
    teachersCanTeach: state => state.teachersCanTeach,
    subjectsCanTeach: state => state.subjectsCanTeach,
    subjectsToTeach: state => state.subjectsToTeach,
    sidebarNav: state => state.sidebarNav,
    loggedUser: state => state.loggedUser,
    enrollees: state => state.enrollees,
    residents: state => state.residents,
    residentsByStatus: state => state.residentsByStatus,
    visitors: state => state.visitors,
    residentLogs: state => state.residentLogs,
    contactLogs: state => state.contactLogs,
    contacts: state => state.contacts,
    healthLogs: state => state.healthLogs,
    studentsBySubject: state => state.studentsBySubject,
    student: state => state.student,
    user: state => state.user,
    visitingPoint: state => state.visitingPoint,
    visitingPoints: state => state.visitingPoints,
    transcript: state => state.transcript,
    topVisitingPoints: state => state.topVisitingPoints,
    notifications: state => state.notifications
}

const actions = {
    async fetchTeachers({commit}, role_id) {
        const response = await axios.post(api_url+'user/users_by_role', role_id);
        commit('setTeachers', response.data);
    },
    async fetchTeachersToTeach({commit}, where) {
        const response = await axios.post(api_url+'user/teachers_to_teach', where);
        commit('setTeachers', response.data);
    },
    async fetchSubjectsToTeach({commit}, where) {
        const response = await axios.post(api_url+'user/subjects_to_teach', where);
        commit('setSubjectsToTeach', response.data);
    },
    async fetchSubjectsCanTeach({commit}, where) {
        const response = await axios.post(api_url+'user/subjects_can_teach', where);
        commit('setSubjectsCanTeach', response.data);
    },
    async fetchTeachersCanTeach({commit}, where) {
        const response = await axios.post(api_url+'user/teachers_can_teach', where);
        commit('setTeachersCanTeach', response.data);
        return response.data;
    },
    async fetchSidebarNav({commit}){
        let data = {
            role: localStorage.getItem('role_id'),
            items: sidebar_nav.items
        }

        const response = await axios.post(api_url+'user/generate_sidebar_nav', data);

        commit('setSidebarNav', response.data);
    },
    async fetchLoggedUser({commit}){
        let loggedData = {
            role_id: localStorage.getItem('role_id'),
            username: localStorage.getItem('username'),
            token: localStorage.getItem('token')
        }

        const response = await axios.post(api_url+'user/logged_user', loggedData);
        console.log(response.data)
        commit('setLoggedUser', response.data);
    },
    async fetchEnrollees({commit}, where){
        const response = await axios.post(api_url+'user/enrollees', where);
        console.log(response.data)
        commit('setEnrollees', response.data);
    },
    async fetchResidents({commit}, where){
        const response = await axios.post(api_url+'user/users_by_role', where);
        console.log(response.data)
        commit('setResidents', response.data);
    },
    async fetchResidentsByStatus({commit}, where){
        const response = await axios.post(api_url+'user/users_by_status', where);
        console.log(response.data)
        commit('setResidentsByStatus', response.data);
    },
    async fetchVisitors({commit}, where){
        const response = await axios.post(api_url+'user/visitors', where);
        console.log(response.data)
        commit('setVisitors', response.data);
    },
    async fetchResidentLogs({commit}, where){
        const response = await axios.post(api_url+'user/resident_logs', where);
        console.log(response.data)
        commit('setResidentLogs', response.data);
    },
    async fetchContactLogs({commit}, where){
        const response = await axios.post(api_url+'user/contact_logs', where);
        console.log(response.data)
        commit('setContactLogs', response.data);
    },
    async fetchContacts({commit}, where){
        const response = await axios.post(api_url+'user/contacts', where);
        console.log(response.data)
        commit('setContacts', response.data);
    },
    async fetchHealthLogs({commit}, where){
        const response = await axios.post(api_url+'user/health_logs', where);
        console.log(response.data)
        commit('setHealthLogs', response.data);
    },
    async fetchVisitingPoint({commit}, where){
        const response = await axios.post(api_url+'user/visiting_point', where);
        console.log(response.data)
        commit('setVisitingPoint', response.data);
    },
    async fetchVisitingPoints({commit}){
        const response = await axios.get(api_url+'user/visiting_points');
        console.log(response.data)
        commit('setVisitingPoints', response.data);
    },
    async fetchStudentsBySubject({commit}, where){
        const response = await axios.post(api_url+'user/students_by_subject', where);
        console.log(response.data)
        commit('setStudentsBySubject', response.data);
    },
    async fetchStudent({commit}, student_id){
        const response = await axios.post(api_url+'user/student', student_id);
        console.log(response.data)
        commit('setStudent', response.data);
    },
    async fetchUser({commit}, where){
        const response = await axios.post(api_url+'user/user', where);
        console.log(response.data)
        commit('setUser', response.data);
    },
    async fetchTopVisitingPoints({commit}){
        const response = await axios.get(api_url+'user/top_visiting_points');
        console.log(response.data)
        commit('setTopVisitingPoints', response.data);
    },
    async fetchNotifications({commit}, where){
        const response = await axios.post(api_url+'user/notifications', where);
        console.log(response.data)
        commit('setNotifications', response.data);
    },
    async submitExistingStudent({commit}, data){
        const response = await axios.post(api_url+'user/submit_existing_student', data);
        console.log(response.data)
        return response.data;
    },
    async submitToEditResident({commit}, data){
        const response = await axios.post(api_url+'user/submit_edit_resident', data);
        console.log(response.data)
        return response.data;
    },
    async submitEditHealthStatus({commit}, data){
        const response = await axios.post(api_url+'user/submit_edit_health_status', data);
        console.log(response.data)
        return response.data;
    },
    async deleteResident({commit}, data){
        const response = await axios.post(api_url+'user/delete_resident', data);
        console.log(response.data)
        return response.data;
    },
    async submitToEditVisitingPoint({commit}, data){
        const response = await axios.post(api_url+'user/submit_edit_visiting_point', data);
        console.log(response.data)
        return response.data;
    },
    async sendNotification({commit}, data){
        const response = await axios.post(api_url+'user/send_notification', data);
        console.log(response.data)
        return response.data;
    },
    async deleteVisitingPoint({commit}, data){
        const response = await axios.post(api_url+'user/delete_visiting_point', data);
        console.log(response.data)
        return response.data;
    },
    async submitFile({commit}, data){
        const response = await axios.post(api_url+'user/submit_file', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data)
        return response.data;
    },
    async submitAllowedTeacher({commit}, data){
        const response = await axios.post(api_url+'user/submit_allowed_teacher', data);
        console.log(response.data)
        return response.data;
    },
    async submitDisallowedTeacher({commit}, where){
        const response = await axios.post(api_url+'user/submit_disallowed_teacher', where);
        console.log(response.data)
        return response.data;
    },
    async submitResident({commit}, data){
        const response = await axios.post(api_url+'user/add_resident', data);
        console.log(response.data)
        return response.data;
    },
    async submitVisitingPoint({commit}, data){
        const response = await axios.post(api_url+'user/add_visiting_point', data);
        console.log(response.data)
        return response.data;
    },
    async submitLog({commit}, data){
        const response = await axios.post(api_url+'user/submit_log', data);
        console.log(response.data)
        return response.data;
    },
    async fetchTranscript({commit}, where){
        const response = await axios.post(api_url+'user/transcript', where);
        console.log(response.data)
        commit('setTranscript', response.data);
    },
}

const mutations = {
    setTeachers: (state, teachers) => (state.teachers = teachers),
    setTeachersCanTeach: (state, teachersCanTeach) => (state.teachersCanTeach = teachersCanTeach),
    setSubjectsCanTeach: (state, subjectsCanTeach) => (state.subjectsCanTeach = subjectsCanTeach),
    setSubjectsToTeach: (state, subjectsToTeach) => (state.subjectsToTeach = subjectsToTeach),
    setSidebarNav: (state, sidebarNav) => (state.sidebarNav = sidebarNav),
    setLoggedUser: (state, loggedUser) => (state.loggedUser = loggedUser),
    setEnrollees: (state, enrollees) => (state.enrollees = enrollees),
    setResidents: (state, residents) => (state.residents = residents),
    setResidentsByStatus: (state, residentsByStatus) => (state.residentsByStatus = residentsByStatus),
    setVisitors: (state, visitors) => (state.visitors = visitors),
    setResidentLogs: (state, residentLogs) => (state.residentLogs = residentLogs),
    setContactLogs: (state, contactLogs) => (state.contactLogs = contactLogs),
    setContacts: (state, contacts) => (state.contacts = contacts),
    setHealthLogs: (state, healthLogs) => (state.healthLogs = healthLogs),
    setStudentsBySubject: (state, studentsBySubject) => (state.studentsBySubject = studentsBySubject),
    setStudent: (state, student) => (state.student = student),
    setUser: (state, user) => (state.user = user),
    setVisitingPoint: (state, visitingPoint) => (state.visitingPoint = visitingPoint),
    setVisitingPoints: (state, visitingPoints) => (state.visitingPoints = visitingPoints),
    setTranscript: (state, transcript) => (state.transcript = transcript),
    setTopVisitingPoints: (state, topVisitingPoints) => (state.topVisitingPoints = topVisitingPoints),
    setNotifications: (state, notifications) => (state.notifications = notifications),
}

export default {
    state,
    getters,
    actions,
    mutations
}