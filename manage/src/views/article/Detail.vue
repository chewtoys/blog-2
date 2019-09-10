<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>文章详情</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="文章分类">
            <el-select v-model="form.type" placeholder="请选择文章分类">
              <el-option label="分类1" value="1"></el-option>
              <el-option label="分类2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="缩略图">
            <img :src="form.thumbnail" v-if="form.thumbnail">
            <el-upload
              :action="host + '/upload'"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-success="onSuccess"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
          </el-form-item>
          <el-form-item label="作者">
            <el-input v-model="form.author"></el-input>
          </el-form-item>
          <el-form-item label="来源">
            <el-input v-model="form.sourse"></el-input>
          </el-form-item>
          <el-form-item label="标签">
            <el-checkbox-group v-model="form.tag_id">
              <el-checkbox v-for="(item, index) in tags" :label="item.name" :vlaue="item.id"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="是否顶置">
            <el-switch v-model="form.is_top"></el-switch>
          </el-form-item>
          <el-form-item label="内容摘要">
            <el-input type="textarea" v-model="form.abstract"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <quill-editor
              ref="myQuillEditor"
              :content="form.content"
              :options="editorOption"
              @change="onEditorChange($event)"
            ></quill-editor>
            <el-upload
              :action="host + '/upload'"
              :on-success="onSuccess1"
              style="position: fixed; top: -999px; left: -999px"
            >
              <el-button size="small" type="primary" id='uploadImg'>点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="handleCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ajax } from "./../../apis";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.snow.css";
import { host } from "./../../assets/javascript/util";

export default {
  methods: {
    handleBeforeUpload(event) {
      const files = event.target.files[0];
      const formData = new FormData();
      formData.append("files", files);
      this.$http
        .post(host + "/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log(res);
          if (res && res.status == 200) {
            const value = res.data.url;
            this.addImgRange = this.$refs.myQuillEditor.quill.getSelection();
            this.$refs.myQuillEditor.quill.insertEmbed(
              this.addImgRange != null ? this.addImgRange.index : 0,
              "image",
              value
            );
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleCancel() {
      this.$router.push("/article/list");
    },
    onEditorChange: function(event) {
      this.form.content = event.html;
    },
    onSubmit() {
      console.log(this.form);
      // 格式话出对应的ID
      let tagId = [];
      this.form.tag_id.forEach(tagChecked => {
        this.tags.forEach(tags => {
          if (tags.name === tagChecked) {
            tagId.push(tags.id);
          }
        });
      });
      this.form.tag_id = tagId.join(",");
      if (this.$route.params.id !== "add") {
        ajax("/article/modify", this.form).then(res => {
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
      } else {
        ajax("/article/add", this.form).then(res => {
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "添加成功!",
              onClose: () => {
                this.$router.push("/article/list");
              }
            });
          }
        });
      }
    },
    handleAdd() {
      this.dialogBox = true;
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
      console.log(this.form);
      this.form.tag_id.forEach(tagChecked => {
        console.log(tagChecked);
      });
      // if (this.dialogFrom.id) {
      //   this.modifyTag(this.dialogFrom);
      // } else {
      //   this.addTag(this.dialogFrom);
      // }
    },
    getArticleDetail(id) {
      ajax("/article/detail", { id }).then(res => {
        if (res.code === 200) {
          this.form = res.data;
          this.form.is_top = res.data.is_top == 1 ? true : false;
          let tagIds = [];
          res.data.tag_id.split(",").forEach(tagId => {
            this.tags.forEach(tags => {
              if (tags.id == tagId) {
                tagIds.push(tags.name);
              }
            });
          });
          this.form.tag_id = tagIds;
        }
      });
    },
    getTagList() {
      ajax("/tag/list", {}).then(res => {
        if (res.code === 200) {
          console.log(res);
          this.tags = res.data.items;
          if (this.$route.params.id !== "add") {
            this.getArticleDetail(this.$route.params.id);
          }
        }
      });
    },
    getArticleList() {
      ajax("/article/list", {}).then(res => {
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
    delTag(id) {
      console.log(id);
      ajax("/tag/del", { id }).then(res => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getArticleList();
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
      this.form.thumbnail = file.data;
      console.log(this.form);
    },
    onSuccess1(file, fileList) {
      console.log(file, fileList);

      const value = file.data;
      let addImgRange = this.$refs.myQuillEditor.quill.getSelection();
      this.$refs.myQuillEditor.quill.insertEmbed(
        addImgRange != null ? addImgRange.index : 0,
        "image",
        value
      );
    }
  },
  components: {
    quillEditor
  },
  data() {
    return {
      editorOption: {
        placeholder: "请输入内容",
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
              ['blockquote', 'code-block'],
              [{'header': 1}, {'header': 2}],               // custom button values
              [{'list': 'ordered'}, {'list': 'bullet'}],
              [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
              [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
              [{'direction': 'rtl'}],                         // text direction
              [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
              [{'header': [1, 2, 3, 4, 5, 6, false]}],
              [{'color': []}, {'background': []}],          // dropdown with defaults from theme
              [{'font': []}],
              [{'align': []}],
              ['link', 'image', 'video'],
              ['clean']                                         // remove formatting button
            ],
            handlers: {
              image: function(value) {
                console.log('value', value)
                if (value) {
                  document.querySelector("#uploadImg").click();
                }
              }
            }
          }
        }
      },
      host,
      content: "",
      articleTitle: "",
      articleContent: "",
      form: {
        thumbnail: "",
        is_top: true,
        tag_id: []
      },
      tableData: [],
      total: 0,
      dialogBox: false,
      dialogFrom: {
        name: "",
        alias: ""
      },
      tags: []
    };
  },
  mounted() {
    this.getTagList();
  }
};
</script>