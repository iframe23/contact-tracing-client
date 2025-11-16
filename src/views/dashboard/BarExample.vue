<script>
import { Bar } from 'vue-chartjs'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'

export default {
  extends: Bar,
  props:{
    labels: Array,
    data: Array,
    label: String
  },
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(
      {
        labels: this.labels,
        datasets: [
          {
            label: this.label,
            backgroundColor: '#9900cc',
            data: this.data
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: false,
          custom: CustomTooltips,
          intersect: true,
          mode: 'index',
          position: 'nearest',
          callbacks: {
            labelColor: function (tooltipItem, chart) {
              return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].backgroundColor }
            }
          }
        }
      }
    )
  }
}
</script>
