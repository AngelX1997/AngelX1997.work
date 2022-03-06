/**
 * 1、主要实现在华为预约H5页面拉起游戏中心对应论坛和帖子功能
 * 2、依赖jquery或zepto
 * 3、"data-forumid"属性用于记录论坛版块id，写在对应进入论坛按钮标签上
 * 4、"data-postid"属性用于记录帖子id,写在对应进入帖子按钮标签上
 */
(function () {
    var pkgName = 'com.huawei.gamebox'; //华为游戏中心包名

    // 拉起论坛版块
    $("*[data-forumid]").on("click", function (e) {
        e.stopPropagation();
        // 获取对应论坛id
        var forumId = $(this).data('forumid');
        if (window.HiSpaceObject) {
            if (isInstalled(pkgName)) {
                // 已安装华为游戏中心，拉起对应论坛
                window.location.href = 'higame://com.huawei.gamebox?activityName=activityModule|Section@@@section_detail_activity&params={"params":[{"name":"Uri","type":"String","value":"forum|forum_detail|' + forumId + '"}]}&thirdId=4026620';
            } else {
                //未安装，拉起应用市场对应论坛版块
                window.location.href = 'hiapp://com.huawei.appmarket?activityName=activityModule|Section@@@section_detail_activity&params={"params":[{"name":"Uri","type":"String","value":"forum|forum_detail|' + forumId + '"}]}&thirdId=4026620';
            }
        } else {
            window.location.href = 'hiapp://com.huawei.appmarket?activityName=activityModule|Section@@@section_detail_activity&params={"params":[{"name":"Uri","type":"String","value":"forum|forum_detail|' + forumId + '"}]}&thirdId=4026620';
        }
    })

    // 拉起帖子
    $("*[data-postid]").on("click", function (e) {
        e.stopPropagation();
        // 获取对应帖子id
        var postId = $(this).data('postid');
        if (window.HiSpaceObject) {
            if (isInstalled(pkgName)) {
                // 已安装华为游戏中心，拉起对应论坛
                window.location.href = 'higame://com.huawei.gamebox?activityName=activityModule|Posts@@@post.detail.activity&params={"params":[{"name":"Uri","type":"String","value":"forum|topic_detail|' + postId + '"}]}&thirdId=4026620';
            } else {
                //未安装，拉起应用市场对应帖子
                window.location.href = 'hiapp://com.huawei.appmarket?activityName=activityModule|Posts@@@post.detail.activity&params={"params":[{"name":"Uri","type":"String","value":"forum|topic_detail|' + postId + '"}]}&thirdId=4026620';
            }
        } else {
            window.location.href = 'hiapp://com.huawei.appmarket?activityName=activityModule|Posts@@@post.detail.activity&params={"params":[{"name":"Uri","type":"String","value":"forum|topic_detail|' + postId + '"}]}&thirdId=4026620';
        }
    })

    // 判断当前设备是否装了华为游戏中心客户端，ture--->已装，false--->未装
    function isInstalled(pkgName) {
        if (window.HiSpaceObject && window.HiSpaceObject.isInstalled) {
            return window.HiSpaceObject.isInstalled(pkgName);
        } else {
            return false;
        }
    }

})()