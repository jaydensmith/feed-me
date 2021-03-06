!function(r){void 0===Craft.FeedMe&&(Craft.FeedMe={}),Craft.FeedMe.Help=Garnish.Base.extend({widgetId:0,loading:!1,$widget:null,$message:null,$fromEmail:null,$attachLogs:null,$attachDbBackup:null,$attachAdditionalFile:null,$sendBtn:null,$spinner:null,$error:null,$errorList:null,$iframe:null,init:function(){this.widgetId="feedMeHelp",(Craft.FeedMe.Help.widgets[this.widgetId]=this).$widget=r(".feedme-help-form"),this.$message=this.$widget.find(".message:first"),this.$fromEmail=this.$widget.find(".fromEmail:first"),this.$attachLogs=this.$widget.find(".attachLogs:first"),this.$attachAdditionalFile=this.$widget.find(".attachAdditionalFile:first"),this.$sendBtn=this.$widget.find(".submit:first"),this.$spinner=this.$widget.find(".buttons .spinner"),this.$error=this.$widget.find(".error:first"),this.$form=this.$widget.find("form:first"),this.$form.prepend('<input type="hidden" name="widgetId" value="'+this.widgetId+'" />'),this.$form.prepend(Craft.getCsrfInput()),this.addListener(this.$sendBtn,"activate","sendMessage")},sendMessage:function(){var e="iframeWidget"+this.widgetId;this.loading||(this.$iframe||(this.$iframe=r('<iframe id="'+e+'" name="'+e+'" style="display: none" />').insertAfter(this.$form)),this.loading=!0,this.$sendBtn.addClass("active"),this.$spinner.removeClass("hidden"),this.$form.attr("target",e),this.$form.attr("action",Craft.getActionUrl("feed-me/help/send-support-request")),this.$form.submit())},parseResponse:function(e,t){if(this.loading=!1,this.$sendBtn.removeClass("active"),this.$spinner.addClass("hidden"),this.$errorList&&this.$errorList.children().remove(),e.errors)for(var n in this.$errorList||(this.$errorList=r('<ul class="errors"/>').insertAfter(this.$form)),e.errors)if(e.errors.hasOwnProperty(n))for(var i=0;i<e.errors[n].length;i++){var s=e.errors[n][i];r("<li>"+s+"</li>").appendTo(this.$errorList)}e.success&&(Craft.cp.displayNotice(Craft.t("feed-me","Message sent successfully.")),this.$message.val(""),this.$attachAdditionalFile.val("")),this.$iframe.html("")}},{widgets:{}})}(jQuery),
/**
 * sifter.js
 * Copyright (c) 2013 Brian Reavis & contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * @author Brian Reavis <brian@thirdroute.com>
 */
function(e,t){"function"==typeof define&&define.amd?define("sifter",t):"object"==typeof exports?module.exports=t():e.Sifter=t()}(this,function(){
/**
     * Textually searches arrays and hashes of objects
     * by property (or multiple properties). Designed
     * specifically for autocomplete.
     *
     * @constructor
     * @param {array|object} items
     * @param {object} items
     */
var e=function(e,t){this.items=e,this.settings=t||{diacritics:!0}};
/**
     * Splits a search string into an array of individual
     * regexps to be used to match results.
     *
     * @param {string} query
     * @returns {array}
     */e.prototype.tokenize=function(e){if(!(e=a(String(e||"").toLowerCase()))||!e.length)return[];var t,n,i,s,r=[],o=e.split(/ +/);for(t=0,n=o.length;t<n;t++){if(i=l(o[t]),this.settings.diacritics)for(s in c)c.hasOwnProperty(s)&&(i=i.replace(new RegExp(s,"g"),c[s]));r.push({string:o[t],regex:new RegExp(i,"i")})}return r},
/**
     * Iterates over arrays and hashes.
     *
     * ```
     * this.iterator(this.items, function(item, id) {
     *    // invoked for each item
     * });
     * ```
     *
     * @param {array|object} object
     */
e.prototype.iterator=function(e,t){var n;(n=o(e)?Array.prototype.forEach||function(e){for(var t=0,n=this.length;t<n;t++)e(this[t],t,this)}:function(e){for(var t in this)this.hasOwnProperty(t)&&e(this[t],t,this)}).apply(e,[t])},
/**
     * Returns a function to be used to score individual results.
     *
     * Good matches will have a higher score than poor matches.
     * If an item is not a match, 0 will be returned by the function.
     *
     * @param {object|string} search
     * @param {object} options (optional)
     * @returns {function}
     */
e.prototype.getScoreFunction=function(e,t){var n,s,r,o;e=(n=this).prepareSearch(e,t),r=e.tokens,s=e.options.fields,o=r.length;
/**
         * Calculates how close of a match the
         * given value is against a search token.
         *
         * @param {mixed} value
         * @param {object} token
         * @return {number}
         */
var a=function(e,t){var n,i;return e?-1===(i=(e=String(e||"")).search(t.regex))?0:(n=t.string.length/e.length,0===i&&(n+=.5),n):0},l=(c=s.length)?1===c?function(e,t){return a(t[s[0]],e)}:function(e,t){for(var n=0,i=0;n<c;n++)i+=a(t[s[n]],e);return i/c}:function(){return 0},c;
/**
         * Calculates the score of an object
         * against the search query.
         *
         * @param {object} token
         * @param {object} data
         * @return {number}
         */return o?1===o?function(e){return l(r[0],e)}:"and"===e.options.conjunction?function(e){for(var t,n=0,i=0;n<o;n++){if((t=l(r[n],e))<=0)return 0;i+=t}return i/o}:function(e){for(var t=0,n=0;t<o;t++)n+=l(r[t],e);return n/o}:function(){return 0}},
/**
     * Returns a function that can be used to compare two
     * results, for sorting purposes. If no sorting should
     * be performed, `null` will be returned.
     *
     * @param {string|object} search
     * @param {object} options
     * @return function(a,b)
     */
e.prototype.getSortFunction=function(e,t){var n,i,s,r,a,l,o,c,p,d,u;if(u=!(e=(s=this).prepareSearch(e,t)).query&&t.sort_empty||t.sort,
/**
         * Fetches the specified sort field value
         * from a search result item.
         *
         * @param  {string} name
         * @param  {object} result
         * @return {mixed}
         */
p=function(e,t){return"$score"===e?t.score:s.items[t.id][e]},
// parse options
a=[],u)for(n=0,i=u.length;n<i;n++)(e.query||"$score"!==u[n].field)&&a.push(u[n]);
// the "$score" field is implied to be the primary
// sort field, unless it's manually specified
if(e.query){for(d=!0,n=0,i=a.length;n<i;n++)if("$score"===a[n].field){d=!1;break}d&&a.unshift({field:"$score",direction:"desc"})}else for(n=0,i=a.length;n<i;n++)if("$score"===a[n].field){a.splice(n,1);break}for(c=[],n=0,i=a.length;n<i;n++)c.push("desc"===a[n].direction?-1:1);
// build function
return(l=a.length)?1===l?(r=a[0].field,o=c[0],function(e,t){return o*h(p(r,e),p(r,t))}):function(e,t){var n,i,s,r,o;for(n=0;n<l;n++)if(o=a[n].field,i=c[n]*h(p(o,e),p(o,t)))return i;return 0}:null},
/**
     * Parses a search query and returns an object
     * with tokens and fields ready to be populated
     * with results.
     *
     * @param {string} query
     * @param {object} options
     * @returns {object}
     */
e.prototype.prepareSearch=function(e,t){if("object"==typeof e)return e;var n=(t=r({},t)).fields,i=t.sort,s=t.sort_empty;return n&&!o(n)&&(t.fields=[n]),i&&!o(i)&&(t.sort=[i]),s&&!o(s)&&(t.sort_empty=[s]),{options:t,query:String(e||"").toLowerCase(),tokens:this.tokenize(e),total:0,items:[]}},
/**
     * Searches through all items and returns a sorted array of matches.
     *
     * The `options` parameter can contain:
     *
     *   - fields {string|array}
     *   - sort {array}
     *   - score {function}
     *   - filter {bool}
     *   - limit {integer}
     *
     * Returns an object containing:
     *
     *   - options {object}
     *   - query {string}
     *   - tokens {array}
     *   - total {int}
     *   - items {array}
     *
     * @param {string} query
     * @param {object} options
     * @returns {object}
     */
e.prototype.search=function(e,n){var t=this,i,s,r,o,a,l;return r=this.prepareSearch(e,n),n=r.options,e=r.query,
// generate result scoring function
l=n.score||t.getScoreFunction(r),
// perform search and sort
e.length?t.iterator(t.items,function(e,t){s=l(e),(!1===n.filter||0<s)&&r.items.push({score:s,id:t})}):t.iterator(t.items,function(e,t){r.items.push({score:1,id:t})}),(a=t.getSortFunction(r,n))&&r.items.sort(a),
// apply limits
r.total=r.items.length,"number"==typeof n.limit&&(r.items=r.items.slice(0,n.limit)),r};
// utilities
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var h=function(e,t){return"number"==typeof e&&"number"==typeof t?t<e?1:e<t?-1:0:(e=n(String(e||"")),(t=n(String(t||"")))<e?1:e<t?-1:0)},r=function(e,t){var n,i,s,r;for(n=1,i=arguments.length;n<i;n++)if(r=arguments[n])for(s in r)r.hasOwnProperty(s)&&(e[s]=r[s]);return e},a=function(e){return(e+"").replace(/^\s+|\s+$|/g,"")},l=function(e){return(e+"").replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")},o=Array.isArray||$&&$.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},c={a:"[aÀÁÂÃÄÅàáâãäåĀāąĄ]",c:"[cÇçćĆčČ]",d:"[dđĐďĎ]",e:"[eÈÉÊËèéêëěĚĒēęĘ]",i:"[iÌÍÎÏìíîïĪī]",l:"[lłŁ]",n:"[nÑñňŇńŃ]",o:"[oÒÓÔÕÕÖØòóôõöøŌō]",r:"[rřŘ]",s:"[sŠšśŚ]",t:"[tťŤ]",u:"[uÙÚÛÜùúûüůŮŪū]",y:"[yŸÿýÝ]",z:"[zŽžżŻźŹ]"},n=function(){var e,t,n,i,s="",r={};for(n in c)if(c.hasOwnProperty(n))for(s+=i=c[n].substring(2,c[n].length-1),e=0,t=i.length;e<t;e++)r[i.charAt(e)]=n;var o=new RegExp("["+s+"]","g");return function(e){return e.replace(o,function(e){return r[e]}).toLowerCase()}}();
// export
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
return e}),
/**
 * microplugin.js
 * Copyright (c) 2013 Brian Reavis & contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * @author Brian Reavis <brian@thirdroute.com>
 */
function(e,t){"function"==typeof define&&define.amd?define("microplugin",t):"object"==typeof exports?module.exports=t():e.MicroPlugin=t()}(this,function(){var e={mixin:function(s){s.plugins={},
/**
         * Initializes the listed plugins (with options).
         * Acceptable formats:
         *
         * List (without options):
         *   ['a', 'b', 'c']
         *
         * List (with options):
         *   [{'name': 'a', options: {}}, {'name': 'b', options: {}}]
         *
         * Hash (with options):
         *   {'a': { ... }, 'b': { ... }, 'c': { ... }}
         *
         * @param {mixed} plugins
         */
s.prototype.initializePlugins=function(e){var t,n,i,s=this,r=[];if(s.plugins={names:[],settings:{},requested:{},loaded:{}},o.isArray(e))for(t=0,n=e.length;t<n;t++)"string"==typeof e[t]?r.push(e[t]):(s.plugins.settings[e[t].name]=e[t].options,r.push(e[t].name));else if(e)for(i in e)e.hasOwnProperty(i)&&(s.plugins.settings[i]=e[i],r.push(i));for(;r.length;)s.require(r.shift())},s.prototype.loadPlugin=function(e){var t=this,n=t.plugins,i=s.plugins[e];if(!s.plugins.hasOwnProperty(e))throw new Error('Unable to find "'+e+'" plugin');n.requested[e]=!0,n.loaded[e]=i.fn.apply(t,[t.plugins.settings[e]||{}]),n.names.push(e)},
/**
         * Initializes a plugin.
         *
         * @param {string} name
         */
s.prototype.require=function(e){var t=this,n=t.plugins;if(!t.plugins.loaded.hasOwnProperty(e)){if(n.requested[e])throw new Error('Plugin has circular dependency ("'+e+'")');t.loadPlugin(e)}return n.loaded[e]},
/**
         * Registers a plugin.
         *
         * @param {string} name
         * @param {function} fn
         */
s.define=function(e,t){s.plugins[e]={name:e,fn:t}}}},o={isArray:Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)}};return e}),
/**
 * selectize.js (v0.12.1)
 * Copyright (c) 2013–2015 Brian Reavis & contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * @author Brian Reavis <brian@thirdroute.com>
 */
/*jshint curly:false */
/*jshint browser:true */
function(e,t){"function"==typeof define&&define.amd?define("selectize",["jquery","sifter","microplugin"],t):"object"==typeof exports?module.exports=t(require("jquery"),require("sifter"),require("microplugin")):e.Selectize=t(e.jQuery,e.Sifter,e.MicroPlugin)}(this,function(O,c,e){"use strict";var b=function(e,t){if("string"!=typeof t||t.length){var c="string"==typeof t?new RegExp(t,"i"):t,p=function(e){var t=0;if(3===e.nodeType){var n=e.data.search(c);if(0<=n&&0<e.data.length){var i=e.data.match(c),s=document.createElement("span");s.className="highlight";var r=e.splitText(n),o=r.splitText(i[0].length),a=r.cloneNode(!0);s.appendChild(a),r.parentNode.replaceChild(s,r),t=1}}else if(1===e.nodeType&&e.childNodes&&!/(script|style)/i.test(e.tagName))for(var l=0;l<e.childNodes.length;++l)l+=p(e.childNodes[l]);return t};return e.each(function(){p(this)})}},i=function(){};i.prototype={on:function(e,t){this._events=this._events||{},this._events[e]=this._events[e]||[],this._events[e].push(t)},off:function(e,t){var n=arguments.length;return 0===n?delete this._events:1===n?delete this._events[e]:(this._events=this._events||{},void(e in this._events!=!1&&this._events[e].splice(this._events[e].indexOf(t),1)))},trigger:function(e/* , args... */){if(this._events=this._events||{},e in this._events!=!1)for(var t=0;t<this._events[e].length;t++)this._events[e][t].apply(this,Array.prototype.slice.call(arguments,1))}},
/**
     * Mixin will delegate all MicroEvent.js function in the destination object.
     *
     * - MicroEvent.mixin(Foobar) will make Foobar able to use MicroEvent
     *
     * @param {object} the object which will support MicroEvent
     */
i.mixin=function(e){for(var t=["on","off","trigger"],n=0;n<t.length;n++)e.prototype[t[n]]=i.prototype[t[n]]};var $=/Mac/.test(navigator.userAgent),t=65,n=188,s=13,r=27,o=37,a=38,l=80,p=39,d=40,u=78,h=8,g=46,f=16,y=$?91:17,w=$?18:17,v=9,m=1,C=2,x=!/android/i.test(window.navigator.userAgent)&&!!document.createElement("form").validity,S=function(e){return void 0!==e},I=function(e){return null==e?null:"boolean"==typeof e?e?"1":"0":e+""},k=function(e){return(e+"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},_=function(e){return(e+"").replace(/\$/g,"$$$$")},F={
/**
     * Wraps `method` on `self` so that `fn`
     * is invoked before the original method.
     *
     * @param {object} self
     * @param {string} method
     * @param {function} fn
     */
before:function(e,t,n){var i=e[t];e[t]=function(){return n.apply(e,arguments),i.apply(e,arguments)}},
/**
     * Wraps `method` on `self` so that `fn`
     * is invoked after the original method.
     *
     * @param {object} self
     * @param {string} method
     * @param {function} fn
     */
after:function(t,e,n){var i=t[e];t[e]=function(){var e=i.apply(t,arguments);return n.apply(t,arguments),e}}},P=function(e){var t=!1;return function(){t||(t=!0,e.apply(this,arguments))}},A=function(n,i){var s;return function(){var e=this,t=arguments;window.clearTimeout(s),s=window.setTimeout(function(){n.apply(e,t)},i)}},D=function(n,i,e){var t,s=n.trigger,r={};
// trigger queued events
for(t in
// override trigger method
n.trigger=function(e){var t=e;if(-1===i.indexOf(t))return s.apply(n,arguments);r[t]=arguments},
// invoke provided function
e.apply(n,[]),n.trigger=s,r)r.hasOwnProperty(t)&&s.apply(n,r[t])},T=function(n,e,t,i){n.on(e,t,function(e){for(var t=e.target;t&&t.parentNode!==n[0];)t=t.parentNode;return e.currentTarget=t,i.apply(this,[e])})},z=function(e){var t={};if("selectionStart"in e)t.start=e.selectionStart,t.length=e.selectionEnd-t.start;else if(document.selection){e.focus();var n=document.selection.createRange(),i=document.selection.createRange().text.length;n.moveStart("character",-e.value.length),t.start=n.text.length-i,t.length=i}return t},q=function(e,t,n){var i,s,r={};if(n)for(i=0,s=n.length;i<s;i++)r[n[i]]=e.css(n[i]);else r=e.css();t.css(r)},j=function(e,t){if(!e)return 0;var n=O("<test>").css({position:"absolute",top:-99999,left:-99999,width:"auto",padding:0,whiteSpace:"pre"}).text(e).appendTo("body");q(t,n,["letterSpacing","fontSize","fontFamily","fontWeight","textTransform"]);var i=n.width();return n.remove(),i},L=function(p){var d=null,e=function(e,t){var n,i,s,r,o,a,l,c;t=t||{},(e=e||window.event||{}).metaKey||e.altKey||(t.force||!1!==p.data("grow"))&&(n=p.val(),e.type&&"keydown"===e.type.toLowerCase()&&(s=97<=(i=e.keyCode)&&i<=122||// a-z
65<=i&&i<=90||// A-Z
48<=i&&i<=57||// 0-9
32===i,46===i||8===i?(c=z(p[0])).length?n=n.substring(0,c.start)+n.substring(c.start+c.length):8===i&&c.start?n=n.substring(0,c.start-1)+n.substring(c.start+1):46===i&&void 0!==c.start&&(n=n.substring(0,c.start)+n.substring(c.start+1)):s&&(a=e.shiftKey,l=String.fromCharCode(e.keyCode),n+=l=a?l.toUpperCase():l.toLowerCase())),r=p.attr("placeholder"),!n&&r&&(n=r),(o=j(n,p)+4)!==d&&(d=o,p.width(o),p.triggerHandler("resize")))};p.on("keydown keyup update blur",e),e()},E=function(e,t){var n,i,s,r,o,a=this;(o=e[0]).selectize=a;
// detect rtl environment
var l=window.getComputedStyle&&window.getComputedStyle(o,null);
// build options table
if(r=(r=l?l.getPropertyValue("direction"):o.currentStyle&&o.currentStyle.direction)||e.parents("[dir]:first").attr("dir")||"",
// setup default state
O.extend(a,{order:0,settings:t,$input:e,tabIndex:e.attr("tabindex")||"",tagType:"select"===o.tagName.toLowerCase()?1:2,rtl:/rtl/i.test(r),eventNS:".selectize"+ ++E.count,highlightedValue:null,isOpen:!1,isDisabled:!1,isRequired:e.is("[required]"),isInvalid:!1,isLocked:!1,isFocused:!1,isInputHidden:!1,isSetup:!1,isShiftDown:!1,isCmdDown:!1,isCtrlDown:!1,ignoreFocus:!1,ignoreBlur:!1,ignoreHover:!1,hasOptions:!1,currentResults:null,lastValue:"",caretPos:0,loading:0,loadedSearches:{},$activeOption:null,$activeItems:[],optgroups:{},options:{},userOptions:{},items:[],renderCache:{},onSearchChange:null===t.loadThrottle?a.onSearchChange:A(a.onSearchChange,t.loadThrottle)}),
// search system
a.sifter=new c(this.options,{diacritics:t.diacritics}),a.settings.options){for(i=0,s=a.settings.options.length;i<s;i++)a.registerOption(a.settings.options[i]);delete a.settings.options}
// build optgroup table
if(a.settings.optgroups){for(i=0,s=a.settings.optgroups.length;i<s;i++)a.registerOptionGroup(a.settings.optgroups[i]);delete a.settings.optgroups}
// option-dependent defaults
a.settings.mode=a.settings.mode||(1===a.settings.maxItems?"single":"multi"),"boolean"!=typeof a.settings.hideSelected&&(a.settings.hideSelected="multi"===a.settings.mode),a.initializePlugins(a.settings.plugins),a.setupCallbacks(),a.setupTemplates(),a.setup()};
// mixins
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
return i.mixin(E),e.mixin(E),
// methods
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
O.extend(E.prototype,{
/**
         * Creates all elements and sets up event bindings.
         */
setup:function(){var t=this,e=t.settings,n=t.eventNS,i=O(window),s=O(document),r=t.$input,o,a,l,c,p,d,u,h,g,f,v;
// if splitOn was not passed in, construct it from the delimiter to allow pasting universally
if(u=t.settings.mode,f=r.attr("class")||"",o=O("<div>").addClass(e.wrapperClass).addClass(f).addClass(u),a=O("<div>").addClass(e.inputClass).addClass("items").appendTo(o),
/* HACK */
//$control_input    = $('<input type="text" autocomplete="off" />').appendTo($control).attr('tabindex', $input.is(':disabled') ? '-1' : self.tabIndex);
l=O('<input type="text" autocomplete="false" />').appendTo(a).attr("tabindex",r.is(":disabled")?"-1":t.tabIndex),
/* END HACK */
d=O(e.dropdownParent||o),c=O("<div>").addClass(e.dropdownClass).addClass(u).hide().appendTo(d),p=O("<div>").addClass(e.dropdownContentClass).appendTo(c),t.settings.copyClassesToDropdown&&c.addClass(f),o.css({width:r[0].style.width}),t.plugins.names.length&&(v="plugin-"+t.plugins.names.join(" plugin-"),o.addClass(v),c.addClass(v)),(null===e.maxItems||1<e.maxItems)&&1===t.tagType&&r.attr("multiple","multiple"),t.settings.placeholder&&l.attr("placeholder",e.placeholder),!t.settings.splitOn&&t.settings.delimiter){var m=t.settings.delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&");t.settings.splitOn=new RegExp("\\s*"+m+"+\\s*")}r.attr("autocorrect")&&l.attr("autocorrect",r.attr("autocorrect")),r.attr("autocapitalize")&&l.attr("autocapitalize",r.attr("autocapitalize")),t.$wrapper=o,t.$control=a,t.$control_input=l,t.$dropdown=c,t.$dropdown_content=p,c.on("mouseenter","[data-selectable]",function(){return t.onOptionHover.apply(t,arguments)}),c.on("mousedown click","[data-selectable]",function(){return t.onOptionSelect.apply(t,arguments)}),T(a,"mousedown","*:not(input)",function(){return t.onItemSelect.apply(t,arguments)}),L(l),a.on({mousedown:function(){return t.onMouseDown.apply(t,arguments)},click:function(){return t.onClick.apply(t,arguments)}}),l.on({mousedown:function(e){e.stopPropagation()},keydown:function(){return t.onKeyDown.apply(t,arguments)},keyup:function(){return t.onKeyUp.apply(t,arguments)},keypress:function(){return t.onKeyPress.apply(t,arguments)},resize:function(){t.positionDropdown.apply(t,[])},blur:function(){return t.onBlur.apply(t,arguments)},focus:function(){return t.ignoreBlur=!1,t.onFocus.apply(t,arguments)},paste:function(){return t.onPaste.apply(t,arguments)}}),s.on("keydown"+n,function(e){t.isCmdDown=e[$?"metaKey":"ctrlKey"],t.isCtrlDown=e[$?"altKey":"ctrlKey"],t.isShiftDown=e.shiftKey}),s.on("keyup"+n,function(e){e.keyCode===w&&(t.isCtrlDown=!1),16===e.keyCode&&(t.isShiftDown=!1),e.keyCode===y&&(t.isCmdDown=!1)}),s.on("mousedown"+n,function(e){if(t.isFocused){
// prevent events on the dropdown scrollbar from causing the control to blur
if(e.target===t.$dropdown[0]||e.target.parentNode===t.$dropdown[0])return!1;
// blur on click outside
t.$control.has(e.target).length||e.target===t.$control[0]||t.blur(e.target)}}),i.on(["scroll"+n,"resize"+n].join(" "),function(){t.isOpen&&t.positionDropdown.apply(t,arguments)}),i.on("mousemove"+n,function(){t.ignoreHover=!1}),
// store original children and tab index so that they can be
// restored when the destroy() method is called.
this.revertSettings={$children:r.children().detach(),tabindex:r.attr("tabindex")},r.attr("tabindex",-1).hide().after(t.$wrapper),O.isArray(e.items)&&(t.setValue(e.items),delete e.items),
// feature detect for the validation API
x&&r.on("invalid"+n,function(e){e.preventDefault(),t.isInvalid=!0,t.refreshState()}),t.updateOriginalInput(),t.refreshItems(),t.refreshState(),t.updatePlaceholder(),t.isSetup=!0,r.is(":disabled")&&t.disable(),t.on("change",this.onChange),r.data("selectize",t),r.addClass("selectized"),t.trigger("initialize"),
// preload options
!0===e.preload&&t.onSearchChange("")},
/**
         * Sets up default rendering functions.
         */
setupTemplates:function(){var e=this,n=e.settings.labelField,i=e.settings.optgroupLabelField,t={optgroup:function(e){return'<div class="optgroup">'+e.html+"</div>"},optgroup_header:function(e,t){return'<div class="optgroup-header">'+t(e[i])+"</div>"},option:function(e,t){return'<div class="option">'+t(e[n])+"</div>"},item:function(e,t){return'<div class="item">'+t(e[n])+"</div>"},option_create:function(e,t){return'<div class="create">Add <strong>'+t(e.input)+"</strong>&hellip;</div>"}};e.settings.render=O.extend({},t,e.settings.render)},
/**
         * Maps fired events to callbacks provided
         * in the settings used when creating the control.
         */
setupCallbacks:function(){var e,t,n={initialize:"onInitialize",change:"onChange",item_add:"onItemAdd",item_remove:"onItemRemove",clear:"onClear",option_add:"onOptionAdd",option_remove:"onOptionRemove",option_clear:"onOptionClear",optgroup_add:"onOptionGroupAdd",optgroup_remove:"onOptionGroupRemove",optgroup_clear:"onOptionGroupClear",dropdown_open:"onDropdownOpen",dropdown_close:"onDropdownClose",type:"onType",load:"onLoad",focus:"onFocus",blur:"onBlur"};for(e in n)n.hasOwnProperty(e)&&(t=this.settings[n[e]])&&this.on(e,t)},
/**
         * Triggered when the main control element
         * has a click event.
         *
         * @param {object} e
         * @return {boolean}
         */
onClick:function(e){var t=this;
// necessary for mobile webkit devices (manual focus triggering
// is ignored unless invoked within a click event)
t.isFocused||(t.focus(),e.preventDefault())},
/**
         * Triggered when the main control element
         * has a mouse down event.
         *
         * @param {object} e
         * @return {boolean}
         */
onMouseDown:function(e){var t=this,n=e.isDefaultPrevented(),i=O(e.target);if(t.isFocused){
// retain focus by preventing native handling. if the
// event target is the input it should not be modified.
// otherwise, text selection within the input won't work.
if(e.target!==t.$control_input[0])return"single"===t.settings.mode?
// toggle dropdown
t.isOpen?t.close():t.open():n||t.setActiveItem(null),!1}else
// give control focus
n||window.setTimeout(function(){t.focus()},0)},
/**
         * Triggered when the value of the control has been changed.
         * This should propagate the event to the original DOM
         * input / select element.
         */
onChange:function(){this.$input.trigger("change")},
/**
         * Triggered on <input> paste.
         *
         * @param {object} e
         * @returns {boolean}
         */
onPaste:function(e){var i=this;i.isFull()||i.isInputHidden||i.isLocked?e.preventDefault():
// If a regex or string is included, this will split the pasted
// input and create Items for each separate value
i.settings.splitOn&&setTimeout(function(){for(var e=O.trim(i.$control_input.val()||"").split(i.settings.splitOn),t=0,n=e.length;t<n;t++)i.createItem(e[t])},0)},
/**
         * Triggered on <input> keypress.
         *
         * @param {object} e
         * @returns {boolean}
         */
onKeyPress:function(e){if(this.isLocked)return e&&e.preventDefault();var t=String.fromCharCode(e.keyCode||e.which);return this.settings.create&&"multi"===this.settings.mode&&t===this.settings.delimiter?(this.createItem(),e.preventDefault(),!1):void 0},
/**
         * Triggered on <input> keydown.
         *
         * @param {object} e
         * @returns {boolean}
         */
onKeyDown:function(e){var t=e.target===this.$control_input[0],n=this;if(n.isLocked)9!==e.keyCode&&e.preventDefault();else{switch(e.keyCode){case 65:if(n.isCmdDown)return void n.selectAll();break;case 27:return void(n.isOpen&&(e.preventDefault(),e.stopPropagation(),n.close()));case 78:if(!e.ctrlKey||e.altKey)break;case 40:if(!n.isOpen&&n.hasOptions)n.open();else if(n.$activeOption){n.ignoreHover=!0;var i=n.getAdjacentOption(n.$activeOption,1);i.length&&n.setActiveOption(i,!0,!0)}return void e.preventDefault();case 80:if(!e.ctrlKey||e.altKey)break;case 38:if(n.$activeOption){n.ignoreHover=!0;var s=n.getAdjacentOption(n.$activeOption,-1);s.length&&n.setActiveOption(s,!0,!0)}return void e.preventDefault();case 13:return void(n.isOpen&&n.$activeOption&&(n.onOptionSelect({currentTarget:n.$activeOption}),e.preventDefault()));case 37:return void n.advanceSelection(-1,e);case 39:return void n.advanceSelection(1,e);case 9:return n.settings.selectOnTab&&n.isOpen&&n.$activeOption&&(n.onOptionSelect({currentTarget:n.$activeOption}),
// Default behaviour is to jump to the next field, we only want this
// if the current field doesn't accept any more entries
n.isFull()||e.preventDefault()),void(n.settings.create&&n.createItem()&&e.preventDefault());case 8:case 46:return void n.deleteSelection(e)}!n.isFull()&&!n.isInputHidden||($?e.metaKey:e.ctrlKey)||e.preventDefault()}},
/**
         * Triggered on <input> keyup.
         *
         * @param {object} e
         * @returns {boolean}
         */
onKeyUp:function(e){var t=this;if(t.isLocked)return e&&e.preventDefault();var n=t.$control_input.val()||"";t.lastValue!==n&&(t.lastValue=n,t.onSearchChange(n),t.refreshOptions(),t.trigger("type",n))},
/**
         * Invokes the user-provide option provider / loader.
         *
         * Note: this function is debounced in the Selectize
         * constructor (by `settings.loadDelay` milliseconds)
         *
         * @param {string} value
         */
onSearchChange:function(t){var n=this,i=n.settings.load;i&&(n.loadedSearches.hasOwnProperty(t)||(n.loadedSearches[t]=!0,n.load(function(e){i.apply(n,[t,e])})))},
/**
         * Triggered on <input> focus.
         *
         * @param {object} e (optional)
         * @returns {boolean}
         */
onFocus:function(e){var t=this,n=t.isFocused;if(t.isDisabled)return t.blur(),e&&e.preventDefault(),!1;t.ignoreFocus||(t.isFocused=!0,"focus"===t.settings.preload&&t.onSearchChange(""),n||t.trigger("focus"),t.$activeItems.length||(t.showInput(),t.setActiveItem(null),t.refreshOptions(!!t.settings.openOnFocus)),t.refreshState())},
/**
         * Triggered on <input> blur.
         *
         * @param {object} e
         * @param {Element} dest
         */
onBlur:function(e,t){var n=this;if(n.isFocused&&(n.isFocused=!1,!n.ignoreFocus)){if(!n.ignoreBlur&&document.activeElement===n.$dropdown_content[0])
// necessary to prevent IE closing the dropdown when the scrollbar is clicked
return n.ignoreBlur=!0,void n.onFocus(e);var i=function(){n.close(),n.setTextboxValue(""),n.setActiveItem(null),n.setActiveOption(null),n.setCaret(n.items.length),n.refreshState(),
// IE11 bug: element still marked as active
(t||document.body).focus(),n.ignoreFocus=!1,n.trigger("blur")};n.ignoreFocus=!0,n.settings.create&&n.settings.createOnBlur?n.createItem(null,!1,i):i()}},
/**
         * Triggered when the user rolls over
         * an option in the autocomplete dropdown menu.
         *
         * @param {object} e
         * @returns {boolean}
         */
onOptionHover:function(e){this.ignoreHover||this.setActiveOption(e.currentTarget,!1)},
/**
         * Triggered when the user clicks on an option
         * in the autocomplete dropdown menu.
         *
         * @param {object} e
         * @returns {boolean}
         */
onOptionSelect:function(e){var t,n,i,s=this;e.preventDefault&&(e.preventDefault(),e.stopPropagation()),(n=O(e.currentTarget)).hasClass("create")?s.createItem(null,function(){s.settings.closeAfterSelect&&s.close()}):void 0!==(t=n.attr("data-value"))&&(s.lastQuery=null,s.setTextboxValue(""),s.addItem(t),s.settings.closeAfterSelect?s.close():!s.settings.hideSelected&&e.type&&/mouse/.test(e.type)&&s.setActiveOption(s.getOption(t)))},
/**
         * Triggered when the user clicks on an item
         * that has been selected.
         *
         * @param {object} e
         * @returns {boolean}
         */
onItemSelect:function(e){var t=this;t.isLocked||"multi"===t.settings.mode&&(e.preventDefault(),t.setActiveItem(e.currentTarget,e))},
/**
         * Invokes the provided method that provides
         * results to a callback---which are then added
         * as options to the control.
         *
         * @param {function} fn
         */
load:function(e){var t=this,n=t.$wrapper.addClass(t.settings.loadingClass);t.loading++,e.apply(t,[function(e){t.loading=Math.max(t.loading-1,0),e&&e.length&&(t.addOption(e),t.refreshOptions(t.isFocused&&!t.isInputHidden)),t.loading||n.removeClass(t.settings.loadingClass),t.trigger("load",e)}])},
/**
         * Sets the input field of the control to the specified value.
         *
         * @param {string} value
         */
setTextboxValue:function(e){var t=this.$control_input,n;t.val()!==e&&(t.val(e).triggerHandler("update"),this.lastValue=e)},
/**
         * Returns the value of the control. If multiple items
         * can be selected (e.g. <select multiple>), this returns
         * an array. If only one item can be selected, this
         * returns a string.
         *
         * @returns {mixed}
         */
getValue:function(){return 1===this.tagType&&this.$input.attr("multiple")?this.items:this.items.join(this.settings.delimiter)},
/**
         * Resets the selected items to the given value.
         *
         * @param {mixed} value
         */
setValue:function(e,t){var n;D(this,t?[]:["change"],function(){this.clear(t),this.addItems(e,t)})},
/**
         * Sets the selected item.
         *
         * @param {object} $item
         * @param {object} e (optional)
         */
setActiveItem:function(e,t){var n=this,i,s,r,o,a,l,c,p;if("single"!==n.settings.mode){
// clear the active selection
if(!(e=O(e)).length)return O(n.$activeItems).removeClass("active"),n.$activeItems=[],void(n.isFocused&&n.showInput());
// modify selection
if("mousedown"===(i=t&&t.type.toLowerCase())&&n.isShiftDown&&n.$activeItems.length){for(p=n.$control.children(".active:last"),o=Array.prototype.indexOf.apply(n.$control[0].childNodes,[p[0]]),(a=Array.prototype.indexOf.apply(n.$control[0].childNodes,[e[0]]))<o&&(c=o,o=a,a=c),s=o;s<=a;s++)l=n.$control[0].childNodes[s],-1===n.$activeItems.indexOf(l)&&(O(l).addClass("active"),n.$activeItems.push(l));t.preventDefault()}else"mousedown"===i&&n.isCtrlDown||"keydown"===i&&this.isShiftDown?e.hasClass("active")?(r=n.$activeItems.indexOf(e[0]),n.$activeItems.splice(r,1),e.removeClass("active")):n.$activeItems.push(e.addClass("active")[0]):(O(n.$activeItems).removeClass("active"),n.$activeItems=[e.addClass("active")[0]]);
// ensure control has focus
n.hideInput(),this.isFocused||n.focus()}},
/**
         * Sets the selected item in the dropdown menu
         * of available options.
         *
         * @param {object} $object
         * @param {boolean} scroll
         * @param {boolean} animate
         */
setActiveOption:function(e,t,n){var i,s,r,o,a,l=this;l.$activeOption&&l.$activeOption.removeClass("active"),l.$activeOption=null,(e=O(e)).length&&(l.$activeOption=e.addClass("active"),!t&&S(t)||(i=l.$dropdown_content.height(),s=l.$activeOption.outerHeight(!0),t=l.$dropdown_content.scrollTop()||0,a=(o=r=l.$activeOption.offset().top-l.$dropdown_content.offset().top+t)-i+s,i+t<r+s?l.$dropdown_content.stop().animate({scrollTop:a},n?l.settings.scrollDuration:0):r<t&&l.$dropdown_content.stop().animate({scrollTop:o},n?l.settings.scrollDuration:0)))},
/**
         * Selects all items (CTRL + A).
         */
selectAll:function(){var e=this;"single"!==e.settings.mode&&(e.$activeItems=Array.prototype.slice.apply(e.$control.children(":not(input)").addClass("active")),e.$activeItems.length&&(e.hideInput(),e.close()),e.focus())},
/**
         * Hides the input element out of view, while
         * retaining its focus.
         */
hideInput:function(){var e=this;e.setTextboxValue(""),e.$control_input.css({opacity:0,position:"absolute",left:e.rtl?1e4:-1e4}),e.isInputHidden=!0},
/**
         * Restores input visibility.
         */
showInput:function(){this.$control_input.css({opacity:1,position:"relative",left:0}),this.isInputHidden=!1},
/**
         * Gives the control focus.
         */
focus:function(){var e=this;e.isDisabled||(e.ignoreFocus=!0,e.$control_input[0].focus(),window.setTimeout(function(){e.ignoreFocus=!1,e.onFocus()},0))},
/**
         * Forces the control out of focus.
         *
         * @param {Element} dest
         */
blur:function(e){this.$control_input[0].blur(),this.onBlur(null,e)},
/**
         * Returns a function that scores an object
         * to show how good of a match it is to the
         * provided query.
         *
         * @param {string} query
         * @param {object} options
         * @return {function}
         */
getScoreFunction:function(e){return this.sifter.getScoreFunction(e,this.getSearchOptions())},
/**
         * Returns search options for sifter (the system
         * for scoring and sorting results).
         *
         * @see https://github.com/brianreavis/sifter.js
         * @return {object}
         */
getSearchOptions:function(){var e=this.settings,t=e.sortField;return"string"==typeof t&&(t=[{field:t}]),{fields:e.searchField,conjunction:e.searchConjunction,sort:t}},
/**
         * Searches through available options and returns
         * a sorted array of matches.
         *
         * Returns an object containing:
         *
         *   - query {string}
         *   - tokens {array}
         *   - total {int}
         *   - items {array}
         *
         * @param {string} query
         * @returns {object}
         */
search:function(e){var t,n,i,s,r,o=this,a=o.settings,l=this.getSearchOptions();
// validate user-provided result scoring function
if(a.score&&"function"!=typeof(r=o.settings.score.apply(this,[e])))throw new Error('Selectize "score" setting must be a function that returns a function');
// perform search
// filter out selected items
if(e!==o.lastQuery?(o.lastQuery=e,s=o.sifter.search(e,O.extend(l,{score:r})),o.currentResults=s):s=O.extend(!0,{},o.currentResults),a.hideSelected)for(t=s.items.length-1;0<=t;t--)-1!==o.items.indexOf(I(s.items[t].id))&&s.items.splice(t,1);return s},
/**
         * Refreshes the list of available options shown
         * in the autocomplete dropdown menu.
         *
         * @param {boolean} triggerDropdown
         */
refreshOptions:function(e){var t,n,i,s,r,o,a,l,c,p,d,u,h,g,f,v;void 0===e&&(e=!0);var m=this,$=O.trim(m.$control_input.val()),y=m.search($),w=m.$dropdown_content,C=m.$activeOption&&I(m.$activeOption.attr("data-value"));for(
// build markup
s=y.items.length,"number"==typeof m.settings.maxOptions&&(s=Math.min(s,m.settings.maxOptions)),
// render and group available options individually
r={},o=[],t=0;t<s;t++)for(a=m.options[y.items[t].id],l=m.render("option",a),c=a[m.settings.optgroupField]||"",n=0,i=(p=O.isArray(c)?c:[c])&&p.length;n<i;n++)c=p[n],m.optgroups.hasOwnProperty(c)||(c=""),r.hasOwnProperty(c)||(r[c]=[],o.push(c)),r[c].push(l);
// sort optgroups
for(this.settings.lockOptgroupOrder&&o.sort(function(e,t){var n,i;return(m.optgroups[e].$order||0)-(m.optgroups[t].$order||0)}),
// render optgroup headers & join groups
d=[],t=0,s=o.length;t<s;t++)c=o[t],m.optgroups.hasOwnProperty(c)&&r[c].length?(
// render the optgroup header and options within it,
// then pass it to the wrapper template
u=m.render("optgroup_header",m.optgroups[c])||"",u+=r[c].join(""),d.push(m.render("optgroup",O.extend({},m.optgroups[c],{html:u})))):d.push(r[c].join(""));
// highlight matching terms inline
if(w.html(d.join("")),m.settings.highlight&&y.query.length&&y.tokens.length)for(t=0,s=y.tokens.length;t<s;t++)b(w,y.tokens[t].regex);
// add "selected" class to selected options
if(!m.settings.hideSelected)for(t=0,s=m.items.length;t<s;t++)m.getOption(m.items[t]).addClass("selected");
// add create option
(h=m.canCreate($))&&(w.prepend(m.render("option_create",{input:$})),v=O(w[0].childNodes[0])),
// activate
m.hasOptions=0<y.items.length||h,m.hasOptions?(0<y.items.length?((f=C&&m.getOption(C))&&f.length?g=f:"single"===m.settings.mode&&m.items.length&&(g=m.getOption(m.items[0])),g&&g.length||(g=v&&!m.settings.addPrecedence?m.getAdjacentOption(v,1):w.find("[data-selectable]:first"))):g=v,m.setActiveOption(g),e&&!m.isOpen&&m.open()):(m.setActiveOption(null),e&&m.isOpen&&m.close())},
/**
         * Adds an available option. If it already exists,
         * nothing will happen. Note: this does not refresh
         * the options list dropdown (use `refreshOptions`
         * for that).
         *
         * Usage:
         *
         *   this.addOption(data)
         *
         * @param {object|array} data
         */
addOption:function(e){var t,n,i,s=this;if(O.isArray(e))for(t=0,n=e.length;t<n;t++)s.addOption(e[t]);else(i=s.registerOption(e))&&(s.userOptions[i]=!0,s.lastQuery=null,s.trigger("option_add",i,e))},
/**
         * Registers an option to the pool of options.
         *
         * @param {object} data
         * @return {boolean|string}
         */
registerOption:function(e){var t=I(e[this.settings.valueField]);
// CHANGE
return null!=t&&!this.options.hasOwnProperty(t)&&(e.$order=e.$order||++this.order,this.options[t]=e,t)},
/**
         * Registers an option group to the pool of option groups.
         *
         * @param {object} data
         * @return {boolean|string}
         */
registerOptionGroup:function(e){var t=I(e[this.settings.optgroupValueField]);return!!t&&(e.$order=e.$order||++this.order,this.optgroups[t]=e,t)},
/**
         * Registers a new optgroup for options
         * to be bucketed into.
         *
         * @param {string} id
         * @param {object} data
         */
addOptionGroup:function(e,t){t[this.settings.optgroupValueField]=e,(e=this.registerOptionGroup(t))&&this.trigger("optgroup_add",e,t)},
/**
         * Removes an existing option group.
         *
         * @param {string} id
         */
removeOptionGroup:function(e){this.optgroups.hasOwnProperty(e)&&(delete this.optgroups[e],this.renderCache={},this.trigger("optgroup_remove",e))},
/**
         * Clears all existing option groups.
         */
clearOptionGroups:function(){this.optgroups={},this.renderCache={},this.trigger("optgroup_clear")},
/**
         * Updates an option available for selection. If
         * it is visible in the selected items or options
         * dropdown, it will be re-rendered automatically.
         *
         * @param {string} value
         * @param {object} data
         */
updateOption:function(e,t){var n=this,i,s,r,o,a,l,c;
// sanity checks
if(e=I(e),r=I(t[n.settings.valueField]),null!==e&&n.options.hasOwnProperty(e)){if("string"!=typeof r)throw new Error("Value must be set in option data");c=n.options[e].$order,
// update references
r!==e&&(delete n.options[e],-1!==(o=n.items.indexOf(e))&&n.items.splice(o,1,r)),t.$order=t.$order||c,n.options[r]=t,
// invalidate render cache
a=n.renderCache.item,l=n.renderCache.option,a&&(delete a[e],delete a[r]),l&&(delete l[e],delete l[r]),
// update the item if it's selected
-1!==n.items.indexOf(r)&&(i=n.getItem(e),s=O(n.render("item",t)),i.hasClass("active")&&s.addClass("active"),i.replaceWith(s)),
// invalidate last query because we might have updated the sortField
n.lastQuery=null,
// update dropdown contents
n.isOpen&&n.refreshOptions(!1)}},
/**
         * Removes a single option.
         *
         * @param {string} value
         * @param {boolean} silent
         */
removeOption:function(e,t){var n=this;e=I(e);var i=n.renderCache.item,s=n.renderCache.option;i&&delete i[e],s&&delete s[e],delete n.userOptions[e],delete n.options[e],n.lastQuery=null,n.trigger("option_remove",e),n.removeItem(e,t)},
/**
         * Clears all options.
         */
clearOptions:function(){var e=this;e.loadedSearches={},e.userOptions={},e.renderCache={},e.options=e.sifter.items={},e.lastQuery=null,e.trigger("option_clear"),e.clear()},
/**
         * Returns the jQuery element of the option
         * matching the given value.
         *
         * @param {string} value
         * @returns {object}
         */
getOption:function(e){return this.getElementWithValue(e,this.$dropdown_content.find("[data-selectable]"))},
/**
         * Returns the jQuery element of the next or
         * previous selectable option.
         *
         * @param {object} $option
         * @param {int} direction  can be 1 for next or -1 for previous
         * @return {object}
         */
getAdjacentOption:function(e,t){var n=this.$dropdown.find("[data-selectable]"),i=n.index(e)+t;return 0<=i&&i<n.length?n.eq(i):O()},
/**
         * Finds the first element with a "data-value" attribute
         * that matches the given value.
         *
         * @param {mixed} value
         * @param {object} $els
         * @return {object}
         */
getElementWithValue:function(e,t){if(null!=(e=I(e)))for(var n=0,i=t.length;n<i;n++)if(t[n].getAttribute("data-value")===e)return O(t[n]);return O()},
/**
         * Returns the jQuery element of the item
         * matching the given value.
         *
         * @param {string} value
         * @returns {object}
         */
getItem:function(e){return this.getElementWithValue(e,this.$control.children())},
/**
         * "Selects" multiple items at once. Adds them to the list
         * at the current caret position.
         *
         * @param {string} value
         * @param {boolean} silent
         */
addItems:function(e,t){for(var n=O.isArray(e)?e:[e],i=0,s=n.length;i<s;i++)this.isPending=i<s-1,this.addItem(n[i],t)},
/**
         * "Selects" an item. Adds it to the list
         * at the current caret position.
         *
         * @param {string} value
         * @param {boolean} silent
         */
addItem:function(c,p){var e;D(this,p?[]:["change"],function(){var e,t,n,i=this,s=i.settings.mode,r,o,a,l;c=I(c),-1===i.items.indexOf(c)?i.options.hasOwnProperty(c)&&("single"===s&&i.clear(p),"multi"===s&&i.isFull()||(e=O(i.render("item",i.options[c])),l=i.isFull(),i.items.splice(i.caretPos,0,c),i.insertAtCaret(e),(!i.isPending||!l&&i.isFull())&&i.refreshState(),i.isSetup&&(n=i.$dropdown_content.find("[data-selectable]"),
// update menu / remove the option (if this is not one item being added as part of series)
i.isPending||(t=i.getOption(c),a=i.getAdjacentOption(t,1).attr("data-value"),i.refreshOptions(i.isFocused&&"single"!==s),a&&i.setActiveOption(i.getOption(a))),
// hide the menu if the maximum number of items have been selected or no options are left
!n.length||i.isFull()?i.close():i.positionDropdown(),i.updatePlaceholder(),i.trigger("item_add",c,e),i.updateOriginalInput({silent:p})))):"single"===s&&i.close()})},
/**
         * Removes the selected item matching
         * the provided value.
         *
         * @param {string} value
         */
removeItem:function(e,t){var n=this,i,s,r;i="object"==typeof e?e:n.getItem(e),e=I(i.attr("data-value")),-1!==(s=n.items.indexOf(e))&&(i.remove(),i.hasClass("active")&&(r=n.$activeItems.indexOf(i[0]),n.$activeItems.splice(r,1)),n.items.splice(s,1),n.lastQuery=null,!n.settings.persist&&n.userOptions.hasOwnProperty(e)&&n.removeOption(e,t),s<n.caretPos&&n.setCaret(n.caretPos-1),n.refreshState(),n.updatePlaceholder(),n.updateOriginalInput({silent:t}),n.positionDropdown(),n.trigger("item_remove",e,i))},
/**
         * Invokes the `create` method provided in the
         * selectize options that should provide the data
         * for the new item, given the user input.
         *
         * Once this completes, it will be added
         * to the item list.
         *
         * @param {string} value
         * @param {boolean} [triggerDropdown]
         * @param {function} [callback]
         * @return {boolean}
         */
createItem:function(e,n){var i=this,s=i.caretPos;e=e||O.trim(i.$control_input.val()||"");var r=arguments[arguments.length-1];if("function"!=typeof r&&(r=function(){}),"boolean"!=typeof n&&(n=!0),!i.canCreate(e))return r(),!1;i.lock();var t="function"==typeof i.settings.create?this.settings.create:function(e){var t={};return t[i.settings.labelField]=e,t[i.settings.valueField]=e,t},o=P(function(e){if(i.unlock(),!e||"object"!=typeof e)return r();var t=I(e[i.settings.valueField]);if("string"!=typeof t)return r();i.setTextboxValue(""),i.addOption(e),i.setCaret(s),i.addItem(t),i.refreshOptions(n&&"single"!==i.settings.mode),r(e)}),a=t.apply(this,[e,o]);return void 0!==a&&o(a),!0},
/**
         * Re-renders the selected item lists.
         */
refreshItems:function(){this.lastQuery=null,this.isSetup&&this.addItem(this.items),this.refreshState(),this.updateOriginalInput()},
/**
         * Updates all state-dependent attributes
         * and CSS classes.
         */
refreshState:function(){var e,t=this;t.isRequired&&(t.items.length&&(t.isInvalid=!1),t.$control_input.prop("required",e)),t.refreshClasses()},
/**
         * Updates all state-dependent CSS classes.
         */
refreshClasses:function(){var e=this,t=e.isFull(),n=e.isLocked;e.$wrapper.toggleClass("rtl",e.rtl),e.$control.toggleClass("focus",e.isFocused).toggleClass("disabled",e.isDisabled).toggleClass("required",e.isRequired).toggleClass("invalid",e.isInvalid).toggleClass("locked",n).toggleClass("full",t).toggleClass("not-full",!t).toggleClass("input-active",e.isFocused&&!e.isInputHidden).toggleClass("dropdown-active",e.isOpen).toggleClass("has-options",!O.isEmptyObject(e.options)).toggleClass("has-items",0<e.items.length),e.$control_input.data("grow",!t&&!n)},
/**
         * Determines whether or not more items can be added
         * to the control without exceeding the user-defined maximum.
         *
         * @returns {boolean}
         */
isFull:function(){return null!==this.settings.maxItems&&this.items.length>=this.settings.maxItems},
/**
         * Refreshes the original <select> or <input>
         * element to reflect the current state.
         */
updateOriginalInput:function(e){var t,n,i,s,r=this;if(e=e||{},1===r.tagType){for(i=[],t=0,n=r.items.length;t<n;t++)s=r.options[r.items[t]][r.settings.labelField]||"",i.push('<option value="'+k(r.items[t])+'" selected="selected">'+k(s)+"</option>");i.length||this.$input.attr("multiple")||i.push('<option value="" selected="selected"></option>'),r.$input.html(i.join(""))}else r.$input.val(r.getValue()),r.$input.attr("value",r.$input.val());r.isSetup&&(e.silent||r.trigger("change",r.$input.val()))},
/**
         * Shows/hide the input placeholder depending
         * on if there items in the list already.
         */
updatePlaceholder:function(){if(this.settings.placeholder){var e=this.$control_input;this.items.length?e.removeAttr("placeholder"):e.attr("placeholder",this.settings.placeholder),e.triggerHandler("update",{force:!0})}},
/**
         * Shows the autocomplete dropdown containing
         * the available options.
         */
open:function(){var e=this;e.isLocked||e.isOpen||"multi"===e.settings.mode&&e.isFull()||(e.focus(),e.isOpen=!0,e.refreshState(),e.$dropdown.css({visibility:"hidden",display:"block"}),e.positionDropdown(),e.$dropdown.css({visibility:"visible"}),e.trigger("dropdown_open",e.$dropdown))},
/**
         * Closes the autocomplete dropdown menu.
         */
close:function(){var e=this,t=e.isOpen;"single"===e.settings.mode&&e.items.length&&e.hideInput(),e.isOpen=!1,e.$dropdown.hide(),e.setActiveOption(null),e.refreshState(),t&&e.trigger("dropdown_close",e.$dropdown)},
/**
         * Calculates and applies the appropriate
         * position of the dropdown.
         */
positionDropdown:function(){var e=this.$control,t="body"===this.settings.dropdownParent?e.offset():e.position();t.top+=e.outerHeight(!0),this.$dropdown.css({width:e.outerWidth(),top:t.top,left:t.left})},
/**
         * Resets / clears all selected items
         * from the control.
         *
         * @param {boolean} silent
         */
clear:function(e){var t=this;t.items.length&&(t.$control.children(":not(input)").remove(),t.items=[],t.lastQuery=null,t.setCaret(0),t.setActiveItem(null),t.updatePlaceholder(),t.updateOriginalInput({silent:e}),t.refreshState(),t.showInput(),t.trigger("clear"))},
/**
         * A helper method for inserting an element
         * at the current caret position.
         *
         * @param {object} $el
         */
insertAtCaret:function(e){var t=Math.min(this.caretPos,this.items.length);0===t?this.$control.prepend(e):O(this.$control[0].childNodes[t]).before(e),this.setCaret(t+1)},
/**
         * Removes the current selected item(s).
         *
         * @param {object} e (optional)
         * @returns {boolean}
         */
deleteSelection:function(e){var t,n,i,s,r,o,a,l,c,p=this;if(i=e&&8===e.keyCode?-1:1,s=z(p.$control_input[0]),p.$activeOption&&!p.settings.hideSelected&&(a=p.getAdjacentOption(p.$activeOption,-1).attr("data-value")),
// determine items that will be removed
r=[],p.$activeItems.length){for(c=p.$control.children(".active:"+(0<i?"last":"first")),o=p.$control.children(":not(input)").index(c),0<i&&o++,t=0,n=p.$activeItems.length;t<n;t++)r.push(O(p.$activeItems[t]).attr("data-value"));e&&(e.preventDefault(),e.stopPropagation())}else(p.isFocused||"single"===p.settings.mode)&&p.items.length&&(i<0&&0===s.start&&0===s.length?r.push(p.items[p.caretPos-1]):0<i&&s.start===p.$control_input.val().length&&r.push(p.items[p.caretPos]));
// allow the callback to abort
if(!r.length||"function"==typeof p.settings.onDelete&&!1===p.settings.onDelete.apply(p,[r]))return!1;
// perform removal
for(void 0!==o&&p.setCaret(o);r.length;)p.removeItem(r.pop());return p.showInput(),p.positionDropdown(),p.refreshOptions(!0),
// select previous option
a&&(l=p.getOption(a)).length&&p.setActiveOption(l),!0},
/**
         * Selects the previous / next item (depending
         * on the `direction` argument).
         *
         * > 0 - right
         * < 0 - left
         *
         * @param {int} direction
         * @param {object} e (optional)
         */
advanceSelection:function(e,t){var n,i,s,r,o,a,l=this;0!==e&&(l.rtl&&(e*=-1),n=0<e?"last":"first",i=z(l.$control_input[0]),l.isFocused&&!l.isInputHidden?(r=l.$control_input.val().length,(o=e<0?0===i.start&&0===i.length:i.start===r)&&!r&&l.advanceCaret(e,t)):(a=l.$control.children(".active:"+n)).length&&(s=l.$control.children(":not(input)").index(a),l.setActiveItem(null),l.setCaret(0<e?s+1:s)))},
/**
         * Moves the caret left / right.
         *
         * @param {int} direction
         * @param {object} e (optional)
         */
advanceCaret:function(e,t){var n=this,i,s;0!==e&&(i=0<e?"next":"prev",n.isShiftDown?(s=n.$control_input[i]()).length&&(n.hideInput(),n.setActiveItem(s),t&&t.preventDefault()):n.setCaret(n.caretPos+e))},
/**
         * Moves the caret to the specified index.
         *
         * @param {int} i
         */
setCaret:function(e){var t=this,n,i,s,r,o;if(e="single"===t.settings.mode?t.items.length:Math.max(0,Math.min(t.items.length,e)),!t.isPending)for(n=0,i=(r=t.$control.children(":not(input)")).length;n<i;n++)o=O(r[n]).detach(),n<e?t.$control_input.before(o):t.$control.append(o);t.caretPos=e},
/**
         * Disables user input on the control. Used while
         * items are being asynchronously created.
         */
lock:function(){this.close(),this.isLocked=!0,this.refreshState()},
/**
         * Re-enables user input on the control.
         */
unlock:function(){this.isLocked=!1,this.refreshState()},
/**
         * Disables user input on the control completely.
         * While disabled, it cannot receive focus.
         */
disable:function(){var e=this;e.$input.prop("disabled",!0),e.$control_input.prop("disabled",!0).prop("tabindex",-1),e.isDisabled=!0,e.lock()},
/**
         * Enables the control so that it can respond
         * to focus and user input.
         */
enable:function(){var e=this;e.$input.prop("disabled",!1),e.$control_input.prop("disabled",!1).prop("tabindex",e.tabIndex),e.isDisabled=!1,e.unlock()},
/**
         * Completely destroys the control and
         * unbinds all event listeners so that it can
         * be garbage collected.
         */
destroy:function(){var e=this,t=e.eventNS,n=e.revertSettings;e.trigger("destroy"),e.off(),e.$wrapper.remove(),e.$dropdown.remove(),e.$input.html("").append(n.$children).removeAttr("tabindex").removeClass("selectized").attr({tabindex:n.tabindex}).show(),e.$control_input.removeData("grow"),e.$input.removeData("selectize"),O(window).off(t),O(document).off(t),O(document.body).off(t),delete e.$input[0].selectize},
/**
         * A helper method for rendering "item" and
         * "option" templates, given the data.
         *
         * @param {string} templateName
         * @param {object} data
         * @returns {string}
         */
render:function(e,t){var n,i,s,r="",o=!1,a=this,l=/^[\t \r\n]*<([a-z][a-z0-9\-_]*(?:\:[a-z][a-z0-9\-_]*)?)/i;
// pull markup from cache if it exists
return"option"!==e&&"item"!==e||(o=!!(n=I(t[a.settings.valueField]))),o&&(S(a.renderCache[e])||(a.renderCache[e]={}),a.renderCache[e].hasOwnProperty(n))?a.renderCache[e][n]:(
// render markup
r=a.settings.render[e].apply(this,[t,k]),
// add mandatory attributes
"option"!==e&&"option_create"!==e||(r=r.replace(l,"<$1 data-selectable")),"optgroup"===e&&(i=t[a.settings.optgroupValueField]||"",r=r.replace(l,'<$1 data-group="'+_(k(i))+'"')),"option"!==e&&"item"!==e||(r=r.replace(l,'<$1 data-value="'+_(k(n||""))+'"')),
// update cache
o&&(a.renderCache[e][n]=r),r)},
/**
         * Clears the render cache for a template. If
         * no template is given, clears all render
         * caches.
         *
         * @param {string} templateName
         */
clearCache:function(e){var t=this;void 0===e?t.renderCache={}:delete t.renderCache[e]},
/**
         * Determines whether or not to display the
         * create item prompt, given a user input.
         *
         * @param {string} input
         * @return {boolean}
         */
canCreate:function(e){var t=this;if(!t.settings.create)return!1;var n=t.settings.createFilter;return e.length&&("function"!=typeof n||n.apply(t,[e]))&&("string"!=typeof n||new RegExp(n).test(e))&&(!(n instanceof RegExp)||n.test(e))}}),E.count=0,E.defaults={options:[],optgroups:[],plugins:[],delimiter:",",splitOn:null,// regexp or string for splitting up values from a paste command
persist:!0,diacritics:!0,create:!1,createOnBlur:!1,createFilter:null,highlight:!0,openOnFocus:!0,maxOptions:1e3,maxItems:null,hideSelected:null,addPrecedence:!1,selectOnTab:!1,preload:!1,allowEmptyOption:!1,closeAfterSelect:!1,scrollDuration:60,loadThrottle:300,loadingClass:"loading",dataAttr:"data-data",optgroupField:"optgroup",valueField:"value",labelField:"text",optgroupLabelField:"label",optgroupValueField:"value",lockOptgroupOrder:!1,sortField:"$order",searchField:["text"],searchConjunction:"and",mode:null,wrapperClass:"selectize-control",inputClass:"selectize-input",dropdownClass:"selectize-dropdown",dropdownContentClass:"selectize-dropdown-content",dropdownParent:null,copyClassesToDropdown:!0,
/*
        load                 : null, // function(query, callback) { ... }
        score                : null, // function(search) { ... }
        onInitialize         : null, // function() { ... }
        onChange             : null, // function(value) { ... }
        onItemAdd            : null, // function(value, $item) { ... }
        onItemRemove         : null, // function(value) { ... }
        onClear              : null, // function() { ... }
        onOptionAdd          : null, // function(value, data) { ... }
        onOptionRemove       : null, // function(value) { ... }
        onOptionClear        : null, // function() { ... }
        onOptionGroupAdd     : null, // function(id, data) { ... }
        onOptionGroupRemove  : null, // function(id) { ... }
        onOptionGroupClear   : null, // function() { ... }
        onDropdownOpen       : null, // function($dropdown) { ... }
        onDropdownClose      : null, // function($dropdown) { ... }
        onType               : null, // function(str) { ... }
        onDelete             : null, // function(values) { ... }
        */
render:{
/*
            item: null,
            optgroup: null,
            optgroup_header: null,
            option: null,
            option_create: null
            */}},O.fn.selectize=function(r){var o=O.fn.selectize.defaults,u=O.extend({},o,r),h=u.dataAttr,g=u.labelField,f=u.valueField,v=u.optgroupField,m=u.optgroupLabelField,$=u.optgroupValueField,a=function(e,t){var n,i,s,r,o=e.attr(h);if(o)for(t.options=JSON.parse(o),n=0,i=t.options.length;n<i;n++)t.items.push(t.options[n][f]);else{var a=O.trim(e.val()||"");if(!u.allowEmptyOption&&!a.length)return;for(n=0,i=(s=a.split(u.delimiter)).length;n<i;n++)(r={})[g]=s[n],r[f]=s[n],t.options.push(r);t.items=s}},l=function(e,o){var t,n,i,s,r=0,a=o.options,l={},c=function(e){var t=h&&e.attr(h);return"string"==typeof t&&t.length?JSON.parse(t):null},p=function(e,t){e=O(e);var n=I(e.attr("value"));if(n||u.allowEmptyOption)
// if the option already exists, it's probably been
// duplicated in another optgroup. in this case, push
// the current group to the "optgroup" property on the
// existing option so that it's rendered in both places.
if(l.hasOwnProperty(n)){if(t){var i=l[n][v];i?O.isArray(i)?i.push(t):l[n][v]=[i,t]:l[n][v]=t}}else{var s=c(e)||{};s[g]=s[g]||e.text(),s[f]=s[f]||n,s[v]=s[v]||t,l[n]=s,a.push(s),e.is(":selected")&&o.items.push(n)}},d=function(e){var t,n,i,s,r;for((i=(e=O(e)).attr("label"))&&((s=c(e)||{})[m]=i,s[$]=i,o.optgroups.push(s)),t=0,n=(r=O("option",e)).length;t<n;t++)p(r[t],i)};for(o.maxItems=e.attr("multiple")?null:1,t=0,n=(s=e.children()).length;t<n;t++)"optgroup"===(i=s[t].tagName.toLowerCase())?d(s[t]):"option"===i&&p(s[t])};return this.each(function(){if(!this.selectize){var e,t=O(this),n=this.tagName.toLowerCase(),i=t.attr("placeholder")||t.attr("data-placeholder");i||u.allowEmptyOption||(i=t.children('option[value=""]').text());var s={placeholder:i,options:[],optgroups:[],items:[]};"select"===n?l(t,s):a(t,s),e=new E(t,O.extend(!0,{},o,s,r))}})},O.fn.selectize.defaults=E.defaults,O.fn.selectize.support={validity:x},E.define("drag_drop",function(e){if(!O.fn.sortable)throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');if("multi"===this.settings.mode){var i=this,t,n,s;i.lock=(t=i.lock,function(){var e=i.$control.data("sortable");return e&&e.disable(),t.apply(i,arguments)}),i.unlock=(n=i.unlock,function(){var e=i.$control.data("sortable");return e&&e.enable(),n.apply(i,arguments)}),i.setup=(s=i.setup,function(){s.apply(this,arguments);var n=i.$control.sortable({items:"[data-value]",forcePlaceholderSize:!0,disabled:i.isLocked,start:function(e,t){t.placeholder.css("width",t.helper.css("width")),n.css({overflow:"visible"})},stop:function(){n.css({overflow:"hidden"});var e=i.$activeItems?i.$activeItems.slice():null,t=[];n.children("[data-value]").each(function(){t.push(O(this).attr("data-value"))}),i.setValue(t),i.setActiveItem(e)}})})}}),E.define("dropdown_header",function(e){var t=this,n;e=O.extend({title:"Untitled",headerClass:"selectize-dropdown-header",titleRowClass:"selectize-dropdown-header-title",labelClass:"selectize-dropdown-header-label",closeClass:"selectize-dropdown-header-close",html:function(e){return'<div class="'+e.headerClass+'"><div class="'+e.titleRowClass+'"><span class="'+e.labelClass+'">'+e.title+'</span><a href="javascript:void(0)" class="'+e.closeClass+'">&times;</a></div></div>'}},e),t.setup=(n=t.setup,function(){n.apply(t,arguments),t.$dropdown_header=O(e.html(e)),t.$dropdown.prepend(t.$dropdown_header)})}),E.define("optgroup_columns",function(a){var l=this,r;a=O.extend({equalizeWidth:!0,equalizeHeight:!0},a),this.getAdjacentOption=function(e,t){var n=e.closest("[data-group]").find("[data-selectable]"),i=n.index(e)+t;return 0<=i&&i<n.length?n.eq(i):O()},this.onKeyDown=(r=l.onKeyDown,function(e){var t,n,i,s;return!this.isOpen||37!==e.keyCode&&39!==e.keyCode?r.apply(this,arguments):(l.ignoreHover=!0,t=(s=this.$activeOption.closest("[data-group]")).find("[data-selectable]").index(this.$activeOption),void((n=(i=(s=37===e.keyCode?s.prev("[data-group]"):s.next("[data-group]")).find("[data-selectable]")).eq(Math.min(i.length-1,t))).length&&this.setActiveOption(n)))});var c=function(){var e,t=c.width,n=document;return void 0===t&&((e=n.createElement("div")).innerHTML='<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>',e=e.firstChild,n.body.appendChild(e),t=c.width=e.offsetWidth-e.clientWidth,n.body.removeChild(e)),t},e=function(){var e,t,n,i,s,r,o;if((t=(o=O("[data-group]",l.$dropdown_content)).length)&&l.$dropdown_content.width()){if(a.equalizeHeight){for(e=n=0;e<t;e++)n=Math.max(n,o.eq(e).height());o.css({height:n})}a.equalizeWidth&&(r=l.$dropdown_content.innerWidth()-c(),i=Math.round(r/t),o.css({width:i}),1<t&&(s=r-i*(t-1),o.eq(t-1).css({width:s})))}};(a.equalizeHeight||a.equalizeWidth)&&(F.after(this,"positionDropdown",e),F.after(this,"refreshOptions",e))}),E.define("remove_button",function(e){if("single"!==this.settings.mode){e=O.extend({label:"&times;",title:"Remove",className:"remove",append:!0},e);var n=this,i='<a href="javascript:void(0)" class="'+e.className+'" tabindex="-1" title="'+k(e.title)+'">'+e.label+"</a>",s=function(e,t){var n=e.search(/(<\/[^>]+>\s*)$/);return e.substring(0,n)+t+e.substring(n)},r;this.setup=(r=n.setup,function(){
// override the item rendering method to add the button to each
if(e.append){var t=n.settings.render.item;n.settings.render.item=function(e){return s(t.apply(this,arguments),i)}}r.apply(this,arguments),
// add event listener
this.$control.on("click","."+e.className,function(e){if(e.preventDefault(),!n.isLocked){var t=O(e.currentTarget).parent();n.setActiveItem(t),n.deleteSelection()&&n.setCaret(n.items.length)}})})}}),E.define("restore_on_backspace",function(i){var e=this,s;i.text=i.text||function(e){return e[this.settings.labelField]},this.onKeyDown=(s=e.onKeyDown,function(e){var t,n;return 8===e.keyCode&&""===this.$control_input.val()&&!this.$activeItems.length&&0<=(t=this.caretPos-1)&&t<this.items.length?(n=this.options[this.items[t]],this.deleteSelection(e)&&(this.setTextboxValue(i.text.apply(this,[n])),this.refreshOptions(!0)),void e.preventDefault()):s.apply(this,arguments)})}),E}),// ==========================================================================
// Feed Me Plugin for Craft CMS
// Author: Verbb - https://verbb.io/
// ==========================================================================
// @codekit-prepend "_help.js"    
// @codekit-prepend "_selectize.js" 
void 0===Craft.FeedMe&&(Craft.FeedMe={}),$(function(){var e;
//
// Field Mapping
//
// For field-mapping, auto-select Title if no unique checkboxes are set
(
// Settings pane toggle for feeds index
$(document).on("click","#feeds .settings",function(e){e.preventDefault();var t=$(this).parents("tr").data("id")+"-settings",n;$('tr[data-id="'+t+'"] .settings-pane').toggle()}),
// Toggle various field when changing element type
$(document).on("change","#elementType",function(){$(".element-select").hide();var e=$(this).val().replace(/\\/g,"-");$('.element-select[data-type="'+e+'"]').show()}),$("#elementType").trigger("change"),
// Toggle the Entry Type field when changing the section select
$(document).on("change",".element-parent-group select",function(){var e,t,n=$(this).parents(".element-sub-group").data("items")["item_"+$(this).val()],i=$(".element-child-group select").val(),s='<option value="">'+Craft.t("feed-me","None")+"</option>";$.each(n,function(e,t){e&&(s+='<option value="'+e+'">'+t+"</option>")}),$(".element-child-group select").html(s),
// Select the first non-empty, or pre-selected
i?$(".element-child-group select").val(i):$($(".element-child-group select").children()[1]).attr("selected",!0)}),$(".element-parent-group select").trigger("change"),$(".feedme-uniques").length)&&($('.feedme-uniques input[type="checkbox"]:checked').length||$('.feedme-uniques input[type="checkbox"]:first').prop("checked",!0));
// For Assets, only show the upload options if we decide to upload
$(".assets-uploads input").on("change",function(e){var t=$(this).parents(".field-extra-settings").find(".select"),n=$(this).parents(".field-extra-settings").find(".asset-label-hide");$(this).prop("checked")?(n.css({opacity:1,visibility:"visible"}),t.css({opacity:1,visibility:"visible"})):(n.css({opacity:0,visibility:"hidden"}),t.css({opacity:0,visibility:"hidden"}))}),
// On-load, hide/show upload options
$(".assets-uploads input").trigger("change"),
// For elements, show the grouping select(s)
$(".field-extra-settings .element-create input").on("change",function(e){var t=$(this).parents(".field-extra-settings").find(".element-groups");$(this).prop("checked")?t.show():t.hide()}),$(".field-extra-settings .element-create input").trigger("change"),
// Toggle various field when changing element type
$(".field-extra-settings .element-group-section select").on("change",function(e){var t=$(this).parents(".field-extra-settings").find(".element-group-entrytype"),n,i,s=t.data("items")["item_"+$(this).val()],r="";$.each(s,function(e,t){e&&(r+='<option value="'+e+'">'+t+"</option>")}),t.find("select").html(r)}),
// Selectize inputs
$(".feedme-mapping .selectize select").selectize({allowEmptyOption:!0}),
// Help with sub-element field toggle
$(".subelement-toggle label").on("click",function(e){var t;$(this).parents(".subelement-toggle").find(".lightswitch").data("lightswitch").toggle()}),
// Show initially hidden element sub-fields. A little tricky because they're in a table, and all equal siblings
$(".subelement-toggle .lightswitch").on("change",function(e){var t=$(this).data("lightswitch"),n,i;$(this).parents("tr").nextUntil(":not(.element-sub-field)").toggle()}),
// If we have any element sub-fields that are being mapped, we want to show the panel to notify users they're mapping stuff
$(".element-sub-field").each(function(e,t){var n,i,s=[$(this).find(".col-map select").val(),$(this).find(".col-default input").val()],r=!1,o,a;(
// Check for inputs and selects which have a value
$.each(s,function(e,t){""!=t&&"noimport"!=t&&void 0!==t&&(r=!0)}),r)&&$(this).prevUntil(":not(.element-sub-field)").addBack().prev().find(".lightswitch").data("lightswitch").turnOn()}),
//
// Logs
//
$(document).on("click",".log-detail-link",function(e){e.preventDefault();var t=$(this).data("key");$('tr[data-key="'+t+'"]').toggleClass("hidden")}),
// Allow multiple submit actions, that trigger different actions as required
$(document).on("click","input[data-action]",function(e){var t=$(this).parents("form"),n=$(this).data("action");t.find('input[name="action"]').val(n),t.submit()}),
// A nice loading animation on the success page for feeds
new Craft.FeedMe.TaskProgress}),function(){var t='<div><span data-icon="check"></span> '+Craft.t("feed-me","Processing complete!")+'</div><div class="feedme-success-btns"><a class="btn submit" href="'+Craft.getUrl("feed-me/feeds")+'">Back to Feeds</a><a class="btn" href="'+Craft.getUrl("feed-me/logs")+'">View logs</a></div>';Craft.FeedMe.TaskProgress=Garnish.Base.extend({runningTask:null,$spinnerScreen:null,$pendingScreen:null,$runningScreen:null,init:function(){this.$spinnerScreen=$(".feedme-status-spinner"),this.$pendingScreen=$(".feedme-fullpage.fullpage-waiting"),this.$runningScreen=$(".feedme-fullpage.fullpage-running"),this.updateTasks()},updateTasks:function(){Craft.postActionRequest("queue/get-job-info",$.proxy(function(e,t){"success"==t&&this.showTaskInfo(e[0])},this))},showTaskInfo:function(e){this.$spinnerScreen.addClass("hidden"),e?(this.$runningScreen.removeClass("hidden"),this.runningTask?this.runningTask.updateStatus(e):this.runningTask=new Craft.FeedMe.TaskProgress.Task(e),"error"!=e.status&&
// Keep checking for the task status every 500ms
setTimeout($.proxy(this,"updateTasks"),500)):this.runningTask?
// Task has now completed, show the UI
this.runningTask.complete():this.$pendingScreen.hasClass("cp-triggered")?(
// If this case has happened, its often the task has finished so quickly before an Ajax request
// to the tasks controller has a chance to fire. But, we track when the user submits the 'run' action
// through a flash variable. Technically, its finished - otherwise we end up showing the 'pending'
// screen, which is a little confusing to the user. Simply show its completed
this.$runningScreen.removeClass("hidden"),this.$runningScreen.find(".progress-container").html(t)):
// Show the pending screen, there are no tasks in queue, and a task isn't currently running
this.$pendingScreen.removeClass("hidden")}}),Craft.FeedMe.TaskProgress.Task=Garnish.Base.extend({progressBar:null,init:function(e){this.$statusContainer=$(".feedme-fullpage.fullpage-running .progress-container"),this.$statusContainer.empty(),this.progressBar=new Craft.ProgressBar(this.$statusContainer),this.progressBar.showProgressBar(),this.updateStatus(e)},updateStatus:function(e){this.progressBar.setProgressPercentage(e.progress),"error"==e.status&&this.fail()},complete:function(){this.progressBar.setProgressPercentage(100),setTimeout($.proxy(this,"success"),300)},success:function(){this.$statusContainer.html(t)},fail:function(){this.$statusContainer.html('<div class="error">'+Craft.t("feed-me",'Processing failed. <a class="go" href="'+Craft.getUrl("feed-me/logs")+'">View logs</a>')+"</div>")}})}();