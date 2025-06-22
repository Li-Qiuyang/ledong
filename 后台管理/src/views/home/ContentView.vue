<template>
    <div class="placeholder">
      <div class="btndiv">
      <el-button @click="dialogVisible = true" type="primary" icon="el-icon-circle-plus">添加动态</el-button>
      </div>
    <el-table
      :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize).filter(data => !search || data.userId.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%" border >
      <el-table-column
        fixed="left"
        label="用户ID"
        prop="userId"
        width="200">
      </el-table-column>
      <el-table-column
        label="动态ID"
        prop="postId"
        width="200">
      </el-table-column>
      <el-table-column
        label="发布时间"
        prop="time"
        width="200">
      </el-table-column>
      <el-table-column
        label="发布标题"
        prop="title"
        width="200">
      </el-table-column>
      <el-table-column
        label="发布详情"
        prop="content"
        width="200">
        <template slot-scope="scope">
            <el-link type="primary" target="_blank"  @click.native.prevent="dialogpoint(scope.$index,scope.row)">
                content
            </el-link>
      </template>
      </el-table-column>
      <el-table-column
        label="发布图片"
        prop="imgs"
        width="200">
        <template slot-scope="scope">
            <el-link type="primary" target="_blank"  @click.native.prevent="dialogpoint_(scope.$index,scope.row)">
                imgs
            </el-link>
      </template>
      </el-table-column>
      <el-table-column
        label="地址"
        prop="address"
        width="200">
      </el-table-column>
      <el-table-column
         fixed="right"
         width="200">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入用户ID关键字搜索"
            prefix-icon="el-icon-search"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)" type="primary" plain icon="el-icon-edit">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)" plain icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
    title="添加信息"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose">
    <el-form :model="dataform">
      <el-form-item label="用户ID">
        <el-input v-model="dataform.userId" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="发布时间">
        <el-input v-model="dataform.time" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="发布标题">
        <el-input v-model="dataform.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="发布详情">
        <el-input v-model="dataform.content" autocomplete="off" type="textarea" autosize></el-input>
      </el-form-item>
      <el-form-item label="发布图片">
        <el-input v-model="dataform.imgs" autocomplete="off" type="textarea" autosize></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="dataform.address" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="this.addConcel" type="danger">取 消</el-button>
      <el-button type="primary" @click="this.handleAdd">确 定</el-button>
      <el-button @click="this.resetForm" type="info">重置</el-button>
    </div>
  </el-dialog>
  <el-dialog
    title="修改信息"
    :visible.sync="editVisible"
    width="50%"
    :before-close="handleClose">
    <el-form :model="dataform">
        <el-form-item label="用户ID">
        <el-input v-model="dataform.userId" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="动态ID">
        <el-input v-model="dataform.postId" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="发布时间">
        <el-input v-model="dataform.time" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="发布标题">
        <el-input v-model="dataform.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="发布详情">
        <el-input v-model="dataform.content" autocomplete="off" type="textarea" autosize></el-input>
      </el-form-item>
      <el-form-item label="发布图片">
        <el-input v-model="dataform.imgs" autocomplete="off" type="textarea" autosize></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="this.editConcel" type="danger">取 消</el-button>
      <el-button type="primary" @click="this.handleAddedit">确 定</el-button>
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
  <el-dialog
    title="point"
    :visible.sync="pointVisible_"
    width="50%"
    :before-close="handleClose">
    <el-input
        type="textarea"
        autosize
        v-model="this.point_">
    </el-input>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="this.pointConcel_">确 定</el-button>
    </div>
  </el-dialog>
  <div>
        <el-pagination
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.currentPage"
          :page-size="this.pageSize"
          :page-sizes="[5, 10]"
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
  </style>
  
  <script>
    export default {
      data() {
        return {
          tableData: [],
          viewData:[],
          search:'',
          dialogVisible: false,
          editVisible:false,
          dataform: {
            userId:'',
            postId:'',
            time: '',
            title:'',
            content:'',
            imgs:'',
            address:''
          },
          currentPage:1,
          pageSize:5,
          pointVisible:false,
          point:'',
          pointVisible_:false,
          point_:''
        }
      },
      methods: {
        async getdata(){
          try{
            const res=await this.$axios.get('/users/getallcs')
              res.data.map(item=>{
                this.tableData.push(item)
              })
          }catch(err){
            console.log(err)
            return false
          }
        },
        async handleAdd(){
          this.dialogVisible = false
          const data={
            userId:this.dataform.userId,
            postId:this.dataform.postId,
            time:this.dataform.time,
            title:this.dataform.title,
            content:this.dataform.content,
            imgs:this.dataform.imgs,
            address:this.dataform.address
          }
          try{
                  const res=await this.$axios.post('/users/userregister',data)
                  if(res.status==200){
                    this.$message({ showClose: true,message:res.data.status,type:'success'})
                    this.tableData=[]
                    this.getdata()
                    this.resetForm()
                  }
              }catch(err){
                console.log(err)
                return false
              }
        },
        async handleAddedit(){
          this.editVisible=false
          const data=this.dataform
          try{
                const res=await this.$axios.post('/users/userupdate',data)
                  if(res.status==200){
                    this.$message({ showClose: true,message:res.data.status,type:'success'})
                    this.tableData=[]
                    this.getdata()
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
            userId:row.userId,
            postId:row.postId,
            time:row.time,
            title:row.title,
            content:row.content,
            imgs:row.imgs,
            address:row.address
          }
        },
        async handleDelete(index, row) {
          const data={userid:row.userid}
          try{
              const res=await this.$axios.post('/users/deluser',data)
                  if(res.status==200){
                    this.$message({ showClose: true,message:res.data.status,type:'success'})
                    this.tableData=[]
                    this.getdata()
                    this.resetForm()
                  }
            }catch(err){
              console.log(err)
              return false
            }
        },
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              this.resetForm()
              done();
            })
            .catch(_ => {});
        },
        resetForm() {
          this.dataform = this.$options.data().dataform
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
        addConcel(){
          this.dialogVisible = false
          this.resetForm()
        },
        pointConcel(){
          this.pointVisible = false
        },
        dialogpoint(index,row){
          this.point=row.content
          this.pointVisible=true
        },
        pointConcel_(){
          this.pointVisible_ = false
        },
        dialogpoint_(index,row){
          this.point_=row.imgs
          this.pointVisible_=true
        }
      },
      mounted(){
        this.getdata()
      }
    }
  </script>
  