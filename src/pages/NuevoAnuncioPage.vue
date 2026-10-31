<template>
  <div class="row justify-center q-ma-xs">
    <h3>NUEVO ANUNCIO</h3>
    {{ anuncio.ruta_imagenes_telefono }}
  </div>
  <q-form @submit="guardarAnuncio">
    <div class="row q-ma-lg justify-center">
      <div class="col-12 col-md-6" style="border: 2px solid #2a7c13">
        <q-option-group
          v-model="estadoSeleccionado"
          :options="opcionesEstado"
          color="primary"
          class="q-ma-md"
          inline
        />
        <q-input
          v-model="marcaText"
          outlined
          label="Marca"
          class="q-ma-lg"
          :rules="[(val) => !!val || 'Debe llenar este campo']"
        />
        <q-input
          v-model="modeloTelText"
          outlined
          label="Modelo"
          class="q-ma-lg"
          :rules="[(val) => !!val || 'Debe llenar este campo']"
        />

        <q-input
          v-model="colorTelText"
          outlined
          label="Color"
          class="q-ma-lg"
          :rules="[(val) => !!val || 'Debe llenar este campo']"
        />
        <q-input
          v-model.number="pantallaText"
          type="number"
          step="2"
          min="0"
          outlined
          label="Pantalla (Pulgadas)"
          class="q-ma-lg"
          :rules="[(val) => !!val || 'Debe llenar este campo']"
        />

        <q-select
          outlined
          v-model="sistemaOperativo"
          :options="opcionesSistemaOperativo"
          label="Sistema"
          class="q-ma-lg"
          :rules="[(val) => !!val || 'Debe seleccionar un Sistema Operativo']"
        />

        <div class="row items-center">
          <div class="col">
            <q-input
              outlined
              v-model.number="gbRom"
              step="2"
              type="number"
              class="q-ma-lg"
              label="ROM (GB)"
              :rules="[(val) => !!val || 'Debe llenar este campo']"
            />
          </div>
          <div class="col text-grey-8 q-pr-lg">Almacenamiento interno</div>
        </div>

        <q-input
          outlined
          v-model.number="gbRam"
          step="2"
          type="number"
          class="q-ma-lg"
          label="RAM (GB)"
          :rules="[(val) => !!val || 'Debe llenar este campo']"
        />
      </div>

      <div class="col-12 col-md-6">
        <div class="row justify-center">
          <div class="col-12">
            <q-input
              v-model="tituloText"
              outlined
              label="Titulo breve del anuncio"
              class="q-ma-lg"
              :rules="[(val) => !!val || 'Debe llenar este campo']"
            />
            <q-input
              v-model="vendedorText"
              outlined
              label="Vendedor"
              class="q-ma-lg"
              :rules="[(val) => !!val || 'Debe llenar este campo']"
            />
            <q-input
              v-model="telefonoText"
              outlined
              label="Teléfono"
              class="q-ma-lg"
              :rules="[(val) => !!val || 'Debe llenar este campo']"
            />

            <div class="text-weight-bold q-ml-lg">DESCRIPCION</div>
            <q-input
              v-model="descripcionText"
              type="textarea"
              outlined
              class="q-ma-lg"
              :rules="[(val) => !!val || 'Debe llenar este campo']"
            />

            <div style="border: 3px solid #2a7c13" class="q-ma-lg q-pa-md">
              <div class="text-weight-bold q-mb-sm">PRECIO</div>
              <q-input
                type="number"
                v-model.number="precioText"
                outlined
                prefix="$"
                min="0"
                step="0.50"
                :rules="[(val) => !!val || 'Debe llenar este campo']"
              />
            </div>
          </div>

          <div class="row justify-center q-gutter-md">
            <q-btn
              color="black"
              text-color="white"
              icon="cancel"
              label="Cancelar"
              to="/ventacelulares"
            />
            <q-btn color="black" text-color="white" type="submit" icon="save" label="Crear" />
          </div>
        </div>
      </div>
    </div>

    <div class="row q-mx-lg q-mb-lg">
      <div style="border: 3px solid #2a7c13" class="col-12 col-md-6">
        <h6 class="q-ma-md q-mt-none">Imágenes</h6>

        <div class="row q-ma-lg items-center q-col-gutter-md">
          <div class="col-auto">
            <div class="column q-gutter-md">
              <q-btn round color="primary" text-color="white" icon="add">
                <q-file
                  v-model="filesImages"
                  multiple
                  accept=".jpg, image/*"
                  style="position: absolute; opacity: 0; width: 100%; height: 100%; cursor: pointer"
                  :rules="[(val) => !!val || 'Debe seleccionar una imagen']"
                />
              </q-btn>
              <q-btn round color="primary" text-color="white" icon="remove" />
            </div>
          </div>

          <div class="col q-px-md">
            <table style="width: auto; text-align: left; border-spacing: 12px 4px">
              <thead>
                <tr class="text-weight-bold">
                  <th>N</th>
                  <th>Tamaño</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>145 kb</td>
                  <td>jpg</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>145 kb</td>
                  <td>png</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>145 kb</td>
                  <td>png</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>145 kb</td>
                  <td>jpg</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="col-auto">
            <q-carousel
              animated
              v-model="slide"
              arrows
              navigation
              infinite
              style="width: 250px; height: 350px"
            >
              <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
            </q-carousel>
          </div>
        </div>
      </div>
    </div>
  </q-form>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/boot/firebase'
import { api } from '@/boot/axios'

const $q = useQuasar()
const marcaText = ref('')
const colorTelText = ref('')
const pantallaText = ref(0.0)
const tituloText = ref('')
const vendedorText = ref('')
const telefonoText = ref('')
const modeloTelText = ref('')
const descripcionText = ref('')
const precioText = ref(0.0)

const sistemaOperativo = ref(null)
const opcionesSistemaOperativo = ['Android', 'Windows', 'iOS']
const gbRam = ref(0.0)
const gbRom = ref(0.0)
const estadoSeleccionado = ref('Nuevo')
const opcionesEstado = [
  {
    label: 'Nuevo',
    value: 'Nuevo',
  },
  {
    label: 'Usado',
    value: 'Usado',
  },
]

const filesImages = ref([])
const slide = ref(1)

const anuncio = ref({
  titulo_anuncio: tituloText,
  color_telefono: colorTelText,
  descripcion_anuncio: descripcionText,
  estado_telefono: estadoSeleccionado,
  marca_telefono: marcaText,
  modelo_telefono: modeloTelText,
  pantalla_pulgadas_telefono: pantallaText,
  precio_telefono: precioText,
  ram_gb_telefono: gbRam,
  rom_gb_telefono: gbRom,
  sistema_operativo_telefono: sistemaOperativo,
  telefono_vendedor: telefonoText,
  vendedor: vendedorText,
  ruta_imagenes_telefono: '',
})

async function subirImagenes(idDocumento) {
  if (!filesImages.value || filesImages.value.length === 0) {
    $q.notify({
      type: 'negative',
      message: 'No se han seleccionado imágenes para subir',
      position: 'top',
    })
    return
  }

  let coleccionCouchdb = '/imagenesfpi/'
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
      anuncio.value.ruta_imagenes_telefono = `${api.defaults.baseURL}${coleccionCouchdb}${idDocumento}`
      anuncio.value.rev = response.data.rev
    } else {
      console.log(`Error al subir la imagen: ${file.name}`)
    }
  }
}

async function guardarAnuncio() {
  try {
    const docRef = await addDoc(collection(db, 'anuncios'), anuncio.value)
    console.log(`ID del nuevo documento: ${docRef.id}`)
    await subirImagenes(docRef.id)

    $q.notify({
      type: 'positive',
      message: 'Anuncio guardado con éxito',
      position: 'top',
    })
  } catch (e) {
    $q.notify({
      type: 'negative',
      message: `Error al agregar el anuncio: ${e.message}`,
    })
  }
}
</script>
