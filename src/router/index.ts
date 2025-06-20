import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CallbackView from '../views/CallbackView.vue'
import DashboardView from '../views/DashboardView.vue'
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
