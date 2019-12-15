const db = wx.cloud.database()
const app=getApp()
Page({
  data: {
    list: [],
    localImage: "/images/add1.png",
    region:['陕西','西安','新城'],
    intro:""
  },
  onLoad(){
  },
  //选中地区
  region(e) {
    this.setData({
      region: e.detail.value
    })
  },
  //提交表单
  submit(e) {
    wx.showLoading({
      title: "正在添加",
      mask: true
    })
    let data=e.detail.value;
    let realname=data.realname;
    let region=data.region;
    let sex=data.sex;
    let intro=this.data.intro;

    //表单验证
    if(realname==""){
      wx.showToast({
        title:"请填写姓名",
        icon:"none"
      })
      return;
    }

    if(sex==""){
      wx.showToast({
        title:"请选择性别",
        icon:"none"
      })
      return;
    }

    if(region.length==0){
      wx.showToast({
        title:"请选择地址",
        icon:"none"
      })
      return;
    }

    if(this.data.localImage=="/images/add.png"){
      wx.showToast({
        title:"请选择照片",
        icon:"none"
      })
      return;
    }
    if(intro==""){
      wx.showToast({
        title:"请填写介绍",
        icon:"none"
      })
      return;
    }


    let suffix = /\.\w+$/.exec(this.data.localImage)[0]
  
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime() + suffix,
      filePath: this.data.localImage
    }).then(res => {
      db.collection("star").add({
        data: {
          realname,
          region,
          sex,
          intro,
          fileID:res.fileID,
          time:new Date().getTime(),
          nickName:app.globalData.userInfo.nickName,
          avatarUrl:app.globalData.userInfo.avatarUrl
        }
      }).then(res => {
        wx.hideLoading()
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 1000
        })
        wx.switchTab({
          url: '/pages/index/index'
        })
      })
      .catch(err=>{
        console.log(err)
      })
    })
   
  },
  //添加图片
  addPic() {
    wx.chooseImage({
      count: 1,
      success: (res => {
        console.log(res)
        this.setData({
          localImage: res.tempFilePaths[0]
        })
      })
    })
  },
  //写入简介时触发
  myEditorInput(e){
    this.data.intro=e.detail.html;
  }
})