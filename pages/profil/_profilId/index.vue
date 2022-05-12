<template>
  <div>
    <div>----Ime: {{ this.$store.state.userData.uid }}</div>
    <div>Email: {{ this.$store.state.userData.email }}</div>
    <div>
      Mobitel: {{ this.$store.state.userData.providerData.phoneNumber }}
    </div>

    <div>{{ profilKorisnika }}</div>
  </div>
</template>

<script>
export default {
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
