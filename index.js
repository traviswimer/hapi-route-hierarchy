'use strict';

let route_finder = require( './src/index' );

const hapiRouteHierarchyPlugin = {
	pkg: require('./package.json'),
	register: function( server, options ) {
		route_finder( server, options, function( routes ) {
			server.route( routes );
		} );
	}
};

module.exports = hapiRouteHierarchyPlugin;
