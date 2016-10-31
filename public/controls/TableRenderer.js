sap.ui.define(['jquery.sap.global', 'sap/ui/core/Renderer'],
    function(jQuery, Renderer) {
        "use strict";

        var TableRenderer = {};
        TableRenderer.render = function(oRm, oControl) {
            oRm.write("<div");
            oRm.writeControlData(oControl);
            oRm.addClass('work-table');
            oRm.writeClasses();
            oRm.addStyle('width', oControl.getWidth());
            oRm.addStyle('height', oControl.getHeight());
            oRm.writeStyles();
            oRm.write(">");
            oRm.write("</div>");
        };

        return TableRenderer;

    }, /* bExport= */ true);
