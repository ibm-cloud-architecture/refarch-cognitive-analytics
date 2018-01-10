# Demonstration Script

## Training the Machine Learning Model

Customer Information that is residing in DB2 running on Z contains customer’s personal information like age, gender, profession, family, income, and account information like service usage, rate plan and device owned. The data model can be seen [here](). It also contains information about the survey input back from the customer.

Customer Information is currently planned to run and be maintained on system z.

A cloud native application running on IBM Cloud Private ingests customer information from DB2 running on mainframe into the DB2 Warehouse running on IBM cloud private on Z. (Alternatively, IBM Information Server products can be used to move data)

IBM DSX running on ICP uses the in the DB2 Warehouse to train a model to predict customer churn.

In addition, past customer voice records maintained in a file system is cleansed by a cloud native application running on IBM Cloud Private. The cleansed information is then transcribed using IBM Watson Speech to Text running on IBM Public cloud. The transcribed information is persisted on IBM Cloudant database running on IBM public cloud.

IBM Knowledge Studio is used to create custom models to understand the content that is part of the voice chat records.

The transcribed information is then used by Watson NLU running on public cloud that uses the custom model from Knowledge Studio to gain understanding of the content. In parallel Watson Tone Analyzer uses the tone to understand the tones from past historical transcripts.
The use of Watson NLU and the Tone Analyzer is orchestrated by a cloud native app running in IBM cloud private.  The output of NLU and Tone Analyzer is combined and stored in Cloudant DB running on public cloud.

IBM DSX running on IBM Watson Data Platform in IBM public cloud catalogs the content from IBM Cloudant (IBM NLU and Tone Analyzer information extracted) and the DB2 Warehouse information and builds a new ML model. This model is deployed on IBM Watson ML running on ICP. Now we have trained model to predict customer churn


## Predicting Customer Churn

Z OS Connect is used to create an API (Get Customer Detail). This API returns the customer information based on customer id.

Eddie logs on to chat bot application built as a Microservice and running on IBM Cloud Private.
Using the customer id from the login, the app invokes the Get Customer Detail API. This API uses API Connect and Z OS Connect to retrieve the customer information. This information is collected by the App in memory.

Eddie complains about the poor quality of data and chat service while he was overseas. Eddie also talks about the rejection of his $750 claim.  Eddie is not very happy. The chat transcript from Eddie is sent to Tone Analyzer and NLU which then determine the sentiment and tone. Using the sentiment and the tone it is determined that Edie is not happy. The chatbot application then invokes the customer churn service which uses the ML model to determine that the customer is not a happy customer and has been with the Telco for 2 years. Eddie has a genuine problem and deserves a senior call center rep or a supervisor. Eddie is the type of customer the Telco does not want to loose. The application then asks Eddie for a number and the supervisor calls Eddie and clarifies and resolves Eddies issues.
