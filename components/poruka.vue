<template>
  <div>
    <b-tab
      :title="ime"
      @click="removeNotifikacija(ime)"
      :title-link-class="classNovaPoruka ? 'text-warning' : ''"
    >
      <b-button
        v-if="manjePoruka && !hideSpinnerUcitajPoruke"
        class="buttonUcitajPet mx-auto mb-2"
        variant="outline-dark"
        @click="dodajPet(poruka)"
        >Učitaj još 5
      </b-button>
      <div class="text-center">
        <b-spinner
          v-if="hideSpinnerUcitajPoruke"
          class="mb-1"
          style="width: 2.5rem; height: 2.5rem"
          type="grow"
        ></b-spinner>
      </div>
      <b-card-text>
        <p
          v-for="(card, idx) in porukaSlice"
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
      <b-input
        @keyup.enter="
          $emit(
            'posaljiPoruku',
            filterPrimateljId,
            filterPrimateljIme,
            porukaChild
          );
          clearInput();
        "
        autocomplete="off"
        class="rounded-pill"
        v-model="porukaChild"
        :disabled="disableInuptButton"
      ></b-input
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
        :disabled="disableInuptButton"
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
      brPoruka: 5,
      hideSpinnerUcitajPoruke: false,
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
      if (this.classNovaPoruka) {
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
    dodajPet(porukeKorisnika) {
      if (porukeKorisnika.length >= this.brPoruka) {
        this.hideSpinnerUcitajPoruke = true;
        setTimeout(() => {
          this.brPoruka += 5;
          this.hideSpinnerUcitajPoruke = false;
        }, "850");
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
    classNovaPoruka() {
      return this.$store.state.userDataF.notifikacija?.includes(this.ime);
    },
    porukaSlice() {
      return this.poruka.slice(Math.max(this.poruka.length - this.brPoruka, 0));
    },
    manjePoruka() {
      return this.poruka.length > this.brPoruka;
    },
    disableInuptButton() {
      if (
        this.poruka[this.poruka.length - 1].idKorisnika.includes(
          "sustavKnjigoteka"
        )
      ) {
        return true;
      } else {
        return false;
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
.buttonUcitajPet {
  height: 25px;
  xbackground: rgb(0, 0, 0);
  xborder-color: rgb(0, 0, 0);
  padding-bottom: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
