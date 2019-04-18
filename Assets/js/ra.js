(function(){
    Array.prototype.in_array = function(e)
    {
    for(i=0;i<this.length;i++)
    {
        if(this[i] == e)
        return true;
    }
    return false;
    }
    var pre = 'rtm_';
    var dl = ['us', 'ca', 'ad', 'ke', 'cr'];
    var r = ra_parseurl(window.location.search);
    var c = [];
    for (var k in r)
    {
        var kk = k.replace(pre, '');
        if (dl.in_array(kk))
        {
            c.push(kk + '=' + r[k]);
        }
    }
    if (c.length)
    {
        //如果从sem过来，则根据当前的utm_source设置rtm_source
        if(r['utm_source'] != undefined)
        {
            c.push('csr=' + r['utm_source']);
        }
        var cn = '__rtm'
        ra_sc(cn, c.join('|'));
    }
})();
function ra_parseurl(url)
{
    var para={};
    pos = url.indexOf('?');
    if(pos > -1 ){
        base=url.substring(0,pos);
        querystr=url.substring(pos+1);
        if(querystr){
            querys=querystr.split("&");
            queryslen=querys.length;
            for(i=0;i<queryslen;i++){
                query=querys[i].split("=");
                if(query[1]){
                    para[query[0]]=query[1];
                }
            }
        }
    }
    return para;
}
function ra_sc(name, value)
{
    var argv = ra_sc.arguments;
    var argc = ra_sc.arguments.length;
    var exp = 1;
    var path = '/';
    var domain = '.rong360.com';
    var secure = false;
    var expires = new Date();
    ra_dc(name);
    expires.setTime(expires.getTime() + (exp*24*60*60*1000));
    document.cookie = name + "=" + value +
        "; expires=" + expires.toGMTString() +
        ((domain === null) ? "" : ("; domain=" + domain)) +
        ((path === null) ? "" : ("; path=" + path)) +
        ((secure === true) ? "; secure" : "");
}
function ra_dc(name) {
    var exp = new Date();
    var cval = ra_gc(name);
    exp.setTime(exp.getTime() - 1);
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}
function ra_gc(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    var j = 0;
    while(i < clen) {
        j = i + alen;
        if(document.cookie.substring(i, j) == arg){
            return ra_gcv(j);
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if(i === 0){
            break;
        }
    }
    return '';
}
function ra_gcv(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if(endstr == -1) {
        endstr = document.cookie.length;
    }
    return document.cookie.substring(offset, endstr);
}
