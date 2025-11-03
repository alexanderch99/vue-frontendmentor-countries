<script setup lang="ts">
import ButtonMain from "@/components/ButtonMain.vue";
import ArrowLeft from "@/components/icons/ArrowLeft.vue";
import apiService from "@/services/api-service";
import type { CountryInfo, Currency, Currencies, Languages } from "@/types/api";
import { projectBase } from "@/utils/consts";
import countryToLink from "@/utils/country-to-link";
import { onMounted, ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

const route = useRoute();

const countryData = ref<Partial<CountryInfo>>({});
const borderCountries = ref<string[]>([]);

const errorMsg = ref("Произошла ошибка при поиске страны");
const isError = ref(false);

const langForNativeName = ref("");

const unknownCurrency = {
  name: "",
  symbol: "",
};
const unknownLanguage = "";

async function getBorderCountriesNames() {
  try {
    if (countryData.value?.borders) {
      const response = await apiService.getBorderCountriesNames(
        countryData.value.borders.join(",")
      );
      const responseData: CountryInfo[] = response.data;
      borderCountries.value = responseData.map((el) => el.name.common);
    }
  } catch (error) {
    console.error(error);
    errorMsg.value = "Произошла ошибка при поиске ближайших стран";
    isError.value = true;
    throw new Error(String(error));
  }
}

async function getCountryInfo(to: string) {
  let official = to || route.params?.country || "";
  if (Array.isArray(official)) {
    official = official.join("_");
  }
  const officialForApi = official.replace(/\_/g, " ");

  try {
    const response = await apiService.getCountryInfo(officialForApi);
    if (response.data) {
      countryData.value = response.data[0] || {};
    } else {
      isError.value = true;
      throw new Error(errorMsg.value);
    }
    const langs = Object.keys(countryData.value.languages || []);
    langForNativeName.value = langs[0] || "";

    if (countryData.value.borders) {
      getBorderCountriesNames();
    }
  } catch (error) {
    console.error(error);
    isError.value = true;
    throw new Error(String(error));
  }
}

function getCurrencies(obj: Currencies) {
  const values: Currency[] = Object.values(obj || {});
  return values.map((el) => el.name).join(", ");
}

function getLanguages(obj: Languages) {
  return Object.values(obj || {}).join(", ");
}

onMounted(async () => {
  getCountryInfo("");
});

onBeforeRouteUpdate(async (to) => {
  countryData.value = {};
  borderCountries.value = [];
  getCountryInfo(String(to.params.country));
});
</script>

<template>
  <div class="country">
    <div class="container country__container">
      <div v-if="isError" class="error text text-600">{{ errorMsg }}</div>
      <RouterLink :to="`${projectBase}/`">
        <ButtonMain class="country__back"
          ><ArrowLeft class="icon icon-arrow" />Back</ButtonMain
        ></RouterLink
      >
      <div class="country__data">
        <div class="country__flag">
          <img :src="countryData.flags?.svg" :alt="countryData.flags?.alt" />
        </div>
        <div class="country__info text">
          <h1 class="country__name country__heading text-800">{{ countryData?.name?.common }}</h1>
          <div class="country__info-items">
            <p class="country__info-item">
              <span class="country__span-static">Native Name:&nbsp;</span
              ><span>{{ countryData?.name?.nativeName?.[langForNativeName]?.official }}</span>
            </p>
            <!-- next item -->
            <p class="country__info-item">
              <span class="country__span-static">Population:&nbsp;</span
              ><span>{{ countryData?.population }}</span>
            </p>
            <!-- next item -->
            <p class="country__info-item">
              <span class="country__span-static">Region:&nbsp;</span
              ><span>{{ countryData?.region }}</span>
            </p>
            <!-- next item -->
            <p class="country__info-item">
              <span class="country__span-static">Sub region:&nbsp;</span
              ><span>{{ countryData?.subregion }}</span>
            </p>
            <!-- next item -->
            <p class="country__info-item">
              <span class="country__span-static">Capital:&nbsp;</span
              ><span>{{ countryData?.capital?.[0] || "unknown" }}</span>
            </p>
            <!-- next item -->
            <p class="country__info-item">
              <span class="country__span-static">Top Level Domain:&nbsp;</span
              ><span>{{ countryData?.tld?.[0] || "unknown" }}</span>
            </p>
            <!-- next item -->
            <p class="country__info-item">
              <span class="country__span-static">Currencies:&nbsp;</span
              ><span>{{ getCurrencies(countryData?.currencies || { unknownCurrency }) }}</span>
            </p>
            <!-- next item -->
            <p class="country__info-item">
              <span class="country__span-static">Languages:&nbsp;</span
              ><span>{{ getLanguages(countryData?.languages || { unknownLanguage }) }}</span>
            </p>
          </div>
          <div v-if="borderCountries && borderCountries.length" class="country__nearest">
            <span class="country__span-static">Border countries:&nbsp;</span>
            <RouterLink
              v-for="value in borderCountries"
              :key="value"
              :to="`${projectBase}/countries/${countryToLink(value)}`"
            >
              <ButtonMain class="country__near-country">{{ value }}</ButtonMain></RouterLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.icon-arrow {
  margin-right: 8px;
}

.country {
  &__container {
    padding: 0px 20px;
  }

  &__back {
    margin: 80px 0px;
    padding: 12px 48px;
    display: flex;
    align-items: center;
    color: var(--text);
  }

  &__data {
    display: flex;
    gap: 80px;

    @media (max-width: 1023.98px) {
      flex-direction: column;
    }

    & > div:first-child {
      flex: 0 0 40%;
    }

    & > div:last-child {
      flex-grow: 1;
    }
  }

  &__flag {
    & > img {
      width: 100%;
    }
  }

  &__info {
    padding: 20px 0px;
    display: flex;
    flex-direction: column;
  }

  &__info-items {
    columns: 2;

    @media (max-width: 1023.98px) {
      columns: unset;
    }
  }

  &__info-item {
    margin-bottom: 10px;
    font-size: var(--font-size-s);
  }

  &__heading {
    margin-bottom: 40px;
    font-size: 30px;
    line-height: 30px;
  }

  &__span-static {
    font-weight: 600;
    font-size: var(--font-size-s);
  }

  &__nearest {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: auto;
  }

  &__near-country {
    font-size: var(--font-size-s);
    color: var(--text);
  }
}
</style>
