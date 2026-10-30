<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-md-2 gt-sm">
        <MenuFiltro />
      </div>

      <div class="col-12 col-md-10">
        <q-card flat bordered class="q-mb-lg">
          <q-card-section class="row items-center justify-between q-gutter-md">
            <div class="row items-center q-gutter-sm">
              <span class="text-subtitle2"> Precio: </span>

              <q-input
                v-model.number="precioInicial"
                type="number"
                prefix="$"
                min="0"
                step="0.50"
                label="Desde"
                outlined
                style="width: 110px"
              />

              <q-input
                v-model.number="precioFinal"
                type="number"
                prefix="$"
                min="0"
                step="0.50"
                label="Hasta"
                outlined
                style="width: 110px"
              />
            </div>

            <div class="row items-center q-gutter-sm">
              <span class="text-subtitle2"> Ordenar por: </span>

              <q-btn flat color="primary" icon="arrow_upward" label="Precio" />

              <q-btn flat color="primary" icon="arrow_upward" label="Fecha" />

              <q-btn flat round color="secondary" icon="filter_alt" class="lt-md">
                <q-menu>
                  <div style="width: 250px">
                    <MenuFiltro />
                  </div>
                </q-menu>
              </q-btn>
            </div>
          </q-card-section>
        </q-card>

        <div class="row q-col-gutter-lg">
          <PhoneCard class="col-6 col-sm-5 col-md-2" />
          <PhoneCard class="col-6 col-sm-5 col-md-2" />
          <PhoneCard class="col-6 col-sm-5 col-md-2" />
          <PhoneCard class="col-6 col-sm-5 col-md-2" />
          <PhoneCard class="col-6 col-sm-5 col-md-2" />
        </div>

        <div class="row justify-center items-center q-mt-xl q-gutter-lg">
          <q-pagination
            v-model="paginaActual"
            :max="5"
            direction-links
            color="accent"
            active-color="secondary"
          />

          <q-select
            v-model="articulosPorPagina"
            :options="[5, 10, 20, 50]"
            label="Artículos por página"
            dense
            outlined
            style="width: 180px"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import PhoneCard from '@/components/PhoneCard.vue'
import MenuFiltro from '@/components/MenuFiltro.vue'
import { ref } from 'vue'

const precioInicial = ref(0.0)
const precioFinal = ref(0.0)
const articulosPorPagina = ref(15)
const paginaActual = ref(1)
</script>
