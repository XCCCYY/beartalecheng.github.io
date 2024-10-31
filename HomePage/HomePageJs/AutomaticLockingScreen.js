// 自动锁屏
// 设置自动锁屏的时间
$(document).ready(function () {
    let inactivityTimeout;
    $('.AutomaticLockingScreen').hide();
    const lockTime = 300000; // 5分钟
    let ifShow = false;
    function showLockScreen() {
        ifShow = true;
        $('.AutomaticLockingScreen').show();
        $('.box').hide();
        $(document).on('keydown.unlockScreen', function (e) {
            // 这里设置解锁的按键为 "Enter"，可以根据需要修改
            if (ifShow && e.key === 'Enter') {
                console.log(e.key);
                $('.AutomaticLockingScreen').hide();
                $('.box').show();
                resetInactivityTimeout();
                ifShow = false;

            }
        });
        $('.AutomaticLockingScreen').on('click', function () {
            alert('请按回车键解锁');
        })
    }

    function resetInactivityTimeout() {
        clearTimeout(inactivityTimeout);
        inactivityTimeout = setTimeout(showLockScreen, lockTime);
    }
    // 重置任何用户活动的非活动超时
    $(document).on('mousemove keydown scroll', resetInactivityTimeout);

    // 初始化非活动超时
    resetInactivityTimeout();
});