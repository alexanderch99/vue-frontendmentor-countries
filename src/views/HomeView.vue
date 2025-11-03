<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import apiService from "@/services/api-service";
import type { Country } from "@/types/api";
import CountryCard from "@/components/CountryCard.vue";
import SearchMain from "@/components/icons/SearchMain.vue";
import AngleMain from "@/components/icons/AngleMain.vue";

const allCountries = ref<Country[]>([]);
const errorMsg = ref("Ошибка получения данных. API временно недоступно.");
const isError = ref(false);
const isDataFetched = ref(false);

const REGIONS = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"] as const;
type Region = (typeof REGIONS)[number];
const regionForFilter = ref<Region>("All");
const searchForFilter = ref("");
const isRegionsVisible = ref(false);

function changeRegionForFilter(newValue: Region) {
  regionForFilter.value = newValue;
}

async function getAllCountries() {
  try {
    const response = await apiService.getAllCountries();
    allCountries.value = response.data;
    isDataFetched.value = true;
  } catch {
    isError.value = true;
  }
}

const filteredCountries = computed(() => {
  return allCountries.value.filter((el) => {
    const regionOk = regionForFilter.value === "All" || el.region === regionForFilter.value;

    const searchOk =
      searchForFilter.value.length > 1
        ? el.name.common.toLowerCase().includes(searchForFilter.value.toLowerCase())
        : true;

    return regionOk && searchOk;
  });
});

watch(
  () => searchForFilter.value,
  () => {
    isRegionsVisible.value = false;
  }
);

onMounted(async () => {
  getAllCountries();
});
</script>

<template>
  <main class="main">
    <div class="container">
      <div v-if="isError" class="error text text-600">{{ errorMsg }}</div>
      <div v-if="isDataFetched" class="filter">
        <div class="filter__search">
          <SearchMain class="icon search-icon" />
          <input
            type="text"
            class="filter__input text"
            placeholder="Search for a country..."
            v-model="searchForFilter"
          />
        </div>
        <div class="filter__select" @click="isRegionsVisible = !isRegionsVisible">
          <AngleMain
            class="icon angle-icon"
            :style="isRegionsVisible && { transform: 'rotate(180deg) translateY(50%)' }"
          />
          <button class="filter__button text">Filter by Region</button>
          <div v-if="isRegionsVisible" class="filter__regions">
            <div
              class="filter__region text"
              :class="{ active: region == regionForFilter }"
              v-for="region in REGIONS"
              :key="region"
              @click.stop="changeRegionForFilter(region)"
            >
              {{ region }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="isDataFetched" class="country-cards">
        <CountryCard
          class="country-card"
          v-for="country in filteredCountries"
          :key="country.name?.common"
          :flag-url="country.flags?.svg"
          :flag-alt="country.flags?.alt ? country.flags?.alt : 'flag'"
          :capital="country.capital[0] ?? 'unknown'"
          :country-name="country.name?.common"
          :official="country.name?.official"
          :population="country.population"
          :region="country.region"
        />
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.main {
  padding: 100px 0px;
}

.country-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 32px;
  grid-auto-rows: 400px;
}

.filter {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  font-size: var(--font-size-s);
  margin-bottom: 40px;

  @media (max-width: 799.98px) {
    flex-direction: column;
    justify-content: stretch;
    gap: 8px;
  }

  &__search {
    position: relative;
  }

  &__select {
    position: relative;
    border-radius: 4px;

    @media (max-width: 799.98px) {
      margin-left: auto;
    }
  }

  &__button {
    background-color: var(--filter);
    padding: 20px 80px 20px 20px;
    border-radius: 4px;
  }

  &__regions {
    position: absolute;
    z-index: 2;
    background-color: var(--filter);
    left: 0;
    right: 0;
    top: 68px;
    padding: 10px 20px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    outline: 2px solid var(--bg);
  }

  &__region {
    padding: 8px 0px;
    cursor: pointer;

    &.active {
      color: green;
    }
  }

  &__input {
    width: 500px;
    height: 100%;
    padding: 20px 20px 20px 80px;
    background-color: var(--filter);
    border-radius: 4px;

    @media (max-width: 799.98px) {
      width: 100%;
    }

    &::placeholder {
      color: var(--text);
    }
  }
}

.icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.search-icon {
  left: 32px;
}

.angle-icon {
  right: 20px;
  cursor: pointer;
}
</style>
