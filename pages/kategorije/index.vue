<template>
  <b-container fluid class="mt-3">
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
  name: "kategorije",
  data() {
    return { podaci };
  },
  methods: {},
};
</script>
