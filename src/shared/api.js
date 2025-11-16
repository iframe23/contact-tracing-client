import {api_url, http, base_url} from '../main'

//user API http query
export const user_api = {
    //Get
    get_users: async ()=>{
        let res = await http.get(api_url+'user/users');
        return res.data;
    },
    get_roles: async ()=> {
        let res = await http.get(api_url+'user/roles');
        return res.data;
    },
    get_designations: async ()=> {
        let res = await http.get(api_url+'user/designations');
        return res.data;
    },
    get_job_statuses: async ()=> {
        let res = await http.get(api_url+'user/job_statuses');
        return res.data;
    },

    //Add
    add_user: async (userData)=>{
        let res = await http.post(api_url+'user/add_user', userData);
        return res.data;
    },

    //Edit
    edit_user: async (userData)=>{
        let res = await http.post(api_url+'user/edit_user', userData);
        return res.data;
    },

    //Delete
    delete_data: async (id_field, id, table)=>{
        let data = {
            id_field: id_field,
            id: id,
            table: table
        }
        let res = await http.post(api_url+'user/delete_data', data);
        return res.data;
    }
}

//school API http query
export const school_api = {
    //Get
    get_rooms: async ()=>{
        let res = await http.get(api_url+'school/rooms');
        return res.data;
    },
    get_departments: async ()=> {
        let res = await http.get(api_url+'school/departments');
        return res.data;
    },
    get_courses: async ()=> {
        let res = await http.get(api_url+'school/courses');
        return res.data;
    },
    get_prospectuses: async ()=> {
        let res = await http.get(api_url+'curriculum/prospectuses');
        return res.data;  
    },
    get_subjects: async (prospectus_id)=> {
        let res = await http.post(api_url+'curriculum/subjects', prospectus_id);
        return res.data;
    },
    get_year_levels: async ()=> {
        let res = await http.get(api_url+'curriculum/year_levels');
        return res.data;
    },
    get_semester: async ()=> {
        let res = await http.get(api_url+'curriculum/semester');
        return res.data;
    },

    //Get Single data
    get_prospectus: async (prospectus_id)=> {
        let res = await http.post(api_url+'curriculum/prospectus', prospectus_id);
        return res.data;   
    },

    //Add
    add_room: async (roomData)=>{
        let res = await http.post(api_url+'school/add_room', roomData);
        return res.data;
    },
    add_department: async (departmentData)=>{
        let res = await http.post(api_url+'school/add_department', departmentData);
        return res.data;
    },
    add_course: async (courseData)=>{
        let res = await http.post(api_url+'school/add_course', courseData);
        return res.data;
    },
    add_prospectus: async (prospectusData)=>{
        let res = await http.post(api_url+'curriculum/add_prospectus', prospectusData);
        return res.data;
    },
    add_subjects: async (subjectsData)=>{
        let res = await http.post(api_url+'curriculum/add_subjects', subjectsData);
        return res.data;
    },

    //Edit
    edit_room: async (roomData)=>{
        let res = await http.post(api_url+'school/edit_room', roomData);
        return res.data;
    },
    edit_department: async (departmentData)=>{
        let res = await http.post(api_url+'school/edit_department', departmentData);
        return res.data;
    },
    edit_course: async (courseData)=>{
        let res = await http.post(api_url+'school/edit_course', courseData);
        return res.data;
    },
    edit_prospectus: async (prospectusData)=>{
        let res = await http.post(api_url+'curriculum/edit_prospectus', prospectusData);
        return res.data;
    },
    edit_subject: async (subjectData)=>{
        let res = await http.post(api_url+'curriculum/edit_subject', subjectData);
        return res.data;
    },
}