<template>
  <b-container class="mt-3">
    <b-form @submit="onClick">
      <label for="naslov">Fiksni podaci</label>
      <b-form-input
        disabled
        id="naslov"
        v-model="profilKorisnika.naslov"
      ></b-form-input>
      <b-form-input
        disabled
        v-model="profilKorisnika.kategorija"
      ></b-form-input>
      <label class="mt-2" for="naslov">Izmjeni</label>
      <b-form-input
        id="cijena"
        type="number"
        v-model="profilKorisnika.cijena"
        placeholder="Unesi cijenu"
        required
      ></b-form-input>
      <b-form-input
        id="autor"
        type="text"
        v-model="profilKorisnika.autor"
        placeholder="Unesi autora"
        required
      ></b-form-input>
      <b-form-input
        id="izdavacka kuca"
        v-model="profilKorisnika.izdavackaKuca"
        type="text"
        placeholder="Izdavačka kuća"
        required
      ></b-form-input>
      <b-form-input
        id="godinaIzdanja"
        type="number"
        v-model="profilKorisnika.godinaIzdanja"
        placeholder="Unesi godinu izdanja"
        required
      ></b-form-input>
      <b-form-input
        id="opis"
        v-model="profilKorisnika.opis"
        type="text"
        placeholder="Opis"
        required
      ></b-form-input
      ><b-form-input
        id="jezik"
        v-model="profilKorisnika.jezik"
        type="text"
        placeholder="Jezik"
        required
      ></b-form-input>

      <b-form-select
        v-model="profilKorisnika.uvez"
        :options="podaci.optionsUvez"
      ></b-form-select>
      <b-form-select
        v-model="profilKorisnika.stanje"
        :options="podaci.optionsStanje"
      ></b-form-select>

      <b-button @click="onClick" type="submit" variant="primary"
        >Submit</b-button
      >
    </b-form></b-container
  >
</template>

<script>
import podaci from "@/store/podaci";
export default {
  head() {
    return { title: `"Uredi | ${this.profilKorisnika.naslov}"` };
  },
  name: "urediKnjigu",
  data() {
    return {
      podaci,
      profilKorisnika: [],
    };
  },
  methods: {
    async onClick(e) {
      e.preventDefault();
      const refKnjiga = await this.$fire.firestore
        .collection("kategorije")
        .doc(this.$route.query.kategorija)
        .collection("knjige");
      refKnjiga
        .doc(this.$route.params.urediId)
        .update({
          naslov: this.profilKorisnika.naslov,
          cijena: this.profilKorisnika.cijena,
          stanje: this.profilKorisnika.stanje,
          autor: this.profilKorisnika.autor,
          izdavackaKuca: this.profilKorisnika.izdavackaKuca,
          godinaIzdanja: this.profilKorisnika.godinaIzdanja,
          opis: this.profilKorisnika.opis,
          uvez: this.profilKorisnika.uvez,
          jezik: this.profilKorisnika.jezik,
          ureden: Date.now(),
        })
        .then(() => {
          this.$router.replace({
            path: `/profil/${this.$store.state.userData.uid}`,
          });
        });
    },
    async ucitaj() {
      try {
        let ref = await this.$fire.firestore
          .collection("kategorije")
          .doc(this.$route.query.kategorija)
          .collection("knjige")
          .doc(this.$route.params.urediId)
          .get();
        this.profilKorisnika = ref.data();
        if (!this.profilKorisnika) {
          this.$router.replace({ path: "/errorPage" });
        }
      } catch (e) {
        console.log(e);
        // this.$router.replace({ path: "/errorPage" });
      }
    },
  },

  mounted() {
    this.ucitaj();
  },
};
</script>
s
