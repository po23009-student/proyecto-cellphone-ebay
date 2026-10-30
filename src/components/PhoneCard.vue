<template>
  <q-card class="q-ma-md" clickable @click="$router.push(`/celulardetalle/${anuncio_id}`)">
    <q-img src="" alt="Samsung J6" style="height: 150px" />

    <q-card-section>
      <q-img :src="imagenesLocales[0]" style="width: 200px; height: 200px" fit="contain" />

      <!--<q-img class="q-my-xs" :src="imagenesLocales[0]" fit="contain" />-->
      <div class="text-h6 text-primary q-mt-sm">$ {{ precioTelefono }}</div>
      <div class="text-h4">
        {{ marcaTelefono }} {{ modeloTelefono }}, Pantalla de {{ pantallaPulgadasTelefono }}
      </div>
      <div class="text-h4">
        {{ romGbTelefono }}GB, {{ ramGbTelefono }}GB Ram, Color {{ colorTelefono }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
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

onBeforeMount(async () => {
  await obtenerImagenes()
})

async function obtenerImagenes() {
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
