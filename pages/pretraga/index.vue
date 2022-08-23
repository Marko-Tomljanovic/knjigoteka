<template>
  <b-container class="m-5" fluid
    ><div class="fontC">
      <b-row class="mt-4">
        <h3 class="mx-auto">tražilica |{{ filterKnjiga.length }}|</h3></b-row
      >
      <b-row class="mt-4 mb-5">
        <Search :ucitaneKnjige="ucitaneKnjige"
      /></b-row>
      <h5 v-if="!podaci.trazi">Pretraga za pojam |{{ $route.query.trazi }}|</h5>
    </div>
    <b-row class="mt-4">
      <b-card-group>
        <CardKnjiga
          v-for="(card, idx) in filterKnjiga"
          :key="idx.naslov"
          :title="card.naslov"
          :id="card.idKnjige"
          :autor="card.autor"
          :kategorija="card.kategorija"
        /> </b-card-group
    ></b-row>
  </b-container>
</template>

<script>
import podaci from "@/store/podaci";
export default {
  head() {
    return {
      title: "Tražilica",
    };
  },
  data() {
    return { podaci, ucitaneKnjige: [] };
  },
  methods: {
    async ucitaj() {
      try {
        const ref = await this.$fire.firestore
          .collection("kategorije")
          .doc("podaci")
          .get();
        this.ucitaneKnjige = ref.data().knjige;
      } catch (e) {
        console.log(e);
      }
    },
  },
  computed: {
    filterKnjiga() {
      if (!this.podaci.trazi) {
        return this.ucitaneKnjige.filter((card) =>
          card.naslov.toLowerCase().includes(this.$route.query.trazi)
        );
      } else {
        return this.ucitaneKnjige.filter((card) =>
          card.naslov.toLowerCase().includes(this.podaci.trazi)
        );
      }
    },
  },
  mounted() {
    this.ucitaj();
  },
};
</script>
