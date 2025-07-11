import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CallbackView from '../views/CallbackView.vue'
import DashboardView from '../views/DashboardView.vue'
import DocsView from '../views/DocsView.vue'
import AboutView from '../views/AboutView.vue'
import { useLogto } from '@logto/vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/callback',
      name: 'callback',
      component: CallbackView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: '/docs',
      name: 'docs',
      component: DocsView,
      children: [
        {
          path: '',
          redirect: '/docs/measurements'
        },
        {
          path: 'infrastructure',
          name: 'docs-infrastructure',
          component: () => import('../views/docs/InfrastructureView.vue')
        },
        {
          path: 'as215011',
          name: 'docs-as215011',
          component: () => import('../views/docs/AS215011View.vue')
        },
        {
          path: 'datasets',
          name: 'docs-datasets',
          component: () => import('../views/docs/DatasetsView.vue')
        },
        {
          path: 'measurements',
          name: 'docs-measurements',
          component: () => import('../views/docs/MeasurementsView.vue')
        },
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useLogto();
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router
