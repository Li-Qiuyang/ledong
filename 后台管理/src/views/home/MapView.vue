<template>
    <div class="placeholder">
      <div class="btndiv">
      <el-button @click="dialogVisible = true" type="primary" icon="el-icon-add-location">添加地图</el-button>
      </div>
    <el-table
      :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize).filter(data => !search || data.id.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%" border >
      <el-table-column
        fixed="left"
        label="id"
        prop="id"
        width="200">
      </el-table-column>
      <el-table-column
        label="mapid"
        prop="mapid"
        width="200">
      </el-table-column>
      <el-table-column
        label="point"
        prop="point"
        width="200">
        <template slot-scope="scope">
            <el-link type="primary" target="_blank"  @click.native.prevent="dialogpoint(scope.$index,scope.row)">
                point
            </el-link>
      </template>
      </el-table-column>
      <el-table-column
        label="time"
        prop="time"
        width="200">
      </el-table-column>
      <el-table-column
        label="date"
        prop="date"
        width="200">
      </el-table-column>
      <el-table-column
        label="type"
        prop="type"
        width="200">
      </el-table-column>
      <el-table-column
        label="distance"
        prop="distance"
        width="200">
      </el-table-column>
      <el-table-column
        label="head"
        prop="head"
        width="200">
      </el-table-column>
      <el-table-column
        label="speed"
        prop="speed"
        width="200">
      </el-table-column>
      <el-table-column
         fixed="right"
         width="200">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入ID关键字搜索"
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
        <el-form-item label="id">
        <el-input v-model="dataform.id" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="point">
        <el-input v-model="dataform.point" autocomplete="off" type="textarea" autosize></el-input>
      </el-form-item>
      <el-form-item label="time">
        <el-input v-model="dataform.time" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="date">
        <el-input v-model="dataform.date" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="type">
        <el-input v-model="dataform.type" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="distance">
        <el-input v-model="dataform.distance" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="head">
        <el-input v-model="dataform.head" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="speed">
        <el-input v-model="dataform.speed" autocomplete="off"></el-input>
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
      <el-form-item label="id">
        <el-input v-model="dataform.id" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="mapid">
        <el-input v-model="dataform.mapid" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="point">
        <el-input v-model="dataform.point" autocomplete="off" type="textarea" autosize></el-input>
      </el-form-item>
      <el-form-item label="time">
        <el-input v-model="dataform.time" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="date">
        <el-input v-model="dataform.date" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="type">
        <el-input v-model="dataform.type" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="distance">
        <el-input v-model="dataform.distance" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="head">
        <el-input v-model="dataform.head" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="speed">
        <el-input v-model="dataform.speed" autocomplete="off"></el-input>
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
          pointVisible:false,
          dialogVisible: false,
          editVisible:false,
          point:'',
          dataform: {
            id:'',
            mapid:'',
            point:'',
            time:'',
            date:'',
            type:'',
            distance:'',
            head:'',
            speed:''
          },
          currentPage:1,
          pageSize:5
        }
      },
      methods: {
        async getdata(){
          try{
            const res=await this.$axios.get('/map/getmap')
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
            id:this.dataform.id,
            mapid:this.dataform.mapid,
            point:this.dataform.point,
            time:this.dataform.time,
            date:this.dataform.date,
            type:this.dataform.type,
            distance:this.dataform.distance,
            head:this.dataform.head,
            speed:this.dataform.speed
          }
          try{
                  const res=await this.$axios.post('/map/uploadmap',data)
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
                const res=await this.$axios.post('/map/updatemap',data)
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
            id:row.id,
            mapid:row.mapid,
            point:row.point,
            time:row.time,
            date:row.date,
            type:row.type,
            distance:row.distance,
            head:row.head,
            speed:row.speed
          }
        },
        async handleDelete(index, row) {
          const data={id:row.id,mapid:row.mapid}
          try{
              const res=await this.$axios.post('/map/delmap',data)
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
            this.point=row.point
            this.pointVisible=true
        }
      },
      mounted(){
        this.getdata()
      }
    }
  </script>
  