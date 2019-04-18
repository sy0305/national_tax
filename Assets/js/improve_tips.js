;
var improve_tips = {};

// debug data.
/**
improve_tips.config = {
    show: [1, 5, 9, 11],
    tpl_data: {
        '9' : {
            'ads_pos': 'absOOP__',
            'ads_spread': '#'
        },
        '11': {
            'mail_unread' : 101
        }
    }
};
*/

improve_tips.tpl_map = {
    '6'  : 1, '7'  : 3,
    '8'  : 2, '9'  : 2,
    '10' : 2, '11' : 1,
    '12' : 1, '15' : 1,
    '16' : 2, '99' : 2
};

improve_tips.tips = {
    '1'  : '您的店铺中还没有产品，无法在融360网站展示。您可以点此<a href="/product/add">录入个人产品</a>，录入后，就可以免费获得贷款客户啦',
    '2'  : '快去<a href="/authenticate/applyauth.html">认证</a>吧，认证通过后您就可以参与平台推广，获得更多申请贷款客户',
    '3'  : '您的个人店铺已经在网站展示，<a href="/banker/homepage.html">补全店铺信息</a>您就可以受到更多客户的青睐',
    '4'  : '完成新手任务，了解平台操作的同时，还能获得大量代金券！！',
    '9'  : '您可以使用的推广位：%ads_pos%，<a href="%ads_spread%">立即推广</a>，您就可以拿到更多申请贷款的客户'
};

improve_tips.show_tips = function(){
    var html = [];
    var box  = $('#improve_tips_box');

    if ('undefined' == typeof(this.config) 
        || 'undefined' == typeof(this.config.show))
    {
        return -1;
    }

    var len = this.config.show.length;
    var show= this.config.show;
    var tips= this.tips;
    var tpl_data = this.config.tpl_data; 
    for (var i = 0; i < len; i++)
    {
        var tips_id = show[i];
        var str = '';
        if ('undefined' == typeof(this.tpl_map[tips_id]))
        {
            str = '<li>' + tips[tips_id] + '</li>';
            html.push(str);
            continue;
        }

        var count = 0;
        var find = '';
        var replace = '';
        str = tips[tips_id];
        if(str=='' || 'undefined' == typeof(str)){
            continue;
        }
        for (var f in tpl_data[tips_id])
        {
            count++; 
            find = '%' + f +'%';
            replace = tpl_data[tips_id][f];
            str = str.replace(find, replace);
        }
        if (count != this.tpl_map[tips_id])
        {
            continue; 
        }

        str = '<li>' + str + '</li>';
        html.push(str);
    }

    var code = html.join('');
    if (code.length > 0)
    { 
        var prefix = '<div class="search-form jianyi">' + 
            '<div><div class="tip">优化建议</div>' + 
            '<div class="arrow">&nbsp;</div></div><div class="content"><ul>';
        var suffix = '</ul></div></div> ';
        box.html(prefix + code + suffix).show();
        box.css('margin-top', '10px');
    }
};
/**
$(document).ready(function(){
    improve_tips.show_tips();
});
*/
