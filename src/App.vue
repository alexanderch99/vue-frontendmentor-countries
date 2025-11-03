<script setup lang="ts">
import { onMounted } from "vue";
import { useTheme } from "@/composables/use-theme";
import HeaderMain from "./components/HeaderMain.vue";

const themeController = useTheme();

function setLightTheme() {
  themeController.applyTheme("light");
}

function setDarkTheme() {
  themeController.applyTheme("dark");
}

onMounted(async () => {
  themeController.applyTheme(themeController.theme.value);
});
</script>

<template>
  <HeaderMain
    @setLightTheme="setLightTheme"
    @setDarkTheme="setDarkTheme"
    :currentTheme="themeController.theme.value"
  />
  <RouterView />
  <footer class="footer"></footer>
</template>

<style scoped lang="scss">
.footer {
  background-color: transparent;
  padding: 40px 0px;
}
</style>
