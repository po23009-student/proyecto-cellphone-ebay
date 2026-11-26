<template>
  <q-page>
    <div class="q-pa-md row items-start q-gutter-md q-ma-md">
      <div class="col-12 col-md-3">
        <q-card class="my-card bg-secondary text-white">
          <q-card-section>
            <q-icon name="smartphone" size="4rem" />
            <div class="text-h6">Productos</div>
            <div class="text-subtitle2">{{ listaAnuncios.length }}</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-3">
        <q-card class="my-card bg-secondary text-white">
          <q-card-section>
            <q-icon name="storefront" size="4rem" />
            <div class="text-h6">Marcas</div>
            <div class="text-subtitle2">{{ listaMarcas.length }}</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-3">
        <q-card class="my-card bg-secondary text-white">
          <q-card-section>
            <q-icon name="sell" size="4rem" />
            <div class="text-h6">Ventas</div>
            <div class="text-subtitle2">{{ props.productosEnCarrito }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row q-ma-md q-pa-md">
      <div class="col-12 col-md-4">
        <q-circular-progress
          indeterminate
          size="100px"
          :thickness="0.7"
          color="secondary"
          center-color="dark"
          class="q-ma-md"
          v-if="cargando"
        />
      </div>
    </div>

    <div class="row q-ma-md q-pa-md">
      <div class="col-12 col-md-8">
        <GraficaLinea
          :eje-x="listaIndices"
          :eje-y="listaCompras.toReversed()"
          texto-titulo="Articulos agregados"
        />
      </div>
    </div>

    <div class="row q-ma-md q-pa-md">
      <div class="col-12 col-md-8">
        <GraficaBarras
          :eje-x="listaMarcas"
          :eje-y="cantidadesMarcas.map((cantidad) => (cantidad / listaAnuncios.length) * 100)"
          texto-titulo="Porcentaje de Productos por Marca"
        />
      </div>
    </div>
    <div class="row q-ma-md q-pa-md">
      <div class="col-12 col-md-8">
        <GraficaPastel
          :lista-elementos="listaSistemas"
          :porcentajes="
            cantidadesSistemas.map((cantidad) => (cantidad / listaAnuncios.length) * 100)
          "
          texto-titulo="Porcentaje de Productos por Sistema Operativo"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref, defineProps } from 'vue'
import { useQuasar } from 'quasar'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '@/boot/firebase'
import GraficaLinea from '@/components/GraficaLinea.vue'
import GraficaBarras from '@/components/GraficaBarras.vue'
import GraficaPastel from '@/components/GraficaPastel.vue'

const $q = useQuasar()
const cargando = ref(true)

const listaCompras = ref([])
const listaIndices = ref([])
const listaAnuncios = ref([])
const listaMarcas = ref([])
const listaSistemas = ref([])
const cantidadesMarcas = ref([])
const cantidadesSistemas = ref([])

const props = defineProps({
  productosEnCarrito: Number,
})

onMounted(async () => {
  await obtenerTodosDocumentos()
  cargarMarcasParaGrafica()
  cargarSistemasParaGrafica()
})

async function obtenerTodosDocumentos() {
  try {
    const anuncios = await getDocs(collection(db, 'anuncios'))
    anuncios.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data())
      listaAnuncios.value.push({ id: doc.id, ...doc.data() })
    })

    listaAnuncios.value.forEach((anuncio) => {
      listaCompras.value.push(anuncio.precio_telefono)
      listaIndices.value.push(listaAnuncios.value.indexOf(anuncio) + 1)
    })

    listaCompras.value = listaAnuncios.value.map((anuncio) => anuncio.precio_telefono)
    cargando.value = false
  } catch (e) {
    $q.notify({
      type: 'negative',
      message: `Error al obtener los anuncios: ${e.message}`,
    })
  }
}

function cargarMarcasParaGrafica() {
  listaAnuncios.value.forEach((anuncio) => {
    if (!listaMarcas.value.includes(anuncio.marca_telefono)) {
      listaMarcas.value.push(anuncio.marca_telefono)
      cantidadesMarcas.value.push(0)
    }
  })

  listaAnuncios.value.forEach((anuncio) => {
    if (listaMarcas.value.includes(anuncio.marca_telefono)) {
      let indice = listaMarcas.value.indexOf(anuncio.marca_telefono)

      cantidadesMarcas.value[indice]++
    }
  })
}

function cargarSistemasParaGrafica() {
  listaAnuncios.value.forEach((anuncio) => {
    if (!listaSistemas.value.includes(anuncio.sistema_operativo_telefono)) {
      listaSistemas.value.push(anuncio.sistema_operativo_telefono)
      cantidadesSistemas.value.push(0)
    }
  })

  listaAnuncios.value.forEach((anuncio) => {
    if (listaSistemas.value.includes(anuncio.sistema_operativo_telefono)) {
      let indice = listaSistemas.value.indexOf(anuncio.sistema_operativo_telefono)

      cantidadesSistemas.value[indice]++
    }
  })
}
</script>
