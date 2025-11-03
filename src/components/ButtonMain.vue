<template>
  <button class="nearest-country text"><slot /></button>
</template>

<style scoped lang="scss">
.nearest-country {
  background-color: var(--button);
  color: white;
  font-family: monospace;
  padding: 4px 12px;
  border-radius: 4px;
}
</style>
