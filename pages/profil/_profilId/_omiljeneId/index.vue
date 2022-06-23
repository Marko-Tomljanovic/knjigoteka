<template>
  <b-container>
    <b-row class="mt-4">
      <h3 class="fontC mx-auto">omiljene knjige |{{ ukOmiljene }}|</h3></b-row
    >
    <b-row class="mt-4">
      <CardKnjiga
        class="mr-1 ml-1"
        v-for="(card, idx) in omiljeneKnjige"
        :key="idx.naslov"
        :title="card.naslov"
        :id="card.idKnjige"
        :kategorija="card.kategorija"
        @ucitajEmit="ucitaj"
    /></b-row>
  </b-container>
</template>

<script>
export default {
  head() {
    return {
      title: "Omiljene knjige",
    };
  },
  data() {
    return {
      omiljeneKnjige: [],
    };
  },
  methods: {
    async ucitaj() {
      try {
        let ref = await this.$fire.firestore
          .collection("users")
          .doc(this.$store.state.userData.uid)
          .get();

        this.omiljeneKnjige = ref.data().omiljeneK;
      } catch (e) {
        console.log(e);
        // this.$router.replace({ path: "/errorPage" });
      }
    },
  },
  computed: {
    ukOmiljene() {
      if (this.omiljeneKnjige) {
        return this.omiljeneKnjige.length;
      } else {
        return "0";
      }
    },
  },
  mounted() {
    this.ucitaj();
  },
};
</script>
