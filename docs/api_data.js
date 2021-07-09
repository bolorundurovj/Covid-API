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
    "group": "V1",
    "description": "<p>Get the world data, as well as every country data</p>",
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
          "content": "HTTP/1.1 200 OK\n{\n  {\n  \"_id\": \"5eda3cb82be7631edc9ae898\",\n  \"total_confirmed\": 6632985,\n  \"total_deaths\": 391136,\n  \"total_recovered\": 2869963,\n  \"total_active\": 3426940,\n  \"last_date_updated\": \"2020-06-05T12:38:13.003Z\",\n  \"country_statistics\": [\n      {\n          \"country\": \"Australia\",\n          \"code\": \"AU\",\n          \"flag\": \"https://assets.hackbotone.com/images/flags/flag_australia.png\",\n          \"coordinates\": [\n              133.775136,\n              -25.274398\n          ],\n          \"confirmed\": 7247,\n          \"deaths\": 102,\n          \"recovered\": 6683,\n          \"states\": [\n              {\n                  \"key\": \"5v50p\",\n                  \"name\": \"Victoria\",\n                  \"address\": \"Victoria, Australia\",\n                  \"latitude\": -37.8136,\n                  \"longitude\": 144.9631,\n                  \"confirmed\": \"1681\",\n                  \"deaths\": \"19\",\n                  \"active\": \"76\",\n                  \"recovered\": \"1586\"\n              },\n              {\n                  \"key\": \"z28cy\",\n                  \"name\": \"Western Australia\",\n                  \"address\": \"Western Australia, Australia\",\n                  \"latitude\": -31.9505,\n                  \"longitude\": 115.8605,\n                  \"confirmed\": \"592\",\n                  \"deaths\": \"9\",\n                  \"active\": \"26\",\n                  \"recovered\": \"557\"\n              }\n          ]\n      },\n\n      {\n          \"country\": \"Ecuador\",\n          \"code\": \"EC\",\n          \"flag\": \"https://assets.hackbotone.com/images/flags/flag_ecuador.png\",\n          \"coordinates\": [\n              -78.183406,\n              -1.831239\n          ],\n          \"confirmed\": 40966,\n          \"deaths\": 3486,\n          \"recovered\": 20019,\n          \"states\": [\n              {\n                  \"key\": \"4b5w3\",\n                  \"name\": \"Ecuador\",\n                  \"address\": \"Ecuador\",\n                  \"latitude\": -1.8312,\n                  \"longitude\": -78.1834,\n                  \"confirmed\": \"40966\",\n                  \"deaths\": \"3486\",\n                  \"active\": \"17461\",\n                  \"recovered\": \"20019\"\n              }\n          ]\n      },\n\n      {\n          \"country\": \"Nigeria\",\n          \"code\": \"NG\",\n          \"flag\": \"https://assets.hackbotone.com/images/flags/flag_nigeria.png\",\n          \"coordinates\": [\n              8.675277,\n              9.081999\n          ],\n          \"confirmed\": 11516,\n          \"deaths\": 323,\n          \"recovered\": 3535,\n          \"states\": [\n              {\n                  \"key\": \"vbbqa\",\n                  \"name\": \"Nigeria\",\n                  \"address\": \"Nigeria\",\n                  \"latitude\": 9.082,\n                  \"longitude\": 8.6753,\n                  \"confirmed\": \"11516\",\n                  \"deaths\": \"323\",\n                  \"active\": \"7658\",\n                  \"recovered\": \"3535\"\n              }\n          ]\n      },\n  ]\n}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/v1.js",
    "groupTitle": "V1"
  },
  {
    "type": "get",
    "url": "/country/:country",
    "title": "Get Covid Data By Country",
    "version": "1.0.0",
    "name": "Get_Covid_Data_By_Country",
    "group": "V1",
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
    "filename": "./routes/v1.js",
    "groupTitle": "V1"
  },
  {
    "type": "get",
    "url": "/geojson",
    "title": "Get Covid GeoData",
    "version": "1.0.0",
    "name": "Get_Covid_GeoData",
    "group": "V1",
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
    "filename": "./routes/v1.js",
    "groupTitle": "V1"
  },
  {
    "type": "get",
    "url": "/timeline/:country",
    "title": "Get Covid Timeline For A Country",
    "version": "1.0.0",
    "name": "Get_Covid_Timeline_For_A_Country",
    "group": "V1",
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
    "filename": "./routes/v1.js",
    "groupTitle": "V1"
  },
  {
    "type": "get",
    "url": "/timeline/all",
    "title": "Get Covid Timeline For All Countries",
    "version": "1.0.0",
    "name": "Get_Covid_Timeline_For_All_Countries",
    "group": "V1",
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
    "filename": "./routes/v1.js",
    "groupTitle": "V1"
  },
  {
    "type": "get",
    "url": "/country-timeline/:country",
    "title": "Get Covid Timeline For A Country",
    "version": "2.0.0",
    "name": "Get_Covid_Timeline_For_A_Country",
    "group": "V2",
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
          "content": "HTTP/1.1 200 OK\n{\n   [\n       {\n            \"cases\": 8,\n            \"country\": \"Nigeria\",\n            \"date\": \"2020-03-18T00:00:00.000Z\"\n        },\n        {\n            \"cases\": 8,\n            \"country\": \"Nigeria\",\n            \"date\": \"2020-03-19T00:00:00.000Z\"\n        },\n        {\n            \"cases\": 12,\n            \"country\": \"Nigeria\",\n            \"date\": \"2020-03-20T00:00:00.000Z\"\n        },\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/v2.js",
    "groupTitle": "V2"
  },
  {
    "type": "get",
    "url": "/all-countries-timeline",
    "title": "Get Covid Timeline For All Countries",
    "version": "1.0.0",
    "name": "Get_Covid_Timeline_For_All_Countries",
    "group": "V2",
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
          "content": "HTTP/1.1 200 OK\n{\n   \"Afghanistan\": [\n        {\n        \"cases\": 0,\n        \"country\": \"Afghanistan\",\n        \"date\": \"2020-01-21T23:00:00.000Z\"\n        },\n        {\n        \"cases\": 2,\n        \"country\": \"Afghanistan\",\n        \"date\": \"2020-01-22T23:00:00.000Z\"\n        },\n      ],\n   \"Cuba\": [\n        {\n        \"cases\": 0,\n        \"country\": \"Cuba\",\n        \"date\": \"2020-01-21T23:00:00.000Z\"\n        },\n        {\n        \"cases\": 2,\n        \"country\": \"Cuba\",\n        \"date\": \"2020-01-22T23:00:00.000Z\"\n        },\n      ],\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/v2.js",
    "groupTitle": "V2"
  }
] });
