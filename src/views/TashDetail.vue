<template>
  <div>
    <div class="note-detail">
      <TashSideBar
        @update:trashBooks="(value) => (trashBooks = value)"
        v-show="!currentNote.id"
      />
      <div class="edit-content" v-show="currentNote.id">
        <h3 class="note-title">{{ currentNote.title }}</h3>
        <div class="about">
          <ul class="crr">
            <li>{{ username }}</li>
            <li>|</li>
            <li>笔记本标题</li>
            <li>|</li>
            <li>{{ currentNote.updatedAt }}</li>
            <li>|</li>
            <li>{{ statusText }}</li>
          </ul>
          <ul class="navbar">
            <li @click="deleate">
              <Icon name="remove" class="remove" />
              彻底删除
            </li>
            <li @click="resave">
              <Icon name="save" class="save" />
              恢复
            </li>
          </ul>
        </div>
        <div class="edit">
          <div>
            <input
              type="text"
              placeholder="请输入标题"
              @keydown="statusText = '正在输入…'"
            />
          </div>
          <div>
            <textarea
              placeholder="请输入内容,支持Markdown语法…"
              @keydown="statusText = '正在输入…'"
              v-show="!isShowPreview"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "@/apis/auth";
import Trash from "@/apis/trash";
import TashSideBar from "@/views/TashSideBar.vue";
import Bus from "@/helpers/bus";
window.Trash = Trash;
export default {
  components: { TashSideBar },
  data() {
    return {
      notebooks: [],
      notes: [],
      currentNote: {},
      username: "",
      statusText: "未更新",
      isShowPreview: false,
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
    Bus.$on("update:trashBooks", (value) => {
      console.log(value);
      this.currentNote = value.find(
        (trash) => trash.id === this.$route.query.noteId
      );
      console.log(this.currentNote);
    });
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to.query.noteId, from);
    this.currentNote =
      this.trashBooks.find((trash) => trash.id == to.query.noteId) || {};
    next();
    console.log(this.currentNote.id);
  },
  methods: {
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
    resave() {
      Trash.revertNote({ noteId: this.currentNote.id })
        .then((res) => {
          this.$router.replace({ path: "/note" });
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
      .icon {
        height: 24px;
        width: 24px;
        margin-right: 12px;
        color: rgb(38, 112, 248);
      }
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
      width: 960px;
      height: 48px;
    }
    & textarea {
      margin-top: 24px;
      width: 960px;
      height: calc(100vh - 60px);
      overflow: hidden;
      font-size: 14px;
    }
  }
}

@import "~@/assets/style/reset.scss";
</style>