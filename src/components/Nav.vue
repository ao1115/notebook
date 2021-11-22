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
      <div class="add" @click="onCreate">
        <Icon name="add" />
        <span>新建</span>
      </div>
      <Avatar />
      <div class="logout" @click="logout">
        <Icon name="logout" />
        <span>退出</span>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar.vue";
import Auth from "@/apis/auth";
import Icon from "./Icon.vue";
import NoteBooks from "@/apis/notebooks";
export default {
  components: { Avatar, Icon },
  methods: {
    logout() {
      console.log("logout");
      Auth.logout().then((data) => {
        this.$router.push({ path: "login" });
      });
    },
    onCreate() {
      let title = window.prompt("请输入标题");
      if (title.trim() === "") {
        alert("笔记标题不能为空");
        return;
      }
      NoteBooks.addNoteBook({ title }).then((res) => {
        this.notebooks.unshift(res.data);
        console.log(res);
        console.log(res.msg);
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 4px;
    .icon {
      width: 32px;
      height: 32px;
    }
  }
}
@import "~@/assets/style/reset.scss";
</style>