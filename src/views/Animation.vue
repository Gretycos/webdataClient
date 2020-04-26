<template>
    <div class="video-list">
        <el-row>
            <el-col :span="4" v-for="(item,index) in AnimationList" :key="index" :offset="0">
                <el-card :body-style="{ padding : '0px'}">
                    <img :src="item.cover" class="image">
                    <div style="padding: 10px;">
                        <span>{{item.title}}</span>
                        <div class="bottom clearfix">
                            <span class="process">{{item.process}}</span>
                            <span class="source">{{item.source}}</span>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {findAnimes} from "@/api/api";

    export default {
        name: "Animation",
        data(){
            return{
                AnimationList:[],
                totalPages:0
            }
        },
        created(){
            let p=1
            let code = "00"
            let params={
                page:p.toString(),
                code:code,
                title:''
            };
            findAnimes(params).then(res=>{
                console.log(res.data.content)
                this.AnimationList=res.data.content;
                this.totalPages=res.data.totalPages
            });
        },
        computed:{

        }
    }
</script>

<style scoped>
    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .process {
        font-size: 13px;
        color: #999;
    }

    .source {
        padding: 0;
        float: right;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .image {
        height: 100%;
        width: 100%;
        display: block;
    }
</style>
