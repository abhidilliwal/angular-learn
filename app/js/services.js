'use strict';

/* Services */

app.services = angular.module('myApp.services', ['ngResource']);

app.services.factory('CountriesRes', function($resource){
  // return $resource(app.baseAPIURL + '/ABI/countries/', {'TOR':'ajax'}, {
    var Countries =  $resource('resp/countries.json', {'TOR':'ajax'}, {
        query: {method:'GET', params:{}}
    });

    Countries.parse = function (resp) {
        return resp.countries;
    };
    return Countries;
});

app.services.factory('GraphRes', function($resource){
  // return $resource(app.baseAPIURL + '/ABI/countries/', {'TOR':'ajax'}, {
    var Graph =  $resource('resp/graph.json', {'TOR':'ajax'}, {
        query: {method:'GET', params:{}}
    });

    Graph.parse =  function (respObj) {
        // check if the response is proper and reach up the main data
        if (typeof respObj === "object" && 
            respObj.rows && respObj.rows.length > 0 &&
            respObj.rows[0].entityDataSlices) {

            var tuples = respObj.rows[0].entityDataSlices,
                tuplesLen, i, j, // for iteration
                pointSet, // the object containing category and values
                xAxis = [], // the array of all the points for xAxis
                valueKey, // for iterating in pointSet.values object
                seriesData = {}, // actual plot point map; {1003: [{x:1, y: 5}, {x:3, y: 6}], 1004: [{x: 1, y: 6}]}
                valueSet;

                if (tuples.length && tuples.length > 0) {
                    tuplesLen = tuples.length;
                    for ( i = 0; i < tuplesLen; i++) {
                        pointSet = tuples[i];

                    // parse the category for the y axis
                    if (pointSet.category) {
                        // TODO: add config for formatting date
                        xAxis.push(pointSet.category);
                    } else {
                        // TODO: log exception: parsing failed, could not find the category for plot point
                        
                        console && console.error && console.error("Parsing failed");
                    }

                    // parse the values
                    if (pointSet.values && Array.isArray(pointSet.values)) {
                        // inside: respObj.rows[0].entityDataSlices[i]

                        if (pointSet.values.length === 1) {
                            // now processing respObj.rows[0].entityDataSlices[i].values[0]
                            // this section does parsing for tab2 and tab3 graphs which does not include country
                            valueSet = pointSet.values[0];
                            for (valueKey in valueSet) {
                                if (valueSet.hasOwnProperty(valueKey)) {
                                    if (!seriesData[valueKey]) {
                                        // we dont have the matrix yet, lets  create it
                                        seriesData[valueKey] = [];
                                    }
                                    seriesData[valueKey].push({x: i, y: valueSet[valueKey]});
                                }
                            }
                        }
                    } else {
                        // TODO: log exception: parsing failed, could not find the values for the specified catgory
                        console && console.error && console.error("respObj.rows[0].entityDataSlices[i].values should be an array");
                    }

                }
                // console.log("parsed data", {xAxis: xAxis, seriesData: seriesData});
                return {xAxis: xAxis, seriesData: seriesData};

            } else {
                // TODO: no data found!, do something
                // return []; //??
                console && console.error && console.error("Parsing failed");
            }

        } else {
            // TODO: log error; response data is incorrect
            console && console.error && console.error("Parsing failed");
        }
    };
    return Graph;
});
