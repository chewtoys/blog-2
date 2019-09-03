<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse">
    <el-submenu v-for="(menu, index) of meunTree" :key="index" :index="String(index)">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{ menu.name }}</span>
      </template>
      <el-menu-item-group v-if="menu.children && menu.children.length">
        <el-menu-item
          v-for="(cMenu, cIndx) of menu.children"
          :key="cIndx"
          :index="String(cIndx)"
          @click="handlerMenu(menu, cMenu)"
        >{{ cMenu.name }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import { menu } from "./../assets/javascript/menu";
export default {
  props: ["isCollapse"],
  data() {
    return {
      meunTree: []
    };
  },
  methods: {
    // 根据menu.js生成2级菜单
    createMeunTree() {
      menu.filter(item => {
        if (!item.parentId) {
          item.children = [];
          this.meunTree.push(item);
        }
      });
      menu.filter(item => {
        this.meunTree.forEach(firstMenu => {
          if (item.parentId === firstMenu.id) {
            firstMenu.children.push(item);
          }
        });
      });
    },
    // 点击菜单跳转路由
    handlerMenu(menu, cMenu) {
      console.log(menu, cMenu);
      if (cMenu.pageUrl) this.$router.push(cMenu.pageUrl);
    }
  },
  created() {
    this.createMeunTree();
  }
};
</script>
  
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
