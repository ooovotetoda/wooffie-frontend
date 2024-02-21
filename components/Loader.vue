<script setup lang="ts">

</script>

<template>
  <div class="spinner"></div>
</template>


<style scoped>
.spinner {
  border-radius: 50%;
  border: 8px solid #CF8802FF;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  width: 50px;
  height: 50px;
  animation: spin 0.5s cubic-bezier(.6,.27,.4,.69) infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  70% { transform: rotate(300deg); }
  100% { transform: rotate(360deg); }
}
</style>
