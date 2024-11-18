// 背景图片
$('.body').ready(function () {
    // 定时器间隔（单位：毫秒）
    var interval = 3000; // 每5秒更换一次背景
    // 获取背景容器元素
    var $container = $('#background-container');
    // 用于存储定时器ID的变量
    var bgChangeTimer;
    // 设置初始背景图片
    function setInitialBackground() {
        var randomIndex = getRandomIndex();
        $container.css('background-image', 'url(' + background[randomIndex] + ')');
    }
    // 随机获取一个索引
    function getRandomIndex() {
        return Math.floor(Math.random() * background.length);
    }
    // 更换背景图片
    function changeBackground() {
        var randomIndex = getRandomIndex();
        var newSrc = 'url(' + background[randomIndex] + ')';
        // 如果新背景图片与当前背景图片相同，则重新获取
        if (newSrc === $container.css('background-image')) {
            changeBackground();
            return;
        }
        // 使用CSS过渡效果更换背景图片
        $container.css('background-image', newSrc);
    }
    // 启动背景图片更换定时器
    function startBackgroundTimer() {
        bgChangeTimer = setInterval(changeBackground, interval);
    }
    // 初始化
    setInitialBackground();
    // 启动定时器
    startBackgroundTimer();
});


// 头像
$('.avatar_a').hide();
$('.avatar').click(function(){
    $('.avatar_a').toggle();
})
$('.avatar').ready(function () {
    // 图片URL数组
    var images = [
        './avatar/preview.jpg',
        './avatar/preview1.jpg',
        './avatar/preview2.jpg',
        './avatar/preview3.jpg',
        './avatar/preview5.jpg',
        './avatar/preview6.jpg',
        './avatar/preview7.jpg',
    ];

    // 对图片数组进行排序（这里假设图片文件名中包含数字，按数字大小排序）
    images.sort((a, b) => {
        const numA = parseInt(a.match(/\d+/), 10);
        const numB = parseInt(b.match(/\d+/), 10);
        return numA - numB;
    });

    // 创建图片列表
    var $list = $('#image-list');
    $.each(images, function (index, value) {
        $('<li><img src="' + value + '" data-src="' + value + '" /></li>').appendTo($list);
    });

    // 自动切换主图
    var currentIndex = 0;
    var autoSwitchInterval;

    function startAutoSwitch() {
        if (autoSwitchInterval) clearInterval(autoSwitchInterval);
        autoSwitchInterval = setInterval(function () {
            currentIndex = (currentIndex + 1) % images.length;
            $('#main-image img').attr('src', images[currentIndex]);
        }, 5000); // 每5秒切换一次
    }

    // 鼠标悬停时放大图片并显示提示
    $('.gallery img').on('mouseenter', function (e) {
        var imageUrl = $(this).data('src');
        $('#magnifier img').attr('src', imageUrl);
        $('#tooltip').text('是否切换');
        $('#magnifier').show();
    }).on('mouseleave', function () {
        $('#magnifier').hide();
    });

    // 点击小图时切换主图
    $('.gallery img').click(function () {
        var imageUrl = $(this).data('src');
        $('#main-image img').attr('src', imageUrl);
        resetAutoSwitchTimer(); // 重置自动切换计时器
    });

    // 重置自动切换计时器
    function resetAutoSwitchTimer() {
        if (autoSwitchInterval) clearInterval(autoSwitchInterval);
        startAutoSwitch();
    }
    // 开始自动切换
    startAutoSwitch();
    // 用户交互后重置自动切换定时器
    $(document).on('mousemove click', function () {
        resetAutoSwitchTimer();
    });
})