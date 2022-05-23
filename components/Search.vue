<template>
  <div class="mx-auto xd-flex justify-content-center">
    <div class="searchbar">
      <input
        @input="someHandler"
        v-model="podaci.trazi"
        class="search_input"
        type="text"
        name=""
        placeholder="Traži po naslovu, autoru..."
      />
      <a href="#" class="search_icon"><img :src="search" alt="search" /></a>
      <b-button @click="to" class="search_button">Traži</b-button>
    </div>
    <transition>
      <div v-if="show" style="width: 35.8rem" class="bg-white mx-auto">
        <h6 class="text-center">
          Pronađeno ukupno |{{ filterKnjiga.length }}| rezultata
        </h6>
        <b-card-group>
          <CardKnjiga
            class="mt-3 m-2 mx-auto"
            v-for="(card, idx) in filterKnjiga.slice(0, 4)"
            :key="idx.naslov"
            :title="card.naslov"
            :id="card.idKnjige"
            :kategorija="card.kategorija"
          />
        </b-card-group>
      </div>
      <div v-if="show1" style="width: 35.8rem" class="bg-white">
        <hr />
        <p class="mt-3">
          {{ nemaKnjiga }}
        </p>
        <hr />
      </div>
    </transition>
    <b-alert
      :show="dismissCountDown"
      fade
      variant="info"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
      >Upisati pravilan naziv
    </b-alert>
    <div
      v-if="show && filterKnjiga.length > 4"
      style="width: 35.8rem"
      class="bg-white"
    >
      <b-button @click="to" variant="outline-dark" class="w-50"
        >vidi više |{{ filterKnjiga.length - 4 }}|</b-button
      >
      <hr />
    </div>
  </div>
</template>

<script>
import search from "@/static/search.svg";
import podaci from "@/store/podaci";
export default {
  props: ["ucitaneKnjige"],
  data() {
    return {
      search,
      podaci,
      show: false,
      nemaKnjiga: "",
      show1: false,
      dismissSecs: 3,
      dismissCountDown: 0,
    };
  },

  methods: {
    someHandler() {
      if (this.$route.path == "/") {
        if (!this.podaci.trazi) {
          this.show = false;
          this.show1 = false;
        } else if (this.filterKnjiga.length == 0) {
          this.show = false;
          this.show1 = true;
          this.nemaKnjiga = `Knjiga "${podaci.trazi}" nije pronađena`;
        } else {
          this.show = true;
          this.show1 = false;
        }
      }
    },
    to() {
      if (this.show) {
        this.dismissCountDown = this.dismissCountDown;
        this.$router.push({
          path: "/pretraga",
          query: { trazi: this.podaci.trazi },
        });
      } else {
        this.dismissCountDown = this.dismissSecs;

        this.showAlert = true;
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
  },
  computed: {
    filterKnjiga() {
      return this.ucitaneKnjige.filter((card) =>
        card.naslov.toLowerCase().includes(this.podaci.trazi.toLowerCase())
      );
    },
  },
  mounted() {
    this.podaci.trazi = "";
  },
};
</script>

<style scoped>
.searchbar {
  margin-bottom: auto;
  margin-top: auto;
  height: 60px;
  background-color: #ffffff;
  padding: 10px;
  box-shadow: 0 3px 11px 0 rgb(194, 189, 189), 0 5px 19px 0 rgb(194, 189, 189);
}

.search_input {
  color: rgb(0, 0, 0);
  border: 0;
  outline: 0;
  background: none;
  width: 0;
  caret-color: transparent;
  line-height: 40px;
  padding: 0 10px;
  width: 450px;
  caret-color: red;
}

.search_icon {
  max-height: 40px;
  width: 40px;
  float: left;
  xdisplay: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: rgb(160, 27, 27);
  text-decoration: none;
  background: white;
}
.search_button {
  height: 25px;
  float: right;
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  margin-right: 0.3rem;
  align-items: center;
  text-decoration: none;
  font-family: "Inconsolata, sans-serif";
  background: rgb(0, 0, 0);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.6s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
