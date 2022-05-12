export default function ({ route, redirect, store }) {
  if (
    (!store.state.userData && route.path === "/novaknjiga") ||
    route.path === "/profil/profilId"
  ) {
    return redirect("/prijava");
  } else if (
    (store.state.userData && route.path === "/prijava") ||
    route.path === "/registracija"
  ) {
    return redirect("/");
  }
}

// export default function ({ route, redirect, store }) {
//   if (route.path === "/" || route.path === "/Povijest") return;

//   if (!store.state.userData && route.path !== "/prijava") {
//     return redirect("/prijava");
//   } else if (route.path === "/prijava" && store.state.userData) {
//     return redirect("/");
//   }
// }
