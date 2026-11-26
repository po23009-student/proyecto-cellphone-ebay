<template>
  <div style="height: 350px; position: relative">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

const props = defineProps({
  ejeX: Array,
  ejeY: Array,
  textoTitulo: String,
})

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels)

const chartData = computed(() => ({
  labels: props.ejeX,
  datasets: [
    {
      label: 'Marcas',
      data: props.ejeY,
      backgroundColor: '#21BA45',
      borderColor: '#21BA45',
      borderWidth: 1,
      borderRadius: 5,
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
    datalabels: {
      anchor: 'end',
      align: 'top',
      color: '#21BA45',
      font: {
        weight: 'bold',
        size: 12,
      },
      formatter: (value) => `${value.toFixed(1)}%`,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        callback: (value) => `${value}%`,
      },
    },
    x: {
      title: {
        display: false,
        text: 'Marcas',
      },
    },
  },
}
</script>
