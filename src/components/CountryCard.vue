<script setup lang="ts">
import { projectBase } from "@/utils/consts";
import countryToLink from "@/utils/country-to-link";

const { flagUrl, countryName, official, population, region, capital } = defineProps<{
  flagUrl: string;
  flagAlt: string;
  countryName: string;
  official: string;
  population: number;
  region: string;
  capital: string;
}>();
</script>

<template>
  <div class="country-card">
    <img :src="flagUrl" :alt="flagAlt" class="country-card__img" />
    <div class="country-card__info text">
      <h2 class="country-card__name text-800">
        {{ countryName }}
      </h2>
      <p class="country-card__population country-card__sub">
        <span>Population: </span><span>{{ population }}</span>
      </p>
      <p class="country-card__region country-card__sub">
        <span>Region: </span><span>{{ region }}</span>
      </p>
      <p class="country-card__capital country-card__sub">
        <span>Capital: </span><span>{{ capital }}</span>
      </p>
    </div>
    <RouterLink
      :to="`${projectBase}/countries/${countryToLink(official)}`"
      class="country-card__more-info text"
      >More info</RouterLink
    >
  </div>
</template>

<style scoped lang="scss">
.country-card {
  position: relative;
  background-color: var(--card);
  border-radius: 8px;
  overflow: hidden;
  min-height: 373px;

  &__img {
    width: 100%;
    aspect-ratio: 1.8;
    object-fit: cover;
  }

  &__info {
    padding: 30px 20px 50px 20px;
  }

  &__name {
    margin-bottom: 24px;
    font-size: var(--font-size-l);
    line-height: var(--font-size-l);
  }

  &__sub {
    margin-bottom: 8px;
    font-size: var(--font-size-s);
    line-height: var(--font-size-s);
  }

  &__more-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 4px;
    background-color: var(--button);
    color: var(--text);
    text-align: center;
    font-size: 16px;
    font-family: monospace;
    cursor: pointer;
    border-top: 2px solid orange;
  }
}
</style>
