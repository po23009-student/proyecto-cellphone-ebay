<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-md-2 gt-sm">
        <MenuFiltro
          @toogle-nuevo="eventoFiltrarPorNuevo"
          @marca-seleccionada="eventoFiltrarPorMarca"
          @sistema-seleccionado="eventoFiltrarPorSistema"
          @pantalla-seleccionada="eventoFiltrarPorPulgadasPantalla"
        />
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

              <q-btn
                flat
                color="primary"
                :icon="precioAscendente ? 'arrow_upward' : 'arrow_downward'"
                label="Precio"
                @click="ordenarPorPrecio"
              />

              <q-btn
                flat
                color="primary"
                :icon="fechaAscendente ? 'arrow_upward' : 'arrow_downward'"
                label="Fecha"
                @click="ordenarPorFecha"
              />

              <q-btn flat round color="secondary" icon="filter_alt" class="lt-md">
                <q-menu>
                  <div style="width: 250px">
                    <MenuFiltro
                      @toogle-nuevo="eventoFiltrarPorNuevo"
                      @marca-seleccionada="eventoFiltrarPorMarca"
                      @sistema-seleccionado="eventoFiltrarPorSistema"
                      @pantalla-seleccionada="eventoFiltrarPorPulgadasPantalla"
                    />
                  </div>
                </q-menu>
              </q-btn>
            </div>
          </q-card-section>
        </q-card>

        <div class="row q-col-gutter-lg">
          <q-circular-progress
            indeterminate
            size="100px"
            :thickness="0.7"
            color="secondary"
            center-color="dark"
            class="q-ma-md"
            v-if="cargando"
          />

          <h3 v-if="cargando == false && anunciosFiltrados.length == 0">No hay artículos</h3>

          <PhoneCard
            v-for="(anuncio, key) in anunciosFiltrados"
            :key="key"
            :idAnuncio="anuncio.id"
            :precioTelefono="anuncio.precio_telefono"
            :marcaTelefono="anuncio.marca_telefono"
            :modeloTelefono="anuncio.modelo_telefono"
            :pantallaPulgadasTelefono="anuncio.pantalla_pulgadas_telefono"
            :romGbTelefono="anuncio.rom_gb_telefono"
            :ramGbTelefono="anuncio.ram_gb_telefono"
            :colorTelefono="anuncio.color_telefono"
            class="col-6 col-sm-5 col-md-2"
          />
        </div>

        <div class="row justify-center items-center q-mt-xl q-gutter-lg">
          <q-pagination
            v-model="paginaActual"
            :max="ultimaPagina"
            max-pages="7"
            direction-links
            color="accent"
            active-color="secondary"
          />

          <q-select
            v-model="articulosPorPagina"
            :options="[5, 10, 15, 20, 25, 50]"
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
import { ref, onMounted, computed, watch } from 'vue'
import { useQuasar } from 'quasar'
import { collection, query, getDocs, limit, startAfter } from 'firebase/firestore'
import { db } from '@/boot/firebase'

const $q = useQuasar()

const cargando = ref(true)
const filtrarPorNuevo = ref(false)
const precioAscendente = ref(false)
const fechaAscendente = ref(false)
const precioInicial = ref(0.0)
const precioFinal = ref(0.0)
const articulosPorPagina = ref(5)
const paginaActual = ref(1)
const ultimaPagina = ref(5)

const listaOpcionesSeleccionadasMarca = ref([])
const listaOpcionesSeleccionadasPantalla = ref([])
const listaOpcionesSeleccionadasSistema = ref([])
const anunciosPaginados = ref([])
const listaAnuncios = ref([])
const anunciosDocs = ref([])
const primerDocumentoMostrado = ref(null)
const ultimoDocumentoMostrado = ref(null)

watch(paginaActual, async (newValue) => {
  listaAnuncios.value = anunciosPaginados.value.at(newValue - 1)
  determinarRangoPrecios()
})

watch(articulosPorPagina, () => {
  obtenerTodosDocumentos()
})

const anunciosFiltrados = computed(() => {
  let listaAnunciosFiltrados = listaAnuncios.value
    .filter(
      (anuncio) =>
        anuncio.precio_telefono >= precioInicial.value &&
        anuncio.precio_telefono <= precioFinal.value,
    )
    .sort((anuncioA, anuncioB) => {
      const fechaA = anuncioA.fecha_creacion?.toDate().getTime()
      const fechaB = anuncioB.fecha_creacion?.toDate().getTime()

      return fechaAscendente.value ? fechaA - fechaB : fechaB - fechaA
    })
    .sort((anuncioA, anuncioB) =>
      precioAscendente.value
        ? anuncioB.precio_telefono - anuncioA.precio_telefono
        : anuncioA.precio_telefono - anuncioB.precio_telefono,
    )

  if (filtrarPorNuevo.value) {
    listaAnunciosFiltrados = listaAnunciosFiltrados.filter(
      (anuncio) => anuncio.estado_telefono === 'Nuevo',
    )
  }

  if (listaOpcionesSeleccionadasMarca.value.length > 0) {
    listaAnunciosFiltrados = listaAnunciosFiltrados.filter((anuncio) =>
      listaOpcionesSeleccionadasMarca.value.includes(anuncio.marca_telefono),
    )
  }

  if (listaOpcionesSeleccionadasPantalla.value.length > 0) {
    listaAnunciosFiltrados = listaAnunciosFiltrados.filter((anuncio) =>
      listaOpcionesSeleccionadasPantalla.value.includes(anuncio.pantalla_pulgadas_telefono),
    )
  }

  if (listaOpcionesSeleccionadasSistema.value.length > 0) {
    listaAnunciosFiltrados = listaAnunciosFiltrados.filter((anuncio) =>
      listaOpcionesSeleccionadasSistema.value.includes(anuncio.sistema_operativo_telefono),
    )
  }

  return listaAnunciosFiltrados
})

onMounted(() => {
  obtenerTodosDocumentos()
})

function determinarRangoPrecios() {
  let listaPreciosAnuncios = listaAnuncios.value.map((anuncio) => anuncio.precio_telefono)

  precioInicial.value = listaPreciosAnuncios.reduce((precioAnterior, precioSiguiente) =>
    Math.min(precioAnterior, precioSiguiente),
  )

  precioFinal.value = listaPreciosAnuncios.reduce((precioAnterior, precioSiguiente) =>
    Math.max(precioAnterior, precioSiguiente),
  )
}

function ordenarPorPrecio() {
  if (precioAscendente.value) {
    precioAscendente.value = false
  } else {
    precioAscendente.value = true
  }
}

function ordenarPorFecha() {
  if (fechaAscendente.value) {
    fechaAscendente.value = false
  } else {
    fechaAscendente.value = true
  }
}

async function obtenerTodosDocumentos() {
  try {
    cargando.value = true
    anunciosPaginados.value = []
    primerDocumentoMostrado.value = null
    ultimoDocumentoMostrado.value = null

    do {
      listaAnuncios.value = []
      anunciosDocs.value = []

      if (!primerDocumentoMostrado.value && !ultimoDocumentoMostrado.value) {
        anunciosDocs.value = await getDocs(
          query(collection(db, 'anuncios'), limit(articulosPorPagina.value)),
        )
      } else {
        anunciosDocs.value = await getDocs(
          query(
            collection(db, 'anuncios'),
            startAfter(ultimoDocumentoMostrado.value),
            limit(articulosPorPagina.value),
          ),
        )
      }

      primerDocumentoMostrado.value = anunciosDocs.value.docs.at(0)
      ultimoDocumentoMostrado.value = anunciosDocs.value.docs.at(-1)

      anunciosDocs.value.forEach((doc) => {
        listaAnuncios.value.push({ id: doc.id, ...doc.data() })
      })

      anunciosPaginados.value.push(listaAnuncios.value)
    } while (listaAnuncios.value.length == articulosPorPagina.value)

    ultimaPagina.value = anunciosPaginados.value.length
    listaAnuncios.value = anunciosPaginados.value.at(0)

    determinarRangoPrecios()

    cargando.value = false
  } catch (e) {
    $q.notify({
      type: 'negative',
      message: `Error al obtener los anuncios: ${e.message}`,
    })
  }
}

function eventoFiltrarPorNuevo(event) {
  filtrarPorNuevo.value = event.valorNuevo
}

function eventoFiltrarPorMarca(event) {
  listaOpcionesSeleccionadasMarca.value = event.marcasSeleccionadas
}

function eventoFiltrarPorPulgadasPantalla(event) {
  listaOpcionesSeleccionadasPantalla.value = event.pantallasSeleccionadas
}

function eventoFiltrarPorSistema(event) {
  listaOpcionesSeleccionadasSistema.value = event.sistemasSeleccionados
}
</script>
