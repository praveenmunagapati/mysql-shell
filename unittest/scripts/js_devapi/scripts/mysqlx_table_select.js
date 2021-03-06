// Assumptions: validate_crud_functions available
// Assumes __uripwd is defined as <user>:<pwd>@<host>:<plugin_port>
var mysqlx = require('mysqlx');

var mySession = mysqlx.getNodeSession(__uripwd);

ensure_schema_does_not_exist(mySession, 'js_shell_test');

var schema = mySession.createSchema('js_shell_test');
mySession.setCurrentSchema('js_shell_test');

// Creates a test table with initial data
var result = mySession.sql('create table table1 (name varchar(50), age integer, gender varchar(20), primary key (name, age, gender));').execute();
var result = mySession.sql('create view view1 (my_name, my_age, my_gender) as select name, age, gender from table1;').execute();
var table = schema.getTable('table1');

var result = table.insert({ name: 'jack', age: 17, gender: 'male' }).execute();
var result = table.insert({ name: 'adam', age: 15, gender: 'male' }).execute();
var result = table.insert({ name: 'brian', age: 14, gender: 'male' }).execute();
var result = table.insert({ name: 'alma', age: 13, gender: 'female' }).execute();
var result = table.insert({ name: 'carol', age: 14, gender: 'female' }).execute();
var result = table.insert({ name: 'donna', age: 16, gender: 'female' }).execute();
var result = table.insert({ name: 'angel', age: 14, gender: 'male' }).execute();

// ----------------------------------------------
// Table.Select Unit Testing: Dynamic Behavior
// ----------------------------------------------
//@ TableSelect: valid operations after select
var crud = table.select();
validate_crud_functions(crud, ['where', 'groupBy', 'orderBy', 'limit', 'bind', 'execute']);

//@ TableSelect: valid operations after where
var crud = crud.where('age > 13');
validate_crud_functions(crud, ['groupBy', 'orderBy', 'limit', 'bind', 'execute']);

//@ TableSelect: valid operations after groupBy
var crud = crud.groupBy(['name']);
validate_crud_functions(crud, ['having', 'orderBy', 'limit', 'bind', 'execute']);

//@ TableSelect: valid operations after having
var crud = crud.having('age > 10');
validate_crud_functions(crud, ['orderBy', 'limit', 'bind', 'execute']);

//@ TableSelect: valid operations after orderBy
var crud = crud.orderBy(['age']);
validate_crud_functions(crud, ['limit', 'bind', 'execute']);

//@ TableSelect: valid operations after limit
var crud = crud.limit(1);
validate_crud_functions(crud, ['offset', 'bind', 'execute']);

//@ TableSelect: valid operations after offset
var crud = crud.offset(1);
validate_crud_functions(crud, ['bind', 'execute']);

//@ TableSelect: valid operations after bind
var crud = table.select().where('name = :data').bind('data', 'adam')
validate_crud_functions(crud, ['bind', 'execute']);

//@ TableSelect: valid operations after execute
var result = crud.execute();
validate_crud_functions(crud, ['bind', 'execute']);

//@ Reusing CRUD with binding
print(result.fetchOne().name + '\n');
var result = crud.bind('data', 'alma').execute();
print(result.fetchOne().name + '\n');

// ----------------------------------------------
// Table.Select Unit Testing: Error Conditions
// ----------------------------------------------

//@# TableSelect: Error conditions on select
crud = table.select(5);
crud = table.select([]);
crud = table.select(['name as alias', 5]);
crud = table.select('name as alias', 5);

//@# TableSelect: Error conditions on where
crud = table.select().where();
crud = table.select().where(5);
crud = table.select().where('name = "whatever');

//@# TableSelect: Error conditions on groupBy
crud = table.select().groupBy();
crud = table.select().groupBy(5);
crud = table.select().groupBy([]);
crud = table.select().groupBy(['name', 5]);
crud = table.select().groupBy('name', 5);

//@# TableSelect: Error conditions on having
crud = table.select().groupBy(['name']).having();
crud = table.select().groupBy(['name']).having(5);

//@# TableSelect: Error conditions on orderBy
crud = table.select().orderBy();
crud = table.select().orderBy(5);
crud = table.select().orderBy([]);
crud = table.select().orderBy(['name', 5]);
crud = table.select().orderBy('name', 5);

//@# TableSelect: Error conditions on limit
crud = table.select().limit();
crud = table.select().limit('');

//@# TableSelect: Error conditions on offset
crud = table.select().limit(1).offset();
crud = table.select().limit(1).offset('');

//@# TableSelect: Error conditions on bind
crud = table.select().where('name = :data and age > :years').bind();
crud = table.select().where('name = :data and age > :years').bind(5, 5);
crud = table.select().where('name = :data and age > :years').bind('another', 5);

//@# TableSelect: Error conditions on execute
crud = table.select().where('name = :data and age > :years').execute();
crud = table.select().where('name = :data and age > :years').bind('years', 5).execute();

// ---------------------------------------
// Table.Select Unit Testing: Execution
// ---------------------------------------
//@ Table.Select All
var records = table.select().execute().fetchAll();
print("All:", records.length, "\n");

//@ Table.Select Filtering
var records = table.select().where('gender = "male"').execute().fetchAll();
print("Males:", records.length, "\n");

var records = table.select().where('gender = "female"').execute().fetchAll();
print("Females:", records.length, "\n");

var records = table.select().where('age = 13').execute().fetchAll();
print("13 Years:", records.length, "\n");

var records = table.select().where('age = 14').execute().fetchAll();
print("14 Years:", records.length, "\n");

var records = table.select().where('age < 17').execute().fetchAll();
print("Under 17:", records.length, "\n");

var records = table.select().where('name like "a%"').execute().fetchAll();
print("Names With A:", records.length, "\n");

var records = table.select().where('name LIKE "a%"').execute().fetchAll();
print("Names With A:", records.length, "\n");

var records = table.select().where('NOT (age = 14)').execute().fetchAll();
print("Not 14 Years:", records.length, "\n");

//@ Table.Select Field Selection
var result = table.select(['name', 'age']).execute();
var record = result.fetchOne();
var columns = dir(record)
print(columns)
print('1-Metadata Length:', columns.length, '\n');
print('1-Metadata Field:', columns[1], '\n');
print('1-Metadata Field:', columns[2], '\n');

var result = table.select(['age']).execute();
var record = result.fetchOne();
var columns = dir(record)
print('2-Metadata Length:', columns.length, '\n');
print('2-Metadata Field:', columns[1], '\n');

//@ Table.Select Sorting
var records = table.select().orderBy(['name']).execute().fetchAll();
for (index = 0; index < 7; index++) {
  print('Select Asc', index, ':', records[index].name, '\n');
}

var records = table.select().orderBy(['name desc']).execute().fetchAll();
for (index = 0; index < 7; index++) {
  print('Select Desc', index, ':', records[index].name, '\n');
}

//@ Table.Select Limit and Offset
var records = table.select().limit(4).execute().fetchAll();
print('Limit-Offset 0 :', records.length, '\n');

for (index = 1; index < 8; index++) {
  var records = table.select().limit(4).offset(index).execute().fetchAll();
  print('Limit-Offset', index, ':', records.length, '\n');
}

//@ Table.Select Parameter Binding through a View
var view = schema.getTable('view1');
var records = view.select().where('my_age = :years and my_gender = :heorshe').bind('years', 13).bind('heorshe', 'female').execute().fetchAll();
print('Select Binding Length:', records.length, '\n');
print('Select Binding Name:', records[0].my_name, '\n');

//@ Table.Select Basic vertical output
shell.options.outputFormat = "vertical"
table.select('name');

//@ Table.Select Check column align in vertical mode
shell.options.outputFormat = "vertical"
table.select('*').where('age > 15');

//@ Table.Select Check row with newline in vertical mode
shell.options.outputFormat = "vertical"
table.insert({ name: 'john\ndoe', age: 13, gender: 'male' }).execute();
table.select('*').where('age = 13');

//@ Table.Select Check switching between table and vertical mode
shell.options.outputFormat = "vertical"
table.select('name').where('age > 16');
shell.options.outputFormat = "table"
table.select('name').where('age > 16');

// Cleanup
mySession.dropSchema('js_shell_test');
mySession.close();
