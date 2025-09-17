<template>
  <div class="user-info-container">
    <div class="user-info-card">
      <h2 class="title">个人信息</h2>

      <el-form
        :model="user"
        :rules="rules"
        status-icon
        label-width="100px"
        class="user-form"
        ref="userForm"
      >
        <!-- 头像上传区域 -->
        <div class="avatar-section">
          <el-upload
            class="avatar-uploader"
            action="/api/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="user.avatar" :src="user.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p class="avatar-tip">点击上传头像</p>
        </div>

        <el-form-item label="用户名称" prop="userName">
          <el-input
            type="text"
            v-model="user.userName"
            placeholder="请输入用户名称"
          ></el-input>
        </el-form-item>

        <el-form-item label="用户账号" prop="account">
          <el-input
            class="account"
            readonly
            type="text"
            v-model="user.account"
          ></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="userEmail">
          <el-input
            type="text"
            v-model="user.userEmail"
            placeholder="请输入邮箱地址"
          ></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input
            type="text"
            v-model="user.phone"
            placeholder="请输入手机号码"
          ></el-input>
        </el-form-item>

        <el-form-item label="拥有角色" prop="roleList">
          <el-input
            class="role"
            readonly
            type="textarea"
            :value="displayRoles"
            autocomplete="off"
            style="resize: none"
          ></el-input>
        </el-form-item>

        <el-form-item label="分配角色" prop="assignedRoles">
          <el-select
            v-model="user.assignedRoles"
            multiple
            placeholder="请选择角色"
            style="width: 100%"
          >
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form-buttons">
          <el-button @click="resetForm">重置</el-button>
          <el-button type="primary" @click="saveForm" :loading="saving"
            >保存更改</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    // 邮箱验证规则
    const checkEmail = (rule, value, callback) => {
      let mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        callback(new Error("请输入邮箱地址"));
      } else if (!mailReg.test(value)) {
        callback(new Error("邮箱格式不正确，应为xx@xx.xx格式"));
      } else {
        callback();
      }
    };

    // 手机号验证规则
    const checkPhone = (rule, value, callback) => {
      let phoneReg = /^1[3|4|5|7|8|9][0-9]{9}$/;
      if (!value) {
        callback(new Error("请输入手机号码"));
      } else if (!phoneReg.test(value)) {
        callback(new Error("手机号格式不正确，应为11位数字且符合运营商规范"));
      } else {
        callback();
      }
    };

    return {
      saving: false,
      user: {
        userName: "张三",
        account: "zhangsan",
        userEmail: "zhangsan@example.com",
        phone: "13800138000",
        avatar: "",
        roleList: ["admin", "user", "xx"],
        assignedRoles: ["admin"],
      },
      tempUser: {},
      rules: {
        userName: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        userEmail: [{ required: true, validator: checkEmail, trigger: "blur" }],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
      },
      roleOptions: [
        { value: "admin", label: "管理员" },
        { value: "user", label: "普通用户" },
        { value: "editor", label: "编辑" },
        { value: "guest", label: "访客" },
      ],
    };
  },
  computed: {
    // 计算属性用于显示角色名称
    displayRoles() {
      return this.user.roleList
        .map((role) => {
          const option = this.roleOptions.find((opt) => opt.value === role);
          return option ? option.label : role;
        })
        .join(", ");
    },
  },
  mounted() {
    // 模拟获取用户信息
    this.getUserInfo();
  },
  methods: {
    // 获取用户信息
    async getUserInfo() {
      try {
        // 模拟API调用
        // const response = await this.$http.get('/user/info');
        // this.user = response.data;
        // this.tempUser = { ...this.user };

        // 当前使用模拟数据
        this.tempUser = JSON.parse(JSON.stringify(this.user));
      } catch (error) {
        this.$message.error("获取用户信息失败");
      }
    },

    // 保存表单
    async saveForm() {
      try {
        this.$refs.userForm.validate(async (valid) => {
          if (!valid) {
            this.$message.warning("请修正表单错误后再提交");
            return;
          }

          this.saving = true;

          // 模拟API调用
          // await this.$http.post('/user/update', this.user);

          // 模拟网络延迟
          await new Promise((resolve) => setTimeout(resolve, 1000));

          this.$message.success("个人信息更新成功");
          this.tempUser = JSON.parse(JSON.stringify(this.user));
          this.saving = false;
        });
      } catch (error) {
        this.$message.error("保存失败，请重试");
        this.saving = false;
      }
    },

    // 重置表单
    resetForm() {
      this.user = JSON.parse(JSON.stringify(this.tempUser));
      this.$refs.userForm.clearValidate();
      this.$message.info("表单已重置");
    },

    // 头像上传成功处理
    handleAvatarSuccess(res, file) {
      this.user.avatar = URL.createObjectURL(file.raw);
    },

    // 头像上传前验证
    beforeAvatarUpload(file) {
      const isJPGOrPNG =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPGOrPNG) {
        this.$message.error("头像只能是 JPG 或 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("头像大小不能超过 2MB!");
      }
      return isJPGOrPNG && isLt2M;
    },
  },
};
</script>

<style scoped>
.user-info-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.user-info-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 800px;
  margin: 0 auto;
}

.title {
  text-align: center;
  color: #409eff;
  margin-bottom: 30px;
  font-weight: 500;
}

.user-form {
  max-width: 600px;
  margin: 0 auto;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 50px;
  height: 50px;
}

.avatar-uploader:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
  object-fit: cover;
}

.avatar-tip {
  font-size: 12px;
  color: #909399;
  margin-top: 10px;
}

.account >>> .el-input__inner,
.role >>> .el-input__inner {
  background-color: #f5f7fa;
  border: 0px;
  color: #606266;
}

.form-buttons {
  text-align: center;
  margin-top: 40px;
}

.form-buttons .el-button {
  width: 100px;
}
</style>
