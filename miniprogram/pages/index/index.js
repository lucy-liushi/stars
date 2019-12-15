const db=wx.cloud.database()
Page({
  data: {
    list:[]
  },
  onShow(){
    db.collection("star").orderBy('time', 'desc').where({}).get().then(res => {
   console.log(res.data)
      this.setData({
        list:res.data
      })
    })
    console.log(this.data.list)
  },
  //跳转详情页
  detail(e){
    let id=e.currentTarget.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
      success: (res)=>{
        console.log(res)
      }
    });
  },
  //页面分享
  onShareAppMessage(){
   return{
    title:"小草上墙",
    imageUrl:"/images/logo.jpg"
   }
  }
})