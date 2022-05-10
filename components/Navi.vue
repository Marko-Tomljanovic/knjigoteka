<template>
  <div>
    <b-navbar
      class="sticky-top"
      :class="var1 ? 'naslovna' : 'ostali'"
      toggleable="lg"
      :type="var1 ? 'dark' : 'light'"
    >
      <b-navbar-brand class="font" to="/"
        ><img :src="logo" alt="logo" /> Knjigoteka</b-navbar-brand
      >

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Kotnakt</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-button
              class="my-2 my-sm-0 mr-1 naviButton"
              type="button"
              to="/kategorije"
              >Kategorije</b-button
            >
            <b-button
              v-if="this.$store.state.userData"
              size="sm"
              class="my-2 my-sm-0"
              type="button"
              @click="odjava"
              >Odjava</b-button
            >
            <b-button
              v-if="!this.$store.state.userData"
              class="my-1 my-sm-0 naviButton"
              type="button"
              to="prijava"
              >Prijavi se</b-button
            ><b-button
              v-if="!this.$store.state.userData"
              class="ml-1 my-2 my-sm-0 naviButton"
              type="button"
              to="registracija"
              >Registracija</b-button
            >
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import logo from "@/static/logo.svg";
export default {
  data() {
    return { logo };
  },
  methods: {
    odjava() {
      console.log("signOut");
      this.$fire.auth.signOut();
    },
  },
  computed: {
    var1() {
      return this.$route.name.includes("index");
    },
  },
};
</script>

<style scoped>
.font {
  font-family: "Inika", sans-serif;
}
.naviButton {
  height: 25px;
  background: rgb(0, 0, 0);
  border-color: rgb(0, 0, 0);
  padding-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Inika", sans-serif;
}
.naslovna {
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
}
.ostali {
  background-color: white;
  color: black;
  border-bottom: 1px solid #c4c4c4;
}
</style>
