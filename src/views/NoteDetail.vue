<template>
  <div>
    <div class="note-detail">
      <NoteSideBar
        @update:notes="(value) => (notes = value)"
        v-show="!currentNote.id"
      />
      <div
        class="edit-content"
        @update:notes="(value) => (notes = value)"
        v-show="currentNote.id"
      >
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
            <li @click="isShowPreview = !isShowPreview">
              <Icon name="markdown" class="markdown" />
            </li>
            <li @click="deleteNote">
              <Icon name="remove" class="remove" />
            </li>
            <li @click="onSave">
              <Icon name="save" class="save" />
            </li>
          </ul>
        </div>
        <div class="edit">
          <div>
            <input
              type="text"
              placeholder="请输入标题"
              v-model="currentNote.title"
              @keydown="statusText = '正在输入…'"
            />
          </div>
          <div>
            <textarea
              placeholder="请输入内容,支持Markdown语法…"
              v-model="currentNote.content"
              @keydown="statusText = '正在输入…'"
              v-show="!isShowPreview"
            ></textarea>
            <div
              class="previw markdown-body"
              v-html="previewContent"
              v-show="isShowPreview"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Auth from "@/apis/auth";
import Notes from "@/apis/notes";
import Avatar from "@/components/Avatar.vue";
import NoteSideBar from "./NoteSideBar.vue";
import Bus from "@/helpers/bus";
import MarkdownIt from "markdown-it";
const md = new MarkdownIt();
window.Notes = Notes;
export default {
  components: { Avatar, NoteSideBar },
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

  computed: {
    previewContent() {
      return md.render(this.currentNote.content || "");
    },
  },
  //判断是否登录
  created() {
    Auth.getInfo().then((data) => {
      if (!data.isLogin) {
        this.$router.push({ path: "/login" });
      }
    });
    Auth.getInfo().then((res) => {
      this.username = res.data.username;
    });

    //第一次进来的时候刷新编辑页面出现数据
    Bus.$on("update:notes", (value) => {
      this.currentNote = value.find(
        (note) => note.id == this.$route.query.noteId
      );
    });
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to.query.noteId, from);
    this.currentNote =
      this.notes.find((note) => note.id == to.query.noteId) || {};
    next();
  },

  methods: {
    //判断是否是登录状态
    logout() {
      console.log("logout");
      Auth.logout().then((res) => {
        this.$router.push({ path: "login" });
      });
    },
    //保存笔记
    onSave() {
      Notes.updateNote(
        { noteId: this.currentNote.id },
        { title: this.currentNote.title, content: this.currentNote.content }
      )
        .then((res) => {
          this.$message({
            type: "success",
            message: res.msg,
          });
          console.log("保存成功");
          this.statusText = "已保存";
        })
        .catch((res) => {
          this.$message({
            type: "info",
            message: res.msg,
          });
          this.statusText = "保存失败";
        });
    },
    //删除笔记
    deleteNote() {
      Notes.deleteNote({ noteId: this.currentNote.id })
        .then((data) => {
          this.$message({
            type: "success",
            message: data.msg,
          });
          console.log("删除成功");
          this.notes.splice(this.notes.indexOf(this.currentNote), 1);
          this.$router.replace({ path: "/note" });
        })
        .catch((res) => {
          this.$message({
            type: "info",
            message: res.msg,
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