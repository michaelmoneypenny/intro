Vue.component("product-review", {
  template: `
  <form class="review-form" @submit.prevent="onSubmit">
  <p v-if="errors.length">
    <b>Correct errors</b>
    <ul>
    <li v-for="error in errors">{{error}}</li>
    </ul>
  </p>
  <p>
    <label for="name">Name:</label>
    <input id="name" v-model="name" placeholder="name">
  </p>
  
  <p>
    <label for="review">Review:</label>      
    <textarea id="review" v-model="review"></textarea>
  </p>
  
  <p>
    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>
  </p>
      
  <p>
    <input type="submit" value="Submit">  
  </p>    

</form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: [],
    };
  },
  methods: {
    onSubmit: function () {
      if (this.name && this.rating && this.review) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
        };
        this.$emit("review-submitted", productReview);
        (this.name = null), (this.review = null), (this.rating = null);
      } else {
        if (!this.name) this.errors.push("name required");
        if (!this.review) this.errors.push("review required");
        if (!this.rating) this.errors.push("rating required");
      }
    },
  },
});

Vue.component("product-tabs", {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
    template: `
  <div>
    <span class="tab" :class="{activeTab: selectedTab === tab}"
     v-for="(tab, index) in tabs"
      :key="index"
       @click="selectedTab = tab">
    {{tab}}
    </span>
    <div>


    <h2>Reviews</h2>
    <p v-if="!reviews.length">No reviews yet.</p>
    <ul>
    <li v-for="review in reviews">
      <p>{{review.name}}</p>
      <p>{{review.review}}</p>
      <p>{{review.rating}}</p>
    </li>
    </ul>
    </div>
    

<product-review @review-submitted="reviewSubmitted"></product-review>
  </div>`,

    data() {
      return {
        tabs: ["Reviews", "Make a review"],
        selectedTab: "Reviews",
      };
    },
  },
});

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
      :disabled="inStock > 0"
      :class="{disabledButton: inStock > 0}"
    >
      Add to cart
    </button>
    <button @click="removeFromCart">Remove</button>
    </div>

    <product-tabs :reviews="reviews"></product-tabs>

  </div>
</div>`,
  data() {
    return {
      brand: "Vue Mastery",
      product: "Socks",
      description: "great",
      selectedVariant: 0,
      reviews: [],
      inventory: 0,
      details: ["80% cotton", "20% polyester", "only men"],
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
      this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
    },
    removeFromCart: function () {
      this.$emit(
        "remove-from-cart",
        this.variants[this.selectedVariant].variantId
      );
    },

    updateProduct: function (index) {
      this.selectedVariant = index;
    },
    reviewSubmitted: function (review) {
      this.reviews.push(review);
      console.log(review);
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
    cart: [],
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    removeCart(id) {
      this.cart.splice(this.cart.indexOf(id), 1);
    },
  },
});
