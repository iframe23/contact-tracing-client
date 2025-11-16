<template>
</template>

<script>
import {bus} from '../../main'

export default {
  name: 'Logout',
  methods: {
    async logout(){
      localStorage.removeItem('username')
      localStorage.removeItem('token')
      localStorage.removeItem('role_id')
    }
  },
  async created(){
    let alert = {
      type: 'warning',
      result: 'Logged out',
      message: 'You have logged out successfully !',
      dismissCountDown: 10
    }
    console.log(localStorage.getItem('role_id'));
    await this.logout();
    bus.$emit('alert_push', alert)
    console.log(localStorage.getItem('role_id'));
    this.$router.push('login');
  }
}
</script>
