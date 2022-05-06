<template>
  <div>
    <nuxt-link :to="`/kategorije/${title}`">
      <b-card
        :title="title"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 11.6rem"
        class="mb-2 xml-2 xmr-2"
      >
        <!-- <b-button href="#" variant="primary">Go somewhere</b-button> -->
      </b-card></nuxt-link
    >
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
