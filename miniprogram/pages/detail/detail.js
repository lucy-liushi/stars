let db=wx.cloud.database();
Page({
  data:{
    detail:{},
    time:''
  },
  onLoad(e){
    //接收参数id
    let id=e.id;
    //根据id查询详情
    db.collection("star").doc(id).get()
    .then(res=>{
      console.log(res)
      this.setData({
        detail:res.data,
      })
    })
    .catch(err=>{
      console.log(err)
    })

    var now = new Date()
    var month = now.getMonth() + 1
    var date = now.getDate()
    var h = now.getHours();
    var m = now.getMinutes();
    this.setData({
      time: month + '月' + date + '日' + ' ' + h + ':' + m
    })

  },
  onShareAppMessage(){
    let title="小草上墙-"+this.data.detail.realname;
    let imageUrl=this.data.detail.fileID
      return {
      title:title,
      imageUrl
    }
  }
})