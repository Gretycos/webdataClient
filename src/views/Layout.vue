<template>
    <div class="ctn">
        <div class="header">
<!--            <div class="gs-logo" @click="toHomepage"></div>-->
        </div>
        <div class="b-wrap">
            <div class="menu-bar">
                <div class="menu-list">
                    <span v-for="(item,index) in menu" >
                        <div class="item">
                            <router-link :to="item.href" :class="item.title===currentName? 'name on':'name'">
                                <span>{{item.title}}</span>
                            </router-link>
                        </div>
                    </span>
                </div>
            </div>
        </div>
        <div class="main-wrapper">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import menuList from "@/assets/menuList";

    export default {
        name: "Layout",
        data(){
            return{
                currentName:''
            }
        },
        created(){
            // console.log(this.$route.name)
            this.currentName=this.$route.name
        },
        methods: {

        },
        computed:{
            menu(){
                return menuList.menu
            }
        },
        watch:{
            $route(to,from){
                this.currentName=this.$route.name
            }
        }

    }
</script>

<style scoped>
    .header {
        margin: 0 auto;
        position: relative;
        z-index: 0;
        height: calc(100vw*0.09375);
        min-width: 999px;
        display: flex;
        justify-content: center;
        background-repeat: no-repeat;
        background-position: center 0;
        background-size: cover;
        min-height: 155px;
        background-image: url(../assets/images/bg.png);
    }
    /*.gs-logo {*/
    /*    display: inline-block;*/
    /*    margin-top: 10px;*/
    /*    margin-bottom: 10px;*/
    /*    width: 320px;*/
    /*    height: 163px;*/
    /*    cursor: pointer;*/
    /*    !*background-image: url(../assets/images/logo1.png);*!*/
    /*    background-repeat: no-repeat;*/
    /*    background-size: cover;*/
    /*}*/
    .b-wrap{
        width: 1160px!important;
        margin: 0 auto;
    }
    .menu-bar{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        width: 100%;
        border-bottom: 1px solid #f4f4f4;
    }
    .menu-list{
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        height: 68px;
        flex:1;

    }
    .item{
        display: flex;
        height: 34px;
        cursor: pointer;
        display: flex;
        justify-content: center;
    }
    .item .name{
        font-size: 14px;
        display: flex;
        align-items: center;
        white-space: nowrap;
    }
    .item a{
        color: #212121;
        transition: color 0.3s;
        cursor: auto;
        outline: invert none 0;
        text-decoration: none;

    }
    .item .on{
        color: #00a1d6;
    }
    .main-wrapper{
        width: 1160px;
        margin: 0 auto;
    }
</style>
