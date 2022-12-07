<template>
  <div class="bg">
    <Navi />
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: "naslovna",
};
</script>

<style>
.bg {
  background-image: url("@/static/books_bg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: auto;
  height: 100vh;
}
</style>
