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
        GET_GIFT_LIST: '//act.vip.iqiyi.com/marketing/query/gift-card/list.action',
        GET_VOTE_CHANCE: '//act.vip.iqiyi.com/api/process.action?interfaceCode=9c7471947a9d3922',
        GET_USER_INFO: '//passport.iqiyi.com/apis/user/info.action?authcookie=' + $.cookie.get('P00001'),
        GET_GIFT_CARD: '//act.vip.iqiyi.com/marketing/gift-card/get.action'
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
        }
    };

    var scrollAction = true;
    $(document.body).on('touchmove', function(event) {
        if (!scrollAction) {
            event.preventDefault();
        }
    });

    var H5_APP = {

        //pageUrl: 'http://vip.iqiyi.com/idol-gift-list.html', // 我的定制卡

        //votePageUrl: 'http://vip.iqiyi.com/idol-gift-vote.html', // 投票页面

        //buyCardPageUrl: 'http://vip.iqiyi.com/ouxiangBuy.html', // 购买定制卡

        //shareCardPageUrl: 'http://vip.iqiyi.com/ouxiang.html', //分享领取页

        pageUrl: 'http://new.cms.iqiyi.com/page!preview.action?pageId=8836303', // 我的定制卡

        votePageUrl: 'http://new.cms.iqiyi.com/page!preview.action?pageId=8842712', // 投票页面

        buyCardPageUrl: 'http://new.cms.iqiyi.com/page!preview.action?pageId=8853328', // 购买定制卡

        shareCardPageUrl: 'http://new.cms.iqiyi.com/page!preview.action?pageId=8843693', //分享领取页

        shareData: {
            title: '买偶像练习生定制会员卡，一起为pick的练习生投票！',
            desc: '爱奇艺偶像练习生定制VIP卡，购卡并转赠后可获得专属投票次数，每张最多30票',
            shareType: 1,
            imgUrl: 'http://pic1.qiyipic.com/ext/common/share.jpeg',
            link: location.href || ''
        },

        velocityTpl: null,

        curCardInfo: {},

        init: function() {
            var self = this;
            setTimeout(function(){
                iqiyi.ready(function(result){
                    iqiyi.onShare(self.shareData);
                    iqiyi.hideMenu();
                });

                if (wx && h5_ua.weixin) {

                    wx.onMenuShareAppMessage(self.shareData);
                    wx.onMenuShareTimeline(self.shareData);
                    wx.onMenuShareQQ(self.shareData);

                }
            }, 1000)

            user.init();

            user.getUserInfo().then(function(data) {}, function(data) {});

            if (user.isLogin()) {

                deferredReuest.get(CONFIG_INTERFACE.GET_VOTE_CHANCE, { P00001: user.getAuthcookie() }).then(function(data) {

                    if (typeof data == 'string') {
                        data = JSON.parse(data);
                    }

                    console.log(data)

                    var code = data.code;
                    if (code == 'A00000') {
                        var count = data.data.daysurpluschance || 0;
                        $('.m-degree').find('.m-num').text(count)
                    }
                })

                self.getGiftList();

            } else {
                user.goToLogin();
                return;
            }

            this.bindEvent();
        },

        share: function(title, url) {
            var self = this;

            this.shareData.title = title;
            this.shareData.link = url;

            if (iqiyi && h5_ua.iqiyiH5_APP) {
                iqiyi.ready(function(){
                    iqiyi.share(self.shareData);
                });
            } else if (wx && h5_ua.weixin) {
                wx.onMenuShareAppMessage(this.shareData);
                wx.onMenuShareTimeline(this.shareData);
                wx.onMenuShareQQ(this.shareData);
            }
        },

        bindEvent: function() {
            var self = this;

            $('.specialGuide').on('click', function(event) {

                $('.cover').removeClass('dn')
                $('#dialog-rigths').removeClass('dn');

                $('#dialog-rigths .m-suretext').one('click', function(event) {
                    $('.cover').addClass('dn')
                    $('#dialog-rigths').addClass('dn');
                });
            });

            $('.c-piao').on('click', function(event) {
                window.location.href = self.votePageUrl;
            });

            $('.m-truecontent, .m-empty .m-gocard').on('click', function(event) {
                if (!$(this).hasClass('refreshbtn')) {
                    window.location.href = self.buyCardPageUrl;
                }
            });

            $('.m-cardlist').on('click', '.m-receive-gift', function(event) {
                event.preventDefault();
                var $that = $(this);
                var giftNo = $(this).data('giftcardno');

                self.showConfirmGet($that, giftNo);
            });

            $('.m-cardlist').on('click', '.m-fri', function(event) {

                var giftNo = $(this).data('giftcardno');
                var remain = $(this).data('remain');
                var cardTitle = $(this).data('cardtitle');

                self.showShareConfirm(giftNo, remain, cardTitle);

            });

        },

        getGiftList: function() {
            var self = this;

            if (!self.velocity) {
                self.velocity = new $.plugins.Velocity($('#cardList').html());
            }

            deferredReuest.get(CONFIG_INTERFACE.GET_GIFT_LIST, { P00001: user.getAuthcookie(), actCode: 'b0b82d8c897acd79' }).then(function(data) {

                /*data = {

                    "code": "A00000",

                    "msg": "成功",

                    "data": {

                        "list":

                            [

                                {

                                    "giftCardNo": "201802108080893989", //礼品卡标识

                                    "amount": 30, //单张卡包含的VIP天数，单位：天，月卡：30，季卡：90，年卡：365

                                    "coverTitle": "xxx定制礼品卡", //卡面标题

                                    "coverImage": "http://www.qiyipic.com/common/fix/newyearcard-images/card-newyear.png", //卡面图片

                                    "coverPrice": 1600, //卡面金额，单位：分

                                    "total": 5, //总数

                                    "receive": 1, //已领取数量

                                    "date": "2018-03-16 18:03:02" //购买时间

                                },
                                {

                                    "giftCardNo": "201802108080893989", //礼品卡标识

                                    "amount": 30, //单张卡包含的VIP天数，单位：天，月卡：30，季卡：90，年卡：365

                                    "coverTitle": "xxx定制礼品卡", //卡面标题

                                    "coverImage": "http://www.qiyipic.com/common/fix/newyearcard-images/card-newyear.png", //卡面图片

                                    "coverPrice": 1600, //卡面金额，单位：分

                                    "total": 5, //总数

                                    "receive": 1, //已领取数量

                                    "date": "2018-03-16 18:03:02" //购买时间

                                },
                                {

                                    "giftCardNo": "201802108080893989", //礼品卡标识

                                    "amount": 30, //单张卡包含的VIP天数，单位：天，月卡：30，季卡：90，年卡：365

                                    "coverTitle": "xxx定制礼品卡", //卡面标题

                                    "coverImage": "http://www.qiyipic.com/common/fix/newyearcard-images/card-newyear.png", //卡面图片

                                    "coverPrice": 1600, //卡面金额，单位：分

                                    "total": 5, //总数

                                    "receive": 1, //已领取数量

                                    "date": "2018-03-16 18:03:02" //购买时间

                                }

                            ]

                    }

                };*/

                if (typeof data == 'string') {
                    data = JSON.parse(data);
                }

                console.log(data)

                var code =  data.code;
                if (code == 'A00000') {
                    var list = data.data.list || [];

                    if (list.length) {
                        $('.m-havecard').removeClass('dn');
                        $('.m-gocustom').removeClass('dn');
                        self.render(self.format(list));
                    } else {
                        $('.m-havecard').addClass('dn');
                        $('.m-empty').removeClass('dn');
                        $('.m-gocustom').addClass('dn');
                    }
                } else if (code == 'Q00304') {
                    user.goToLogin();
                }
                else {
                    self.toast('哇哦，遇到一点问题，再试一下吧');
                    $('.m-havecard').addClass('dn');
                    $('.m-empty').removeClass('dn');
                    $('.m-gocustom').addClass('dn');
                }
            },function(){
                self.toast('哇哦，遇到一点问题，再试一下吧')
                $('.m-havecard').addClass('dn');
                $('.m-empty').removeClass('dn').find('.m-note').text('加载失败');
                $('.m-empty .m-gocard').addClass('dn');
                $('.m-empty .refreshbtn').removeClass('dn')
                $('.m-gocustom').addClass('dn');
            }).always(function(){
                $('#pop-loading').addClass('dn')
            })
        },

        format: function(data) {
            data.forEach(function(item, index) {
                item.remain = item.total - item.receive;

                item.orderPrice /= 100;
            });

            return data;
        },

        render: function(data) {
            var self = this;
            var content = self.velocity.render({ list: data });

            $('.m-cardlist').html(content)
        },

        showConfirmGet: function($self, giftNo) {
            var self = this;

            $('.cover').removeClass('dn')
            $('#dialog-get').removeClass('dn');

            $('#dialog-get .cancelbtn').one('click', function(event) {
                /* Act on the event */
                $('.cover').addClass('dn')
                $('#dialog-get').addClass('dn');
            });

            $('#dialog-get .confirmbtn').off();
            $('#dialog-get .confirmbtn').on('click', function(event) {
                /* Act on the event */
                var $that = $(this);
                if ($that.hasClass('requesting')) {
                    return;
                }

                $('#dialog-get').addClass('dn');

                $that.addClass('requesting');
                deferredReuest.get(CONFIG_INTERFACE.GET_GIFT_CARD, { P00001: user.getAuthcookie(), giftCardNo: giftNo }).then(function(data) {
                    if (typeof data == 'string') {
                        data = JSON.parse(data);
                    }

                    var code = data.code;
                    var msg = data.msg;
                    console.log(data)
                    if (code == 'A00000') {

                        var hasLeft = data.data.hasLeft;

                        $self.data('remain', hasLeft).next().data('remain', hasLeft);
                        if (!hasLeft) {

                            $self.parent().hide().next().removeClass('dn');

                        }
                        $self.parents('.m-textdetail').find('.c-gerting').text(hasLeft + '张待领取');

                        self.getResult(1);
                    }
                    else if(code == 'Q00376') {
                        self.getResult(3)
                    }
                    else if(code == 'A00002') {
                        self.getResult(2);
                    }
                    else {
                        self.getResult(0);
                    }
                }, function() {
                    self.getResult(0, '领取失败，请您稍后重试');
                }).always(function() {
                    $that.removeClass('requesting')
                });
            });

        },

        showShareConfirm: function(giftNo, remain, cardTitle){
            var self = this;
            if (!cardTitle) {
                cardTitle = '爱奇艺VIP月卡';
            }

            var prefix = '';
            if (self.shareCardPageUrl.indexOf('?') == -1) {
                prefix += '?';
            }
            else {
                prefix += '&';
            }

            var url = self.shareCardPageUrl + prefix + 'giftCardNo=' + giftNo;
            var title = '送你一张'+ cardTitle +'，一起为pick的练习生投票！';

            if (!h5_ua.iqiyiH5_APP) {
                if (h5_ua.weixin || h5_ua.qq) {
                    scrollAction = false;
                    $('#pop_weixin').removeClass('dn')
                    $('#pop_weixin .m-sclose').one('touchend', function(event) {
                        event.preventDefault();
                        $('#pop_weixin').addClass('dn')
                        scrollAction = true;
                    });
                }
                else {
                    $('.cover').removeClass('dn')
                    $('#pop_browser').removeClass('dn')
                    $('#pop_browser .m-suretext').one('click', function(event) {
                        event.preventDefault();
                        $('.cover').addClass('dn')
                        $('#pop_browser').addClass('dn')
                    });
                }
            }
            else {
                $('.cover').removeClass('dn')
                $('#dialog-share .c-violet').text(remain);
                $('#dialog-share').removeClass('dn');

                $('#dialog-share .cancelbtn').one('click', function(event) {
                    /* Act on the event */
                    $('.cover').addClass('dn')
                    $('#dialog-share').addClass('dn');
                });

                $('#dialog-share .confirmbtn').off();
                $('#dialog-share .confirmbtn').one('click', function(event) {
                    /* Act on the event */
                    $('.cover').addClass('dn')
                    $('#dialog-share').addClass('dn');
                    self.share(title, url);
                });
            }
        },

        getResult: function(flag, msg){
            var self = this;

            console.log(flag,msg)
            if (flag == 1) {
                $('.cover').removeClass('dn');
                $('#dialog-get-result').removeClass('dn');

                $('#dialog-get-result .m-suretext').one('click', function(event) {
                    $('.cover').addClass('dn');
                    $('#dialog-get-result').addClass('dn');
                });
            }else if(flag == 2){
                $('.cover').removeClass('dn');
                $('#dialog-get-result-over').removeClass('dn');

                $('#dialog-get-result-over .m-suretext').one('click', function(event) {
                    $('.cover').addClass('dn');
                    $('#dialog-get-result-over').addClass('dn');
                });
            }
            else if (flag == 3) {
                $('.cover').removeClass('dn');
                $('#dialog-get-result-late').removeClass('dn');

                $('#dialog-get-result-late .m-suretext').one('click', function(event) {
                    $('.cover').addClass('dn');
                    $('#dialog-get-result-late').addClass('dn');
                });
            }
            else {
                $('.cover').addClass('dn');
                $('#dialog-get-result').addClass('dn');
                self.toast(msg);
            }

        },
        toast: function(text, delay) {
            var delay = delay || 3 * 1000;

            var text = text || '领取失败，请您稍后重试';

            $('#dialog-toast p').text(text);
            $('#dialog-toast').removeClass('dn');

            setTimeout(function(){
                $('#dialog-toast').addClass('dn');
            }, delay)
        }
    };

    // 初始化
    H5_APP.init();

})(window);