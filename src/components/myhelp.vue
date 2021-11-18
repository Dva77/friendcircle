<template>
  <div class="all">
      <!-- 下拉刷新 -->
    <van-pull-refresh
     v-model="isLoading"
     success-text="刷新成功"
     @refresh="onRefresh"
    >  
    <div class="headpic" @click="show = true" :data="form" :key="form.id">
      
      <!-- 背景图片 -->
        <p>我的求助 <van-icon name="replay" @click="clickchange1"/></p>
      <!-- 头像 -->
      <div class="touxiang">
       <van-image round width="1.5rem" height="1.5rem" :src="form.userid"/>
       <p>{{form.user_name}}</p>
      </div>
    </div>

    <div class="nav">
      <button  @click="lookcomment">查看所有评论 <van-icon name="chat-o" /></button>
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
    :data="helpform"
    v-for="item in helpform"
    :key="item.id"
    >
      <div class="todo">
      <van-icon name="question" size="0.6rem" @click="deletes(item)" v-if="item.help_state==0"/>
      <van-icon name="checked" size="0.6rem" @click="deletes" v-if="item.help_state==1"/>
      </div>
      <div class="tell">
        <div class="helptest">{{item.help_article}}</div>
          <div class="tell-pic">
            <!-- 图片 -->
          <van-grid :border="false" :column-num="1">
          <van-grid-item>
            <van-image :src="item.help_chart" />
          </van-grid-item>
          </van-grid>
          <!-- 评论 -->
          <div class="comment" >
             <div class="othercomment">
              <p><van-icon name="chat-o"  size="0.6rem"/> {{item.help_name}}:{{item.pinglun}}</p>
            </div >

             <!-- <van-cell-group class="van-ellipsis">
             <van-field placeholder="请输入评论" />
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

export default {
    created() {
    this.getuserlist()
    },
 data() {
   return{
     idid:[],
     helpa:[],
     form:[],
     helpform:[],
     comment: "dfghjdfhgiudfgdsfsfsfsfsdf",
     show: false,
      count: 0,
      isLoading: false,
    actions: [{ name: '从相册选择' }]
   }
 },
 methods:{
   async getuserlist(){
      //获取名字
      var user_name = sessionStorage.getItem('user_name',this.user_name)
      console.log(user_name);
      this.form.user_name=user_name
     
       // 获取头像
      // var userid = localStorage.getItem('userid',this.userid)
      // console.log(userid);
       var imformation =JSON.parse(localStorage.getItem('imformation'))
       console.log(imformation);
       const{data: res0} = await this.$http.get('/api/dingding/photo?userid='+imformation[0].userid)
      console.log(res0);
       if(res0.code == 200){
        // this.$message.success("获取成功！")
      // 赋值
      this.form.userid = res0.data
      }
       if(res0.code == 100){
        this.$message.error("获取失败！")
      }
      //展示求助
       const{data: res1} = await this.$http.get('/api/friend/gethelp?userid='+imformation[0].userid)
       console.log(res1);
       for(var i=0;i<res1.data.length;i++){
        //  console.log(res1.data[i].help_article);
        //  console.log(res1.data[i].id);
        this.idid.push(res1.data[i].id)
        this.helpa.push(res1.data[i].help_article)
       }
       console.log(this.idid);
       console.log(this.helpa);
      //  sessionStorage.setItem('help_article',res1.data[0].help_article)
      //  sessionStorage.setItem('id1',res1.data[0].id)
       this.helpform = res1.data;
       console.log(this.helpform);
       if(res1.code==200){
        //展示评论
      //  const{data: res2} = await this.$http.get('/api/friend/gethelps?help_userid='+userid+'&&user_article='+this.help_userid)
      var help_article = sessionStorage.getItem('help_article')
      const{data: res2} = await this.$http.post('/api/friend/gethelps',{help_userid:imformation[0].userid,user_article:this.helpa})
       console.log(res2);
       if(res2.code==200){
          for(var i=0;i<res2.data.length;i++){
            this.helpform[i]["help_name"] = res2.data[i].help_name
            this.helpform[i]["pinglun"] = res2.data[i].help_article
          }
        console.log(this.helpform);
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
       this.$router.push('/survey_h')
    },
    clickchange1(){
       this.$router.push('/self')
    },
    deletes(item) {
      console.log(item);
    this.$dialog.alert({
        message: "确认完成该求助？", //改变弹出框的内容
        showCancelButton: true //展示取消按钮
})
.then(async() => { //点击确认按钮后的调用
         console.log("点击了确认按钮噢")
          console.log(item);
        const{data: res3} = await this.$http.post('/api/friend/updatehelp',{id:item.id})
        console.log(res3);
       this.getuserlist()
      //  if(res3.code==200){
      //    id.help_state=1
      //  }
})
.catch(() => { //点击取消按钮后的调用
         console.log("点击了取消按钮噢")
})
    }
 }
}
</script>

<style scoped>
.headpic p {
  color: #fff;
  text-align: center;
  font-size: 45px;
  /* margin-top: 30px; */
}
.headpic p {
  color: #fff;
  text-align: center;
  font-size: 30px;
  /* margin-top: 30px; */
}
.headpic {
  background: url('https://img01.yzcdn.cn/vant/cat.jpeg');
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
.like{
  display: flex;
  align-items: center;
}
.like img {
  height: 50px;
}
.like p {
  font-size: 30px;
  margin-left: 10px;
}
.container {
    margin-top: 17px !important;
    margin-bottom: 20px !important;
    margin: 0 auto;
    height: 100%;
    width: 96%;
    background-color: #fff;
    box-shadow: 5px 35px 70px 70px #e3ecec;
}
.todo{
  margin-left: 400px;
  padding-top: 5px;
}
.tell p{
  font-size: 20px;
  margin-left: 0.2rem;
}
.helptest{
  margin-left: 12px;
  font-size: 25px;
}
.nav button {
  border: 0;
  margin-left: 150px;
}
.othercomment{
  padding-bottom: 1px;
}
</style>