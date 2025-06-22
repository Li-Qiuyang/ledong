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
        label="食谱ID"
        prop="menuId"
        width="200">
      </el-table-column>
      <el-table-column
        label="食谱名称"
        prop="menuName"
        width="200">
      </el-table-column>
      <el-table-column
        label="能量"
        prop="menuEnergy"
        width="200">
      </el-table-column>
      <el-table-column
        label="图片"
        prop="menuSrc"
        width="200">
        <template slot-scope="scope">
            <el-link type="primary" target="_blank"  @click.native.prevent="dialogpoint(scope.$index,scope.row)">
                img
            </el-link>
      </template>
      </el-table-column>
      <el-table-column
        label="原料"
        prop="foodDesc"
        width="200">
        <template slot-scope="scope">
            <el-link type="primary" target="_blank"  @click.native.prevent="dialogfooddesc(scope.$index,scope.row)">
                details
            </el-link>
      </template>
      </el-table-column>
      <el-table-column
        label="做法"
        prop="descs"
        width="200">
        <template slot-scope="scope">
            <el-link type="primary" target="_blank"  @click.native.prevent="dialogdesc(scope.$index,scope.row)">
                details
            </el-link>
      </template>
      </el-table-column>
      <el-table-column
        label="蛋白质"
        prop="menuProtein"
        width="200">
      </el-table-column>
      <el-table-column
        label="热量"
        prop="menuFat"
        width="200">
      </el-table-column>
      <el-table-column
        label="碳水化合物"
        prop="menuCarbohyrate"
        width="200">
      </el-table-column>
      <el-table-column
        label="类型"
        prop="trait"
        width="200">
      </el-table-column>
      <el-table-column
         fixed="right"
         width="200">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入食谱ID关键字搜索"
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
      <el-form-item label="食谱名称">
        <el-input v-model="dataform.menuName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="能量">
        <el-input v-model="dataform.menuEnergy" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-input v-model="dataform.menuSrc" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="原料">
        <el-input v-model="dataform.foodDesc" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="做法">
        <el-input v-model="dataform.descs" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="蛋白质">
        <el-input v-model="dataform.menuProtein" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="热量">
        <el-input v-model="dataform.menuFat" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="碳水化合物">
        <el-input v-model="dataform.menuCarbohyrate" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-input v-model="dataform.trait" autocomplete="off"></el-input>
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
      <el-form-item label="食谱ID">
        <el-input v-model="dataform.menuId" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="食谱名称">
        <el-input v-model="dataform.menuName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="能量">
        <el-input v-model="dataform.menuEnergy" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-input v-model="dataform.menuSrc" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="原料">
        <el-input v-model="dataform.foodDesc" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="做法">
        <el-input v-model="dataform.descs" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="蛋白质">
        <el-input v-model="dataform.menuProtein" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="热量">
        <el-input v-model="dataform.menuFat" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="碳水化合物">
        <el-input v-model="dataform.menuCarbohyrate" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-input v-model="dataform.trait" autocomplete="off"></el-input>
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
  <el-dialog
    title="fooddesc"
    :visible.sync="fooddescVisible"
    width="50%"
    :before-close="handleClose">
    <el-input
        type="textarea"
        autosize
        v-model="this.fooddesc">
    </el-input>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="this.fooddescConcel">确 定</el-button>
    </div>
  </el-dialog>
  <el-dialog
    title="desc"
    :visible.sync="descVisible"
    width="50%"
    :before-close="handleClose">
    <el-input
        type="textarea"
        autosize
        v-model="this.desc">
    </el-input>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="this.descConcel">确 定</el-button>
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
          fooddescVisible:false,
          fooddesc:'',
          descVisible:false,
          desc:'',
          dataform: {
            menuId:'',
            menuName:'',
            menuEnergy: '',
            menuSrc:'',
            foodDesc:'',
            descs:'',
            menuProtein:'',
            menuFat:'',
            menuCarbohyrate:'',
            trait:''
          },
          currentPage:1,
          pageSize:5
        }
      },
      methods: {
        async getdata(){
          try{
            const res=await this.$axios.get('/menu/getmenu')
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
            menuId:this.dataform.menuId,
            menuName:this.dataform.menuName,
            menuEnergy:this.dataform.menuEnergy,
            menuSrc:this.dataform.menuSrc,
            foodDesc:this.dataform.foodDesc,
            descs:this.dataform.descs,
            menuProtein:this.dataform.menuProtein,
            menuFat:this.dataform.menuFat,
            menuCarbohyrate:this.dataform.menuCarbohyrate,
            trait:this.dataform.trait
          }
          try{
                  const res=await this.$axios.post('/menu/uploadmenu',data)
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
                const res=await this.$axios.post('/menu/updatemenu',data)
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
            menuId:row.menuId,
            menuName:row.menuName,
            menuEnergy:row.menuEnergy,
            menuSrc:row.menuSrc,
            foodDesc:row.foodDesc,
            descs:row.descs,
            menuProtein:row.menuProtein,
            menuFat:row.menuFat,
            menuCarbohyrate:row.menuCarbohyrate,
            trait:row.trait
          }
        },
        async handleDelete(index, row) {
          const data={menuId:row.menuId}
          try{
              const res=await this.$axios.post('/menu/delmenu',data)
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
            this.point=row.menuSrc
            this.pointVisible=true
        },
        fooddescConcel(){
          this.fooddescVisible = false
        },
        dialogfooddesc(index,row){
            this.fooddesc=row.foodDesc
            this.fooddescVisible=true
        },
        descConcel(){
          this.descVisible = false
        },
        dialogdesc(index,row){
            this.desc=row.descs
            this.descVisible=true
        }
      },
      mounted(){
        this.getdata()
      }
    }
  </script>