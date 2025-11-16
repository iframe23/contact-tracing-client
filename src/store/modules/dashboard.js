import axios from 'axios'
import {api_url} from '../../main'

const state = {
    newStudents : 0,
    oldStudents: 0,
    usedProspectuses: 0,
    unfinalizedSchedules: 0,
    finalizedSchedules: 0,
    activeCourses: 0,
    forDownpayments: 0,
    unpaidAccountStatements: 0,
    forConfirmation: 0,
    officiallyEnrolled: 0,
    departmentPopulation: 0,
    departmentInstructors: 0,
    subjectLoadsNum: 0,
    studentsUnder: 0,
    enrolledStudentsPerCourses: {},
    instructorsSubjectLoads: {},
    monthlyCollection: {},
    enrolledStudentsPerYearLevels: {},
    coursesCollections: {},
    studentsInEachSubjectLoads: {},
    subjectLoadsPerDays: {},
}

const getters = {
    newStudents: state => state.newStudents,
    oldStudents: state => state.oldStudents,
    usedProspectuses: state=> state.usedProspectuses,
    unfinalizedSchedules: state=> state.unfinalizedSchedules,
    finalizedSchedules: state=> state.finalizedSchedules,
    activeCourses: state=> state.activeCourses,
    forDownpayments: state=> state.forDownpayments,
    unpaidAccountStatements: state=> state.unpaidAccountStatements,
    forConfirmation: state=> state.forConfirmation,
    officiallyEnrolled: state=> state.officiallyEnrolled,
    departmentPopulation: state=> state.departmentPopulation,
    departmentInstructors: state=> state.departmentInstructors,
    subjectLoadsNum: state=> state.subjectLoadsNum,
    studentsUnder: state=> state.studentsUnder,
    enrolledStudentsPerCourses: state=> state.enrolledStudentsPerCourses,
    instructorsSubjectLoads: state=> state.instructorsSubjectLoads,
    monthlyCollection: state=> state.monthlyCollection,
    enrolledStudentsPerYearLevels: state=> state.enrolledStudentsPerYearLevels,
    coursesCollections: state=> state.coursesCollections,
    studentsInEachSubjectLoads: state=> state.studentsInEachSubjectLoads,
    subjectLoadsPerDays: state=> state.subjectLoadsPerDays
}

const actions = {
    async fetchNewStudents({commit}) {
        const response = await axios.get(api_url+'dashboard/new_students');
        commit('setNewStudents', response.data);
    },
    async fetchOldStudents({commit}) {
        const response = await axios.get(api_url+'dashboard/old_students');
        commit('setOldStudents', response.data);
    },
    async fetchUsedProspectuses({commit}) {
        const response = await axios.get(api_url+'dashboard/used_prospectuses');
        commit('setUsedProspectuses', response.data);
    },
    async fetchUnfinalizedSchedules({commit}) {
        const response = await axios.get(api_url+'dashboard/unfinalized_schedules');
        commit('setUnfinalizedSchedules', response.data);
    },
    async fetchFinalizedSchedules({commit}) {
        const response = await axios.get(api_url+'dashboard/finalized_schedules');
        commit('setFinalizedSchedules', response.data);
    },
    async fetchActiveCourses({commit}) {
        const response = await axios.get(api_url+'dashboard/active_courses');
        commit('setActiveCourses', response.data);
    },
    async fetchForDownpayments({commit}) {
        const response = await axios.get(api_url+'dashboard/for_downpayments');
        commit('setForDownpayments', response.data);
    },
    async fetchUnpaidAccountStatements({commit}) {
        const response = await axios.get(api_url+'dashboard/unpaid_account_statements');
        commit('setUnpaidAccountStatements', response.data);
    },
    async fetchForConfirmation({commit}) {
        const response = await axios.get(api_url+'dashboard/for_confirmation');
        commit('setForConfirmation', response.data);
    },
    async fetchOfficiallyEnrolled({commit}) {
        const response = await axios.get(api_url+'dashboard/officially_enrolled');
        commit('setOfficiallyEnrolled', response.data);
    },
    async fetchDepartmentPopulation({commit}, where) {
        const response = await axios.post(api_url+'dashboard/department_population', where);
        commit('setDepartmentPopulation', response.data);
    },
    async fetchDepartmentInstructors({commit}, where) {
        const response = await axios.post(api_url+'dashboard/department_instructors', where);
        commit('setDepartmentInstructors', response.data);
    },
    async fetchSubjectLoadsNum({commit}, where) {
        const response = await axios.post(api_url+'dashboard/subject_loads_num', where);
        commit('setSubjectLoadsNum', response.data);
    },
    async fetchStudentsUnder({commit}, where) {
        const response = await axios.post(api_url+'dashboard/students_under', where);
        commit('setStudentsUnder', response.data);
    },
    async fetchEnrolledStudentsPerCourses({commit}) {
        const response = await axios.get(api_url+'dashboard/enrolled_students_per_courses');
        commit('setEnrolledStudentsPerCourses', response.data);
    },
    async fetchInstructorSubjectLoads({commit}) {
        const response = await axios.get(api_url+'dashboard/instructor_subject_loads');
        commit('setInstructorSubjectLoads', response.data);
    },
    async fetchMonthlyCollection({commit}) {
        const response = await axios.get(api_url+'dashboard/monthly_collection');
        commit('setMonthlyCollection', response.data);
    },
    async fetchEnrolledStudentsPerYearLevels({commit}) {
        const response = await axios.get(api_url+'dashboard/enrolled_students_per_year_levels');
        commit('setEnrolledStudentsPerYearLevels', response.data);
    },
    async fetchCoursesCollections({commit}) {
        const response = await axios.get(api_url+'dashboard/courses_collections');
        commit('setCoursesCollections', response.data);
    },
    async fetchStudentsInEachSubjectLoads({commit}, where) {
        const response = await axios.post(api_url+'dashboard/students_in_each_subject_loads', where);
        commit('setStudentsInEachSubjectLoads', response.data);
    },
    async fetchSubjectLoadsPerDays({commit}, where) {
        const response = await axios.post(api_url+'dashboard/subject_loads_per_days', where);
        commit('setSubjectLoadsPerDay', response.data);
    }
}

const mutations = {
    setNewStudents: (state, newStudents) => (state.newStudents = newStudents),
    setOldStudents: (state, oldStudents) => (state.oldStudents = oldStudents),
    setUsedProspectuses: (state, usedProspectuses) => (state.usedProspectuses = usedProspectuses),
    setUnfinalizedSchedules: (state, unfinalizedSchedules) => (state.unfinalizedSchedules = unfinalizedSchedules),
    setFinalizedSchedules: (state, finalizedSchedules) => (state.finalizedSchedules = finalizedSchedules),
    setActiveCourses: (state, activeCourses) => (state.activeCourses = activeCourses),
    setForDownpayments: (state, forDownpayments) => (state.forDownpayments = forDownpayments),
    setUnpaidAccountStatements: (state, unpaidAccountStatements) => (state.unpaidAccountStatements = unpaidAccountStatements),
    setForConfirmation: (state, forConfirmation) => (state.forConfirmation = forConfirmation),
    setOfficiallyEnrolled: (state, officiallyEnrolled) => (state.officiallyEnrolled = officiallyEnrolled),
    setDepartmentPopulation: (state, departmentPopulation) => (state.departmentPopulation = departmentPopulation),
    setDepartmentInstructors: (state, departmentInstructors) => (state.departmentInstructors = departmentInstructors),
    setSubjectLoadsNum: (state, subjectLoadsNum) => (state.subjectLoadsNum = subjectLoadsNum),
    setStudentsUnder: (state, studentsUnder) => (state.studentsUnder = studentsUnder),
    setEnrolledStudentsPerCourses: (state, enrolledStudentsPerCourses) => (state.enrolledStudentsPerCourses = enrolledStudentsPerCourses),
    setInstructorsSubjectLoads: (state, instructorsSubjectLoads) => (state.instructorsSubjectLoads = instructorsSubjectLoads),
    setMonthlyCollection: (state, monthlyCollection) => (state.monthlyCollection = monthlyCollection),
    setEnrolledStudentsPerYearLevels: (state, enrolledStudentsPerYearLevels) => (state.enrolledStudentsPerYearLevels = enrolledStudentsPerYearLevels),
    setCoursesCollections: (state, coursesCollections) => (state.coursesCollections = coursesCollections),
    setStudentsInEachSubjectLoads: (state, studentsInEachSubjectLoads) => (state.studentsInEachSubjectLoads = studentsInEachSubjectLoads),
    setSubjectLoadsPerDay: (state, subjectLoadsPerDays) => (state.subjectLoadsPerDays = subjectLoadsPerDays)
}

export default {
    state,
    getters,
    actions,
    mutations
}