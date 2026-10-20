<?php

namespace App\Enums;

enum DegreeType: string
{
    case HighSchool  = 'high-school';
    case Associate   = 'associate';
    case Bachelor    = 'bachelor';
    case Master      = 'master';
    case Doctorate   = 'doctorate';
    case Certificate = 'certificate';
    case Bootcamp    = 'bootcamp';
    case Other       = 'other';
}
