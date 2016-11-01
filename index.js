'use strict';

const hapiRouteHierarchyPlugin = {
	register: function( server, options, next ) {
		next();
	}
};

hapiRouteHierarchyPlugin.register.attributes = {
	pkg: require( './package.json' )
};
