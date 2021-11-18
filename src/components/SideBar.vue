<template>
  <div class="side-bar">
    <div class="icons">
      <router-link
        to="/note/1"
        title="笔记"
        class="item"
        active-class="selected"
      >
        <Icon name="gongzuotai" />工作台</router-link
      >
      <router-link
        to="/notebooks"
        title="笔记本"
        class="item"
        active-class="selected"
      >
        <Icon name="notes" />
        小计</router-link
      >
      <router-link
        to="/trash/2"
        title="回收站"
        class="item"
        active-class="selected"
      >
        <Icon name="remove" />回收站</router-link
      >
    </div>
    <router-view />
  </div>
</template>



<style lang="scss" scoped>
.side-bar {
  height: 100%;
  background-color: #fafafa;
  display: flex;
  flex-direction: row;
}
.icons {
  width: 256px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  padding: 24px 8px;
  height: calc(100vh - 60px);
  > .item {
    align-items: center;
    padding: 6px 16px;
    margin-bottom: 4px;
    color: #595959;
    height: 32px;
    &.selected {
      background-color: #333;
    }
    > svg {
      margin-right: 8px;
    }
  }
}
@import "~@/assets/style/reset.scss";
</style>