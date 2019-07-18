// !function(e,t,n,r){
//     function s(){try{var e;if((e="string"==typeof this.response?JSON.parse(this.response):this.response).url){var n=t.getElementsByTagName("script")[0],r=t.createElement("script");r.async=!0,r.src=e.url,n.parentNode.insertBefore(r,n)}}catch(e){}}var o,p,a,i=[],c=[];e[n]={init:function(){o=arguments;var e={then:function(t){return c.push({type:"t",next:t}),e},catch:function(t){return c.push({type:"c",next:t}),e}};return e},on:function(){i.push(arguments)},render:function(){p=arguments},destroy:function(){a=arguments}},e.__onWebMessengerHostReady__=function(t){if(delete e.__onWebMessengerHostReady__,e[n]=t,o)for(var r=t.init.apply(t,o),s=0;s<c.length;s++){var u=c[s];r="t"===u.type?r.then(u.next):r.catch(u.next)}p&&t.render.apply(t,p),a&&t.destroy.apply(t,a);for(s=0;s<i.length;s++)t.on.apply(t,i[s])};var u=new XMLHttpRequest;u.addEventListener("load",s),u.open("GET",r+"/loader.json",!0),u.responseType="json",u.send()
// }(window,document,"Bots", "bots-client-sdk-js");

!function (e, t, n, r) {
    function s() { try { var e; if ((e = "string" == typeof this.response ? JSON.parse(this.response) : this.response).url) { var n = t.getElementsByTagName("script")[0], r = t.createElement("script"); r.async = !0, r.src = e.url, n.parentNode.insertBefore(r, n) } } catch (e) { } } var o, p, a, i = [], c = []; e[n] = { init: function () { o = arguments; var e = { then: function (t) { return c.push({ type: "t", next: t }), e }, catch: function (t) { return c.push({ type: "c", next: t }), e } }; return e }, on: function () { i.push(arguments) }, render: function () { p = arguments }, destroy: function () { a = arguments } }, e.__onWebMessengerHostReady__ = function (t) { if (delete e.__onWebMessengerHostReady__, e[n] = t, o) for (var r = t.init.apply(t, o), s = 0; s < c.length; s++) { var u = c[s]; r = "t" === u.type ? r.then(u.next) : r.catch(u.next) } p && t.render.apply(t, p), a && t.destroy.apply(t, a); for (s = 0; s < i.length; s++)t.on.apply(t, i[s]) }; var u = new XMLHttpRequest; u.addEventListener("load", s), u.open("GET", r + "/loader.json", !0), u.responseType = "json", u.send()
}(window, document, "Bots", "bot-client-sdk-js");


function loadBot(appId){
    return Bots.init({
        appId: appId,
        businessIconUrl:   './images/oracle-o-logo.png',
        businessName:      'Training Bot',
        businessIconUrl:   './css/images/oracle-o-logo.png',
        buttonWidth:       '80px',
        buttonHeight:      '80px',
        customColors:      {
                            brandColor:       '0e874c', 
                            conversationColor:'519FF7', 
                            actionColor:      '0057B8'
                           },
        customText:        {
                            headerText:       '챗봇 교육 실습을 위한 봇입니다',
                            inputPlaceholder: '메시지를 입력하세요 ...',
                            introductionText: '실습용 봇 입니다.'        
                            // locale:                           'en-US',
                            // soundNotificationEnabled:          true,
                            // imageUploadEnabled:                true,
                            // displayStyle:                      'button',
                            // actionPostbackError:               'An error occurred while processing your action. Please try again.',
                            // clickToRetry:                      'Message not delivered. Click to retry.',
                            // conversationTimestampHeaderFormat: 'MMMM D YYYY, h:mm A',
                            // fetchHistory:                      'Load more',
                            // fetchingHistory:                   'Retrieving history...',
                            // invalidFileError:                  'Only images are supported. Choose a file with a supported extension (jpg, jpeg, png, gif, or bmp).',
                            // locationNotSupported:              'Your browser does not support location services or it’s been disabled. Please type your location instead.',
                            // locationSecurityRestriction:       'This website cannot access your location. Please type your location instead.',
                            // locationSendingFailed:             'Could not send location',
                            // locationServicesDenied:            'This website cannot access your location. Allow access in your settings or type your location instead.',
                            // messageError:                      'An error occurred while sending your message. Please try again.',
                            // messageIndicatorTitlePlural:       '({count}) New messages',
                            // messageIndicatorTitleSingular:     '({count}) New message',
                            // messageRelativeTimeDay:            '{value}d ago',
                            // messageRelativeTimeHour:           '{value}h ago',
                            // messageRelativeTimeJustNow:        'just now',
                            // messageRelativeTimeMinute:         '{value}m ago',
                            // messageTimestampFormat:            'hh:mm A',
                            // messageSending:                    'Sending...',
                            // messageDelivered:                  'Delivered',
                            // sendButtonText:                    'Send',
                            // settingsHeaderText:                'Settings',
                            // tapToRetry:                        'Message not delivered. Tap to retry.',
                            // unsupportedMessageType:            'Unsupported message type.',
                            // unsupportedActionType:             'Unsupported action type.'
                           }
    }).then(function (res){
        Bots.updateUser(
            {
                "givenName":"Meenam", 
                "surname":  "Lee", 
                "email":    "mee-nam.lee@oracle.com",
                "userId":   "lsmith" 
            }
        ).catch(function (err) {
            console.error(err);
        });
    });

 
}

function saveAppId(appId){
 //   e.preventDefault();
//    let appId = document.getElementById("appId").value;
    console.log('Validate appId', appId);
    Bots.destroy();
    // validate app id
    loadBot(appId)
        .then(function () {
            console.log('AppId is valid');
            window.localStorage.setItem("appId", appId);
//            window.location.href = "home.html";
//            document.getElementById("loader").style.display = "none";
        })
        .catch(function (err) {
 //           document.getElementById("loader").style.display = "none";
 //           document.getElementsByClassName("error")[0].style.display = 'block';
            console.log('AppId validating error', err);
        });

}

function clearChat(appId){
//    e.preventDefault();
    //Bots.close();
    var keys = Object.keys(localStorage);
    for(var i = 0; i < keys.length; i++){
        if(keys[i] === 'appId'){
            continue;
        }
        localStorage.removeItem(keys[i]);
    }

    // Bots.open();
    location.reload();
}