<template>
  <b-container class="mt-3">
    <b-form @submit="onClick">
      <b-form-input
        id="naslov"
        v-model="naslov"
        type="text"
        placeholder="Unesi naslov"
        required
      ></b-form-input>
      <b-form-input
        id="cijena"
        type="number"
        v-model="cijena"
        placeholder="Unesi cijenu"
        required
      ></b-form-input>
      <b-form-input
        id="izdavacka kuca"
        v-model="izdavackaKuca"
        type="text"
        placeholder="Izdavačka kuća"
        required
      ></b-form-input>
      <b-form-input
        id="godinaIzdanja"
        type="number"
        v-model="godinaIzdanja"
        placeholder="Unesi godinu izdanja"
        required
      ></b-form-input>
      <b-form-input
        id="opis"
        v-model="opis"
        type="text"
        placeholder="Opis"
        required
      ></b-form-input
      ><b-form-input
        id="jezik"
        v-model="jezik"
        type="text"
        placeholder="Jezik"
        required
      ></b-form-input>
      <b-form-select
        v-model="kategorijaO"
        :options="podaci.optionsKategorije"
      ></b-form-select>
      <b-form-select
        v-model="uvezO"
        :options="podaci.optionsUvez"
      ></b-form-select>
      <b-form-select
        v-model="stanjeO"
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
  head: {
    title: "Dodaj knjigu",
  },
  name: "novaknjiga",
  data() {
    return {
      naslov: "",
      cijena: "",
      izdavackaKuca: "",
      kategorijaO: "",
      godinaIzdanja: "",
      stanjeO: "",
      jezik: "",
      uvezO: "",
      opis: "",
      obj: {},
      podaci,
      profilKorisnika: [],
    };
  },
  methods: {
    async onClick(e) {
      e.preventDefault();
      if (!this.naslov) {
        alert("potrebno upisati podatke");
      } else {
        const refKnjiga = await this.$fire.firestore
          .collection("kategorije")
          .doc(this.kategorijaO)
          .collection("knjige");
        const { id } = await refKnjiga.add(this.obj);
        await this.$fire.firestore
          .collection("users")
          .doc(this.$store.state.userData.uid)
          .update({
            dodaneKnjige: this.$fireModule.firestore.FieldValue.arrayUnion({
              idKnjige: id,
              naslov: this.naslov,
              kategorija: this.kategorijaO,
            }),
          });
        await this.$fire.firestore
          .collection("kategorije")
          .doc("podaci")
          .update({
            knjige: this.$fireModule.firestore.FieldValue.arrayUnion({
              idKnjige: id,
              naslov: this.naslov,
              kategorija: this.kategorijaO,
            }),
          });
        refKnjiga.doc(id).set({
          id: id,
          naslov: this.naslov,
          cijena: this.cijena,
          kategorija: this.kategorijaO,
          stanje: this.stanjeO,
          izdavackaKuca: this.izdavackaKuca,
          godinaIzdanja: this.godinaIzdanja,
          kreiran: Date.now(),
          opis: this.opis,
          korisnik: this.$store.state.userData.email,
          uvez: this.uvezO,
          jezik: this.jezik,
          lokacija: this.profilKorisnika.mjesto,
          imePrezime: this.profilKorisnika.imePrezime,
          mobitel: this.profilKorisnika.mobitel,
          omiljene: [],
          idKorisnika: this.$store.state.userData.uid,
        });
      }
    },
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
