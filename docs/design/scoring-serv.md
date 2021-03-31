# Churn Scoring Service

We have tried two deployment approaches:

* Use Watson Machine Learning Service to deploy the model defined in Data Science Experiences, trained with Apache Sparks. [This note](../ml/README.md) goes over how to use Watson Data Platform to develop the model and publish it.  
* Use Sparks in ICP and deploy it as a service

## Publishing the model

In the Jupyter notebook it is possible to persist the model. The service URL, username and password are the one for the Watson Machine Learning service on IBM Cloud:

```python
from repository.mlrepositoryclient import MLRepositoryClient
from repository.mlrepositoryartifact import MLRepositoryArtifact
ml_repository_client = MLRepositoryClient(service_url)
ml_repository_client.authorize(username, password)

model_artifact = MLRepositoryArtifact(model, training_data=train, name="Customer Churn Prediction")
saved_model = ml_repository_client.models.save(model_artifact)
```

Once deployed the service can be accessed via API. The code is in server/routes/features/WMLChurnServiceClient.js. The approach is to:

* Get an authorization token
* Prepare the data for the service: customer record, tone analysis results...
* Do a POST on the deployed scoring service. The parameters come from a config file or when deployed in kubernetes cluster from a configMap.

```javascript
const scoring_url = config.scoringService.baseUrl+config.scoringService.instance;
request(***REMOVED***url:scoring_url,
      method:"POST",
      headers: ***REMOVED***
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: 'Bearer '+token
    ***REMOVED***
      body: JSON.stringify(payload)
      ...
    ***REMOVED***)
```

## ICP 

For the ICP DSX work, the Data Scientists is using the data centralized in Db2 Warehouse. The notebook is under src/dsx folder, named `CustomerChurnAnalysisDSXICP.ipynb`.

Loading data from DB2 tables, you need the core utils module, and then using the Spark Session to load data.
```python
import dsx_core_utils

dataSet = dsx_core_utils.get_remote_data_set_info('CUSTOMER')
dataSource = dsx_core_utils.get_data_source_info(dataSet['datasource'])
print(dataSource)
dbTableOrQuery = dataSet['schema'] + '.' + dataSet['table']
print(dbTableOrQuery)
sparkSession = SparkSession(sc).builder.getOrCreate()
df_customer_transactions = sparkSession.read.format("jdbc").option("url", dataSource['URL']).option("dbtable",dbTableOrQuery).option("user",'BLUADMIN').option("password","changemeplease").load()
df_customer_transactions.show(5)
df_customer_transactions.printSchema()
```

Then the process is the same for doing data cleansing, visualization...
To persist the mode the client is the same, but the URL does not need to be specified as it will be saved to the ml repository inside DSX running in ICP.

```python
from repository.mlrepositoryclient import MLRepositoryClient
from repository.mlrepositoryartifact import MLRepositoryArtifact
service_path = 'https://internal-nginx-svc.ibm-private-cloud.svc.cluster.local:12443'
ml_repository_client = MLRepositoryClient()
model_artifact = MLRepositoryArtifact(model, training_data=train, name="Customer Churn Prediction - db2")
model_artifact.meta.add("authorName", "Data Scientist 007");
saved_model = ml_repository_client.models.save(model_artifact)
```
