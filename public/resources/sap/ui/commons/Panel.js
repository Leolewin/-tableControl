/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control'],function(q,l,C){"use strict";var P=C.extend("sap.ui.commons.Panel",{metadata:{library:"sap.ui.commons",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true},scrollLeft:{type:"int",group:"Behavior",defaultValue:0},scrollTop:{type:"int",group:"Behavior",defaultValue:0},applyContentPadding:{type:"boolean",group:"Appearance",defaultValue:true},collapsed:{type:"boolean",group:"Behavior",defaultValue:false},areaDesign:{type:"sap.ui.commons.enums.AreaDesign",group:"Appearance",defaultValue:sap.ui.commons.enums.AreaDesign.Fill},borderDesign:{type:"sap.ui.commons.enums.BorderDesign",group:"Appearance",defaultValue:sap.ui.commons.enums.BorderDesign.Box},showCollapseIcon:{type:"boolean",group:"Behavior",defaultValue:true},text:{type:"string",group:"Misc",defaultValue:null}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},title:{type:"sap.ui.core.Title",multiple:false},buttons:{type:"sap.ui.commons.Button",multiple:true,singularName:"button"}}}});P.prototype.init=function(){this._oScrollDomRef=null;this._iMaxTbBtnWidth=-1;this._iTbMarginsAndBorders=0;this._iMinTitleWidth=30;this._iOptTitleWidth=30;this._iTitleMargin=0;this._bFocusCollapseIcon=false;this._resizeDelayTimer=null;this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");this.data("sap-ui-fastnavgroup","true",true);};P.prototype.exit=function(){this._rb=undefined;};P.prototype.onThemeChanged=function(){if(this.getDomRef()&&this._oTitleDomRef){this.getDomRef().style.minWidth="auto";if(this._oToolbarDomRef){this._oToolbarDomRef.style.width="auto";}this._oTitleDomRef.style.width="auto";this._initializeSizes();if(!q.support.flexBoxLayout||(P._isSizeSet(this.getHeight())&&(this._hasIcon()||(this.getButtons().length>0)))){this._handleResizeNow();}}};P.prototype.onBeforeRendering=function(){if(this.sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this.sResizeListenerId);this.sResizeListenerId=null;}};P.prototype.onAfterRendering=function(){var i=this.getId();this._oScrollDomRef=q.sap.domById(i+"-cont");if(!this._oScrollDomRef){return;}this._oHeaderDomRef=q.sap.domById(i+"-hdr");this._oTitleDomRef=q.sap.domById(i+"-title");this._oToolbarDomRef=q.sap.domById(i+"-tb");if(this._bFocusCollapseIcon){this._bFocusCollapseIcon=false;var $=q.sap.byId(i+"-collArrow");if($.is(":visible")&&($.css("visibility")=="visible"||$.css("visibility")=="inherit")){$.focus();}else{var a=q.sap.byId(i+"-collIco");if(a.is(":visible")&&(a.css("visibility")=="visible"||a.css("visibility")=="inherit")){a.focus();}}}this._initializeSizes();if(!q.support.flexBoxLayout||(P._isSizeSet(this.getHeight())&&(this._hasIcon()||(this.getButtons().length>0)))){this._handleResizeNow();this.sResizeListenerId=sap.ui.core.ResizeHandler.register(this.getDomRef(),q.proxy(this._handleResizeSoon,this));}};P.prototype.getFocusInfo=function(){var c=null;var i=this.getId();if(this._bFocusCollapseIcon){var $=q.sap.byId(i+"-collArrow");if($.is(":visible")&&($.css("visibility")=="visible"||$.css("visibility")=="inherit")){c=$[0].id;}else{var a=q.sap.byId(i+"-collIco");if(a.is(":visible")&&(a.css("visibility")=="visible"||a.css("visibility")=="inherit")){c=a[0].id;}}}return{id:(c?c:i)};};P.prototype.applyFocusInfo=function(f){var d;if(f&&f.id&&(d=q.sap.byId(f.id))&&(d.length>0)){d.focus();}else{this.focus();}return this;};P.prototype._initializeSizes=function(){var r=sap.ui.getCore().getConfiguration().getRTL();var b=this.getButtons();if(b&&b.length>0){var m=0;q(this._oToolbarDomRef).children().each(function(){var w=this.offsetWidth;if(w>m){m=w;}});this._iMaxTbBtnWidth=m;if(this._oToolbarDomRef){this._oToolbarDomRef.style.minWidth=m+"px";var $=q(this._oToolbarDomRef);this._iTbMarginsAndBorders=$.outerWidth(true)-$.width();}}var a=this._oTitleDomRef.offsetLeft;var t=this.getDomRef().offsetWidth;if(r){a=t-(a+this._oTitleDomRef.offsetWidth);}var c=q(this._oTitleDomRef);this._iOptTitleWidth=c.width()+1;this._iTitleMargin=c.outerWidth(true)-c.outerWidth();var d=10000;q(this._oHeaderDomRef).children(".sapUiPanelHdrRightItem").each(function(){var g=this.offsetLeft;if(r){g=t-(g+this.offsetWidth);}if((g<d)&&(g>0)){d=g;}});var e=a;e+=this._iMinTitleWidth;e+=this._iMaxTbBtnWidth+1;e+=(d==10000)?10:(t-d);this.getDomRef().style.minWidth=e+10+"px";if(this._oScrollDomRef){var s=this.getProperty("scrollTop");if(s>0){this._oScrollDomRef.scrollTop=s;}var f=this.getProperty("scrollLeft");if(f>0){this._oScrollDomRef.scrollLeft=f;}}};P.prototype._fixContentHeight=function(){if(P._isSizeSet(this.getHeight())&&(this._hasIcon()||(this.getButtons().length>0))){this._iContTop=this._oHeaderDomRef.offsetHeight;if(this._oScrollDomRef){this._oScrollDomRef.style.top=this._iContTop+"px";}}};P.prototype._handleResizeSoon=function(){if(this._resizeDelayTimer){q.sap.clearDelayedCall(this._resizeDelayTimer);}this._resizeDelayTimer=q.sap.delayedCall(200,this,function(){this._handleResizeNow();this._resizeDelayTimer=null;});};P.prototype._handleResizeNow=function(){if(!q.support.flexBoxLayout&&this.getDomRef()){var r=sap.ui.getCore().getConfiguration().getRTL();var b=this._oTitleDomRef.offsetLeft;var t=this.getDomRef().offsetWidth;if(r){b=t-(b+this._oTitleDomRef.offsetWidth);}var a=10000;q(this._oHeaderDomRef).children(".sapUiPanelHdrRightItem").each(function(){var d=this.offsetLeft;if(r){d=t-(d+this.offsetWidth);}if((d<a)&&(d>0)){a=d;}});var c=(a==10000)?this.$().width()-b-20:a-b-10;var B=this.getButtons();if(B&&B.length>0){if((c-this._iOptTitleWidth-this._iTitleMargin)>(this._iMaxTbBtnWidth-this._iTbMarginsAndBorders)){this._oToolbarDomRef.style.width=(c-this._iOptTitleWidth-this._iTitleMargin-this._iTbMarginsAndBorders)+"px";this._oTitleDomRef.style.width=this._iOptTitleWidth+"px";}else{this._oToolbarDomRef.style.width=this._iMaxTbBtnWidth+"px";this._oTitleDomRef.style.width=Math.max((c-this._iMaxTbBtnWidth-this._iTbMarginsAndBorders),this._iMinTitleWidth)+"px";}}else{this._oTitleDomRef.style.width=Math.max(c,this._iMinTitleWidth)+"px";}}this._fixContentHeight();};P.prototype._hasIcon=function(){return(this.getTitle()&&this.getTitle().getIcon());};P.prototype.setEnabled=function(e){this.setProperty("enabled",e,true);q(this.getDomRef()).toggleClass("sapUiPanelDis",!e);return this;};P.prototype.setApplyContentPadding=function(p){this.setProperty("applyContentPadding",p,true);q(this.getDomRef()).toggleClass("sapUiPanelWithPadding",p);return this;};P.prototype.setCollapsed=function(c){this.setProperty("collapsed",c,true);this._setCollapsedState(c);return this;};P.prototype._setCollapsedState=function(c){var d=this.getDomRef();if(d){var a=sap.ui.getCore().getConfiguration().getAccessibility();if(c){if(!this.getWidth()){d.style.width=this.getDomRef().offsetWidth+"px";}q(d).addClass("sapUiPanelColl");if(a){d.setAttribute("aria-expanded","false");}if(this.getHeight()){d.style.height="auto";}var e=this._rb.getText("PANEL_EXPAND");this.$("collArrow").attr("title",e);this.$("collIco").attr("title",e);}else{if(!this.getDomRef("cont")){this._bFocusCollapseIcon=true;this.rerender();}else{q(d).removeClass("sapUiPanelColl");if(a){d.setAttribute("aria-expanded","true");}if(!this.getWidth()){d.style.width="auto";}if(this.getHeight()){d.style.height=this.getHeight();}var s=this._rb.getText("PANEL_COLLAPSE");this.$("collArrow").attr("title",s);this.$("collIco").attr("title",s);}}}};P._isSizeSet=function(c){return(c&&!(c=="auto")&&!(c=="inherit"));};P.prototype.setTitle=function(t){var o=this.getTitle();this.setAggregation("title",t);if(o&&o!==t&&o.getId()===this.getId()+"-tit"){o.destroy();}return this;};P.prototype.setText=function(t){if(!this.getTitle()){this.setTitle(new sap.ui.core.Title(this.getId()+"-tit",{text:t}));}else{this.getTitle().setText(t);}return this;};P.prototype.getText=function(){if(!this.getTitle()){return"";}else{return this.getTitle().getText();}};P.prototype.getScrollLeft=function(){var s=0;if(this._oScrollDomRef){if(sap.ui.getCore().getConfiguration().getRTL()){s=q(this._oScrollDomRef).scrollLeftRTL();}else{s=q(this._oScrollDomRef).scrollLeft();}this.setProperty("scrollLeft",s,true);}return s;};P.prototype.setScrollLeft=function(p){this.setProperty("scrollLeft",p,true);if(this._oScrollDomRef){if(sap.ui.getCore().getConfiguration().getRTL()){q(this._oScrollDomRef).scrollLeftRTL(p);}else{q(this._oScrollDomRef).scrollLeft(p);}}return this;};P.prototype.getScrollTop=function(){var s=0;if(this._oScrollDomRef){s=Math.ceil(this._oScrollDomRef.scrollTop);this.setProperty("scrollTop",s,true);}return s;};P.prototype.setScrollTop=function(p){this.setProperty("scrollTop",p,true);if(this._oScrollDomRef){this._oScrollDomRef.scrollTop=p;}return this;};P.prototype.setDimensions=function(w,h){this.setWidth(w);this.setHeight(h);return this;};P.prototype.setWidth=function(w){this.setProperty("width",w,true);var d=this.getDomRef();if(d){d.style.width=w;}return this;};P.prototype.setHeight=function(h){this.setProperty("height",h,true);var d=this.getDomRef();if(d){d.style.height=h;}return this;};P.prototype.onclick=function(e){this._handleTrigger(e);};P.prototype.onsapspace=function(e){this._handleTrigger(e);};P.prototype._handleTrigger=function(e){var i=this.getId();if((e.target.id===i+"-collArrow")||(e.target.id===i+"-collIco")||(e.target.id===i&&e.type==="sapspace"&&this.getShowCollapseIcon())){this.setCollapsed(!this.getProperty("collapsed"));e.preventDefault();e.stopPropagation();this.fireEvent("collapsedToggled");}};return P;},true);
