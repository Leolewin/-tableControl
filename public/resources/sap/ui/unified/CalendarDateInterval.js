/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/LocaleData','sap/ui/model/type/Date','sap/ui/unified/calendar/CalendarUtils','./Calendar','./calendar/Header','./calendar/Month','./calendar/DatesRow','./calendar/MonthPicker','./calendar/YearPicker','sap/ui/core/date/UniversalDate','./library'],function(q,C,L,D,a,b,H,M,c,d,Y,U,l){"use strict";var e=b.extend("sap.ui.unified.CalendarDateInterval",{metadata:{library:"sap.ui.unified",properties:{startDate:{type:"object",group:"Data"},days:{type:"int",group:"Appearance",defaultValue:7},showDayNamesLine:{type:"boolean",group:"Appearance",defaultValue:true},pickerPopup:{type:"boolean",group:"Appearance",defaultValue:false}}}});e.prototype.init=function(){b.prototype.init.apply(this,arguments);var m=this.getAggregation("monthPicker");m.setColumns(0);m.setMonths(3);m.attachEvent("pageChange",h,this);var y=this.getAggregation("yearPicker");y.setColumns(0);y.setYears(3);y.attachEvent("pageChange",i,this);this._iDaysLarge=10;this._iDaysMonthHead=35;};e.prototype._createMonth=function(I){var m=new c(I);return m;};e.prototype.setStartDate=function(s){if(!(s instanceof Date)){throw new Error("Date must be a JavaScript date object; "+this);}if(q.sap.equal(this.getStartDate(),s)){return this;}var y=s.getFullYear();if(y<1||y>9999){throw new Error("Date must not be in valid range (between 0001-01-01 and 9999-12-31); "+this);}if(s.getTime()<this._oMinDate.getTime()||s.getTime()>this._oMaxDate.getTime()){throw new Error("Date must not be in valid range (minDate and maxDate); "+this);}var m=this.getMinDate();if(m&&s.getTime()<m.getTime()){q.sap.log.warning("startDate < minDate -> minDate as startDate set",this);s=new Date(m);}var o=this.getMaxDate();if(o&&s.getTime()>o.getTime()){q.sap.log.warning("startDate > maxDate -> maxDate as startDate set",this);s=new Date(o);}var u=a._createUniversalUTCDate(s,this.getPrimaryCalendarType());this.setProperty("startDate",s,true);this._oUTCStartDate=u;var j=this.getAggregation("month")[0];j.setStartDate(s);this._updateHeader(u);var k=a._createLocalDate(this._getFocusedDate());if(!j.checkDateFocusable(k)){this._setFocusedDate(u);j.displayDate(s);}return this;};e.prototype.getStartDate=function(){return this.getProperty("startDate");};e.prototype.setDays=function(j){this.setProperty("days",j,true);j=this._getDays();var o=this.getAggregation("month")[0];o.setDays(j);if(!this.getPickerPopup()){var m=this.getAggregation("monthPicker");var k=Math.ceil(j/3);if(k>12){k=12;}m.setMonths(k);var y=this.getAggregation("yearPicker");var n=Math.floor(j/2);if(n>20){n=20;}y.setYears(n);}var s=f.call(this);this._updateHeader(s);if(this.getDomRef()){if(j>this._iDaysLarge){this.$().addClass("sapUiCalIntLarge");}else{this.$().removeClass("sapUiCalIntLarge");}if(j>this._iDaysMonthHead){this.$().addClass("sapUiCalIntHead");}else{this.$().removeClass("sapUiCalIntHead");}}return this;};e.prototype._getDays=function(){var j=this.getDays();if(sap.ui.Device.system.phone&&j>8){return 8;}else{return j;}};e.prototype.setShowDayNamesLine=function(s){this.setProperty("showDayNamesLine",s,true);var o=this.getAggregation("month")[0];o.setShowDayNamesLine(s);return this;};e.prototype._getShowMonthHeader=function(){var j=this._getDays();if(j>this._iDaysMonthHead){return true;}else{return false;}};e.prototype._getFocusedDate=function(){if(!this._oFocusedDate){b.prototype._getFocusedDate.apply(this,arguments);var s=this.getStartDate();var o=this.getAggregation("month")[0];if(!s){_.call(this,this._oFocusedDate,false,true);}else if(!o.checkDateFocusable(a._createLocalDate(this._oFocusedDate))){this._oFocusedDate=a._createUniversalUTCDate(s,this.getPrimaryCalendarType());}}return this._oFocusedDate;};e.prototype.setMonths=function(m){if(m==1){this.setProperty("months",m,false);}else{throw new Error("Property months not supported "+this);}};e.prototype.setFirstDayOfWeek=function(F){if(F==-1){this.setProperty("firstDayOfWeek",F,false);}else{throw new Error("Property firstDayOfWeek not supported "+this);}};e.prototype.focusDate=function(o){var j=this.getAggregation("month")[0];if(!j.checkDateFocusable(o)){var u=a._createUniversalUTCDate(o,this.getPrimaryCalendarType());this._focusDateExtend(u,true,true);}b.prototype.focusDate.apply(this,arguments);return this;};e.prototype._focusDateExtend=function(o,O,n){if(O){var j=this._getFocusedDate();var s=f.call(this);var k=Math.ceil((j.getTime()-s.getTime())/(1000*3600*24));s=this._newUniversalDate(o);s.setUTCDate(s.getUTCDate()-k);_.call(this,s,false,true);if(!n){return true;}}return false;};e.prototype._setMinMaxDateExtend=function(o){if(this._oUTCStartDate){if(this._oUTCStartDate.getTime()<this._oMinDate.getTime()){q.sap.log.warning("start date < minDate -> minDate will be start date",this);_.call(this,this._newUniversalDate(this._oMinDate),true,true);}else{var E=new U(this._oUTCStartDate.getTime());E.setUTCDate(E.getUTCDate()+this._getDays()-1);if(E.getTime()>this._oMaxDate.getTime()){q.sap.log.warning("end date > maxDate -> start date will be changed",this);var s=new U(this._oMaxDate.getTime());s.setUTCDate(s.getUTCDate()-this._getDays()+1);_.call(this,s,true,true);}}}};e.prototype.setPickerPopup=function(p){this.setProperty("pickerPopup",p,true);var m=this.getAggregation("monthPicker");var y=this.getAggregation("yearPicker");if(p){m.setColumns(3);m.setMonths(12);y.setColumns(4);y.setYears(20);}else{m.setColumns(0);m.setMonths(6);y.setColumns(0);y.setYears(6);}};e.prototype._togglePrevNext=function(o,j){if(this._iMode>1||(this._iMode==1&&this.getPickerPopup())){return b.prototype._togglePrevNext.apply(this,arguments);}var y=this._oMaxDate.getJSDate().getUTCFullYear();var k=this._oMinDate.getJSDate().getUTCFullYear();var m=this._oMaxDate.getJSDate().getUTCMonth();var n=this._oMinDate.getJSDate().getUTCMonth();var p=this._oMinDate.getJSDate().getUTCDate();var r=this._oMaxDate.getJSDate().getUTCDate();var s=this.getAggregation("header");var t=this._getDays();var u;if(this._iMode==1&&!j){var v=this.getAggregation("monthPicker");var w=v.getMonths();var S=v.getStartMonth();var E=S+w-1;u=o.getJSDate().getUTCFullYear();if(S==0||(u==k&&S<=n)){s.setEnabledPrevious(false);}else{s.setEnabledPrevious(true);}if(E>10||(u==y&&E>=m)){s.setEnabledNext(false);}else{s.setEnabledNext(true);}return;}var x=f.call(this);var z=this._newUniversalDate(x);z.setUTCDate(z.getUTCDate()+t-1);if(o.getTime()<x.getTime()||o.getTime()>z.getTime()){x=this._newUniversalDate(o);z=this._newUniversalDate(x);z.setUTCDate(z.getUTCDate()+t-1);}u=x.getJSDate().getUTCFullYear();var A=x.getJSDate().getUTCMonth();var B=x.getJSDate().getUTCDate();if(u<k||(u==k&&(!j||A<n||(A==n&&B<=p)))){s.setEnabledPrevious(false);}else{s.setEnabledPrevious(true);}u=z.getJSDate().getUTCFullYear();A=z.getJSDate().getUTCMonth();B=z.getJSDate().getUTCDate();if(u>y||(u==y&&(!j||A>m||(A==m&&B>=r)))){s.setEnabledNext(false);}else{s.setEnabledNext(true);}};e.prototype._handlePrevious=function(E){var F=this._newUniversalDate(this._getFocusedDate());var m=this.getAggregation("monthPicker");var y=this.getAggregation("yearPicker");var s=this._newUniversalDate(f.call(this));var j=this._getDays();switch(this._iMode){case 0:s.setUTCDate(s.getUTCDate()-j);F.setUTCDate(F.getUTCDate()-j);this._setFocusedDate(F);_.call(this,s,true);break;case 1:if(m.getMonths()<12){m.previousPage();this._togglePrevNext(F);}else{F.setUTCFullYear(F.getUTCFullYear()-1);var k=this._focusDateExtend(F,true,false);this._setFocusedDate(F);this._updateHeader(F);this._setDisabledMonths(F.getUTCFullYear());if(k){this.fireStartDateChange();}}break;case 2:y.previousPage();this._togglePrevNexYearPicker();break;}};e.prototype._handleNext=function(E){var F=this._newUniversalDate(this._getFocusedDate());var m=this.getAggregation("monthPicker");var y=this.getAggregation("yearPicker");var s=this._newUniversalDate(f.call(this));var j=this._getDays();switch(this._iMode){case 0:s.setUTCDate(s.getUTCDate()+j);F.setUTCDate(F.getUTCDate()+j);this._setFocusedDate(F);_.call(this,s,true);break;case 1:if(m.getMonths()<12){m.nextPage();this._togglePrevNext(F);}else{F.setUTCFullYear(F.getUTCFullYear()+1);var k=this._focusDateExtend(F,true,false);this._setFocusedDate(F);this._updateHeader(F);this._setDisabledMonths(F.getUTCFullYear());if(k){this.fireStartDateChange();}}break;case 2:y.nextPage();this._togglePrevNexYearPicker();break;}};e.prototype._getDisplayedMonths=function(o){var m=[];var j=o.getUTCMonth();var k=this._getDays();m.push(j);if(k>this._iDaysLarge){var E=this._newUniversalDate(o);E.setUTCDate(E.getUTCDate()+k-1);var n=E.getUTCMonth();while(j!=n){j=(j+1)%12;m.push(j);}}return m;};e.prototype._getDisplayedSecondaryMonths=function(p,s){var j=this._getDays();var S=f.call(this);S=U.getInstance(S.getJSDate(),s);var k=S.getUTCMonth();var E=this._newUniversalDate(S);E.setUTCDate(E.getUTCDate()+j-1);E=U.getInstance(E.getJSDate(),s);var m=E.getUTCMonth();return{start:k,end:m};};e.prototype._openPickerPopup=function(p){if(!this._oPopup){q.sap.require("sap.ui.core.Popup");this._oPopup=new sap.ui.core.Popup();this._oPopup.setAutoClose(true);this._oPopup.setAutoCloseAreas([this.getDomRef()]);this._oPopup.setDurations(0,0);this._oPopup._oCalendar=this;this._oPopup.attachClosed(g,this);this._oPopup.onsapescape=function(E){this._oCalendar.onsapescape(E);};}this._oPopup.setContent(p);var o=this.getAggregation("header");var j=sap.ui.core.Popup.Dock;this._oPopup.open(0,j.CenterTop,j.CenterBottom,o,null,"flipfit",true);};function _(s,S,n){var m=this._newUniversalDate(this._oMaxDate);m.setUTCDate(m.getUTCDate()-this._getDays()+1);if(m.getTime()<this._oMinDate.getTime()){m=new U(this._oMinDate.getTime());m.setUTCDate(m.getUTCDate()+this._getDays()-1);}if(s.getTime()<this._oMinDate.getTime()){s=this._newUniversalDate(this._oMinDate);}else if(s.getTime()>m.getTime()){s=m;}var o=a._createLocalDate(s);this.setProperty("startDate",o,true);this._oUTCStartDate=s;var j=this.getAggregation("month")[0];j.setStartDate(o);this._updateHeader(s);if(S){var k=a._createLocalDate(this._getFocusedDate());if(!j.checkDateFocusable(k)){this._setFocusedDate(s);j.setDate(o);}else{j.setDate(k);}}if(!n){this.fireStartDateChange();}}function f(){if(!this._oUTCStartDate){this._oUTCStartDate=this._getFocusedDate();}return this._oUTCStartDate;}function g(E){this._closedPickers();}function h(E){var F=this._newUniversalDate(this._getFocusedDate());this._togglePrevNext(F);}function i(E){this._togglePrevNexYearPicker();}return e;},true);
