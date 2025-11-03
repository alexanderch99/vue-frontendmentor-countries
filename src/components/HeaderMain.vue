<script setup lang="ts">
import type { Theme } from "@/types/theme";
import SunMain from "./icons/SunMain.vue";
import MoonMain from "./icons/MoonMain.vue";

const { currentTheme } = defineProps<{
  currentTheme: Theme;
}>();
</script>

<template>
  <header class="header">
    <div class="container header__container">
      <div class="header__items">
        <div class="header__logo text text-600">Where in the world?</div>
        <div class="theme text text">
          <div
            v-if="currentTheme == 'dark'"
            class="theme__set text"
            @click="$emit('setLightTheme')"
          >
            <SunMain class="icon" /> <span>Light mode</span>
          </div>
          <div
            v-if="currentTheme == 'light'"
            class="theme__set text"
            @click="$emit('setDarkTheme')"
          >
            <MoonMain class="icon" /><span>Dark mode</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  background-color: var(--header);
  padding: 40px 0px;

  &__items {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    cursor: default;
  }
}

.theme {
  user-select: none;

  &__set {
    cursor: pointer;

    & > span {
      position: relative;
      top: 2px;
      margin-left: 8px;
    }
  }
}
</style>
