var app = {
    ACTION: {
        ITEM: {SAVE: 10, GET: 11},
        HISTORY: {GET: 20, DOWNLOAD: 21, GET_ITEM: 22, DELETE:23},
        CONTROLLER: {PROGRAM: {GET_DATA: 30, START: 31, STOP: 32}, GET_STATE:40}
    },
    LIMIT: {
        GET_DATA: 3
    },
    NAME_SIZE: 32,
    controller_state: null,
    version: 1,
    controller_version: null,
    version_acceptable: {
        controller: [1],
        f_php: [2],
        f_js: [2]
    },
    init: function () {
        //  this.checkJsVersion();
        trans.setLang(1, ["english", "русский"]);

        // this.sendCV();
    },
    update: function () {
        this.sendU();
    },
    checkJsVersion: function () {
        var found = false;
        for (var i = 0; i < this.version_acceptable.f_js.length; i++) {
            if (this.version_acceptable.f_js[i] === f_js_version) {
                found = true;
            }
        }
        if (!found) {
            var s1 = "current f_js version: " + f_js_version + "\n";
            var s2 = "acceptable f_js versions: " + this.version_acceptable.f_js.join(" ") + "\n";
            alert("incompatible f_js version!\n" + s1 + s2);
        }
    },
    checkControllerVersion: function (v) {
        this.controller_version = v;
        var found = false;
        for (var i = 0; i < this.version_acceptable.controller.length; i++) {
            if (this.version_acceptable.controller[i] === v) {
                found = true;
            }
        }
        if (!found) {
            var s1 = "current controller version: " + this.controller_version + "\n";
            var s2 = "acceptable controller versions: " + this.version_acceptable.controller.join(" ") + "\n";
            alert("incompatible controller version!\n" + s1 + s2);
        }
    },
    sendControllerGetDate: function (slave) {
        var data = [
            {
                action: ['controller', 'get_date']
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.GET_DATE, 'json_udp_acp');
    },
    sendControllerGetState: function (slave) {
        var data = [
            {
                action: ['controller', 'get_state']
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.GET_STATE, 'json_udp_acp');
    },
    sendGetProgData: function (slave, data) {
        var data = [
            {
                action: ['controller', 'program', 'get_data'],
                param: data
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.PROGRAM.GET_DATA, 'json_udp_acp');
    },
    sendGeta: function (slave) {
        var data = [
            {
                action: ['program', 'geta']
            }
        ];
        sendTo(slave, data, this.ACTION.PROGRAM.GETA, 'json_db');
    },
    sendProgSaveBusyTime: function (slave, d) {
        var data = [
            {
                action: ['program', 'save_busy_time'],
                param: d
            }
        ];
        sendTo(slave, data, this.ACTION.PROGRAM.SAVE_BUSY_TIME, 'json_db');
    },
    sendI1List: function (kind, slave, program_id_arr) {
        switch (kind) {
            case this.ACTION.CONTROLLER.PROGRAM.LOAD:
                var data = [
                    {
                        action: ['controller', 'program', 'load'],
                        param: program_id_arr
                    }
                ];
                break;
            case this.ACTION.CONTROLLER.PROGRAM.UNLOAD:
                var data = [
                    {
                        action: ['controller', 'program', 'unload'],
                        param: program_id_arr
                    }
                ];
                break;
            case this.ACTION.CONTROLLER.PROGRAM.START:
                var data = [
                    {
                        action: ['controller', 'program', 'start'],
                        param: program_id_arr
                    }
                ];
                break;
            case this.ACTION.CONTROLLER.PROGRAM.STOP:
                var data = [
                    {
                        action: ['controller', 'program', 'stop'],
                        param: program_id_arr
                    }
                ];
                break;
            case this.ACTION.CONTROLLER.EM.TURN_ON_H:
                var data = [
                    {
                        action: ['controller', 'em', 'turn_on_h'],
                        param: program_id_arr
                    }
                ];
                break;
            case this.ACTION.CONTROLLER.EM.TURN_ON_C:
                var data = [
                    {
                        action: ['controller', 'em', 'turn_on_c'],
                        param: program_id_arr
                    }
                ];
                break;
            case this.ACTION.CONTROLLER.EM.TURN_OFF_H:
                var data = [
                    {
                        action: ['controller', 'em', 'turn_off_h'],
                        param: program_id_arr
                    }
                ];
                break;
            case this.ACTION.CONTROLLER.EM.TURN_OFF_C:
                var data = [
                    {
                        action: ['controller', 'em', 'turn_off_c'],
                        param: program_id_arr
                    }
                ];
                break;
        }
        sendTo(slave, data, kind, 'json_udp_acp');
    },
    sendValveProgGeta: function (slave) {
        var data = [
            {
                action: ['valve_prog_geta']
            }
        ];
        sendTo(slave, data, this.ACTION.VALVE_PROG_GETA, 'json_db');
    }
};
elem.push(app);
