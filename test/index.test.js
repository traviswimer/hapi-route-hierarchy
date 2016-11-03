'use strict';

var assert = require( 'assert' );

let route_finder = require( '../src/index' );

// We don't want functions when checking equality, since they will not be the same object
function stripFunctions( route_array ) {
	route_array.forEach( function( route ) {
		Object.keys( route ).forEach( function( key ) {
			if ( typeof route[ key ] === 'function' ) {
				delete route[ key ];
			}
		} );

		return route;
	} );
}

describe( 'src/index.js', function() {
	let expected_routes, mock_server;
	beforeEach( function() {
		expected_routes = [ {
			method: 'GET',
			path: '/dir_1-1/{param}/param_path'
		}, {
			method: 'GET',
			path: '/dir_1-1/dir_2-1/dir_3-1/3-1_path'
		}, {
			method: 'GET',
			path: '/dir_1-1/dir_2-1/2-1_path'
		}, {
			method: 'GET',
			path: '/dir_1-1/1-1_path'
		}, {
			method: 'GET',
			path: '/dir_1-2/1-2_function_path'
		}, {
			method: 'GET',
			path: '/dir_1-2/1-2_obj_path'
		}, {
			method: "GET",
			path: "/dir_1-2/"
		} ];

		mock_server = {
			"test": "test"
		};
	} );

	it( 'should return correct routes based on directory', function( done ) {
		route_finder( mock_server, {
			root: './test/entry',
			glob_pattern: '**/*.js'
		}, function( routes ) {
			stripFunctions( routes );
			assert.deepEqual( routes, expected_routes );
			done();
		} );
	} );

	it( 'should work with absolute path for root', function( done ) {
		route_finder( mock_server, {
			root: __dirname + '/entry',
			glob_pattern: '**/*.js'
		}, function( routes ) {
			stripFunctions( routes );
			assert.deepEqual( routes, expected_routes );
			done();
		} );
	} );

	it( 'should make Hapi server object accessible to route modules that export functions', function( done ) {
		route_finder( mock_server, {
			root: __dirname + '/entry',
			glob_pattern: '**/*.js'
		}, function( routes ) {
			let function_route = routes.find( function( route ) {
				return route.path === '/dir_1-2/1-2_function_path';
			} );
			assert.deepEqual( function_route.handler(), mock_server );
			done();
		} );
	} );
} );
