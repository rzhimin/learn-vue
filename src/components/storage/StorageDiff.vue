<template>
  <div class="diff-box">
    <h3>localStorage vs sessionStorage</h3>

    <!-- 1. 一句话标语 -->
    <p class="slogan">
      <b>localStorage</b>：关掉浏览器数据还在，必须手动清除。
      <b>sessionStorage</b>：页面/标签页一关，数据就消失。
    </p>

    <!-- 2. 对照表 -->
    <table class="diff-table">
      <thead>
        <tr>
          <th>对比维度</th>
          <th>localStorage</th>
          <th>sessionStorage</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>生命周期</td>
          <td>永久，需手动清理</td>
          <td>页面会话级（标签页关闭即失效）</td>
        </tr>
        <tr>
          <td>作用域</td>
          <td>同源全部标签页共享</td>
          <td>仅限当前标签页</td>
        </tr>
        <tr>
          <td>容量</td>
          <td>约 5~10 MB</td>
          <td>约 5~10 MB</td>
        </tr>
        <tr>
          <td>API 方法</td>
          <td colspan="2" style="text-align: center">
            完全相同（setItem/getItem/removeItem/clear）
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default { name: "StorageDiff" };
</script>

<style scoped lang="scss">
.diff-box {
  padding: 12px;
  font-size: 14px;
  color: #333;

  h3 {
    margin-bottom: 12px;
    font-weight: 600;
  }
}

.slogan {
  margin: 8px 0 16px;
  line-height: 1.8;

  b {
    color: #1890ff;
  }
}

.diff-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th,
  td {
    border: 1px solid #dcdcdc;
    padding: 6px 10px;
    text-align: left;
  }

  th {
    background: #f5f5f5;
  }
}

.timeline {
  .line {
    display: flex;
    align-items: center;
    margin: 4px 0;

    b {
      width: 110px;
      display: inline-block;
    }

    .label {
      flex: 1;
      text-align: center;
      font-size: 12px;
    }

    // 小圆点
    .on {
      color: #52c41a;
      font-size: 20px;
    }
    .off {
      color: #ccc;
      font-size: 20px;
    }
  }
}
</style>
