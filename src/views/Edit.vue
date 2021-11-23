<template>
  <div class="edit-content">
    <h3 class="note-title">笔记本标题</h3>
    <div class="about">
      <ul>
        <li>敖优秀</li>
        <li>|</li>
        <li>更新时间11:30</li>
        <li>|</li>
        <li>更新时间11:30</li>
      </ul>
      <ul>
        <li>markdown</li>
        <li>删除</li>
      </ul>
      <div class="edit">
        <div><input type="text" />1111</div>
        <div><textarea name="" id="" cols="30" rows="10">内容11</textarea></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
  }
}

@import "~@/assets/style/reset.scss";
</style>