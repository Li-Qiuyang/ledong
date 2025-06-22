<template>
  <div class="placeholder">
  <div class="btndiv">
  <el-button type="primary" @click="dialogVisible = true" icon="el-icon-upload">点击上传</el-button>
  </div>
  <el-table
  :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize).filter(data => !search || data.lessonname.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%;margin: 10px;" max-height="500" border>
    <el-table-column
      fixed="left"
      prop="lessonid"
      label="课程ID"
      width="200">
    </el-table-column>
    <el-table-column
      prop="lessonname"
      label="课程名称"
      width="200">
      <template slot-scope="scope">
            <el-link type="primary" target="_blank"  @click.native.prevent="dialogvideo(scope.$index,scope.row)">
                {{scope.row.lessonname}}
            </el-link>
      </template>
    </el-table-column>
    <el-table-column
      prop="lessonfilename"
      label="文件名称"
      width="200">
    </el-table-column>
    <el-table-column
      prop="lessontype"
      label="课程类型"
      width="200">
    </el-table-column>
    <el-table-column
      prop="introduction"
      label="课程简介"
      width="200">
      <template slot-scope="scope">
            <el-link type="primary" target="_blank"  @click.native.prevent="dialogpoint(scope.$index,scope.row)">
                details
            </el-link>
      </template>
    </el-table-column>
    <el-table-column
      prop="isrecommend"
      label="是否推荐"
      width="200">
    </el-table-column>
    <el-table-column
      fixed="right"
      width="200">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入课程名称关键字搜索"
          prefix-icon="el-icon-search"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)" type="primary" plain icon="el-icon-edit">编辑</el-button>
          <el-button
          size="mini"
          type="danger"
          @click="deleteRow(scope.$index, scope.row)" plain icon="el-icon-delete">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    title="文件上传"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose">
    <el-upload
    multiple
    class="upload-demo"
    ref="upload"
    :action="uploadUrl"
    :headers="headerObj"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="onSuccess"
    :file-list="fileList"
    :auto-upload="false"
    accept=".mp4" 
    >
    <template v-slot:trigger>
      <el-button size="small" type="primary">选取文件</el-button>
    </template>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传文件</el-button>
    <template v-slot:tip>
      <div  class="el-upload__tip">上传课程文件,文件格式为mp4</div>
    </template>
  </el-upload>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog
  title="修改信息"
  :visible.sync="editVisible"
  width="50%"
  :before-close="handleClose">
  <el-form :model="dataform">
    <el-form-item label="课程ID">
      <el-input v-model="dataform.lessonid" autocomplete="off" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="课程名称">
      <el-input v-model="dataform.lessonname" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="文件名称">
      <el-input v-model="dataform.lessonfilename" autocomplete="off" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="课程类型">
      <el-input v-model="dataform.lessontype" autocomplete="off" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="课程简介">
      <el-input v-model="dataform.introduction" autocomplete="off" type="textarea" autosize></el-input>
    </el-form-item>
    <el-form-item label="是否推荐">
      <el-input v-model="dataform.isrecommend" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="this.editConcel" type="danger">取 消</el-button>
    <el-button type="primary" @click="this.handleAddedit">确 定</el-button>
  </div>
</el-dialog>
<el-dialog
    title="details"
    :visible.sync="videoVisible"
    width="50%"
    :before-close="handleClose">
    <el-link :href="video" target="_blank" type="primary">查看视频详情</el-link>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="this.videoConcel">确 定</el-button>
    </div>
  </el-dialog>
  <el-dialog
    title="point"
    :visible.sync="pointVisible"
    width="50%"
    :before-close="handleClose">
    <el-input
        type="textarea"
        autosize
        v-model="this.point">
    </el-input>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="this.pointConcel">确 定</el-button>
    </div>
  </el-dialog>
    <div>
      <el-pagination
        @size-change="this.handleSizeChange"
        @current-change="this.handleCurrentChange"
        :current-page="this.currentPage"
        :page-size="this.pageSize"
        :page-sizes="[5,10,15]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length">
      </el-pagination>
    </div>
  </div>
  </template>
  <style scoped>
    .placeholder {
            border: 5px dashed #e6e6e6;
            padding: 50px;
            text-align: center;
            color: #cccccc;
            font-size: 20px;
            position: relative;
        }
    .btndiv{
      margin-bottom: 50px;
    }
    .diaimage{
      width: 500px;
    }
  </style>
  <script>
    export default {
      data() {
        return {
          search:'',
          fileList:[],
          headerObj:{
            Authorization:localStorage["token"]
          },
          uploadUrl:'http://8.146.199.110:3000/data/uploadpilates',
          dialogVisible: false,
          tableData: [],
          currentPage:1,
          pageSize:5,
          dataform: {
            lessonid:'',
            lessonname: '',
            lessonfilename: '',
            lessontype: '',
            introduction:'',
            isrecommend:''
        },
          editVisible:false,
          videoVisible:false,
          video:'',
          pointVisible:false,
          point:''
        }
      },
      methods: {
        submitUpload() {
          this.$refs.upload.submit()
        },
        handleRemove(file) {
          this.$message('已将'+file.name+'从待上传列表删除')
        },
        handlePreview(file) {
          this.$message('已将'+file.name+'上传成功')
        },
        onSuccess(res){
          this.$message({message:'上传成功',type:'success'})
          console.log(res)
          this.tableData=[]
          this.getlesson()
        },
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      async deleteRow(index, row) {
        const data={id:row.lessonid}
        try{
            const res=await this.$axios.post('/data/deldata?type=pilates',data)
                if(res.status==200){
                  this.$message({ showClose: true,message:res.data.status,type:'success'})
                  this.tableData=[]
                  this.getlesson()
                }
          }catch(err){
            console.log(err)
            return false
          }
      },
      async getlesson(){
        try{
            const data= await this.$axios.get('/data/getdata?type=pilates')
              data.data.map(item=>{
                if(item.isrecommend==0)
                  item.isrecommend='否'
                else
                  item.isrecommend='是'
                this.tableData.push(item)
              })
          }catch(err){
            console.log(err)
            return false
          }
        },
      handleCurrentChange(val) {
        this.currentPage=val
      },
      handleSizeChange(val){
        this.pageSize=val
      },
      editConcel(){
        this.editVisible = false
        this.resetForm()
      },
      async handleAddedit(){
        this.editVisible=false
        const data=this.dataform
        if(this.dataform.isrecommend=='否')
          this.dataform.isrecommend=0
        else
          this.dataform.isrecommend=1
        console.log(data)
        try{
              const res=await this.$axios.post('/data/updatedata?type=pilates',data)
                if(res.status==200){
                  this.$message({ showClose: true,message:res.data.status,type:'success'})
                  this.tableData=[]
                  this.getlesson()
                  this.resetForm()
                }
            }catch(err){
              console.log(err)
              return false
            }
      },
      handleEdit(index, row) {
        console.log(row)
        this.editVisible=true
        this.dataform={
          lessonid:row.lessonid,
          lessonname:row.lessonname,
          lessonfilename:row.lessonfilename,
          lessontype: row.lessontype,
          introduction:row.introduction,
          isrecommend:row.isrecommend
        }
      },
      resetForm() {
        this.dataform = this.$options.data().dataform
      },
      videoConcel(){
        this.videoVisible=false
      },
      dialogvideo(index,row){
        this.videoVisible=true
        this.video='http://8.146.199.110:3000/video/'+row.lessontype+'/'+row.lessonfilename
      },
      pointConcel(){
          this.pointVisible = false
        },
      dialogpoint(index,row){
          this.point=row.introduction
          this.pointVisible=true
        }
      },
      mounted(){
        this.getlesson()
      }
    }
  </script>
