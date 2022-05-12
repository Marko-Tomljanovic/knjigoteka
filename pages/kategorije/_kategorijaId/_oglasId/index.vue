<template>
  <b-container fluid>
    <b-row class="m-5">
      <b-col md="auto"
        ><img src="https://picsum.photos/300/450" alt="knjiga"
      /></b-col>
      <b-col class="font">
        <b-row>
          <b-col
            ><h2>{{ oglas.naslov }}</h2></b-col
          >
        </b-row>
        <b-row>
          <b-col
            ><h4>{{ oglas.cijena }} kn</h4>
          </b-col> </b-row
        ><b-row>
          <b-col style="margin-top: 0.9rem"
            >Stanje: {{ oglas.stanje }}
          </b-col> </b-row
        ><b-row>
          <b-col class="mt-1">Uvez: {{ oglas.uvez }} </b-col> </b-row
        ><b-row>
          <b-col class="mt-1"
            >Izdavač: {{ oglas.izdavackaKuca }}
          </b-col> </b-row
        ><b-row>
          <b-col class="mt-1">Jezik: {{ oglas.jezik }} </b-col> </b-row
        ><b-row>
          <b-col class="mt-1">Lokacija: {{ oglas.lokacija }} </b-col> </b-row
        ><b-row>
          <b-col class="mt-1">Broj pregleda: Dodati podatak </b-col> </b-row
        ><b-row>
          <b-col class="mt-4"
            ><b-button
              v-b-tooltip.hover
              title="Dodaj u omiljene"
              class="mr-3"
              variant="outline"
              style="border: solid 1px black"
              ><b-icon icon="heart"></b-icon></b-button
            ><b-button
              disabled
              variant="outline"
              style="border: solid 1px black; width: 2.8rem"
              >5</b-button
            ><b-button class="ml-4 naviButton"
              >Javi se prodavaču</b-button
            ></b-col
          > </b-row
        ><b-row>
          <b-col class="mt-4"
            ><h4 style="margin-bottom: -0.7rem">Opis:</h4>
            <hr />
            <br />
            <p style="margin-top: -1.5rem">{{ oglas.opis }}</p>
          </b-col>
        </b-row></b-col
      ><b-col xcols="3" class="mt-4"
        ><div class="profilK">
          <b-icon class="slikaK" scale="6" icon="person-circle"></b-icon>
          <br />
          <p class="tekstK">
            {{ oglas.imePrezime }} <br /><b-icon icon="geo-alt-fill"></b-icon>
            {{ oglas.lokacija }} <br />
            <b-icon class="mr-1 mt-3" icon="hand-thumbs-up"></b-icon>23<b-icon
              class="ml-3 mr-1"
              icon="hand-thumbs-down"
            ></b-icon
            >50
          </p>
        </div></b-col
      >
    </b-row>
  </b-container>
</template>

<script>
import podaci from "@/store/podaci";
export default {
  data() {
    return {
      oglas: [],
      podaci,
    };
  },

  methods: {
    async ucitaj() {
      try {
        let ref = await this.$fire.firestore
          .collection("kategorije")
          .doc(this.$route.params.kategorijaId)
          .collection("knjige")
          .doc(this.$route.params.oglasId)
          .get();
        this.oglas = ref.data();
        if (!this.oglas) {
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

<style scoped>
.font {
  font-family: "Lucida Console", "Courier New", monospace;
}
.profilK {
  border: solid 1.9px black;
  width: 17.5rem;
  height: 10.1rem;
}
.slikaK {
  margin-left: 8.1rem;
  margin-top: 0.5rem;
}
.tekstK {
  margin-top: 2.5rem;
  text-align: center;
}
.naviButton {
  background: rgb(0, 0, 0);
  border-color: rgb(0, 0, 0);
}
</style>
