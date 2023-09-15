<template>
  <div>
    <div class="userInfo">
      <h1>个人信息</h1>
      <!--
        //绑定数据、绑定规则
        //注意表单项的prop要和数据对应
      -->
      <el-form
        :model="user"
        :rules="rules"
        status-icon
        label-width="100px"
        class="userForm"
        ref="userForm"
      >
        <el-form-item label="用户名称" prop="userName" label-width="100px">
          <el-input
            type="text"
            v-model="user.userName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户账号" prop="account">
          <el-input
            class="account"
            :readonly="true"
            type="text"
            v-model="user.account"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input
            type="text"
            v-model="user.userEmail"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            type="text"
            v-model="user.phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="拥有角色" prop="roleList">
          <el-input
            class="role"
            :readonly="true"
            type="textarea"
            v-model="user.roleList"
            autocomplete="off"
            style="resize: none"
          ></el-input>
        </el-form-item>
        <div class="set">
          <el-select v-model="value1" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="button">
          <el-button @click="reset()">重置</el-button>
          <el-button @click="save()" style="margin-left: 40px">保存</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Input, Button, Form, FormItem, Select } from "element-ui";
export default {
  name: "updateUser",
  components: {
    "el-input": Input,
    "el-button": Button,
    "el-form": Form,
    "el-select": Select,
    "el-form-item": FormItem,
  },
  data() {
    //rule表示要验证的规则,value表示输入值,callback回调
    var checkEmail = (rule, value, callback) => {
      let mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        //如果输入为空直接返回
        callback();
      } else {
        //如果字符串 string 中含有与 RegExpObject 匹配的文本，则返回 true，否则返回 false。
        if (mailReg.test(value)) {
          //匹配成功返回
          callback();
        } else {
          //匹配不成功返回错误显示
          callback(
            new Error("邮箱格式:xx@xx.xx，只含数字、大小写字母、下划线、横杠")
          );
        }
      }
    };
    var checkPhone = (rule, value, callback) => {
      let phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
      if (!value) {
        callback();
      } else {
        if (phoneReg.test(value)) {
          callback();
        } else {
          callback(new Error("电话格式:13、14、15、17、18开头+9位阿拉伯数字"));
        }
      }
    };
    return {
      isEdit: false,
      user: {},
      tempUser: {},
      //规则可以设定多个需要"[]"
      //required表示数据必需
      //message表示未满足条件的提示信息
      //trigger是触发条件：blur离开焦点触发，change修改触发
      rules: {
        userName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        account: [{ required: true, message: "请输入账户", trigger: "blur" }],
        userEmail: [{ validator: checkEmail, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value1: [],
    };
  },
  mounted() {
    // 获取用户信息
    //this.user=...
    //this.tempUser=...
  },
  methods: {
    // 修改个人信息
    save() {
      // valid在全部validator通过才会返回true，否则为false
      this.$refs.userForm.validate((valid) => {
        if (!valid) {
          this.message("warning", "请修改正确的数据格式！");
          return;
        } else {
          //验证通过调用保存接口
        }
      });
    },
    // 重置
    reset() {
      //利用深拷贝，防止影响到tempUser用于重置
      this.user = JSON.parse(JSON.stringify(this.tempUser));
    },
    message(type, title) {
      this.$message({
        type: type,
        message: title,
      });
    },
  },
};
</script>

<style scoped>
.userInfo {
  width: 100%;
  height: 100%;
}
.account >>> .el-input__inner,
.department >>> .el-input__inner,
.role >>> .el-input__inner {
  appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 0px;
  width: 100%;
}
.role >>> .el-textarea__inner {
  resize: none;
  border: none;
}
.button {
  margin-top: 40px;
  text-align: center;
}
</style>
