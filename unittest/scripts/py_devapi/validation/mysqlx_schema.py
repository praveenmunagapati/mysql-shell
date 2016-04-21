#@ Testing schema name retrieving
|getName(): js_shell_test|
|name: js_shell_test|

#@ Testing schema.getSession
|getSession(): <NodeSession:|

#@ Testing schema.session
|session: <NodeSession:|

#@ Testing schema schema retrieving
|getSchema(): None|
|schema: None|

#@ Testing tables, views and collection retrieval
|getTables(): <Table:table1>|
|getViews(): <View:view1>|
|getCollections(): <Collection:collection1>|

#@ Testing specific object retrieval
|getTable(): <Table:table1>|
|.<table>: <Table:table1>|
|getView(): <View:view1>|
|.<view>: <View:view1>|
|getCollection(): <Collection:collection1>|
|.<collection>: <Collection:collection1>|

#@# Testing specific object retrieval: unexisting objects
||The table js_shell_test.unexisting does not exist 
||The view js_shell_test.unexisting does not exist 
||The collection js_shell_test.unexisting does not exist 

#@# Testing specific object retrieval: empty name
||An empty name is invalid for a table
||An empty name is invalid for a view
||An empty name is invalid for a collection

#@ Retrieving collection as table
|getCollectionAsTable(): <Table:collection1>|

#@ Collection creation
|createCollection(): <Collection:my_sample_collection>|

#@ Testing existence
|Valid: True|
|Invalid: False|

