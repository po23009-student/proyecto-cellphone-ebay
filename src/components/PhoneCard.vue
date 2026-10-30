<template>
  <q-card class="q-ma-md" clickable @click="$router.push(`/celulardetalle/${anuncio_id}`)">
    <q-img src="" alt="Samsung J6" style="height: 150px" />

    <q-card-section>
      <div class="text-h6 text-primary q-mt-sm">{{ precio_telefono }}</div>
      <div class="text-h4">
        {{ marca_telefono }} {{ modelo_telefono }}, Pantalla de {{ pantalla_pulgadas_telefono }}
      </div>
      <div class="text-h4">{{ rom_gb_telefono }}GB {{ ram_gb_telefono }}GB Ram</div>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  anuncio_id: String,
  precio_telefono: Number,
  marca_telefono: String,
  modelo_telefono: String,
  pantalla_pulgadas_telefono: Number,
  rom_gb_telefono: Number,
  ram_gb_telefono: Number,
})
</script>
