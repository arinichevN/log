<?php

namespace history;

class download {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        $path = "bumble_bee_param_log.tsv";
        $file = \fopen($path, "w");
        if(!$file){
           throw new \Exception('fopen failed'); 
        }
        foreach ($p as $value) {
            $r=\fputcsv($file, $value, "\t");
            if(!$r){
                \fclose($file);
                throw new \Exception('fputcsv failed'); 
            }
        }
        \fclose($file);
        return $path;
    }

}
