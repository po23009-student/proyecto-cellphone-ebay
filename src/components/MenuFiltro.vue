<template>
  <q-toggle
    class="q-ma-md"
    color="green"
    v-model="nuevoToggle"
    @update:model-value="eventoToogleNuevo"
    label="Nuevo"
  />

  <q-option-group
    v-model="listaSeleccionadosMarca"
    :options="listaOpcionesMarca"
    @update:model-value="eventoOpcionesMarca"
    color="green"
    type="checkbox"
    class="q-ma-md"
    style="border: 2px solid green"
  />

  <q-option-group
    v-model="listaSeleccionadosSistema"
    :options="listaOpcionesSistema"
    @update:model-value="eventoOpcionesSistema"
    color="green"
    type="checkbox"
    style="border: 2px solid green"
    class="q-ma-md"
  />

  <q-option-group
    v-model="listaSeleccionadosPantalla"
    :options="listaOpcionesPantalla"
    @update:model-value="eventoOpcionesPantalla"
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

const emit = defineEmits([
  'toogleNuevo',
  'marcaSeleccionada',
  'sistemaSeleccionado',
  'pantallaSeleccionada',
])

function eventoToogleNuevo() {
  emit('toogleNuevo', { valorNuevo: nuevoToggle.value })
}

function eventoOpcionesPantalla() {
  emit('pantallaSeleccionada', { pantallasSeleccionadas: listaSeleccionadosPantalla.value })
}

function eventoOpcionesSistema() {
  emit('sistemaSeleccionado', { sistemasSeleccionados: listaSeleccionadosSistema.value })
}

function eventoOpcionesMarca() {
  emit('marcaSeleccionada', { marcasSeleccionadas: listaSeleccionadosMarca.value })
}
</script>
