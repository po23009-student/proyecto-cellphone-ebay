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
        <q-btn icon="home" label="Inicio" to="/" class="gt-xs" />
        <q-btn icon="shopping_bag" label="Ventas" to="/ventacelulares" class="gt-xs" />
        <q-btn icon="sym_o_add_ad" label="Nuevo Anuncio" to="/nuevoanuncio" class="gt-xs" />
        <q-btn icon="dataset" label="Estadisticas" to="/estadisticas" class="gt-xs" />

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
      <router-view @articulo-comprado="actualizarCarrito()" />
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
import { useQuasar } from 'quasar'
import EssentialLink from '@/components/EssentialLink.vue'

const $q = useQuasar()
const linksList = [
  {
    label: 'Inicio',
    caption: '',
    icon: 'home',
    link: '/',
  },
  {
    label: 'Ventas',
    caption: '',
    icon: 'shopping_bag',
    link: 'ventacelulares',
  },
  {
    label: 'Nuevo Anuncio',
    caption: '',
    icon: 'sym_o_add_ad',
    link: 'nuevoanuncio',
  },
  {
    label: 'Estadísticas',
    caption: '',
    icon: 'dataset',
    link: 'estadisticas',
  },
]

const leftDrawerOpen = ref(false)
const enCarrito = ref(0)

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
