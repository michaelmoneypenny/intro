Vue.component("detail", {
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  template: `<ul>
  <li v-for="detail in list">{{detail}}</li>
</ul>`,
});

Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template: `      <div class="product">
  <div class="product-image">
    <img :src="image" :alt="description" />
  </div>
  <div class="product-info">
    <h1>{{title}}</h1>
    <p v-if="inStock">In Stock</p>
    <p v-else :style="{textDecoration: 'line-through'}">Out of Stock</p>
    <p>Shipping: {{shipping}}</p>
    <detail :list="details"></detail>
    <div
      @mouseover="updateProduct(index)"
      v-for="(variant, index) in variants"
      :key="variant.variantId"
      class="color-box"
      :style="{backgroundColor: variant.variantColor}"
    ></div>
    <button
      @click="addToCart"
      :disabled="inventory === 0"
      :class="{disabledButton: inStock}"
    >
      Add to cart
    </button>
    <div class="cart">
      <p>{{cart}}</p>
    </div>
  </div>
</div>`,
  data() {
    return {
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
    };
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
    shipping() {
      if (this.premium) {
        return "free";
      } else {
        return "£2:99";
      }
    },
  },
});
var app = new Vue({
  el: "#app",
  data: {
    premium: true,
  },
});
