~(function(win) {
    var ua = navigator.userAgent;

    var _browser = {
        qq: /qqbrowser/i.test(ua),
        uc: /ucbrowser|ucweb/i.test(ua),
        weixin: /MicroMessenger/i.test(ua),
        baidubox: /baiduboxH5_APP/i.test(ua),
        baidubrowser: /baidubrowser/i.test(ua),
        baiduvideo: /videoandroid/i.test(ua),
        miuibrowser: /miuibrowser/i.test(ua),
        miuivideo: /miuivideo/i.test(ua),
        oppo: /oppobrowser/i.test(ua),
        wk: /wkbroswer/i.test(ua),
        le: /lebrowser/i.test(ua),
        sogou: /sogoumobilebrowser/i.test(ua),
        sohuH5_APP: /SohuVideoMobile/i.test(ua),
        b360: /360browser/i.test(ua),
        hao123: /hao123/i.test(ua),
        vivo: /vivo/i.test(ua),
        qq_gt_5_2: !(/mqqbrowser\/([0-4]|5\.[01])/.test(ua)),
        android_gt_4: /Android [^0-3]/.test(ua),
        android_gt_5: /Android [^0-4]/.test(ua),
        huawei_c8812: /HW-HUAWEI_C8812/i.test(ua),
        weibo: /weibo/i.test(ua),
        qqSns: /mobile\smqqbrowser/i.test(ua),
        qqZone: /qzone/i.test(ua),
        aliH5_APP: /aliH5_APP/i.test(ua), // 支付宝内置浏览器，收银台使用，其它项目谨慎使用
        ios_egt_9: /iPhone OS (\d+)/i.exec(ua) && /iPhone OS (\d+)/i.exec(ua)[1] >= 9,
        chrome_lt_35: /Chrome\/(\d{2})/i.exec(ua) && parseInt(/Chrome\/(\d{2})/i.exec(ua)[1]) < 35,
        pc_chrome: /Chrome\//.test(ua) && !/Version\/4/.test(ua),
        chrome: /Chrome/i.test(ua),
        iqiyiH5_APP: /iqiyi/i.test(ua) //爱奇艺H5_APP
    };

    _browser.androidChrome = $.browser.chrome && /android/i.test(ua) && !_browser.qq && !_browser.uc && !_browser.weixin && !_browser.baidubrowser && !_browser.baiduvideo && !_browser.miuibrowser && !_browser.miuivideo && !_browser.oppo && !_browser.wk && !_browser.le && !_browser.sogou && !_browser.b360 && !_browser.hao123 && !_browser.vivo;
    _browser.iosSafari = $.os.ios && $.browser.safari && !_browser.qq && !_browser.baidubox && !_browser.uc && !_browser.weixin && !_browser.baidubrowser && !_browser.baiduvideo && !_browser.sogou && !_browser.b360;
    _browser.thirdPartSNS = _browser.weibo || _browser.qqSns || _browser.weixin || _browser.qqZone;
    _browser.androidIqiyiH5_APP = $.os.android && _browser.iqiyiH5_APP;
    _browser.iosIqiyiH5_APP = $.os.ios && _browser.iqiyiH5_APP;
    _browser.IqiyiVersion = function() {
        return ua.match(/IqiyiVersion\/([0-9\.]+)/)[1];
    };
    _browser.IqiyiVersionCompare = function(version) {
        var nativeVersion = _browser.IqiyiVersion();
        var nativeVersionArr = strToArray(nativeVersion);
        var versionArr = strToArray(version);
        if (nativeVersionArr.length != versionArr.length) return false;
        for (var i = 0, len = nativeVersionArr.length; i < len; i++) {
            if (parseInt(nativeVersionArr[i]) > parseInt(versionArr[i])) {
                return true;
            } else if (parseInt(nativeVersionArr[i]) == parseInt(versionArr[i]) && !versionArr[i + 1]) {
                return true;
            } else if (parseInt(nativeVersionArr[i]) < parseInt(versionArr[i])) {
                return false;
            }
        }
        return false;
    };

    //ios版本
    var reg = /iPhone OS (\d*)_(\d*)/i;
    var iosVersion = {
        ios: reg.test(ua),
        ios_7: reg.exec(ua) && reg.exec(ua)[1] == 7,
        ios_8: reg.exec(ua) && reg.exec(ua)[1] == 8,
        ios_10: reg.exec(ua) && reg.exec(ua)[1] == 10,
        ios_9_1: reg.exec(ua) && reg.exec(ua)[1] == 9 && reg.exec(ua)[2] == 1,
        ios_gt_9_1: reg.exec(ua) && reg.exec(ua)[1] == 9 && reg.exec(ua)[2] >= 1
    };

    //android版本
    var androidReg = /Android (\d+)\.(\d+)?\.?(\d+)?/i;
    var androidVersion = {};
    androidVersion.android = androidReg.test(ua);

    if (androidReg.exec(ua)) {
        androidVersion.androidVersion = ((androidReg[1] || 0) * 10000) + ((androidReg[2] || 0) * 100) + ((androidReg[3] || 0) * 1)
    }

    $.extend(_browser, iosVersion);
    $.extend(_browser, androidVersion);
    $.extend($.browser, _browser);

    _browser.is = function() {
        var names = arguments[0];
        names = $.isArray(names) ? names : Array.prototype.slice.H5_APPly(arguments);
        return names.some(function(name) {
            return _browser[name];
        });
    };

    function strToArray(str) {
        return str.split(".");
    }

    win.h5_ua = _browser;
}(window));


! function() {
    function a() {
        var a = H5.cookie.get("QC006");
        return a || (a = "u" + (new Date).getTime(), H5.cookie.set("QC006", a, {
                expires: 31536e6,
                path: "/",
                domain: "iqiyi.com"
            })),
            a
    }

    function b() {
        var a = H5.cookie.get("QC112");
        return a || (a = "weid" + (new Date).getTime(), H5.cookie.set("QC112", a, {
                path: "/",
                domain: "iqiyi.com"
            })),
            a
    }

    function c() {
        var a = H5.cookie.get("QC007");
        return a || (a = document.referrer ? document.referrer : "DIRECT"),
            a
    }

    function d() {
        return JSON.parse(H5.cookie.get("P00002") || "{}").uid || ""
    }

    function e() {
        var a = location.href.match(/msrc=([^=&#]*)/i);
        return a ? a[1] : H5.cookie.get("QC015")
    }

    function f(a, b) {
        var c = [];
        for (var d in a) c.push(encodeURIComponent(d) + "=" + encodeURIComponent(a[d]));
        var e = new Image;
        b = b || "//msg.iqiyi.com/jpb.gif",
            e.src = b + "?" + c.join("&")
    }
    window.H5 = window.$ || {},
        H5.cookie = H5.cookie || {},
        H5.cookie.get = function(a) {
            var b = null,
                c = new RegExp("(^| )" + a + "=([^;]*)(;|$)"),
                d = c.exec(document.cookie);
            return d && (b = d[2] || ""),
                "string" == typeof b ? b = decodeURIComponent(b) : ""
        },
        H5.cookie.set = function(a, b, c) {
            c = c || {},
                b = encodeURIComponent(b);
            var d = c.expires;
            "number" == typeof c.expires && (d = new Date, d.setTime(d.getTime() + c.expires)),
                document.cookie = a + "=" + b + (c.path ? "; path=" + c.path : "") + (d ? "; expires=" + d.toGMTString() : "") + (c.domain ? "; domain=" + c.domain : "") + (c.secure ? "; secure" : "")
        },
        f({
            rdm: (new Date).getTime(),
            qtcurl: location.href,
            rfr: document.referrer,
            flshuid: a(),
            lrfr: c(),
            ppuid: d(),
            platform: 31,
            weid: b(),
            msrc: e(),
            as: $.crypto.md5("31" + a() + b() + "ChEnYH0415dadrrEDFf2016")
        }),
        H5.sendPingback_block = function(b) {
            var c = {
                    t: 21,
                    pf: 2,
                    p: 20,
                    p1: 201,
                    u: a(),
                    pu: d(),
                    jsuid: a(),
                    rn: (new Date).getTime()
                },
                e = $.extend({},
                    c, b || {});
            f(e, "//msg.iqiyi.com/b")
        },
        H5.sendPingback_click = function(opt) {
            var c = {
                t: 20,
                pf: 2,
                p: 20,
                p1: 201,
                rseat: opt.rseat || '',
                u: a(),
                pu: d(),
                rn: (new Date).getTime()
            };
            f(c, "//msg.iqiyi.com/b")
        },
        $(document).on("click",
            function(b) {
                var c = $(b.target),
                    e = c.attr("rseat");
                e && f({
                        t: 20,
                        pf: 2,
                        p: 20,
                        p1: 201,
                        rseat: e,
                        u: a(),
                        pu: d(),
                        rn: (new Date).getTime()
                    },
                    "//msg.iqiyi.com/b");
                var g = c.attr("href");
                g && !/javascript\:/i.test(g) && (b.preventDefault(), setTimeout(function() {
                        location.href = g
                    },
                    500))
            })
}();


~(function(window) {

    var CONFIG_INTERFACE = {
        VOTE_ID: '0766348178010407', //0965795220010386
        VOTE_CODE: '91ae85420c254091',
        GET_VOTE: '//act.vip.iqiyi.com/api/process.action',
        GET_VOTE_LIST: '//vote.i.iqiyi.com/eagle/outer/get_votes',
        GET_USER_INFO: '//passport.iqiyi.com/apis/user/info.action?authcookie=' + $.cookie.get('P00001'),
        GET_VOTE_CHANCE: '//act.vip.iqiyi.com/api/process.action?interfaceCode=9c7471947a9d3922',
    };

    var deferredReuest = (function() {
        var timeout = 10 * 1000;

        var request = {

            get: function(url, params, timeout) {
                return $.ajax({
                    url: url,
                    data: params || {},
                    type: 'GET',
                    timeout: timeout || 0
                });
            },

            post: function(url, params, timeout) {
                return $.ajax({
                    url: url,
                    data: params || {},
                    type: 'POST',
                    timeout: timeout || 0
                });
            },

            jsonp: function(url, params, timeout) {
                return $.ajax({
                    url: url,
                    data: params || {},
                    dataType: 'jsonp',
                    timeout: timeout || 0
                });
            }
        };
        return request;
    })();

    var user = {
        init: function() {
            this.hasVipInfo = false; //记录当前类是否有VIP信息
            this.isValidVip = false; //是否为有效会员
            this.isNewUser = false; // 是否新用户
            this.uid = ''; //用户ID
            this.status = ''; //会员状态，0：无效，1：有效，2：锁定，3：过期
            this.isLoginInfo = null; //后台passport  islogin接口的数据  obj格式
            this.qy_info = null;
        },
        //用户是否登入
        isLogin: function() {
            var p00002 = $.cookie.get('P00002');
            var p00003 = $.cookie.get('P00003');
            return (this.isNotEmpty(p00002) && p00002 !== 'deleted') &&
                (this.isNotEmpty(p00003) && p00003 !== 'deleted');
        },
        isNotEmpty: function(value) {
            return value !== '' && value !== null;
        },
        //获取会员状态，0：无效，1：有效，2：锁定，3：过期
        getStatus: function(success, failure) {
            return this.checkVipInfo('status', success, failure);
        },
        //判断是否有VIP信息设置VIP用户信息
        checkVipInfo: function(key, success, failure) {
            var result = key ? this[key] : '';
            if (this.isLogin()) {
                if (this.hasVipInfo) {
                    if (success) success(result);
                } else {
                    this.getInfoFromInterface(success, key, failure);
                }
            }
            return result;
        },
        //接口获取数据
        getInfoFromInterface: function(success, key, failure) {
            var self = this;
            if (self.isLoginInfo) {
                if (success) success(key ? self[key] : '');
            } else if (self.isLogin()) {
                var params = {
                    agenttype: (h5_ua.ios) ? 116 : 115,
                    authcookie: this.getAuthcookie() || '',
                    qyid: $.cookie.get('QC006') || '',
                    ptid: !h5_ua.ios ? '02022001010000000000' : '02032001010000000000'
                };
                return deferredReuest.jsonp(CONFIG_INTERFACE.GET_USER_INFO).then(function(data) {
                    if (data.code == 'A00000') {
                        self.setVipInfo(data.data || {});
                        self.isLoginInfo = data.data.userinfo || {};
                        self.qy_info = data.data.qiyi_vip_info || {};
                        $.extend(true, self, data.data.userinfo);

                        success(key ? self[key] : '');
                    } else {
                        failure && failure()
                    }
                })
            } else {
                failure && failure()
            }
        },
        getUserInfo: function() {
            var deferred = $.Deferred();
            this.getInfoFromInterface(function(data) {
                deferred.resolve(data);
            }, 'isLoginInfo', deferred.reject);
            return deferred;
        },
        //设置VIP用户信息
        setVipInfo: function(data) {
            var pps_info = data.pps_vip_info || {};
            var qy_info = data.qiyi_vip_info || {};
            var isPpsvip = parseInt(pps_info.vip_type, 10);
            var isQyvip = parseFloat(qy_info.type, 10);
            if (isQyvip || (parseInt(qy_info.vipType, 10) && !isPpsvip)) {
                this.vipType = String(qy_info.vipType);
                this.payType = String(qy_info.payType);
                this.status = String(qy_info.status);
                this.level = String(qy_info.level);
                this.type = String(qy_info.type);
                this.hasVipInfo = true;
                this.isValidVip = (qy_info.status == '1');
                this.vipDeadline = qy_info.deadline;
            } else if (isPpsvip) {
                this.level = String(pps_info.pps_level);
                this.vipType = '1';
                this.payType = '0';
                this.status = '1';
                this.hasVipInfo = true;
                this.isValidVip = true;
            }
        },
        //获取用户ID
        getUid: function() {
            return this.uid;
        },
        //获取匿名用户id
        getAnonymousUid: function() {
            var uid = $.cookie.get('QC006');
            if (uid) return uid;
            this.isNewUser = true;
            uid = $.crypto.md5(window.navigator.userAgent + document.cookie + Math.random() + new Date().getTime() * 1);
            $.cookie.set('QC006', uid, {
                expires: 365 * 24 * 60 * 60 * 1000,
                path: '/',
                domain: 'iqiyi.com'
            });
            return uid;
        },
        checkNewUser: function() {
            var uid = $.cookie.get('QC006');
            return uid ? this.isNewUser : true;
        },
        getAuthcookie: function() {
            return $.cookie.get('P00001') || '';
        },
        goToLogin: function() {
            if (h5_ua.iqiyiapp) {
                iqiyi.ready(function(flag) {
                    if (flag) {
                        iqiyi.loadNativePage({
                            page: 'login',
                            returnUrl: location.href,
                            param: {}
                        })
                    }
                });
            } else {
                window.location.href = "//m.iqiyi.com/user.html?redirectUrl=" + encodeURIComponent(location.href)
            }
        },
        logout: function() {
            var href = encodeURIComponent(window.location.href);
            window.location.href = '//passport.iqiyi.com/user/logout.php?url=' + href + '&logoutcb=Q.__logoutcb';
        }
    };

    var H5_APP = {

        cardPageUrl: 'http://vip.iqiyi.com/idol-gift-list.html', // 我的定制卡

        pageUrl: 'http://vip.iqiyi.com/idol-gift-vote.html', // 投票页面

        buyCardPageUrl: 'http://vip.iqiyi.com/ouxiangBuy.html', // 购买定制卡

        //pageUrl: 'http://new.cms.iqiyi.com/page!preview.action?pageId=8842712', // 投票页面

        //cardPageUrl: 'http://new.cms.iqiyi.com/page!preview.action?pageId=8836303', // 定制卡页面

        //buyCardPageUrl: 'http://new.cms.iqiyi.com/page!preview.action?pageId=8853328', // 购买定制卡

        shareData: {
            title: '买偶像练习生定制会员卡，一起为pick的练习生投票！',
            desc: '爱奇艺偶像练习生定制VIP卡，购卡并转赠后可获得专属投票次数，每张最多30票',
            shareType: 1,
            imgUrl: 'http://pic1.qiyipic.com/ext/common/share.jpeg',
            link: location.href || ''
        },

        velocityTpl: null,

        voteChance: 0,

        voteAction: false,

        appInfo: {},

        init: function() {

            var self = this;

            setTimeout(function(){
                iqiyi.ready(function(result){
                    iqiyi.onShare(self.shareData);
                    iqiyi.hideMenu();
                })

                if (wx && h5_ua.weixin) {

                    wx.onMenuShareAppMessage(self.shareData);
                    wx.onMenuShareTimeline(self.shareData);
                    wx.onMenuShareQQ(self.shareData);

                }
            }, 1000)

            user.init();

            user.getUserInfo().then(function(data) {

                if (data) {
                    $('.logoutarea').removeClass('dn').find('.m-persname').text(data.nickname);
                }
                else {
                    $('.loginarea').removeClass('dn');
                }
            }, function(data) {
                $('.loginarea').removeClass('dn');
            });

            if (user.isLogin()) {

                $('logoutarea').removeClass('dn');

                if (h5_ua.iqiyiH5_APP) {
                    $('.logoutarea .m-hidein').addClass('dn')
                }

                deferredReuest.get(CONFIG_INTERFACE.GET_VOTE_CHANCE, {P00001: user.getAuthcookie()}).then(function(data){

                    if (typeof data == 'string') {
                        data = JSON.parse(data);
                    }

                    var code = data.code;
                    if (code == 'A00000') {

                        var count = parseInt(data.data.daysurpluschance);

                        $('.m-havevote .c-num').text(count);

                        self.voteChance = count;

                        self.voteAction = true;

                    } else {
                        console.log('get vote chance fail')
                    }
                },function(){
                    console.log('get vote change fail')
                }).always(function(){
                    self.voteAction = true;
                });

                if (!h5_ua.iqiyiH5_APP) {
                    dfp.getFingerPrint(function(data) {
                        self.appInfo.dfp = data;
                    });
                }
                else {

                    iqiyi.init(function(result){
                        if (parseInt(result.result) == 1) {
                            self.appInfo = result.data;
                        }
                    })

                }

            }else {
                $('.loginarea').removeClass('dn');

                self.voteAction = true;
            }

            self.getVoteList();

            this.bindEvent();
        },

        share: function(title, url){
            this.shareData.title = title;
            this.shareData.link = url;

            if (iqiyi && h5_ua.iqiyiH5_APP) {

                iqiyi.share(this.shareData);

            } else if (wx && h5_ua.weixin) {

                wx.onMenuShareAppMessage(this.shareData);
                wx.onMenuShareTimeline(this.shareData);
                wx.onMenuShareQQ(this.shareData);

            }
        },

        bindEvent: function() {
            var self = this;

            $('.m-votewra .m-rulepop').on('click', function(event) {

                $('.cover').removeClass('dn')
                $('#dialog-vote-guide').removeClass('dn');

                $('#dialog-vote-guide .m-suretext').one('click', function(event) {
                    $('.cover').addClass('dn')
                    $('#dialog-vote-guide').addClass('dn');
                });
            });

            $('.m-hidein').on('touchend', function(event) {
                event.preventDefault();
                user.logout();
            });

            $('.c-piao').on('click', function(event) {
                window.location.href = self.cardPageUrl;
            });

            $('.m-gocardba').on('click', function(event) {
                window.location.href = self.buyCardPageUrl;
            });

            $('.m-linknew').on('click', function(event) {
                event.preventDefault();
                /* Act on the event */
                location.reload();
            });

            $('.m-voteperlist').on('click', '.c-piao', function(event) {
                event.preventDefault();

                var $that = $(this);
                var oid = $(this).data('oid');
                var disable = $(this).hasClass('disable');

                if (!self.voteAction || disable) {
                    return;
                }

                if (!user.isLogin()) {
                    self.showDialogLogin()
                    return;
                }

                if (!self.voteChance) { //无机会投票了
                    console.log('vote chance over')
                    self.showDialog()
                    return;
                }

                if ($that.hasClass('requesting') || !$('#pop-voting').hasClass('dn')) {
                    return;
                }

                $('#pop-voting').removeClass('dn');

                $that.addClass('requesting');

                var params = {
                    interfaceCode: CONFIG_INTERFACE.VOTE_CODE,
                    cvid: self.voteInfo.vcId,
                    P00001: user.getAuthcookie(),
                    oid: oid,
                    dfp: self.appInfo.dfp || '',
                    version: self.appInfo.version || '',
                    device_id: self.appInfo.deviceId || ''
                };

                deferredReuest.get(CONFIG_INTERFACE.GET_VOTE, params).then(function(data){
                    if (typeof data == 'string') {
                        data = JSON.parse(data);
                    }

                    var code = 'A00000' || data.code;
                    var msg = data.msg;
                    var daysurpluschance = data.data.daysurpluschance;

                    console.log(data)

                    if (code == 'A00000') {

                        self.voteChance--;

                        $('.m-havevote .c-num').text(daysurpluschance);

                        self.toast('投票成功')
                    }
                    else if(code == 'Q00304') {
                        user.goToLogin();
                    }
                    else if(code == 'Q00382'){
                        self.showDialog()
                    }
                    else if (code == 'Q00300') {
                        self.toast('您操作太快了，请休息一会儿！')
                    }
                    else {
                        self.toast()
                    }
                }, function(){
                    self.toast()
                }).always(function(){
                    $that.removeClass('requesting')
                    $('#pop-voting').addClass('dn');
                });
            });

        },

        getVoteList: function(){
            var self = this;

            if (!self.velocity) {
                self.velocity = new $.plugins.Velocity($('#voteList').html());
            }

            deferredReuest.get(CONFIG_INTERFACE.GET_VOTE_LIST, {vids: CONFIG_INTERFACE.VOTE_ID}).then(function(data){

                if (typeof data == 'string') {
                    data = JSON.parse(data);
                }

                console.log(data)

                var code = data.code;
                if (code == 'A00000' && data.data[0]) {

                    self.voteInfo = data.data[0];
                    self.voteInfo.vcId = self.voteInfo.childs[0].vcId;

                    var list = data.data[0] && data.data[0].childs && data.data[0].childs[0].options || [];

                    var renderData = {
                        status: self.voteInfo.status,
                        list: list
                    };

                    self.render(self.format(renderData));

                }
                else {
                    self.toast('哇哦，遇到一点问题，再试一下吧');

                    $('.m-listerror').removeClass('dn')
                }
            },function(){
                self.toast('哇哦，遇到一点问题，再试一下吧')
                $('.m-listerror').removeClass('dn')
            }).always(function(){
                $('#pop-loading').addClass('dn')
            })
        },

        format: function(data) {

            data.list.forEach(function(item, index){
                var length = data.list.length;
                if (!item.picUrl) {
                    data.list.splice(index,1);

                    data.list.length --;
                    return;
                }

                item.kv = JSON.parse(item.kv);
                item.kvStatus = item.kv.status;
                item.order = item.kv.order;
                item.status = data.status;
            });

            data.list.sort(function(a, b){
                return a -b;
            });
            console.log(data, 'hahhaahhaha')
            return data.list;
        },

        render: function(data){
            var self = this;
            var content = self.velocity.render({list: data});

            $('.m-voteperlist').html(content);
        },
        toast: function(text, delay) {
            var delay = delay || 3 * 1000;
            var text = text || '投票失败了！请稍后重试';

            $('#pop-toast').removeClass('dn').find('p').text(text)
            setTimeout(function(){
                $('#pop-toast').addClass('dn');
            }, delay)
        },
        showDialog: function(){
            var self = this;

            $('.cover').removeClass('dn')
            $('#dialog-vote-over').removeClass('dn');

            $('#dialog-vote-over .cancelbtn').one('click', function(event) {
                $('.cover').addClass('dn')
                $('#dialog-vote-over').addClass('dn');
            });

            $('#dialog-vote-over .gotocard').off();
            $('#dialog-vote-over .gotocard').on('click', function(event) {
                window.location.href = self.buyCardPageUrl;
            });
        },
        showDialogLogin: function(){
            $('.cover').removeClass('dn')
            $('#dialog-vote-login').removeClass('dn');

            $('#dialog-vote-login .cancelbtn').one('click', function(event) {
                $('.cover').addClass('dn')
                $('#dialog-vote-login').addClass('dn');
            });

            $('#dialog-vote-login .confirmbtn').one('click', function(event) {
                user.goToLogin()
            });
        }
    };

    // 初始化
    H5_APP.init();

})(window);