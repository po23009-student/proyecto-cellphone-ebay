<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-md-2 gt-sm">
        <div v-if="cargando == false">
          <MenuFiltro
            @toogle-nuevo="eventoFiltrarPorNuevo"
            @marca-seleccionada="eventoFiltrarPorMarca"
            @sistema-seleccionado="eventoFiltrarPorSistema"
            @pantalla-seleccionada="eventoFiltrarPorPulgadasPantalla"
            :lista-marcas="listaMarcas"
            :lista-pantallas="listaPantallas"
            :lista-sistemas="listaSistemas"
            :cantidades-marcas="cantidadesMarcas"
            :cantidades-pantallas="cantidadesPantallas"
            :cantidades-sistemas="cantidadesSistemas"
            :lista-seleccionados-marca-inicial="listaOpcionesSeleccionadasMarca"
            :lista-seleccionados-pantalla-inicial="listaOpcionesSeleccionadasPantalla"
            :lista-seleccionados-sistema-inicial="listaOpcionesSeleccionadasSistema"
            :toogle-nuevo-inicial="filtrarPorNuevo"
          />
        </div>
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
                min="0.0"
                step="0.01"
                label="Desde"
                outlined
                style="width: 110px"
              />

              <q-input
                v-model.number="precioFinal"
                type="number"
                prefix="$"
                min="0.0"
                step="0.01"
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
                :icon="precioAscendente ? 'arrow_downward' : 'arrow_upward'"
                :class="{ 'text-green-14': Dark.isActive }"
                label="Precio"
                @click="ordenarPorPrecio"
              />

              <q-btn
                flat
                color="primary"
                :class="{ 'text-green-14': Dark.isActive }"
                :icon="fechaAscendente ? 'arrow_downward' : 'arrow_upward'"
                label="Fecha"
                @click="ordenarPorFecha"
              />

              <div v-if="cargando == false">
                <q-btn
                  flat
                  round
                  color="secondary"
                  :class="{ 'text-green-14': Dark.isActive }"
                  icon="filter_alt"
                  class="lt-md"
                >
                  <q-menu>
                    <div style="width: 250px">
                      <MenuFiltro
                        @toogle-nuevo="eventoFiltrarPorNuevo"
                        @marca-seleccionada="eventoFiltrarPorMarca"
                        @sistema-seleccionado="eventoFiltrarPorSistema"
                        @pantalla-seleccionada="eventoFiltrarPorPulgadasPantalla"
                        :lista-marcas="listaMarcas"
                        :lista-pantallas="listaPantallas"
                        :lista-sistemas="listaSistemas"
                        :cantidades-marcas="cantidadesMarcas"
                        :cantidades-pantallas="cantidadesPantallas"
                        :cantidades-sistemas="cantidadesSistemas"
                        :lista-seleccionados-marca-inicial="listaOpcionesSeleccionadasMarca"
                        :lista-seleccionados-pantalla-inicial="listaOpcionesSeleccionadasPantalla"
                        :lista-seleccionados-sistema-inicial="listaOpcionesSeleccionadasSistema"
                        :toogle-nuevo-inicial="filtrarPorNuevo"
                      />
                    </div>
                  </q-menu>
                </q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <div class="row q-col-gutter-md">
          <q-circular-progress
            indeterminate
            size="100px"
            style="height: 175px"
            :thickness="0.7"
            color="secondary"
            center-color="dark"
            class="q-ma-md"
            v-if="cargando"
          />

          <h3 v-if="cargando == false && anunciosFiltrados.length == 0">No hay artículos</h3>

          <PhoneCard
            v-for="(anuncio, key) in anunciosPaginados"
            :key="key"
            :idAnuncio="anuncio.id"
            :precioTelefono="anuncio.precio_telefono"
            :marcaTelefono="anuncio.marca_telefono"
            :modeloTelefono="anuncio.modelo_telefono"
            :pantallaPulgadasTelefono="anuncio.pantalla_pulgadas_telefono"
            :romGbTelefono="anuncio.rom_gb_telefono"
            :ramGbTelefono="anuncio.ram_gb_telefono"
            :colorTelefono="anuncio.color_telefono"
            class="col-6 col-xs-6 col-sm-5 col-md-2"
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
            options-selected-class="text-green-14"
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
import { ref, onMounted, computed, watch, defineProps } from 'vue'
import { useQuasar, Dark } from 'quasar'
import { collection, query, getDocs } from 'firebase/firestore'
import { db } from '@/boot/firebase'

const $q = useQuasar()

const props = defineProps({
  textoBusqueda: String,
})

const cargando = ref(true)
const filtrarPorNuevo = ref(false)
const precioAscendente = ref(false)
const fechaAscendente = ref(false)
const precioInicial = ref(0.0)
const precioFinal = ref(0.0)
const articulosPorPagina = ref(5)
const paginaActual = ref(1)
const ultimaPagina = ref(5)

const listaMarcas = ref([])
const listaPantallas = ref([])
const listaSistemas = ref([])
const listaOpcionesSeleccionadasMarca = ref([])
const listaOpcionesSeleccionadasPantalla = ref([])
const listaOpcionesSeleccionadasSistema = ref([])
const listaAnuncios = ref([])
const anunciosPaginados = ref([])
const anunciosDocs = ref([])
const cantidadesMarcas = ref([])
const cantidadesPantallas = ref([])
const cantidadesSistemas = ref([])

watch(paginaActual, () => {
  paginarAnuncios()
  determinarRangoPrecios()
})

watch(articulosPorPagina, () => {
  obtenerTodosDocumentos()
})

const anunciosFiltrados = computed(() => {
  let listaAnunciosFiltrados = listaAnuncios.value
    .filter((anuncio) => {
      let textoBusquedaRecibido = props.textoBusqueda || 'vacio'

      if (textoBusquedaRecibido === 'vacio') {
        return true
      }

      return (
        anuncio.titulo_anuncio.toLowerCase().includes(textoBusquedaRecibido.toLowerCase()) ||
        anuncio.descripcion_anuncio.toLowerCase().includes(textoBusquedaRecibido.toLowerCase()) ||
        anuncio.color_telefono.toLowerCase().includes(textoBusquedaRecibido.toLowerCase()) ||
        anuncio.marca_telefono.toLowerCase().includes(textoBusquedaRecibido.toLowerCase()) ||
        anuncio.modelo_telefono.toLowerCase().includes(textoBusquedaRecibido.toLowerCase())
      )
    })
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
      listaOpcionesSeleccionadasPantalla.value.includes(
        anuncio.pantalla_pulgadas_telefono.toString(),
      ),
    )
  }

  if (listaOpcionesSeleccionadasSistema.value.length > 0) {
    listaAnunciosFiltrados = listaAnunciosFiltrados.filter((anuncio) =>
      listaOpcionesSeleccionadasSistema.value.includes(anuncio.sistema_operativo_telefono),
    )
  }

  return listaAnunciosFiltrados
})

watch(anunciosFiltrados, () => {
  paginarAnuncios()
})

onMounted(async () => {
  await obtenerTodosDocumentos()
  cargarPantallasParaMenu()
  cargarMarcasParaMenu()
  cargarSistemasParaMenu()
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

function paginarAnuncios() {
  anunciosPaginados.value = anunciosFiltrados.value.slice(
    articulosPorPagina.value * paginaActual.value - articulosPorPagina.value,
    articulosPorPagina.value * paginaActual.value,
  )

  ultimaPagina.value = anunciosFiltrados.value.length / articulosPorPagina.value

  if (anunciosFiltrados.value.length % articulosPorPagina.value > 0) {
    ultimaPagina.value++
  }
}

async function obtenerTodosDocumentos() {
  try {
    cargando.value = true
    listaAnuncios.value = []
    anunciosDocs.value = []

    anunciosDocs.value = await getDocs(query(collection(db, 'anuncios')))

    anunciosDocs.value.forEach((doc) => {
      listaAnuncios.value.push({ id: doc.id, ...doc.data() })
    })

    paginarAnuncios()
    determinarRangoPrecios()

    cargando.value = false
  } catch (e) {
    let mensajeTraducido = ''

    if (e.message === 'Reduce of empty array with no initial value') {
      mensajeTraducido = 'Lista Vacía'
    }

    $q.notify({
      type: 'negative',
      message: `Error al obtener los anuncios: ${mensajeTraducido || e.message}`,
    })
    cargando.value = false
  }
}

function cargarMarcasParaMenu() {
  anunciosFiltrados.value.forEach((anuncio) => {
    if (!listaMarcas.value.includes(anuncio.marca_telefono)) {
      listaMarcas.value.push(anuncio.marca_telefono)
      cantidadesMarcas.value.push(0)
    }
  })

  anunciosFiltrados.value.forEach((anuncio) => {
    if (listaMarcas.value.includes(anuncio.marca_telefono)) {
      let indice = listaMarcas.value.indexOf(anuncio.marca_telefono)

      cantidadesMarcas.value[indice]++
    }
  })
}

function cargarPantallasParaMenu() {
  anunciosFiltrados.value.forEach((anuncio) => {
    if (!listaPantallas.value.includes(anuncio.pantalla_pulgadas_telefono)) {
      listaPantallas.value.push(anuncio.pantalla_pulgadas_telefono)
      cantidadesPantallas.value.push(0)
    }
  })

  anunciosFiltrados.value.forEach((anuncio) => {
    if (listaPantallas.value.includes(anuncio.pantalla_pulgadas_telefono)) {
      let indice = listaPantallas.value.indexOf(anuncio.pantalla_pulgadas_telefono)
      cantidadesPantallas.value[indice]++
    }
  })
}

function cargarSistemasParaMenu() {
  anunciosFiltrados.value.forEach((anuncio) => {
    if (!listaSistemas.value.includes(anuncio.sistema_operativo_telefono)) {
      listaSistemas.value.push(anuncio.sistema_operativo_telefono)
      cantidadesSistemas.value.push(0)
    }
  })

  anunciosFiltrados.value.forEach((anuncio) => {
    if (listaSistemas.value.includes(anuncio.sistema_operativo_telefono)) {
      let indice = listaSistemas.value.indexOf(anuncio.sistema_operativo_telefono)

      cantidadesSistemas.value[indice]++
    }
  })
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
