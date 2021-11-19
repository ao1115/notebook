<template>
  <div class="nav">
    <div class="logo">
      <Icon name="logo" />
      <span> 云笔记</span>
    </div>
    <div class="search">
      <input type="search" placeholder="搜索" />
      <Icon name="search" />
    </div>
    <div class="info">
      <Avatar />
      <button @click="logout">退出登录</button>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar.vue";
import Auth from "@/apis/auth";
export default {
  components: { Avatar },
  methods: {
    logout() {
      console.log("logout");
      Auth.logout().then((data) => {
        console.log(data);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 8px;
  margin-left: 8px;
  > .logo {
    width: 232px;
    height: 100%;
    > .icon {
      width: 32px;
      height: 32px;
    }
  }
  .search {
    position: relative;
    > input {
      width: 200px;
      height: 32px;
      border: 1px solid #d3d3d3;
      border-radius: 8px;
      text-align: left;
      padding: 0 24px;
    }
    > .icon {
      position: absolute;
      top: 8px;
      left: 4px;
    }
  }
  .info {
  }
}
@import "~@/assets/style/reset.scss";
</style>