<template>
  <b-container class="fontC">
    <b-row align-h="center">
      <div
        class="border"
        style="width: 61rem; height: 16.3rem; margin-top: 3.3rem"
      >
        <b-row>
          <b-col cols="4" class="text-center">
            <b-icon
              v-if="!$store.state.userDataF.slikaProfilaURL"
              icon="person-circle"
              font-scale="8.7"
              style="margin-top: -2rem"
            ></b-icon>
            <b-img
              v-else
              style="margin-top: -2.1rem"
              :src="$store.state.userDataF.slikaProfilaURL"
              fluid
              alt="Profil Image"
              rounded="circle"
            ></b-img>
          </b-col>
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

    <b-tabs class="mt-2" content-class="mt-3" justified>
      <b-tab :title="`Moji oglasi |${ukKnjiga}|`" active>
        <b-row>
          <CardKnjiga
            class="mr-1 ml-1"
            v-for="(card, idx) in profilKorisnika.dodaneKnjige"
            :key="idx.naslov"
            :title="card.naslov"
            :autor="card.autor"
            :id="card.idKnjige"
            :kategorija="card.kategorija"
            :imgURL="card.imgURL"
            @knjiga="getKnjiga" /></b-row
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
    <b-modal
      id="modal-brisati-knjigu"
      ref="modal"
      title="Za brisanje knjige upisati točan naziv knjige"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label-for="text-input"
          invalid-feedback="Opis je obavezan"
        >
          <b-form-input
            id="text-input"
            autocomplete="off"
            placeholder="npr. Harry Potter"
            v-model="text"
          ></b-form-input>
        </b-form-group>
      </form>
      <template #modal-footer="{ cancel }">
        <b-button size="sm" variant="outline-dark" @click="cancel()">
          Odustani
        </b-button>
        <b-button variant="danger" size="sm" @click="handleOk">
          Obriši
        </b-button>
      </template>
    </b-modal>
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
      text: "",
      odabranaKnjiga: {},
    };
  },
  methods: {
    getKnjiga(value) {
      this.odabranaKnjiga = value;
    },
    async obrisati() {
      try {
        const ref = await this.$fire.firestore;
        //brisanje knjige iz kategorija
        ref
          .collection("kategorije")
          .doc(this.odabranaKnjiga.kategorija)
          .collection("knjige")
          .doc(this.odabranaKnjiga.id)
          .delete();
        //brisanje knjige iz kategorija
        ref
          .collection("users")
          .doc(this.$store.state.userData.uid)
          .update({
            dodaneKnjige: this.$fireModule.firestore.FieldValue.arrayRemove({
              idKnjige: this.odabranaKnjiga.id,
              autor: this.odabranaKnjiga.autor,
              naslov: this.odabranaKnjiga.title,
              kategorija: this.odabranaKnjiga.kategorija,
              imgURL: this.odabranaKnjiga.imgURL,
            }),
          });
        //brisanje knjige kolekcije podaci
        ref
          .collection("kategorije")
          .doc("podaci")
          .update({
            knjige: this.$fireModule.firestore.FieldValue.arrayRemove({
              idKnjige: this.odabranaKnjiga.id,
              autor: this.odabranaKnjiga.autor,
              naslov: this.odabranaKnjiga.title,
              imgURL: this.odabranaKnjiga.imgURL,
              kategorija: this.odabranaKnjiga.kategorija,
            }),
          })
          .then(() => {
            this.$emit("ucitajEmit");
          });
      } catch (e) {
        console.log(e);
      }
    },
    resetModal() {
      this.text = "";
      this.nameState = null;
    },

    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();
      if (this.odabranaKnjiga.title === this.text) {
        // Trigger submit handler
        this.obrisati()
          .then(() => {
            this.handleSubmit();
            console.log("Knjiga je obrisana");
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        alert("upisati tocan naziv knjige");
      }
    },
    handleSubmit() {
      this.ucitaj();
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-brisati-knjigu");
      });
    },
    async ucitaj() {
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
