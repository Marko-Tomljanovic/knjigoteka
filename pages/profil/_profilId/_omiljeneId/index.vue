<template>
  <div>omiljene knjige <br />{{ profilKorisnika }}</div>
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
      profilKorisnika: [],
    };
  },
  methods: {
    async ucitaj() {
      try {
        let ref = await this.$fire.firestore
          .collection("users")
          .doc(this.$store.state.userData.uid)
          .get();
        this.profilKorisnika = ref.data();
        if (!this.profilKorisnika) {
          this.$router.replace({ path: "/errorPage" });
        }
      } catch (e) {
        console.log(e);
        this.$router.replace({ path: "/errorPage" });
      }
    },
  },
  mounted() {
    this.ucitaj();
  },
};
</script>
