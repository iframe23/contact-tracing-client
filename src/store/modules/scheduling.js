import axios from 'axios'
import { api_url } from '../../main'

const state = {
    scheds : [],
    courseSched: {},
    subjectScheds: [],
    courseSchedSelection: {},
    subjectSchedsSelection: [],
    subjectLoads: [],
}

const getters = {
    scheds: state => state.scheds,
    courseSched: state => state.courseSched,
    finalizedCourseSched: state => state.finalizedCourseSched,
    subjectScheds: state => state.subjectScheds,
    courseSchedSelection: state => state.courseSchedSelection,
    subjectSchedsSelection: state => state.subjectSchedsSelection,
    subjectLoads: state => state.subjectLoads
}

const actions = {
    async loadCurrentScheds({commit}){
        const response = await axios.get(api_url+'schedule/load_current_scheds');

        if(response.data.message == "Success"){
            commit('setScheds', response.data.loadedCurrentScheds);
        }
    },
    async fetchCourseSched({commit}, schedule_id){
        const response = await axios.post(api_url+'schedule/course_sched', schedule_id)

        console.log(response)
        if(response != null || response != undefined){
            commit('setCourseSched', response.data.course_sched);
            commit('setSubjectScheds', response.data.subject_scheds);
        }
    },
    //This is usually used for adding / dropping but can be used flexibly
    async fetchCourseSchedule({commit}, data){
        const response = await axios.post(api_url+'schedule/course_schedule', data)

        console.log(response)
        if(response != null || response != undefined){
            commit('setCourseSched', response.data.course_sched);
            commit('setSubjectScheds', response.data.subject_scheds);
        }
    },
    async fetchFinalizedCourseSched({commit}, course){
        const response = await axios.post(api_url+'schedule/finalized_course_sched', course)
        console.log(response.data)
        commit('setCourseSched', response.data.course_sched);
        commit('setSubjectScheds', response.data.subject_scheds);
    },
    async fetchCourseSchedSelection({commit}, schedule_id){
        const response = await axios.post(api_url+'schedule/course_sched', schedule_id)

        commit('setCourseSchedSelection', response.data.course_sched);
        commit('setSubjectSchedsSelection', response.data.subject_scheds);
        console.log(response.data.subject_scheds);
    },
    async fetchSubjectLoads({commit}, instructor_id){
        const response = await axios.post(api_url+'schedule/subject_loads', instructor_id)
        console.log(response.data);
        commit('setSubjectLoads', response.data);
    },
    async saveSubjectSched({commit}, subject_sched){
        const response = await axios.post(api_url+'schedule/save_subject_sched', subject_sched)

        if(response.data.result.result == 'Success'){
            commit('setSubjectScheds', response.data.subject_scheds);
            return response.data.result;
        } else {
            return response.data.result;
        }  
    },
    async deleteTimeSched({commit}, time_sched_id){
        const response = await axios.post(api_url+'schedule/delete_time_sched', time_sched_id);

        console.log(time_sched_id)
        console.log(response.data.result)
        return response.data.result;
    },
    async getOtherSubjects({commit}, subject_sched){
        let response = await axios.post(api_url+'schedule/get_other_subjects', subject_sched);

        console.log(response);
        return response.data;
    },
    async merge({commit}, for_merge){
        let response = await axios.post(api_url+'schedule/merge', for_merge);
        
        console.log(for_merge);
        return response.data;
    },
    async unmerge({commit}, for_merge){
        let response = await axios.post(api_url+'schedule/unmerge', for_merge);
        
        return response.data;
    },
    async fetchAssignedTeachers({commit}, where){
        let response = await axios.post(api_url+'schedule/assigned_teachers', where);
        
        return response.data;
    }
}

const mutations = {
    setScheds: (state, scheds) => (state.scheds = scheds),
    setCourseSched: (state, courseSched) => (state.courseSched = courseSched),
    setSubjectScheds: (state, subjectScheds) => (state.subjectScheds = subjectScheds),
    setCourseSchedSelection: (state, CourseSchedSelection) => (state.courseSchedSelection = CourseSchedSelection),
    setSubjectSchedsSelection: (state, SubjectSchedsSelection) => (state.subjectSchedsSelection = SubjectSchedsSelection),
    setSubjectLoads: (state, subjectLoads) => (state.subjectLoads = subjectLoads),
}

export default {
    state,
    getters,
    actions,
    mutations
}