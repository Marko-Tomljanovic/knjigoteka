<template>
  <div>
    <b-tab :title="ime" @click="removeNotifikacija(ime)"
      ><b-card-text>
        <p
          v-for="(card, idx) in poruka"
          :key="idx"
          :class="
            card.ime === $store.state.userDataF.imePrezime
              ? 'colorPorukaJ'
              : 'colorPoruka'
          "
        >
          <span class="text-muted" style="font-size: 13px"
            >{{ card.ime }} - {{ $moment(card.vrijeme).format("LLL") }}</span
          >
          <br />{{ card.poruka }}
        </p>
      </b-card-text>
      <b-input class="rounded-pill" v-model="porukaChild"></b-input
      ><b-button
        class="naviButton mt-3"
        @click="
          $emit(
            'posaljiPoruku',
            filterPrimateljId,
            filterPrimateljIme,
            porukaChild
          );
          clearInput();
        "
        >Pošalji
        <b-spinner v-if="showSpinner" class="ml-2" small type="grow"></b-spinner
      ></b-button>
    </b-tab>
  </div>
</template>

<script>
export default {
  name: "poruka",
  props: ["ime", "poruka"],
  emits: ["posaljiPoruku"],
  data() {
    return {
      porukaChild: "",
      showSpinner: false,
    };
  },
  methods: {
    clearInput() {
      this.showSpinner = true;
      setTimeout(() => {
        this.porukaChild = "";
        this.showSpinner = false;
      }, "750");
    },
    async removeNotifikacija(ime) {
      if (this.$store.state.userDataF.notifikacija.includes(ime)) {
        try {
          const ref = await this.$fire.firestore
            .collection("users")
            .doc(this.$store.state.userData.uid);
          ref.update({
            notifikacija:
              this.$fireModule.firestore.FieldValue.arrayRemove(ime),
          });
          const refGet = await this.$fire.firestore
            .collection("users")
            .doc(this.$store.state.userData.uid)
            .get();

          this.$store.commit("setUserDataF", refGet.data());
        } catch (e) {
          console.log(e);
        }
      }
    },
  },
  computed: {
    filterPrimateljId() {
      let findId = this.poruka.find(
        (x) => x.idKorisnika === this.$store.state.userData?.uid
      )?.idPrimatelj;
      if (findId) {
        return findId;
      } else {
        return this.poruka.find(
          (x) => x.idKorisnika != this.$store.state.userData?.uid
        ).idKorisnika;
      }
    },

    filterPrimateljIme() {
      let findIme = this.poruka.find(
        (x) => x.idKorisnika === this.$store.state.userData?.uid
      )?.imePrimatelja;
      if (findIme) {
        return findIme;
      } else {
        return this.poruka.find(
          (x) => x.idKorisnika != this.$store.state.userData?.uid
        ).ime;
      }
    },
  },
};
</script>

<style scoped>
.colorPoruka {
  background-color: rgb(243, 241, 241);
  border-radius: 5rem;
  margin-left: 1rem;
  padding: 0.8rem;
}
.colorPorukaJ {
  background-color: rgb(232, 244, 255);
  border-radius: 5rem;
  padding: 0.85rem;
}
.naviButton {
  height: 25px;
  background: rgb(0, 0, 0);
  border-color: rgb(0, 0, 0);
  padding-bottom: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
