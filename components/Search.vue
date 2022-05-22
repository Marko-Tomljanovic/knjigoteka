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
      <b-button class="search_button">Traži</b-button>
    </div>

    <div v-if="show" style="width: 35.8rem" class="bg-white">
      {{ filterKnjiga }}
    </div>
    <div v-if="show1" style="width: 35.8rem" class="bg-white">
      {{ nemaKnjiga }}
      <hr />
    </div>
  </div>
</template>

<script>
import search from "@/static/search.svg";
import podaci from "@/store/podaci";
export default {
  data() {
    return {
      search,
      podaci,
      test: [],
      show: false,
      nemaKnjiga: "",
      show1: false,
    };
  },

  methods: {
    async ucitaj() {
      try {
        const ref = await this.$fire.firestore
          .collection("kategorije")
          .doc("podaci")
          .get();
        this.test = ref.data().knjige;
      } catch (e) {
        console.log(e);
      }
    },
    someHandler() {
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
    },
  },
  computed: {
    filterKnjiga() {
      return this.test.filter((card) =>
        card.naslov.toLowerCase().includes(this.podaci.trazi.toLowerCase())
      );
    },
  },

  mounted() {
    return this.ucitaj();
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
</style>
