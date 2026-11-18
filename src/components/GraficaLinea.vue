<template>
  <div style="height: 350px; position: relative">
    <Line v-if="chartData.labels.length > 0" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

const props = defineProps({
  ejeX: Array,
  ejeY: Array,
  textoTitulo: String,
})

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

const chartData = computed(() => ({
  labels: props.ejeX,
  datasets: [
    {
      label: 'Compras',
      data: props.ejeY,
      borderColor: '#21BA45',
      backgroundColor: 'rgba(33, 186, 69, 0.2)',
      tension: 0.4,
      fill: true,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
    title: {
      display: true,
      text: props.textoTitulo,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Precios ($)',
      },
    },
  },
}
</script>
