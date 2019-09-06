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
    <div class='table'>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="链接名称"></el-table-column>
        <el-table-column prop="link" label="链接地址">
          <template slot-scope="scope">
            <a :href="scope.row.link" target="_blank">{{scope.row.link}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="联系方式"></el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleModify(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleDel(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination layout="prev, pager, next" :total="total" background></el-pagination>
    </div>
    <el-dialog title="友链维护" :visible.sync="dialogBox">
      <el-form label-width="80px" :model="dialogFrom">
        <el-form-item label="链接名称">
          <el-input v-model="dialogFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="链接地址">
          <el-input placeholder="请输入内容" v-model="dialogFrom.link"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="dialogFrom.phone" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="缩略图">
          <img :src="dialogFrom.thumbnail" v-if='dialogFrom.thumbnail' />
          <el-upload
            :action='host + "/upload"'
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="onSuccess"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="dialogFrom.remark"></el-input>
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
import { host } from "./../../assets/javascript/util";
export default {
  methods: {
    handleAdd() {
      this.dialogBox = true;
    },
    handleModify(row) {
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
    submitForm() {
      if (this.dialogFrom.id) {
        this.modifyFriend(this.dialogFrom);
      } else {
        this.addFriend(this.dialogFrom);
      }
    },
    getFriendList() {
      ajax("/friend/list", {}).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.items;
          this.total = res.data.total;
        }
      });
    },
    addFriend(param) {
      ajax("/friend/add", param).then(res => {
        if (res.code === 200) {
          this.getFriendList();
          this.dialogBox = false;
        }
      });
    },
    modifyFriend(param) {
      ajax("/friend/modify", param).then(res => {
        if (res.code === 200) {
          this.getFriendList();
          this.dialogBox = false;
        }
      });
    },
    delFriend(id) {
      ajax("/friend/del", { id }).then(res => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getFriendList();
        }
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    onSuccess(file, fileList) {
      console.log(file, fileList);
      this.dialogFrom.thumbnail = file.data;
    }
  },
  data() {
    return {
      host,
      tableData: [],
      total: 0,
      dialogBox: false,
      dialogFrom: {}
    };
  },
  mounted() {
    this.getFriendList();
  }
};
</script>