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
          <Icon name="gongzuotai" />
          <span>笔记本</span>
        </router-link>
        <router-link
          to="/note"
          title="记一笔"
          class="item"
          active-class="selected"
        >
          <Icon name="notes" />
          <span>记一笔</span>
        </router-link>
        <router-link
          to="/trash"
          title="回收站"
          class="item"
          active-class="selected"
        >
          <Icon name="remove" />
          <span>回收站</span>
        </router-link>
      </div>
    </div>
    <router-view class="notebooks" />
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
        color: #409eff;
      }
      > span {
        position: absolute;
        top: 3px;
        color: #409eff;
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
        color: #409eff;
      }
    }
  }
  .notebooks {
    width: calc(100% - 256px);
    margin-right: 12px;
  }
}

@import "~@/assets/style/reset.scss";
</style>