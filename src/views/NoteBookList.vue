<template>
  <div>
    <div class="notebookList">笔记本列表{{ notebooks.length }}</div>
    <ul class="notebooks">
      <li v-for="notebook in notebooks" :key="notebook.id">
        <Icon name="notebook" class="notebook-icon" />
        <div class="title">
          <router-link to="/note/1">
            <span class="notebook-title">{{ notebook.title }}</span>
          </router-link>
          <span @click.stop.prevent="onEdit(notebook)" class="onEdit"
            ><Icon name="pan" class="pan"
          /></span>
        </div>
        <div>{{ notebook.createdAt }}</div>
        <span @click.stop.prevent="onDelete(notebook)"
          ><Icon name="remove"
        /></span>
      </li>
    </ul>
  </div>
</template>

<script>
import Auth from "@/apis/auth";
import NoteBooks from "@/apis/notebooks";
export default {
  data() {
    return { notebooks: [] };
  },
  created() {
    Auth.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$router.push({ path: "/login" });
      }
    });
    NoteBooks.getAll().then((res) => {
      this.notebooks = res.data;
    });
  },
  methods: {
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
              message: res.meg,
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
.notebookList {
  height: 56px;
  line-height: 56px;
  margin-left: 50px;
}
.notebooks {
  min-width: 800px;
  > li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid #f5f5f5;
    padding: 8px;
    margin-top: 4px;
    .notebook-icon {
      margin-left: 4px;
    }
    > .title {
      min-width: 450px;
      margin-left: 10px;
      > .notebook-title {
        margin-left: 10px;
      }
      .icon {
        margin-left: 10px;
        color: #a7a7a7;
      }
      .pan {
        visibility: hidden;
      }
    }
  }
  > li:hover {
    .pan {
      visibility: visible;
    }
  }
}
@import "~@/assets/style/reset.scss";
</style>