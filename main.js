var app = new Vue({
  el: "#app",
  data: {
    brand: "Vue Mastery",
    product: "Socks",
    description: "great",
    selectedVariant: 0,
    inventory: 0,
    details: ["80% cotton", "20% polyester", "only men"],
    cart: 0,
    variants: [
      {
        variantId: 2234,
        variantColor: "green",
        variantImage: "vmSocks-green-onWhite.jpg",
        variantQuantity: 0,
      },
      {
        variantId: 1112,
        variantColor: "blue",
        variantImage: "vmSocks-blue-onWhite.jpg",
        variantQuantity: 10,
      },
    ],
  },
  methods: {
    addToCart: function () {
      this.cart++;
    },
    updateProduct: function (index) {
      this.selectedVariant = index;
    },
  },
  // computeds are cached so more performant if data may stay the same for a period of time
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
  },
});
