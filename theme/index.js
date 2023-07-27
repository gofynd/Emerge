import Home from "./templates/pages/home.vue";
import Footer from "./templates/components/footer.vue";
import Header from "./templates/components/header.vue";
import Loader from "./templates/components/loader.vue";

import styles from "./global/head.less";
import CustomTemplates from "./custom-templates";
import sections from "./sections";

export default {
  // Main chunk
  getFooter: () => Footer,
  getHeader: () => Header,
  getHome: () => Home,
  getEmptyState: () => null,
  getLoader: () => Loader,

  getScreenSaver: () =>
    import(
      /*webpackChunkName:"extras" */ "./templates/components/screen-saver.vue"
    ),
  getFaq: () =>
    import(/*webpackChunkName:"extras" */ "./templates/pages/faq.vue"),

  getBrands: () =>
    import(/* webpackChunkName:"products" */ "./templates/pages/brands.vue"),
  getCategories: () =>
    import(
      /* webpackChunkName:"products" */ "./templates/pages/categories.vue"
    ),
  getCollections: () =>
    import(
      /* webpackChunkName:"products" */ "./templates/pages/collections.vue"
    ),
  getProductDescription: () =>
    import(
      /* webpackChunkName:"products" */ "./templates/pages/product-description.vue"
    ),
  getCompareProducts: () =>
    import(
      /* webpackChunkName:"products" */ "./templates/pages/compare-products.vue"
    ),

  getProductListing: () =>
    import(
      /* webpackChunkName:"products-listing" */ "./templates/pages/product-listing.vue"
    ),
  getCollectionListing: () =>
    import(
      /* webpackChunkName:"products-listing" */ "./templates/pages/collection-listing.vue"
    ),
  getBrandListing: () =>
    import(
      /* webpackChunkName:"products-listing" */ "./templates/pages/brand-listing.vue"
    ),
  getCategoryListing: () =>
    import(
      /* webpackChunkName:"products-listing" */ "./templates/pages/category-listing.vue"
    ),
  getWishList: () =>
    import(/* webpackChunkName:"profile" */ "./templates/pages/wishlist.vue"),
  
  getCustomTemplates: () => {
    return CustomTemplates;
  },
  sections,
};
