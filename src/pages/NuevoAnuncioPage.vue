<template>
  <div class="row justify-center q-ma-xs">
    <h3>NUEVO ANUNCIO</h3>
  </div>
  <q-form @validation-error="errorDeValidacion" @submit="guardarAnuncio">
    <div class="row q-mx-lg q-mb-lg lt-md">
      <div class="col-12 col-md-7" style="border: 3px solid #2a7c13; min-width: 0">
        <h6 class="q-ma-md q-mt-none">Imágenes</h6>

        <div class="column q-pa-md q-gutter-md">
          <div>
            <div class="botones-carrusel-telefono">
              <q-btn round color="primary" icon="add">
                <q-tooltip style="font-size: 14px"> Agregar Imagen </q-tooltip>
                <q-file
                  v-model="filesImages"
                  multiple
                  append
                  accept=".jpg, image/*"
                  style="position: absolute; opacity: 0; width: 100%; height: 100%; cursor: pointer"
                />
              </q-btn>

              <q-btn
                round
                :disable="deshabilitarBotonEliminarImagenes"
                @click="eliminarImagenActual"
                color="primary"
                icon="remove"
                title="Eliminar imagen"
              >
                <q-tooltip style="font-size: 14px"> Eliminar Imagen </q-tooltip>
              </q-btn>
            </div>
            <q-carousel
              v-model="slide"
              animated
              arrows
              navigation
              infinite
              control-type="regular"
              control-color="primary"
              style="width: 100%; height: 300px"
            >
              <q-carousel-slide
                v-for="(imagen, index) in imagenesURL"
                :key="imagen"
                :name="index + 1"
                class="flex flex-center"
              >
                <q-img :src="imagen" fit="contain" style="width: 100%; height: 100%" />
              </q-carousel-slide>
            </q-carousel>
          </div>

          <div style="width: 100%; max-height: 180px; overflow-y: auto; overflow-x: auto">
            <table style="width: 100%; table-layout: fixed; text-align: left; border-spacing: 0">
              <thead>
                <tr class="text-weight-bold">
                  <th style="width: 15%">N</th>
                  <th style="width: 35%">Tamaño</th>
                  <th style="width: 50%">Tipo</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(imagen, index) in filesImages" :key="imagen.name + index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ (imagen.size / (1024 * 1024)).toFixed(4) }} MB</td>
                  <td style="overflow-wrap: anywhere">
                    {{ imagen.type }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 col-md-6 lt-md">
      <div class="row justify-center">
        <div class="col-12">
          <q-input
            v-model="tituloText"
            outlined
            label="Titulo del Anuncio"
            class="q-ma-lg"
            :rules="[(val) => !!val || 'Debe llenar este campo']"
          />

          <div style="border: 3px solid #2a7c13; margin-bottom: 35px" class="q-ma-lg q-pa-md">
            <div class="text-weight-bold q-mb-sm">PRECIO</div>
            <q-input
              type="number"
              v-model.number="precioText"
              outlined
              prefix="$"
              min="0.0"
              step="0.01"
              :rules="[
                (val) => !!val || 'Debe llenar este campo',
                (val) => val > 0 || 'El precio debe ser mayor que cero',
              ]"
            />
          </div>
          <q-input
            v-model="vendedorText"
            outlined
            label="Vendedor"
            class="q-ma-lg"
            :rules="[
              (val) => !!val || 'Debe llenar este campo',
              (val) =>
                /^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s\.]+$/.test(val) ||
                'El campo debe estar compuesto por texto',
            ]"
          />
          <q-input
            v-model="telefonoText"
            outlined
            label="Teléfono"
            class="q-ma-lg"
            mask="####-####"
            :rules="[
              (val) => !!val || 'Debe llenar este campo',
              (val) => /^[0-9]{4}-[0-9]{4}$/.test(val) || 'Formato inválido',
            ]"
          />

          <div class="col-12 col-md-6" style="border: 2px solid #2a7c13">
            <q-option-group
              v-model="estadoSeleccionado"
              :options="opcionesEstado"
              color="primary"
              class="q-ma-md"
              inline
            />
            <q-select
              v-model="marcaText"
              :options="['Samsung', 'iPhone', 'Huawei', 'Nokia', 'Xiaomi']"
              use-input
              use-chips
              new-value-mode="add-unique"
              outlined
              label="Marca"
              class="q-ma-lg"
              :rules="[(val) => !!val || 'Debe seleccionar una marca']"
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
              :rules="[
                (val) => !!val || 'Debe llenar este campo',
                (val) => /^[A-Za-z\s]+$/.test(val) || 'El campo debe estar compuesto por texto',
              ]"
            />
            <q-input
              v-model.number="pantallaText"
              type="number"
              step="0.01"
              min="3"
              outlined
              label="Pantalla (Pulgadas)"
              class="q-ma-lg"
              :rules="[(val) => !!val || 'Debe llenar este campo']"
            />

            <q-select
              v-model="sistemaOperativo"
              :options="['Android', 'Windows', 'iOS']"
              use-input
              use-chips
              new-value-mode="add-unique"
              outlined
              label="Sistema"
              class="q-ma-lg"
              :rules="[(val) => !!val || 'Debe seleccionar un Sistema Operativo']"
            />

            <div class="row items-center">
              <div class="col">
                <q-input
                  outlined
                  v-model.number="gbRom"
                  step="1"
                  min="2"
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
              step="1"
              min="2"
              type="number"
              class="q-ma-lg"
              label="RAM (GB)"
              :rules="[(val) => !!val || 'Debe llenar este campo']"
            />
          </div>
          <div class="text-weight-bold q-ml-lg">DESCRIPCION</div>
          <q-input
            v-model="descripcionText"
            type="textarea"
            outlined
            class="q-ma-lg"
            :rules="[(val) => !!val || 'Debe llenar este campo']"
          />
        </div>
      </div>
    </div>

    <div class="row q-ma-lg justify-center">
      <div class="col-12 col-md-6 gt-sm" style="border: 2px solid #2a7c13">
        <q-option-group
          v-model="estadoSeleccionado"
          :options="opcionesEstado"
          color="primary"
          class="q-ma-md"
          inline
        />
        <q-select
          v-model="marcaText"
          :options="['Samsung', 'iPhone', 'Huawei', 'Nokia', 'Xiaomi']"
          use-input
          use-chips
          new-value-mode="add-unique"
          outlined
          label="Marca"
          class="q-ma-lg"
          :rules="[(val) => !!val || 'Debe seleccionar una marca']"
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
          :rules="[
            (val) => !!val || 'Debe llenar este campo',
            (val) => /^[A-Za-z\s]+$/.test(val) || 'El campo debe estar compuesto por texto',
          ]"
        />
        <q-input
          v-model.number="pantallaText"
          type="number"
          step="0.01"
          min="3"
          outlined
          label="Pantalla (Pulgadas)"
          class="q-ma-lg"
          :rules="[(val) => !!val || 'Debe llenar este campo']"
        />

        <q-select
          outlined
          v-model="sistemaOperativo"
          :options="['Android', 'Windows', 'iOS']"
          use-input
          use-chips
          new-value-mode="add-unique"
          label="Sistema"
          class="q-ma-lg"
          :rules="[(val) => !!val || 'Debe seleccionar un Sistema Operativo']"
        />

        <div class="row items-center">
          <div class="col">
            <q-input
              outlined
              v-model.number="gbRom"
              step="1"
              min="2"
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
          step="1"
          min="2"
          type="number"
          class="q-ma-lg"
          label="RAM (GB)"
          :rules="[(val) => !!val || 'Debe llenar este campo']"
        />
      </div>

      <div class="col-12 col-md-6 gt-sm">
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
              :rules="[
                (val) => !!val || 'Debe llenar este campo',
                (val) =>
                  /^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s\.]+$/.test(val) ||
                  'El campo debe estar compuesto por texto',
              ]"
            />
            <q-input
              v-model="telefonoText"
              outlined
              label="Teléfono"
              class="q-ma-lg"
              mask="####-####"
              :rules="[
                (val) => !!val || 'Debe llenar este campo',
                (val) => /^[0-9]{4}-[0-9]{4}$/.test(val) || 'Formato inválido',
              ]"
            />

            <div class="text-weight-bold q-ml-lg">DESCRIPCION</div>
            <q-input
              v-model="descripcionText"
              type="textarea"
              outlined
              class="q-ma-lg"
              :rules="[(val) => !!val || 'Debe llenar este campo']"
            />

            <div style="border: 3px solid #2a7c13; margin-bottom: 35px" class="q-ma-lg q-pa-md">
              <div class="text-weight-bold q-mb-sm">PRECIO</div>
              <q-input
                type="number"
                v-model.number="precioText"
                outlined
                prefix="$"
                min="0.0"
                step="0.01"
                :rules="[
                  (val) => !!val || 'Debe llenar este campo',
                  (val) => val > 0 || 'El precio debe ser mayor que cero',
                ]"
              />
            </div>
          </div>
          <div class="row justify-center q-gutter-md">
            <q-btn
              color="black"
              text-color="white"
              icon="cancel"
              label="Cancelar"
              to="/"
              class="gt-sm"
            />
            <q-btn
              color="black"
              text-color="white"
              type="submit"
              icon="save"
              label="Crear"
              class="gt-sm"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="row q-mx-lg q-mb-lg gt-sm" style="padding-bottom: 100px">
      <div class="col-12 col-md-7" style="border: 3px solid #2a7c13; min-width: 0">
        <h6 class="q-ma-md q-mt-none">Imágenes</h6>

        <div class="row no-wrap q-col-gutter-sm q-pa-md items-center">
          <div class="col-auto">
            <div class="column q-gutter-md">
              <q-btn round color="primary" icon="add">
                <q-tooltip style="font-size: 14px"> Agregar imagen </q-tooltip>
                <q-file
                  v-model="filesImages"
                  multiple
                  append
                  accept=".jpg, image/*"
                  style="position: absolute; opacity: 0; width: 100%; height: 100%; cursor: pointer"
                />
              </q-btn>

              <q-btn
                round
                :disable="deshabilitarBotonEliminarImagenes"
                @click="eliminarImagenActual"
                color="primary"
                icon="remove"
              >
                <q-tooltip style="font-size: 14px"> Eliminar Imagen </q-tooltip>
              </q-btn>
            </div>
          </div>

          <div class="col-4 flex items-center" style="min-width: 0">
            <div
              class="full-width"
              style="
                height: 400px;
                overflow-y: auto;
                overflow-x: hidden;
                display: flex;
                align-items: center;
              "
            >
              <table style="width: 100%; table-layout: fixed; text-align: left; border-spacing: 0">
                <thead>
                  <tr class="text-weight-bold">
                    <th style="width: 15%">N</th>
                    <th style="width: 35%">Tamaño</th>
                    <th style="width: 50%">Tipo</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(imagen, index) in filesImages" :key="imagen.name + index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ (imagen.size / (1024 * 1024)).toFixed(4) }} MB</td>
                    <td style="overflow-wrap: anywhere">
                      {{ imagen.type }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="col" style="min-width: 0">
            <q-carousel
              v-model="slide"
              animated
              arrows
              navigation
              infinite
              control-type="regular"
              control-color="primary"
              style="width: 100%; height: 400px"
            >
              <q-carousel-slide
                v-for="(imagen, index) in imagenesURL"
                :key="imagen"
                :name="index + 1"
                class="flex flex-center"
              >
                <q-img :src="imagen" fit="contain" style="width: 100%; height: 100%" />
              </q-carousel-slide>
            </q-carousel>
          </div>
        </div>
      </div>
    </div>
    <div class="botones-inferiores-telefono">
      <q-btn
        style="background-color: #124d1c; color: white"
        label="Cancelar"
        color="black"
        text-color="white"
        icon="cancel"
        to="/"
        class="lt-md"
      />
      <q-btn
        style="background-color: #124d1c; color: white"
        color="black"
        text-color="white"
        type="submit"
        icon="save"
        label="Crear Anuncio"
        class="lt-md"
      />
    </div>
  </q-form>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { collection, doc, addDoc, serverTimestamp, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/boot/firebase'
import { api } from '@/boot/axios'

const $q = useQuasar()
const marcaText = ref('')
const colorTelText = ref('')
const pantallaText = ref(6.0)
const tituloText = ref('')
const vendedorText = ref('')
const telefonoText = ref('')
const modeloTelText = ref('')
const descripcionText = ref('')
const precioText = ref(0.0)

const sistemaOperativo = ref(null)
const gbRam = ref(6.0)
const gbRom = ref(8.0)
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
const router = useRouter()

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
  fecha_creacion: serverTimestamp(),
})

const imagenesURL = computed(() => {
  return filesImages.value.map((file) => URL.createObjectURL(file))
})

const deshabilitarBotonEliminarImagenes = computed(() => filesImages.value.length == 0)

async function subirImagenes(idDocumento) {
  if (!filesImages.value || filesImages.value.length === 0) {
    $q.notify({
      type: 'negative',
      message: 'No se han seleccionado imágenes para subir',
      position: 'top',
    })
    return -1
  }

  let coleccionCouchdb = '/fpi-imagenes/'
  let rev = null

  try {
    const responseDocumento = await api.get(`${coleccionCouchdb}${idDocumento}`)
    rev = responseDocumento.data._rev
  } catch (error) {
    if (error.response?.status === 404) {
      console.log('El documento no existe aún')
    } else {
      console.error('Error al consultar el documento:', error.response?.data || error.message)
      return -1
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
      rev = response.data.rev
    } else {
      console.log(`Error al subir la imagen: ${file.name}`)
    }
  }

  return 0
}

function eliminarImagenActual() {
  filesImages.value.splice(slide.value - 1, 1)
  slide.value = 1
}

async function guardarAnuncio() {
  try {
    const docRef = await addDoc(collection(db, 'anuncios'), anuncio.value)
    const resultadoSubirImagenes = await subirImagenes(docRef.id)

    if (resultadoSubirImagenes === 0) {
      await updateDoc(doc(db, 'anuncios', docRef.id), {
        ruta_imagenes_telefono: anuncio.value.ruta_imagenes_telefono,
      })

      $q.notify({
        type: 'positive',
        position: 'top',
        message: 'Anuncio guardado con éxito',
      })

      router.push('/')
    } else {
      await deleteDoc(doc(db, 'anuncios', docRef.id))
    }
  } catch (e) {
    $q.notify({
      type: 'negative',
      position: 'top',
      message: `Error al agregar el anuncio: ${e.message}`,
    })
  }
}

function errorDeValidacion() {
  $q.notify({
    type: 'negative',
    position: 'top',
    message: 'Debe llenar todos los campos',
  })
}
</script>

<style scoped>
.botones-inferiores-telefono {
  position: fixed;
  left: 25%;
  bottom: 50px;
  right: 110px;
  display: flex;
  gap: 10px;
  z-index: 9999;
}

.botones-carrusel-telefono {
  position: absolute;
  top: 225px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;

  display: flex;
  flex-direction: row;
  gap: 12px;
}
</style>
