<template>
  <div>
    <div class="note-detail">
      <TashSideBar
        @update:trashBooks="onTrashBooks"
        v-show="!currentNote.id"
        @update:notebooks="onNotebooks"
      />
      <div class="edit-content" v-show="currentNote.id">
        <h3 class="note-title">{{ currentNote.title }}</h3>
        <div class="about">
          <ul class="crr">
            <li>{{ username }}</li>
            <li>|</li>
            <li>{{ notebook.title }}</li>
            <li>|</li>
            <li>{{ currentNote.updatedAt }}</li>
          </ul>
          <ul class="navbar">
            <li @click="deleate">
              <el-tooltip
                class="item"
                effect="dark"
                content="彻底删除"
                placement="bottom"
              >
                <el-button>
                  <Icon name="remove" class="remove" />
                </el-button>
              </el-tooltip>
            </li>
            <li @click="resave">
              <el-tooltip
                class="item"
                effect="dark"
                content="恢复"
                placement="bottom"
              >
                <el-button>
                  <Icon name="save" class="save" />
                </el-button>
              </el-tooltip>
            </li>
          </ul>
        </div>
        <div class="edit">
          {{ currentNote.content }}
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "@/apis/auth";
import Trash from "@/apis/trash";
import TashSideBar from "@/views/TashSideBar.vue";
export default {
  components: { TashSideBar },
  data() {
    return {
      notebooks: [],
      notebook: {},
      currentNote: {},
      username: "",
      isShowEdit: false,
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
    this.currentNote =
      this.trashBooks.find((trash) => trash.id == to.query.noteId) || {};
    next();
    console.log(this.currentNote);
    this.notebook =
      this.notebooks.find((note) => note.id == this.currentNote.notebookId) ||
      {};
  },
  methods: {
    //从子组件获取trashBooks
    onTrashBooks(value) {
      this.trashBooks = value;
      this.currentNote = this.trashBooks.find(
        (trash) => trash.id == this.$route.query.noteId
      );
    },
    //从子组件获取notebooks
    onNotebooks(data) {
      this.notebooks = data;

      console.log(this.currentNote);
      console.log(this.notebooks);
      console.log(this.notebook);
    },
    //彻底删除
    deleate() {
      Trash.deleteNote({ noteId: this.currentNote.id })
        .then((res) => {
          this.$message({
            type: "success",
            message: res.msg,
          });
          this.trashBooks.splice(this.trashBooks.indexOf(this.currentNote), 1);
          this.$router.replace({ path: "/trash" });
        })
        .catch((res) => {
          this.$message({
            type: "info",
            message: res.msg,
          });
        });
    },
    //恢复
    resave() {
      Trash.revertNote({ noteId: this.currentNote.id })
        .then((res) => {
          this.$router.replace({ path: "/trash" });
          this.$message({
            type: "success",
            message: res.msg,
          });
        })
        .catch((res) => {
          this.$message({
            type: "info",
            message: data.msg,
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.note-detail {
  display: flex;
  flex-direction: row;
}
.edit-content {
  display: flex;
  flex-direction: column;
  .note-title {
    margin-left: 24px;
    margin-top: 24px;
    font-size: 36px;
    font-weight: bold;
  }
  .about {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 24px;
    color: #595959;
    margin-top: 8px;
    > ul {
      display: block;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .crr {
      > li {
        margin-left: 8px;
        font-size: 14px;
        &:nth-child(1) {
          margin-left: 0px;
        }
        &:nth-child(5) {
          margin-top: 2px;
        }
      }
    }
    .navbar {
      margin-right: 12px;
      .icon {
        height: 24px;
        width: 36px;
        color: rgb(38, 112, 248);
        padding: 0px 6px;
      }
      > li {
        ::v-deep.el-button {
          border: none;
          padding: 0;
          font-size: 4px;
        }
      }
    }
  }
  .edit {
    margin-left: 24px;
    border-top: 1px solid #f5f5f5;
    margin-top: 12px;
    width: 960px;
    height: calc(100vh - 60px);
    overflow: hidden;
    font-size: 14px;
    padding-top: 12px;
  }
}

@import "~@/assets/style/reset.scss";
</style>