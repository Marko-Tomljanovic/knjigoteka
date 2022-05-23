<template>
  <b-container class="mt-3">
    <b-row class="mt-4 mb-4">
      <h3 class="fontC mx-auto">
        kategorija |{{ $route.params.kategorijaId }}|
      </h3></b-row
    >
    <b-card-group>
      <CardKnjiga
        v-for="(card, idx) in knjige"
        :key="idx.naslov"
        :title="card.naslov"
        :id="card.idKnjige"
        :kategorija="card.kategorija"
      /> </b-card-group
  ></b-container>
</template>

<script>
import podaci from "@/store/podaci";
export default {
  head() {
    return { title: "Kategorije | " + this.$route.params.kategorijaId };
  },
  data() {
    return { knjige: [], podaci };
  },
  methods: {
    async ucitaj() {
      try {
        let userDoc = await this.$fire.firestore
          .collection("kategorije")
          .doc("podaci")
          .get();
        this.knjige = userDoc
          .data()
          .knjige.filter(
            (item) => item.kategorija === this.$route.params.kategorijaId
          );
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.ucitaj();
  },
};
</script>
