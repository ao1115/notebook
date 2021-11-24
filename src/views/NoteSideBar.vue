<template>
  <div>
    <div class="note-side-bar">
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
              :to="`/note?noteId=${note.id}&notebookId=${currentBook.id}`"
            >
              {{ note.title }}</router-link
            >
          </span>
          <span>{{ note.updatedAt }}</span>
        </li>
      </ul>
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
        console.log(this.notebooks);
        console.log(this.$route.query.notebookId);
        this.currentBook =
          this.notebooks.find(
            (notebook) => notebook.id == this.$route.query.notebookId
          ) ||
          this.notebooks[0] ||
          {};
        return Notes.getAll({ notebookId: this.currentBook.id });
      })
      .then((res) => {
        this.notes = res.data;
        this.$emit("update:notes", this.notes);
      });
  },
  data() {
    return {
      notebooks: [],
      notes: [],
      currentBook: {},
      currentNote: {},
      username: "",
    };
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
    // onCreate() {
    //   this.isShowEdit = true;
    //   this.isShowNotes = false;
    // },
    // onSave() {
    //   this.$router.back(-1);
    //   this.isShowEdit = false;
    //   this.isShowNotes = true;
    // },
    // goBack() {
    //   history.pushState(null, null, document.URL);
    //   window.addEventListener("popstate", this.goBack, false);
    //   this.isShowEdit = false;
    //   this.isShowNotes = true;
    // },
    //element-ui下拉菜单实现跳转
    handleCommand(notebookId) {
      this.currentBook = this.notebooks.find(
        (notebook) => notebook.id == notebookId
      );
      Notes.getAll({ notebookId }).then((res) => {
        this.notes = res.data;
        this.$emit("update:notes", this.notes);
      });
    },
  },
};
</script>


<style lang="scss" scoped>
.note-side-bar {
  height: calc(100vh - 60px);
  border-right: 1px solid #f5f5f5;
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
  width: 260px;
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