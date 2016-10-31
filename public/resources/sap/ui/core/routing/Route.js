/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/EventProvider','sap/ui/core/routing/Target','sap/ui/core/routing/async/Route','sap/ui/core/routing/sync/Route','sap/ui/core/Component'],function($,E,T,a,s,C){"use strict";var R=E.extend("sap.ui.core.routing.Route",{metadata:{publicMethods:["getURL","getPattern"]},constructor:function(r,c,p){E.apply(this,arguments);if(!c.name){$.sap.log.error("A name has to be specified for every route",this);}this._aPattern=[];this._aRoutes=[];this._oParent=p;this._oConfig=c;this._oRouter=r;var t=this,v=c.pattern,S,b,d=r._isAsync();b=d?a:s;for(var f in b){this[f]=b[f];}if(!$.isArray(v)){v=[v];}if(c.parent){var o=this._getParentRoute(c.parent);if(!o){$.sap.log.error("No parent route with '"+c.parent+"' could be found",this);}else if(o._aPattern.length>1){$.sap.log.error("Routes with multiple patterns cannot be used as parent for nested routes",this);return;}else{this._oNestingParent=o;v.forEach(function(e,i){var n=o._aPattern[0];n=n.charAt(n.length)==="/"?n:n+"/";v[i]=n+e;});}}if($.isArray(c.subroutes)){S=c.subroutes;c.subroutes={};$.each(S,function(i,e){c.subroutes[e.name]=e;});}if(!c.target){c._async=d;this._oTarget=new T(c,r._oViews,p&&p._oTarget);this._oTarget._bUseRawViewId=true;}if(c.subroutes){$.each(c.subroutes,function(e,g){if(g.name===undefined){g.name=e;}r.addRoute(g,t);});}if(c.pattern===undefined){return;}$.each(v,function(i,e){t._aPattern[i]=e;t._aRoutes[i]=r._oRouter.addRoute(e);t._aRoutes[i].greedy=c.greedy;t._aRoutes[i].matched.add(function(){var A={};$.each(arguments,function(g,h){A[t._aRoutes[i]._paramsIds[g]]=h;});t._routeMatched(A,true);});});},destroy:function(){E.prototype.destroy.apply(this);this._aPattern=null;this._aRoutes=null;this._oParent=null;this._oConfig=null;this.bIsDestroyed=true;return this;},getURL:function(p){return this._aRoutes[0].interpolate(p);},getPattern:function(){return this._aPattern[0];},attachMatched:function(d,f,l){return this.attachEvent("matched",d,f,l);},detachMatched:function(f,l){return this.detachEvent("matched",f,l);},attachPatternMatched:function(d,f,l){return this.attachEvent("patternMatched",d,f,l);},detachPatternMatched:function(f,l){return this.detachEvent("patternMatched",f,l);},_convertToTargetOptions:function(o){return $.extend(true,{},o,{rootView:o.targetParent,controlId:o.targetControl,controlAggregation:o.targetAggregation,clearControlAggregation:o.clearTarget,viewName:o.view,viewType:o.viewType,viewId:o.viewId});},_getParentRoute:function(p){var P=p.split(":");if(P.length===1||(P.length===2&&!P[0])){return this._oRouter.getRoute(P[P.length-1]);}else{var o=C.getOwnerComponentFor(this._oRouter._oOwner);while(o){if(o.getMetadata().getName()===P[0]){var r=o.getRouter();return r.getRoute(P[1]);}o=C.getOwnerComponentFor(o);}return null;}}});R.M_EVENTS={Matched:"matched",PatternMatched:"patternMatched"};return R;});
