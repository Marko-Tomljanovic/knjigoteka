<template>
  <b-container class="fontC">
    <b-row align-h="center">
      <div
        class="border"
        style="width: 61rem; height: 15.5rem; margin-top: 3.5rem"
      >
        <b-row>
          <b-col cols="4" class="text-center">
            <b-icon
              icon="person-circle"
              font-scale="8"
              style="margin-top: -2rem"
            ></b-icon
          ></b-col>
          <b-col
            ><h2 class="mt-4 font-weight-bold">
              o meni
              <ModalOpis :oMeni="profilKorisnika.oMeni" @ucitajEmit="ucitaj" />
            </h2>
            <hr />
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="4" class="text-center"
            ><h5 class="mt-3">{{ profilKorisnika.imePrezime }}</h5>

            <p style="font-size: 18px" class="text-muted">
              <b-icon variant="dark" class="mr-2" icon="geo-alt-fill"></b-icon
              >{{ profilKorisnika.mjesto }}
            </p>

            <h5>
              <b-icon class="mr-1" icon="hand-thumbs-up"></b-icon>54<b-icon
                class="ml-3 mr-1"
                icon="hand-thumbs-down"
              ></b-icon
              >21
            </h5>
          </b-col>
          <b-col cols="7">
            <p
              v-if="profilKorisnika.oMeni"
              style="font-size: 17px"
              class="text-muted"
            >
              {{ profilKorisnika.oMeni }}
            </p>
            <p v-else style="font-size: 17px" class="text-muted block">
              napiši nešto o sebi ..
            </p>
            <br
          /></b-col>
        </b-row>
      </div>
    </b-row>
    <b-row
      ><b-col class="mx-auto mb-3" cols="5"
        ><h4 class="text-center mt-3">moji oglasi |{{ ukKnjiga }}|</h4></b-col
      ></b-row
    >
    <b-row>
      <CardKnjiga
        class="mr-1 ml-1"
        v-for="(card, idx) in profilKorisnika.dodaneKnjige"
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
      title: "Profil | " + this.profilKorisnika.imePrezime,
    };
  },
  data() {
    return {
      profilKorisnika: [],
      ukKnjiga: "0",
    };
  },
  methods: {
    async ucitaj() {
      console.log("sada znam da je ucitano");
      try {
        let ref = await this.$fire.firestore
          .collection("users")
          .doc(this.$store.state.userData.uid)
          .get();
        this.profilKorisnika = ref.data();
        if (this.profilKorisnika.dodaneKnjige) {
          this.ukKnjiga = this.profilKorisnika.dodaneKnjige.length;
        }

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

<style scoped></style>
