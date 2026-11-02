const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('@/pages/IndexPage.vue') },
      { path: 'second', component: () => import('@/pages/SecondPage.vue') },
      { path: 'ventacelulares', component: () => import('@/pages/VentaCelularesPage.vue') },
      { path: 'nuevoanuncio', component: () => import('@/pages/NuevoAnuncioPage.vue') },
      { path: 'celulardetalle/:cid', component: () => import('@/pages/TelefonoDetallePage.vue') },
      { path: 'estadisticas', component: () => import('@/pages/EstadisticasPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue'),
  },
]

export default routes
