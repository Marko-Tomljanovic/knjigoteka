<template>
  <b-container fluid class="mt-3 ml-4">
    <b-row class="mt-4 mb-4"> <h3 class="fontC mx-auto">kategorije</h3></b-row>
    <b-card-group>
      <CardKategorija
        v-for="(card, idx) in podaci.kategorije"
        :key="idx.naslov"
        :title="card.naslov" /></b-card-group
  ></b-container>
</template>

<script>
import podaci from "@/store/podaci";
export default {
  head: {
    title: "Knjigoteka | Kategorije",
  },
  name: "kategorije",
  data() {
    return { podaci };
  },
  methods: {},
};
</script>
