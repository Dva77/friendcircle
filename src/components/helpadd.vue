<template>
  <div>
      <!--顶部导航栏-->
      <div style="height:25px;text-align:center;padding:20px;background-color:black">
        <font style="float:left;color:white" @click="onClickLeft">取消</font>
        <font class="mytext">我的求助</font>
        <van-button type="default" style="float:right;" @click="addOk" size="mini">发表</van-button>
      </div>
        <!-- @click-right="onClickRight" -->
        <!-- 添加请求的内容 -->
        <van-cell-group class="boxadd">
          <div :model='article'>
          <van-field
          v-model="article.help_article"
          rows="17"
          autosize
          label=""
          type="textarea"
          maxlength="935"
          placeholder="提出待解决问题......"
          show-word-limit/>
          </div>
        <div :model="chart">
        <!-- 上传文件和文件预览 -->
        <van-uploader :after-read="afterRead" v-model="chart.help_chart" upload-text="照片/视频" preview-size="75px" multiple :max-count="1" ref="file"/>
        </div>
</van-cell-group>
  </div>
</template>

<script>
import { Toast } from 'vant';

export default {
    data() {
        return {
        article: {
        help_article: '',
        },
        chart: [  
        ],
        // { url: 'https://img01.yzcdn.cn/vant/leaf.jpg' },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        // { url: 'https://cloud-image', isImage: true },
      }
  },
  created() {
      this.getlist();
    },
  methods: {
      afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      //创建FormData对象
      // FormData 对象的使用：
      // 1.用一些键值对来模拟一系列表单控件：即把form中所有表单元素的name与value组装成一个queryString
      // 2. 异步上传二进制文件。
      //上传图片需要转换二进制这里要用到FormData
      const forms = new FormData();
      //这里的file表示给后台传的属性名字，这里看接口文档需要传的的属性
      forms.append("file", file.file); // 获取上传图片信息
	    //向后端发送相应的请求
	    //headers是上传图片需要用到的响应头，此处的token是后端那边给设置的，所以我请求的时候需要带上token，
	    //token根据实际情况自行添加
        this.$http.post('/api/file/photo', forms, {
          headers: {
            "content-type": "multipart/form-data"
          },
        })
        .then((res) => {
          //如果传入的响应状态码为200，则成功将文件发送给后台
          if (res.data == 200) {
            console.log(res);
          } else {
            console.log(res.data.fileUrl)//这块是请求失败后台给返回的相应的数据
            sessionStorage.setItem('help_chart',res.data.fileUrl);
          }
        });
    },
    async getlist() {
        const code="314b0265aca335a093a6ff8a5312956d";
        const { data: res } = await this.$http.get('/api/dingding/form?code='+code);
        console.log(res);
        sessionStorage.setItem('userid',res.data.userid);
        sessionStorage.setItem('help_name',res.data.user_name);
      },
    async addOk() {
      console.log(this.article.help_article);
      console.log(this.chart.help_chart);
      const userid=sessionStorage.getItem('userid')
      const help_name=sessionStorage.getItem('help_name')
      const help_chart=sessionStorage.getItem('help_chart');
      console.log(help_chart);
      const { data: res } = await this.$http.post('/api/friend/hsend',
      { help_name: help_name, 
        userid:userid, 
        help_article: this.article.help_article, 
        help_chart: help_chart
      });
      console.log(res);
      if(res.code == 200){
        Toast('发表成功');
        this.$router.replace('/help');
      } else {
        Toast('发表失败，请重新发表');
        this.$router.replace('/help');
      }
    },
    onClickLeft() {
      Toast('取消成功');
      this.$router.replace('/help');
    },
    // onClickRight() {
    //   Toast('发表成功');
    //   this.$router.replace('/help');
    // },
  },
};
</script>

<style>
.mytext {
  color:white;
  font-family:"楷体";
  text-align:center;
  font-size: 30px;
}
.van-nav-bar__title {
    color: #FFF;
    font-weight: 600;
    font-size: 30px;
}
.van-nav-bar .van-icon {
    color: #fff;
}
.van-nav-bar__text {
    color: #FFF;
}
.van-nav-bar__title.van-ellipsis {
    font-family:"楷体";
    font-size: 40px;
    height: 30px; 
    color: #FFF;
}
   .van-nav-bar {
    padding: 50px;
 }
   .boxadd {
    width:90%;
    height: 550px;
    border:2px solid white;
    border-radius:20px;
    box-shadow:0px 10px 20px 20px #e3ecec;
    margin: 20px auto;
  }
  .van-uploader {
    position: absolute;
    bottom: 0px;
  }
</style>
