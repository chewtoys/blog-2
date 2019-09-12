<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-breadcrumb separator="/" style='margin-top: 10px;'>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>文章列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="18" style="text-align: right;">
        <el-date-picker
          style="margin-right: 20px;"
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="创建开始日期"
          end-placeholder="创建结束日期">
        </el-date-picker>
        <el-select v-model="form.type" placeholder="请选择文章类型" style="margin-right: 20px;">
          <el-option label="原创" value="1"></el-option>
          <el-option label="译文" value="2"></el-option>
          <el-option label="转载" value="3"></el-option>
        </el-select>
        <!-- <el-select v-model="form.type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select> -->
        <el-button type="primary" @click="handleAdd">搜索</el-button>
        <el-button @click="handleAdd">添加文章</el-button>
      </el-col>
    </el-row>
    <div class="table" stripe>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="标题" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="type" label="文章类型">
          <template
            slot-scope="scope"
          >{{scope.row.type === 1 ? '原创' : scope.row.type === 2 ? '译文' : '转载'}}</template>
        </el-table-column>
        <el-table-column prop="author" label="作者"></el-table-column>
        <el-table-column prop="preview_num" label="预览次数" sortable></el-table-column>
        <el-table-column prop="abstract" label="摘要" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="update_time" label="更新时间"></el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
        <el-table-column prop="is_top" label="是否顶置">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_top ? true : false"
              @change="handleChange(scope.row, scope.$index)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
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
  </div>
</template>

<script>
import { ajax } from "./../../apis";
export default {
  methods: {
    handleChange(val, index) {
      console.log(val, index);
      if (val.is_top) {
        this.tableData[index].is_top = 0;
      } else {
        this.tableData[index].is_top = 1;
      }
      // this.handleModify(val.id)
      ajax("/article/modify", this.tableData[index]).then(res => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "修改成功!",
            onClose: () => {
              this.$router.push("/article/list");
            }
          });
        }
      });
      this.modifyTag();
    },
    handleAdd() {
      // this.dialogBox = true;
      this.$router.push("/article/detail/add");
    },
    handleModify(id) {
      // console.log(row);
      // this.dialogFrom = row;
      // this.dialogBox = true;
      this.$router.push(`/article/detail/${id}`);
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
            type: "success",
            message: "删除成功!"
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
      value1: '',
      form: { }
    };
  },
  mounted() {
    this.getArticleList();
  }
};
</script>