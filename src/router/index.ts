import { createRouter, createWebHistory } from "vue-router";
import CountryView from "@/views/CountryView.vue";
import HomeView from "@/views/HomeView.vue";
import { projectBase } from "@/utils/consts";

const routes = [
  { path: projectBase, name: "home", component: HomeView },
  { path: `${projectBase}/countries/:country`, name: "country", component: CountryView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
