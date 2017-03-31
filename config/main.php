<?php

define('DB_PATH_LOG', '/media/bb_control/log.db');
define('DB_PATH_DATA', '/etc/controller/lgr/data.db');

function f_getConfig() {
    return [
        'db' => [
            'use' => 'l'
        ],
        'acp' => [
            'use' => '1',
        ],
        'sock' => [
            'use' => '1'
        ],
        'session' => [
            'use' => '4',
        ],
        'check' => [
            'use' => [1],
        ]
    ];
}
