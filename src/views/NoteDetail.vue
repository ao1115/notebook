<template>
  <div>
    <div class="nav">
      <div class="search">
        <input type="search" placeholder="搜索" />
        <Icon name="search" />
      </div>
      <ul class="info">
        <li class="add">
          <Icon name="add" />
          <span>新建</span>
        </li>
        <li><Avatar /></li>
        <li class="logout" @click="logout">
          <Icon name="logout" />
          <span>退出</span>
        </li>
      </ul>
    </div>
    <div class="note-detail">
      <NoteSideBar @update:notes="(value) => (notes = value)" />
      <div class="note-empty" v-show="!currentNote.id">请选择笔记</div>
      <div
        class="edit-content"
        @update:notes="(value) => (notes = value)"
        v-show="currentNote.id"
      >
        <h3 class="note-title">{{ currentNote.title }}</h3>
        <div class="about">
          <ul>
            <li>{{ username }}</li>
            <li>|</li>
            <li>笔记本标题</li>
            <li>|</li>
            <li>{{ currentNote.updateAt }}</li>
            <li>|</li>
            <li>{{ statusText }}</li>
          </ul>
          <ul>
            <li @click="isShowPreview = !isShowPreview">markdown</li>
            <li @click="deleteNote">删除</li>
            <li @click="onSave">保存</li>
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
              placeholder="请输入内容"
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
import NoteBooks from "@/apis/notebooks";
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
    };
  },

  computed: {
    previewContent() {
      return md.render(this.currentNote.content || "");
    },
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
          this.$message(res.msg);
          console.log("保存成功");
          this.statusText = "已保存";
        })
        .catch((res) => {
          console.log("保存失败");
          this.statusText = "保存失败";
        });
    },
    //删除笔记
    deleteNote() {
      Notes.deleteNote({ noteId: this.currentNote.id })
        .then((data) => {
          this.$message(data.msg);
          console.log("删除成功");
          this.notes.splice(this.notes.indexOf(this.currentNote), 1);
          this.$router.replace({ path: "/note" });
        })
        .catch((res) => {
          console.log("删除失败");
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
  justify-content: space-between;
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
    .icon {
      width: 24px;
      height: 24px;
    }
    > li {
      margin-right: 10px;
    }
    .add {
      > span {
        line-height: 24px;
      }
    }
  }
}
.note-detail {
  display: flex;
  flex-direction: row;
  .note-empty {
    font-size: 50px;
    margin-top: 100px;
    text-align: center;
    color: #ccc;
    width: 630px;
  }
}
.edit-content {
  display: flex;
  flex-direction: column;
  .note-title {
    margin-left: 24px;
  }
  .about {
    height: 56px;
    width: 630px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 24px;
    > ul {
      display: block;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
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
      margin-top: 24px;
      width: 960px;
    }
    & textarea {
      margin-top: 24px;
      width: 960px;
    }
  }
}

@import "~@/assets/style/reset.scss";
</style>