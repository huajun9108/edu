  const app = getApp();

  const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000,
    mask: true,
    // image:"../../images/refresh_icon.png"
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success',
    duration: 500
})

var showFail = text => wx.showToast({
  title: text,
  icon: 'none'
});


// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();
    wx.showModal({
        title,
        content:content,
        showCancel: false,
        confirmColor:"#cfb16b"
    })
}

var searchClick=(e)=> {
  let title = e.detail.title
  let id = e.detail.id
  let url = `../courseList/courseList?title=${title}&type=A&id=${id}`
  let route = getCurrentPages()[0].route
  let length = getCurrentPages().length
  if (route === "pages/course/course" && length===1){
    wx.navigateTo({
      url: url
    })
  }else{
    wx.redirectTo({
      url: url
    })
  }
}


var confirm=(e)=>{
  if (e.detail === '') return;
  const searchKeyword = e.detail;
  const url = `../searchCourse/searchCourse?searchKeyword=${searchKeyword}`
  wx.navigateTo({
    url: url
  });
}

const getRandomArrayElements=(arr, count)=> {
  var shuffled = arr.slice(0), 
  i = arr.length, 
  min = i - count, temp, index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}

module.exports = { 
  formatTime, 
  showBusy, 
  showSuccess, 
  showFail, 
  showModel, 
  searchClick,
  confirm, 
  getRandomArrayElements
}
