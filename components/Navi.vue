<template>
  <div>
    <b-navbar
      class="sticky-top"
      :class="var1 ? 'naslovna' : tamnaTemaStyleOstali"
      toggleable="lg"
      :type="var1 ? 'dark' : tamnaTemaStyleLight"
    >
      <b-navbar-brand class="font" to="/"
        ><img :src="logo" alt="logo" /> Knjigoteka</b-navbar-brand
      >

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/forum">Forum</b-nav-item>
          <b-nav-item to="/">Kontakt</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-button
              class="my-2 my-sm-0 mr-1"
              :class="
                var1
                  ? 'naviButtonNaslovna '
                  : tamnaTemaTemp
                  ? 'naviButtonNaslovna'
                  : 'naviButton'
              "
              type="button"
              to="/kategorije"
              >Kategorije</b-button
            >

            <b-button
              v-if="!this.$store.state.userData"
              class="my-1 my-sm-0 naviButton"
              type="button"
              to="/prijava"
              >Prijavi se</b-button
            ><b-button
              v-if="!this.$store.state.userData"
              class="ml-1 my-2 my-sm-0 naviButton"
              type="button"
              to="/registracija"
              >Registracija</b-button
            >
            <b-button
              v-if="this.$store.state.userData"
              :to="`/profil/${this.$store.state.userData.uid}/poruke`"
              id="porukeN"
              variant="outline"
              class="ml-1"
              style="margin-right: -0.4rem"
              ><b-icon
                :style="
                  var1 ? 'color: #ffffff' : tamnaTemaStyleButtonPorukaProfil
                "
                scale="1.6"
                :icon="notPor ? 'envelope' : 'envelope-open'"
              ></b-icon
              ><b-badge v-if="notPor" pill variant="danger">{{
                notifikacijaCall.length
              }}</b-badge> </b-button
            ><b-tooltip
              target="porukeN"
              :variant="notPor ? 'primary' : ''"
              :title="
                notPor
                  ? 'Nove poruke od ' + notifikacijaCall
                  : 'Nema novih poruka'
              "
            ></b-tooltip>
            <b-dropdown
              v-if="this.$store.state.userData"
              variant="outline"
              toggle-class="text-decoration-none"
              no-caret
              right
            >
              <template #button-content>
                <b-icon
                  :style="
                    var1 ? 'color: #ffffff' : tamnaTemaStyleButtonPorukaProfil
                  "
                  class="mr-1"
                  icon="person-circle"
                  font-scale="2.4"
                  aria-hidden="true"
                ></b-icon>
              </template>
              <b-dropdown-item :to="`/profil/${this.$store.state.userData.uid}`"
                ><b-icon class="mr-2" icon="person-lines-fill"></b-icon>
                Profil</b-dropdown-item
              >
              <b-dropdown-item
                :to="`/profil/${
                  this.$store.state.userData.uid
                }/${this.$store.state.userData.uid.substr(-5)}`"
                ><b-icon class="mr-2" icon="heart"></b-icon>
                Omiljene</b-dropdown-item
              >
              <b-dropdown-item to="/novaknjiga"
                ><b-icon class="mr-2" icon="journal-plus"></b-icon> Dodaj
                knjigu</b-dropdown-item
              >
              <b-dropdown-item to="/profil/postavke"
                ><b-icon class="mr-2" icon="gear"></b-icon>
                Postavke</b-dropdown-item
              >
              <hr />
              <b-dropdown-item @click="odjava" variant="danger"
                ><b-icon class="mr-2" icon="box-arrow-right"></b-icon> Odjavi
                se</b-dropdown-item
              >
            </b-dropdown>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse> </b-navbar
    ><b-alert
      :show="dismissCountDown"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
      variant="info"
      >Info Alert</b-alert
    >
  </div>
</template>

<script>
import logo from "@/static/svg/logo.svg";
export default {
  data() {
    return { logo, dismissSecs: 5, dismissCountDown: 0 };
  },
  methods: {
    odjava() {
      console.log("signOut");
      this.$fire.auth.signOut().then(() => {
        location
          .reload()
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            this.dismissCountDown = this.dismissSecs;
          });
      });
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
  },
  computed: {
    var1() {
      return this.$route.name.includes("index");
    },
    tamnaTemaTemp() {
      return this.$store.state.userDataF.postavke?.tamnaTema;
    },
    notPor() {
      return this.$store.state.userDataF?.notifikacija?.length > 0
        ? true
        : false;
    },
    notifikacijaCall() {
      return this.$store.state.userDataF?.notifikacija;
    },
    tamnaTemaStyleOstali() {
      if (this.$store.state.userDataF) {
        return this.tamnaTemaTemp ? "tamnaTemaStyle" : "ostali";
      } else {
        ("ostali");
      }
    },
    tamnaTemaStyleLight() {
      if (this.$store.state.userDataF) {
        return this.tamnaTemaTemp ? "dark" : "light";
      } else {
        ("light");
      }
    },
    tamnaTemaStyleButtonPorukaProfil() {
      if (this.$store.state.userDataF) {
        return this.tamnaTemaTemp ? "color:white" : "";
      } else {
        ("");
      }
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
.naviButtonNaslovna {
  height: 25px;
  background: rgb(255, 255, 255);
  border-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
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
.tamnaTemaStyle {
  background-color: black;
  color: white;
  border-bottom: 1px solid #c4c4c4;
}
</style>
