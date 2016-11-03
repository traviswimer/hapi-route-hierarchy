// This route is a function
module.exports = function( server ) {
	return {
		method: 'GET',
		path: '/1-2_function_path',
		handler: function( request, reply ) {
			return server;
		}
	};
};
