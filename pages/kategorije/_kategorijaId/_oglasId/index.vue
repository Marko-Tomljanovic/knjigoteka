<template>
  <b-container fluid>
    <b-row class="m-4">
      <b-col md="auto"
        ><img :src="$store.state.oglas.imgURL" alt="knjiga"
      /></b-col>
      <b-col class="fontC">
        <b-row>
          <b-col
            ><h2>{{ $store.state.oglas.naslov }}</h2></b-col
          >
        </b-row>
        <b-row>
          <b-col
            ><h4>{{ $store.state.oglas.cijena }} kn</h4>
          </b-col> </b-row
        ><b-row>
          <b-col style="margin-top: 0.8rem"
            >Autor: {{ $store.state.oglas.autor }}
          </b-col> </b-row
        ><b-row>
          <b-col class="mt-1"
            >Izdavač: {{ $store.state.oglas.izdavackaKuca }}
          </b-col> </b-row
        ><b-row>
          <b-col class="mt-1"
            >Uvez: {{ $store.state.oglas.uvez }}
          </b-col> </b-row
        ><b-row>
          <b-col class="mt-1"
            >Jezik: {{ $store.state.oglas.jezik }}
          </b-col> </b-row
        ><b-row>
          <b-col class="mt-1"
            >Stanje: {{ $store.state.oglas.stanje }}
          </b-col> </b-row
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
              :title="
                $store.state.oznacenoO
                  ? 'Obriši iz omiljenih'
                  : 'Dodaj u omiljene'
              "
              class="mr-3"
              :class="$store.state.oznacenoO ? 'naviButton' : ''"
              variant="outline"
              style="border: solid 1px black"
              ><b-icon
                :variant="$store.state.oznacenoO ? 'white ' : ''"
                icon="heart"
              ></b-icon></b-button
            ><b-button
              disabled
              variant="outline"
              style="border: solid 1px black; width: 2.8rem"
              >{{ $store.state.ukOmiljene }}</b-button
            ><b-button
              v-if="!buttonMojOglas"
              v-b-modal.modal-prevent-closing
              class="ml-4 naviButton"
              >Javi se prodavaču</b-button
            ><modal-poruka
          /></b-col> </b-row
        ><b-row>
          <b-col class="mt-4"
            ><h4 style="margin-bottom: -0.7rem">Opis:</h4>
            <hr />
            <br />
            <p style="margin-top: -1.5rem">{{ $store.state.oglas.opis }}</p>
          </b-col>
        </b-row></b-col
      ><b-col class="mt-4 fluid"
        ><div class="profilK text-center">
          <b-img
            style="margin-top: -2.1rem; margin-bottom: -1.9rem"
            :src="$store.state.oglas.slikaProfilaURL"
            fluid
            alt="Profil Image"
            rounded="circle"
          ></b-img>
          <div class="tekstK">
            <nuxt-link
              :to="`/info-prodavac/${$store.state.oglas.idKorisnika}`"
              class="darko"
              >{{ $store.state.oglas.imePrezime }} </nuxt-link
            ><br /><b-icon icon="geo-alt-fill"></b-icon>
            {{ $store.state.oglas.lokacija }} <br />
            <nuxt-link
              :to="{
                path: `/info-prodavac/${$store.state.oglas.idKorisnika}`,
                query: { tab: true },
              }"
              class="darko"
            >
              <span v-if="showNuxtLink">
                <b-icon class="mr-1 mt-3" icon="hand-thumbs-up"></b-icon
                >Pogledaj ocjene</span
              >
            </nuxt-link>
            <p v-if="!showNuxtLink">Moj oglas</p>
          </div>
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
      title:
        this.$route.params.kategorijaId +
        " | " +
        this.$store.state.oglas.naslov,
    };
  },
  data() {
    return {
      podaci,
      whatsapp,
    };
  },
  async asyncData({ app, store, params, redirect }) {
    try {
      let ref = await app.$fire.firestore
        .collection("kategorije")
        .doc(params.kategorijaId)
        .collection("knjige")
        .doc(params.oglasId)
        .get();
      store.commit("setOglas", ref.data());
      if (store.state.userData) {
        store.commit(
          "setOznacenoO",
          ref.data().omiljene.includes(store.state.userData.uid)
        );
      }
      store.commit("setUkOmiljene", ref.data().omiljene.length);

      if (!store.state.oglas) {
        redirect({ path: "/errorPage" });
      }
    } catch (e) {
      console.log(e);
      redirect({ path: "/errorPage" });
    }
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
        this.$store.commit("setOglas", ref.data());

        if (this.$store.state.userData) {
          this.$store.commit(
            "setOznacenoO",
            ref.data().omiljene.includes(this.$store.state.userData.uid)
          );
        }
        this.$store.commit("setUkOmiljene", ref.data().omiljene.length);
        if (!this.$store.state.oglas) {
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
        if (this.$store.state.oznacenoO) {
          ref
            .update({
              omiljene: marko.arrayRemove(this.$store.state.userData.uid),
            })
            .then(() => {
              refU
                .update({
                  omiljeneK: marko.arrayRemove({
                    idKnjige: this.$store.state.oglas.id,
                    naslov: this.$store.state.oglas.naslov,
                    kategorija: this.$store.state.oglas.kategorija,
                    imgURL: this.$store.state.oglas.imgURL,
                  }),
                })
                .then(() => {
                  this.ucitaj();
                })
                .catch((e) => {
                  console.log(e);
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
                    idKnjige: this.$store.state.oglas.id,
                    naslov: this.$store.state.oglas.naslov,
                    kategorija: this.$store.state.oglas.kategorija,
                    imgURL: this.$store.state.oglas.imgURL,
                  }),
                })
                .then(() => {
                  this.ucitaj();
                })
                .catch((e) => {
                  console.log(e);
                });
            });
        }
      } else {
        alert("Prijavi se za dodavanje knjiga u omiljene!");
      }
    },
  },
  computed: {
    showNuxtLink() {
      return !(
        this.$store.state.userData?.uid === this.$store.state.oglas?.idKorisnika
      );
    },
    buttonMojOglas() {
      return (
        this.$store.state.userData?.uid === this.$store.state.oglas?.idKorisnika
      );
    },
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
.darko {
  color: black;
}
.naviButton {
  background: rgb(0, 0, 0);
  border-color: rgb(0, 0, 0);
}
</style>
