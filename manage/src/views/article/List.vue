<template>
  <div>
    <el-row>
      <el-col :span="18">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>文章列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="6" style="text-align: right;">
        <el-button @click="handleAdd">添加</el-button>
      </el-col>
    </el-row>
    <div class='table'>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="type" label="文章类型"></el-table-column>
        <el-table-column prop="author" label="作者"></el-table-column>
        <el-table-column prop="content" label="内容" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="is_top" label="是否顶置">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_top ? true : false"
              @change='handleChange(scope.row, scope.$index)'
              active-color="#dddddd"
              inactive-color="#13ce66">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="update_time" label="更新时间"></el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width='100'>
          <template slot-scope="scope">
            <el-button @click="handleModify(scope.row.id)" type="text" size="small">编辑</el-button>
            <el-button @click="handleDel(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination layout="prev, pager, next" :total="total" background></el-pagination>
    </div>
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
    handleChange(val, index) {
      console.log(val, index)
      if(val.is_top) {
        this.tableData[index].is_top = 0
      } else {
        this.tableData[index].is_top = 1
      }
      // this.handleModify(val.id)
      ajax("/article/modify", this.tableData[index]).then(res => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "修改成功!",
            onClose: () => {
              this.$router.push('/article/list')
            }
          });
        }
      });
      this.modifyTag()
    },
    handleAdd() {
      // this.dialogBox = true;
      this.$router.push('/article/detail/add')
    },
    handleModify(id) {
      // console.log(row);
      // this.dialogFrom = row;
      // this.dialogBox = true;
      this.$router.push(`/article/detail/${id}`)
    },
    handleDel(id) {
      this.$confirm("删除该条数据？", "提示")
        .then(() => {
          this.delArticle(id);
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
    getArticleList() {
      ajax("/article/list", {
        row: 10,
        pageNum: 1
      }).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.items;
          this.total = res.data.total;
        }
      });
    },
    addTag(param) {
      ajax("/tag/add", param).then(res => {
        if (res.code === 200) {
          this.getArticleList();
          this.dialogBox = false;
        }
      });
    },
    modifyTag(param) {
      ajax("/tag/modify", param).then(res => {
        if (res.code === 200) {
          this.getArticleList();
          this.dialogBox = false;
        }
      });
    },
    delArticle(id) {
      console.log(id);
      ajax("/article/del", { id }).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getArticleList();
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
    this.getArticleList();
  }
};
</script>