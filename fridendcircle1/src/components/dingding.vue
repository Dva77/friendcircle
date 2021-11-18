<template>
  <div>
    <div>{{res}}</div>
<div>{{code}}</div>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';

export default {
  data() {
    return {
      code: '',
      res: '',
    };
  },
  mounted() {
    if (dd.env.platform != 'notInDingTalk') {
      dd.ready(() => {
        dd.runtime.permission.requestAuthCode({ corpId: 'ding322bf8c51662adf3a1320dcb25e91351' }).then((result) => {
          console.log(result);
          this.res = result;
          this.code = result.code;
        }).catch((err) => {
          console.log(err);
          alert(err);
        });
      });
    } else {
      console.warn('请在钉钉中访问本应用!');
    }
  },
};
</script>

<style scoped>
</style>
