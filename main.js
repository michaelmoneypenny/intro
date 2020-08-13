var app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
    description: "great",
    image: "vmSocks-green-onWhite.jpg",
    inventory: 10,
    details: ["80% cotton", "20% polyester", "only men"],
    variants: [
      { variantId: 2234, variantColor: "green" },
      { variantId: 1112, variantColor: "blue" },
    ],
  },
});
