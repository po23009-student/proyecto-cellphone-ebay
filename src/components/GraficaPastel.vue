<template>
  <div style="height: 350px; position: relative">
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'

import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'

import ChartDataLabels from 'chartjs-plugin-datalabels'

const props = defineProps({
  listaElementos: Array,
  porcentajes: Array,
  textoTitulo: String,
})

ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels)

const chartData = computed(() => ({
  labels: props.listaElementos,
  datasets: [
    {
      label: 'Porcentaje',
      data: props.porcentajes,
      backgroundColor: ['#396000', '#186049', '#8BBB92'],
      borderColor: '#FFFFFF',
      borderWidth: 2,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: true,
      position: 'right',
    },
    title: {
      display: true,
      text: props.textoTitulo,
    },
    datalabels: {
      color: '#FFFFFF',
      font: {
        weight: 'bold',
        size: 13,
      },
      formatter: (value, context) => {
        const valores = context.dataset.data
        const total = valores.reduce((a, b) => a + b, 0)

        if (total === 0) return '0%'

        return `${((value / total) * 100).toFixed(1)}%`
      },
    },
  },
}
</script>
