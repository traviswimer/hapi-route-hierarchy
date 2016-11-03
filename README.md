# hapi-route-hierarchy

> Hapi plugin that automatically sets up your routes based on your directory hierarchy.

## What is this?

The purpose of this plugin is to allow intuitive route setup by basing routes on your directory structure. For example, imagine you have a Hapi project with this folder structure:

```
my_hapi_project
│   server.js
│
└───routes
    │   login.js
    │
    └───users
        │   group_a.js
        │   group_b.js
```

Assume that `server.js` simply starts the Hapi server, after registering the plugin like this:

```javascript
server.register(
    {
        register: require( 'hapi-route-hierarchy' ),
        options: {
            root: __dirname + '/routes',
            glob_pattern: '**/*.js'
        }
    }, ( err ) => {
        // Start the server...
    }
)
```

All the files under `/routes` include the data for all the routes. So for example, `/routes/login.js` might look like this:

```javascript
module.exports = {
    method: 'GET',
    path: '/login',
    handler: function( request, reply ) {
        return reply( 'You have been authenticated!' );
    }
};
```

This will result in a route at `/login`, which is rather boring, but what if we put something similar in `/routes/users/group_a.js`:

```javascript
module.exports = {
    method: 'GET',
    path: '/group_a',
    handler: function( request, reply ) {
        return reply( 'Here is a list of all users in group A!' );
    }
};
```

This would result in a route at `/users/group_a`.

In this way you can easily keep your routes organized by ensuring they always match your directory structure.

## Plugin Options

### root

- **REQUIRED**
- Type: `string`
- Description: The directory to search for files with route data. This can accept 2 types of paths:

  - Relative path from `process.cwd()`
  - Absolute path

### glob_pattern

- **REQUIRED**
- Type: `string`
- Description: The [glob](https://www.npmjs.com/package/glob) pattern to use to determine which files should be loaded as route files.

### glob_options

- Type: `object`
- Description: Options that will be passed to the `glob` NPM module. Here is a [full list of available options](https://www.npmjs.com/package/glob#options).

## Route files

The route files can define route data in 3 different ways:

### Object

```javascript
module.exports = {
    method: 'GET',
    path: '/some_path',
    handler: function( request, reply ) {
        // Do something...
    }
};
```

### Array

```javascript
module.exports = [
    {
        method: 'GET',
        path: '/some_path',
        handler: function( request, reply ) {
            // Do something...
        }
    },
    {
        method: 'POST',
        path: '/some_other_path',
        handler: function( request, reply ) {
            // Do something...
        }
    }
];
```

### Function

*Note that this variation allows you to access the Hapi server object*

```javascript
module.exports = function( server ){
    return {
        method: 'GET',
        path: '/some_path',
        handler: function( request, reply ) {
            let some_fancy_plugin = request.server.plugins['some_fancy_plugin'];
            reply( some_fancy_plugin.doFancyThings() );
        }
    };
};
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality.
