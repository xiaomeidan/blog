<template>
  <div>
    <h1>Learn folder</h1>
    <p>Current route: {{ route.path }}</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>
