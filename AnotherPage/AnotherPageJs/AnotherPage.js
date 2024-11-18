$(document).ready(function () {
    // 鼠标效果
    var $customCursor = $('.custom-cursor');
    var $specialCursor = $('#cursor-special');
    var $specialArea = $('.special-area');
    // 隐藏默认鼠标指针
    $('body').css('cursor', 'none');
    $specialCursor.hide();
    // 跟踪鼠标位置
    $(document).on('mousemove', function (e) {
        $customCursor.css({
            left: e.pageX - 1, // 10 是指针图像的中心偏移
            top: e.pageY - 1
        });
    });
    $(document).on('mouseleave', function () {
        $customCursor.hide();
    });
    // 当鼠标重新进入网页时显示鼠标指针
    $(document).on('mouseenter', function () {
        if (!$customCursor.is(':visible')) {
            $customCursor.show();
            $specialCursor.hide();
        }
        $specialArea.on('mouseover', function () {
            $customCursor.hide(); // 隐藏普通鼠标指针
            $specialCursor.show(); // 显示特殊鼠标指针
        });

        // 当鼠标离开特定区域时
        $specialArea.on('mouseout', function () {
            $customCursor.show(); // 显示普通鼠标指针
            $specialCursor.hide(); // 隐藏特殊鼠标指针
        });
    });

    // 粒子效果
    var canvas = $('#combinedCanvas')[0];
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // 生成紫红色范围内的随机颜色
    function getRandomPurpleRedColor() {
        var hue = (Math.random() * 58) + 213;
        return 'hsla(' + hue + ', 70%, 40%, 0.4)';
    }
    // 粒子类
    function Particle() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;    // 粒子大小
        this.speedX = Math.random() * 3 - 1.5;  // 粒子x轴
        this.speedY = Math.random() * 3 - 1.5;   // 粒子y轴
        this.color = getRandomPurpleRedColor();  // 粒子颜色
    }
    Particle.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    };
    Particle.prototype.draw = function () {
        // 设置发光效果
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)'; // 白色，部分透明
        ctx.shadowBlur = 3 - 1.5;
        ctx.shadowOffsetX = 4-2;
        ctx.shadowOffsetY = 4-2;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
    };
    // 雨滴对象
    function createRainDrop() {
        return {
            x: Math.random() * canvas.width,
            y: -5,
            length: 5 + Math.random() * 10,
            velocity: 2 + Math.random() * 5,
            color: `hsl(${(Math.random() * 58) + 213}, 100%, 50%, 0.6)`, // 随机霓虹颜色
            glow: true // 新增一个属性来标记是否需要发光
        };
    }
    // 初始化粒子数组
    var particles = Array.from({ length: 400 }, () => new Particle());
    // 初始化雨滴数组
    var rainDrops = [];
    // 动画循环
    function animate() {
        requestAnimationFrame(animate);
        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // 更新和绘制粒子
        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        // 添加新的雨滴
        for (var i = 0; i < 1; i++) {
            rainDrops.push(createRainDrop());
        }
        // 更新和绘制雨滴
        for (var i = 0; i < rainDrops.length; i++) {
            var drop = rainDrops[i];
            if (drop.glow) { // 如果需要发光
                // 设置发光效果
                ctx.shadowColor = 'rgba(255, 255, 255, 0.8)'; // 白色，部分透明
                ctx.shadowBlur = 3-1.5;
                ctx.shadowOffsetX = 2 - 1;
                ctx.shadowOffsetY = 2 - 1;
            }
            ctx.beginPath();
            ctx.moveTo(drop.x, drop.y);
            ctx.lineTo(drop.x, drop.y + drop.length);
            ctx.strokeStyle = drop.color;
            ctx.lineWidth = 1;
            ctx.stroke();
            drop.y += drop.velocity;
            if (drop.y > canvas.height) {
                rainDrops.splice(i, 1);
                i--;
            }
        }
    }
    // 开始动画
    animate();
});