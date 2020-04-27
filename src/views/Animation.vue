<template>
    <div class="container">
        <ul class="sort-banner">
            <li :class="currentMode===index?'sort-item on':'sort-item'" v-for="(item,index) in sortMode">
                <i :class="item.order===0?'up':'up active'" @click="changeUp(index)"></i>
                <span @click="changeMode(index)">{{item.title}}</span>
                <i :class="item.order===1?'down':'down active'" @click="changeDown(index)"></i>
            </li>
            <ul class="search-banner">
                <el-input v-model="searchKey" placeholder="请输入搜索内容" size="mini" clearable @blur="search"></el-input>
            </ul>
            <ul class="source-banner">
                <span class="title">来源:</span>
                <li :class="currentSource===index?'source-item on':'source-item'" v-for="(item,index) in source" @click="changeSource(index)">
                    <span>{{item}}</span>
                </li>
            </ul>
        </ul>
        <el-row class="video-list" v-loading="loading">
            <el-col :span="4" v-for="(item,index) in AnimationList" :key="index" :offset="0">
                <el-card shadow="hover" :body-style="{padding:'10px',height:'340px'}">
                    <a :href="item.link"><img :src="item.cover" class="image"></a>
                    <div style="padding: 5px;height: 80px;position: relative">
                        <a :href="item.link">{{item.title}}</a>
                        <div class="bottom-box">
                            <div class="bottom">
                                <span class="process">{{item.process}}</span>
                                <span class="source">{{item.source}}</span>
                            </div>
                            <div class="bottom1">
                                <span class="play_count">{{item.play_count}}</span>
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-pagination
                        background
                        :page-size="30"
                        @current-change="handleCurrentPageChange"
                        :current-page.sync="currentPage"
                        layout="prev, pager, next"
                        :total="totalElements">
                </el-pagination>
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
                totalElements:0,
                searchKey:'',
                currentPage:1,
                currentMode:0,
                currentSource:0,
                source:['全部','bilibili','tencent'],
                sortMode:[
                    {
                        title:'热门指数',
                        order:0 //0降1升
                    },
                    {
                        title:'更新时间',
                        order:0 //0降1升
                    },
                    {
                        title:'最高评分',
                        order:0 //0降1升
                    },
                ],
                loading: true
            }
        },
        created(){
            let p=1
            let code = "000"
            let params={
                page:p.toString(),
                code:code,
                title:this.searchKey
            };
            findAnimes(params).then(res=>{
                // console.log(res.data)
                this.AnimationList=res.data.content;
                this.totalElements=res.data.totalElements;
                this.loading=false
            });
        },
        methods:{
            changeMode(index){
                if(this.currentMode!==index){
                    this.currentMode=index;
                    this.currentPage=1;
                    this.sortMode[index].order=0
                    let code = ''+this.currentMode+this.currentSource+this.sortMode[index].order
                    let params={
                        page:this.currentPage.toString(),
                        code:code,
                        title:this.searchKey
                    }
                    this.loading=true;
                    findAnimes(params).then(res=>{
                        if(Object.keys(res).length!==0){
                            // console.log(res.data)
                            this.AnimationList=res.data.content;
                            this.totalElements=res.data.totalElements;
                            this.loading=false;
                        }
                    });
                }
            },
            changeUp(index){
                if(this.sortMode[index].order === 0){
                    this.currentPage=1;
                    this.sortMode[index].order = 1
                    let code = ''+this.currentMode+this.currentSource+this.sortMode[index].order
                    let params={
                        page:this.currentPage.toString(),
                        code:code,
                        title:this.searchKey
                    }
                    this.loading=true;
                    findAnimes(params).then(res=>{
                        // console.log(res.data)
                        this.AnimationList=res.data.content;
                        this.totalElements=res.data.totalElements;
                        this.loading=false;
                    });
                }
            },
            changeDown(index){
                if(this.sortMode[index].order === 1){
                    this.currentPage=1;
                    this.sortMode[index].order = 0
                    let code = ''+this.currentMode+this.currentSource+this.sortMode[index].order
                    let params={
                        page:this.currentPage.toString(),
                        code:code,
                        title:this.searchKey
                    }
                    this.loading=true;
                    findAnimes(params).then(res=>{
                        // console.log(res.data)
                        this.AnimationList=res.data.content;
                        this.totalElements=res.data.totalElements;
                        this.loading=false;
                    });
                }
            },
            changeSource(index){
                if(this.currentSource!==index){
                    this.currentPage=1;
                    this.currentSource=index;
                    let code = ''+this.currentMode+this.currentSource+this.sortMode[this.currentMode].order
                    let params={
                        page:this.currentPage.toString(),
                        code:code,
                        title:this.searchKey
                    }
                    this.loading=true;
                    findAnimes(params).then(res=>{
                        // console.log(res.data)
                        this.AnimationList=res.data.content;
                        this.totalElements=res.data.totalElements;
                        this.loading=false;
                    });
                }
            },
            handleCurrentPageChange(current){
                console.log(current)
                let code = ''+this.currentMode+this.currentSource+this.sortMode[this.currentMode].order
                let params={
                    page:this.currentPage.toString(),
                    code:code,
                    title:this.searchKey
                }
                this.loading=true;
                findAnimes(params).then(res=>{
                    // console.log(res.data)
                    this.AnimationList=res.data.content;
                    this.totalElements=res.data.totalElements;
                    window.scrollTo(0,0);
                    this.loading=false;
                });
            },
            search(){
                let code = ''+this.currentMode+this.currentSource+this.sortMode[this.currentMode].order
                let params={
                    page:this.currentPage.toString(),
                    code:code,
                    title:this.searchKey
                }
                this.loading=true;
                findAnimes(params).then(res=>{
                    // console.log(res.data)
                    this.AnimationList=res.data.content;
                    this.totalElements=res.data.totalElements;
                    this.loading=false;
                });
            }
        }
    }
</script>

<style scoped>
    .container{
        margin-top: 25px;
    }
    .sort-banner{
        height: 24px;
        font-size: 14px;
        line-height: 2;
        position: relative;
    }
    .source-banner{
        position: absolute;
        right: 0;
        margin:auto;
    }
    .sort-item{
        position: relative;
        width: 80px;
        margin-right: 20px;
        float: left;
        color: #222;
    }
    .search-banner{
        position: absolute;
        right: 40%;
        margin:auto;
    }
    ul{
        list-style: none;
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 40px;
    }
    li{
        display: list-item;
        text-align: -webkit-match-parent;
        cursor: pointer;
    }
    .sort-item i.down,.sort-item i.up{
        display: block;
        position: absolute;
        left: 70px;
        margin: 0 2px;
        width: 0;
        height: 0;
    }
    i.up{
        top: 6px;
        border: 5px dashed rgba(0,0,0,0);
        border-top: none;
        border-bottom: 5px solid #ddd;
    }
    i.down{
        bottom: 6px;
        border: 5px dashed rgba(0,0,0,0);
        border-bottom: none;
        border-top: 5px solid #ddd;
    }
    .sort-item.on{
        color: #00a1d6;
    }
    .sort-item.on i.active{
        border-color: #00a1d6 rgba(0,0,0,0);
    }
    .title{
        position: relative;
        width: 40px;
        float: left;
        color: #222;
    }
    .source-item{
        position: relative;
        width: 40px;
        margin-right: 10px;
        float: left;
        color: #222;
    }
    .source-item.on{
        color: #00a1d6;
    }
    .video-list{
        padding: 5px;
    }
    .bottom-box {
        width: 100%;
        height: 20px;
        position: absolute;
        bottom: 10px;
    }
    .bottom{
        display: flex;
        justify-content: space-between;
    }
    .process {
        font-size: 13px;
    }
    .source {
        padding: 0;
        float: right;
        color: #ff55e6;
    }
    .bottom1{
        display: flex;
        justify-content: flex-end;
    }
    .play_count{
        font-size: 12px;
        color: #999;
    }
    /*.clearfix:before,*/
    /*.clearfix:after {*/
    /*    display: table;*/
    /*    content: "";*/
    /*}*/

    /*.clearfix:after {*/
    /*    clear: both*/
    /*}*/

    .image {
        width: 100%;
        height: 250px;
        display: inline-block;
        vertical-align: top;
    }
    .el-card{
        width: 180px;
        height: 360px;
        display: inline-block;
        /*margin-right: 20px;*/
        vertical-align: top;
        text-align: -webkit-match-parent;
        padding: 5px;
    }
    a{
        color: #212121;
        transition: color 0.3s;
        cursor: auto;
        outline: invert none 0;
        text-decoration: none;
    }
</style>
