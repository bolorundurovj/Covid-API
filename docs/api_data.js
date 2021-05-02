define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./docs/main.js",
    "group": "C:\\Users\\bolorundurovb\\Documents\\Web Projects\\Covid API\\docs\\main.js",
    "groupTitle": "C:\\Users\\bolorundurovb\\Documents\\Web Projects\\Covid API\\docs\\main.js",
    "name": ""
  },
  {
    "type": "get",
    "url": "/all",
    "title": "Get All Countries",
    "version": "1.0.0",
    "name": "Get_All_Countries",
    "group": "Data",
    "description": "<p>Get the world data, as well as every country data</p>",
    "parameter": {
      "fields": {
        "Url Parameters": [
          {
            "group": "Url Parameters",
            "type": "String",
            "optional": false,
            "field": "agentId",
            "description": "<p>Agents unique ID.</p>"
          }
        ],
        "Query Parameters": [
          {
            "group": "Query Parameters",
            "type": "string",
            "allowedValues": [
              "\"day\"",
              "\"week\"",
              "\"month\""
            ],
            "optional": false,
            "field": "timeFrame",
            "description": "<p>Query Parameter(day,week,month).</p>"
          },
          {
            "group": "Query Parameters",
            "type": "String",
            "optional": false,
            "field": "clientName",
            "description": "<p>Query Parameter to filter by client name.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response Object containing desired information.</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "response.pagination",
            "description": "<p>Object containning pagination information.</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "response.data",
            "description": "<p>Array containing client objects.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response Example:",
          "content": "HTTP/1.1 200 OK\n{\n  {\n  \"_id\": \"5eda3cb82be7631edc9ae898\",\n  \"total_confirmed\": 6632985,\n  \"total_deaths\": 391136,\n  \"total_recovered\": 2869963,\n  \"total_active\": 3426940,\n  \"last_date_updated\": \"2020-06-05T12:38:13.003Z\",\n  \"country_statistics\": [\n      {\n          \"country\": \"Australia\",\n          \"code\": \"AU\",\n          \"flag\": \"https://assets.hackbotone.com/images/flags/flag_australia.png\",\n          \"coordinates\": [\n              133.775136,\n              -25.274398\n          ],\n          \"confirmed\": 7247,\n          \"deaths\": 102,\n          \"recovered\": 6683,\n          \"states\": [\n              {\n                  \"key\": \"e172v\",\n                  \"name\": \"Australian Capital Territory\",\n                  \"address\": \"Australian Capital Territory, Australia\",\n                  \"latitude\": -35.4735,\n                  \"longitude\": 149.0124,\n                  \"confirmed\": \"107\",\n                  \"deaths\": \"3\",\n                  \"active\": \"0\",\n                  \"recovered\": \"104\"\n              },\n              {\n                  \"key\": \"yyxa9\",\n                  \"name\": \"New South Wales\",\n                  \"address\": \"New South Wales, Australia\",\n                  \"latitude\": -33.8688,\n                  \"longitude\": 151.2093,\n                  \"confirmed\": \"3110\",\n                  \"deaths\": \"48\",\n                  \"active\": \"348\",\n                  \"recovered\": \"2714\"\n              },\n              {\n                  \"key\": \"jcmoa\",\n                  \"name\": \"Northern Territory\",\n                  \"address\": \"Northern Territory, Australia\",\n                  \"latitude\": -12.4634,\n                  \"longitude\": 130.8456,\n                  \"confirmed\": \"29\",\n                  \"deaths\": \"0\",\n                  \"active\": \"0\",\n                  \"recovered\": \"29\"\n              },\n              {\n                  \"key\": \"oalle\",\n                  \"name\": \"Queensland\",\n                  \"address\": \"Queensland, Australia\",\n                  \"latitude\": -27.4698,\n                  \"longitude\": 153.0251,\n                  \"confirmed\": \"1060\",\n                  \"deaths\": \"6\",\n                  \"active\": \"5\",\n                  \"recovered\": \"1049\"\n              },\n              {\n                  \"key\": \"13vmp\",\n                  \"name\": \"South Australia\",\n                  \"address\": \"South Australia, Australia\",\n                  \"latitude\": -34.9285,\n                  \"longitude\": 138.6007,\n                  \"confirmed\": \"440\",\n                  \"deaths\": \"4\",\n                  \"active\": \"0\",\n                  \"recovered\": \"436\"\n              },\n              {\n                  \"key\": \"gfvx5\",\n                  \"name\": \"Tasmania\",\n                  \"address\": \"Tasmania, Australia\",\n                  \"latitude\": -42.8821,\n                  \"longitude\": 147.3272,\n                  \"confirmed\": \"228\",\n                  \"deaths\": \"13\",\n                  \"active\": \"7\",\n                  \"recovered\": \"208\"\n              },\n              {\n                  \"key\": \"5v50p\",\n                  \"name\": \"Victoria\",\n                  \"address\": \"Victoria, Australia\",\n                  \"latitude\": -37.8136,\n                  \"longitude\": 144.9631,\n                  \"confirmed\": \"1681\",\n                  \"deaths\": \"19\",\n                  \"active\": \"76\",\n                  \"recovered\": \"1586\"\n              },\n              {\n                  \"key\": \"z28cy\",\n                  \"name\": \"Western Australia\",\n                  \"address\": \"Western Australia, Australia\",\n                  \"latitude\": -31.9505,\n                  \"longitude\": 115.8605,\n                  \"confirmed\": \"592\",\n                  \"deaths\": \"9\",\n                  \"active\": \"26\",\n                  \"recovered\": \"557\"\n              }\n          ]\n      },\n      {\n          \"country\": \"Denmark\",\n          \"code\": \"DK\",\n          \"flag\": \"https://assets.hackbotone.com/images/flags/flag_denmark.png\",\n          \"coordinates\": [\n              9.501785,\n              56.26392\n          ],\n          \"confirmed\": 12011,\n          \"deaths\": 582,\n          \"recovered\": 10820,\n          \"states\": [\n              {\n                  \"key\": \"jphtd\",\n                  \"name\": \"Faroe Islands\",\n                  \"address\": \"Faroe Islands, Denmark\",\n                  \"latitude\": 61.8926,\n                  \"longitude\": -6.9118,\n                  \"confirmed\": \"187\",\n                  \"deaths\": \"0\",\n                  \"active\": \"0\",\n                  \"recovered\": \"187\"\n              },\n              {\n                  \"key\": \"tb0to\",\n                  \"name\": \"Greenland\",\n                  \"address\": \"Greenland, Denmark\",\n                  \"latitude\": 71.7069,\n                  \"longitude\": -42.6043,\n                  \"confirmed\": \"13\",\n                  \"deaths\": \"0\",\n                  \"active\": \"0\",\n                  \"recovered\": \"13\"\n              },\n              {\n                  \"key\": \"9ucsz\",\n                  \"name\": \"Denmark\",\n                  \"address\": \"Denmark\",\n                  \"latitude\": 56.2639,\n                  \"longitude\": 9.5018,\n                  \"confirmed\": \"11811\",\n                  \"deaths\": \"582\",\n                  \"active\": \"609\",\n                  \"recovered\": \"10620\"\n              }\n          ]\n      },\n      {\n          \"country\": \"France\",\n          \"code\": \"FR\",\n          \"flag\": \"https://assets.hackbotone.com/images/flags/flag_france.png\",\n          \"coordinates\": [\n              2.213749,\n              46.227638\n          ],\n          \"confirmed\": 189569,\n          \"deaths\": 29068,\n          \"recovered\": 70094,\n          \"states\": [\n              {\n                  \"key\": \"ak3hk\",\n                  \"name\": \"French Guiana\",\n                  \"address\": \"French Guiana, France\",\n                  \"latitude\": 4,\n                  \"longitude\": -53,\n                  \"confirmed\": \"556\",\n                  \"deaths\": \"1\",\n                  \"active\": \"259\",\n                  \"recovered\": \"296\"\n              },\n              {\n                  \"key\": \"j4zpt\",\n                  \"name\": \"French Polynesia\",\n                  \"address\": \"French Polynesia, France\",\n                  \"latitude\": -17.6797,\n                  \"longitude\": -149.4068,\n                  \"confirmed\": \"60\",\n                  \"deaths\": \"0\",\n                  \"active\": \"0\",\n                  \"recovered\": \"60\"\n              },\n              {\n                  \"key\": \"3uffp\",\n                  \"name\": \"Guadeloupe\",\n                  \"address\": \"Guadeloupe, France\",\n                  \"latitude\": 16.265,\n                  \"longitude\": -61.551,\n                  \"confirmed\": \"162\",\n                  \"deaths\": \"14\",\n                  \"active\": \"10\",\n                  \"recovered\": \"138\"\n              },\n              {\n                  \"key\": \"415ua\",\n                  \"name\": \"Martinique\",\n                  \"address\": \"Martinique, France\",\n                  \"latitude\": 14.6415,\n                  \"longitude\": -61.0242,\n                  \"confirmed\": \"200\",\n                  \"deaths\": \"14\",\n                  \"active\": \"88\",\n                  \"recovered\": \"98\"\n              },\n              {\n                  \"key\": \"f97oh\",\n                  \"name\": \"Mayotte\",\n                  \"address\": \"Mayotte, France\",\n                  \"latitude\": -12.8275,\n                  \"longitude\": 45.166244,\n                  \"confirmed\": \"2058\",\n                  \"deaths\": \"25\",\n                  \"active\": \"510\",\n                  \"recovered\": \"1523\"\n              },\n              {\n                  \"key\": \"3fzyx\",\n                  \"name\": \"New Caledonia\",\n                  \"address\": \"New Caledonia, France\",\n                  \"latitude\": -20.904304999999997,\n                  \"longitude\": 165.618042,\n                  \"confirmed\": \"20\",\n                  \"deaths\": \"0\",\n                  \"active\": \"2\",\n                  \"recovered\": \"18\"\n              },\n              {\n                  \"key\": \"5p3hg\",\n                  \"name\": \"Reunion\",\n                  \"address\": \"Reunion, France\",\n                  \"latitude\": -21.1151,\n                  \"longitude\": 55.5364,\n                  \"confirmed\": \"479\",\n                  \"deaths\": \"1\",\n                  \"active\": \"67\",\n                  \"recovered\": \"411\"\n              },\n              {\n                  \"key\": \"95qj2\",\n                  \"name\": \"Saint Barthelemy\",\n                  \"address\": \"Saint Barthelemy, France\",\n                  \"latitude\": 17.9,\n                  \"longitude\": -62.8333,\n                  \"confirmed\": \"6\",\n                  \"deaths\": \"0\",\n                  \"active\": \"0\",\n                  \"recovered\": \"6\"\n              },\n              {\n                  \"key\": \"vjtzs\",\n                  \"name\": \"Saint Pierre and Miquelon\",\n                  \"address\": \"Saint Pierre and Miquelon, France\",\n                  \"latitude\": 46.8852,\n                  \"longitude\": -56.3159,\n                  \"confirmed\": \"1\",\n                  \"deaths\": \"0\",\n                  \"active\": \"0\",\n                  \"recovered\": \"1\"\n              },\n              {\n                  \"key\": \"gie7t\",\n                  \"name\": \"St Martin\",\n                  \"address\": \"St Martin, France\",\n                  \"latitude\": 18.0708,\n                  \"longitude\": -63.0501,\n                  \"confirmed\": \"41\",\n                  \"deaths\": \"3\",\n                  \"active\": \"5\",\n                  \"recovered\": \"33\"\n              },\n              {\n                  \"key\": \"fsn16\",\n                  \"name\": \"France\",\n                  \"address\": \"France\",\n                  \"latitude\": 46.2276,\n                  \"longitude\": 2.2137,\n                  \"confirmed\": \"185986\",\n                  \"deaths\": \"29010\",\n                  \"active\": \"89466\",\n                  \"recovered\": \"67510\"\n              }\n          ]\n      },\n      {\n          \"country\": \"Ecuador\",\n          \"code\": \"EC\",\n          \"flag\": \"https://assets.hackbotone.com/images/flags/flag_ecuador.png\",\n          \"coordinates\": [\n              -78.183406,\n              -1.831239\n          ],\n          \"confirmed\": 40966,\n          \"deaths\": 3486,\n          \"recovered\": 20019,\n          \"states\": [\n              {\n                  \"key\": \"4b5w3\",\n                  \"name\": \"Ecuador\",\n                  \"address\": \"Ecuador\",\n                  \"latitude\": -1.8312,\n                  \"longitude\": -78.1834,\n                  \"confirmed\": \"40966\",\n                  \"deaths\": \"3486\",\n                  \"active\": \"17461\",\n                  \"recovered\": \"20019\"\n              }\n          ]\n      },\n      {\n          \"country\": \"Egypt\",\n          \"code\": \"EG\",\n          \"flag\": \"https://assets.hackbotone.com/images/flags/flag_egypt.png\",\n          \"coordinates\": [\n              30.802498,\n              26.820553\n          ],\n          \"confirmed\": 29767,\n          \"deaths\": 1126,\n          \"recovered\": 7756,\n          \"states\": [\n              {\n                  \"key\": \"po22y\",\n                  \"name\": \"Egypt\",\n                  \"address\": \"Egypt\",\n                  \"latitude\": 26.820553000000004,\n                  \"longitude\": 30.802497999999996,\n                  \"confirmed\": \"29767\",\n                  \"deaths\": \"1126\",\n                  \"active\": \"20885\",\n                  \"recovered\": \"7756\"\n              }\n          ]\n      },\n      {\n          \"country\": \"El Salvador\",\n          \"code\": \"SV\",\n          \"flag\": \"https://assets.hackbotone.com/images/flags/flag_el_salvador.png\",\n          \"coordinates\": [\n              -88.89653,\n              13.794185\n          ],\n          \"confirmed\": 2781,\n          \"deaths\": 52,\n          \"recovered\": 1214,\n          \"states\": [\n              {\n                  \"key\": \"ez74p\",\n                  \"name\": \"El Salvador\",\n                  \"address\": \"El Salvador\",\n                  \"latitude\": 13.7942,\n                  \"longitude\": -88.8965,\n                  \"confirmed\": \"2781\",\n                  \"deaths\": \"52\",\n                  \"active\": \"1515\",\n                  \"recovered\": \"1214\"\n              }\n          ]\n      },\n      {\n          \"country\": \"Equatorial Guinea\",\n          \"code\": \"GQ\",\n          \"flag\": \"https://assets.hackbotone.com/images/flags/flag_equatorial_guinea.png\",\n          \"coordinates\": [\n              10.267895,\n              1.650801\n          ],\n          \"confirmed\": 1306,\n          \"deaths\": 12,\n          \"recovered\": 200,\n          \"states\": [\n              {\n                  \"key\": \"azd2f\",\n                  \"name\": \"Equatorial Guinea\",\n                  \"address\": \"Equatorial Guinea\",\n                  \"latitude\": 1.6508,\n                  \"longitude\": 10.2679,\n                  \"confirmed\": \"1306\",\n                  \"deaths\": \"12\",\n                  \"active\": \"1094\",\n                  \"recovered\": \"200\"\n              }\n          ]\n      },\n      {\n          \"country\": \"Eritrea\",\n          \"code\": \"ER\",\n          \"flag\": \"https://assets.hackbotone.com/images/flags/flag_eritrea.png\",\n          \"coordinates\": [\n              39.782334,\n              15.179384\n          ],\n          \"confirmed\": 39,\n          \"deaths\": 0,\n          \"recovered\": 39,\n          \"states\": [\n              {\n                  \"key\": \"ma4pn\",\n                  \"name\": \"Eritrea\",\n                  \"address\": \"Eritrea\",\n                  \"latitude\": 15.1794,\n                  \"longitude\": 39.7823,\n                  \"confirmed\": \"39\",\n                  \"deaths\": \"0\",\n                  \"active\": \"0\",\n                  \"recovered\": \"39\"\n              }\n          ]\n      },\n      {\n          \"country\": \"Estonia\",\n          \"code\": \"EE\",\n          \"flag\": \"https://assets.hackbotone.com/images/flags/flag_estonia.png\",\n          \"coordinates\": [\n              25.013607,\n              58.595272\n          ],\n          \"confirmed\": 1890,\n          \"deaths\": 69,\n          \"recovered\": 1663,\n          \"states\": [\n              {\n                  \"key\": \"1ibzl\",\n                  \"name\": \"Estonia\",\n                  \"address\": \"Estonia\",\n                  \"latitude\": 58.5953,\n                  \"longitude\": 25.0136,\n                  \"confirmed\": \"1890\",\n                  \"deaths\": \"69\",\n                  \"active\": \"158\",\n                  \"recovered\": \"1663\"\n              }\n          ]\n      },\n      {\n          \"country\": \"Eswatini\",\n          \"code\": \"SZ\",\n          \"flag\": \"https://assets.hackbotone.com/images/flags/flag_eswatini.png\",\n          \"coordinates\": [\n              31.4659,\n              -26.5225\n          ],\n          \"confirmed\": 300,\n          \"deaths\": 3,\n          \"recovered\": 201,\n          \"states\": [\n              {\n                  \"key\": \"5662g\",\n                  \"name\": \"Eswatini\",\n                  \"address\": \"Eswatini\",\n                  \"latitude\": -26.5225,\n                  \"longitude\": 31.4659,\n                  \"confirmed\": \"300\",\n                  \"deaths\": \"3\",\n                  \"active\": \"96\",\n                  \"recovered\": \"201\"\n              }\n          ]\n      },\n      {\n          \"country\": \"Jamaica\",\n          \"code\": \"JM\",\n          \"flag\": \"https://assets.hackbotone.com/images/flags/flag_jamaica.png\",\n          \"coordinates\": [\n              -77.297508,\n              18.109581\n          ],\n          \"confirmed\": 591,\n          \"deaths\": 10,\n          \"recovered\": 368,\n          \"states\": [\n              {\n                  \"key\": \"ndojt\",\n                  \"name\": \"Jamaica\",\n                  \"address\": \"Jamaica\",\n                  \"latitude\": 18.1096,\n                  \"longitude\": -77.2975,\n                  \"confirmed\": \"591\",\n                  \"deaths\": \"10\",\n                  \"active\": \"213\",\n                  \"recovered\": \"368\"\n              }\n          ]\n      },\n      {\n          \"country\": \"Nigeria\",\n          \"code\": \"NG\",\n          \"flag\": \"https://assets.hackbotone.com/images/flags/flag_nigeria.png\",\n          \"coordinates\": [\n              8.675277,\n              9.081999\n          ],\n          \"confirmed\": 11516,\n          \"deaths\": 323,\n          \"recovered\": 3535,\n          \"states\": [\n              {\n                  \"key\": \"vbbqa\",\n                  \"name\": \"Nigeria\",\n                  \"address\": \"Nigeria\",\n                  \"latitude\": 9.082,\n                  \"longitude\": 8.6753,\n                  \"confirmed\": \"11516\",\n                  \"deaths\": \"323\",\n                  \"active\": \"7658\",\n                  \"recovered\": \"3535\"\n              }\n          ]\n      },\n      {\n          \"country\": \"Slovenia\",\n          \"code\": \"SI\",\n          \"flag\": \"https://assets.hackbotone.com/images/flags/flag_slovenia.png\",\n          \"coordinates\": [\n              14.995463,\n              46.151241\n          ],\n          \"confirmed\": 1477,\n          \"deaths\": 109,\n          \"recovered\": 1359,\n          \"states\": [\n              {\n                  \"key\": \"nk2q9\",\n                  \"name\": \"Slovenia\",\n                  \"address\": \"Slovenia\",\n                  \"latitude\": 46.1512,\n                  \"longitude\": 14.9955,\n                  \"confirmed\": \"1477\",\n                  \"deaths\": \"109\",\n                  \"active\": \"9\",\n                  \"recovered\": \"1359\"\n              }\n          ]\n      },\n      {\n          \"country\": \"Vietnam\",\n          \"code\": \"VN\",\n          \"flag\": \"https://assets.hackbotone.com/images/flags/flag_vietnam.png\",\n          \"coordinates\": [\n              108.277199,\n              14.058324\n          ],\n          \"confirmed\": 328,\n          \"deaths\": 0,\n          \"recovered\": 302,\n          \"states\": [\n              {\n                  \"key\": \"85wgm\",\n                  \"name\": \"Vietnam\",\n                  \"address\": \"Vietnam\",\n                  \"latitude\": 14.058323999999999,\n                  \"longitude\": 108.277199,\n                  \"confirmed\": \"328\",\n                  \"deaths\": \"0\",\n                  \"active\": \"26\",\n                  \"recovered\": \"302\"\n              }\n          ]\n      },\n      {\n          \"country\": \"Zambia\",\n          \"code\": \"ZM\",\n          \"flag\": \"https://assets.hackbotone.com/images/flags/flag_zambia.png\",\n          \"coordinates\": [\n              27.849332,\n              -13.133897\n          ],\n          \"confirmed\": 1089,\n          \"deaths\": 7,\n          \"recovered\": 912,\n          \"states\": [\n              {\n                  \"key\": \"z3s3b\",\n                  \"name\": \"Zambia\",\n                  \"address\": \"Zambia\",\n                  \"latitude\": -13.133897,\n                  \"longitude\": 27.849332,\n                  \"confirmed\": \"1089\",\n                  \"deaths\": \"7\",\n                  \"active\": \"170\",\n                  \"recovered\": \"912\"\n              }\n          ]\n      },\n      {\n          \"country\": \"Zimbabwe\",\n          \"code\": \"ZW\",\n          \"flag\": \"https://assets.hackbotone.com/images/flags/flag_zimbabwe.png\",\n          \"coordinates\": [\n              29.154857,\n              -19.015438\n          ],\n          \"confirmed\": 237,\n          \"deaths\": 4,\n          \"recovered\": 31,\n          \"states\": [\n              {\n                  \"key\": \"vs33a\",\n                  \"name\": \"Zimbabwe\",\n                  \"address\": \"Zimbabwe\",\n                  \"latitude\": -19.015438,\n                  \"longitude\": 29.154857,\n                  \"confirmed\": \"237\",\n                  \"deaths\": \"4\",\n                  \"active\": \"202\",\n                  \"recovered\": \"31\"\n              }\n          ]\n      }\n  ]\n}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Data"
  },
  {
    "type": "get",
    "url": "/country/:country",
    "title": "Get Covid Data By Country",
    "version": "1.0.0",
    "name": "Get_Covid_Data_By_Country",
    "group": "Data",
    "description": "<p>Get the latest update on a country</p>",
    "parameter": {
      "fields": {
        "Url Parameters": [
          {
            "group": "Url Parameters",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>Country Name.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "response",
            "description": "<p>Array containing data objects.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response Example:",
          "content": "HTTP/1.1 200 OK\n{\n   \"country\": \"Nigeria\",\n   \"code\": \"NG\",\n   \"flag\": \"https://assets.hackbotone.com/images/flags/flag_nigeria.png\",\n   \"coordinates\": [\n       8.675277,\n       9.081999\n   ],\n   \"confirmed\": 11516,\n   \"deaths\": 323,\n   \"recovered\": 3535,\n   \"states\": [\n       {\n           \"key\": \"t1df0\",\n           \"name\": \"Nigeria\",\n           \"address\": \"Nigeria\",\n           \"latitude\": 9.082,\n           \"longitude\": 8.6753,\n           \"confirmed\": \"11516\",\n           \"deaths\": \"323\",\n           \"active\": \"7658\",\n           \"recovered\": \"3535\"\n       }\n   ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Data"
  },
  {
    "type": "get",
    "url": "/geojson",
    "title": "Get Covid GeoData",
    "version": "1.0.0",
    "name": "Get_Covid_GeoData",
    "group": "Data",
    "description": "<p>Get data in GeoJSON format, which is optimised for populating maps</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "response",
            "description": "<p>Array containing data objects.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response Example:",
          "content": "HTTP/1.1 200 OK\n{\n   [\n       {\n          \"type\": \"Feature\",\n          \"geometry\": {\n              \"type\": \"Point\",\n              \"coordinates\": [\n                  -4.7278,\n                  37.5443\n              ]\n          },\n          \"properties\": {\n              \"key\": 0,\n              \"country\": \"Spain\",\n              \"name\": \"Andalusia\",\n              \"address\": \"Andalusia, Spain\",\n              \"confirmed\": 12743,\n              \"deaths\": 1404,\n              \"recovered\": 10671,\n              \"active\": 668,\n              \"total_cases\": 24818\n          }\n      },\n      {\n          \"type\": \"Feature\",\n          \"geometry\": {\n              \"type\": \"Point\",\n              \"coordinates\": [\n                  -0.9057,\n                  41.5976\n              ]\n          },\n          \"properties\": {\n              \"key\": 1,\n              \"country\": \"Spain\",\n              \"name\": \"Aragon\",\n              \"address\": \"Aragon, Spain\",\n              \"confirmed\": 5734,\n              \"deaths\": 826,\n              \"recovered\": 3772,\n              \"active\": 1136,\n              \"total_cases\": 10332\n          }\n      },\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Data"
  },
  {
    "type": "get",
    "url": "/timeline/:country",
    "title": "Get Covid Timeline For A Country",
    "version": "1.0.0",
    "name": "Get_Covid_Timeline_For_A_Country",
    "group": "Data",
    "description": "<p>Get the timeline of daily cases in a country from January 2020 to date</p>",
    "parameter": {
      "fields": {
        "Url Parameters": [
          {
            "group": "Url Parameters",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>Country Name.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "response",
            "description": "<p>Array containing data objects.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response Example:",
          "content": "HTTP/1.1 200 OK\n{\n   [\n       {\n            \"cases\": 8,\n            \"country\": \"Nigeria\",\n            \"date\": \"2020-03-18T00:00:00.000Z\"\n        },\n        {\n            \"cases\": 8,\n            \"country\": \"Nigeria\",\n            \"date\": \"2020-03-19T00:00:00.000Z\"\n        },\n        {\n            \"cases\": 12,\n            \"country\": \"Nigeria\",\n            \"date\": \"2020-03-20T00:00:00.000Z\"\n        },\n        {\n            \"cases\": 22,\n            \"country\": \"Nigeria\",\n            \"date\": \"2020-03-21T00:00:00.000Z\"\n        },\n        {\n            \"cases\": 30,\n            \"country\": \"Nigeria\",\n            \"date\": \"2020-03-22T00:00:00.000Z\"\n        },\n        {\n            \"cases\": 40,\n            \"country\": \"Nigeria\",\n            \"date\": \"2020-03-23T00:00:00.000Z\"\n        },\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Data"
  },
  {
    "type": "get",
    "url": "/timeline/all",
    "title": "Get Covid Timeline For All Countries",
    "version": "1.0.0",
    "name": "Get_Covid_Timeline_For_All_Countries",
    "group": "Data",
    "description": "<p>Get the timeline of the daily cases for all countries</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "response",
            "description": "<p>Array containing data objects.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response Example:",
          "content": "HTTP/1.1 200 OK\n{\n   \"Afghanistan\": [\n        {\n        \"cases\": 0,\n        \"country\": \"Afghanistan\",\n        \"date\": \"2020-01-21T23:00:00.000Z\"\n        },\n        {\n        \"cases\": 2,\n        \"country\": \"Afghanistan\",\n        \"date\": \"2020-01-22T23:00:00.000Z\"\n        },\n        {\n        \"cases\": 5,\n        \"country\": \"Afghanistan\",\n        \"date\": \"2020-01-23T23:00:00.000Z\"\n        },\n      ],\n   \"Cuba\": [\n        {\n        \"cases\": 0,\n        \"country\": \"Cuba\",\n        \"date\": \"2020-01-21T23:00:00.000Z\"\n        },\n        {\n        \"cases\": 2,\n        \"country\": \"Cuba\",\n        \"date\": \"2020-01-22T23:00:00.000Z\"\n        },\n        {\n        \"cases\": 5,\n        \"country\": \"Cuba\",\n        \"date\": \"2020-01-23T23:00:00.000Z\"\n        },\n      ],\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Data"
  }
] });
