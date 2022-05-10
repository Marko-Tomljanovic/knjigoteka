<template>
  <div>
    <nuxt-link style="text-decoration: none" :to="`/kategorije/${title}`">
      <!-- <b-card
        :title="title"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 11.6rem"
        class="mb-2 xml-2 xmr-2"
      >
         </b-card -->
      <b-img
        style="height: 10.2rem; width: 15.5rem; border-radius: 10%"
        class="mb-1 mr-2 ml-2"
        :src="require(`@/static/kategorije/${title.toLowerCase()}.jpg`)"
        alt="kategorija" />
      <br />
      <p class="mb-3 text-right kartica mr-2">{{ title }}</p>
      <p></p
    ></nuxt-link>
  </div>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {};
  },
};
</script>

<style scoped>
.kartica {
  font-family: "Inika", sans-serif;
  color: black;
}
</style>
