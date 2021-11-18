<template>
  <div class="all">
    <!-- 下拉刷新 -->
    <van-pull-refresh
     v-model="isLoading"
     success-text="刷新成功"
     @refresh="onRefresh"
    >  
   
    <div class="headpic" :style="{'background-image':'url('+require('../assets/wallhaven-g7mqkl_1920x1080.png')+')'}" @click="show = true" :data="form" :key="form.id">
      
      <!-- 背景图片 -->
        <p>我的动态 <van-icon name="replay" @click="clickchange"/></p>
      <!-- 头像 -->
      <div class="touxiang">
       <van-image round width="1.5rem" height="1.5rem" :src="form.userid"/>
       <p>{{form.user_name}}</p>
      </div>
    </div>

    <div class="nav">
      <button @click="lookcomment">查看所有评论 <van-icon name="chat-o" /></button>
    </div>
    <!-- 点击切换图片 -->
     <van-action-sheet
       v-model="show"
       :actions="actions"
       cancel-text="取消"
       close-on-click-action
       @cancel="onCancel"
      /> 

    <div 
    class="container" 
    :data="friendform"
    v-for="item in friendform"
    :key="item.id"
    >
      <div class="garbage">
      <van-icon name="delete-o" size="0.6rem" @click="deletes(item)"/>
      </div>
      <div class="xinqing">
        <van-image  width="1.5rem" height="1.5rem" 
        src="https://gitee.com/zj095/cloudimg/raw/master/202111111025466.png" 
        v-if="item.comment_state == 1"/>
          <van-image  width="1.5rem" height="1.5rem" 
        src="https://gitee.com/zj095/cloudimg/raw/master/202111081114359.png" 
        v-if="item.comment_state == 2"/>
          <van-image  width="1.5rem" height="1.5rem" 
        src="https://gitee.com/zj095/cloudimg/raw/master/202111081649792.png" 
        v-if="item.comment_state == 3"/>
      </div>
      <div class="tell">
        <div class="dynamic">{{item.comment_article}}</div>
          <div class="tell-pic">
            <!-- 图片 -->
          <van-grid :border="false" :column-num="1">
          <van-grid-item>
            <van-image :src="item.comment_chart" />
          </van-grid-item>
          </van-grid>
          <!-- 点赞 -->
          <div class="like" > 
            <!-- @click="btn_like(item)" -->
            <img src="https://gitee.com/zj095/cloudimg/raw/master/202111081227936.png" alt="" >
            <p v-for="(item,index) in  item.dianzanren" :key="index" @click="akk(item)" >{{item}}</p>
          </div>
          <!-- 评论 -->
          <div class="comment" >
            <!-- <van-cell-group class="van-ellipsis" border>
             <van-field v-model="comment" label="{{item.comment_name}}"/>
             <p>{{item.comment_article}}</p>
            </van-cell-group> -->
            <div class="othercomment" @click="aff(item)">
              <div><van-icon name="chat-o"  size="0.6rem"/> {{item.comment_name}}:{{item.pinglun}}</div>
            </div >
             <!-- <van-cell-group class="van-ellipsis"  :model="commentform" >
             <van-field placeholder="请输入评论" v-model="commentform.comments" />
            </van-cell-group> -->
          </div>
          </div>
      </div>
    </div>
    <br>
    <br>
    <br>
    <br>
     </van-pull-refresh>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { ImagePreview } from 'vant';
import { Popup } from 'vant';

export default {
      created() {
    this.getuserlist()
    this.getuserlist1()
  },
   components: {
    [ImagePreview.Component.name]: ImagePreview.Component,
  },
 data() {
   return{
     dianzanren:[],
     idid:[],
     dynamic:[],
    //  commentform:{},
     form:[
       {
          userid:'',
       }
     ],
     friendform:[],
     imformation:[],
    //  comment: "077d30bba9ae3ff2b2ac8b3852d3459d",
     show: false,
      count:     0,
      isLoading: false,
    actions: [{ name: '从相册选择' },]
   }
 },
 
 methods:{
    akk(item){
     console.log(item);
   },
   aff(item){
     console.log(item);
   },
  //  btn_like(item){
  //    console.log(item);
  //  },
   async getuserlist(){
   const code="df99fb4459fd36ad910d3307442d6da7"
    //  localStorage.setItem('code',code)
    // console.log('getuserlist');
     const{data:res} = await this.$http.get('/api/dingding/form?code='+code)
     console.log(res);
    sessionStorage.setItem('user_name',res.data.user_name)
    if(res.code == 200){
      //把信息存入数组，把数组存入本地
      // var imformation=[] 
      this.imformation.push(res.data)
       console.log(this.imformation);
      // console.log(imformation);
      localStorage.setItem('imformation',JSON.stringify(imformation))
     
    }
    
    if(res.code == 100){
      this.$message.error("获取失败！")
    }
    },
   
    async getuserlist1(){
      // console.log(this.imformation);
      // for(var i = 0; i<res2.data[0].length;i++){
      //   this.friendform[i]["praise_name"] = this.
      // }

      //获取名字
      var user_name = sessionStorage.getItem('user_name',this.user_name)
      console.log(user_name);
      this.form.user_name=user_name
       // 获取头像
      // var userid = localStorage.getItem('imformation',this.imformation.userid)
      // console.log(userid);
      var imformation =JSON.parse(localStorage.getItem('imformation'))
      // console.log(imformation);
      // console.log(imformation[0].userid);
      const{data: res0} = await this.$http.get('/api/dingding/photo?userid='+imformation[0].userid)
      console.log(res0);
       if(res0.code == 200){
        // this.$message.success("获取成功！")
      // 赋值
     
      this.form.userid = res0.data
      console.log(this.form.userid);
      }
       if(res0.code == 100){
        this.$message.error("获取失败！")
      }
      // 展示动态
      const{data: res1} = await this.$http.get('/api/friend/other?userid='+imformation[0].userid)
      console.log(res1);
      // console.log(res1.data);
      // for(var i=0;i<res1.data.res1[0].length;i++){
      //   console.log(res1.data.res1[i].id);
      // }
       for(var i=0;i<res1.data.res1.length;i++){
        // console.log(res1.data.res1[i].id);
        //  console.log(res1.data.res1[i].comment_article);
       this.idid.push(res1.data.res1[i].id)
       this.dynamic.push(res1.data.res1[i].comment_article)
      }
        console.log(this.idid);
        console.log(this.dynamic);
        console.log(this.dynamic.length);
      if(res1.code == 200){
        // this.$message.success("展示成功！")
        // 赋值
        this.friendform = res1.data.res1;
        // localStorage.setItem('ids',)
       //赞
      //  for(var i = 0;i<res1.data.res1.length;i++){
      //  this.friendform[i]["praise_name"] = res2.
      //  }
      // 展示评论
      // for(var i=0;i<this.dynamic.length;i++){
           const{data: res2}=await this.$http.post('/api/friend/creply',{comment_userid:imformation[0].userid,user_article:this.dynamic})
       console.log(res2.data);
       if(res2.code == 200){
         console.log(this.friendform);
         for(var i = 0; i<res2.data.length;i++){
          this.friendform[i]["comment_name"] = res2.data[i].comment_name   
          this.friendform[i]["pinglun"] = res2.data[i].comment_article      
         }
        console.log(this.friendform);
      }
       if(res2.code == 100){
        this.$message.error("查看失败！")
      }
      }
       if(res1.code == 100){
        this.$message.error("展示失败！")
      }
      // 展示赞的人
       for(var k =0;k<this.idid.length;k++){
       const{data: res3} = await this.$http.get('/api/friend/getpraise?comment_id='+this.idid[k])
      // const{data: res3} = await this.$http.get('/api/friend/getpraise?comment_id='+'81')
       console.log(this.idid[k]);
      console.log(res3);

       if(res3.code == 200){
        console.log(this.friendform);
        for(var i=0;i<this.friendform.length;i++){
            for(var j =0;j<res3.data.length;j++){
            this.dianzanren.push(res3.data[i].praise_name)
           this.friendform[i]["dianzanren"]=this.dianzanren
          this.dianzanren.push(res3.data[i].praise_name)
           }
        }
        
        console.log( this.friendform);
        // console.log(this.dianzanren);
      //   // this.$message.success("查看成功！")
      // }
      //  if(res3.code == 100){
      //   this.$message.error("查看失败！")
       }
    }
    },
    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
   onCancel() {
      this.$Toast('取消');
    },
    lookcomment() {
       this.$router.push('/survey')
    },
    clickchange(){
       this.$router.push('/myhelp')
    },
    deletes(item) {
      console.log(item);
    this.$dialog.alert({
         message: "确认删除该动态？", //改变弹出框的内容
        showCancelButton: true //展示取消按钮
})
.then(async() => { //点击确认按钮后的调用
         console.log("点击了确认按钮噢")
         console.log(item);
         console.log(this.idid);
        const{data: res4}= await this.$http.post('/api/friend/deletec',{id:item.id})
        console.log(res4);
         this.getuserlist()
        this.getuserlist1()
})
.catch(() => { //点击取消按钮后的调用
         console.log("点击了取消按钮噢")
         
})
  }
 }
}
</script>

<style scoped>
.all{
  /* height: 100%; */
  background-color: #fff;
}
.headpic p {
  color: #fff;
  text-align: center;
  font-size: 30px;
  /* margin-top: 30px; */
}

.headpic {
  /* background: url('https://img01.yzcdn.cn/vant/cat.jpeg'); */
 background-size: 100% 100%;

 box-sizing: border-box;

 height: 6.5rem;

 margin-top: -0.78rem;
}
.bgc{
  height: 100%;
  width: 100%;
}
.touxiang{
  margin-top: 183px;
  margin-left: 0.4rem;
}
.touxiang p {
  color: #fff;
  font-size:0.5rem;
  margin-left: -5.5rem;
  margin-top: -1.15rem !important;
}
.nav{
  margin: 12px;
}
.nav button{
  border: 0;
  margin-left: 3.3rem;
  
}
.dynamic{
  margin-left: 12px;
  font-size: 20px;
}
.xinqing {
  /* padding-top: 10px; */
  text-align: center;
}
.like{
  display: flex;
  align-items: center;
  margin-left: 5px;
}
.like img {
  height: 0.63rem;
}
.like p {
  font-size: -1.44444rem;
  margin-left: 10px;
}
.container {
   border:2px solid white;
    margin-bottom: 20px !important;
    margin: 0 auto;
    height: 100%;
    width: 92%;
    background-color: #fff;
    border-radius: 0.29333rem;
    box-shadow: 5px 35px 75px 75px #e3ecec;
}
.garbage{
  padding-top: 12px;
  margin-left:8.5rem;
}
.tell p {
  font-size: 25px;
}
.othercomment{
  margin-left: 5px;
  padding-bottom: 7px;
  margin-bottom: 10px;
}
</style>