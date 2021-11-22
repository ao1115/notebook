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
    <ul class="info">
      <li class="add" @click="onCreate">
        <Icon name="add" />
        <span>新建</span>
      </li>
      <li><Avatar /></li>
      <li class="logout" @click="logout">
        <Icon name="logout" />
        <span>退出</span>
      </li>
    </ul>
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
      this.$prompt("请输入笔记本标题", "新建笔记本", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: "标记不能为空，且不能超过30个字符",
      })
        .then(({ value }) => {
          return NoteBooks.addNoteBook({ title: value });
        })
        .then((res) => {
          this.notebooks.unshift(res.data);
          this.$message({
            type: "success",
            message: res.msg,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: res.msg,
          });
        });
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
  padding-left: 24px;
  padding-right: 24px;
  border-bottom: 1px solid #f5f5f5;
  > .logo {
    width: 232px;
    height: 100%;
    margin: 10px;
    > .icon {
      width: 32px;
      height: 32px;
      color: rgb(38, 112, 248);
    }
    > span {
      position: absolute;
      top: 25px;
      color: rgb(38, 112, 248);
    }
  }
  .search {
    position: relative;
    top: 6px;
    right: 308px;
    > input {
      width: 200px;
      height: 32px;
      border: 1px solid #f5f5f5;
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
    padding: 10px 8px;
    .icon {
      width: 24px;
      height: 24px;
    }
    > li {
      margin-right: 10px;
    }
    .add {
      > span {
        line-height: 24px;
      }
    }
  }
}
@import "~@/assets/style/reset.scss";
</style>