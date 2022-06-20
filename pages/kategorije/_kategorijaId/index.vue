<template>
  <b-container class="mt-3">
    <b-row class="mt-4 mb-4">
      <h3 class="fontC mx-auto">
        kategorija |{{ $route.params.kategorijaId }}|
      </h3></b-row
    >
    <b-card-group>
      <CardKnjiga
        v-for="(card, idx) in $store.state.podKategorija"
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
    return { podaci };
  },
  async asyncData({ app, store, params, redirect, route }) {
    try {
      let userDoc = await app.$fire.firestore
        .collection("kategorije")
        .doc("podaci")
        .get();
      store.commit(
        "setPodKategorija",
        userDoc
          .data()
          .knjige.filter((item) => item.kategorija === params.kategorijaId)
      );
      if (store.state.podKategorija.length === 0) {
        redirect({ path: `${route.path}/errorKnjiga` });
      }
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
