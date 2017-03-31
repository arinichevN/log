function History() {
    this.type = VISU_TYPE.MAIN;
    this.container = {};
    this.data = [];//[id, mark, value, status]
    this.item = [];//[id, description, selected]
    this.initialized = false;
    this.t1 = null;
    this.selectB = null;
    this.downloadB = null;
    this.getB = null;
    this.delB = null;
    this.helpB = null;
  //  this.bb = null;
    this.update = true;//editor will make it false
    this.EDIT = {ITEM: 0};
    this.FLOAT_PRES=1;
    this.visible = false;
    this.init = function () {
        try {
            var self = this;
            this.container = cvis();
            this.t1 = new Table(self, 1, trans, [[300, "35%"], [301, "35%"], [302, "15%"], [306, "15%"]]);
            // this.t1.m_style = "copy_cell";
            // this.t1.cellClickControl([true, true, true]);
            this.t1.enable();
            this.selectB = cb("");
            this.downloadB = cb("");
            this.getB = cb("");
            this.delB = cb("");
            this.helpB = new NavigationButton(vhelp, "f_js/image/help.png");
           // this.bb = new BackButton();
            this.selectB.onclick = function () {
                self.selectDev();
            };
            this.downloadB.onclick = function () {
                self.download();
            };
            this.getB.onclick = function () {
                self.getLog();
            };
            this.delB.onclick = function () {
                self.deleteSelected();
            };
            this.delB.disabled = true;
            var rcont = cd();
            a(rcont, [this.getB, this.selectB, this.delB, this.downloadB, this.helpB
              //  , this.bb
            ]);
            a(this.container, [this.t1, rcont]);
            cla([this.t1], ["w70m", "lg1"]);
            cla([rcont], ["w30m", "lg1"]);
            cla([this.selectB, this.downloadB, this.getB, this.delB, this.helpB
             //   , this.bb
            ], ["h20m", "ug1", "f1"]);
            this.initialized = true;
        } catch (e) {
            alert("history: init: " + e.message);
        }
    };
    this.getName = function () {
        try {
            return trans.get(401);
        } catch (e) {
            alert("history: getName: " + e.message);
        }
    };
    this.updateStr = function () {
        try {
            this.t1.updateHeader();
            this.selectB.innerHTML = trans.get(305);
            this.downloadB.innerHTML = trans.get(303);
            this.getB.innerHTML = trans.get(304);
            this.delB.innerHTML = trans.get(51);
            this.helpB.updateStr();
         //   this.bb.updateStr();
        } catch (e) {
            alert("history: updateStr: " + e.message);
        }
    };
    this.catchEdit = function (d, k) {
        try {
            switch (k) {
                case this.EDIT.ITEM:
                    for (var i = 0; i < d.length; i++) {
                        this.item[i].selected = d[i][1];
                    }
                    this.getLog();
                    break;
                default:
                    console.log("history: catchEdit: bad k");
                    break;
            }
        } catch (e) {
            alert("history: catchEdit: " + e.message);
        }
    };
    this.getSelectedItemIds = function () {
        var arr = [];
        for (var i = 0; i < this.item.length; i++) {
            if (this.item[i].selected) {
                arr.push({id: this.item[i].id});
            }
        }
        return arr;
    };
    this.btnCntlDel = function () {
        var arr = this.getSelectedItemIds();
        if (arr.length > 0) {
            this.delB.disabled = false;
        } else {
            this.delB.disabled = true;
        }
    };
    this.getItemById = function (id) {
        for (var i = 0; i < this.item.length; i++) {
            if (this.item[i].id === id) {
                return this.item[i];
            }
        }
        return null;
    };
    this.getItemDescription = function (id) {
        var item = this.getItemById(id);
        if (item === null) {
            return '?';
        }
        return item.description;
    };
    this.getFileData = function () {
        var arr = [];
        arr.push({id: 'id', description: 'description', mark: 'mark', value: 'value', status: 'status'});
        for (var i = 0; i < this.data.length; i++) {
            arr.push({id: this.data[i].id, description: this.getItemDescription(this.data[i].id), mark: this.data[i].mark_str, value: this.data[i].value.toFixed(this.FLOAT_PRES), status: this.data[i].status});
        }
        return arr;
    };
    this.getSelectEditData = function () {
        var arr = [];
        for (var i = 0; i < this.item.length; i++) {
            arr.push([this.item[i].description, this.item[i].selected]);
        }
        return arr;
    };
    this.selectDev = function () {
        var self = this;
        var data = this.getSelectEditData();
        vselect_edit.prep(data, true, self, this.EDIT.ITEM, 300);
        showV(vselect_edit);
    };
    this.download = function () {
        var items = this.getFileData();
        var data = [
            {
                action: ['history', 'download'],
                param: items
            }
        ];
        cursor_blocker.enable();
        sendTo(this, data, app.ACTION.HISTORY.DOWNLOAD, "json_db");
    };
    this.getLog = function () {
        var arr = this.getSelectedItemIds();
        var data = [
            {
                action: ['history', 'geta'],
                param: arr
            }
        ];
        cursor_blocker.enable();
        sendTo(this, data, app.ACTION.HISTORY.GET, "json_db");
    };
    this.deleteSelected = function () {
        var arr = this.getSelectedItemIds();
        var data = [
            {
                action: ['history', 'delete'],
                param: arr
            }
        ];
        cursor_blocker.enable();
        sendTo(this, data, app.ACTION.HISTORY.DELETE, "json_db");
    };
    this.getItems = function () {
        var data = [
            {
                action: ["history", "geti"]
            }
        ];
        cursor_blocker.enable();
        sendTo(this, data, app.ACTION.HISTORY.GET_ITEM, "json_db");
    };
    this.confirm = function (action, d, n) {
        try {
            switch (action) {
                case app.ACTION.HISTORY.GET:
                    cleara(this.data);
                    var i = 0;
                    for (i = 0; i < d.length; i++) {
                        this.data.push({
                            id: parseInt(d[i].id),
                            mark: d[i].mark,
                            mark_str: d[i].mark_str,
                            value: parseFloat(d[i].value),
                            status: d[i].status
                        });
                    }
                    this.redrawTbl();
                    this.btnCntlDel();
                    break;
                case app.ACTION.HISTORY.GET_ITEM:
                    cleara(this.item);
                    var i = 0;
                    for (i = 0; i < d.length; i++) {
                        this.item.push({
                            id: parseInt(d[i].id),
                            description: d[i].description,
                            selected: false
                        });
                    }
                    break;
                case app.ACTION.HISTORY.DOWNLOAD:
                    window.location.href = d;
                    break;
                case app.ACTION.HISTORY.DELETE:
                    this.getLog();
                    break;
                default:
                    console.log("confirm: unknown action");
                    break;
            }
            cursor_blocker.disable();
        } catch (e) {
            alert("history: confirm: " + e.message);
        }

    };
    this.abort = function (action, m, n) {
        try {
            switch (action) {
                case app.ACTION.HISTORY.GET:
                    logger.fail();
                    break;
                case app.ACTION.HISTORY.GET_ITEM:
                    logger.fail();
                    break;
                case app.ACTION.HISTORY.DOWNLOAD:
                    logger.fail();
                    break;
                case app.ACTION.HISTORY.DELETE:
                    logger.fail();
                    break;
                default:
                    console.log("abort: unknown action");
                    break;
            }
            cursor_blocker.disable();
        } catch (e) {
            alert("history: abort: " + e.message);
        }
    };
    this.redrawTbl = function () {
        try {
            this.t1.clear();
            for (var i = 0; i < this.data.length; i++) {
                this.t1.appendRow([this.getItemDescription(this.data[i].id), this.data[i].mark_str, this.data[i].value.toFixed(this.FLOAT_PRES), this.data[i].status]);
            }
        } catch (e) {
            alert("history: redrawTbl: " + e.message);
        }
    };
    this.show = function () {
        try {
            clr(this.container, 'hdn');
            this.visible = true;
            document.title = this.getName();
            if (this.update) {
                this.getItems();
            }
        } catch (e) {
            alert("history: show: " + e.message);
        }
    };
    this.hide = function () {
        try {
            cla(this.container, 'hdn');
            this.visible = false;
        } catch (e) {
            alert("history: hide: " + e.message);
        }
    };
}
var vhistory = new History();
visu.push(vhistory);
