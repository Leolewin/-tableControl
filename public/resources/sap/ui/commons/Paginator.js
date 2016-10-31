/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control'],function(q,l,C){"use strict";var P=C.extend("sap.ui.commons.Paginator",{metadata:{library:"sap.ui.commons",properties:{currentPage:{type:"int",group:"Misc",defaultValue:1},numberOfPages:{type:"int",group:"Misc",defaultValue:null}},events:{page:{parameters:{srcPage:{type:"int"},targetPage:{type:"int"},type:{type:"sap.ui.commons.PaginatorEvent"}}}}}});P.MAX_NUMBER_PAGES=5;P.prototype.init=function(){this.bShowAnimation=true;};P.prototype.onclick=function(e){if(e&&e.target){e.preventDefault();var t=e.target;if(!t.id){t=t.parentNode;}if(t.id&&t.id!=this.getId()+"-pages"){var a=t.id.split("--");if(a.length>1){var b=a[a.length-1];var E=null;var s=this.getCurrentPage();var T=s;if(b.match(/^\d+$/)){E=sap.ui.commons.PaginatorEvent.Goto;T=parseInt(b,10);}else if(b=="firstPageLink"){E=sap.ui.commons.PaginatorEvent.First;T=1;}else if(b=="backLink"){E=sap.ui.commons.PaginatorEvent.Previous;T=Math.max(s-1,1);}else if(b=="forwardLink"){E=sap.ui.commons.PaginatorEvent.Next;T=Math.min(s+1,this.getNumberOfPages());}else if(b=="lastPageLink"){E=sap.ui.commons.PaginatorEvent.Last;T=this.getNumberOfPages();}if(T!=s){if(this.bShowAnimation){this.setCurrentPage(T,true);this.triggerPaginatorAnimation();}else{this.setCurrentPage(T);}this.firePage({srcPage:s,targetPage:T,type:E});}}}}};P.prototype.setCurrentPage=function(t,s){this.setProperty("currentPage",t,s);if(this.getDomRef()){sap.ui.commons.PaginatorRenderer.updateBackAndForward(this);}};P.prototype.triggerPaginatorAnimation=function(){var I=[];var a=[];var p=this.getId();var c=q.sap.byId(p+"-pages").children();var n=this._calculatePagesRange();var o;if(this._oOldRange){o=this._oOldRange;}else{o={};var b=c[0].id.split("--");o.firstPage=parseInt(b[b.length-1],10);b=c[c.length-1].id.split("--");o.lastPage=parseInt(b[b.length-1],10);}var i;for(i=n.firstPage;i<=n.lastPage;i++){if(i<o.firstPage||i>o.lastPage){a.push(i);}}var d={firstPage:a[0],lastPage:a[a.length-1]};for(i=o.firstPage;i<=o.lastPage;i++){if(i<n.firstPage||i>n.lastPage){I.push(i);}}var e=sap.ui.commons.PaginatorRenderer.getPagesHtml(this.getId(),o,this.getCurrentPage(),true);var f=sap.ui.commons.PaginatorRenderer.getPagesHtml(this.getId(),d,this.getCurrentPage(),false);if(o.firstPage<d.firstPage){f=e+f;}else{f=f+e;}var g=document.activeElement;var h=g?g.id:undefined;this.getDomRef("pages").innerHTML=f;if(h){g=q.sap.domById(h);}else{g=q.sap.domById("testPaginator-a--"+this.getCurrentPage());}q.sap.focus(g);var j=this.getId()+"-li--";this._oOldRange=n;function r(){var m=q.sap.domById(this.id);if(m){m.parentNode.removeChild(m);}}for(i=0;i<I.length;i++){var k=j+I[i];q.sap.byId(k).hide(400,r);}for(i=0;i<a.length;i++){q.sap.byId(j+a[i]).show(400);}};P.prototype._calculatePagesRange=function(){var f=1;var L=this.getNumberOfPages();var c=this.getCurrentPage();var n=this.getNumberOfPages();if(c<4){f=1;if(L>P.MAX_NUMBER_PAGES){L=P.MAX_NUMBER_PAGES;}}else if(c==L){if(n<5){f=1;}else{f=L-4;}}else if(L-c<3){f=L-4;}else{f=c-2;L=c+2;}return{firstPage:f,lastPage:L};};P.prototype.onkeydown=function(e){var E=e.getPseudoTypes();if(q.inArray("saptabnext",E)!=-1){this.triggerTabbingNavigation(e,false);}else if(q.inArray("saptabprevious",E)!=-1){this.triggerTabbingNavigation(e,true);}else if(q.inArray("sapincrease",E)!=-1){this.triggerInternalNavigation(e,"next");}else if(q.inArray("sapdecrease",E)!=-1){this.triggerInternalNavigation(e,"previous");}};P.prototype.triggerInternalNavigation=function(e,d){var f=q(this.getDomRef()).find(":sapFocusable");var c=q(f).index(e.target);var n,N;if(d=="next"){n=c+1;if(q(e.target).hasClass("sapUiPagCurrentPage")){n=n+1;}N=f[n];if(N){q(N).focus();e.preventDefault();e.stopPropagation();}}else if(d=="previous"&&f[c-1]){n=c-1;N=f[n];if(N&&q(N).hasClass("sapUiPagCurrentPage")){N=f[n-1];}if(N){q(N).focus();e.preventDefault();e.stopPropagation();}}};P.prototype.triggerTabbingNavigation=function(e,s){var f=q(this.getDomRef()).find(":sapFocusable");if(!s){q(f[f.length-1]).focus();}else{var c=q(f).index(e.target);if(c!=0){q(f[0]).focus();}}};P.prototype.getFocusInfo=function(){var i=this.$().find(":focus").attr("id");if(i){return{customId:i};}else{return sap.ui.core.Element.prototype.getFocusInfo.apply(this,arguments);}};P.prototype.applyFocusInfo=function(f){if(f&&f.customId){this.$().find("#"+f.customId).focus();}else{sap.ui.core.Element.prototype.getFocusInfo.apply(this,arguments);}return this;};return P;},true);
