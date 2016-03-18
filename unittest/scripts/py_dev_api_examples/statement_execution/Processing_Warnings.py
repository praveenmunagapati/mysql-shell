
import mysqlx

# Connect to server
mySession = mysqlx.getSession( {
        'host': 'localhost', 'port': 33060,
        'dbUser': 'mike', 'dbPassword': 's3cr3t!' } )

# Get the Schema test
myDb = mySession.getSchema('test')

# Create a new collection
myColl = myDb.createCollection('my_collection')

# Start a transaction
mySession.startTransaction()
try:
    myColl.add({'name': 'Jack', 'age': 15, 'height': 1.76, 'weight': 69.4}).execute()
    myColl.add({'name': 'Susanne', 'age': 24, 'height': 1.65}).execute()
    myColl.add({'name': 'Mike', 'age': 39, 'height': 1.9, 'weight': 74.3}).execute()
    
    # Commit the transaction if everything went well
    reply = mySession.commit()
    
    # handle warnings
    if reply.warningCount:
      for warning in result.getWarnings():
        print 'Type [%s] (Code %s): %s\n' % (warning.Level, warning.Code, warning.Message)
    
    print 'Data inserted successfully.'
except Exception, err:
    # Rollback the transaction in case of an error
    reply = mySession.rollback()
    
    # handle warnings
    if reply.warningCount:
      for warning in result.getWarnings():
        print 'Type [%s] (Code %s): %s\n' % (warning.Level, warning.Code, warning.Message)
    
    # Printing the error message
    print 'Data could not be inserted: %s' % err.message
