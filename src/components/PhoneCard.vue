<template>
  <q-card
    class="q-ma-md phone-card cursor-pointer"
    clickable
    :imagenesTelefono="imagenesLocales"
    @click="$router.push(`/celulardetalle/${idAnuncio}`)"
  >
    <q-img :src="imagenesLocales[0]" fit="contain" alt="Imagen del teléfono" />

    <q-card-section>
      <div class="text-h6 text-primary">$ {{ precioTelefono }}</div>

      <div>
        {{ marcaTelefono }} {{ modeloTelefono }}, Pantalla de {{ pantallaPulgadasTelefono }}"
      </div>

      <div>{{ romGbTelefono }}GB, {{ ramGbTelefono }}GB RAM, Color {{ colorTelefono }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { api } from '@/boot/axios'

const props = defineProps({
  idAnuncio: String,
  precioTelefono: Number,
  marcaTelefono: String,
  modeloTelefono: String,
  pantallaPulgadasTelefono: Number,
  romGbTelefono: Number,
  ramGbTelefono: Number,
  colorTelefono: String,
})

const imagenessrc = ref([])
const documentoAttach = ref({})
const imagenesLocales = ref([])

onMounted(() => {
  obtenerImagenes()
})

watch(
  () => props.idAnuncio,
  () => obtenerImagenes(),
)

async function obtenerImagenes() {
  imagenesLocales.value = []
  let response = await api.get(`/imagenesfpi/${props.idAnuncio}`)

  if (response.status === 200) {
    documentoAttach.value = response.data
    imagenessrc.value = []
    for (let att in documentoAttach.value._attachments) {
      let attname = att

      let atturl = `${api.getUri()}/imagenesfpi/${props.idAnuncio}/${attname}`
      imagenessrc.value.push(atturl)
    }
  }

  for (let archivo in documentoAttach.value._attachments) {
    let nombreArchivo = archivo
    let urlArchivo = `${api.defaults.baseURL}/imagenesfpi/${props.idAnuncio}/${nombreArchivo}`
    let response2 = await api.get(urlArchivo, { responseType: 'blob' })

    if (response2.status === 200) {
      let blob = response2.data
      imagenesLocales.value.push(URL.createObjectURL(blob))
    }
  }
}
</script>

<style scoped>
.phone-card {
  position: relative;
  width: min(100%, 200px);
  padding: 26px 24px 24px;
  border: 2px solid primary;
  text-align: center;
}
.phone-card:hover {
  opacity: 0.7;
}
</style>
