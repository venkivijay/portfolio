import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
  scrollBehavior: (to, _, savedPosition) => {
    if (savedPosition) return savedPosition;
    if (to.hash === document.querySelector(".header-anchor")?.hash)
      return { top: 0 };
    if (to.hash) return { el: to.hash };
    return { top: 0 };
  },
};
