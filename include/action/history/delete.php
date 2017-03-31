<?php

namespace history;

class delete {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        $data = [];
        \db\init(DB_PATH_LOG);
        foreach ($p as $value) {
            $q = "delete from v_real where id={$value['id']}";
            \db\command($q);
        }
        \db\suspend();
        return $data;
    }

}
