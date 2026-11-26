<template>
  <q-toggle
    class="q-ma-md"
    color="green"
    v-model="nuevoToggle"
    @update:model-value="eventoToogleNuevo"
    label="Nuevo"
  />
  <p class="q-mx-md"><strong>Marca</strong></p>
  <q-option-group
    v-model="listaSeleccionadosMarca"
    :options="listaOpcionesMarca"
    @update:model-value="eventoOpcionesMarca"
    color="green"
    type="checkbox"
    class="q-ma-md"
    style="border: 2px solid green"
  />

  <p class="q-mx-md"><strong>Sistema</strong></p>
  <q-option-group
    v-model="listaSeleccionadosSistema"
    :options="listaOpcionesSistema"
    @update:model-value="eventoOpcionesSistema"
    color="green"
    type="checkbox"
    style="border: 2px solid green"
    class="q-ma-md"
  />

  <p class="q-mx-md"><strong>Pantalla</strong></p>
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
import { computed, defineProps, ref, watch } from 'vue'

const props = defineProps({
  listaMarcas: Array,
  cantidadesMarcas: Array,
  listaPantallas: Array,
  cantidadesPantallas: Array,
  listaSistemas: Array,
  cantidadesSistemas: Array,
  listaSeleccionadosMarcaInicial: Array,
  listaSeleccionadosPantallaInicial: Array,
  listaSeleccionadosSistemaInicial: Array,
  toogleNuevoInicial: Boolean,
})

const nuevoToggle = ref(props.toogleNuevoInicial)
const listaSeleccionadosMarca = ref(props.listaSeleccionadosMarcaInicial)
const listaSeleccionadosSistema = ref(props.listaSeleccionadosSistemaInicial)
const listaSeleccionadosPantalla = ref(props.listaSeleccionadosPantallaInicial)

const emit = defineEmits([
  'toogleNuevo',
  'marcaSeleccionada',
  'sistemaSeleccionado',
  'pantallaSeleccionada',
])

const listaOpcionesSistema = computed(() => {
  return props.listaSistemas.map((sistema, index) => ({
    label: `${sistema} (${props.cantidadesSistemas.at(index)})`,
    value: `${sistema}`,
  }))
})

const listaOpcionesMarca = computed(() => {
  return props.listaMarcas.map((marca, index) => ({
    label: `${marca} (${props.cantidadesMarcas.at(index)})`,
    value: `${marca}`,
  }))
})

const listaOpcionesPantalla = computed(() => {
  return props.listaPantallas.map((pulgadas, index) => ({
    label: `${pulgadas} (${props.cantidadesPantallas.at(index)})`,
    value: `${pulgadas}`,
  }))
})

watch(
  () => props.toogleNuevoInicial,
  (newValue) => {
    nuevoToggle.value = newValue
  },
)

watch(
  () => props.listaSeleccionadosMarcaInicial,
  (newValue) => {
    listaSeleccionadosMarca.value = newValue
  },
)

watch(
  () => props.listaSeleccionadosPantallaInicial,
  (newValue) => {
    listaSeleccionadosPantalla.value = newValue
  },
)

watch(
  () => props.listaSeleccionadosSistemaInicial,
  (newValue) => {
    listaSeleccionadosSistema.value = newValue
  },
)

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
