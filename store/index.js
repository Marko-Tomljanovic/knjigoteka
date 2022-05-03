export default {
  state() {
    return {
      userData: null,
      jedan: "dva",
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
    async mm({ commit, state, rootState }, userId) {
      const ref = this.$fire.firestore.collection("users").doc(userId);
      try {
        await exerciseRef.update({
          [`randomFoo.FooFoo`]: this.$fireModule.firestore.FieldValue.delete(),
        });
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },
};
