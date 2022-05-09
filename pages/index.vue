<template>
  <div class="bg">
    <b-container class="text-center">
      <b-row style="margin-top: 6rem" xclass="mt-5">
        <b-col><p class="fontI">Što mi se čita?</p></b-col>
      </b-row>
      <b-row> <Search /></b-row>
    </b-container>
  </div>
</template>

<script>
import podaci from "@/store/podaci";
export default {
  layout: "naslovna",
  data() {
    return {
      podaci,
    };
  },
  methods: {},
  computed: {
    filter() {
      return this.podaci.kategorije.filter((card) =>
        card.naslov.toLowerCase().includes(this.podaci.trazi.toLowerCase())
      );
    },
  },
};
</script>

<style>
body {
  background-image: url("@/static/books_bg.jpg");
  top: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: auto;
  height: 100vh;
}

.fontI {
  font-family: "Inconsolata, sans-serif";
  font-size: 4rem;
  font-weight: 900;
  color: white;
}
</style>
