<template>
  <div class="page-wrapper">
    <!-- Use LayoutContainer to organize TodoCard and Analytics components -->
    <LayoutContainer />
  </div>
</template>

<script setup>
import LayoutContainer from "~/components/LayoutContainer.vue";
</script>

<style scoped>
.page-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
