<template>
  <b-container>
    <b-row class="mt-4">
      <h3 class="fontC mx-auto">poruke |nepročitano: {{ ukPoruke }}|</h3></b-row
    >
    <div>
      <b-card no-body>
        <b-tabs pills card vertical nav-wrapper-class="w-90">
          <poruka
            v-for="(card, index) in $store.state.poruke"
            :key="index.ime"
            :ime="index"
            :poruka="card"
            @posaljiPoruku="(a) => posaljiPoruku(a)"
          />
        </b-tabs>
      </b-card>
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  async asyncData({ store, app }) {
    try {
      const us = await app.$fire.firestore
        .collection("users")
        .doc(store.state.userData.uid)
        .get();
      const poruke = await app.$fire.firestore
        .collection("users")
        .doc(store.state.userData.uid)
        .collection("poruke")
        .doc("sve")
        .get();
      store.commit("setUserDataF", us.data());
      store.commit("setPoruke", poruke.data());
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    async posaljiPoruku(primatelj) {
      if (this.$store.state.userData) {
        console.log("primatelj = " + primatelj);
        // try {
        //   const ref = await this.$fire.firestore
        //     .collection("users")
        //     .doc(this.$store.state.userData.uid)
        //     .collection("poruke")
        //     .doc("sve");
        //   const refK = await this.$fire.firestore
        //     .collection("users")
        //     .doc(this.$store.state.oglas.idKorisnika)
        //     .collection("poruke")
        //     .doc("sve");
        //   const marko = this.$fireModule.firestore.FieldValue;
        //   ref.update({
        //     [this.$store.state.oglas.imePrezime]: marko.arrayUnion({
        //       idKorisnika: this.$store.state.userData.uid,
        //       ime: this.$store.state.userDataF.imePrezime,
        //       poruka: this.poruka,
        //       vrijeme: Date.now(),
        //     }),
        //   });
        //   refK.update({
        //     [this.$store.state.userDataF.imePrezime]: marko.arrayUnion({
        //       idKorisnika: this.$store.state.userData.uid,
        //       ime: this.$store.state.userDataF.imePrezime,
        //       poruka: this.poruka,
        //       vrijeme: Date.now(),
        //     }),
        //   });
        // } catch (e) {
        //   console.log(e);
        // }
      } else {
        alert("Prijavi se za lajk!");
      }
    },
  },

  computed: {
    ukPoruke() {
      return "0";
    },
  },
};
</script>
