<template>
    <div class="placeholder">
      <div class="btndiv">
      <el-button @click="dialogVisible = true" type="primary" icon="el-icon-s-order">添加信息</el-button>
      </div>
    <el-table
      :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize).filter(data => !search || data.foodId.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%" border >
      <el-table-column
        fixed="left"
        label="食物ID"
        prop="foodId"
        width="200">
      </el-table-column>
      <el-table-column
        label="食物名称"
        prop="foodName"
        width="200">
      </el-table-column>
      <el-table-column
        label="能量"
        prop="foodEnergy"
        width="200">
      </el-table-column>
      <el-table-column
        label="图片"
        prop="foodSrc"
        width="200">
        <template slot-scope="scope">
            <el-link type="primary" target="_blank"  @click.native.prevent="dialogpoint(scope.$index,scope.row)">
                img
            </el-link>
      </template>
      </el-table-column>
      <el-table-column
        label="蛋白质"
        prop="foodProtein"
        width="200">
      </el-table-column>
      <el-table-column
        label="热量"
        prop="foodFat"
        width="200">
      </el-table-column>
      <el-table-column
        label="碳水化合物"
        prop="foodCarbohyrate"
        width="200">
      </el-table-column>
      <el-table-column
        label="类型"
        prop="type"
        width="200">
      </el-table-column>
      <el-table-column
         fixed="right"
         width="200">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入食物ID关键字搜索"
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
      <el-form-item label="食物名称">
        <el-input v-model="dataform.foodName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="能量">
        <el-input v-model="dataform.foodEnergy" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-input v-model="dataform.foodSrc" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="蛋白质">
        <el-input v-model="dataform.foodProtein" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="热量">
        <el-input v-model="dataform.foodFat" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="碳水化合物">
        <el-input v-model="dataform.foodCarbohyrate" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-input v-model="dataform.type" autocomplete="off"></el-input>
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
      <el-form-item label="食物ID">
        <el-input v-model="dataform.foodId" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="食物名称">
        <el-input v-model="dataform.foodName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="能量">
        <el-input v-model="dataform.foodEnergy" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-input v-model="dataform.foodSrc" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="蛋白质">
        <el-input v-model="dataform.foodProtein" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="热量">
        <el-input v-model="dataform.foodFat" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="碳水化合物">
        <el-input v-model="dataform.foodCarbohyrate" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-input v-model="dataform.type" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="this.editConcel" type="danger">取 消</el-button>
      <el-button type="primary" @click="this.handleAddedit">确 定</el-button>
    </div>
  </el-dialog>
  <el-dialog
    title="img"
    :visible.sync="pointVisible"
    width="50%"
    :before-close="handleClose">
    <el-input
        type="textarea"
        autosize
        v-model="this.point">
    </el-input>
    <img :src="this.point" style="width: 50%;margin: 20px;"/>
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
          dialogVisible: false,
          editVisible:false,
          pointVisible:false,
          point:'',
          dataform: {
            foodId:'',
            foodName:'',
            foodEnergy: '',
            foodSrc:'',
            foodProtein:'',
            foodFat:'',
            foodCarbohyrate:'',
            type:''
          },
          currentPage:1,
          pageSize:5
        }
      },
      methods: {
        async getdata(){
          try{
            const res=await this.$axios.get('/food/getfood')
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
            foodId:this.dataform.foodId,
            foodName:this.dataform.foodName,
            foodEnergy:this.dataform.foodEnergy,
            foodSrc:this.dataform.foodSrc,
            foodProtein:this.dataform.foodProtein,
            foodFat:this.dataform.foodFat,
            foodCarbohyrate:this.dataform.foodCarbohyrate,
            type:this.dataform.type
          }
          try{
                  const res=await this.$axios.post('/food/insertfood',data)
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
                const res=await this.$axios.post('/food/updatefood',data)
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
            foodId:row.foodId,
            foodName:row.foodName,
            foodEnergy:row.foodEnergy,
            foodSrc:row.foodSrc,
            foodProtein:row.foodProtein,
            foodFat:row.foodFat,
            foodCarbohyrate:row.foodCarbohyrate,
            type:row.type
          }
        },
        async handleDelete(index, row) {
          const data={foodId:row.foodId}
          try{
              const res=await this.$axios.post('/food/delfood',data)
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
            this.point=row.foodSrc
            this.pointVisible=true
        }
      },
      mounted(){
        this.getdata()
      }
    }
  </script>
  