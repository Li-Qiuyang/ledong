<template>
    <div id="app">
        <el-container>
            <el-aside width="200px">
                <el-menu
              style="height:100vh"
        default-active="1-1"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span slot="title">用户管理</span>
            </template>
            <router-link to="/home/uploaduser">
              <el-menu-item index="1-1">
              用户信息
            </el-menu-item>
            </router-link>
            <router-link to="/home/train">
              <el-menu-item index="1-2">
              用户训练
            </el-menu-item>
            </router-link>
            <router-link to="/home/content">
              <el-menu-item index="1-3">
              用户动态
            </el-menu-item>
            </router-link>
          </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-operation"></i>
            <span slot="title">课程管理</span> 
          </template>
          <router-link to="/home/upload/yoga">
            <el-menu-item index="2-1">
              瑜伽课程
            </el-menu-item>
          </router-link>
          <router-link to="/home/upload/warmup">
            <el-menu-item index="2-2">
              热身课程
            </el-menu-item>
          </router-link>
          <router-link to="/home/upload/run">
            <el-menu-item index="2-3">
              跑步课程
            </el-menu-item>
          </router-link>
          <router-link to="/home/upload/ropeskipping">
            <el-menu-item index="2-4">
              跳绳课程
            </el-menu-item>
          </router-link>
          <router-link to="/home/upload/pilates">
            <el-menu-item index="2-5">
              帕梅拉课程
            </el-menu-item>
          </router-link>
          <router-link to="/home/upload/dance">
            <el-menu-item index="2-6">
              舞蹈课程
            </el-menu-item>
          </router-link>
          <router-link to="/home/upload/bodybuildingexercise">
            <el-menu-item index="2-7">
              健身操课程
            </el-menu-item>
          </router-link>
        </el-submenu>
        <router-link to="/home/map">
        <el-menu-item index="3">
          <i class="el-icon-map-location"></i>
          <span slot="title">地图管理</span>
        </el-menu-item>
        </router-link>
        <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span slot="title">食谱管理</span>
            </template>
            <router-link to="/home/food">
              <el-menu-item index="4-1">
              食物信息
            </el-menu-item>
            </router-link>
            <router-link to="/home/menu">
              <el-menu-item index="4-2">
              食谱信息
            </el-menu-item>
            </router-link>
          </el-submenu>
      </el-menu>
            </el-aside>
                <el-container>
                    <el-header 
                    style="background-color: #545c64;
                    color: #fff;
                    justify-content: space-between;
                    display: flex;
                    height: 50px;">     
                       <el-tag style="margin: 10px;"><i class="el-icon-user-solid"></i>当前用户：{{ localuser }}</el-tag>
                       <div style="line-height: 50px;font-weight: bold;">乐动健康后台管理系统</div>
                        <el-button style="margin: 5px;" @click="deluser" type="danger"><i class="el-icon-switch-button"></i>退出登录</el-button>
                    </el-header>
                    <el-main><router-view/></el-main>
                </el-container>
        </el-container>
    </div>
  </template>
  <script>
    export default{
      data(){
          return{
            localuser:'',
          }
      },
      methods:{
        deluser(){
            localStorage.clear()
            this.$router.push('/')
            location.reload()
          }, 
      },
      mounted(){
        this.localuser=localStorage['user']?localStorage['user']:'暂未登录'
        if(this.$route.path!='/home/uploaduser'){
          this.$router.push('/home/uploaduser')
        }
      }
    }
  </script>
  <style>
  *{
    padding: 0;
    margin: 0;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  a{
    text-decoration: none;
  }
  </style>
  