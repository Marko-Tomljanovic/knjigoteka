<template>
  <b-container class="mt-3">
    <b-form @submit.prevent="uploadSlika">
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
      <b-row>
        <b-col
          ><croppa
            v-model="myCroppa"
            :prevent-white-space="true"
            :width="176"
            :height="224"
            :placeholder="'Odaberite sliku oglasa'"
            placeholder-color="#000"
            :placeholder-font-size="16"
            canvas-color="transparent"
            :show-remove-button="true"
            remove-button-color="black"
            :remove-button-size="30"
            :show-loading="true"
            :loading-size="50"
            loading-color="#606060"
          >
          </croppa
        ></b-col>
        <b-col lg="8"
          ><b-alert class="mt-3" :show="!slikaNull" :fade="true"
            >Podesiti okvir slike prije učitavanja.</b-alert
          ></b-col
        >
      </b-row>
      <b-button type="submit" variant="primary"
        >Submit <b-spinner v-if="buttonSpinnerUcitavanjeSlike" small></b-spinner
      ></b-button>
    </b-form>
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
      buttonSpinnerUcitavanjeSlike: false,
    };
  },
  methods: {
    async uploadPodataka() {
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
      refKnjiga
        .doc(id)
        .set({
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
          slikaProfilaURL: this.$store.state.userDataF.slikaProfilaURL,
        })
        .then(() => {
          this.buttonSpinnerUcitavanjeSlike = false;
        })
        .catch((e) => {
          console.log(e);
        });
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
      if (!this.praznoPolje) {
        alert("potrebno upisati podatke");
      } else {
        this.buttonSpinnerUcitavanjeSlike = true;
        this.myCroppa.generateBlob((blobData) => {
          let imgName =
            "oglasi/" +
            this.$store.state.userDataF.imePrezime +
            "/" +
            this.naslov +
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
            .then(() => {
              this.uploadPodataka();
            })
            .catch((e) => {
              console.log(e);
            });
        });
      }
    },
  },
  computed: {
    scehuledFunction() {
      return this.compliteImgUpload ? true : false;
    },
    slikaNull() {
      return this.myCroppa.img === null;
    },
    praznoPolje() {
      if (
        this.cijena &&
        this.naslov &&
        this.izdavackaKuca &&
        this.godinaIzdanja &&
        this.jezik &&
        this.autor &&
        this.opis &&
        this.kategorijaO &&
        this.stanjeO &&
        this.uvezO &&
        this.obj &&
        this.podaci &&
        this.profilKorisnika &&
        !this.slikaNull
      ) {
        return true;
      } else {
        return false;
      }
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
