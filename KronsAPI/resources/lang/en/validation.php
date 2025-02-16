<?php

return [
    'accepted' => 'A :attribute el kell fogadni.',
    'active_url' => 'A :attribute nem érvényes URL.',
    'after' => 'A :attribute dátumnak a :date utáninak kell lennie.',
    'alpha' => 'A :attribute csak betűket tartalmazhat.',
    'alpha_dash' => 'A :attribute csak betűket, számokat, kötőjeleket és aláhúzásjeleket tartalmazhat.',
    'alpha_num' => 'A :attribute csak betűket és számokat tartalmazhat.',
    'array' => 'A :attribute egy tömb kell, hogy legyen.',
    'before' => 'A :attribute dátumnak a :date előttről kell származnia.',
    'between' => [
        'numeric' => 'A :attribute értékének :min és :max között kell lennie.',
        'file' => 'A :attribute fájlnak :min és :max kilobájt között kell lennie.',
        'string' => 'A :attribute hossza :min és :max karakter között kell, hogy legyen.',
        'array' => 'A :attribute :min és :max elem közötti számú elemet kell, hogy tartalmazzon.',
    ],
    'boolean' => 'A :attribute értéke igaz vagy hamis kell legyen.',
    'confirmed' => 'A :attribute megerősítése nem egyezik.',
    'date' => 'A :attribute nem érvényes dátum.',
    'date_equals' => 'A :attribute :date dátummal kell, hogy egyenlő legyen.',
    'date_format' => 'A :attribute nem felel meg a következő formátumnak: :format.',
    'different' => 'A :attribute és a :other különböző kell legyen.',
    'digits' => 'A :attribute :digits számjegyből kell álljon.',
    'digits_between' => 'A :attribute :min és :max számjegy között kell, hogy legyen.',
    'dimensions' => 'A :attribute kép méretei érvénytelenek.',
    'distinct' => 'A :attribute mezőnek ismétlődő értékei vannak.',
    'email' => 'A :attribute nem érvényes e-mail cím.',
    'exists' => 'A kiválasztott :attribute érvénytelen.',
    'file' => 'A :attribute fájl kell legyen.',
    'filled' => 'A :attribute mező kitöltése kötelező.',
    'gt' => [
        'numeric' => 'A :attribute nagyobb kell legyen, mint :value.',
        'file' => 'A :attribute fájl méretének nagyobbnak kell lennie, mint :value kilobájt.',
        'string' => 'A :attribute hossza hosszabb kell, hogy legyen, mint :value karakter.',
        'array' => 'A :attribute több mint :value elemet kell, hogy tartalmazzon.',
    ],
    'gte' => [
        'numeric' => 'A :attribute nagyobb vagy egyenlő kell legyen, mint :value.',
        'file' => 'A :attribute fájl méretének nagyobbnak vagy egyenlőnek kell lennie, mint :value kilobájt.',
        'string' => 'A :attribute hossza hosszabb vagy egyenlő kell legyen, mint :value karakter.',
        'array' => 'A :attribute legalább :value elemet kell, hogy tartalmazzon.',
    ],
    'image' => 'A :attribute képfájlnak kell lennie.',
    'in' => 'A kiválasztott :attribute érvénytelen.',
    'in_array' => 'A :attribute mező nem található a :other-ban.',
    'integer' => 'A :attribute egész szám kell legyen.',
    'ip' => 'A :attribute érvényes IP-címnek kell lennie.',
    'ipv4' => 'A :attribute érvényes IPv4 címnek kell lennie.',
    'ipv6' => 'A :attribute érvényes IPv6 címnek kell lennie.',
    'json' => 'A :attribute érvényes JSON sztringnek kell lennie.',
    'lt' => [
        'numeric' => 'A :attribute kisebb kell legyen, mint :value.',
        'file' => 'A :attribute fájl méretének kisebbnek kell lennie, mint :value kilobájt.',
        'string' => 'A :attribute hossza rövidebb kell, hogy legyen, mint :value karakter.',
        'array' => 'A :attribute kevesebb mint :value elemet kell, hogy tartalmazzon.',
    ],
    'lte' => [
        'numeric' => 'A :attribute kisebb vagy egyenlő kell legyen, mint :value.',
        'file' => 'A :attribute fájl méretének kisebbnek vagy egyenlőnek kell lennie, mint :value kilobájt.',
        'string' => 'A :attribute hossza rövidebb vagy egyenlő kell legyen, mint :value karakter.',
        'array' => 'A :attribute nem tartalmazhat több, mint :value elemet.',
    ],
    'max' => [
        'numeric' => 'A :attribute nem lehet nagyobb, mint :max.',
        'file' => 'A :attribute fájl nem lehet nagyobb, mint :max kilobájt.',
        'string' => 'A :attribute hossza nem lehet több, mint :max karakter.',
        'array' => 'A :attribute nem tartalmazhat több, mint :max elemet.',
    ],
    'mimes' => 'A :attribute fájlnak a következő típusok egyikének kell lennie: :values.',
    'mimetypes' => 'A :attribute fájlnak a következő típusok egyikének kell lennie: :values.',
    'min' => [
        'numeric' => 'A :attribute legalább :min kell legyen.',
        'file' => 'A :attribute fájl méretének legalább :min kilobájt kell lennie.',
        'string' => 'A :attribute hossza legalább :min karakter kell legyen.',
        'array' => 'A :attribute legalább :min elemet kell tartalmazzon.',
    ],
    'not_in' => 'A kiválasztott :attribute érvénytelen.',
    'numeric' => 'A :attribute számnak kell lennie.',
    'present' => 'A :attribute mező jelen kell legyen.',
    'regex' => 'A :attribute formátuma érvénytelen.',
    'required' => 'A :attribute kitöltése kötelező.',
    'required_if' => 'A :attribute kitöltése kötelező, ha a :other :value.',
    'required_unless' => 'A :attribute kitöltése kötelező, kivéve, ha a :other a :values.',
    'required_with' => 'A :attribute kitöltése kötelező, ha :values jelen van.',
    'required_with_all' => 'A :attribute kitöltése kötelező, ha :values jelen van.',
    'required_without' => 'A :attribute kitöltése kötelező, ha :values nincs jelen.',
    'required_without_all' => 'A :attribute kitöltése kötelező, ha egyik :values sem jelen van.',
    'same' => 'A :attribute és a :other meg kell egyezzen.',
    'size' => [
        'numeric' => 'A :attribute :size kell legyen.',
        'file' => 'A :attribute fájl méretének :size kilobájt kell lennie.',
        'string' => 'A :attribute hossza :size karakter kell legyen.',
        'array' => 'A :attribute-nak :size elemet kell tartalmaznia.',
    ],
    'starts_with' => 'A :attribute a következőkkel kell kezdődjön: :values',
    'string' => 'A :attribute szövegnek kell lennie.',
    'timezone' => 'A :attribute érvényes időzónának kell lennie.',
    'unique' => 'A :attribute már létezik.',
    'url' => 'A :attribute nem érvényes URL.',
    'uuid' => 'A :attribute érvényes UUID-nek kell lennie.',


    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [],

];
