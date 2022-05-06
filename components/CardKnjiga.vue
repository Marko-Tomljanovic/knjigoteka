<template>
  <div>
    <nuxt-link :to="`/kategorije/${this.$route.params.kategorija}/${id}`">
      <b-card
        :title="title"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 12rem"
        class="mb-2"
      >
        <!-- <b-button href="#" variant="primary">Go somewhere</b-button> -->
      </b-card></nuxt-link
    >
  </div>
</template>

<script>
export default {
  props: ["title", "id"],
  data() {
    return {};
  },
};
</script>
