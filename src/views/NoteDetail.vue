<template>
  <div>
    <div class="nav">
      <div class="search">
        <input type="search" placeholder="搜索" />
        <Icon name="search" />
      </div>
      <ul class="info">
        <li class="add">
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
    <div class="note-detail">
      <NoteSideBar />
      <div class="edit-content" @update:notes="(value) => (notes = value)">
        <h3 class="note-title">笔记标题</h3>
        <div class="about">
          <ul>
            <li>作者</li>
            <li>|</li>
            <li>笔记本标题</li>
            <li>|</li>
            <li>更新时间</li>
          </ul>
          <ul>
            <li>markdown</li>
            <li>删除</li>
            <li>保存</li>
          </ul>
        </div>
        <div class="edit">
          <div>
            <input type="text" placeholder="请输入标题" />
          </div>
          <div>
            <textarea placeholder="请输入内容"></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Auth from "@/apis/auth";
import NoteBooks from "@/apis/notebooks";
import Notes from "@/apis/notes";
import Avatar from "@/components/Avatar.vue";
import NoteSideBar from "./NoteSideBar.vue";
window.Notes = Notes;
export default {
  components: { Avatar, NoteSideBar },
  data() {
    return {
      notebooks: [],
      notes: [],
      currentBook: {},
      currentNote: {},
      username: "",
    };
  },

  created() {
    Auth.getInfo().then((data) => {
      if (!data.isLogin) {
        this.$router.push({ path: "/login" });
      }
    });
    Auth.getInfo().then((res) => {
      this.username = res.data.username;
    });
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to.query.noteId, from);
    // this.currentNote = this.notes.find((note) => note.id === to.query.noteId);
    next();
  },

  methods: {
    getQuery() {
      console.log(this.$route.query);
    },
    //判断是否是登录状态
    logout() {
      console.log("logout");
      Auth.logout().then((res) => {
        this.$router.push({ path: "login" });
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
  > .search {
    position: relative;
    top: 6px;
    // right: 308px;
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
.note-detail {
  display: flex;
  flex-direction: row;
}
.edit-content {
  display: flex;
  flex-direction: column;
  .note-title {
    margin-left: 24px;
  }
  .about {
    height: 56px;
    width: 630px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 24px;
    > ul {
      display: block;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
  .edit {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    display: block;
    margin-left: 24px;

    & input {
      border-bottom: 1px solid #f5f5f5;
      margin-top: 24px;
      width: 960px;
    }
    & textarea {
      margin-top: 24px;
      width: 960px;
    }
  }
}

@import "~@/assets/style/reset.scss";
</style>