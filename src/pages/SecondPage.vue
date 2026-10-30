<template>
  <q-page class="flex flex-center">
    <!-- <q-btn color="secondary" to="/" label="Go to Index Page" no-caps /> -->
    <p>{{ anuncio }}</p>
    <p>{{ listaAnuncios }}</p>
    <q-btn label="Agregar" @click="agregarAnuncio" color="primary" />
    <q-btn label="Obtener Todos" @click="obtenerTodosDocumentos" color="primary" />
    <q-btn label="Obtener Imágenes" @click="obtenerImagenes" color="primary" />

    <q-img
      v-for="(imagen, index) in imagenesLocales"
      :key="index"
      :src="imagen"
      style="width: 200px; height: 200px"
      fit="contain"
    />

    <q-file
      style="max-width: 300px"
      v-model="filesImages"
      filled
      rounded
      label="Seleccione las imágenes"
      multiple
      accept=".jpg, image/*"
    />
    <q-btn label="Subir imágenes" @click="subirImagenes" color="secondary" />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { db } from '@/boot/firebase'
import { api } from '@/boot/axios'
//import { mdiFileKey } from '@quasar/extras/mdi-v7'

const $q = useQuasar()
const anuncio = ref({
  titulo: 'Anuncio en blanco',
  descripcion: 'anuncio de prueba',
})

const listaAnuncios = ref([])
const filesImages = ref([])

const imagenessrc = ref([])
const documentoAttach = ref({})
const imagenesLocales = ref([])

async function agregarAnuncio() {
  try {
    const docRef = await addDoc(collection(db, 'anuncios'), anuncio.value)
    console.log('Document written with ID: ', docRef.id)
  } catch (e) {
    $q.notify({
      type: 'negative',
      message: `Error al agregar el anuncio: ${e.message}`,
    })
  }
}

async function obtenerTodosDocumentos() {
  try {
    const anuncios = await getDocs(collection(db, 'anuncios'))
    anuncios.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data())
      listaAnuncios.value.push({ id: doc.id, ...doc.data() })
    })
  } catch (e) {
    $q.notify({
      type: 'negative',
      message: `Error al obtener los anuncios: ${e.message}`,
    })
  }
}

async function subirImagenes() {
  if (!filesImages.value || filesImages.value.length === 0) {
    $q.notify({
      type: 'negative',
      message: 'No se han seleccionado imágenes para subir',
    })
    return
  }

  let coleccionCouchdb = '/imagenesfpi/'
  let idDocumento = listaAnuncios.value[0].id

  console.log(coleccionCouchdb, idDocumento)
  let rev = null

  try {
    const responseDocumento = await api.get(`${coleccionCouchdb}${idDocumento}`)
    rev = responseDocumento.data._rev
  } catch (error) {
    if (error.response?.status === 404) {
      console.log('El documento no existe aún')
    } else {
      console.error('Error al consultar el documento:', error.response?.data || error.message)
      return
    }
  }

  for (let i = 0; i < filesImages.value.length; i++) {
    let file = filesImages.value[i]
    console.log(`Subiendo imagen: ${file}`)

    let attname = `archivo${i}.jpg`

    console.log(`${api.defaults.baseURL}${coleccionCouchdb}${idDocumento}/${attname}`)

    const url = rev
      ? `${coleccionCouchdb}${idDocumento}/${attname}?rev=${rev}`
      : `${coleccionCouchdb}${idDocumento}/${attname}`

    let response = await api.put(url, file, {
      headers: {
        'Content-Type': file.type,
      },
    })

    if (response.status === 201) {
      console.log(`Imagen subida correctamente: ${file.name}`)
      rev = response.data.rev
    } else {
      console.log(`Error al subir la imagen: ${file.name}`)
    }
  }
}

async function obtenerImagenes() {
  let idDocumento = '5jgCcRQvdBwgtvnoOjRV'
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
  //recorro todos los attachments
  for (let archivo in documentoAttach.value._attachments) {
    let nombreArchivo = archivo
    let urlArchivo = `https://couchdbbackend.esaapp.com/imagenesfpi/${idDocumento}/${nombreArchivo}`
    let response2 = await api.get(urlArchivo, { responseType: 'blob' })

    if (response2.status === 200) {
      let blob = response2.data
      imagenesLocales.value.push(URL.createObjectURL(blob))
    }
  }
}

/*import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { collection, addDoc } from '@firebase/firestore'
import { db } from 'boot/firebase'

const $q = useQuasar()

const anuncio = ref({
  titulo: 'Anuncio en blanco',
  descripcion: 'anuncio de prueba',
})

let coleccionCouchdb = 'imagenesfpi'
let idDocumento = anuncios.value[0].id //usamos el primer anuncio


async function agregarAnuncio() {
  console.log('Agregando anuncio')
}

function obtenerTodosDocumentos() {
  let anuncios = collection(db, 'anuncios')

  anuncios
    .get()
    .then((filas) => {
      filas.forEach((doc) => console.log(`${doc.id} --> ${doc.data()}`))
    })
    .catch((e) => {
      $q.notify({
        type: 'negative',
        message: `Error al obtener los anuncios: ${e.message}`,
      })
    })
}*/
</script>
