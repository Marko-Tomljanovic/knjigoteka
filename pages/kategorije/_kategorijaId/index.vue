<template>
  <b-container class="mt-3">
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
    return { knjige: [], podaci, test: [] };
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
