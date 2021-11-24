<template>
  <div class="edit-content" v-if="isShowEdit">
    <h3 class="note-title">{{ this.notes }}</h3>
    <div class="about">
      <ul>
        <li>{{ username }}</li>
        <li>|</li>
        <li>{{}}</li>
        <li>|</li>
        <li>更新时间11:30</li>
      </ul>
      <ul>
        <li>markdown</li>
        <li>删除</li>
        <li @click="onSave">保存</li>
      </ul>
    </div>
    <div class="edit">
      <div>
        <input type="text" v-model="notetitle" placeholder="请输入标题" />
      </div>
      <div>
        <textarea v-model="notecontent" placeholder="请输入内容"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "@/apis/auth";
export default {
  data() {
    return {
      notebooks: [],
      notes: [],
      currentBook: {},
      currenNote: {},
      isShowEdit: true,
      isShowNotes: true,
      username: "",
      notetitle: "",
      notecontent: "",
    };
  },
  created() {
    Auth.getInfo().then((res) => {
      this.username = res.data.username;
    });
  },
  methods: {
    onSave() {
      this.isShowEdit = false;
      console.log(this.isShowEdit);
    },
  },
};
</script>

<style lang="scss" scoped>
.edit-content {
  display: flex;
  flex-direction: column;
  .about {
    height: 56px;
    width: 990px;
    border: 1px solid red;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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