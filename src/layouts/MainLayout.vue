<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          class="lt-sm"
          @click="toggleLeftDrawer"
        />

        <q-icon name="campaign" size="lg" class="gt-xs" />
        <q-toolbar-title class="gt-xs"> Tienda CellPhone </q-toolbar-title>

        <q-input
          v-model="textoBusqueda"
          filled
          bg-color="white"
          v-if="route.path === '/'"
          dense
          label="Buscar"
          class="q-ma-md"
          style="width: 250px"
        >
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn icon="home" label="Inicio" to="/" class="gt-xs" flat />
        <q-btn icon="sym_o_add_ad" label="Nuevo Anuncio" to="/nuevoanuncio" class="gt-xs" flat />
        <q-btn icon="dataset" label="Estadisticas" to="/estadisticas" class="gt-xs" flat />

        <q-btn round icon="add" color="positive" @click="enCarrito++" />
        <q-avatar
          square
          size="50px"
          font-size="40px"
          color="primary"
          text-color="white"
          icon="shopping_cart"
        >
          <q-badge color="orange" style="top: 0.7px" rounded floating>{{ enCarrito }}</q-badge>
        </q-avatar>

        <q-btn
          round
          class="q-ml-sm"
          color="accent"
          :icon="Dark.isActive ? 'brightness_7' : 'dark_mode'"
          @click="Dark.toggle()"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header>
          <q-icon name="campaign" size="lg" />
          <q-toolbar-title> Tienda CellPhone </q-toolbar-title>
        </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.label" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view
        @articulo-comprado="actualizarCarrito()"
        :productosEnCarrito="enCarrito"
        :textoBusqueda="textoBusqueda"
      />
    </q-page-container>

    <q-footer style="height: 40px">
      <q-toolbar>
        <p style="text-align: center; width: 100%; font-family: sans-serif">
          <strong>Edgardo Alexander Palencia Ortiz (PO23009)</strong>
        </p>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { Dark, useQuasar } from 'quasar'
import { useRoute } from 'vue-router'
import EssentialLink from '@/components/EssentialLink.vue'

const $q = useQuasar()
const route = useRoute()

const linksList = [
  {
    label: 'Inicio',
    caption: '',
    icon: 'home',
    link: '/',
  },
  {
    label: 'Nuevo Anuncio',
    caption: '',
    icon: 'sym_o_add_ad',
    link: '/nuevoanuncio',
  },
  {
    label: 'Estadísticas',
    caption: '',
    icon: 'dataset',
    link: '/estadisticas',
  },
]

const leftDrawerOpen = ref(false)
const enCarrito = ref(0)

const textoBusqueda = ref('')

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function actualizarCarrito() {
  enCarrito.value++

  $q.notify({
    color: 'positive',
    position: 'top',
    message: 'Artículo agregado al carrito',
  })
}
</script>
