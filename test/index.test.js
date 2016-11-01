'use strict';

var assert = require( 'assert' );

let route_finder = require( '../src/index' );

describe( 'src/index.js', function() {
	let expected_routes;
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
		} ];
	} );

	it( 'should return correct routes based on directory', function( done ) {
		route_finder( {
			root: './test/entry',
			glob_pattern: '**/*.js'
		}, function( routes ) {
			assert.deepEqual( routes, expected_routes );
			done();
		} );
	} );

	it( 'should work with absolute path for root', function( done ) {
		console.log( __dirname + '/test/entry' );
		route_finder( {
			root: __dirname + '/entry',
			glob_pattern: '**/*.js'
		}, function( routes ) {
			assert.deepEqual( routes, expected_routes );
			done();
		} );
	} );
} );
