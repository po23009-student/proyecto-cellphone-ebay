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
        <q-btn icon="sym_o_add_ad" label="Nuevo Anuncio" to="/nuevoanuncio" class="gt-xs" />
        <q-btn icon="dataset" label="Estadisticas" to="" class="gt-xs" />

        <q-btn round icon="add" color="positive" />
        <q-avatar
          square
          size="50px"
          font-size="40px"
          color="primary"
          text-color="white"
          icon="shopping_cart"
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
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from '@/components/EssentialLink.vue'

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
    link: '/',
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
