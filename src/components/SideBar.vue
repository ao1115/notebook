<template>
  <div class="side-bar">
    <div class="content">
      <div class="logo">
        <Icon name="logo" />
        <span> 云笔记</span>
      </div>
      <div class="icons">
        <router-link
          to="/notebooks"
          title="工作台"
          class="item"
          active-class="selected"
        >
          <Icon name="gongzuotai" />工作台</router-link
        >
        <router-link
          to="/note"
          title="小计"
          class="item"
          active-class="selected"
        >
          <Icon name="notes" />
          小计</router-link
        >
        <router-link
          to="/trash"
          title="回收站"
          class="item"
          active-class="selected"
        >
          <Icon name="remove" />回收站</router-link
        >
      </div>
    </div>
    <router-view />
  </div>
</template>



<style lang="scss" scoped>
.side-bar {
  height: 100%;
  display: flex;
  flex-direction: row;
  > .content {
    > .logo {
      height: 60px;
      margin-left: 20px;
      line-height: 60px;
      > .icon {
        width: 32px;
        height: 32px;
        color: rgb(38, 112, 248);
      }
      > span {
        position: absolute;
        top: 3px;
        color: rgb(38, 112, 248);
      }
    }
  }

  .icons {
    width: 256px;
    background-color: #fafafa;
    display: flex;
    flex-direction: column;
    padding: 0 8px;
    height: calc(100vh - 60px);

    > .item {
      align-items: center;
      padding: 6px 16px;
      margin-bottom: 4px;
      color: #595959;
      height: 32px;
      &.selected {
        background-color: #f5f5f5;
      }
      > svg {
        margin-right: 8px;
      }
    }
  }
}

@import "~@/assets/style/reset.scss";
</style>