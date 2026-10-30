<template>
  <!-- Marca -->
  <q-toggle class="q-ma-md" color="green" v-model="nuevoToggle" label="Nuevo" />

  <q-option-group
    v-model="listaSeleccionadosMarca"
    :options="listaOpcionesMarca"
    color="green"
    type="checkbox"
    class="q-ma-md"
    style="border: 2px solid green"
  />

  <q-option-group
    v-model="listaSeleccionadosSistema"
    :options="listaOpcionesSistema"
    color="green"
    type="checkbox"
    style="border: 2px solid green"
    class="q-ma-md"
  />

  <q-option-group
    v-model="listaSeleccionadosPantalla"
    :options="listaOpcionesPantalla"
    color="green"
    type="checkbox"
    style="border: 2px solid green"
    class="q-ma-md"
  />
</template>

<script setup>
import { ref } from 'vue'

const nuevoToggle = ref(false)

const listaSeleccionadosMarca = ref([])
const listaSeleccionadosSistema = ref([])
const listaSeleccionadosPantalla = ref([])

const listaOpcionesMarca = [
  {
    label: 'Samsung',
    value: 'Samsung',
  },
  {
    label: 'Huawei',
    value: 'Huawei',
  },
  {
    label: 'Nokia',
    value: 'Nokia',
  },
  {
    label: 'iPhone',
    value: 'iPhone',
  },
  {
    label: 'Xiaomi',
    value: 'Xiaomi',
  },
]
const listaOpcionesSistema = [
  {
    label: 'Android',
    value: 'Android',
  },
  {
    label: 'Windows',
    value: 'Windows',
  },
  {
    label: 'iOS',
    value: 'iOS',
  },
]
const listaOpcionesPantalla = [
  {
    label: '6.0',
    value: '6.0',
  },
  {
    label: '5.5',
    value: '5.5',
  },
  {
    label: '5',
    value: '5',
  },
]
</script>
