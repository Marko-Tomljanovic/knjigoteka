<template>
  <div>
    <b-navbar toggleable="lg" type="dark" style="background-color: orange">
      <b-navbar-brand to="/">Knjigoteka</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
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
              class="my-2 my-sm-0"
              type="button"
              to="prijava"
              variant="success"
              >Prijava</b-button
            ><b-button
              v-if="!this.$store.state.userData"
              class="ml-1 my-2 my-sm-0"
              type="button"
              to="registracija"
              variant="success"
              >Registracija</b-button
            >
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    odjava() {
      console.log("signOut");
      this.$fire.auth.signOut();
    },
  },
};
</script>
