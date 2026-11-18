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
            <q-icon name="window" size="3rem" />
            <q-icon name="apple" size="4rem" />
            <q-icon name="android" size="4rem" />
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
          :eje-y="listaCompras"
          texto-titulo="Articulos agregados"
        />
      </div>
    </div>

    <div class="row q-ma-md q-pa-md">
      <div class="col-12 col-md-8">
        <GraficaBarras
          :eje-x="['Samsung', 'Huawei', 'Nokia', 'iPhone', 'Xiaomi']"
          :eje-y="[
            (productosSamsung / listaAnuncios.length) * 100,
            (productosHuawei / listaAnuncios.length) * 100,
            (productosNokia / listaAnuncios.length) * 100,
            (productosIPhone / listaAnuncios.length) * 100,
            (productosXiaomi / listaAnuncios.length) * 100,
          ]"
          texto-titulo="Porcentaje de Productos por Marca"
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

const $q = useQuasar()
const listaAnuncios = ref([])
const listaMarcas = ref([])
const listaCompras = ref([])
const listaIndices = ref([])
const productosSamsung = ref(0)
const productosHuawei = ref(0)
const productosNokia = ref(0)
const productosIPhone = ref(0)
const productosXiaomi = ref(0)
const cargando = ref(true)

const props = defineProps({
  productosEnCarrito: Number,
})

onMounted(() => {
  obtenerTodosDocumentos()
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

      if (!listaMarcas.value.includes(anuncio.marca_telefono)) {
        listaMarcas.value.push(anuncio.marca_telefono)
      }

      if (anuncio.marca_telefono === 'Samsung') productosSamsung.value++
      if (anuncio.marca_telefono === 'Huawei') productosHuawei.value++
      if (anuncio.marca_telefono === 'Nokia') productosNokia.value++
      if (anuncio.marca_telefono === 'iPhone') productosIPhone.value++
      if (anuncio.marca_telefono === 'Xiaomi') productosXiaomi.value++
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
</script>
