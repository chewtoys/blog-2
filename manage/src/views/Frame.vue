<template>
  <div>
    <el-container style="height: 100vh;">
      <el-aside :class="isCollapse ? 'shrinkAside' : 'openAside'" width="200px">
        <h2>博客后台管理</h2>
        <Menu :isCollapse="isCollapse" />
        <div class="menu__collapse" @click="changeCollapse">
          <i :class="isCollapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
        </div>
      </el-aside>
      <el-container>
        <!-- <el-header>Header</el-header> -->
        <el-main>
          <router-view />
          <!-- <router-view name="test" /> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Menu from "./../components/Menu";
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  components: {
    Menu
  },
  methods: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style scoprd lang='less'>
.menu__collapse {
  display: flex;
  background: #fff;
  align-items: center;
  cursor: pointer;
  height: 40px;
  justify-content: center;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 200px;
}
h2 {
  text-align: center;
  padding: 20px 0;
}
.openAside {
  width: 200px !important;
  .menu__collapse {
    width: 200px;
  }
  h2 {
    display: block;
  }
}
.shrinkAside {
  width: 63px !important;
  .menu__collapse {
    width: 63px;
  }
  h2 {
    display: none;
  }
}
</style>
