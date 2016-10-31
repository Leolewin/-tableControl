/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/Popup','sap/ui/core/RenderManager'],function(q,l,C,P,R){"use strict";var D=C.extend("sap.ui.commons.Dialog",{metadata:{interfaces:["sap.ui.core.PopupInterface"],library:"sap.ui.commons",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},scrollLeft:{type:"int",group:"Behavior",defaultValue:0},scrollTop:{type:"int",group:"Behavior",defaultValue:0},title:{type:"string",group:"Misc",defaultValue:''},applyContentPadding:{type:"boolean",group:"Appearance",defaultValue:true},showCloseButton:{type:"boolean",group:"Behavior",defaultValue:true},resizable:{type:"boolean",group:"Behavior",defaultValue:true},minWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},minHeight:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},maxWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},maxHeight:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},contentBorderDesign:{type:"sap.ui.commons.enums.BorderDesign",group:"Appearance",defaultValue:sap.ui.commons.enums.BorderDesign.None},modal:{type:"boolean",group:"Misc",defaultValue:false},accessibleRole:{type:"sap.ui.core.AccessibleRole",group:"Accessibility",defaultValue:sap.ui.core.AccessibleRole.Dialog},keepInWindow:{type:"boolean",group:"Behavior",defaultValue:false},autoClose:{type:"boolean",group:"Misc",defaultValue:false}},defaultAggregation:"content",aggregations:{buttons:{type:"sap.ui.core.Control",multiple:true,singularName:"button"},content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}},associations:{defaultButton:{type:"sap.ui.commons.Button",multiple:false},initialFocus:{type:"sap.ui.core.Control",multiple:false}},events:{closed:{parameters:{width:{type:"int"},height:{type:"int"},top:{type:"int"},left:{type:"int"}}}}}});D.prototype.init=function(){this.oPopup=new P(this,true,true);this._minWidth=64;this._minHeight=48;this.allowTextSelection(false);this._mParameters={};this._mParameters.that=this;this._mParameters.firstFocusable=this.getId()+"-fhfe";this._mParameters.lastFocusable=this.getId()+"-fhee";this._fnOnResizeRecenter=q.proxy(this._onResize,this);};D.prototype.setInitialFocus=function(i){if(i&&typeof i!="string"){i=i.getId();}this.oPopup.setInitialFocusId(i);this.setAssociation("initialFocus",i,true);};D.prototype.onAfterRendering=function(){var $=this.$("cont");var i=!!sap.ui.Device.browser.internet_explorer&&(sap.ui.Device.browser.version==9||sap.ui.Device.browser.version==10);var I=sap.ui.getCore().getConfiguration().getRTL();var _=this.getMinSize();this._minWidth=_.width;this._minHeight=_.height;if(!this._isSizeSet(this.getWidth())&&!this._isSizeSet(this.getMaxWidth())){$.children().each(function(b,e){if(q.trim(this.style.width)=="100%"){this.style.width="auto";}});}if(!this._isSizeSet(this.getHeight())&&this._isSizeSet(this.getMinHeight())){var f=this.getDomRef("footer");var a=f.offsetTop+f.offsetHeight;var d=this.getDomRef().offsetHeight;if(a<d){this.$().removeClass("sapUiDlgFlexHeight");}}if(i&&$.length>0&&I&&!this._isSizeSet(this.getWidth())){var e=$[0];var h=e.ownerDocument&&e.ownerDocument.defaultView&&e.ownerDocument.defaultView.getComputedStyle;if(!h){return;}var w=e.ownerDocument.defaultView.getComputedStyle(e).getPropertyValue("width");if(w){var W=parseFloat(w,10);if(W%1==0.5){e.style.width=(W+0.01)+"px";}}}};D.prototype.onclick=function(e){var c=this.getId()+"-close";if(e.target.id===c){this.close();e.preventDefault();}return false;};D.prototype.open=function(){if(!this.oPopup){q.sap.log.fatal("This dialog instance has been destroyed already");}else if(!this._bOpen){this._oPreviousFocus=P.getCurrentFocusInfo();this.oPopup.attachEvent("opened",this.handleOpened,this);this.oPopup.attachEvent("closed",this.handleClosed,this);this.oPopup.setModal(this.getModal());this.oPopup.setAutoClose(this.getAutoClose());this.oPopup.open(400);this._bOpen=true;this._registerContentResizeHandler();}};D.prototype.onThemeChanged=function(){this.invalidate();};D.prototype._handleOpened=function(){this.$().show();var i=this.getInitialFocus();var t;this._bInitialFocusSet=true;if(i){sap.ui.getCore().byId(i).focus();return;}i=this.getDefaultButton();t=q(":sapTabbable",this.$("cont"));if(i){sap.ui.getCore().byId(i).focus();}else if(this.getButtons().length){this.getButtons()[0].focus();}else if(this.getContent().length&&t.length){t[0].focus();}else{var f=q.sap.domById(this._mParameters.firstFocusable);q.sap.focus(f);}};D.prototype.handleOpened=function(){this.oPopup.detachEvent("opened",this.handleOpened,this);this._handleOpened();};D.prototype.close=function(){if(!this._bOpen){return;}var r=this.$().rect();this._bOpen=false;this._bInitialFocusSet=false;if(this.oPopup.isOpen()){this.oPopup.close(400);}q.sap.delayedCall(400,this,"restorePreviousFocus");q.each(r,function(k,v){r[k]=parseInt(v,10);});this._oRect=r;};D.prototype.handleClosed=function(){this.oPopup.detachEvent("closed",this.handleClosed,this);this._deregisterContentResizeHandler();this.fireClosed(this._oRect);this.close();if(this.getDomRef()){R.preserveContent(this.getDomRef());this.$().remove();}};D.prototype.restorePreviousFocus=function(){P.applyFocusInfo(this._oPreviousFocus);};D.prototype.setTitle=function(t){this.setProperty("title",t,true);this.$("lbl").text(t);return this;};D.prototype.exit=function(){var w=this.isOpen();this.close();this.oPopup.detachEvent("opened",this.handleOpened,this);this.oPopup.detachEvent("closed",this.handleClosed,this);this._deregisterContentResizeHandler();this.oPopup.destroy();if(w){this.fireClosed(this._oRect);}this.oPopup=null;q.sap.clearDelayedCall(this._sDelayedCall);this._sDelayedCall=null;delete this._mParameters;this._fnOnResizeRecenter=null;};D.prototype._isSizeSet=function(c){return!!(c&&c!=="auto"&&c!=="inherit");};D.prototype.onsapescape=function(e){this.close();e.preventDefault();e.stopPropagation();};D.prototype.onsapenter=function(e){var f,i=this.getDefaultButton();if(i&&(f=sap.ui.getCore().byId(i))&&q.contains(this.getDomRef(),f.getDomRef())){if(f instanceof sap.ui.commons.Button){f.onclick(e);}}e.preventDefault();e.stopPropagation();};D.prototype.onfocusin=function(e){this.sLastRelevantNavigation=null;if(!this._bInitialFocusSet){return;}this._mParameters.event=e;this._mParameters.$FocusablesContent=q(":sapTabbable",this.$("cont"));this._mParameters.$FocusablesFooter=q(":sapTabbable",this.$("footer"));this.oPopup.focusTabChain(this._mParameters);};D.prototype.restoreFocus=function(){if(this.oRestoreFocusInfo&&this.oPopup.bOpen){var c=sap.ui.getCore().byId(this.oRestoreFocusInfo.sFocusId);if(c){c.applyFocusInfo(this.oRestoreFocusInfo.oFocusInfo);}}};D.prototype.onselectstart=function(e){if(!q.sap.containsOrEquals(this.getDomRef("cont"),e.target)){e.preventDefault();e.stopPropagation();}};D.prototype.getMinSize=function(){var A=36;var $=q.sap.byId(this.sId);var a=q.sap.byId(this.sId+"-hdr");var b=q.sap.byId(this.sId+"-footer");var f=b.children("DIV").get(0);var w=f?f.offsetWidth:0;var F=b.css('display')!=='none';var c=0;var h;var d;c+=b.outerWidth(false)-b.width();c+=$.outerWidth(false)-$.width();if(c<=20){c=20;}w+=c;if(w<100){w=100;}h=a.outerHeight(false);d=b.outerHeight(false);return{width:w,height:h+d+(F?A:0)};};D.prototype.forceInvalidate=C.prototype.invalidate;D.prototype.invalidate=function(o){if(this.oPopup&&(this.oPopup.eOpenState!=="CLOSING"||this.isOpen())){this.forceInvalidate(o);}};D.prototype.isOpen=function(){return this.oPopup.isOpen();};D.prototype.getOpenState=function(){return this.oPopup.getOpenState();};D.prototype.getEnabled=function(){var e=this.getOpenState();return e===sap.ui.core.OpenState.OPENING||e===sap.ui.core.OpenState.OPEN;};D.prototype.ondragstart=function(e){if(this.sDragMode=="resize"||this.sDragMode=="move"){e.preventDefault();e.stopPropagation();}};D.prototype.onmousedown=function(e){var s=e.target,i=this.getId();this._bRtlMode=sap.ui.getCore().getConfiguration().getRTL();var d=this.getDomRef();if(q.sap.containsOrEquals(this.getDomRef("hdr"),s)){if(s.id!=(i+"-close")){this.sDragMode="move";this._RootWidth=d.offsetWidth;this._RootHeight=d.offsetHeight;}}else if(s.id==i+"-grip"){this.sDragMode="resize";var w=d.offsetWidth+"px";var h=d.offsetHeight+"px";d.style.width=w;d.style.height=h;q(d).removeClass("sapUiDlgFlexHeight sapUiDlgFlexWidth");this.setProperty("width",w,true);this.setProperty("height",h,true);}if(!this.sDragMode){return;}var a=document.activeElement;if(a&&a.id){var c=q.sap.byId(a.id).control(0);if(c){this.oRestoreFocusInfo={sFocusId:c.getId(),oFocusInfo:c.getFocusInfo()};}}this.startDragX=e.screenX;this.startDragY=e.screenY;this.originalRectangle=this.$().rect();q(window.document).on("selectstart",q.proxy(this.ondragstart,this));q(window.document).on("mousemove",q.proxy(this.handleMove,this));q(window.document).on("mouseup",q.proxy(this.handleMouseUp,this));var o=this._findSameDomainParentWinDoc();if(o){q(o).on("selectstart",q.proxy(this.ondragstart,this));q(o).on("mousemove",q.proxy(this.handleMove,this));q(o).on("mouseup",q.proxy(this.handleMouseUp,this));}};D.prototype._findSameDomainParentWinDoc=function(){var o=null;try{var w=window;while(w.parent&&(w.parent!=w)){if(w.parent.document){o=w.parent.document;w=w.parent;}}}catch(e){}return o;};D.prototype.handleMove=function(e){if(!this.sDragMode){return;}e=e||window.event;this._deregisterContentResizeHandler();if(this.sDragMode=="resize"){var d=e.screenX-this.startDragX||0;var a=e.screenY-this.startDragY||0;var w=(this._bRtlMode?this.originalRectangle.width-d:this.originalRectangle.width+d)||0;var h=this.originalRectangle.height+a||0;w=Math.max(w,this._minWidth);h=Math.max(h,this._minHeight);var o=this.getDomRef();o.style.width=w+"px";o.style.height=h+"px";w=o.offsetWidth;h=o.offsetHeight;this.setProperty("width",w+"px",true);this.setProperty("height",h+"px",true);}else if(this.sDragMode=="move"){var L=this.originalRectangle.left+e.screenX-this.startDragX;var t=this.originalRectangle.top+e.screenY-this.startDragY;t=Math.max(t,window.pageYOffset);if(this._bRtlMode||this._keepInWindow()){L=Math.min(L,document.documentElement.clientWidth+window.pageXOffset-this._RootWidth);}if(!this._bRtlMode||this._keepInWindow()){L=Math.max(L,0);}if(this._keepInWindow()){t=Math.min(t,document.documentElement.clientHeight+window.pageYOffset-this._RootHeight);}this.oPopup.setPosition(P.Dock.LeftTop,{left:L,top:t});}e.cancelBubble=true;this._registerContentResizeHandler();return false;};D.prototype._keepInWindow=function(){return this.getKeepInWindow()||this.getModal();};D.prototype.handleMouseUp=function(e){if(this.sDragMode===null){return;}q(window.document).off("selectstart",this.ondragstart);q(window.document).off("mousemove",this.handleMove);q(window.document).off("mouseup",this.handleMouseUp);var o=this._findSameDomainParentWinDoc();if(o){q(o).off("selectstart",this.ondragstart);q(o).off("mousemove",this.handleMove);q(o).off("mouseup",this.handleMouseUp);}this.restoreFocus();this.sDragMode=null;};D.setAutoClose=function(a){this.oPopup.setAutoClose(a);};D.getAutoClose=function(){this.oPopup.getAutoClose();};D.prototype._deregisterContentResizeHandler=function(){if(this._sContentResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sContentResizeListenerId);this._sContentResizeListenerId=null;}};D.prototype._registerContentResizeHandler=function(){if(!this._sContentResizeListenerId){this._sContentResizeListenerId=sap.ui.core.ResizeHandler.register(this.getDomRef("cont"),this._fnOnResizeRecenter);}};D.prototype._onResize=function(){var e=P.Dock;if(this.oPopup){this.oPopup.setPosition(e.CenterCenter,e.CenterCenter,window);}};return D;},true);
