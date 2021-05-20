<template>
    <div class="container">
        <form>
            <br>
            <div class="panel panel-info">
                <div class="panel-heading">
                    <h4 class="font-weight-bold" style="text-align:left">Rent Product <span
                            class="badge badge-info">Rent</span></h4>                           
                </div>
                <div class="form-group">
                    <!--Text Header -->
                    <h4 class="font-weight-bold" style="text-align:left">Rent Product <span
                            class="badge badge-info">Rent</span></h4> 
                    <label class="float-left font-weight-bold">Product ID<span class="text-danger">*</span> </label>
                    <input type="text" class="form-control" placeholder="First Name" v-model="User.productID" disabled>
                </div>
                <!--form group -->
                <div class="form-group">
                    <label class="float-left font-weight-bold">First Name<span class="text-danger">*</span> </label>
                    <input type="text" class="form-control" placeholder="First Name" v-model="User.firstName">
                </div>
                <div class="form-group">
                    <label class="float-left font-weight-bold">Last Name<span class="text-danger">*</span> </label>
                    <input type="text" class="form-control" placeholder="Last Name" v-model="User.lastName">
                </div>
                <div class="form-group">
                    <label class="float-left font-weight-bold">Mobile No<span class="text-danger">*</span> </label>
                    <input type="text" class="form-control" placeholder="10-Digits only Mobile No ex. 0812345678 " v-model="User.mobileNo">
                </div>
                <div class="form-group">
                    <label class="float-left font-weight-bold">Address <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" placeholder="Address" v-model="User.address">
                </div>
                <label class="float-left font-weight-bold">Duration <span class="text-danger">*</span></label>
                <select class="form-select pull-left" aria-label="Default select example" v-model="User.duration">
                    <option selected>Duration</option>
                    <option value="1">1 week</option>
                    <option value="2">2 weeks</option>
                    <option value="3">3 weeks</option>
                    <option value="4">4 weeks</option>
                </select>
                <div class="form-group">
                    <br>
                    <label class="float-left font-weight-bold">Slip Url<span class="text-danger">*</span> </label>
                    <input type="text" class="form-control" placeholder="Slip Url" v-model="User.slipUrl">
                </div>
            </div>

            <!--save button -->
            <div class="btn-group" role="group" aria-label="Basic outlined example">
                <router-link to="/productlist">
                    <button type="submit" class="btn btn-success" @click="addToAPI"><span class="far fa-save"></span>
                        Save</button>
                </router-link>
                &nbsp;&nbsp;
                <!--close button -->
                <router-link to="/productlist">
                    <button class="btn btn-danger"><span class="fas fa-times"></span> Close</button>
                </router-link>
            </div>


        </form>
    </div>

</template>

<script>
    import firebase from 'firebase'
    export default {
        name: 'AddOrder',

        data() {
            return {
                //product object to push to database
                User: {
                    productID: '',
                    firstName: '',
                    lastName: '',
                    mobileNo: '',
                    address: '',
                    duration: '',
                    slipUrl: ''
                },
                //product object get from param productID
                productdetail: {}
            }
        },
        created() {
            //param productID
            this.pid = this.$route.params.itemname
            console.log(this.pid)
            //get product database query from produvtID
            firebase.database().ref("product").orderByChild("productID").equalTo(this.pid).on("child_added",
                (snapshot) => {
                    this.productdetail = snapshot.val()
                    console.log(this.productdetail)
                })
            console.log(this.pid)
            //parse id to user object to push to database as order
            this.User.productID = this.pid
        },
        methods: {
            //add order to database
            addToAPI() {

                firebase.database().ref("order").push({
                    //orderID: this.ordercount,
                    productID: this.User.productID,
                    firstName: this.User.firstName,
                    lastName: this.User.lastName,
                    mobileNo: this.User.mobileNo,
                    address: this.User.address,
                    duration: this.User.duration,
                    slipUrl: this.User.slipUrl
                });
            }


        }
    }
</script>