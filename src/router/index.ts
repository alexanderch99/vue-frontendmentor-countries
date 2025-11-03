import { createRouter, createWebHistory } from "vue-router";
import CountryView from "@/views/CountryView.vue";
import HomeView from "@/views/HomeView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/countries/:country", name: "country", component: CountryView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
