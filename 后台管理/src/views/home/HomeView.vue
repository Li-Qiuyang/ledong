<template>
  <div class="placeholder">
    <div class="btndiv">
    <el-button @click="dialogVisible = true" type="primary" icon="el-icon-s-custom">添加用户</el-button>
    </div>
  <el-table
    :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize).filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%" border >
    <el-table-column
      fixed="left"
      label="用户ID"
      prop="userid"
      width="200">
    </el-table-column>
    <el-table-column
      label="用户名"
      prop="username"
      width="200">
    </el-table-column>
    <el-table-column
      label="头像"
      prop="avatar"
      width="200">
    </el-table-column>
    <el-table-column
      label="家乡"
      prop="region"
      width="200">
    </el-table-column>
    <el-table-column
      label="生日"
      prop="date"
      width="200">
    </el-table-column>
    <el-table-column
      label="个性签名"
      prop="signature"
      width="200">
    </el-table-column>
    <el-table-column
      label="性别"
      prop="sex"
      width="200">
    </el-table-column>
    <!-- <el-table-column
      label="粉丝"
      prop="fans"
      width="200">
    </el-table-column>
    <el-table-column
      label="关注"
      prop="concern"
      width="200">
    </el-table-column> -->
    <el-table-column
      label="身高"
      prop="height"
      width="200">
    </el-table-column>
    <el-table-column
      label="体重"
      prop="weight"
      width="200">
    </el-table-column>
    <el-table-column
       fixed="right"
       width="200">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入用户名关键字搜索"
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
      <el-input v-model="dataform.userid" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="用户名">
      <el-input v-model="dataform.username" autocomplete="off"></el-input>
    </el-form-item>
    <!-- <el-form-item label="头像">
      <el-input v-model="dataform.avatar" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="个性签名">
      <el-input v-model="dataform.signature" autocomplete="off"></el-input>
    </el-form-item> -->
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
      <el-input v-model="dataform.userid" autocomplete="off" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="用户名">
      <el-input v-model="dataform.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="头像">
      <el-input v-model="dataform.avatar" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="家乡">
      <el-input v-model="dataform.region" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="生日">
      <el-input v-model="dataform.date" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="个性签名">
      <el-input v-model="dataform.signature" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-input v-model="dataform.sex" autocomplete="off"></el-input>
    </el-form-item>
    <!-- <el-form-item label="粉丝">
      <el-input v-model="dataform.fans" autocomplete="off" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="关注">
      <el-input v-model="dataform.concern" autocomplete="off" :disabled="true"></el-input>
    </el-form-item> -->
    <el-form-item label="身高">
      <el-input v-model="dataform.height" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="体重">
      <el-input v-model="dataform.weight" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="this.editConcel" type="danger">取 消</el-button>
    <el-button type="primary" @click="this.handleAddedit">确 定</el-button>
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
          userid:'',
          username: '',
          avatar: '',
          region: '',
          date: '',
          signature:'',
          sex:'',
          fans:'',
          concern:'',
          height:'',
          weight:''
        },
        currentPage:1,
        pageSize:5
      }
    },
    methods: {
      async getdata(){
        try{
          const res=await this.$axios.get('/users/getusers')
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
          userid:this.dataform.userid,
          username:this.dataform.username,
          avatar: this.dataform.avatar,
          region: this.dataform.region,
          date: this.dataform.date,
          signature:this.dataform.signature,
          sex:this.dataform.sex,
          fans:this.dataform.fans,
          concern:this.dataform.concern,
          height:this.dataform.height,
          weight:this.dataform.weight
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
          userid:row.userid,
          username:row.username,
          avatar: row.avatar,
          region: row.region,
          date: row.date,
          signature:row.signature,
          sex:row.sex,
          fans:row.fans,
          concern:row.concern,
          height:row.height,
          weight:row.weight
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
      }
    },
    mounted(){
      this.getdata()
    }
  }
</script>
