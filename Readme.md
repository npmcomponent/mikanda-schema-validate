*This repository is a mirror of the [component](http://component.io) module [mikanda/schema-validate](http://github.com/mikanda/schema-validate). It has been modified to work with NPM+Browserify. You can install it using the command `npm install npmcomponent/mikanda-schema-validate`. Please do not open issues or send pull requests against this repo. If you have issues with this repo, report it to [npmcomponent](https://github.com/airportyh/npmcomponent).*

# schema-validate

  Validator to validate a model against a json schema.

## Installation

  Install with [component(1)](http://component.io):

    $ component install mikanda/schema-validate

## Usage

  ```js
  var model = require('model')
    , schemaValidate = require('schema-validate');

  var User = model('user')
    .use(schemaValidate())

    // define your attributes using json-schema

    .attr('name', {
      type: 'string',
      required: true
    })
    ...
    ;
  var user = new User({ ... });
  user.validate();

  // console.log(user.errors);
  ```

## API

### SchemaValidate()

  Initializes a new validator.

## License

  MIT
