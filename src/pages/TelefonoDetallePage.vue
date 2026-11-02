<template>
  <div class="row">
    <div class="col-12 col-md-6">
      <div>
        <q-carousel animated v-model="slide" arrows navigation infinite>
          <q-carousel-slide :name="1" img-src="../assets/samsung-1.jpeg" />
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
          <q-btn style="background-color: #124d1c; color: white" label="Comprar" class="gt-sm" />
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
    <q-btn style="background-color: #124d1c; color: white" label="Comprar" class="lt-md" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/boot/firebase'

const slide = ref(1)
const ruta = useRoute()
const datosDocumento = ref({})

onMounted(() => {
  obtenerDocumento(ruta.params.cid)
})

async function obtenerDocumento(idDocumento) {
  const docRef = doc(db, 'anuncios', idDocumento)
  const docSnap = await getDoc(docRef)

  datosDocumento.value = docSnap.data()
}
</script>
