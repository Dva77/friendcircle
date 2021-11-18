<template>
  <div class="container">
    <div class="header">
    <van-nav-bar title="消息" left-arrow @click-left="back"></van-nav-bar>
    </div>

    <div class="main"
    :data="commentform"
     v-for="(item,index) in commentform"
    :key="index"
    >
      <!-- 头像名字 -->
      <div class="touxiang">
       <van-image round width="1.3rem" height="1.3rem" :src="item.user_chart"/>
       <span>{{item.comment_name}}</span>
       <span class="time">{{item.created_at}}</span>
      </div>
      <!-- 评论 -->
      <div class="newcomment" @click="ass(item)">
        <div class="huifu">{{item.user_name}}回复:{{item.pinglun}}</div>
      <span class="newcomments">{{item.comment_article}} </span>
      </div>
      <div class="talktalk">
         <div class="tell">
        <div class="dongtai">{{item.user_article}}</div>
          <div class="tell-pic">
            <!-- 图片 -->
          <van-grid :border="false" :column-num="1">
          <van-grid-item>
            <van-image :src="item.comment_chart" />
          </van-grid-item>
          </van-grid>
          </div>
          </div>
          </div>
          <!-- 回复 -->
          <div class="reword">
             <!-- <van-cell-group class="van-ellipsis">
             <van-field label="回复" placeholder="请输入评论"/>
            </van-cell-group> -->
            <span>回复</span>
            <!-- @input.native="change($event,index)" -->
            <input clearable v-model="commentinfo" >
            <button @click="sentcomment">发送</button>
          </div>
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
  </div>
</template>
 

<script>
export default {
 created() {
    this.getuserlist()
  },
data() {
  return {
    userid:'',
    commentinfo:'',
    imformation:[],
    commentform:[],
  }
},
methods:{
  // change:function(e,index) {
  //   this.commentinfo = e.target.value;
  // },
  ass(item){
    console.log(item);
  },
  back(){
    this.$router.push('/self')
  },
  async getuserlist(){
    var user_name = sessionStorage.getItem('user_name')
    console.log(user_name);
    localStorage.setItem('user_name',user_name)
    const{data: res} = await this.$http.get('/api/friend/userc?user_name='+user_name)
    console.log(res);
    this.commentform = res.data
    for(var i =0;i<res.data.length;i++){
      this.commentform[i]["commentInfo"];
    }
    console.log(this.commentform);
    console.log(res.data[0].user_chart);
    console.log(res.data[0].comment_name);
    sessionStorage.setItem('comment_name',res.data[0].comment_name)
    sessionStorage.setItem('user_article',res.data[0].user_article)
    sessionStorage.setItem('useridother',res.data[0].userid)

    //头像
    this.userid = res.data[0].user_chart
    },
    async sentcomment(){
      var comment_name = sessionStorage.getItem('comment_name')
      console.log(comment_name);
      var user_article = sessionStorage.getItem('user_article')
      console.log(user_article);
      var user_name = sessionStorage.getItem('user_name')
      console.log(user_name);
       var imformation =JSON.parse(localStorage.getItem('imformation'))
       var useridself =imformation[0].userid
      console.log(this.imformation);
      console.log(useridself);

      var useridother = sessionStorage.getItem('useridother')
      console.log(useridother);

     const{data: res1} = await this.$http.post('/api/friend/creplys',
     {comment_name:comment_name,
       comment_article:this.commentinfo,
       userid:useridself,
       comment_userid:useridother,
       user_name:user_name,
       user_article:user_article
     })
     console.log(res1);
     if(res1.code==200){
       console.log(this.commentinfo);
        // for(var i = 0;i<this.commentform.length;i++){
         this.commentform[0]["pinglun"]=this.commentinfo
        // }
        console.log(this.commentform);
        this.commentinfo=''
        this.getuserlist()
     }
    }
}

}
</script>

<style scoped>
.header{
  height: 1.2rem;
  background-color: rgb(0, 0, 0);
}
.headphoto{
  width:1.5rem;     
  height:1.5rem;
  margin-left: -57px;
}
.van-ellipsis {
    overflow: visible !important;;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.main{
  margin-top: 50px;
}
.container{
  height: 100%;
  background-color: #d7e7ee;
  /* margin-bottom: 1000px; */
  box-shadow: 5px 35px 40px 40px #e3ecec;
}
.main{
  margin-top: 0.6rem !important;
  margin: 0 auto;
  height: 100%;
  width: 96%;
  background-color: #fff;
  /* border-radius: 22px; */
}
.touxiang{
  padding-top: 12px;
  padding-left: 13px;
}
.touxiang span {
  font-size: 27px;
  margin-left: 15px;
}
.talktalk {
  margin: 0 auto;
  width: 97%;
  height:100%;
  /* background-color: #dbe1e4; */
  border: 2px solid #eee;
}
.newcomment {
  margin-top: 10px;
  margin-left: 8px;
}
.reword {
  margin-top: 10px;
}
.time{
  font-size: 16px !important;
}
.dongtai{
  font-size: 20px;
  margin-left: 7px;
  margin-top: 5px;
}
.newcomments{
  font-size: 22px;
}
.reword span {
  margin-left: 10px;
  font-size: 17px;
}
.reword input {
  height: 18px;
  margin-left: 10px;
  width: 300px;
  border: 1px solid rgb(213, 211, 211);
  margin-bottom: 9px;
}
.reword button{
  color: #fff;
  border: 1px solid rgb(146, 187, 233); 
  margin-left: 10px;
  background-color: rgb(85, 182, 247);
  border-radius: 9px;
}
.huifu{
    font-size: 20px;
    margin-bottom: 10px;
}
</style>