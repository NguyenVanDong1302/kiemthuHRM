"use strict";
exports.__esModule = true;
var useLocalization_1 = require("hooks/useLocalization");
var react_1 = require("react");
var rsuite_1 = require("rsuite");
var ModalFooterComponent = function (_a) {
    var flag = _a.flag, onClose = _a.onClose, onUpdate = _a.onUpdate, onAdd = _a.onAdd, onDelete = _a.onDelete, onChangeToUpdate = _a.onChangeToUpdate, labelCustom = _a.labelCustom, customFooter = _a.customFooter, onCustom = _a.onCustom;
    var _l = useLocalization_1.useLocalization("Button");
    var current = React.createElement(React.Fragment, null);
    switch (flag) {
        case "add": {
            current = (React.createElement(rsuite_1.Button, { onClick: onAdd ? onAdd : function () { }, appearance: "primary", color: "green" }, _l("Add")));
            break;
        }
        case "detail": {
            current = onChangeToUpdate ? (React.createElement(rsuite_1.Button, { onClick: onChangeToUpdate, appearance: "primary", color: "green" }, _l("edit"))) : (React.createElement(React.Fragment, null));
            break;
        }
        case "update": {
            current = (React.createElement(rsuite_1.Button, { onClick: onUpdate ? onUpdate : function () { }, appearance: "primary", color: "green" }, _l("save")));
            break;
        }
        case "delete": {
            current = (React.createElement(rsuite_1.Button, { onClick: onDelete ? onDelete : function () { }, appearance: "primary", color: "green" }, _l("delete")));
            break;
        }
        case "custom": {
            current = (React.createElement(rsuite_1.Button, { onClick: onCustom ? onCustom : function () { }, appearance: "primary", color: "green" }, _l("" + (labelCustom ? labelCustom : ""))));
        }
        default:
            break;
    }
    return (React.createElement(rsuite_1.Modal.Footer, null,
        React.createElement("div", { className: "modal-footer-component" },
            customFooter,
            React.createElement("div", null,
                current,
                React.createElement(rsuite_1.Button, { appearance: "default", onClick: onClose }, _l("Close"))))));
};
exports["default"] = react_1.memo(ModalFooterComponent);
