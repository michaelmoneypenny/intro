var app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
    description: "great",
    image: "vmSocks-green-onWhite.jpg",
    inventory: 0,
    details: ["80% cotton", "20% polyester", "only men"],
    cart: 0,
    variants: [
      {
        variantId: 2234,
        variantColor: "green",
        variantImage: "vmSocks-green-onWhite.jpg",
      },
      {
        variantId: 1112,
        variantColor: "blue",
        variantImage: "vmSocks-blue-onWhite.jpg",
      },
    ],
  },
  methods: {
    addToCart: function () {
      this.cart++;
    },
    updateProduct: function (image) {
      this.image = image;
    },
  },
});
