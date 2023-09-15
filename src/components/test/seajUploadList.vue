<template>
  <div class="upload-list-style seaj">
    <ul>
      <li class="upload-list-head">
        <div class="list-head-item pd-l-15" style="width: 25%">
          {{ $t('m.i.components.upload.fileType') }}
        </div>
        <div style="width: 160px" v-if="isHasTemplate"></div>
        <h-row style="flex: 3">
          <h-col class="list-head-item">
            {{ $t('m.i.components.upload.fileName') }}({{ $t('m.i.components.upload.uploader') }}/{{
              $t('m.i.components.upload.uploadTime')
            }})
          </h-col>
        </h-row>
        <h-row>
          <h-col class="list-head-item t-r pd-r-30" style="flex: 1">{{ $t('m.i.common.action') }}</h-col>
        </h-row>
      </li>
      <template v-for="(item, index) in fileDataArray">
        <li
          class="upload-list-body"
          :style="{ 'border-bottom': otherFileShow ? '' : '1px solid #b3cced' }"
          :key="index"
          v-if="!item.is_hide"
        >
          <!-- <h-row> -->
          <div style="width: 25%" class="list-body-item pd-l-15" :title="item.define_name">
            <b class="sub-color" v-show="isRequired(item)">*</b>
            {{ item.define_name }}
          </div>
          <div style="width: 160px" class="list-body-item pd-l-15 temp-box" v-if="item.is_template === '1'">
            <!-- v-if="item.is_templete" -->
            <div v-if="item.is_template === '1'">
              <a>{{ $t('m.i.components.upload.templateInfo') }}</a>
              <h-icon name="information-circled" color="#2B80CA" class="fn-font-14 mg-t-5"></h-icon>
              <h-button
                type="text"
                size="small"
                class="fn-color-blue hover-btn"
                @click.native.stop="templateDownLoad(item)"
                >{{ $t('m.i.common.download') }}
              </h-button>
              <h-button
                type="text"
                size="small"
                class="fn-color-blue hover-btn"
                @click.native.stop="templatePreview(item)"
                >{{ $t('m.i.common.preview') }}
              </h-button>
            </div>
          </div>
          <div style="flex: 3" class="list-body-item">
            <!-- 111 -->
            <h-icon
              name="android-attach"
              v-if="item.file_name && item.file_name.length > 0"
              color="#2B80CA"
              class="fn-font-14 mg-t-5"
            ></h-icon>
            <!-- 1111111 -->
            <a
              :title="`${item.file_name}(${item.modifier_name}${item.modify_date})`"
              @click="downLoad(item.file_id, item.file_name)"
              >{{ item.file_name }}</a
            >
            <span v-if="item.modifier_name && item.modifier_name.length > 0"
              >({{ item.modifier_name }}/{{ item.modify_date }})</span
            >
          </div>

          <div class="list-body-item t-r pd-r-20">
            <h-button
              size="small"
              class="sub"
              v-if="openHistory && item.history_file && item.history_file.length > 0"
              @on-click="showHistory(item)"
              >历史附件
            </h-button>

            <h-button
              size="small"
              class="sub"
              v-if="!isDetail && item.file_name && !item.no_deleted"
              @on-click="deleteFile(item.file_id, item.is_all_delete, item.define_type)"
              >删除
            </h-button>

            <h-upload
              :on-exceeded-size="onExceededize"
              :maxSize="maxSize"
              v-if="!isDetail && item.file_name != null && retransmit"
              ref="upload"
              :on-error="uploadError"
              :before-upload="beforeUpload"
              :on-success="reuploadSuccess"
              :accept="item.accept || ''"
              :action="action"
            >
              <h-button
                size="small"
                class="sub"
                v-if="!isDetail && item.file_name != null && !item.no_reupload"
                @on-click="reFile(item.file_id, item.define_type)"
                >重传</h-button
              >
            </h-upload>
            <span v-if="item.print">
              <h-button
                size="small"
                class="sub"
                :loading="loading"
                v-if="!isDetail && item.file_name != null && !item.isPrint"
                @on-click="printFile(item.file_id, item.define_type, item.rule_name)"
                :disabled="printIsDis"
                >用印</h-button
              >
              <h-button size="small" class="printBtn" v-if="!isDetail && item.file_name != null && item.isPrint"
                >已用印</h-button
              >
            </span>
            <span>
              <h-button
                size="small"
                v-if="item.file_name != null && getFIleType(item.file_name) !== '-1'"
                class="sub"
                @on-click="prewFile(item.file_id, item.file_name, item.define_type)"
                >预览</h-button
              >
            </span>
            <h-upload
              :on-exceeded-size="onExceededize"
              :maxSize="maxSize"
              v-if="!isDetail && item.file_name == null"
              ref="upload"
              :on-error="uploadError"
              :before-upload="beforeUpload"
              :on-success="uploadSuccess"
              :action="action"
              :accept="item.accept || ''"
              :format="item.format || []"
            >
              <h-button
                size="small"
                type="primary"
                class=""
                v-if="!isDetail && item.file_name == null && !item.no_upload"
                @on-click="upFile(item)"
                >上传
              </h-button>
            </h-upload>
          </div>
          <!-- </h-row> -->
        </li>
      </template>
      <li v-show="otherFileShow" class="upload-list-body" style="position: relative">
        <div class="list-head-item pd-l-15" v-if="otherFileName" style="display: inline-block; margin-right: 5px">
          {{ otherFileName }}
        </div>
        <div class="list-head-item pd-l-15" v-else style="display: inline-block; margin-right: 5px">其他</div>
        <h-upload
          :on-exceeded-size="onExceededize"
          :maxSize="maxSize"
          style="float: right; margin-right: 19px; height: 30px"
          v-if="isaddOther || !isDetail || isShowOthers"
          ref="upload"
          :on-error="uploadError"
          :before-upload="beforeUpload"
          :on-success="otheruploadSuccess"
          :action="action"
        >
          <h-button size="small" type="primary">上传</h-button>
        </h-upload>
      </li>
      <li class="upload-list-body" v-for="(item, index) in otherFileDataArray" :key="index">
        <h-row style="width: 25%">
          <h-col class="list-head-item pd-l-15"></h-col>
        </h-row>
        <h-row style="width: 160px" v-if="isHasTemplate">
          <h-col class="list-head-item pd-l-15"></h-col>
        </h-row>
        <h-row style="flex: 3">
          <h-col class="list-body-item">
            <h-icon name="android-attach" color="#2B80CA" class="fn-font-14 mg-t-5"></h-icon>
            <a
              :title="`${item.file_name}(${item.modifier_name}${item.modify_date})`"
              @click="downLoad(item.file_id, item.file_name)"
              >{{ item.file_name }}</a
            >
            {{ '(' + item.modifier_name }}/{{ item.modify_date + ')' }}
          </h-col>
        </h-row>
        <h-row>
          <h-col class="list-head-item t-r pd-r-20" span="4">
            <span>
              <h-button
                size="small"
                v-if="item.file_name != null && getFIleType(item.file_name) !== '-1'"
                class="sub"
                @on-click="prewFile(item.file_id, item.file_name, item.define_type)"
                >预览</h-button
              >
            </span>
            <span>
              <h-button
                size="small"
                class="sub"
                v-if="
                  !noCreator &&
                  !isDetail &&
                  !item.no_deleted &&
                  item.creator === operator_code &&
                  (item.uploadNode ? item.uploadNode === nodeId2FileCom : true)
                "
                @on-click="deleteOtherFile(item.file_id)"
                >删除</h-button
              >
              <h-button
                size="small"
                class="sub"
                v-if="
                  noCreator &&
                  !isDetail &&
                  !item.no_deleted &&
                  (item.uploadNode ? item.uploadNode === nodeId2FileCom : true)
                "
                @on-click="deleteOtherFile(item.file_id)"
                >删除</h-button
              >
            </span>
          </h-col>
        </h-row>
      </li>
    </ul>
    <div class="demo-spin-container" v-if="spinShow">
      <h-spin fix>上传中，请稍后！</h-spin>
    </div>
    <seajPreviewPage ref="previewPagePop"></seajPreviewPage>
    <h-msg-box v-model="isShowHistory" :mask-closable="false" width="800" top="120">
      <p slot="header">
        <span>查看历史附件</span>
      </p>
      <seajUploadFileHistory :historyFileArray="historyFileArray"></seajUploadFileHistory>
    </h-msg-box>
  </div>
</template>
<script>
import {
  invokeApi,
  fileDelete,
  fileDownload,
  fileUseSealOnline,
  filePreviewOnLine,
  getAnnexTemplatesByCodeAndType,
  addWorkFlowFileHistory,
  queryWorkFlowFileHistory,
  downloadZip,
} from '@src/seaj.base/api'
import prewPage from './seajUploadList/prewPage'
import seajUploadFileHistory from './seajUploadFileHistory'
import _ from 'lodash'
import Vue from 'vue'
import Cookies from 'js-cookie'
import { formatDate } from '@common/utils/tools'
export default {
  name: 'seajUploadList',
  components: {
    // prewPage,
    seajUploadFileHistory,
  },
  props: {
    // 用印按钮是否置灰
    printIsDis: {
      type: Boolean,
      default: false,
    },
    // 文件大小限制
    maxSize: {
      type: Number,
      default: 204800,
    },
    // 文件上传后需要置为false，否则会删除已上传的文件
    deleteFlag: {
      type: Boolean,
      default: true,
    },
    // 本人权限限制
    noCreator: {
      type: Boolean,
      default: false,
    },
    // 其他附件不展示
    otherFileShow: {
      type: Boolean,
      default: true,
    },
    // 其他附加大类
    otherFileName: {
      type: String,
      default: '',
    },
    // 重传删除
    retransmit: {
      type: Boolean,
      default: true,
    },
    // 是否页面为详情页面展示
    isDetail: {
      type: Boolean,
      default: () => false,
    },
    // 划款指令查询追加附件
    isaddOther: {
      type: Boolean,
      default: () => false,
    },
    isShowOthers: {
      type: Boolean,
      default: () => false,
    },
    // 按钮等外部事件增加附件
    parentListData: {
      type: Array,
    },
    // 一般附件列表
    fileData: {
      type: Array,
      default: () => [],
    },
    // 其他附件列表
    otherFileData: {
      type: Array,
      default: () => [],
    },
    // 其他附加大类
    otherFileType: {
      type: String,
      default: 'fund',
    },
    // 新增的流程节点
    nodeId2FileCom: {
      type: String,
      default: '',
    },
    // 流程信息
    workflowConfig: {
      type: Object,
      default: () => {},
    },
    // 是否开启历史附件
    openHistory: {
      type: Boolean,
      default: () => false,
    },
    // 允许上传的文件类型
    acceptFileType: {
      type: String,
      default: 'bmp,gif,jpg,jpeg,png,pdf,zip,rar,doc,docx,xlsx,xls,7z,txt,ppt,pptx,mp3,mp4,csv',
    },
  },
  computed: {
    fileIds() {
      let ids = []
      if (!(this.fileDataArray instanceof Array)) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.fileDataArray = []
      }
      this.fileDataArray.forEach((item) => {
        item.file_id && ids.push(item.file_id)
      })
      return ids
    },
    otherFileIds() {
      let ids = []
      this.otherFileDataArray.forEach((item) => {
        item.file_id && ids.push(item.file_id)
      })
      return ids
    },
    isHasTemplate() {
      return this.fileDataArray.some((item) => item.is_template == 1)
    },
  },
  data() {
    return {
      action: window.LOCAL_CONFIG.gsv.doc + '/uploadFile',
      gsv: window.LOCAL_CONFIG.gsv.doc,
      baseGsv: window.LOCAL_CONFIG.gsv.baseGroup,
      delArr: [], // 保存需要删除的文件id
      fileDataArray: [],
      otherFileDataArray: [],
      spinShow: false,
      operator_code: '',
      showMegBox: false,
      preview_file_id: '',
      fileType: '-1',
      vheight: 450,
      fileTypes: 'bmp,gif,jpg,jpeg,png,pdf,zip,rar,doc,docx,xlsx,xls,7z,txt,ppt,pptx,mp3,mp4,csv',
      loading: false,
      isShowHistory: false,
      historyFileArray: [],
      reloadFileId: '',
      arrSaveObj: [],
      saveOtherNode: '', // 保存的上传的节点
      // is_delete
      // is_upload
      // is_reupload
    }
  },
  methods: {
    downLoadAll() {
      let file_id = this.fileIds.length > 0 ? this.fileIds.join(',') : null
      let other_file_ids = this.otherFileIds.length > 0 ? this.otherFileIds.join(',') : null
      let finally_ids = null
      if (file_id && other_file_ids) {
        finally_ids = file_id + ',' + other_file_ids
      } else {
        if (file_id) {
          finally_ids = file_id
        } else {
          finally_ids = other_file_ids
        }
      }
      if (finally_ids) {
        downloadZip(finally_ids, '全部附件')
      } else {
        this.$hMessage.warning('附件为空,无法下载！')
      }
    },
    onExceededize() {
      this.$hMessage.warning(`文件大小超出限制！请控制在${parseInt(this.maxSize / 1024)}MB内`)
      this.spinShow = false
    },
    beforeUpload(e, t) {
      let fileName = e.name.split('.')
      let fileTypeTemp = fileName[fileName.length - 1]
      fileTypeTemp = fileTypeTemp.toLowerCase()
      if (this.fileTypes.indexOf(fileTypeTemp) === -1) {
        this.$hMessage.info('不支持此类型文件上传！')
        return false
      }
      if (e.size === 0) {
        this.$hMessage.info('上传文件不能为空！')
        return false
      }
      if (fileName[0].length > 85) {
        // 文件名称的长度限制
        this.$hMessage.info('文件名称不符合长度规范。')
        return false
      }
      let A0402 = _.find(this.fileDataArray, function (o) {
        return o.define_type === 'A0402'
      })
      if (A0402 && this.acceptFileType.indexOf(fileTypeTemp) === -1) {
        this.$hMessage.info('请上传' + this.acceptFileType + '类型的文件')
        return false
      }
      if (this.acceptFileType.indexOf(fileTypeTemp) === -1) {
        this.$hMessage.info('请上传' + this.acceptFileType + '类型的文件')
        return false
      }
      this.spinShow = true
    },
    onMaximize(msgHeight) {
      this.vheight = msgHeight - 50
    },
    getTemplate(item) {
      let params = {
        param: {
          template_code: item.template_code, // 类型编号
          template_type: item.template_type, // 1 文档，0资料（仅下载）
        },
      }
      return getAnnexTemplatesByCodeAndType(this.baseGsv, params)
    },
    templateDownLoad(item) {
      this.getTemplate(item).then((res) => {
        if (res.error_message === 'SUCC') {
          this.downLoad(res.result[0].template_fileid, item.template_name || res.result[0].template_file_name)
        }
      })
    },
    templatePreview(item) {
      this.getTemplate(item).then((res) => {
        if (res.error_message === 'SUCC') {
          this.prewFile(res.result[0].template_fileid, res.result[0].template_file_name)
        }
      })
    },
    getFIleType(fileName) {
      let temp = fileName.split('.')
      let fileType = '-1'
      switch (temp[temp.length - 1].toLowerCase()) {
        case 'xls':
          fileType = 'xls'
          break
        case 'xlsx':
          fileType = 'xlsx'
          break
        case 'pdf':
          fileType = 'pdf'
          break
        case 'docx':
          fileType = 'docx'
          break
        case 'doc':
          fileType = 'doc'
          break
        case 'png':
          fileType = 'png'
          break
        case 'jpg':
          fileType = 'jpg'
          break
        default:
          fileType = '-1'
      }
      return fileType
    },
    prewFile(fileId, fileName) {
      this.$refs.previewPagePop.prewFile(fileId, fileName)
    },
    async prewFiles(fileId, fileName) {
      let params = {
        param: {
          src_file_id: fileId,
        },
      }
      let temp = fileName.split('.')
      switch (temp[temp.length - 1].toLowerCase()) {
        case 'xls':
          this.showMegBox = true
          await this.filePreviewOnLine(params)
          this.fileType = 'xls'
          break
        case 'xlsx':
          this.preview_file_id = fileId
          this.showMegBox = true
          this.fileType = 'xlsx'
          break
        case 'pdf':
          this.preview_file_id = fileId
          this.showMegBox = true
          this.fileType = 'pdf'
          break
        case 'docx':
          this.showMegBox = true
          await this.filePreviewOnLine(params)
          this.fileType = 'docx'
          break
        case 'doc':
          await this.filePreviewOnLine(params)
          this.fileType = 'doc'
          break
        case 'png':
          this.preview_file_id = fileId
          this.showMegBox = true
          this.fileType = 'png'
          break
        case 'jpg':
          this.preview_file_id = fileId
          this.showMegBox = true
          this.fileType = 'jpg'
          break
        default:
          this.fileType = '-1'
      }
    },
    filePreviewOnLine(params) {
      return filePreviewOnLine(this.gsv, params).then((res) => {
        if (res.result.preview_file_id) {
          this.preview_file_id = res.result.preview_file_id
          this.showMegBox = true
        }
      })
    },
    msgSubmit() {
      this.showMegBox = false
    },
    msgCancel() {
      this.showMegBox = false
    },
    printFile(e, t, ruleName) {
      let params = {
        param: {
          source_file_id: e,
          rule_name: ruleName,
          convert_to_pdf: true,
        },
      }
      this.loading = true
      fileUseSealOnline(this.gsv, params).then((res) => {
        this.loading = false
        this.getFileMessage(
          {
            fileId: [res.result.destination_file_id],
            idArr: [t],
          },
          true
        )
      })
    },
    reFile(e, t) {
      e && this.delArr.push(e)
      this.reloadFileId = e
      this.refundId = e
      this.redefineType = t
    },
    // 重传附件上传成功后方法
    reuploadSuccess(fileInfo, file, otherFileDataArray) {
      this.spinShow = false
      if (fileInfo.error_code) {
        this.$hMsgBox.error({
          title: '错误',
          content: fileInfo.error_message ? fileInfo.error_message : fileInfo.error_code,
        })
        return
      }
      if (this.workflowConfig.flowKey === 'A02615097') this.$emit('button-change', true)
      // eslint-disable-next-line no-unused-vars
      let workId = ''
      let bizCatalog = ''
      let fileIds = []
      let defineType = this.redefineType
      fileInfo.defineType = defineType
      fileIds.push(fileInfo.file_id)
      this.fileIds.push(fileInfo.file_id)
      this.fileDataArray.forEach((item) => {
        bizCatalog = item.biz_catalog
      })
      fileInfo.fileId = fileInfo.file_id
      fileInfo.fileName = fileInfo.file_name
      fileInfo.fileType = fileInfo.file_type
      fileInfo.fileSize = fileInfo.file_size
      // 查找当前附件是否存在名称配置
      let config = this.fileDataArray.find((item) => item.define_type === fileInfo.defineType)
      let fileName = fileInfo.file_name
      let lIndex1 = fileName.lastIndexOf('.')
      let preZui = fileName.substr(0, lIndex1).toLowerCase()
      let lastZui = fileName.substr(lIndex1 + 1).toLowerCase()
      if (config && config.file_name_rule) {
        let currentDate = formatDate(new Date().getTime(), 'yyMMdd')
        // let fileNamePrefix = fileName.split('.')[0]
        // let fileNameSuffix = fileName.split('.')[1].toLowerCase()
        let fileNamePrefix = preZui
        let fileNameSuffix = lastZui

        if (config.file_name_rule.split('.')[1] && fileNameSuffix !== config.file_name_rule.split('.')[1]) {
          this.$hMessage.warning('请上传' + config.file_name_rule.split('.')[1] + '格式文件！')
          return
        }
        if (config.file_name_rule.split('.')[1]) {
          fileName = config.file_name_rule.replace('{fileName}', fileNamePrefix).replace('{currentDate}', currentDate)
        } else {
          fileName =
            config.file_name_rule.replace('{fileName}', fileNamePrefix).replace('{currentDate}', currentDate) +
            '.' +
            fileNameSuffix
        }
      }
      this.relevanceFlie(fileIds, defineType, bizCatalog, fileName).then((res) => {
        // 如果是流程发起节点则不保存历史附件
        if (this.openHistory && this.workflowConfig.isStartWorkflow !== '1') {
          // 记录历史附件
          this.addWorkFlowFileHistory(config, this.reloadFileId)
        }
        this.$emit('uploadFileSuccessCallBack', {
          fileInfo: fileInfo,
          file: file,
        })
        this.getFileMessage({ fileId: fileIds, idArr: [defineType] })
        //   fileDelete(this.refundId).then(a => {

        //
        //   })
      })
    },

    getFileMessage(params, isPrint, callback = null) {
      params.fileId = params.fileId || []
      params.idArr = params.idArr || []
      let msgParams = {
        param: {
          define_type: params.idArr.length > 0 ? params.idArr.join(',') : '#',
          work_id: params.workId || '',
          biz_catalog: params.bizCatalog || '',
          file_id: params.fileId.length > 0 ? params.fileId.join(',') : '#',
        },
      }
      invokeApi(this.gsv, 'getFileMessage', msgParams).then((res) => {
        if (isPrint) {
          res[0].isPrint = true
          this.$emit('printFileSuccessCallBack', res)
        }
        if (this.fileDataArray.length === 0) {
          this.fileDataArray = res
        } else {
          _.each(res, (item) => {
            let matchItemIndex = _.findIndex(this.fileDataArray, (o) => {
              return o.define_type === item.define_type
            })
            if (matchItemIndex === -1) {
              this.fileDataArray.push(item)
            } else {
              this.$set(this.fileDataArray, matchItemIndex, Object.assign(this.fileDataArray[matchItemIndex], item))
            }
          })
        }
        if (this.nodeId2FileCom === 'A02615021_A') {
          this.fileDataArray.forEach((index, i) => {
            if (index.define_type === 'A0208') {
              this.fileDataArray[i].define_name = '产品新基金合同'
            }
          })
        }
        callback && callback(this.fileDataArray)
      })
    },
    getOtherFileMessage(params) {
      params.fileId = params.fileId || []
      let msgParams = {
        param: {
          define_type: this.otherFileType === 'fund' ? 'Z' : 'P',
          work_id: params.workId || '',
          biz_catalog: params.bizCatalog || '',
          file_id: params.fileId.length > 0 ? params.fileId.join(',') : '#',
        },
      }
      invokeApi(this.gsv, 'getOtherFileMessage', msgParams).then((res) => {
        let newRes = res
        // this.arrSaveObj
        newRes.forEach((item, index) => {
          this.otherFileDataArray.forEach((itemIn, indexIn) => {
            // this.otherFileDataArray 此处的是从大字段来的对象
            if (item.file_id == itemIn.file_id) {
              item.uploadNode = itemIn.uploadNode
            }
          })
        })
        this.otherFileDataArray = newRes

        this.$emit('getOtherFileMessageCallBack', this.otherFileDataArray)
      })
    },
    // 外部使用接口
    getUploadData() {
      let fileDataArray = this.fileDataArray
      let defineType = []
      let fileId = []
      fileDataArray.forEach((item) => {
        defineType.push(item.define_type)
        fileId.push(item.file_id)
      })
      return fileDataArray
    },
    getOtherUploadData() {
      let otherFileDataArray = this.otherFileDataArray
      let fileId = []
      let defineType = []
      otherFileDataArray.forEach((item) => {
        defineType.push('Z')
        fileId.push(item.file_id)
      })
      otherFileDataArray.forEach((item, index) => {
        this.arrSaveObj.forEach((itemIn, indexIn) => {
          if (item.file_id == itemIn.response.file_id) {
            item.uploadNode = itemIn.uploadNode
          }
        })
      })
      return otherFileDataArray
    },
    // 其他附件上传成功后方法
    otheruploadSuccess(fileInfo, file, otherFileDataArray) {
      let that = this
      otherFileDataArray.forEach((item, index) => {
        if (fileInfo.fileId == item.response.fileId) {
          item.uploadNode = that.nodeId2FileCom
        }
      })
      this.arrSaveObj = otherFileDataArray

      // this.saveOtherNode = this.nodeId2FileCom
      this.spinShow = false

      if (fileInfo.error_code) {
        this.$hMsgBox.error({
          title: '错误',
          content: fileInfo.error_message ? fileInfo.error_message : fileInfo.error_code,
        })
        return
      }
      // eslint-disable-next-line no-unused-vars
      let workId
      let bizCatalog = this.otherFileType === 'fund' ? 'AMOSPDTFUNDINFO_FILE_OTHER' : 'AMOSBASEMANGINST_FILE_OTHER'
      let fileIds = []
      let defineType = this.otherFileType === 'fund' ? 'Z' : 'P'
      fileInfo.defineType = defineType
      fileIds.push(fileInfo.fileId ? fileInfo.fileId : fileInfo.file_id)
      this.otherFileIds.push(fileInfo.fileId ? fileInfo.fileId : fileInfo.file_id)
      this.fileDataArray.forEach((item) => {
        workId = item.work_id
      })
      fileInfo.fileId = fileInfo.file_id
      fileInfo.fileName = fileInfo.file_name
      fileInfo.fileType = fileInfo.file_type
      fileInfo.fileSize = fileInfo.file_size
      this.relevanceFlie(fileIds, defineType, bizCatalog, fileInfo.file_name).then((res) => {
        this.$emit('uploadFileSuccessCallBack', {
          fileInfo: fileInfo,
          file: file,
        })
        this.getOtherUploadInfo(bizCatalog)
      })
    },
    // 查询其他附件
    getOtherUploadInfo(bizCatalog) {
      // eslint-disable-next-line no-unused-vars
      let wokeId
      this.fileDataArray.forEach((item) => {
        wokeId = item.work_id
      })

      this.getOtherFileMessage({
        fileId: this.otherFileIds,
      })
    },
    // 获取当前上传文件类型
    upFile(item) {
      this.define_type_up = item.define_type
    },
    // 判断是否必传
    isRequired(obj) {
      let temp = this.fileDataArray.find((item) => {
        return item.define_type === obj.define_type
      })
      if (temp) {
        return temp.is_required === '1'
      }
      return false
    },
    // get
    uploadError(res, file, fileList) {
      // fileDataArray
      this.spinShow = false
    },
    // 上传成功
    uploadSuccess(fileInfo, file, fileList) {
      this.spinShow = false
      if (fileInfo.error_code) {
        this.$hMsgBox.error({
          title: '错误',
          content: fileInfo.error_message ? fileInfo.error_message : fileInfo.error_code,
        })

        return
      }
      // eslint-disable-next-line no-unused-vars
      let workId
      let bizCatalog
      let fileIds = []
      let fileid = fileInfo.fileId ? fileInfo.fileId : fileInfo.file_id
      fileInfo.defineType = this.define_type_up
      fileIds.push(fileInfo.fileId ? fileInfo.fileId : fileInfo.file_id)
      this.fileDataArray.forEach((item) => {
        workId = item.work_id
        bizCatalog = item.biz_catalog
      })
      fileInfo.fileId = fileInfo.file_id
      fileInfo.fileName = fileInfo.file_name
      fileInfo.fileType = fileInfo.file_type
      fileInfo.fileSize = fileInfo.file_size
      // 查找当前附件是否存在名称配置
      let config = this.fileData.find((item) => item.define_type === fileInfo.defineType)
      let fileName = fileInfo.file_name
      let lIndex1 = fileName.lastIndexOf('.')
      let preZui = fileName.substr(0, lIndex1).toLowerCase()
      let lastZui = fileName.substr(lIndex1 + 1).toLowerCase()
      if (config && config.file_name_rule) {
        let currentDate = formatDate(new Date().getTime(), 'yyMMdd')
        // let fileNamePrefix = fileName.split('.')[0]
        // let fileNameSuffix = fileName.split('.')[1]
        let fileNamePrefix = preZui
        let fileNameSuffix = lastZui
        if (config.file_name_rule.split('.')[1] && fileNameSuffix !== config.file_name_rule.split('.')[1]) {
          this.$hMessage.warning('请上传' + fileNameSuffix + '格式文件！')
          return
        }
        if (config.file_name_rule.split('.')[1]) {
          fileName = config.file_name_rule.replace('{fileName}', fileNamePrefix).replace('{currentDate}', currentDate)
        } else {
          fileName =
            config.file_name_rule.replace('{fileName}', fileNamePrefix).replace('{currentDate}', currentDate) +
            '.' +
            fileNameSuffix
        }
      }
      if (this.nodeId2FileCom == 'A02615005_M') {
        var lIndex = fileName.lastIndexOf('.')
        // if (fileName.split('.')[1].toLowerCase() !== 'pdf' && fileName.split('.')[1].toLowerCase() !== 'doc' && fileName.split('.')[1].toLowerCase() !== 'docx') {
        if (
          fileName.substr(lIndex + 1).toLowerCase() !== 'pdf' &&
          fileName.substr(lIndex + 1).toLowerCase() !== 'doc' &&
          fileName.substr(lIndex + 1).toLowerCase() !== 'docx'
        ) {
          this.$hMessage.warning('定稿版pdf合同请上传pdf或者word格式文件！')
          return
        }
      }
      this.relevanceFlie(fileIds, this.define_type_up, bizCatalog, fileName).then((res) => {
        this.$emit('uploadFileSuccessCallBack', {
          fileInfo: fileInfo,
          file: file,
        })
        this.getUploadInfo(fileid, this.define_type_up)
      })
    },
    // 下载方法
    downLoad(e, a) {
      fileDownload(e, a)
    },
    // 绑定附件类型
    relevanceFlie(fileIds, defineType, bizCatalog, fileName) {
      let params = {
        param: {
          file_ids: fileIds,
          define_type: defineType,
          biz_catalog: bizCatalog,
          file_name: fileName,
        },
      }
      return invokeApi(this.gsv, 'relevanceFlie', params)
    },
    // 删除其他附件
    deleteOtherFile(e) {
      this.otherFileIds = _.remove(this.otherFileIds, function (n) {
        return n === e
      })
      this.getOtherUploadInfo()
      // fileDelete(e).then(res => {
      //   if (res.err_no === 0) {
      //   }
      // })
    },
    validate() {
      let valid = true
      for (let i = 0; i < this.fileDataArray.length; i++) {
        if (
          this.fileDataArray[i].is_required === '1' &&
          (!this.fileDataArray[i].file_name || this.fileDataArray[i].file_name.length === 0)
        ) {
          valid = false
          this.$hMessage.error('请上传' + this.fileDataArray[i].define_name + '附件！')
          break
        }
      }
      return valid
    },
    // 删除当前行附件
    deleteFile(e, isAllDelete = false, defineType) {
      if (!e) return
      if (isAllDelete) {
        this.deteFilebyType(defineType)
        this.$emit('uploadDataDeleteCallBack')
        return
      }
      // 如果开启历史附件功能  则调用记录历史附件
      this.delArr.push(e)
      this.fileDataArray.forEach((item) => {
        if (item.file_id === e) {
          if (this.openHistory && this.workflowConfig.isStartWorkflow !== '1') {
            // 记录历史附件
            this.addWorkFlowFileHistory(item, e)
          }
          item.file_name = ''
          item.file_id = ''
        }
      })
      this.getUploadInfo()
      // fileDelete(e)
      // .then(res => {
      //   if (res.errNo == 0) {
      //     this.getUploadInfo()
      //   }
      // })
    },
    showHistory(item) {
      let params = {
        param: {
          file_ids: item.history_file.join(','),
        },
      }
      queryWorkFlowFileHistory(params).then((res) => {
        if (res[window.LOCAL_CONFIG.RESPONSE_DATA.code] !== '0') {
          this.$hMessage.error('查询历史附件记录失败')
        } else {
          this.isShowHistory = true
          this.historyFileArray = res.result || []
        }
      })
    },
    addWorkFlowFileHistory(item, fileId) {
      // item.history_temp_file.push(fileId)
      let params = {
        param: {
          file_id: fileId,
        },
      }
      addWorkFlowFileHistory(params).then((res) => {
        if (res[window.LOCAL_CONFIG.RESPONSE_DATA.code] !== '0') {
          this.$hMessage.error('历史附件记录失败')
        } else {
          item.history_no = item.history_no + 1
          item.history_file.push(fileId)
        }
      })
    },
    /*
     *@params isAllDelete : 是否删掉整条记录，还是清掉上传信息 默认是true
     */
    deteFilebyType(Type, isAllDelete = true) {
      let file = _.find(this.fileDataArray, (o) => {
        return o.define_type === Type
      })
      if (file) {
        let i = _.findIndex(this.fileDataArray, (o) => {
          return o.define_type === Type
        })
        // 调用删除文件
        this.deleteNotChooseFile(file.file_id)
        // 清除整条数据
        if (isAllDelete) {
          this.fileDataArray.splice(i, 1)
        } else {
          // 清除上传信息
          //  this.getFileMessage({
          //     idArr:[Type],
          //     fileId:target.file_id===""?[]:[target.file_id]
          //  })

          Vue.set(this.fileDataArray[i], 'file_name', null)
          Vue.set(this.fileDataArray[i], 'modifier_name', '')
          Vue.set(this.fileDataArray[i], 'modify_date', '')
          Vue.set(this.fileDataArray[i], 'file_id', '')
          Vue.set(this.fileDataArray[i], 'fstore_path', '')
          Vue.set(this.fileDataArray[i], 'create_date', '')
          Vue.set(this.fileDataArray[i], 'modifier', '')
        }
      }
    },
    // 初始化加载附件列表方法
    getStartUploadInfo() {
      let idArr = []
      let fileId = []
      let workId
      let bizCatalog
      this.fileDataArray.forEach((item) => {
        idArr.push(item.define_type)
        workId = item.work_id
        bizCatalog = item.biz_catalog
        item.file_id && fileId.push(item.file_id)
      })

      this.getFileMessage({
        idArr: idArr,
        fileId: this.fileIds,
        work_id: workId,
        biz_catalog: bizCatalog,
      })
    },
    // 初始化加载其他附件列表方法
    getStartOtherUploadInfo() {
      let idArr = []
      // eslint-disable-next-line no-unused-vars
      let workId
      // eslint-disable-next-line no-unused-vars
      let bizCatalog
      this.otherFileDataArray.forEach((item) => {
        idArr.push(item.define_type)
        workId = item.work_id
        bizCatalog = item.other_biz_catalog
      })

      this.getOtherFileMessage({
        fileId: this.ortherfileIds,
      })
    },
    // 删除上传未提交附件
    deleteNotChooseFile(id) {
      let params = {
        param: {
          file_id: id,
        },
      }
      if (id === '') return
      invokeApi(this.gsv, 'delteFiles', params).then((res) => {})
    },
    // 上传后回显方法
    getUploadInfo(fileid, fileType) {
      let idArr = []
      let ids = []
      ids = []
      // ids.push(fileid)

      if (fileid && fileType) {
        idArr.push(fileType)
        ids.push(fileid)
      } else {
        this.fileDataArray.forEach((item) => {
          idArr.push(item.define_type)
        })
        ids = this.fileIds
      }

      this.getFileMessage({
        idArr: idArr,
        fileId: ids,
      })
    },
    // 重置
    reset() {
      this.fileDataArray = _.cloneDeep(this.fileData)
      this.otherFileDataArray = _.cloneDeep(this.otherFileData)
    },
  },
  // 初始化加载附件列表和其他附件列表
  mounted() {
    this.fileDataArray = _.cloneDeep(this.fileData)
    this.otherFileDataArray = _.cloneDeep(this.otherFileData)
    this.operator_code = Cookies.get('operator_code')
  },
  // 关闭后删除上传未提交附件
  beforeDestroy() {
    let deleteFile = []
    let uploadedFileId = []
    let uploadedOtherFileId = []
    this.fileData.forEach((o) => {
      if (o.file_id) {
        uploadedFileId.push(o.file_id)
      }
    })
    this.otherFileData.forEach((o) => {
      if (o.file_id) {
        uploadedOtherFileId.push(o.file_id)
      }
    })
    this.fileDataArray.map((item) => {
      if (!item.biz_subkeyid && item.file_id) {
        if (uploadedFileId.indexOf(item.file_id) === -1) {
          deleteFile.push(item.file_id)
        }
      }
    })
    this.otherFileDataArray.map((item) => {
      if (!item.biz_subkeyid && item.file_id) {
        if (uploadedOtherFileId.indexOf(item.file_id) === -1) {
          deleteFile.push(item.file_id)
        }
      }
    })
    if (this.deleteFlag) {
      this.deleteNotChooseFile(deleteFile.join(','))
    }
  },
  watch: {
    parentListData: {
      handler(val, oldVal) {
        _.each(val, (item) => {
          let matchItemIndex = _.findIndex(this.fileDataArray, (o) => {
            return o.define_type === item.define_type
          })
          if (matchItemIndex === -1) {
            this.fileDataArray.push(item)
          } else {
            this.$set(this.fileDataArray, matchItemIndex, item)
          }
        })
      },
      deep: true, // true 深度监听
    },
    fileData: {
      handler(val, oldVal) {
        if (val.length !== 0) {
          this.fileDataArray = val
        } else {
          this.fileDataArray = []
        }
      },
      deep: true,
    },
    otherFileData: {
      handler(val, oldVal) {
        if (val.length !== 0) {
          this.otherFileDataArray = val
        } else {
          this.otherFileDataArray = []
        }
      },
      deep: true,
    },
  },
}
</script>
<style lang="scss" scoped>
.upload-list-head {
  width: 100%;
  height: 33px;
  line-height: 32px;
  background: #d8e8fe;
  font-weight: bold;
  border: 1px solid #b3cced;
  margin-top: 5px;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;

  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.upload-list-body {
  width: 100%;
  max-height: 62px;
  line-height: 32px;
  border-left: 1px solid #b3cced;
  border-right: 1px solid #b3cced;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  &:nth-child(even) {
    background: #fff;
  }

  &:nth-child(odd) {
    background: #eef3f9;
  }

  &:last-child {
    border-bottom: 1px solid #b3cced;
  }

  .list-body-item {
    line-height: 32px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .third_col {
    max-width: 450px;
  }
  .h-upload {
    display: inline-block;
    padding-top: 2px;
  }
  /deep/ .h-upload-list {
    margin-top: 0;
  }
}

.temp-box {
  min-width: 150px;
  .hover-btn {
    display: none;
    width: 30px !important;
    padding: 0 !important;
    margin: -10px 0 0 -5px;
  }

  &:hover .hover-btn {
    display: inline-block;
  }
}

.upload-list-style {
  button {
    margin-top: -5px;
  }
}

.list-head-item {
  white-space: nowrap;
  text-overflow: ellipsis;
  // overflow: hidden;
}
.printBtn {
  border: 1px solid red;
  color: red !important;
}
</style>
