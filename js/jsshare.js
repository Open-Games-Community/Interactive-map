;(function(factory){var registeredInModuleLoader;if(typeof define==='function'&&define.amd){define(factory);registeredInModuleLoader=true;}
if(typeof exports==='object'){module.exports=factory();registeredInModuleLoader=true;}
if(!registeredInModuleLoader){return window.JSShare=factory();}}(function(){if(!('indexOf'in Array.prototype)){Array.prototype.indexOf=function(find,i){if(i===undefined)i=0;if(i<0)i+=this.length;if(i<0)i=0;for(var n=this.length;i<n;i++)
if(i in this&&this[i]===find)
return i;return-1;};}
function _extend(out){out=out||{};for(var i=1;i<arguments.length;i++){if(!arguments[i]){continue;}
for(var key in arguments[i]){if(arguments[i].hasOwnProperty(key)){out[key]=arguments[i][key];}}}
return out;}
function _getData(el,defaultOptions){var data={};for(var key in defaultOptions){if(defaultOptions.hasOwnProperty(key)){var value=el.getAttribute('data-'+key);if(value!==null&&typeof value!='undefined'){data[key]=value;}}}
return data;}
function _popup(url,_options){return window.open(url,'','toolbar=0,status=0,scrollbars=1,width='+_options.popup_width+',height='+_options.popup_height);}
function _getURL(options){if(options.url===''){options.url=location.href;}
var url=options.url;var utm='';if(options.utm_source!==''){utm+='&utm_source='+options.utm_source;}
if(options.utm_medium!==''){utm+='&utm_medium='+options.utm_medium;}
if(options.utm_campaign!==''){utm+='&utm_campaign='+options.utm_campaign;}
if(utm!==''){url=url+'?'+utm;}
return url;}
var social={unknown:function(options){return encodeURIComponent(_getURL(options));},vk:function(options){return 'http://vk.com/share.php'
+'?url='+encodeURIComponent(_getURL(options))
+'&title='+encodeURIComponent(options.title)
+'&description='+encodeURIComponent(options.text)
+'&image='+encodeURIComponent(options.image)
+'&noparse=true';},ok:function(options){return 'https://connect.ok.ru/offer'
+'?url='+encodeURIComponent(_getURL(options))
+'&title='+encodeURIComponent(options.title)
+'&description='+encodeURIComponent(options.text)
+'&imageUrl='+encodeURIComponent(options.image);},fb:function(options){return 'https://www.facebook.com/sharer.php'
+'?u='+encodeURIComponent(_getURL(options));},facebook:function(options){return 'https://www.facebook.com/sharer.php'
+'?u='+encodeURIComponent(_getURL(options));},googlebookmarks:function(options){return 'https://www.google.com/bookmarks/mark'
+'?op=edit'
+'&bkmk='+encodeURIComponent(_getURL(options))
+'&title='+encodeURIComponent(options.title)
+'&annotation='+encodeURIComponent(options.text)
+'&labels=';},livejournal:function(options){return 'http://livejournal.com/update.bml'
+'?subject='+encodeURIComponent(options.title)
+'&event='+encodeURIComponent(options.text+'<br/><a href="'+_getURL(options)+'">'+options.title+'</a>')
+'&transform=1';},tumblr:function(options){return 'https://www.tumblr.com/widgets/share/tool'
+'?canonicalUrl='+encodeURIComponent(_getURL(options))
+'&title='+encodeURIComponent(options.title)
+'&caption='+encodeURIComponent(options.text)
+'&tags=';},pinterest:function(options){return 'http://pinterest.com/pin/create/link/'
+'?url='+encodeURIComponent(_getURL(options));},linkedin:function(options){return 'https://www.linkedin.com/shareArticle'
+'?mini=true'
+'&url='+encodeURIComponent(_getURL(options))
+'&title='+encodeURIComponent(options.title)
+'&summary='+encodeURIComponent(options.text);},reddit:function(options){return 'https://reddit.com/submit'
+'?url='+encodeURIComponent(_getURL(options))
+'&title='+encodeURIComponent(options.title);},twitter:function(options){var url=_getURL(options);return 'http://twitter.com/share'
+'?text='+encodeURIComponent(options.title)
+'&url='+encodeURIComponent(url)
+'&counturl='+encodeURIComponent(url);},mailru:function(options){return 'http://connect.mail.ru/share'
+'?url='+encodeURIComponent(_getURL(options))
+'&title='+encodeURIComponent(options.title)
+'&description='+encodeURIComponent(options.text)
+'&imageurl='+encodeURIComponent(options.image);},googleplus:function(options){return 'https://plus.google.com/share'
+'?url='+encodeURIComponent(_getURL(options));},weibo:function(options){return 'http://service.weibo.com/share/share.php'
+'?url='+encodeURIComponent(_getURL(options))
+'&title='+encodeURIComponent(options.title)
+'&pic='+encodeURIComponent(options.image);},telegram:function(options){return options.link_telegram
+'?url='+encodeURIComponent(_getURL(options)+"\n"+options.title);},whatsapp:function(options){return options.link_whatsapp
+'?text='+encodeURIComponent(_getURL(options)+"\n"+options.title);},viber:function(options){return 'viber://forward'
+'?text='+encodeURIComponent(_getURL(options)+"\n"+options.title);},skype:function(options){return 'https://web.skype.com/share'
+'?url='+encodeURIComponent(_getURL(options))
+'&text='+encodeURIComponent(options.title);},line:function(options){return 'https://lineit.line.me/share/ui'
+'?url='+encodeURIComponent(_getURL(options))
+'&text='+encodeURIComponent(options.title);},email:function(options){return 'mailto:'
+'?subject='+encodeURIComponent(options.title)
+'&body='+encodeURIComponent(_getURL(options))
+encodeURIComponent("\n"+options.text);}};function init(){var defaultOptions={type:'email',url:'',title:document.title,image:'',text:'',utm_source:'',utm_medium:'',utm_campaign:'',popup_width:626,popup_height:436,link_telegram:'https://telegram.me/share/url',link_whatsapp:'https://wa.me/'};function api(){}
function go(element,options){var withoutPopup=['unknown','viber','telegram','whatsapp','email','skype','line'];var tryLocation=true;var link;options=_extend(defaultOptions,_getData(element,defaultOptions),options);if(typeof social[options.type]=='undefined'){options.type='unknown'}
link=social[options.type](options);if(withoutPopup.indexOf(options.type)===-1){tryLocation=_popup(link,options)===null;}
if(tryLocation){if(element.tagName==='A'&&element.tagName==='a'){element.setAttribute('href',link);return true;}else{location.href=link;return false;}}else{return false;}}
api.go=go;api.options=defaultOptions;return api;}
return init();}));