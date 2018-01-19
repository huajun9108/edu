// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      { url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg' },
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg' },
      { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg' },
      { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg' }     
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular:true,
    current: 0,
    controls:true,
    previous:"30px",
    next:"30px",
    imageWidth: 0,
    imageHeight: 0,
    phoneWidth: 0,  //屏幕宽 根据屏幕的宽度,三分之一为li的宽度  
    phoneHeight: 0, //屏幕高  
    swiperWidth: 0,
    imgindex: 1,//中间的下标 重点  
    middlePhoneWidthMarLeft: 0, //背景的图片的margin-left=-aaa   
    middlePhoneWidth: 0, //背景  
    swiperUlWidth: 0, //移动的ul的宽度   
    swiperLiWidth: 0, //移动的li的宽度  
    swiperLeft: 0,  //移动的定位left   
    animationData: {},//运动   
    startClientX: 0,//点击开始 X 轴位置  
    endClientX: 0,//点击结束 X 轴位置  
    images: [
      { picUrl: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg', id: 0 },
      { picUrl: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg', id: 1 },
      { picUrl: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg', id: 2 },
      { picUrl: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg', id: 3 }   
    ], //图片的数据  
    styleArr: [], //所有图片的样式数组 对中间的图片放大的操作组  
    duration: 1000, //动画时间  
    animationData: {},
    scrollimgUrls: [
      { url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg' },
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg' },
      { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg' },
      { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg' },
      { url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg' },
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg' },
      { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg' },
      { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg' }
    ],
    scrollFlag:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    var _this = this;
    //===取屏幕宽度=======  
    wx.getSystemInfo({
      success: function (res) {
        // _this.data.screenHeight= res.windowHeight;  
        _this.setData({
          phoneWidth: res.windowWidth
        })
      }
    });   
    let swiperLiWidth = _this.data.swiperLiWidth;//li宽  
    let phoneWidth = _this.data.phoneWidth; //屏幕宽  
    swiperLiWidth = phoneWidth / 3;   //li的宽度赋值 三分之一的屏幕宽度  
    var arrimages = _this.data.images;//获取图片Arr的数组  
    let swiperUlWidth = _this.data.swiperUlWidth; //移动的ul 的宽度  
    swiperUlWidth = swiperLiWidth * arrimages.length  //赋值移动的ul 的宽度  
    let middlePhoneWidth = swiperLiWidth + 30; // 背景参照物  可不写  
    let middlePhoneWidthMarLeft = middlePhoneWidth
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  swipclick: function (e) {//点击图片触发事件
    var index = e.target.id
    wx.navigateTo({
      "url": "../detail/detail?id=" + index
    })
    // console.log(this.data.imageUrls[this.data.current]);
  },
  bindchange: function (e) {//轮播图发生改变
    // console.log(e)
    this.setData({
      current: e.detail.current
    })
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      scaleY: 0.5
    })

    this.animation = animation

    animation.scale(0, 0.5)

    this.setData({
      animationData: animation.export()
    })
  },
  startTou: function (e) {
    let _this = this;
    _this.data.startClientX = e.touches[0].clientX;  //触摸按下 距离屏幕左边的值  

  }, 
  scroll: function (e) {
    let _this = this;
    _this.data.endClientX = e.touches[0].clientX; //滑动值  

  },
  endTou: function (e) {
    let _this = this;  
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    var swiperLiWidthLeft = _this.data.swiperLiWidth;
    this.animation = animation;
    let startClientX = _this.data.startClientX;
    let endClientX = _this.data.endClientX;
    let phoneWidth = _this.data.phoneWidth;
    if (endClientX == 0) {   //move的值为0 时定为点击     
      if (startClientX < phoneWidth / 2 - 70) {  //点击开始的位置,与图片的一半减70px  为左边点击  
        this.animation = animation;
        animation.left(_this.data.swiperLeft).step() //移动动画  
        let imgindex = _this.data.imgindex - 1; //下标值  
        if (imgindex < 0) {
          console.log("超出了最小数组长度")
          return;
        }
        _this.setData({
          swiperLeft: _this.data.swiperLeft + swiperLiWidthLeft,  //ul向右移动值  

          imgindex: _this.data.imgindex - 1, //下标值  
          animationData: animation.export()
        })
        console.log("左边点击" + _this.data.imgindex)

      } else if (startClientX > phoneWidth / 2 + 70) {   //点击开始的位置,与图片的一半减70px  为右边点击  

        let imgindex = _this.data.imgindex + 1;
        if (imgindex > _this.data.images.length - 1) {
          console.log("超出了数组最大长度")
          return;
        }
        console.log("右边点击" + _this.data.imgindex)
        animation.left(_this.data.swiperLeft).step()  //移动动画  
        _this.setData({
          swiperLeft: _this.data.swiperLeft - swiperLiWidthLeft,//UL向左移动  
          imgindex: _this.data.imgindex + 1, //下标的值  
          animationData: animation.export()
        })
      } else {   //点击中间的大图,带参跳入图片的详情  
        let imgindexclick = _this.data.imgindex;
        let picUrl = _this.data.images[imgindexclick].picUrl;
        let clicks = _this.data.images[imgindexclick].clicks;
        let picUpTime = _this.data.images[imgindexclick].picUpTime;
        let picId = _this.data.images[imgindexclick].picId;
        wx.navigateTo({
          url: './../PictDetails/PictDetails?picUrl=' + picUrl
        })
      }
    } else {  //滑动左边 ul向左移动 右边的小图放大  滑动右边ul向右移动 右边的小图放大  
      if (endClientX - startClientX > 0) {
        let imgindex = _this.data.imgindex - 1;
        if (imgindex < 0) {
          console.log("超出了")
          return;
        }
        animation.left(_this.data.swiperLeft).step() //移动动画  
        _this.setData({
          swiperLeft: _this.data.swiperLeft + swiperLiWidthLeft, //右边滑动 ul向右移动  
          imgindex: _this.data.imgindex - 1,
          animationData: animation.export()
        })
        console.log("右边滑动" + _this.data.imgindex)

      }
      if (endClientX - startClientX < 0) {
        let imgindex = _this.data.imgindex + 1;
        if (imgindex > _this.data.images.length - 1) {
          console.log("超出了")
          return;
        }

        this.animation = animation

        animation.left(_this.data.swiperLeft).step() //移动动画  

        _this.setData({
          swiperLeft: _this.data.swiperLeft - swiperLiWidthLeft,  //左边滑动 ul向左移动  

          imgindex: _this.data.imgindex + 1, //下标的值  
          animationData: animation.export()
        })
        console.log("左边滑动" + _this.data.imgindex)
      }

    }  
    let NewstyleArr = _this.data.styleArr; 
    _this.setData({
      startClientX: 0,
      endClientX: 0,  
          //  <span style= "color:#ff0000;" > styleArr: NewstyleArr < /span>  
        })  
  
    },  
})