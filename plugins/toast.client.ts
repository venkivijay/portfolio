import * as vt from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
  timeout: 5_000,
  position: "bottom-right",
  maxToasts: 3,
  showCloseButtonOnHover: true,
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vt.default, options);
  return {
    provide: {
      toast: vt.useToast(),
    },
  };
});
