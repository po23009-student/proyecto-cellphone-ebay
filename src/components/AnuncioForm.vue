<template>
  <q-form style="border: 2px solid green">
    <q-option-group
      v-model="estadoSeleccionado"
      :options="opcionesEstado"
      color="primary"
      class="q-ma-lg"
    />
    <q-input v-model="marcaText" outlined label="Marca" class="q-ma-lg" />
    <q-input v-model="modeloText" outlined label="Modelo" class="q-ma-lg" />
    <q-input v-model="pantallaText" outlined label="Pantalla (Pulgadas)" class="q-ma-lg" />
    <q-select
      outlined
      v-model="modeloSistema"
      :options="opcionesSistema"
      label="Sistema"
      class="q-ma-lg"
    />

    <q-input
      outlined
      type="number"
      v-model.number="modeloRom"
      min="0"
      step="2"
      class="q-ma-lg"
      label="ROM (GB)"
    />
    <q-input
      outlined
      type="number"
      v-model.number="modeloRam"
      min="0"
      step="2"
      class="q-ma-lg"
      label="RAM (GB)"
    />
  </q-form>
</template>

<script setup>
import { ref } from 'vue'

const marcaText = ref('')
const modeloSistema = ref(null)
const opcionesSistema = ['Android', 'Windows', 'iOS']
const modeloRam = ref(0)
const modeloRom = ref(0)
const estadoSeleccionado = ref('op1')
const opcionesEstado = [
  {
    label: 'Nuevo',
    value: 'op1',
  },
  {
    label: 'Usado',
    value: 'op2',
  },
]
</script>
