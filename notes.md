# Start demo cluster
```
$COCKROACH_HOME/cockroach demo --nodes=1 --pid-file=/tmp/crdb-demo.pid --log-dir=/home/chandrat/crdb-demo --multitenant=true
```

## Connection strings
- **Demoapp tenant:** `postgresql://demo:demo250897@127.0.0.1:26257/movr?options=-ccluster%3Ddemoapp&sslmode=require&sslrootcert=%2Fhome%2Fchandrat%2F.cockroach-demo%2Fca.crt`
- **System tenant:** `postgresql://demo:demo250897@127.0.0.1:26257/defaultdb?options=-ccluster%3Dsystem&sslmode=require&sslrootcert=%2Fhome%2Fchandrat%2F.cockroach-root%2Fca.crt`

# Start a Single Node Cluster
```
$COCKROACH_HOME/cockroach start-single-node --certs-dir=$HOME/.cockroach-demo --listen-addr=localhost:36257 --sql-addr=localhost:26257 --http-addr 0.0.0.0:8080
```

## Connection String

Connect as root to system tenant:
```
postgresql://root@localhost:26257/defaultdb?options=-ccluster%3Dsystem&sslcert=%2Fhome%2Fchandrat%2F.cockroach-demo%2Fclient.root.crt&sslkey=%2Fhome%2Fchandrat%2F.cockroach-demo%2Fclient.root.key&sslmode=verify-full&sslrootcert=%2Fhome%2Fchandrat%2F.cockroach-demo%2Fca.crt
```

## Create virtual cluster

Connect using system tenant to create a new virtual cluster (aka secondary tenant):
```
# Create virtual cluster
create virtual cluster "tenant-3" ;

# Check if the cluster is created
show virtual clusters;
```

Start virtual cluster in external mode (seperate process or SQL service pod):
```
# Start service
alter virtual cluster "tenant-3" start service external; 

# Check if the service has started
show virtual clusters;
```

# Start a SQL Server Process

## Create Tenant Certs

### Create Tenant CA certs
```
$COCKROACH_HOME/cockroach mt cert create-tenant-client-ca --certs-dir=$HOME/.cockroach-demo --ca-key=/home/chandrat/.cockroach-demo/ca-client-tenant.key
```

### Create Tenant Client Certs
```
$COCKROACH_HOME/cockroach mt cert create-tenant-client --certs-dir=$HOME/.cockroach-demo --ca-key=$HOME/.cockroach-demo/ca-client-tenant.key 3
```

## Start SQL Server Process
```
$COCKROACH_HOME/cockroach mt start-sql --certs-dir=$HOME/.cockroach-demo --tenant-id=3 --kv-addrs=localhost:36257 --listen-addr=localhost:36258 --sql-addr=localhost:26258 --http-addr 0.0.0.0:8081
```

# Issues
- Assuming SQL server tenants use `client-tenant.X.crt` and `client-tenant.X.key` generated from `ca-client-tenant.crt`, the SQL connection string must use `ca-client-tenant.crt` as the CA cert for verifying SQL server certs. 
