<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>留言列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="type" label="留言类型">
          <template slot-scope="scope">{{ scope.row.type | filterMsg }}</template>
        </el-table-column>
        <el-table-column prop="nick" label="昵称"></el-table-column>
        <el-table-column prop="content" label="留言内容"></el-table-column>
        <el-table-column prop="websister_name" label="网站名称"></el-table-column>
        <el-table-column prop="websister_link" label="网站地址"></el-table-column>
        <el-table-column prop="title" label="所属文章">
          <template slot-scope="scope">
            <a :href="'/article/detail/' + scope.row.article_id" target="_blank">{{scope.row.title}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="留言时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleDetail(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="handleDel(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination layout="prev, pager, next" :total="total" background></el-pagination>
    </div>
    <el-dialog title="留言详情" :visible.sync="dialogBox">
      <el-form label-width="80px" :model="dialogFrom">
        <el-form-item label="留言类型">
          <el-tag>{{ dialogFrom.type | filterMsg }}</el-tag>
        </el-form-item>
        <el-form-item label="昵称" v-if='dialogFrom.nick'>
          <el-input v-model="dialogFrom.nick"></el-input>
        </el-form-item>
        <el-form-item label="留言内容" v-if='dialogFrom.content'>
          <el-input v-model="dialogFrom.content" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="网站名称" v-if='dialogFrom.websister_name'>
          <el-input v-model="dialogFrom.websister_name"></el-input>
        </el-form-item>
        <el-form-item label="网站地址" v-if='dialogFrom.websister_link'>
          <el-input v-model="dialogFrom.websister_link"></el-input>
        </el-form-item>
        <el-form-item label="所属文章" v-if='dialogFrom.article_id'>
          <el-input v-model="dialogFrom.title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleClose()">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { ajax } from "./../../apis";
export default {
  methods: {
    handleDetail(row) {
      this.dialogFrom = row;
      this.dialogBox = true;
    },
    handleDel(id) {
      this.$confirm("删除该条数据？", "提示")
        .then(() => {
          this.delFriend(id);
        })
        .catch(e => {
          console.log("cancel");
        });
    },
    handleClose() {
      this.dialogFrom = {};
      this.dialogBox = false;
    },
    getMessageList() {
      ajax("/message/list", {
        row: 10,
        pageNum: 1
      }).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.items;
          this.total = res.data.total;
        }
      });
    },
    delFriend(id) {
      ajax("/message/del", { id }).then(res => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getMessageList();
        }
      });
    },
  },
  filters: {
    filterMsg(val) {
      if (val === 1) {
        return "留言";
      } else if (val === 2) {
        return "友情链接";
      }
    }
  },
  data() {
    return {
      tableData: [],
      total: 0,
      dialogBox: false,
      dialogFrom: {}
    };
  },
  mounted() {
    this.getMessageList();
  }
};
</script>