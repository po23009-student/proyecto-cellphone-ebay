<template>
  <div class="row justify-center q-ma-xs">
    <h3>NUEVO ANUNCIO</h3>
  </div>
  <q-form>
    <div class="row q-ma-lg justify-center">
      <div class="col-12 col-md-6" style="border: 2px solid #2a7c13">
        <q-option-group
          v-model="estadoSeleccionado"
          :options="opcionesEstado"
          color="primary"
          class="q-ma-md"
          inline
        />
        <q-input v-model="marcaText" outlined label="Marca" class="q-ma-lg" />
        <q-input v-model="modeloText" outlined label="Modelo" class="q-ma-lg" />
        <q-input v-model="pantallaText" outlined label="Pantalla (Pulgadas)" class="q-ma-lg" />
        <q-select
          outlined
          v-model="modeloSistema"
          :options="opcionesSistema"
          label="Sistema"
          class="q-ma-lg"
        />

        <div class="row items-center">
          <div class="col">
            <q-input
              outlined
              v-model.number="modeloRom"
              step="2"
              type="number"
              class="q-ma-lg"
              label="ROM (GB)"
            />
          </div>
          <div class="col text-grey-8 q-pr-lg">Almacenamiento interno</div>
        </div>

        <q-input
          outlined
          v-model.number="modeloRam"
          step="2"
          type="number"
          class="q-ma-lg"
          label="RAM (GB)"
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
            />
            <q-input v-model="vendedorText" outlined label="Vendedor" class="q-ma-lg" />
            <q-input v-model="telefonoText" outlined label="Teléfono" class="q-ma-lg" />

            <div class="text-weight-bold q-ml-lg">DESCRIPCION</div>
            <q-input v-model="descripcionText" type="textarea" outlined class="q-ma-lg" />

            <div style="border: 3px solid #2a7c13" class="q-ma-lg q-pa-md">
              <div class="text-weight-bold q-mb-sm">PRECIO</div>
              <q-input
                type="number"
                v-model.number="precioText"
                outlined
                prefix="$"
                min="0"
                step="0.50"
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
            <q-btn color="black" text-color="white" icon="save" label="Crear" />
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
              <q-btn round color="black" text-color="white" icon="add" />
              <q-btn round color="black" text-color="white" icon="remove" />
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
              <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
              <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
            </q-carousel>
          </div>
        </div>
      </div>
    </div>
  </q-form>
</template>

<script setup>
import { ref } from 'vue'

const marcaText = ref('')
const tituloText = ref('')
const vendedorText = ref('')
const telefonoText = ref('')
const descripcionText = ref('')
const precioText = ref('')

const modeloSistema = ref(null)
const opcionesSistema = ['Android', 'Windows', 'iOS']
const modeloRam = ref(0)
const modeloRom = ref(0)
const estadoSeleccionado = ref('op1')
const opcionesEstado = [
  {
    label: 'Nuevo',
    value: 'op1',
  },
  {
    label: 'Usado',
    value: 'op2',
  },
]

const slide = ref(1)
</script>
