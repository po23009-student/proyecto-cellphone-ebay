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
          <div>Descripcion del telefono</div>
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
            <span style="margin: 2px">Vendedor: Juan Perez</span>
            <span style="margin: 2px">Telefono: 7777-7777</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row justify-center gt-sm">
    <h5>DESCRIPCIÓN</h5>
  </div>
  <div class="row justify-center">
    <div class="col-12 col-md-3 q-mx-md" style="border: 2px solid green">Parte 1</div>
    <div class="col-12 col-md-3 q-mx-md" style="border: 2px solid green">Parte 2</div>
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
import { ref } from 'vue'

const slide = ref(1)
</script>
