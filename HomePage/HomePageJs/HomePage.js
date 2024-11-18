// 提示弹窗
// alert('5分钟未操作网页将自动锁屏，点击右上角图标播放音乐');
//导航栏的图片
// 点击删除附加
$('.NavigationBar').ready(function () {
    $('.background').click(function () {
        $('.picture-picture').toggleClass('active');
        $('.background').toggleClass('background-active');
    });
    // 胡桃
    juglans.forEach(url => {
        const $item = $('<div>').addClass('item');
        const $img = $('<img>').attr('src', url).attr('alt', 'Image');
        $item.append($img);
        $('.ph_juglans').append($item);
    })
    // 九尾狐
    arr.forEach(url => {
        const $item = $('<div>').addClass('item');
        const $img = $('<img>').attr('src', url).attr('alt', 'Image');
        $item.append($img);
        $('.ph_nineTailedFox').append($item);
    })
    // 动漫
    arr1.forEach(url => {
        const $item = $('<div>').addClass('item');
        const $img = $('<img>').attr('src', url).attr('alt', 'Image');
        $item.append($img);
        $('.ph_animation').append($item);
    })
    
    // 图片内部点击事件
    $('[data-target]').on('click', function () {
        // 移除所有 .ph_t 元素的 'active' 类
        $('.ph_t').removeClass('ph');
        // 为当前点击的元素添加 'active' 类
        $(this).addClass('ph');
        // 获取目标内容块的选择器
        var target = $(this).data('target');
        // 获取当前显示的内容块（如果有）
        var $currentContent = $('.p_b.p_bbb');
        // 如果有当前显示的内容块，则隐藏它并移除 'active' 类
        if ($currentContent.length) {
            $currentContent.hide().removeClass('p_bbb');
        }
        // 显示新选择的内容块并添加 'active' 类
        $(target).show().addClass('p_bbb');
    });

    //个人中心
    $('.IndividualCenter').ready(function () {
        // 点开个人中心显示的密码
        $('.IndividualCenter').click(function () {
            $('.cipher').css('display', 'flex');
        })
        $('#X').click(function () {
            $('.cipher').css('display', 'none');
        })
        // 定义正确的密码
        const correctPassword = "XCC1314521CYY";
        // 监听表单提交事件
        $('#passwordInputForm').on('submit', function (event) {
            event.preventDefault(); // 阻止表单默认提交行为
            // 获取用户输入的密码
            const enteredPassword = $('#password').val();
            // 检查密码是否正确
            if (enteredPassword === correctPassword) {
                // 密码正确，重定向到目标网页
                $('.cipher').css('display', 'none');
                window.location.href = "IndividualCenter/index.html";
            } else {
                // 密码错误，显示错误信息
                $('#errorMessage').show();
            }
        });
    });

    // 轮播图
    window.addEventListener('load', function () {
        var box1 = document.querySelector('.c_center'),
            right = box1.querySelector('.right'),
            left = box1.querySelector('.left'),
            ul = box1.querySelector('ul'),
            ul_lis = ul.querySelectorAll('li'),
            ol = box1.querySelector('ol'),
            num = 0,
            circle = 0,
            flag = true;
        // 1.鼠标经过轮播图模块, 左右按钮显示, 离开隐藏左右按钮。
        box1.addEventListener('mouseenter', function () {
            right.style.display = 'block';
            left.style.display = 'block';
            clearInterval(timer);
            timer = null;
        });
        box1.addEventListener('mouseleave', function () {
            right.style.display = 'none';
            left.style.display = 'none';
            timer = setInterval(function () {
                right.click();
            }, 2000);
        });
        var timer = setInterval(function () {
            right.click();
        }, 2000);
        //2.动态生成小圆圈 
        for (var i = 0; i < ul_lis.length; i++) {
            var li = document.createElement('li');
            li.className = 'current';
            li.setAttribute('index', i);
            ol.appendChild(li);
        }
        ol.children[0].className = 'current white';
        //TRUE 深拷贝 复制内容且复制标签
        var first = ul.children[0].cloneNode(true);
        ul.appendChild(first);
        // 2.点击右侧按钮一 次, 图片往左播放一张, 以此类推, 左侧按钮同理。
        right.addEventListener('click', function () {
            if (flag) {
                flag = false;
                if (num == ul.children.length - 1) {
                    num = 0;
                }
                num++;
                if (num == 4) {
                    num = 0;
                }
                for (var i = 0; i < ol.children.length; i++) {
                    ul_lis[i].style.opacity = '0';
                }
                ul_lis[num].style.opacity = '1';
                flag = true;
                //变量控制小圆圈的变化
                circle++;
                if (circle == ol.children.length) {
                    circle = 0;
                }
                circlechange();
            }
        });
        function circlechange() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = 'current';
            }
            ol.children[circle].className = 'current white';
        };
        left.addEventListener('click', function () {
            if (flag) {
                flag = false;
                //实现无缝滚动
                if (num == 0) {
                    num = ul.children.length - 1;
                }
                num--;
                if (num == -1) { num = 4; }
                for (var i = 0; i < ol.children.length; i++) {
                    ul_lis[i].style.opacity = '0';
                }
                ul_lis[num].style.opacity = '1';
                flag = true;//一次只执行完毕才可以点击下一次
                //变量控制小圆圈的变化
                circle--;
                if (circle < 0) {
                    circle = ol.children.length - 1;
                }
                circlechange();
            }
        });
    });
});