<template>
  <b-container fluid>
    <b-row class="m-4">
      <b-col md="auto"
        ><img src="https://picsum.photos/300/450" alt="knjiga"
      /></b-col>
      <b-col class="fontC">
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
          <b-col style="margin-top: 0.8rem"
            >Autor: {{ oglas.autor }}
          </b-col> </b-row
        ><b-row>
          <b-col class="mt-1"
            >Izdavač: {{ oglas.izdavackaKuca }}
          </b-col> </b-row
        ><b-row>
          <b-col class="mt-1">Uvez: {{ oglas.uvez }} </b-col> </b-row
        ><b-row>
          <b-col class="mt-1">Jezik: {{ oglas.jezik }} </b-col> </b-row
        ><b-row>
          <b-col class="mt-1">Stanje: {{ oglas.stanje }} </b-col> </b-row
        ><b-row>
          <b-col class="mt-1"
            >Kategorija: {{ $route.params.kategorijaId }}
          </b-col> </b-row
        ><b-row>
          <b-col class="mt-1">Broj pregleda: Dodati (analytics) </b-col> </b-row
        ><b-row>
          <b-col class="mt-4"
            ><b-button
              v-b-tooltip.hover
              @click="dodajOmiljene"
              :title="oznacenoO ? 'Obriši iz omiljenih' : 'Dodaj u omiljene'"
              class="mr-3"
              :class="oznacenoO ? 'naviButton' : ''"
              variant="outline"
              style="border: solid 1px black"
              ><b-icon
                :variant="oznacenoO ? 'white ' : ''"
                icon="heart"
              ></b-icon></b-button
            ><b-button
              disabled
              variant="outline"
              style="border: solid 1px black; width: 2.8rem"
              >{{ ukOmiljene }}</b-button
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
      ><b-col xcols="3" class="mt-4 fluid"
        ><div class="profilK text-center">
          <b-icon scale="6" icon="person-circle"></b-icon>
          <br />
          <p class="tekstK">
            {{ oglas.imePrezime }} <br /><b-icon icon="geo-alt-fill"></b-icon>
            {{ oglas.lokacija }} <br />
            <b-icon class="mr-1 mt-3" icon="hand-thumbs-up"></b-icon>54<b-icon
              class="ml-3 mr-1"
              icon="hand-thumbs-down"
            ></b-icon
            >21
          </p>
        </div>
        <div class="fontC mt-4">
          <h4>Podjeli oglas</h4>
          <br /><b-button v-b-tooltip.hover title="Facebook" variant="outline">
            <b-icon scale="2.1" icon="facebook" variant="primary"></b-icon
          ></b-button>
          <b-button
            :href="`https://web.whatsapp.com/send?text=http:/localhost:3000${this.$route.fullPath}`"
            target="_blank"
            data-action="share/whatsapp/share"
            v-b-tooltip.hover
            title="WhatsApp"
            class="rounded-circle px-2"
            variant="success"
            ><img :src="whatsapp" alt="whatsapp" /> </b-button
          ><b-button
            :href="`mailto:?subject=${'Pogledaj oglas na Knjigoteci!'}&body=${'Pročitj kako bi pričitao :)'}%0D%0A%0D%0A<a>http:/localhost:3000${
              this.$route.fullPath
            }</a>`"
            v-b-tooltip.hover
            title="Pošalji email"
            variant="outline"
          >
            <b-icon
              scale="1"
              style="height: 2.8rem; width: 2.88rem"
              icon="envelope-open"
              class="rounded-circle bg-info p-2"
              variant="light"
            ></b-icon
          ></b-button>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import podaci from "@/store/podaci";
import whatsapp from "@/static/svg/whatsapp.svg";
export default {
  head() {
    return {
      title: this.$route.params.kategorijaId + " | " + this.oglas.naslov,
    };
  },
  data() {
    return {
      oglas: [],
      podaci,
      oznacenoO: false,
      ukOmiljene: 0,
      whatsapp,
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
        if (this.$store.state.userData) {
          this.oznacenoO = ref
            .data()
            .omiljene.includes(this.$store.state.userData.uid);
        }
        this.ukOmiljene = ref.data().omiljene.length;
        if (!this.oglas) {
          this.$router.replace({ path: "/errorPage" });
        }
      } catch (e) {
        console.log(e);
        this.$router.replace({ path: "/errorPage" });
      }
    },
    async dodajOmiljene() {
      if (this.$store.state.userData) {
        const ref = await this.$fire.firestore
          .collection("kategorije")
          .doc(this.$route.params.kategorijaId)
          .collection("knjige")
          .doc(this.$route.params.oglasId);
        const refU = await this.$fire.firestore
          .collection("users")
          .doc(this.$store.state.userData.uid);
        const marko = this.$fireModule.firestore.FieldValue;
        if (this.oznacenoO) {
          ref
            .update({
              omiljene: marko.arrayRemove(this.$store.state.userData.uid),
            })
            .then(() => {
              refU
                .update({
                  omiljeneK: marko.arrayRemove({
                    idKnjige: this.oglas.id,
                    naslov: this.oglas.naslov,
                    kategorija: this.oglas.kategorija,
                  }),
                })
                .then(() => {
                  this.ucitaj();
                });
            });
        } else {
          ref
            .update({
              omiljene: marko.arrayUnion(this.$store.state.userData.uid),
            })
            .then(() => {
              refU
                .update({
                  omiljeneK: marko.arrayUnion({
                    idKnjige: this.oglas.id,
                    naslov: this.oglas.naslov,
                    kategorija: this.oglas.kategorija,
                  }),
                })
                .then(() => {
                  this.ucitaj();
                });
            });
        }
      } else {
        alert("Prijavi se za dodavanje knjiga u omiljene!");
      }
    },
  },
  mounted() {
    this.ucitaj();
  },
};
</script>

<style scoped>
.profilK {
  border: solid 1.9px black;
  width: 24rem;
  height: auto;
}
.tekstK {
  margin-top: 2.5rem;
}
.naviButton {
  background: rgb(0, 0, 0);
  border-color: rgb(0, 0, 0);
}
</style>
