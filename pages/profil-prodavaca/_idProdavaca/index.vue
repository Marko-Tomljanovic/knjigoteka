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
            ><h2 class="mt-4 font-weight-bold">o korisniku</h2>
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
              <b-link @click="lajk" :disabled="!dislajkano">
                <b-icon
                  class="mr-2"
                  variant="info"
                  icon="hand-thumbs-up"
                  scale="1.3"
                ></b-icon></b-link
              >{{ ukLajk }}
              <b-link
                @click="dislajk"
                :disabled="!lajkano"
                v-b-tooltip.hover
                title="dislajk"
              >
                <b-icon
                  class="ml-3 mr-2"
                  variant="info"
                  icon="hand-thumbs-down"
                  scale="1.3"
                ></b-icon></b-link
              >{{ ukDislajk }}
            </h5>
            <b-alert
              :show="dismissCountDown"
              :variant="variant"
              @dismissed="dismissCountDown = 0"
              @dismiss-count-down="countDownChanged"
              >{{ alertText }}</b-alert
            >
          </b-col>
          <b-col cols="7">
            <p style="font-size: 17px" class="text-muted">
              {{ profilKorisnika.oMeni }}
            </p>
          </b-col>
        </b-row>
      </div>
    </b-row>
    <b-row
      ><b-col class="mx-auto mb-3" cols="5"
        ><h4 class="text-center mt-3">
          oglasi korisnika |{{ ukKnjiga }}|
        </h4></b-col
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
    /></b-row>
  </b-container>
</template>

<script>
export default {
  head() {
    return {
      title: "profil-prodavača",
    };
  },
  data() {
    return {
      profilKorisnika: [],
      ukKnjiga: "0",
      dismissSecs: 3,
      dismissCountDown: 0,
      alertText: "",
      variant: "",
    };
  },
  methods: {
    async ucitaj() {
      console.log("ucitano");
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
    async lajk() {
      if (this.$store.state.userData) {
        const ref = await this.$fire.firestore
          .collection("users")
          .doc(this.$store.state.userData.uid);
        const marko = this.$fireModule.firestore.FieldValue;
        if (!this.lajkano) {
          ref.update({
            lajk: marko.arrayRemove(this.$store.state.userData.uid),
          });
          this.ucitaj();
          this.showAlert("Uklonjen lajk!", "danger");
        } else {
          ref.update({
            lajk: marko.arrayUnion(this.$store.state.userData.uid),
          });
          this.ucitaj();
          this.showAlert("Hvala na ostavljenoj ocjeni", "success");
        }
      } else {
        alert("Prijavi se za lajk!");
      }
    },
    async dislajk() {
      if (this.$store.state.userData) {
        const ref = await this.$fire.firestore
          .collection("users")
          .doc(this.$store.state.userData.uid);
        const marko = this.$fireModule.firestore.FieldValue;
        if (!this.dislajkano) {
          ref.update({
            dislajk: marko.arrayRemove(this.$store.state.userData.uid),
          });
          this.ucitaj();
          this.showAlert("Uklonjen dislajk!", "danger");
        } else {
          ref.update({
            dislajk: marko.arrayUnion(this.$store.state.userData.uid),
          });
          this.ucitaj();
          this.showAlert("Hvala na ostavljenoj ocjeni", "success");
        }
      } else {
        alert("Prijavi se za lajk!");
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert(text, variant) {
      this.alertText = text;
      this.variant = variant;
      this.dismissCountDown = this.dismissSecs;
    },
  },
  computed: {
    lajkano() {
      if (this.profilKorisnika.lajk?.includes(this.$store.state.userData.uid)) {
        return false;
      }
      return true;
    },
    dislajkano() {
      if (
        this.profilKorisnika.dislajk?.includes(this.$store.state.userData.uid)
      ) {
        return false;
      }
      return true;
    },
    ukLajk() {
      return this.profilKorisnika.lajk?.length;
    },
    ukDislajk() {
      return this.profilKorisnika.dislajk?.length;
    },
  },
  mounted() {
    this.ucitaj();
  },
};
</script>

<style scoped></style>
