<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props:{
    labels: Array,
    data: Array,
    backgroundColor: Array
  },
  mounted () {
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          backgroundColor: this.backgroundColor,
          data: this.data
        }
      ]
    }, {responsive: true, maintainAspectRatio: true})
  }
}
</script>
