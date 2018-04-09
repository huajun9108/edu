/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://jfn15ogq.qcloud.la';
// var host = 'https://smartmaker.xyz';
// var host = 'https://507251804.smartmaker.club'
var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,

        //显示所有课程
        courseUrl: `${host}/weapp/course/selectAll`,

        //查询类别下所有课程
        courseListUrl: `${host}/weapp/course/selectCourseListById`,

        //查询单门课程信息
        courseDetailUrl: `${host}/weapp/course/selectCourseById`,

        //查询所有收藏信息
        myFavorListUrl: `${host}/weapp/collection/selectAllByUserId`,

        //添加收藏信息
        addMyFavorUrl: `${host}/weapp/collection/addOneByUserIdAndCourseId`,

        //删除收藏信息
        delMyFavorUrl: `${host}/weapp/collection/deleteByUserIdAndCourseId`,

        //批量删除收藏信息
        batchDelMyFavorUrl: `${host}/weapp/collection/deleteByUserIdAndCourseIds`,

        //查询全部订单
        queryAllOrdersUrl: `${host}/weapp/order/selectAllByUserId`,

        //添加订单信息
        addOrderUrl: `${host}/weapp/order/addOneByUserIdAndCourseId`,

        //删除待付款订单信息
        delUnpaidOrdersUrl: `${host}/weapp/order/deleteByUserIdAndCourseId`,

        //批量删除待付款订单信息
        batchDelUnpaidOrdersUrl: `${host}/weapp/order/deleteByUserIdAndCourseIds`,

        //VIP购买
        vipPay: `${host}/weapp/vip/vipPay`,

        //添加VIP
        addVipUrl: `${host}/weapp/vip/addOneByUserId`,

        //根据用户ID返回当前是不是VIP
        getVipStatusUrl: `${host}/weapp/vip/selectVipByUserID`,

        //课程购买
        coursePay: `${host}/weapp/course/coursePay `,

        //查询所有课程类别接口
        selectAllType: `${host}/weapp/course/selectAllType`,

        //模糊搜索
        fuzzySelectUrl: `${host}/weapp/course/FuzzySelect`,

        //首页展示接口
        homePageUrl: `${host}/weapp/course/selectHottestNewest`
    }

    
};

module.exports = config;
