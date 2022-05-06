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
      ></b-form-input>
      <b-form-select
        v-model="kategorijaO"
        :options="podaci.optionsKategorije"
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
  name: "novaknjiga",
  data() {
    return {
      naslov: "",
      cijena: "",
      izdavackaKuca: "",
      kategorijaO: "",
      godinaIzdanja: "",
      stanjeO: "",
      opis: "",
      obj: {},
      podaci,
    };
  },
  methods: {
    async onClick(e) {
      e.preventDefault();
      if (!this.naslov) {
        alert("potrebno upisati podatke");
      } else {
        const increment = this.$fireModule.firestore.FieldValue.increment(1);
        const ref = await this.$fire.firestore
          .collection("kategorije")
          .doc("podaci");
        const refKnjiga = await this.$fire.firestore
          .collection("kategorije")
          .doc(this.kategorijaO)
          .collection("knjige");
        ref.update({ ukKnjiga: increment });
        const { id } = await refKnjiga.add(this.obj);
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
        });
      }
    },
  },
  mounted() {},
};
</script>
