<template>
  <b-container>
    <b-row class="mt-4">
      <h3 class="fontC mx-auto">poruke |nepročitano: {{ ukPoruke }}|</h3></b-row
    >
    <div>
      <b-card no-body>
        <b-tabs
          v-model="tabIndex"
          pills
          lazy
          card
          vertical
          nav-wrapper-class="w-90"
          active-nav-item-class="bg-dark"
        >
          <b-tab title="INFO INBOX"
            ><b-card-text
              ><p v-if="novePorukeInfo">
                Imate nove poruke od
                {{ neprocitaneKorisnici }}
              </p>
              <p v-else>Nemate novih poruka</p></b-card-text
            ></b-tab
          >
          <poruka
            v-for="(card, index) in $store.state.poruke"
            :key="card[1].vrijeme"
            :ime="card[0]"
            :poruka="card[1]"
            @posaljiPoruku="
              (primateljId, imePrimatelja, porukaChild) =>
                posaljiPoruku(primateljId, imePrimatelja, porukaChild)
            "
          />
        </b-tabs>
      </b-card>
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return { tabIndex: 0 };
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
    async posaljiPoruku(primateljId, imePrimatelja, porukaChild) {
      if (!porukaChild) {
        alert("Upisati poruku!");
      } else {
        if (this.$store.state.userData) {
          try {
            const ref = await this.$fire.firestore
              .collection("users")
              .doc(this.$store.state.userData.uid)
              .collection("poruke")
              .doc("sve");
            const refK = await this.$fire.firestore
              .collection("users")
              .doc(primateljId)
              .collection("poruke")
              .doc("sve");
            const refKNotifikacija = await this.$fire.firestore
              .collection("users")
              .doc(primateljId);
            const marko = this.$fireModule.firestore.FieldValue;
            ref.update({
              [imePrimatelja]: marko.arrayUnion({
                idKorisnika: this.$store.state.userData.uid,
                ime: this.$store.state.userDataF.imePrezime,
                poruka: porukaChild,
                vrijeme: Date.now(),
              }),
            });
            refK.update({
              [this.$store.state.userDataF.imePrezime]: marko.arrayUnion({
                idKorisnika: this.$store.state.userData.uid,
                ime: this.$store.state.userDataF.imePrezime,
                poruka: porukaChild,
                vrijeme: Date.now(),
              }),
            });
            refKNotifikacija
              .update({
                notifikacija: marko.arrayUnion(
                  this.$store.state.userDataF.imePrezime
                ),
              })
              .then(() => {
                setTimeout(() => {
                  this.tabIndex = 1;
                  this.ucitaj();
                }, "700");
              })
              .catch((e) => {
                console.log(e);
              });
          } catch (e) {
            console.log(e);
          }
        } else {
          alert("Prijavi se za lajk!");
        }
      }
    },
    async ucitaj() {
      try {
        // const us = await this.$fire.firestore
        //   .collection("users")
        //   .doc(this.$store.state.userData.uid)
        //   .get();
        const poruke = await this.$fire.firestore
          .collection("users")
          .doc(this.$store.state.userData.uid)
          .collection("poruke")
          .doc("sve")
          .get();
        // this.$store.commit("setUserDataF", us.data());
        this.$store.commit("setPoruke", poruke.data());
      } catch (e) {
        console.log(e);
      }
    },
  },

  computed: {
    ukPoruke() {
      return this.$store.state.userDataF?.notifikacija
        ? this.$store.state.userDataF?.notifikacija.length
        : "0";
    },
    novePorukeInfo() {
      return this.$store.state.userDataF?.notifikacija?.length > 0;
    },
    neprocitaneKorisnici() {
      return this.$store.state.userDataF?.notifikacija.toString();
    },
  },
};
</script>
