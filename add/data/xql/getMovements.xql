xquery version "3.1";
(:
  Edirom Online
  Copyright (C) 2011 The Edirom Project
  http://www.edirom.de

  Edirom Online is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  Edirom Online is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Edirom Online.  If not, see <http://www.gnu.org/licenses/>.

  ID: $Id: getMovements.xql 1219 2012-01-20 08:33:28Z daniel $
:)

declare namespace request="http://exist-db.org/xquery/request";
declare namespace mei="http://www.music-encoding.org/ns/mei";
declare namespace xlink="http://www.w3.org/1999/xlink";

declare namespace xmldb="http://exist-db.org/xquery/xmldb";

declare option exist:serialize "method=text media-type=text/plain omit-xml-declaration=yes";

let $uri := request:get-parameter('uri', 'asp-backend://sheet/4')
return
    if(starts-with($uri, 'xmldb:exist://'))
    then(
        let $mei := doc($uri)/root()
        let $ret := for $movement in $mei//mei:mdiv
                    return
                        concat('{',
                            'id: "', $movement/string(@xml:id), '", ',
                            'name: "', $movement/string(@label), '"',
                        '}')
    
        return concat('[', string-join($ret, ','), ']')
    )
    else if(starts-with($uri, 'asp-backend://'))
    then(
        let $api := 'http://nashira.upb.de:5001/' || substring-after($uri, 'asp-backend://') || '/segments'
        let $movements := json-doc($api)
        let $ret := array:for-each($movements, function($movement) {
                        concat('{',
                            'id: "', map:get($movement, 'id'), '", ',
                            'name: "', map:get($movement, 'name'), '"',
                        '}')
                    })
        return concat('[', string-join(data($ret), ','), ']')
    )
    else()

