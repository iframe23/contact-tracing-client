<template>
  <div>
    <form @submit.prevent="addDepartment()">

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Department Name</label>		
          </div>

          <div class="col-6">
            <input type="text" v-model="departmentData.department_name" class="form-control" required>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Department Abbrevation</label>		
          </div>

          <div class="col-6">
            <input type="text" v-model="departmentData.department_abb" class="form-control" required>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">

          </div>

          <div class="col-4">
            <button class="btn btn-primary" type="submit">Add Department</button>
          </div>
        </div>
      </div>
    </form>
    
  </div>
</template>

<script>
import {user_api, school_api} from '../../shared/api'
import {bus} from '../../main'

export default {
  name: 'AddDepartment',
  data: () => {
    return{
      alert: {
        type: '',
        result: '',
        message: '',
        dismissCountDown: 0
      },
      departmentData: {
        department_name: '',
        department_abb: '',
      }
    }
  },
  async created(){
    //user_api.get_roles().then(res => this.roles = res);
  },
  methods: {
    addDepartment(){
        school_api.add_department(this.departmentData).then(res => {
          this.alert.type = res.type
          this.alert.result = res.result
          this.alert.message = res.message
          this.alert.dismissCountDown = 10
          bus.$emit('alert_push', this.alert)

          if(this.alert.result == 'Success'){
              this.departmentData.department_name = ''
              this.departmentData.department_abb= ''
          }
        });
    },
  }
}
</script>

<style scoped>

</style>
