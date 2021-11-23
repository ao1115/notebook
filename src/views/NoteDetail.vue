<template>
  <div>
    <div v-show="isShowNotes">
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
      <div class="notebooks">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{ currentBook.title }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              :command="notebook.id"
              v-for="notebook in notebooks"
              :key="notebook.id"
            >
              {{ notebook.title }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <ul class="note-detail">
        <li class="name">
          <span>名称</span>
          <span>更新时间</span>
        </li>
        <li class="notes" v-for="note in notes" :key="note.id">
          <span class="names" @click="onCreate">
            <router-link
              :to="`/note?noteId = ${note.id}&notebookId = ${currentBook.id}`"
            >
              {{ note.title }}</router-link
            >
          </span>
          <span>{{ note.updatedAt }}</span>
        </li>
      </ul>
    </div>
    <div class="edit-content" v-show="isShowEdit">
      <h3 class="note-title">{{ this.notes }}</h3>
      <div class="about">
        <ul>
          <li>{{ username }}</li>
          <li>|</li>
          <li>{{}}</li>
          <li>|</li>
          <li>更新时间11:30</li>
        </ul>
        <ul>
          <li>markdown</li>
          <li>删除</li>
        </ul>
      </div>
      <div class="edit">
        <div>
          <input type="text" v-model="notetitle" placeholder="请输入标题" />
        </div>
        <div>
          <textarea v-model="notecontent" placeholder="请输入内容"></textarea>
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
window.Notes = Notes;
export default {
  components: { Avatar },
  data() {
    return {
      notebooks: [],
      notes: [],
      currentBook: {},
      currenNote: {},
      isShowEdit: false,
      isShowNotes: true,
      username: "",
      notetitle: "",
      notecontent: "",
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
    NoteBooks.getAll()
      .then((res) => {
        this.notebooks = res.data;
        console.log(this.$route.query);
        this.currentBook =
          this.notebooks.find((notebook) => {
            notebook.id == this.$route.query;
          }) ||
          this.notebooks[0] ||
          {};
        return Notes.getAll({ notebookId: this.currentBook.id });
      })
      .then((res) => {
        this.notes = res.data;
        console.log(this.notes);
      });
  },

  methods: {
    //判断是否是登录状态
    logout() {
      console.log("logout");
      Auth.logout().then((res) => {
        this.$router.push({ path: "login" });
      });
    },
    //新建笔记
    onCreate() {
      this.isShowEdit = true;
      this.isShowNotes = false;
      console.log(this.notetitle);
      console.log(this.notecontent);
      Notes.addNote({
        notebookId: this.currentBook.id,
        title: this.notetitle,
        content: this.notecontent,
      }).then((res) => {
        console.log(res.msg);
      });
    },
    goBack() {},

    //element-ui下拉菜单实现跳转
    handleCommand(notebookId) {
      console.log(notebookId);
      this.currentBook = this.notebooks.find(
        (notebook) => notebook.id == notebookId
      );
      Notes.getAll({ notebookId }).then((res) => {
        this.notes = res.data;
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
.notebooks {
  height: 32px;
  margin-top: 24px;
  border-bottom: 1px solid #f5f5f5;
  line-height: 12px;
  padding-left: 12px;
  padding-right: 12px;
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}

.note-detail {
  width: 990px;
  display: flex;
  flex-direction: column;
  > li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 24px;
    margin-top: 18px;
    border-bottom: 1px solid #f5f5f5;
    line-height: 10px;
    padding-left: 12px;
    padding-right: 12px;
  }
  .notes {
    .names {
    }
  }
}
.edit-content {
  display: flex;
  flex-direction: column;
  .about {
    height: 56px;
    width: 990px;
    border: 1px solid red;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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