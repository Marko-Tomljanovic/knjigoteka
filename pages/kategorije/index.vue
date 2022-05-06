<template>
  <b-container fluid class="mt-3">
    <b-button to="novaknjiga">Dodaj knjigu</b-button>
    <b-form-input
      size="sm"
      class="mr-sm-2 mb-3"
      placeholder="Search"
      v-model="podaci.trazi"
      autocomplete="off"
    ></b-form-input
    ><b-card-group deck>
      <CardKategorija
        v-for="(card, idx) in filter"
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
  computed: {
    filter() {
      return this.podaci.kategorije.filter((card) =>
        card.naslov.toLowerCase().includes(this.podaci.trazi.toLowerCase())
      );
    },
  },
};
</script>
