/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Bar','./InstanceManager','./AssociativeOverflowToolbar','./ToolbarSpacer','./library','sap/ui/core/Control','sap/ui/core/IconPool','sap/ui/core/Popup','sap/ui/core/delegate/ScrollEnablement','sap/ui/core/theming/Parameters','sap/ui/core/RenderManager','sap/ui/core/InvisibleText'],function(q,B,I,A,T,l,C,a,P,S,b,R,c){"use strict";var V=sap.ui.core.ValueState;var d=sap.ui.Device.browser.internet_explorer&&(sap.ui.Device.browser.version<10);var D=C.extend("sap.m.Dialog",{metadata:{interfaces:["sap.ui.core.PopupInterface"],library:"sap.m",properties:{icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},title:{type:"string",group:"Appearance",defaultValue:null},showHeader:{type:"boolean",group:"Appearance",defaultValue:true},type:{type:"sap.m.DialogType",group:"Appearance",defaultValue:sap.m.DialogType.Standard},state:{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:V.None},stretchOnPhone:{type:"boolean",group:"Appearance",defaultValue:false,deprecated:true},stretch:{type:"boolean",group:"Appearance",defaultValue:false},contentWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},contentHeight:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},horizontalScrolling:{type:"boolean",group:"Behavior",defaultValue:true},verticalScrolling:{type:"boolean",group:"Behavior",defaultValue:true},resizable:{type:"boolean",group:"Behavior",defaultValue:false},draggable:{type:"boolean",group:"Behavior",defaultValue:false}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},subHeader:{type:"sap.m.IBar",multiple:false},customHeader:{type:"sap.m.IBar",multiple:false},beginButton:{type:"sap.m.Button",multiple:false},endButton:{type:"sap.m.Button",multiple:false},buttons:{type:"sap.m.Button",multiple:true,singularName:"button"},_header:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_title:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_icon:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_toolbar:{type:"sap.m.OverflowToolbar",multiple:false,visibility:"hidden"},_valueState:{type:"sap.ui.core.InvisibleText",multiple:false,visibility:"hidden"}},associations:{leftButton:{type:"sap.m.Button",multiple:false,deprecated:true},rightButton:{type:"sap.m.Button",multiple:false,deprecated:true},initialFocus:{type:"sap.ui.core.Control",multiple:false},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{beforeOpen:{},afterOpen:{},beforeClose:{parameters:{origin:{type:"sap.m.Button"}}},afterClose:{parameters:{origin:{type:"sap.m.Button"}}}}}});D._bPaddingByDefault=(sap.ui.getCore().getConfiguration().getCompatibilityVersion("sapMDialogWithPadding").compareTo("1.16")<0);D._mStateClasses={};D._mStateClasses[V.None]="";D._mStateClasses[V.Success]="sapMDialogSuccess";D._mStateClasses[V.Warning]="sapMDialogWarning";D._mStateClasses[V.Error]="sapMDialogError";D._mIcons={};D._mIcons[V.Success]=a.getIconURI("message-success");D._mIcons[V.Warning]=a.getIconURI("message-warning");D._mIcons[V.Error]=a.getIconURI("message-error");D.prototype.init=function(){var t=this;this._externalIcon=undefined;this._oManuallySetSize=null;this._oManuallySetPosition=null;this._bRTL=sap.ui.getCore().getConfiguration().getRTL();this._scrollContentList=["NavContainer","Page","ScrollContainer"];this.oPopup=new P();this.oPopup.setShadow(true);this.oPopup.setNavigationMode("SCOPE");if(q.device.is.iphone&&!this._bMessageType){this.oPopup.setModal(true,"sapMDialogTransparentBlk");}else{this.oPopup.setModal(true,"sapMDialogBlockLayerInit");}this.oPopup.setAnimations(q.proxy(this._openAnimation,this),q.proxy(this._closeAnimation,this));this.oPopup.onsapescape=q.proxy(function(e){if(e.originalEvent&&e.originalEvent._sapui_handledByControl){return;}this.close();e.stopPropagation();},this);this.oPopup._applyPosition=function(p,F){t._setDimensions();t._adjustScrollingPane();p.at={left:t._oManuallySetPosition?t._oManuallySetPosition.x:'50%',top:t._oManuallySetPosition?t._oManuallySetPosition.y:'50%'};t._deregisterContentResizeHandler();P.prototype._applyPosition.call(this,p);t._registerContentResizeHandler();};if(D._bPaddingByDefault){this.addStyleClass("sapUiPopupWithPadding");}};D.prototype.onBeforeRendering=function(){if(this._hasSingleScrollableContent()){this.setProperty("verticalScrolling",false);this.setProperty("horizontalScrolling",false);q.sap.log.info("VerticalScrolling and horizontalScrolling in sap.m.Dialog with ID "+this.getId()+" has been disabled because there's scrollable content inside");}else if(!this._oScroller){this._oScroller=new S(this,this.getId()+"-scroll",{horizontal:this.getHorizontalScrolling(),vertical:this.getVerticalScrolling()});}this._createToolbarButtons();if(sap.ui.getCore().getConfiguration().getAccessibility()&&this.getState()!=V.None){var v=new c({text:this.getValueStateString(this.getState())});this.setAggregation("_valueState",v);this.addAriaLabelledBy(v.getId());}};D.prototype.onAfterRendering=function(){this._$scrollPane=this.$("scroll");this._$content=this.$("cont");this._$dialog=this.$();if(this.isOpen()){this._setInitialFocus();}if(this.getType()===sap.m.DialogType.Message||(sap.ui.Device.system.phone&&!this.getStretch())){this.$("footer").removeClass("sapContrast sapContrastPlus");}};D.prototype.exit=function(){I.removeDialogInstance(this);this._deregisterContentResizeHandler();this._deregisterResizeHandler();if(this.oPopup){this.oPopup.detachOpened(this._handleOpened,this);this.oPopup.detachClosed(this._handleClosed,this);this.oPopup.destroy();this.oPopup=null;}if(this._oScroller){this._oScroller.destroy();this._oScroller=null;}if(this._header){this._header.destroy();this._header=null;}if(this._headerTitle){this._headerTitle.destroy();this._headerTitle=null;}if(this._iconImage){this._iconImage.destroy();this._iconImage=null;}};D.prototype.open=function(){var p=this.oPopup;p.setInitialFocusId(this.getId());if(p.isOpen()){return this;}this._oCloseTrigger=null;this.fireBeforeOpen();p.attachOpened(this._handleOpened,this);p.setContent(this);p.open();this._registerResizeHandler();I.addDialogInstance(this);return this;};D.prototype.close=function(){this.$().removeClass('sapDialogDisableTransition');this._deregisterResizeHandler();var p=this.oPopup;var e=this.oPopup.getOpenState();if(!(e===sap.ui.core.OpenState.CLOSED||e===sap.ui.core.OpenState.CLOSING)){sap.m.closeKeyboard();this.fireBeforeClose({origin:this._oCloseTrigger});p.attachClosed(this._handleClosed,this);this._bDisableRepositioning=false;this._oManuallySetPosition=null;this._oManuallySetSize=null;p.close();this._deregisterContentResizeHandler();}return this;};D.prototype.isOpen=function(){return this.oPopup&&this.oPopup.isOpen();};D.prototype._handleOpened=function(){this.oPopup.detachOpened(this._handleOpened,this);this._setInitialFocus();this.fireAfterOpen();};D.prototype._handleClosed=function(){if(!this.oPopup){return;}this.oPopup.detachClosed(this._handleClosed,this);if(this.getDomRef()){R.preserveContent(this.getDomRef());this.$().remove();}I.removeDialogInstance(this);this.fireAfterClose({origin:this._oCloseTrigger});};D.prototype.onfocusin=function(e){var s=e.target;if(s.id===this.getId()+"-firstfe"){var L=this.$("footer").lastFocusableDomRef()||this.$("cont").lastFocusableDomRef()||(this.getSubHeader()&&this.getSubHeader().$().firstFocusableDomRef())||(this._getAnyHeader()&&this._getAnyHeader().$().lastFocusableDomRef());if(L){q.sap.focus(L);}}else if(s.id===this.getId()+"-lastfe"){var F=(this._getAnyHeader()&&this._getAnyHeader().$().firstFocusableDomRef())||(this.getSubHeader()&&this.getSubHeader().$().firstFocusableDomRef())||this.$("cont").firstFocusableDomRef()||this.$("footer").firstFocusableDomRef();if(F){q.sap.focus(F);}}};D.prototype._openAnimation=function(r,i,o){r.addClass("sapMDialogOpen");if(d){r.fadeIn(200,o);}else{r.css("display","block");setTimeout(o,210);}};D.prototype._closeAnimation=function(r,i,e){r.removeClass("sapMDialogOpen");if(d){r.fadeOut(200,e);}else{setTimeout(e,210);}};D.prototype._setDimensions=function(){var $=this.$(),s=this.getStretch(),e=this.getStretchOnPhone()&&sap.ui.Device.system.phone,m=this._bMessageType,o={};if(!s){if(!this._oManuallySetSize){o.width=this.getContentWidth()||undefined;o.height=this.getContentHeight()||undefined;}else{o.width=this._oManuallySetSize.width;o.height=this._oManuallySetSize.height;}}if(o.width=='auto'){o.width=undefined;}if(o.height=='auto'){o.height=undefined;}if((s&&!m)||(e)){this.$().addClass('sapMDialogStretched');}$.css(o);if(!s&&!this._oManuallySetSize&&!this._bDisableRepositioning){this._applyCustomTranslate();}if(window.navigator.userAgent.toLowerCase().indexOf("chrome")!==-1&&this.getStretch()){$.find('> footer').css({bottom:'0.001px'});}};D.prototype._adjustScrollingPane=function(){if(this._oScroller){this._oScroller.refresh();}};D.prototype._reposition=function(){};D.prototype._repositionAfterOpen=function(){};D.prototype._reapplyPosition=function(){this._adjustScrollingPane();};D.prototype._onResize=function(){var $=this.$(),e=this.$('cont'),s=this.getContentHeight(),i,g,h;if(this._oManuallySetSize){return;}if(!s||s=='auto'){e.css({height:'auto'});i=parseFloat($.height());g=parseFloat($.css("border-top-width"));h=parseFloat($.css("border-bottom-width"));e.height(Math.round(i+g+h));}if(!this.getStretch()&&!this._oManuallySetSize&&!this._bDisableRepositioning){this._applyCustomTranslate();}};D.prototype._applyCustomTranslate=function(){var $=this.$(),t,s,i=$.innerWidth(),e=$.innerHeight();if(sap.ui.Device.system.desktop&&(i%2!==0||e%2!==0)){if(!this._bRTL){t='-'+Math.floor(i/2)+"px";}else{t=Math.floor(i/2)+"px";}s='-'+Math.floor(e/2)+"px";$.css('transform','translate('+t+','+s+') scale(1)');}else{$.css('transform','');}};D.prototype._createHeader=function(){if(!this._header){this._header=new B(this.getId()+"-header").addStyleClass("sapMDialogTitle");this.setAggregation("_header",this._header,false);}};D.prototype._hasSingleScrollableContent=function(){var e=this.getContent(),i;while(e.length===1&&e[0]instanceof sap.ui.core.mvc.View){e=e[0].getContent();}if(e.length===1){for(i=0;i<this._scrollContentList.length;i++){if(e[0]instanceof sap.m[this._scrollContentList[i]]){return true;}}}return false;};D.prototype._initBlockLayerAnimation=function(){this.oPopup._hideBlockLayer=function(){var $=q("#sap-ui-blocklayer-popup");$.removeClass("sapMDialogTransparentBlk");P.prototype._hideBlockLayer.call(this);};};D.prototype._clearBlockLayerAnimation=function(){if(q.device.is.iphone&&!this._bMessageType){delete this.oPopup._showBlockLayer;this.oPopup._hideBlockLayer=function(){var $=q("#sap-ui-blocklayer-popup");$.removeClass("sapMDialogTransparentBlk");P.prototype._hideBlockLayer.call(this);};}};D.prototype._getFocusId=function(){return this.getInitialFocus()||this._getFirstFocusableContentSubHeader()||this._getFirstFocusableContentElementId()||this._getFirstVisibleButtonId()||this.getId();};D.prototype._getFirstVisibleButtonId=function(){var o=this.getBeginButton(),e=this.getEndButton(),g=this.getButtons(),s="";if(o&&o.getVisible()){s=o.getId();}else if(e&&e.getVisible()){s=e.getId();}else if(g&&g.length>0){for(var i=0;i<g.length;i++){if(g[i].getVisible()){s=g[i].getId();break;}}}return s;};D.prototype._getFirstFocusableContentSubHeader=function(){var $=this.$().find('.sapMDialogSubHeader');var r;var F=$.firstFocusableDomRef();if(F){r=F.id;}return r;};D.prototype._getFirstFocusableContentElementId=function(){var r="";var $=this.$("cont");var F=$.firstFocusableDomRef();if(F){r=F.id;}return r;};D.prototype._setInitialFocus=function(){var F=this._getFocusId();var o=sap.ui.getCore().byId(F);var e;if(o){if(!o.getVisible()){this.focus();return;}e=o.getFocusDomRef();}e=e||q.sap.domById(F);if(!e){this.setInitialFocus("");e=sap.ui.getCore().byId(this._getFocusId());}if(!this.getInitialFocus()){this.setAssociation('initialFocus',e?e.id:this.getId(),true);}if(sap.ui.Device.system.desktop||(e&&!/input|textarea|select/i.test(e.tagName))){q.sap.focus(e);}else{this.focus();}};D.prototype.getScrollDelegate=function(){return this._oScroller;};D.prototype._composeAggreNameInHeader=function(p){var h;if(p==="Begin"){h="contentLeft";}else if(p==="End"){h="contentRight";}else{h="content"+p;}return h;};D.prototype._isToolbarEmpty=function(){var e=this._oToolbar.getContent().filter(function(g){return g.getMetadata().getName()!=='sap.m.ToolbarSpacer';});return e.length===0;};D.prototype._setButton=function(o,p,s){return this;};D.prototype._getButton=function(p){var s=p.toLowerCase()+"Button",e="_o"+this._firstLetterUpperCase(p)+"Button";if(sap.ui.Device.system.phone){return this.getAggregation(s,null,true);}else{return this[e];}};D.prototype._getButtonFromHeader=function(p){if(this._header){var h=this._composeAggreNameInHeader(this._firstLetterUpperCase(p)),e=this._header.getAggregation(h);return e&&e[0];}else{return null;}};D.prototype._firstLetterUpperCase=function(v){return v.charAt(0).toUpperCase()+v.slice(1);};D.prototype._getAnyHeader=function(){var o=this.getCustomHeader();if(o){return o;}else{var s=this.getShowHeader();if(!s){return null;}this._createHeader();return this._header;}};D.prototype._deregisterResizeHandler=function(){if(this._resizeListenerId){sap.ui.core.ResizeHandler.deregister(this._resizeListenerId);this._resizeListenerId=null;}sap.ui.Device.resize.detachHandler(this._onResize);};D.prototype._registerResizeHandler=function(){var _=this.$("scroll");this._resizeListenerId=sap.ui.core.ResizeHandler.register(_.get(0),q.proxy(this._onResize,this));sap.ui.Device.resize.attachHandler(this._onResize.bind(this));this._onResize();};D.prototype._deregisterContentResizeHandler=function(){if(this._sContentResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sContentResizeListenerId);this._sContentResizeListenerId=null;}};D.prototype._registerContentResizeHandler=function(){if(!this._sContentResizeListenerId){this._sContentResizeListenerId=sap.ui.core.ResizeHandler.register(this.getDomRef("scrollCont"),q.proxy(this._onResize,this));}this._onResize();};D.prototype._attachHandler=function(o){var t=this;if(!this._oButtonDelegate){this._oButtonDelegate={ontap:function(){t._oCloseTrigger=this;}};}if(o){o.addDelegate(this._oButtonDelegate,true,o);}};D.prototype._createToolbarButtons=function(){var t=this._getToolbar();var e=this.getButtons();var g=this.getBeginButton();var h=this.getEndButton(),i=this,j=[g,h];j.forEach(function(o){if(o&&i._oButtonDelegate){o.removeDelegate(i._oButtonDelegate);}});t.removeAllContent();t.addContent(new T());j.forEach(function(o){i._attachHandler(o);});if(e&&e.length){e.forEach(function(k){t.addContent(k);});}else{if(g){t.addContent(g);}if(h){t.addContent(h);}}};D.prototype._getToolbar=function(){if(!this._oToolbar){this._oToolbar=new A(this.getId()+"-footer").addStyleClass("sapMTBNoBorders").applyTagAndContextClassFor("footer");this._oToolbar._isControlsInfoCached=function(){return false;};this.setAggregation("_toolbar",this._oToolbar);}return this._oToolbar;};D.prototype.getValueStateString=function(v){var r=sap.ui.getCore().getLibraryResourceBundle("sap.m");switch(v){case(sap.ui.core.ValueState.Success):return r.getText("LIST_ITEM_STATE_SUCCESS");case(sap.ui.core.ValueState.Warning):return r.getText("LIST_ITEM_STATE_WARNING");case(sap.ui.core.ValueState.Error):return r.getText("LIST_ITEM_STATE_ERROR");default:return"";}};D.prototype.setSubHeader=function(o){this.setAggregation("subHeader",o);if(o){o.setVisible=function(i){this.$().toggleClass('sapMDialogWithSubHeader',i);o.setProperty("visible",i);}.bind(this);}return o;};D.prototype.setLeftButton=function(v){if(!(v instanceof sap.m.Button)){v=sap.ui.getCore().byId(v);}this.setBeginButton(v);return this.setAssociation("leftButton",v);};D.prototype.setRightButton=function(v){if(!(v instanceof sap.m.Button)){v=sap.ui.getCore().byId(v);}this.setEndButton(v);return this.setAssociation("rightButton",v);};D.prototype.getLeftButton=function(){var o=this.getBeginButton();return o?o.getId():null;};D.prototype.getRightButton=function(){var e=this.getEndButton();return e?e.getId():null;};D.prototype.getAggregation=function(s,o,p){var e=C.prototype.getAggregation.apply(this,Array.prototype.slice.call(arguments,0,2));if(s==='buttons'&&e.length===0){this.getBeginButton()&&e.push(this.getBeginButton());this.getEndButton()&&e.push(this.getEndButton());}return e;};D.prototype.getAriaLabelledBy=function(){var h=this._getAnyHeader(),e=this.getAssociation("ariaLabelledBy",[]).slice();var s=this.getSubHeader();if(s){e.unshift(s.getId());}if(h){e.unshift(h.getId());}return e;};D.prototype.setTitle=function(t){this.setProperty("title",t,true);if(this._headerTitle){this._headerTitle.setText(t);}else{this._headerTitle=new sap.m.Title(this.getId()+"-title",{text:t,level:"H1"}).addStyleClass("sapMDialogTitle");this._createHeader();this._header.addContentMiddle(this._headerTitle);}return this;};D.prototype.setCustomHeader=function(o){if(o){o.addStyleClass("sapMDialogTitle");}this.setAggregation("customHeader",o);};D.prototype.setState=function(s){var F={},$=this.$(),n;F[s]=true;this.setProperty("state",s,true);for(n in D._mStateClasses){$.toggleClass(D._mStateClasses[n],!!F[n]);}this.setIcon(D._mIcons[s],true);return this;};D.prototype.setIcon=function(i,e){if(!e){this._externalIcon=i;}else{if(this._externalIcon){i=this._externalIcon;}}if(i){if(i!==this.getIcon()){if(this._iconImage){this._iconImage.setSrc(i);}else{this._iconImage=a.createControlByURI({id:this.getId()+"-icon",src:i,useIconTooltip:false},sap.m.Image).addStyleClass("sapMDialogIcon");this._createHeader();this._header.insertAggregation("contentMiddle",this._iconImage,0);}}}else{var s=this.getState();if(!e&&s!==V.None){if(this._iconImage){this._iconImage.setSrc(D._mIcons[s]);}}else{if(this._iconImage){this._iconImage.destroy();this._iconImage=null;}}}this.setProperty("icon",i,true);return this;};D.prototype.setType=function(t){var o=this.getType();if(o===t){return this;}this._bMessageType=(t===sap.m.DialogType.Message);return this.setProperty("type",t,false);};D.prototype.setStretch=function(s){this._bStretchSet=true;return this.setProperty("stretch",s);};D.prototype.setStretchOnPhone=function(s){if(this._bStretchSet){q.sap.log.warning("sap.m.Dialog: stretchOnPhone property is deprecated. Setting stretchOnPhone property is ignored when there's already stretch property set.");return this;}this.setProperty("stretchOnPhone",s);return this.setProperty("stretch",s&&sap.ui.Device.system.phone);};D.prototype.setVerticalScrolling=function(v){var o=this.getVerticalScrolling(),h=this._hasSingleScrollableContent();if(h){q.sap.log.warning("sap.m.Dialog: property verticalScrolling automatically reset to false. See documentation.");v=false;}if(o===v){return this;}this.$().toggleClass("sapMDialogVerScrollDisabled",!v);this.setProperty("verticalScrolling",v);if(this._oScroller){this._oScroller.setVertical(v);}return this;};D.prototype.setHorizontalScrolling=function(v){var o=this.getHorizontalScrolling(),h=this._hasSingleScrollableContent();if(h){q.sap.log.warning("sap.m.Dialog: property horizontalScrolling automatically reset to false. See documentation.");v=false;}if(o===v){return this;}this.$().toggleClass("sapMDialogHorScrollDisabled",!v);this.setProperty("horizontalScrolling",v);if(this._oScroller){this._oScroller.setHorizontal(v);}return this;};D.prototype.setInitialFocus=function(i){return this.setAssociation("initialFocus",i,true);};D.prototype.forceInvalidate=C.prototype.invalidate;D.prototype.invalidate=function(o){if(this.isOpen()){this.forceInvalidate(o);}};function f(e){var $=q(e);var o=$.control(0);if(!o||o.getMetadata().getInterfaces().indexOf("sap.m.IBar")>-1){return true;}return $.hasClass('sapMDialogTitle');}if(sap.ui.Device.system.desktop){D.prototype.ondblclick=function(e){if(f(e.target)){this._bDisableRepositioning=false;this._oManuallySetPosition=null;this._oManuallySetSize=null;this.oPopup&&this.oPopup._applyPosition(this.oPopup._oLastPosition,true);this._$dialog.removeClass('sapMDialogTouched');}};D.prototype.onmousedown=function(e){if(e.which===3){return;}if(this.getStretch()||(!this.getDraggable()&&!this.getResizable())){return;}var t;var g=this;var $=q(document);var h=q(e.target);var r=h.hasClass('sapMDialogResizeHandler')&&this.getResizable();var m=function(p){t=t?clearTimeout(t):setTimeout(function(){p();},0);};var i=30;var w=window.innerWidth;var j=window.innerHeight;var k={x:e.pageX,y:e.pageY,width:g._$dialog.width(),height:g._$dialog.height(),offset:{x:e.offsetX?e.offsetX:e.originalEvent.layerX,y:e.offsetY?e.offsetY:e.originalEvent.layerY},position:{x:g._$dialog.offset().left,y:g._$dialog.offset().top}};if((f(e.target)&&this.getDraggable())||r){g._bDisableRepositioning=true;g._$dialog.addClass('sapDialogDisableTransition');g._$dialog.addClass('sapMDialogTouched');g._oManuallySetPosition={x:k.position.x,y:k.position.y};g._$dialog.css({left:Math.min(Math.max(0,g._oManuallySetPosition.x),w-i),top:Math.min(Math.max(0,g._oManuallySetPosition.y),j-i),transform:""});}if(f(e.target)&&this.getDraggable()){$.on("mousemove.sapMDialog",function(e){m(function(){g._bDisableRepositioning=true;g._oManuallySetPosition={x:e.pageX-k.offset.x,y:e.pageY-k.offset.y};g._$dialog.css({left:Math.min(Math.max(0,g._oManuallySetPosition.x),w-i),top:Math.min(Math.max(0,g._oManuallySetPosition.y),j-i),transform:""});});});}else if(r){g._$dialog.addClass('sapMDialogResizing');var s={};var n=parseInt(g._$dialog.css('min-width'),10);var o=k.x+k.width-n;g.$('cont').height('');$.on("mousemove.sapMDialog",function(e){m(function(){g._bDisableRepositioning=true;g._oManuallySetSize={width:k.width+e.pageX-k.x,height:k.height+e.pageY-k.y};if(g._bRTL){s.left=Math.min(Math.max(e.pageX,0),o);s.transform="";g._oManuallySetSize.width=k.width+k.x-Math.max(e.pageX,0);}s.width=g._oManuallySetSize.width;s.height=g._oManuallySetSize.height;g._$dialog.css(s);});});}else{return;}$.on("mouseup.sapMDialog",function(){var p=g.$(),u=g.$('cont');$.off("mouseup.sapMDialog, mousemove.sapMDialog");if(r){g._$dialog.removeClass('sapMDialogResizing');u.height(parseInt(p.height(),10)+parseInt(p.css("border-top-width"),10)+parseInt(p.css("border-bottom-width"),10));}});e.preventDefault();e.stopPropagation();};}return D;},true);
