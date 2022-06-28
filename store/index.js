export default {
  state() {
    return {
      userData: null,
      userDataF: null,
      podKategorija: [],
      oglas: [],
      oznacenoO: false,
      ukOmiljene: 0,
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
  },
};
