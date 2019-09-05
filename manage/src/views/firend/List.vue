<template>
  <div>
    <el-row>
      <el-col :span="18">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>友链列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="6" style="text-align: right;">
        <el-button @click="handleAdd">添加</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="create_time" label="创建日期"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="alias" label="别名"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleModify(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDel(scope.row.id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="total"></el-pagination>
    <el-dialog title="标签维护" :visible.sync="dialogBox">
      <el-form label-width="80px" :model="dialogFrom">
        <el-form-item label="名称">
          <el-input v-model="dialogFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="别名">
          <el-input v-model="dialogFrom.alias"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { ajax } from "./../../apis";
export default {
  methods: {
    handleAdd() {
      this.$router.push('/firend/detail/add')
    },
    handleModify(row) {
      console.log(row);
      this.dialogFrom = row;
      this.dialogBox = true;
    },
    handleDel(id) {
      this.$confirm("删除该条数据？", "提示")
        .then(() => {
          this.delTag(id);
        })
        .catch(e => {
          console.log("cancel");
        });
    },
    submitForm() {
      // console.log(this.dialogFrom);
      if (this.dialogFrom.id) {
        this.modifyTag(this.dialogFrom);
      } else {
        this.addTag(this.dialogFrom);
      }
    },
    getTagList() {
      ajax("/tag/list", {}).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.items;
          this.total = res.data.total;
        }
      });
    },
    addTag(param) {
      ajax("/tag/add", param).then(res => {
        if (res.code === 200) {
          this.getTagList();
          this.dialogBox = false;
        }
      });
    },
    modifyTag(param) {
      ajax("/tag/modify", param).then(res => {
        if (res.code === 200) {
          this.getTagList();
          this.dialogBox = false;
        }
      });
    },
    delTag(id) {
      console.log(id);
      ajax("/tag/del", { id }).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getTagList();
        }
      });
    }
  },
  data() {
    return {
      tableData: [],
      total: 0,
      dialogBox: false,
      dialogFrom: {
        name: "",
        alias: ""
      }
    };
  },
  mounted() {
    this.getTagList();
  }
};
</script>