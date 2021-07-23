<template>
    <div class="container">
        <form>
            <br>
            <div class="panel panel-info">
                <div class="panel-heading">
                    <!--Text Header -->
                    <h4 class="font-weight-bold" style="text-align:left">Edit Product <span
                            class="badge badge-warning">Edit</span></h4> 
                    <!--Delete Button -->
                    <router-link to="/productlistadmin">
                    <button class="btn btn-danger float-right"  @click="DeleteProduct">Delete</button>
                        &nbsp;&nbsp;   
                    </router-link>                       
                </div>
                <!--From Group -->
                <div class="form-group">
                    <h4 class="font-weight-bold" style="text-align:left">Edit Product <span
                            class="badge badge-warning">Edit</span></h4> 
                    <label class="float-left font-weight-bold">Product ID<span class="text-danger">*</span> </label>
                    <input type="text" class="form-control" placeholder="Product ID" v-model="User.productID">
                </div>
                <div class="form-group">
                    <label class="float-left font-weight-bold">Name<span class="text-danger">*</span> </label>
                    <input type="text" class="form-control" placeholder="Name" v-model="User.productName">
                </div>
                <label class="float-left font-weight-bold">Categories <span class="text-danger">*</span></label>
                <select class="form-select pull-left" aria-label="Default select example" v-model="User.categories">
                    <option selected>Categories</option>
                    <option value="Jacket">Jacket</option>
                    <option value="Tops">Tops</option>
                    <option value="Skirts">Skirts</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Accesssories">Accesssories</option>
                </select>               
                <div class="form-group">
                    <br>
                    <label class="float-left font-weight-bold">Discription<span class="text-danger">*</span> </label>
                    <input type="text" class="form-control" placeholder="Discription" v-model="User.discription">
                </div>
                <div class="form-group">
                    <label class="float-left font-weight-bold">Price/Week<span class="text-danger">*</span> </label>
                    <input type="text" class="form-control" placeholder="Price/Week" v-model="User.priceperweek">
                </div>
                <div class="form-group">
                    <br>
                    <label class="float-left font-weight-bold">Image Url<span class="text-danger">*</span> </label>
                    <input type="text" class="form-control" placeholder="Image Url" v-model="User.imageUrl">
                </div>
            </div>
            <!--Save Button -->
            <div class="btn-group" role="group" aria-label="Basic outlined example">
                <router-link to="/productlistadmin">
                    <button type="submit" class="btn btn-success" @click="updateToAPI"><span class="far fa-save"></span>
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
                //product object get from realtime database
                productdetail: {},
                //firebase product key
                key: ""
            }
        },
        created() {
            //itemid param from route productlistadmin
            this.pid = this.$route.params.itemid
            console.log(this.pid)
            //get database query from productID
            firebase.database().ref("product").orderByChild("productID").equalTo(this.pid).on("child_added",
                (snapshot) => {
                    this.productdetail = snapshot.val()
                    this.key = snapshot.key
                    console.log(this.key)
                })
            console.log(this.pid)
            //parse param from database to v-model > get product's data present on form to edit
            this.User.productID = this.pid
            this.User.productName = this.productdetail.productName
            this.User.discription = this.productdetail.discription
            this.User.categories = this.productdetail.categories
            this.User.priceperweek = this.productdetail.priceperweek
            this.User.imageUrl = this.productdetail.imageUrl
        },
        methods: {
            //update data to database after edit
            updateToAPI() {
                firebase.database().ref("product").child(this.key).update({
                    productID: this.User.productID,
                    productName: this.User.productName,
                    categories: this.User.categories,
                    discription: this.User.discription,
                    priceperweek: this.User.priceperweek,
                    imageUrl: this.User.imageUrl
                });
            },
            //delete product
            DeleteProduct(){
                firebase.database().ref("product").child(this.key).remove();
            }


        }
    }
</script>