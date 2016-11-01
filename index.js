'use strict';

let route_finder = require( './src/index' );

const hapiRouteHierarchyPlugin = {
	register: function( server, options, next ) {
		route_finder( options, function( routes ) {
			server.route( routes );
			next();
		} );
	}
};

hapiRouteHierarchyPlugin.register.attributes = {
	pkg: require( './package.json' )
};
