<template>
  <b-container class="fontC">
    <b-row align-h="center">
      <div
        class="border"
        style="width: 61rem; height: 15.7rem; margin-top: 3.5rem"
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
            <h6 style="font-size: 15px; margin-top: -0.8rem" class="text-muted">
              <b-icon variant="dark" class="mr-2" icon="clock-history"></b-icon
              >Korisnik od:
              {{ $moment(vrijemeKreiranjaKorisnika).format("ll") }}
            </h6>

            <h5>
              <b-icon class="mr-1 mt-2" icon="hand-thumbs-up"></b-icon
              >{{ ukLajk
              }}<b-icon class="ml-3 mr-1" icon="hand-thumbs-down"></b-icon
              >{{ ukDislajk }}
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

    <b-tabs class="mt-1" content-class="mt-3" justified>
      <b-tab :title="`Moji oglasi |${ukKnjiga}|`" active>
        <b-row>
          <CardKnjiga
            class="mr-1 ml-1"
            v-for="(card, idx) in profilKorisnika.dodaneKnjige"
            :key="idx.naslov"
            :title="card.naslov"
            :id="card.idKnjige"
            :kategorija="card.kategorija" /></b-row
      ></b-tab>
      <b-tab :title="`Komentari |${ukKomentari}|`" :active="queryTab">
        <b-form-group v-if="ukKomentari > 0">
          <b-form-radio-group
            id="radio-group"
            v-model="selected"
            name="radio-sub-component"
            size="sm"
          >
            <b-form-radio value="svi">Svi</b-form-radio>
            <b-form-radio value="pozitivni">Pozitivni</b-form-radio>
            <b-form-radio value="negativni">Negativni</b-form-radio>
            <b-form-radio value="stariji">Stariji</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
        <komentar
          v-for="(card, id) in sort"
          :key="id.komentar"
          :korisnik="card.imePrezime"
          :ocjena="card.lajk"
          :komentar="card.komentar"
          :vrijeme="card.vrijeme"
        />
      </b-tab>
    </b-tabs>
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
      lajkMetoda: {},
      selected: "svi",
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
        this.dora();
      } catch (e) {
        console.log(e);
        this.$router.replace({ path: "/errorPage" });
      }
    },
    dora() {
      let res = {};
      this.profilKorisnika.komentari?.forEach(function (v) {
        res[v.lajk] = (res[v.lajk] || 0) + 1;
      });
      this.lajkMetoda = res;
    },
  },
  computed: {
    ukKomentari() {
      return this.profilKorisnika.komentari
        ? this.profilKorisnika.komentari.length
        : "0";
    },
    ukLajk() {
      if (this.lajkMetoda.true) {
        return this.lajkMetoda.true;
      } else {
        return "0";
      }
    },
    ukDislajk() {
      if (this.lajkMetoda.false) {
        return this.lajkMetoda.false;
      } else {
        return "0";
      }
    },
    queryTab() {
      return this.$route.query.tab ? true : false;
    },
    sort() {
      if (this.selected === "svi") {
        return this.profilKorisnika.komentari?.sort(function (a, b) {
          return b.vrijeme < a.vrijeme ? -1 : 1;
        });
      } else if (this.selected === "pozitivni") {
        return this.profilKorisnika.komentari?.filter(
          (row) => row.lajk === "true"
        );
      } else if (this.selected === "negativni") {
        return this.profilKorisnika.komentari?.filter(
          (row) => row.lajk === "false"
        );
      } else if (this.selected === "stariji") {
        return this.profilKorisnika.komentari?.sort(function (a, b) {
          return a.vrijeme < b.vrijeme ? -1 : 1;
        });
      }
    },
    vrijemeKreiranjaKorisnika() {
      return parseInt(this.$store.state.userData?.createdAt);
    },
  },

  mounted() {
    this.ucitaj();
  },
};
</script>

<style scoped></style>
