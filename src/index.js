'use strict';

const path = require( "path" );
const glob = require( "glob" );

/**
 * Ensures routes are arrays and converts paths to match their parent directory
 * @param {string} root - The root directory used for routes
 * @param {string} file_path - The absolute path to the routes file
 */
function processRoute( root, file_path ) {
	let routes = require( file_path );

	// route can export a function
	if ( typeof routes === 'function' ) {
		routes = routes();
	}

	// We want to wrap objects in an array
	if ( !Array.isArray( routes ) ) {
		routes = [ routes ];
	}

	// Prepend each route path with the current directory path (after the root)
	let router_parent_path = path.dirname( file_path.replace( root, '' ) );
	let processed_routes = routes.map( function( route ) {
		// Clone route so we don't overwrite the original object
		let route_data = Object.assign( {}, route );
		route_data.path = router_parent_path + route_data.path;
		return route_data;
	} );

	return processed_routes;
}

module.exports = function( options, done ) {
	options = options || {};

	// Ensure root is an absolute path
	let root = path.resolve( options.root );

	// Ensure glob is from the root directory and all paths are absolute
	let glob_options = options.glob_options || {};
	glob_options.cwd = root;
	glob_options.absolute = true;

	// Run the glob and get a flattened array of all the routes
	glob( options.glob_pattern, glob_options, function( err, files ) {
		let routes = files.reduce( function( routes_array, file ) {
			return routes_array.concat( processRoute( root, file ) );
		}, [] );

		done( routes );
	} );
}
