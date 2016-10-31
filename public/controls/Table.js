sap.ui.define(['sap/ui/core/Control', 'jquery.sap.global'],
    function (Control, jQuery) {
        return Control.extend('work.controls.Table', {
            metadata: {
                properties: {
                    width: {
                        type: 'sap.ui.core.CSSSize',
                        defaultValue: '100%'
                    },
                    height: {
                        type: 'sap.ui.core.CSSSize',
                        defaultValue: '100%'
                    },
                    column: {
                        type: 'int',
                        defaultValue: '3'
                    },
                    row: {
                        type: 'int',
                        defaultValue: '10'
                    },
                    data: {
                        type: 'object',
                        defaultValue: [
                            {ID:"1", Name:"John Smith", Status:"Employed"},
                            {ID:"2", Name:"Randal White", Status:"Employed"},
                            {ID:"3", Name:"Leolewin", Status:"Employed"},
                            {ID:"4", Name:"Steven Brown", Status:"Unemployed"},
                        ]
                    }
                },
                events: {
                    rowselected: {
                        parameters: {
                            rowId: {type: 'int'}
                        }
                    }
                }
            },
            init: function () {
                //self data is not avaliable here
            },
            onBeforeRendering: function()
            {
                this.data = this.getData() || this.data;
                this.table = "<table><tbody>";

                //split checkbox here
                var input = "<td><div class='table-input'><input style='width:14px;height:14px'></input></div></td>"
                var tds = "", first_td = "", trs = [];
                var width = -1;

                //first datatype:[{key:value, key:value}, {}, {}]
                //get td width;
                if (this.data instanceof Array){
                    this.data.forEach(function(val){
                        width++;
                    });
                }
                width = (100/width).toFixed(2);

                if (this.data instanceof Array){
                    for(var key in this.data[0]){
                        tds = tds + "<td style='width:"+width+"%'>" + key + "</td>"
                    }
                    first_td = input + tds;
                    trs.push("<tr>" + first_td + "</tr>");

                    this.data.forEach(function(val){
                        if (first_td === "") {
                            for(var key in val){
                                tds = tds + "<td style='width:"+width+"%'>" + key + "</td>"
                            }
                            first_td = input + tds;
                            trs.push("<tr>" + first_td + "</tr>");
                        }else{
                            tds = "";
                            for(var key in val){
                                console.log(key);
                                tds = tds + "<td style='"+width+"%'>" + val[key] + "</td>";
                            }
                            tds = input + tds;
                            trs.push("<tr>" + tds + "</tr>");
                        }
                    });
                }else{
                    //second datatype {key:value, key:value}
                    for(var key in this.data){
                        tds = "";
                        tds = tds + input + "<td>" + this.data[key] + "</td>";
                        trs.push("<tr>" + tds + "</tr>");
                    }
                }

                this.table += trs.join("") + "</tbody></table>";
                console.log(this.table);

                console.log('before');
            },

            onAfterRendering: function()
            {
                var self  = this;
                this.$().append(this.table);
                // var s = window.getElementByClassName("table");
                // s.attachEvent("rowselected", function(e){console.log(e);});
                $("table").on('click', function(e){
                    self.fireEvent("rowselected", {value: 1});
                    // this.fireEvent("change", {value : 1});
                });
                $("work-class").on("rowselected", function(e){
                    console.log(e);
                });
            }


        });
}, true);
