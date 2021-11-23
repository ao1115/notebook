<template>
  <div>
    <div class="nav">
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
        <span class="names">
          <router-link
            :to="`/note?noteId = ${note.id}&notebookId = ${currentBook.id}`"
          >
            {{ note.title }}</router-link
          >
        </span>
        <span>{{ note.updateAt }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import Auth from "@/apis/auth";
import NoteBooks from "@/apis/notebooks";
import Notes from "@/apis/notes";
import Avatar from "@/components/Avatar.vue";
export default {
  components: { Avatar },
  data() {
    return {
      notebooks: [],
      notes: [],
      currentBook: {},
      currenNote: {},
    };
  },
  created() {
    Auth.getInfo().then((data) => {
      if (!data.isLogin) {
        this.$router.push({ path: "/login" });
      }
    });
    NoteBooks.getAll()
      .then((res) => {
        this.notebooks = res.data;
        this.currentBook =
          this.notebooks.find((notebook) => {
            notebook.id == this.$route.query.notebookId;
          }) ||
          this.notebooks[0] ||
          {};
        return Notes.getAll({ notebookId: this.currentBook.id });
      })
      .then((res) => {
        this.notes = res.data;
      });
  },
  methods: {
    logout() {
      console.log("logout");
      Auth.logout().then((res) => {
        this.$router.push({ path: "login" });
      });
    },
    //新建笔记
    onCreate() {
      this.$prompt("请输入标题", "新建笔记", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: "标记不能为空，且不能超过30个字符",
      })
        .then(({ value }) => {
          return Notes.addNote({ title: value, content });
        })
        .then((res) => {
          this.notes.unshift(res.data);
          this.$message({
            type: "success",
            message: "创建成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "创建失败",
          });
        });
    },

    handleCommand(notebookId) {
      console.log(notebookId);
      this.currentBook = this.notebooks.find(
        (notebook) => notebook.id === notebookId
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

@import "~@/assets/style/reset.scss";
</style>