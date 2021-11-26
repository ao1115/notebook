<template>
  <div>
    <div class="note-side-bar">
      <ul class="note-detail">
        <li class="name">
          <span class="title-name">名称</span>
          <span class="update">删除时间</span>
        </li>
        <router-link
          class="notes"
          v-for="trash in trashBooks"
          :key="trash.id"
          :to="`/trash?noteId=${trash.id}`"
        >
          <span class="names">
            <Icon name="notes" />
            <span class="title">{{ trash.title }}</span>
          </span>
          <span>{{ trash.updatedAt }}</span>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
import Auth from "@/apis/auth";
import NoteBooks from "@/apis/notebooks";
import Avatar from "@/components/Avatar.vue";
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
      this.$emit("update:notebooks", this.notebooks);
    });
    Trash.getAll().then((res) => {
      this.trashBooks = res.data;
      this.$emit("update:trashBooks", this.trashBooks);
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
  margin-top: 19px;
  > li,
  > .notes {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid #f5f5f5;
    padding: 16px 8px;
    padding-right: 28px;
    font-size: 14px;
  }
  .notes:hover {
    background-color: #f5f5f5;
  }
  .name {
    margin-top: -9px;
    > :first-child {
      margin-left: 28px;
      color: #409eff;
    }
    > :nth-child(2) {
      margin-right: 8px;
      color: #409eff;
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