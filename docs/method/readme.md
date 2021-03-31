# Methodology

The following diagram illustrates the artificial intelligence / cognitive capabilities developers can integrate in their business application. Data scientists can leverage to develop their analytics models, and the data tasks that need to be perform on private, public or licensed dataset.

![](cognitive-data-capabilities.png)

## Micro service development

From a pure software engineering implementation, we adopt agile, iterative implementation: the following lower level tasks are done:

* Develop the data model for the customer, accounts, device as java classes...
* Develop the Java REST API with resources for customer, account and products, and JAXRS annotations
* Unit test the API
* Add JPA annotation to entities, develop Data Transfer Object for service interface, refactoring the API.
* Implement Data Access Object classes with respective unit tests. In fact, we started by defining the tests. We used a embedded derby, which has a very similar SQL support as DB2, for the unit tests.
* Develop compile and build script using gradle to be ready for CI/CD
* Package the webapp as war, deploy to a liberty, tune the liberty settings
* Dockerize the service with liberty server and the webapp  
* Build helm chart to deploy to IBM Cloud private
* Build DB2 scripts to prepare the external database, create instance to test and product DB2 instances, add simple data for testing and demo
* Develop integration tests to validate at the API level the end to end senario
* Develop the WebApp to support the demonstration using nodejs and angular 4 and the BFF pattern
* Integrate the webApp with the customer manager micro service running on icp
* Define / extract the swagger using Liberty api Discovery which is able to introspect the JAXRS annotations and generates the swagger
* Share the swagger with Z OS team so they can implement the service with z Connect bases on the same interface definition
* Add API product using the swagger, publish the API to the Data Power gateway, test with Postman the integration API -> REST service on ICP -> DB2 on on-premise server.
* Change the URL of the webapp to point to the API end point, redeploy to ICP.

### Analytics specifics

The [following note](../ml/README.md) explains in detail what need to be done to prepare the data, train the model and test its validity.