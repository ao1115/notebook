
<template>
  <div>
    <div class="notebookList">笔记本列表{{ notebooks.length }}</div>
    <ul class="notebooks">
      <li v-for="notebook in notebooks" :key="notebook.id">
        <Icon name="notebook" />
        <div>
          <router-link to="/note/1">
            <span>{{ notebook.title }}</span>
          </router-link>
          <span @click.stop.prevent="onEdit(notebook)" class="onEdit"
            ><Icon name="pan"
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
      let title = window.prompt("修改标题", notebook.title);
      NoteBooks.updateNoteBook(notebook.id, { title }).then((res) => {
        notebook.title = title;
        alert(res.msg);
      });
    },
    onDelete(notebook) {
      let isConfrim = window.confirm("确定要删除吗");
      if (isConfrim) {
        NoteBooks.deleteNoteBook(notebook.id).then((res) => {
          this.notebooks.splice(this.notebooks.indexOf(notebook), 1);
          alert(res.msg);
        });
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.notebooks {
  min-width: 800px;
  > li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: pink;
    border: 1px solid #333;
    padding: 8px;
  }
}
@import "~@/assets/style/reset.scss";
</style>