const db = wx.cloud.database()
const app=getApp()
Page({
  data: {
    list: []
  },
  onLoad(e) {
    // console.log(app)
    // return;
    var openid=app.globalData.openid
    db.collection("star").where({_openid:openid}).get().then(res => {
      this.setData({
        list: res.data
      })
    })

  },
  del(e) {
    var index = e.currentTarget.dataset.index
    var id = e.currentTarget.id
    wx.showModal({
      title: '提示',
      content: '是否删除本条数据？',
      success: res => {
        if (res.confirm) {
          //删除数据库中的记录
          db.collection('star').doc(id).remove({
            success: (res) => {
              wx.showToast({
                title: '已删除',
                icon: 'success',
                duration: 2000,
                success: (res) => {
                  wx.cloud.deleteFile({
                    fileList: [this.data.list[index].fileID],
                    success: res => {
                      //在页面中删除当前记录
                      this.data.list.splice(index, 1)
                      this.setData({
                        list: this.data.list
                      })
                    },
                    fail: console.error
                  })
                }
              })
            }
          })

        } else if (res.cancel) {
          wx.showToast({
            title: '已删除',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })

  }
})