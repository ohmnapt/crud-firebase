<template>
    <div class="container">
        <form>
            <br>
            <div class="panel panel-info">
                <div class="panel-heading">
                    <h4 class="font-weight-bold" style="text-align:left">Add Product <span
                            class="badge badge-info">Add</span></h4>
                </div>
                <!--Text Header -->
                <div class="form-group">
                    <h4 class="font-weight-bold" style="text-align:left">Add Product <span
                            class="badge badge-info">Add</span></h4>
                <!--Product ID Form -->
                    <label class="float-left font-weight-bold">Product ID<span class="text-danger">*</span> </label>
                    <input type="text" class="form-control" placeholder="Product ID" v-model="User.productID">
                </div>
                <!--Name Form -->
                <div class="form-group">
                    <label class="float-left font-weight-bold">Name<span class="text-danger">*</span> </label>
                    <input type="text" class="form-control" placeholder="Name" v-model="User.productName">
                </div>
                <!--Categories Select Form -->
                <label class="float-left font-weight-bold">Categories <span class="text-danger">*</span></label>
                <select class="form-select pull-left" aria-label="Default select example" v-model="User.categories">
                    <option selected>Categories</option>
                    <option value="Jacket">Jacket</option>
                    <option value="Tops">Tops</option>
                    <option value="Skirts">Skirts</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Accesssories">Accesssories</option>
                </select>    
                <!--Discription Form -->           
                <div class="form-group">
                    <br>
                    <label class="float-left font-weight-bold">Description<span class="text-danger">*</span> </label>
                    <input type="text" class="form-control" placeholder="Description" v-model="User.discription">
                </div>
                <!--Price/Week Form -->
                <div class="form-group">
                    <label class="float-left font-weight-bold">Price/Week<span class="text-danger">*</span> </label>
                    <input type="text" class="form-control" placeholder="Price/Week" v-model="User.priceperweek">
                </div>
                <!--Image Form -->
                <div class="form-group">
                    <br>
                    <label class="float-left font-weight-bold">Image Url<span class="text-danger">*</span> </label>
                    <input type="text" class="form-control" placeholder="Image Url" v-model="User.imageUrl">
                </div>
            </div>
            <!--Save Button -->
            <div class="btn-group" role="group" aria-label="Basic outlined example">
                <router-link to="/productlistadmin">
                    <button type="submit" class="btn btn-success" @click="addToAPI"><span class="far fa-save"></span>
                        Save</button>
                </router-link>
                &nbsp;&nbsp;
                <!--Close Button -->
                <router-link to="/productlistadmin">
                    <button class="btn btn-danger"><span class="fas fa-times"></span> Close</button>
                </router-link>
            </div>


        </form>
    </div>

</template>

<script>
    import firebase from 'firebase'
    export default {
        name: 'AddProduct',

        data() {
            return {
                //product object parse from v-model form
                User: {
                    productID: '',
                    productName: '',
                    categories: '',
                    discription: '',
                    priceperweek: '',
                    imageUrl: ''
                },
                //productdetail: {}
            }
        },
        created() {},
        methods: {
            //if click save button it will push new product data to firebase realtime database
            addToAPI() {
                firebase.database().ref("product").push({
                    productID: this.User.productID,
                    productName: this.User.productName,
                    categories: this.User.categories,
                    discription: this.User.discription,
                    priceperweek: this.User.priceperweek,
                    imageUrl: this.User.imageUrl
                });
            }


        }
    }
</script>