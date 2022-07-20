export default {
  state() {
    return {
      userData: null,
      userDataF: null,
      podKategorija: [],
      oglas: [],
      oznacenoO: false,
      ukOmiljene: 0,
      poruke: null,
     };
  },

  getters: {},

  mutations: {
    clearUserData(state) {
      state.userData = null;
    },
    setUserData(state, payload) {
      state.userData = payload;
    },
    setUserDataF(state, payload) {
      state.userDataF = payload;
    },
    setOglas(state, payload) {
      state.oglas = payload;
    },
    setOznacenoO(state, payload) {
      state.oznacenoO = payload;
    },
    setUkOmiljene(state, payload) {
      state.ukOmiljene = payload;
    },
    setPodKategorija(state, payload) {
      state.podKategorija = payload;
    },
    setPoruke(state, payload) {
      state.poruke = payload;
    },
    sortPoruke(state) {
      console.log('running mutation');
      const jobs = this.state.poruke;
      jobs.sort((a, b) => {
          let compare = 0;
          if (a["vrijeme"] > b["vrijeme"]) {
              compare = 1;
          } else if (b["vrijeme"] > a["vrijeme"]) {
              compare = -1;
          }
          return compare;
      });
      state.poruke = jobs;
  }

  },
  actions: {
    onAuthStateChangedAction: ({ commit }, { authUser }) => {
      if (!authUser) {
        commit("clearUserData");
      } else {
        try {
          const userJson = JSON.parse(JSON.stringify(authUser));
          commit("setUserData", userJson);
        } catch (e) {
          console.log(e);
        }
      }
    },
    callSortPoruke({commit}){
      console.log("marko");
      commit("sortPoruke")
    }
  },
};
