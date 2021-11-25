<template>
  <div>
    <div class="note-side-bar">
      <ul class="note-detail">
        <li class="name">
          <span class="title-name">名称</span>
          <span class="">归属</span>
          <span class="update">删除时间</span>
        </li>
        <li class="notes" v-for="trash in trashBooks" :key="trash.id">
          <span class="names">
            <Icon name="notes" />
            <router-link :to="`/trash?noteId=${trash.id}`">{{
              trash.title
            }}</router-link>
          </span>
          <span>{{ trash.notebookId }}</span>
          <span>{{ trash.updatedAt }}</span>
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
import Trash from "@/apis/trash";
export default {
  component: { Avatar },
  data() {
    return {
      notebooks: [],
      notes: [],
      currentBook: {},
      currentNote: {},
      username: "",
      trashBooks: [],
      trashbookId: "",
      belongTo: "",
    };
  },
  created() {
    Auth.getInfo().then((res) => {
      this.username = res.data.username;
    });
    NoteBooks.getAll().then((res) => {
      this.notebooks = res.data;
      this.belongTo = this.notebooks.map((notebook) => notebook.id);
      console.log(this.belongTo);
    });
    Trash.getAll().then((res) => {
      this.trashBooks = res.data;
      this.$emit("update:trashBooks", this.trashBooks);
      Bus.$emit("update:trashBooks", this.trashBooks);
      //   this.currentBook = this.trashBooks.find(
      //     (trash) => trash.id == this.$route.query.noteId
      //   );
      //   console.log(this.currentBook.notebookId);
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.note-side-bar {
  height: calc(100vh - 60px);
  min-width: 960px;
}
.notebooks {
  height: 32px;
  margin-top: 24px;
  border-bottom: 1px solid #f5f5f5;
  line-height: 12px;
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
    margin-right: 26px;
    > .icon {
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
    height: 24px;
    margin-top: 18px;
    border-bottom: 1px solid #f5f5f5;
    line-height: 10px;
    padding-left: 12px;
    padding-right: 12px;
  }

  .name {
    > :first-child {
      margin-left: 28px;
    }
    > :nth-child(2) {
      margin-right: 8px;
    }
  }
}

@import "~@/assets/style/reset.scss";
</style>