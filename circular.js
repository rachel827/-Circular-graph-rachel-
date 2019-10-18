/**
 * Created by rachel on 2018/8/13.
 * 成绩分析的环形图插件
 */
(function( $ ) {
    $.fn.circular = function(options) {
        var settings = $.extend({
            foregroundColor: "#556b2f",  //前景色
            backgroundColor: "#eee",  //背景色
            width: 15,   //环形的宽度
            arcWidth:15,
            diameter: 200,   //圆的的直径
            size: 18,    //字体大小
            percent: 50,  //比例
            animationStep: 1.0  //动画
        }, options );
        return this.each(function() {
            var diameter = settings.diameter;
            var text = settings.text;
            var texta = settings.texta;
            var textb = settings.textb;
            var width = settings.width;
            var arcWidth = settings.arcWidth;
            var size = settings.size;
            var percent = settings.percent;
            var fgcolor =  settings.fgcolor;
            var bgcolor =  settings.bgcolor;
            var animationstep = settings.animationStep;
            $(this).html('')
            $(this).addClass('circular');
            $(this).append(' <div class="loss_des">'+
                '<i class="line"></i>'+
                '<i class="line1"></i>'+
                '<div class="loss_score">'+text+'</div></div>');
            $(this).append('<span class="circle-text">' + '<span class="text-a">'+texta+'</span>/'+textb +'</span>');
            $(this).find('.circle-text').css({'line-height': diameter + 'px', 'font-size' : size + 'px' });
            $(this).width(diameter + 'px');
            var canvas = $('<canvas></canvas>').attr({ width: diameter, height: diameter }).appendTo($(this)).get(0);
            var context = canvas.getContext('2d');
            var x = canvas.width / 2;
            var y = canvas.height / 2;
            var radius = canvas.width / 2.3+2;
            var startAngle = 2.3 * Math.PI;
            var endAngle = 0;
            var curPerc = animationstep === 0.0 ? percent : 0.0;
            var curStep = Math.max(animationstep, 0.0);
            var circ = Math.PI * 2;
            var quart = Math.PI / 2;
            var fill = false;
            if($(this).data('fill') != undefined) {
                fill = $(this).data('fill');
            } else {
                fill = settings.fillColor;
            }
            //animate foreground circle
            function animate(current) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.beginPath();
                context.arc(x, y, radius, endAngle, startAngle, false);
                context.lineWidth = width;
                context.strokeStyle = bgcolor;
                context.stroke();
                if(fill) {
                    context.fillStyle = fill;
                    context.fill();
                }
                context.beginPath();
                if(percent<25){  //比例小于25时，开始有-Math.PI/4再减去一半的角度
                    context.arc(x, y, radius, -(quart)+Math.PI/4-percent*Math.PI/90, ((circ) * current) -(quart)+Math.PI/4-percent*Math.PI/90, false);
                }else{
                    context.arc(x, y, radius, -(quart), ((circ) * current) -(quart), false);
                }
                context.lineWidth = arcWidth;
                context.strokeStyle = fgcolor;
                context.stroke();
                if (curPerc < percent) {
                    curPerc += curStep;
                    requestAnimationFrame(function () {
                        animate(Math.min(curPerc, percent) / 100);
                    });
                }

            }
            animate(curPerc / 100);
        });

    };
}( jQuery ));