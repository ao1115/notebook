<template>
  <div>{{ message }}</div>
</template>

<script>
import Auth from "@/apis/auth";
export default {
  data() {
    return { message: "回收站" };
  },
  created() {
    Auth.getInfo().then((data) => {
      if (!data.isLogin) {
        this.$router.push({ path: "/login" });
      }
    });
  },
};
</script>

<style lang="scss" scoped>
</style>