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
    setUserDataFtamnaTema(state, payload) {
      state.userDataF.postavke.tamnaTema = payload;
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
      var myArray = Object.entries(payload)
      // myArray = myArray.sort((a, b) => {
      //   if (a[0] < b[0]) return -1;
      //   if (a[0] > b[0]) return 1;
      //   return 0;
      // });
      myArray = myArray.sort((a, b) => {
        const indexA = a[1].length - 1
        const indexB = b[1].length - 1
       if (a[1][indexA].vrijeme > b[1][indexB].vrijeme) return -1;
       if (a[1][indexA].vrijeme < b[1][indexB].vrijeme) return 1;
       return 0;
      })
      state.poruke = myArray;
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
    callSortPoruke({commit}){
      
      commit("sortPoruke")
    }
  },
};
