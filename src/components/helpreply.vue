<template>
  <div>
  <div>
        <van-image 
      :data="photo"
      :src="photo.backgroundPhoto" 
      width="100%" height="100%" 
      style="z-index:-100;position:fixed;left:0;top:0"/>
      <van-overlay :show="show" @click="show = false">
        <div class="wrapper" @click.stop>
    <van-uploader :after-read="afterRead" preview-size="75px" style="padding:300px"/>
        </div>
</van-overlay>
     <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div style="text-align:center;padding:10px">
      <van-icon 
        name="arrow-left" 
        style="float:left" 
        @click="onClickLeft"/>
        <font class="my">我的求助</font>
      <van-icon name="sort" color="#000000"/>
    </div>
    <!-- 背景图 -->
    <div style="height:140px" @click="show = true">
      <!-- <van-image
        width="100%"
        height="200px"
        src="https://gitee.com/i-lift-my-hair/image/raw/master/bizhi.jpg"
      /> -->
    <!-- 主页个人头像 -->
      <div
      :data="mainPicture"
      >
      <van-image
      round
      style="margin-top:10%;float:left;padding:20px"
      width="85px"
      height="85px"
      :src="mainPicture.user_chart"
      />
      </div>
    </div>
<hr style="filter: alpha(opacity=100,finishopacity=0,style=3)" width="90%" color=#000 size=2>
    <!-- 第一个单元格 -->
    <div class="box" :data="info" v-for="item in info" :key="item.id">
    <van-cell-group>
      <!-- 文字==已交互成功 -->
      <font size="3" style="padding:5px">
        {{ item.help_article }}  
      </font>
      <div style="padding:5px">
        <!-- 内容图片==已交互成功 -->
      <van-image
        width="100%"
        height="100%"
        :src="item.help_chart"
        />
      </div>
      <!-- <van-cell-group>
      <div style="padding-left:5px;width:100%;">
          <div id="left" style="width:15%;float:left;">谢羽羽</div>
          <div style="width:2%;float:left;">：</div>
          <div id="right" style="width:83%;float:left;">没有，下一个！</div>
        </div>
        <div style="padding-left:5px;width:100%;">
          <div id="left" style="width:15%;float:left;">谢小羽</div>
          <div style="width:2%;float:left;">：</div>
          <div id="right" style="width:83%;float:left;">没有，下一个！</div>
        </div>
        <div style="padding-left:5px;width:100%;">
          <div id="left" style="width:20%;float:left;">爱打瞌睡</div>
          <div id="center" style="width:10%;float:left;">回复</div>
          <div id="left" style="width:15%;float:left;padding-right:5px">谢羽羽</div>
          <div style="width:2%;float:left;">：</div>
          <div id="right" style="width:50%;float:left;">略略略</div>
        </div>
      </van-cell-group> -->
          <div style="padding-left:5px;width:100%;" >
    <font style="float:left;">
        <!-- {{ item.help_name }} -->
        {{ item.id }}
        &nbsp;&nbsp;:&nbsp;&nbsp;
        {{ item.help_article }}
    </font>
    </div>
      <van-field
        style="padding:5px"
        v-model="message1"
        label="评论"
        right-icon="flower-o"
        disabled
      />
    </van-cell-group>
    </div>
    </van-pull-refresh>
  </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import Vue from 'vue';
import { Uploader } from 'vant';

Vue.use(Uploader);

export default {
  data() {
    return {
      info: {},
      mainPicture: [],
      isLoading: false,
      show: false,
      photo:[],
      showreply:false,
      message:'',
      message1:'',
      text:'',
      show: false,
      actions: [{ name: '从手机里选择' }],
    };
  },
    created(){
    this.userid = this.$route.query.userid;
    this.getPhoto();
    this.getAll();
    this.getComment();
    this.getAllOne();
  },
  methods: {
    //获取主页头像
    async getPhoto() {
      sessionStorage.setItem('userid',this.userid);
      const userid=sessionStorage.getItem('userid');
      // const code="6db31a1da3043bd885dc6570d7282158";
      // const { data: res } = await this.$http.get('/api/dingding/form?code='+code);
      // console.log(res);
      // sessionStorage.setItem('userid',res.data.userid);
      // const userid=sessionStorage.getItem('userid');
      // if(res.code == 200){
      // const { data:res } =await this.$http.get('/api/dingding/photo?userid='+userid);
      // console.log(res);
      // this.mainPicture.mainPhoto = res.data;//渲染主页头像
      // // console.log(this.mainPicture.mainPhoto);
      // }
      // for(const i = 0;i<userid.length;i++) {
      //   //将第i个数组的数据放入新的容器中
      //   this.temp = this.userid[i].artists;
      //   //利用push函数在songer数组中追加temp的数组
      //   this.userid.push(this.temp);
      // }
      console.log(userid);
      const { data:res } = await this.$http.get('/api/dingding/photo?userid='+userid);
      console.log(res);
      // this.mainPicture.user_chart = res.data[0].user_chart;
      console.log(res.data);
      this.mainPicture.user_chart = res.data;
    },
    async getAllOne() {
      const { data: res } = await this.$http.get('/api/friend/gethelpall');
      console.log(res);
      sessionStorage.setItem('helpuserid', res.data.map(o=>{return[o.userid]}));
      sessionStorage.setItem('userarticle', res.data.map(o=>{return[o.help_article]}));
    },
    async getComment() {
      const help_userid = sessionStorage.getItem('helpuserid');
      // console.log(help_userid);
      const user_article = sessionStorage.getItem('userarticle');
      // console.log(user_article);
      const { data:res } = await this.$http.post('/api/friend/gethelps',
      {
        help_userid: help_userid,
        user_article: user_article
      });
      console.log(res);
      this.info = res.data;
    },
    async getAll() {
      const userid=sessionStorage.getItem('userid');
      const { data: res } = await this.$http.get('/api/friend/gethelp?userid='+userid);
      console.log(res);
      this.info = res.data;
    },
    onClickLeft() {
      this.$router.replace('/help');
    },
    reply() {
      this.showreply = true;
    },
    ok() {
      this.showreply=false;
    },
    onCancel() {
      Toast('取消');
    },
      //更换背景图片
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      this.show=false;
      this.photo.backgroundPhoto=file.content
    },
    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功');
        this.isLoading = false;
      }, 1000);
    },
  },
};
</script>

<style scoped>
  .my {
  padding: 10px;
  font-family:"华文琥珀";
  font-size: 30px;
}
  .custom-image .van-empty__image {
    width: 90px;
    height: 90px;
  }
  .van-empty {
    padding: 0px;
  }
  .van-divider {
    margin: 0px;
  }
  .box {
    width:90%;
    border:2px solid white;
    border-radius:20px;
    padding: 5px;
    box-shadow:20px 10px 40px 20px #e3ecec;
    margin: 35px auto;
  }
</style>
