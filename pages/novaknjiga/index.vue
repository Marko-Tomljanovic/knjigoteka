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
        id="autor"
        v-model="autor"
        type="text"
        placeholder="Unesi autora"
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
      > </b-form
    ><croppa
      v-model="myCroppa"
      :prevent-white-space="true"
      :width="176"
      :height="224"
      placeholder="Izgled oglasa"
      placeholder-color="#000"
      :placeholder-font-size="16"
      canvas-color="transparent"
      :show-remove-button="true"
      remove-button-color="black"
      :remove-button-size="30"
      :show-loading="true"
      :loading-size="50"
      loading-color="#606060"
    ></croppa
    ><b-button @click="uploadSlika()">Ucitaj sliku</b-button>da li je null:
    {{ myCroppa.img === null ? true : false }} <br />url slike: {{ imgURL }}
  </b-container>
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
      autor: "",
      uvezO: "",
      opis: "",
      obj: {},
      podaci,
      profilKorisnika: [],
      myCroppa: {},
      imgURL: "",
    };
  },
  methods: {
    async onClick(e) {
      e.preventDefault();
      if (!this.naslov || this.slikaNull) {
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
              autor: this.autor,
              naslov: this.naslov,
              kategorija: this.kategorijaO,
              imgURL: this.imgURL,
            }),
          });
        await this.$fire.firestore
          .collection("kategorije")
          .doc("podaci")
          .update({
            knjige: this.$fireModule.firestore.FieldValue.arrayUnion({
              idKnjige: id,
              autor: this.autor,
              naslov: this.naslov,
              kategorija: this.kategorijaO,
              imgURL: this.imgURL,
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
          autor: this.autor,
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
          imgURL: this.imgURL,
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
    async uploadSlika() {
      if (!this.slikaNull) {
        this.myCroppa.generateBlob((blobData) => {
          let imgName =
            "oglasi/" +
            this.$store.state.userDataF.imePrezime +
            "_" +
            Date.now() +
            ".png";
          this.$fire.storage
            .ref(imgName)
            .put(blobData)
            .then((result) => {
              result.ref.getDownloadURL().then((url) => {
                this.imgURL = url;
              });
            })
            .catch((e) => {
              console.log(e);
            });
        });
      } else {
        alert("Potrebno učitati sliku!");
      }
    },
  },
  computed: {
    slikaNull() {
      return this.myCroppa.img === null;
    },
  },
  mounted() {
    this.ucitaj();
  },
};
</script>

<style scoped>
.croppa-container {
  background-color: rgb(255, 255, 255);
  border: 1px solid grey;
  border-radius: 8px;
  transition: 0.5s ease-in-out;
}

.croppa-container:hover {
  opacity: 1;
  background-color: #d3d3d3;
  border: 1px solid #d3d3d3;
}
</style>
