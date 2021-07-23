<template>
    <div class="container">
        <div class="headine">
            <!--Text Header -->
            <h1 style="font-weight: bold;"> Rent Panel</h1>
        </div>
        <!--Search Panel -->
        <div class="row">
            <div class="col-lg-12">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search by Product's Name" v-model="Temp">
                    <span class="input-group-btn">
                        &nbsp;&nbsp;<button class="btn btn-primary" type="button" @click="search">
                            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                            Search
                        </button>&nbsp;&nbsp;
                        <!--add product button -->
                        <router-link to="/addproduct">
                            <button type="button" class="btn btn-info">+ Add Product</button>
                        </router-link>&nbsp;&nbsp;
                        <!--order history button -->
                        <router-link to="/orderhistory">
                            <button type="button" class="btn btn-secondary">Order History</button>
                        </router-link>&nbsp;&nbsp;
                    </span>
                </div>
            </div>
        </div>
        <div class="row">
            <!--Productlist present on cards -->
            <div class="col-sm 6" v-for="(products, key) in searchUsers" :key='key'>
                <div class="card" style="width: 18rem">
                    <img class="card-img-top" v-bind:src="products.imageUrl" alt="Card image cap" width=200 />
                    <div class="card-body">
                        <h4 class="card-title font-weight-bold">{{ products.productName }}</h4>
                        <p class="card-text">Price/Week: {{products.priceperweek}} $</p>
                        <router-link
                            :to="{path: 'editproduct' , name: 'EditProduct', params:{itemid: products.productID}}">
                            <button class="btn btn-warning">Edit</button>&nbsp;
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <!--Logout button -->
        <button class="btn btn-default" @click="logout"><span class="fas fa-sign-out-alt"></span>
            Logout</button>
        <br>
    </div>


</template>

<script>
    import firebase from 'firebase'
    export default {
        name: "ProductListAdmin",
        data() {
            //product object
            return {
                products: null,
                product: {},
                Search: "",
                Temp: ""
            };
        },
        computed: {
            //serach query from keyword productname
            searchUsers: function () {
                console.log("Searching " + this.Search)
                return Object.values(this.product).filter((user) => {
                    return user.productName.match(this.Search);
                });

            },

        },

        created() {
            //get product database
            console.log('Product List')
            firebase.database().ref("product").on("value", (snapshot) => {
                this.product = snapshot.val()
                console.log(snapshot.val())

            })

        },
        methods: {
            //logout function
            logout() {
                console.log('logout')
                firebase.auth().signOut()
                    .then(() => {
                        console.log("Logout")
                        this.$router.replace('/signin')
                    })
                    .catch((error) => {
                        alert(error.message)
                    })
            },
            //search function parse to searchUsers
            search() {
                this.Search = this.Temp
                console.log("enter search " + this.Search);
            }
        },
    };
</script>


<style>
    .card {
        margin: 20px;
    }

    .col-lg-12 {
        margin-bottom: 80px;
    }
</style>