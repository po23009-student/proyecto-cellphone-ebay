<template>
  <div class="row">
    <div class="col-12 col-md-6">
      <div>
        <q-carousel
          v-model="slide"
          animated
          arrows
          navigation
          infinite
          control-type="regular"
          control-color="primary"
          style="width: 70%; height: 400px; margin: 0 auto; padding: 0"
        >
          <q-carousel-slide
            v-for="(imagen, index) in imagenesLocales"
            :key="index"
            :name="index + 1"
            class="flex flex-center"
          >
            <q-img :src="imagen" fit="contain" style="width: 100%; height: 100%" />
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>
    <div class="col-12 col-md-6">
      <div class="row q-ma-md">
        <div class="col-md-6">
          <div class="q-pa-md">
            {{ datosDocumento.marca_telefono }} {{ datosDocumento.modelo_telefono }}, pantalla de
            {{ datosDocumento.pantalla_pulgadas_telefono }} pulgadas,
            {{ datosDocumento.rom_gb_telefono }}Gb internos, {{ datosDocumento.ram_gb_telefono }}Gb
            de Ram, {{ datosDocumento.estado_telefono }}
          </div>
          <div class="text-h4 q-pa-md">$ {{ datosDocumento.precio_telefono }}</div>
          <q-btn
            style="background-color: #124d1c; color: white"
            label="Inicio"
            to="/ventacelulares"
            class="gt-sm"
          />
          <q-btn
            style="background-color: #124d1c; color: white"
            @click="eventoArticuloComprado"
            label="Comprar"
            class="gt-sm"
          />
        </div>
      </div>

      <div class="row q-ma-md">
        <div class="col-12 col-md-6">
          <div style="border: 2px solid green">
            <span style="margin: 2px">Vendedor: {{ datosDocumento.vendedor }}</span>
            <span style="margin: 2px">Telefono: {{ datosDocumento.telefono_vendedor }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row justify-center gt-sm">
    <h5>DESCRIPCIÓN</h5>
  </div>
  <div class="row justify-center">
    <div class="col-12 col-md-3 q-mx-md" style="border: 2px solid green">
      <p><strong>Estado:</strong> {{ datosDocumento.estado_telefono }}</p>
      <p><strong>Marca:</strong> {{ datosDocumento.marca_telefono }}</p>
      <p><strong>Modelo:</strong> {{ datosDocumento.modelo_telefono }}</p>
      <p><strong>Pantalla:</strong> {{ datosDocumento.pantalla_pulgadas_telefono }} Pulgadas</p>
      <p><strong>Sistema:</strong> {{ datosDocumento.sistema_operativo_telefono }}</p>
      <p><strong>Rom:</strong> {{ datosDocumento.rom_gb_telefono }} GB</p>
      <p><strong>Ram:</strong> {{ datosDocumento.ram_gb_telefono }} GB</p>
    </div>
    <div class="col-12 col-md-3 q-mx-md" style="border: 2px solid green">
      {{ datosDocumento.descripcion_anuncio }}
    </div>
  </div>

  <div class="row justify-center q-ma-md q-gutter-sm">
    <q-btn
      style="background-color: #124d1c; color: white"
      label="Inicio"
      to="/ventacelulares"
      class="lt-md"
    />
    <q-btn
      style="background-color: #124d1c; color: white"
      label="Comprar"
      @click="eventoArticuloComprado"
      class="lt-md"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, defineEmits } from 'vue'
import { useRoute } from 'vue-router'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/boot/firebase'
import { api } from '@/boot/axios'

const slide = ref(1)
const ruta = useRoute()
const datosDocumento = ref({})

const imagenessrc = ref([])
const documentoAttach = ref({})
const imagenesLocales = ref([])

const emit = defineEmits(['articuloComprado'])

onMounted(() => {
  obtenerDocumento(ruta.params.cid)
  obtenerImagenes(ruta.params.cid)
})

async function obtenerDocumento(idDocumento) {
  const docRef = doc(db, 'anuncios', idDocumento)
  const docSnap = await getDoc(docRef)

  datosDocumento.value = docSnap.data()
}

async function obtenerImagenes(idDocumento) {
  let response = await api.get(`/imagenesfpi/${idDocumento}`)

  if (response.status === 200) {
    documentoAttach.value = response.data
    imagenessrc.value = []
    for (let att in documentoAttach.value._attachments) {
      let attname = att

      let atturl = `${api.getUri()}/imagenesfpi/${idDocumento}/${attname}`
      imagenessrc.value.push(atturl)
    }
  }

  for (let archivo in documentoAttach.value._attachments) {
    let nombreArchivo = archivo
    let urlArchivo = `${api.defaults.baseURL}/imagenesfpi/${idDocumento}/${nombreArchivo}`
    let response2 = await api.get(urlArchivo, { responseType: 'blob' })

    if (response2.status === 200) {
      let blob = response2.data
      imagenesLocales.value.push(URL.createObjectURL(blob))
    }
  }
}

function eventoArticuloComprado() {
  emit('articuloComprado')
}
</script>
