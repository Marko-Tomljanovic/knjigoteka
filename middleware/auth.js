export default async function ({ route, redirect, store, app }) {
  if (store.state.userData && !store.state.userDataF) {
    try {
      const us = await app.$fire.firestore
        .collection("users")
        .doc(store.state.userData.uid)
        .get();
      store.commit("setUserDataF", us.data());
    } catch (e) {
      console.log(e);
    }
  }
  console.log(route.path);
  if (
    (!store.state.userData && route.path === "/novaknjiga") ||
    (!store.state.userData && route.path.includes("profil"))
  ) {
    return redirect("/prijava");
  } else if (
    (store.state.userData && route.path === "/prijava") ||
    (store.state.userData && route.path === "/registracija")
  ) {
    return redirect("/");
  } else if (
    store.state.userData &&
    route.params?.idProdavaca === store.state.userData.uid
  ) {
    return redirect(`/profil/${store.state.userData.uid}`);
  }
  //  else if(store.state.podKategorija){alert("uspio sam")}
}

// export default function ({ route, redirect, store }) {
//   if (route.path === "/" || route.path === "/Povijest") return;

//   if (!store.state.userData && route.path !== "/prijava") {
//     return redirect("/prijava");
//   } else if (route.path === "/prijava" && store.state.userData) {
//     return redirect("/");
//   }
// }
