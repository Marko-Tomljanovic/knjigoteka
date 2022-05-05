// import store from "@/store/index";
export default function ({ route, redirect, store }) {
  if (route.path === "/" || route.path === "/Povijest") return;

  if (!store.state.userData && route.path !== "/prijava") {
    return redirect("/prijava");
  } else if (route.path === "/prijava" && store.state.userData) {
    return redirect("/");
  }
}
