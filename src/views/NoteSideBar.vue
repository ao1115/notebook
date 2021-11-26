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
              icon="el-icon-circle-plus-outline"
            >
              {{ notebook.title }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <div class="add" @click="addNote">
          <el-tooltip
            class="item"
            effect="dark"
            content="新建笔记"
            placement="bottom"
          >
            <el-button>
              <Icon name="add" />
            </el-button>
          </el-tooltip>
        </div>
      </div>
      <div v-if="notes.length == 0" class="no-notebook">
        <span><Icon name="notes" /></span>
        <span>暂无笔记，新建一个吧</span>
      </div>
      <ul class="note-detail" v-else>
        <li class="name">
          <span class="title-name">名称</span>
          <span class="update">更新时间</span>
        </li>
        <li class="notes" v-for="note in notes" :key="note.id">
          <span class="names">
            <Icon name="notes" />
            <router-link
              :to="`/note?noteId=${note.id}&notebookId=${currentBook.id}`"
              class="title"
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
import Bus from "@/helpers/bus";
export default {
  components: { Avatar },
  created() {
    Auth.getInfo().then((res) => {
      this.username = res.data.username;
    });
    NoteBooks.getAll()
      .then((res) => {
        this.notebooks = res.data;
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
        Bus.$emit("update:notes", this.notes);
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
  props: ["currentNote"],
  methods: {
    //判断是否是登录状态
    logout() {
      console.log("logout");
      Auth.logout().then((res) => {
        this.$router.push({ path: "login" });
      });
    },

    //新建笔记
    addNote() {
      this.$prompt("请输入笔记标题", "新建笔记", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          return Notes.addNote(
            { notebookId: this.currentBook.id },
            { title: value }
          );
        })
        .then((res) => {
          this.notes.unshift(res.data);
          this.$message({
            type: "success",
            message: res.msg,
          });
        })
        .catch((res) => {
          this.$message({
            type: "info",
            message: res.msg,
          });
        });
    },

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
.no-notebook {
  display: flex;
  flex-direction: column;
  text-align: center;
  color: #8ac3fc;
  .icon {
    width: 120px;
    height: 120px;
    margin: 120px 120px 10px 120px;
  }
}

.note-side-bar {
  height: calc(100vh - 60px);
  min-width: 960px;
}
.notebooks {
  margin-top: 26px;
  border-bottom: 1px solid #f5f5f5;
  padding-left: 12px;
  padding-right: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  ::v-deep .el-dropdown {
    font-size: 18px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .add {
    margin-right: 34px;
    ::v-deep.el-button {
      border: none;
      padding: 0;
      background-color: transparent;
    }
    & .icon {
      width: 32px;
      height: 32px;
      color: #409eff;
    }
  }
}

.note-detail {
  display: flex;
  flex-direction: column;
  > li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid #f5f5f5;
    padding: 16px 8px;
    padding-right: 28px;
    font-size: 14px;
  }
  > .notes:hover {
    background-color: #f5f5f5;
  }
  .name {
    color: #409eff;
    > :first-child {
      margin-left: 28px;
    }
    > :nth-child(2) {
      margin-right: 8px;
    }
  }

  .names {
    margin-left: 10px;
    > .title {
      margin-left: 4px;
    }
    > .icon {
      color: #409eff;
    }
  }
}

@import "~@/assets/style/reset.scss";
</style>