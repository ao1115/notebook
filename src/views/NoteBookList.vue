<template>
  <div>
    <div class="nav">
      <ul class="info">
        <li class="add" @click="onCreate">
          <el-tooltip
            class="item"
            effect="dark"
            content="新建"
            placement="bottom"
          >
            <el-button>
              <Icon name="add" />
            </el-button>
          </el-tooltip>
        </li>
        <li><Avatar /></li>
        <li class="logout" @click="logout">
          <el-tooltip
            class="item"
            effect="dark"
            content="退出登录"
            placement="bottom"
          >
            <el-button>
              <Icon name="logout" />
            </el-button>
          </el-tooltip>
        </li>
      </ul>
    </div>
    <div class="notebookList">
      笔记本列表
      <span class="count">{{ notebooks.length }}</span>
    </div>
    <ul class="notebooks">
      <li v-for="notebook in notebooks" :key="notebook.id" class="notebook">
        <div class="title">
          <Icon name="notebook" class="notebook-icon" />
          <router-link :to="`/note?notebookId=${notebook.id}`">
            <span class="notebook-title">{{ notebook.title }}</span>
          </router-link>
          <span class="noteCounts">{{ notebook.noteCounts }}</span>
          <span @click.stop.prevent="onEdit(notebook)" class="onEdit">
            <Icon name="pan" class="pan"
          /></span>
        </div>
        <div class="createdAt">{{ notebook.createdAt }}</div>
        <span @click.stop.prevent="onDelete(notebook)" class="remove">
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="bottom"
          >
            <el-button>
              <Icon name="remove" />
            </el-button>
          </el-tooltip>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
window.NoteBooks = NoteBooks;
import Auth from "@/apis/auth";
import NoteBooks from "@/apis/notebooks";
import Avatar from "@/components/Avatar.vue";
export default {
  components: { Avatar },
  data() {
    return { notebooks: [], notebook: {} };
  },
  created() {
    Auth.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$router.push({ path: "/login" });
      }
    });
    NoteBooks.getAll().then((res) => {
      this.notebooks = res.data;
      console.log(notebook.id);
    });
  },
  methods: {
    logout() {
      console.log("logout");
      Auth.logout().then((res) => {
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
            message: "创建失败",
          });
        });
    },
    onEdit(notebook) {
      let title = "";
      this.$prompt("请输入笔记本标题", "修改笔记本", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{1,30}$/,
        inputValue: notebook.title,
        inputErrorMessage: "标题不能为空，且不能超过30个字符",
      })
        .then(({ value }) => {
          title = value;
          NoteBooks.updateNoteBook(notebook.id, { title }).then((res) => {
            notebook.title = title;
            this.$message({
              type: "success",
              message: res.msg,
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "网络异常",
          });
        });
    },
    onDelete(notebook) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return NoteBooks.deleteNoteBook(notebook.id);
        })
        .then((res) => {
          this.notebooks.splice(this.notebooks.indexOf(notebook), 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
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
  justify-content: flex-end;
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
    ::v-deep.el-button {
      border: none;
      padding: 0;
      font-size: 4px;
      background-color: transparent;
    }
    .icon {
      width: 32px;
      height: 32px;
      color: #409eff;
    }
    > li {
      margin-right: 10px;
    }
  }
}
.notebookList {
  height: 56px;
  line-height: 56px;
  margin-left: 28px;
  color: #409eff;
  font-size: 18px;
  > .count {
    margin-left: 2px;
    font-size: 14px;
    font-weight: bolder;
  }
}
.notebooks {
  > li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid #f5f5f5;
    padding: 16px 8px;
    font-size: 14px;
    .notebook-icon {
      margin-left: 4px;
      color: #409eff;
    }
    > .title {
      min-width: 450px;
      margin-left: 10px;
      .notebook-title {
        margin-left: 12px;
      }
      .icon {
        margin-left: 10px;
      }
      .pan {
        visibility: hidden;
        color: #c3c3c3;
        cursor: pointer;
      }
    }
    .noteCounts {
      margin-left: 8px;
      font-size: 12px;
      color: #c3c3c3;
      font-weight: bolder;
    }
    .createdAt {
      color: #595959;
    }
  }
  > li:hover {
    background-color: #f5f5f5;
    .pan {
      visibility: visible;
      color: #409eff;
    }
  }
  .remove {
    margin-right: 36px;
    ::v-deep.el-button {
      border: none;
      padding: 0;
      font-size: 4px;
      background-color: transparent;
    }
    .icon {
      width: 24px;
      height: 20px;
    }
  }
}
@import "~@/assets/style/reset.scss";
</style>