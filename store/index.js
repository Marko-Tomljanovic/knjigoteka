export default {
  state() {
    return {
      userData: null,
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
