<template>
<div class="preloader">
  <img alt="smile" class="image" src="images/logo.png"/>
</div>
</template>

<script>
export default {
  name: "Preloader"
}
</script>

<style scoped>
.preloader{
  position: absolute;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image{
  height: 120px;
  animation: pulse 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
}
@keyframes pulse {
  0% {
    transform: scale(0.95);
  }
  5% {
    transform: scale(1.1);
  }
  39% {
    transform: scale(0.85);
  }
  45% {
    transform: scale(1);
  }
  60% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(0.9);
  }
}
</style>