import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CallbackView from '../views/CallbackView.vue'
import ProbingView from '../views/ProbingView.vue'
import PeeringView from '../views/PeeringView.vue'
import AboutView from '../views/AboutView.vue'
import { useAuth0 } from '@auth0/auth0-vue';

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
      path: '/probing',
      name: 'probing',
      component: ProbingView,
      meta: { requiresAuth: true },
    },
    {
      path: '/peering',
      name: 'peering',
      component: PeeringView,
      meta: { requiresAuth: true },
    },
    {
      path: '/docs/measurements',
      name: 'docs-measurements',
      component: () => import('../views/docs/MeasurementsView.vue')
    },
    {
      path: '/docs/datasets',
      name: 'docs-datasets',
      component: () => import('../views/docs/DatasetsView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const { isAuthenticated, isLoading } = useAuth0();

  // Wait for Auth0 to finish loading before checking authentication
  while (isLoading.value) {
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router
