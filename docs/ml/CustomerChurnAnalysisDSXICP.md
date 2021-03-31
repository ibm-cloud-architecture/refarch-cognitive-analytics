
# Evaluate and predict customer churn

This notebook is an adaptation from the work done by [Sidney Phoon and Eleva Lowery](https://github.com/IBMDataScience/DSX-DemoCenter/tree/master/DSX-Local-Telco-Churn-master) with the following modifications:

* Use datasets persisted in DB2 Warehouse running on ICP
* Deploy and run the notebook on DSX local running on IBM Cloud Private (ICP)
* Run spark Machine learning job on ICP as part of the worker nodes.
* Document some actions for a beginner data scientist / developer who wants to understand what's going on.

The goal is to demonstrate how to build a predictive model with Spark machine learning API (SparkML) to predict customer churn, and deploy it for scoring in Machine Learning (ML) running on ICP. There is an equivalent notebook to run on Watson Data Platform and Watson Machine Learning.


## Scope

A lot of industries have the issue of customers moving to competitors when the product differentiation is not that important, or there is some customer support issues. One industry illustrating this problem is the telecom industry with mobile, internet and IP TV product offerings.

## Note book explanations

The notebook aims to follow the classical data science modeling steps:

load the data
prepare the data
analyze the data (iterate on those two activities)
build a model
validate the accuracy of the model
deploy the model
consume the model as a service

This jupyter notebook uses Apache Spark to run the machine learning jobs to build decision trees using random forest classifier to assess when a customer is at risk to move to competitor. Apache Spark offers a Python module called pyspark to operate on data and use ML constructs.

### Start by all imports
As a best practices for notebook implementation is to do the import at the top of the notebook. 
* [Spark SQLContext](https://spark.apache.org/docs/latest/sql-programming-guide.html) a spark module to process structured data
* [spark conf]() to access Spark cluster configuration and then be able to execute queries
* [pandas](https://pandas.pydata.org) Python super library for data analysis
* [brunel](https://github.com/Brunel-Visualization/Brunel/wiki) API and tool to visualize data quickly. 
* [pixiedust](www.ibm.com/PixieDust) Visualize data inside Jupyter notebooks

The first cell below is to execute some system commands to update the kernel with updated dependant library.


```python
# Library required for pixiedust - a visualization and dashboarding framework
!pip install --user --upgrade pixiedust
```

    Requirement already up-to-date: pixiedust in /user-home/1002/.local/lib/python2.7/site-packages
    Requirement already up-to-date: astunparse in /user-home/1002/.local/lib/python2.7/site-packages (from pixiedust)
    Requirement already up-to-date: mpld3 in /opt/conda/lib/python2.7/site-packages (from pixiedust)
    Requirement already up-to-date: markdown in /user-home/1002/.local/lib/python2.7/site-packages (from pixiedust)
    Requirement already up-to-date: geojson in /user-home/1002/.local/lib/python2.7/site-packages (from pixiedust)
    Requirement already up-to-date: lxml in /user-home/1002/.local/lib/python2.7/site-packages (from pixiedust)
    Requirement already up-to-date: six<2.0,>=1.6.1 in /user-home/1002/.local/lib/python2.7/site-packages (from astunparse->pixiedust)
    Requirement already up-to-date: wheel<1.0,>=0.23.0 in /user-home/1002/.local/lib/python2.7/site-packages (from astunparse->pixiedust)



```python
import pyspark
import pandas as pd
import brunel
import numpy as np
from pyspark.sql import SQLContext
from pyspark.conf import SparkConf
from pyspark.sql import SparkSession
from pyspark.sql.types import DoubleType
from pyspark.sql.types import DecimalType
from pyspark.sql.types import IntegerType
from pyspark.sql.types import LongType
from pyspark.ml.feature import OneHotEncoder, StringIndexer, VectorIndexer, IndexToString
from pyspark.ml import Pipeline
from pyspark.ml.feature import VectorAssembler
from pyspark.ml.classification import RandomForestClassifier
from pyspark.ml.evaluation import BinaryClassificationEvaluator
from pixiedust.display import *

```

    Pixiedust database opened successfully




        <div style="margin:10px">
            <a href="https://github.com/ibm-watson-data-lab/pixiedust" target="_new">
                <img src="https://github.com/ibm-watson-data-lab/pixiedust/raw/master/docs/_static/pd_icon32.png" style="float:left;margin-right:10px"/>
            </a>
            <span>Pixiedust version 1.1.7.1</span>
        </div>
        


## Load data from DB2

DSX ICP can be used to bring in data from multiple sources including but not limited to, files, datastores on cloud as well as on premises. DSX ICP includes features to connect to data sources, bring in the data, refine, and then perform analytics.

In this sample we connect to DB2 Data Warehouse deployed on ICP and bring data about customer, call notes and marketing campaign in.


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

    ***REMOVED***u'description': u'', u'URL': u'jdbc:db2://172.16.40.131:32166/BLUDB', 'driver_class': 'com.ibm.db2.jcc.DB2Driver', u'dsx_artifact_type': u'datasource', u'shared': True, u'type': u'DB2', u'name': u'CUSTOMER'***REMOVED***
    BLUADMIN.CUSTOMER
    +----+------+------+--------+----------+---------+---------+--------------+-------+------------+-------------+-----+-------+---------+-------------+--------------------+------+--------+-----------+-----+
    |  ID|GENDER|STATUS|CHILDREN|EST_INCOME|CAR_OWNER|      AGE|MARITAL_STATUS|ZIPCODE|LONGDISTANCE|INTERNATIONAL|LOCAL|DROPPED|PAYMETHOD|LOCALBILLTYPE|LONGDISTANCEBILLTYPE| USAGE|RATEPLAN|DEVICEOWNED|CHURN|
    +----+------+------+--------+----------+---------+---------+--------------+-------+------------+-------------+-----+-------+---------+-------------+--------------------+------+--------+-----------+-----+
    |1311|     F|     M|       0|  53432.20|        Y|57.000000|       Married|   null|       12.56|            0|83.48|      0|       CH|    FreeLocal|            Standard| 96.04|       1|       ipho|    F|
    |1312|     M|     M|       0|  78894.20|        N|52.740000|       Married|   null|        2.00|            1|43.23|      0|       CH|       Budget|      Intnl_discount| 46.65|       3|       ipho|    T|
    |1313|     M|     S|       1|  16432.10|        Y|20.920000|        Single|   null|       20.41|            8|80.47|      0|       CH|       Budget|      Intnl_discount|109.78|       3|       ipho|    T|
    |1314|     M|     M|       0|  62797.90|        N|54.446667|       Married|   null|        8.32|            4|55.48|      0|       CH|       Budget|      Intnl_discount| 68.09|       3|       ipho|    T|
    |1315|     M|     S|       1|  71329.90|        Y|42.233333|        Single|   null|       14.27|            3|45.92|      0|       CC|       Budget|            Standard| 63.75|       1|       ipho|    T|
    +----+------+------+--------+----------+---------+---------+--------------+-------+------------+-------------+-----+-------+---------+-------------+--------------------+------+--------+-----------+-----+
    only showing top 5 rows
    
    root
     |-- ID: integer (nullable = true)
     |-- GENDER: string (nullable = true)
     |-- STATUS: string (nullable = true)
     |-- CHILDREN: integer (nullable = true)
     |-- EST_INCOME: decimal(8,2) (nullable = true)
     |-- CAR_OWNER: string (nullable = true)
     |-- AGE: decimal(14,6) (nullable = true)
     |-- MARITAL_STATUS: string (nullable = true)
     |-- ZIPCODE: integer (nullable = true)
     |-- LONGDISTANCE: decimal(6,2) (nullable = true)
     |-- INTERNATIONAL: integer (nullable = true)
     |-- LOCAL: decimal(7,2) (nullable = true)
     |-- DROPPED: integer (nullable = true)
     |-- PAYMETHOD: string (nullable = true)
     |-- LOCALBILLTYPE: string (nullable = true)
     |-- LONGDISTANCEBILLTYPE: string (nullable = true)
     |-- USAGE: decimal(7,2) (nullable = true)
     |-- RATEPLAN: integer (nullable = true)
     |-- DEVICEOWNED: string (nullable = true)
     |-- CHURN: string (nullable = true)
    



```python
dataSet = dsx_core_utils.get_remote_data_set_info('CALLNOTES')
dataSource = dsx_core_utils.get_data_source_info(dataSet['datasource'])
print(dataSource)
dbTableOrQuery = dataSet['schema'] + '.' + dataSet['table']
print(dbTableOrQuery)
sparkSession = SparkSession(sc).builder.getOrCreate()
df_call_notes = sparkSession.read.format("jdbc").option("url", dataSource['URL']).option("dbtable",dbTableOrQuery).option("user",'BLUADMIN').option("password","changemeplease").load()
df_call_notes.show(5)
df_call_notes.printSchema()

```

    ***REMOVED***u'description': u'', u'URL': u'jdbc:db2://172.16.40.131:32166/BLUDB', 'driver_class': 'com.ibm.db2.jcc.DB2Driver', u'dsx_artifact_type': u'datasource', u'shared': True, u'type': u'DB2', u'name': u'CUSTOMER'***REMOVED***
    BLUADMIN.CALLNOTES
    +----+--------------------+----------+--------------+--------+
    |  ID|            COMMENTS|SENTIMENTS|      KEYWORD1|KEYWORD2|
    +----+--------------------+----------+--------------+--------+
    |2253|Wants to change a...|      null|update records| address|
    |2254|Wants to change a...|      null|update records| address|
    |2255|Wants to change a...|      null|update records| address|
    |2256|Wants to change a...|      null|update records| address|
    |2257|Needed help figur...|analytical|       billing| charges|
    +----+--------------------+----------+--------------+--------+
    only showing top 5 rows
    
    root
     |-- ID: integer (nullable = true)
     |-- COMMENTS: string (nullable = true)
     |-- SENTIMENTS: string (nullable = true)
     |-- KEYWORD1: string (nullable = true)
     |-- KEYWORD2: string (nullable = true)
    



```python
dataSet = dsx_core_utils.get_remote_data_set_info('CAMPAIGNRESPONSES_EXPANDED')
dataSource = dsx_core_utils.get_data_source_info(dataSet['datasource'])
print(dataSource)
dbTableOrQuery = dataSet['schema'] + '.' + dataSet['table']
print(dbTableOrQuery)
sparkSession = SparkSession(sc).builder.getOrCreate()
df_campaign_responses = sparkSession.read.format("jdbc").option("url", dataSource['URL']).option("dbtable",dbTableOrQuery).option("user",'BLUADMIN').option("password","changemeplease").load()
df_campaign_responses.show(5)
df_campaign_responses.printSchema()
```

    ***REMOVED***u'description': u'', u'URL': u'jdbc:db2://172.16.40.131:32166/BLUDB', 'driver_class': 'com.ibm.db2.jcc.DB2Driver', u'dsx_artifact_type': u'datasource', u'shared': True, u'type': u'DB2', u'name': u'CUSTOMER'***REMOVED***
    BLUADMIN.CAMPAIGNRESPONSES_EXPANDED
    +----+------------------+---------------------------+-------------------------------------+
    |  ID|RESPONDED_CAMPAIGN|OWNS_MULTIPLE_PHONE_NUMBERS|AVERAGE_TEXT_MESSAGES__90_DAY_PERIOD_|
    +----+------------------+---------------------------+-------------------------------------+
    |3064|       Kids Tablet|                          Y|                                 1561|
    |3077|       Kids Tablet|                          Y|                                 1225|
    |3105|       Kids Tablet|                          Y|                                 1661|
    |3106|       Kids Tablet|                          N|                                 2498|
    |3108|       Kids Tablet|                          N|                                 1118|
    +----+------------------+---------------------------+-------------------------------------+
    only showing top 5 rows
    
    root
     |-- ID: integer (nullable = true)
     |-- RESPONDED_CAMPAIGN: string (nullable = true)
     |-- OWNS_MULTIPLE_PHONE_NUMBERS: string (nullable = true)
     |-- AVERAGE_TEXT_MESSAGES__90_DAY_PERIOD_: integer (nullable = true)
    


## Data Preparation
The next few steps involve a series of data preparation tasks such as filling the missing values, joining datasets etc. The following cell fills the null values for average SMS count and replaces Nulls with spaces for other fields. 


```python
df_campaign_responses = df_campaign_responses.na.fill(***REMOVED***'AVERAGE_TEXT_MESSAGES__90_DAY_PERIOD_':'0'***REMOVED***)
df_call_notes = df_call_notes.na.fill(***REMOVED***'SENTIMENTS':' '***REMOVED***)
df_call_notes = df_call_notes.na.fill(***REMOVED***'KEYWORD1':' '***REMOVED***)
df_call_notes = df_call_notes.na.fill(***REMOVED***'KEYWORD2':' '***REMOVED***)
```

In the following cell we join some of the customer and call note data sources using the ID field. This ID field is the one coming from the CUSTOMER DB2 transactional database.


```python
data_joined_callnotes_churn = df_call_notes.join(df_customer_transactions,df_call_notes['ID']==df_customer_transactions['ID'],'inner').select(df_call_notes['SENTIMENTS'],df_call_notes['KEYWORD1'],df_call_notes['KEYWORD2'],df_customer_transactions['*'])
data_joined_callnotes_churn_campaign = df_campaign_responses.join(data_joined_callnotes_churn,df_campaign_responses['ID']==data_joined_callnotes_churn['ID'],'inner').select(data_joined_callnotes_churn['*'],df_campaign_responses['RESPONDED_CAMPAIGN'],df_campaign_responses['OWNS_MULTIPLE_PHONE_NUMBERS'],df_campaign_responses['AVERAGE_TEXT_MESSAGES__90_DAY_PERIOD_'])
data_joined_callnotes_churn_campaign.take(5)
```




    [Row(SENTIMENTS=u' ', KEYWORD1=u'help', KEYWORD2=u'support', ID=148, GENDER=u'M', STATUS=u'M', CHILDREN=2, EST_INCOME=Decimal('91272.20'), CAR_OWNER=u'Y', AGE=Decimal('25.033333'), MARITAL_STATUS=u'Married', ZIPCODE=None, LONGDISTANCE=Decimal('26.99'), INTERNATIONAL=0, LOCAL=Decimal('13.01'), DROPPED=0, PAYMETHOD=u'CC', LOCALBILLTYPE=u'FreeLocal', LONGDISTANCEBILLTYPE=u'Standard', USAGE=Decimal('40.00'), RATEPLAN=3, DEVICEOWNED=u'ipho', CHURN=u'F', RESPONDED_CAMPAIGN=u'Android Phone', OWNS_MULTIPLE_PHONE_NUMBERS=u'N', AVERAGE_TEXT_MESSAGES__90_DAY_PERIOD_=1900),
     Row(SENTIMENTS=u' ', KEYWORD1=u'update records', KEYWORD2=u'address', ID=463, GENDER=u'M', STATUS=u'M', CHILDREN=0, EST_INCOME=Decimal('69168.40'), CAR_OWNER=u'Y', AGE=Decimal('62.426667'), MARITAL_STATUS=u'Married', ZIPCODE=None, LONGDISTANCE=Decimal('14.16'), INTERNATIONAL=6, LOCAL=Decimal('214.73'), DROPPED=0, PAYMETHOD=u'CC', LOCALBILLTYPE=u'Budget', LONGDISTANCEBILLTYPE=u'Standard', USAGE=Decimal('234.91'), RATEPLAN=2, DEVICEOWNED=u'sam', CHURN=u'T', RESPONDED_CAMPAIGN=u'Dual SIM', OWNS_MULTIPLE_PHONE_NUMBERS=u'Y', AVERAGE_TEXT_MESSAGES__90_DAY_PERIOD_=1586),
     Row(SENTIMENTS=u'analytical', KEYWORD1=u'billing', KEYWORD2=u'charges', ID=471, GENDER=u'M', STATUS=u'M', CHILDREN=2, EST_INCOME=Decimal('90103.70'), CAR_OWNER=u'N', AGE=Decimal('34.946667'), MARITAL_STATUS=u'Married', ZIPCODE=None, LONGDISTANCE=Decimal('12.23'), INTERNATIONAL=8, LOCAL=Decimal('45.34'), DROPPED=0, PAYMETHOD=u'CC', LOCALBILLTYPE=u'Budget', LONGDISTANCEBILLTYPE=u'Intnl_discount', USAGE=Decimal('66.45'), RATEPLAN=3, DEVICEOWNED=u'sam', CHURN=u'F', RESPONDED_CAMPAIGN=u'More Storage', OWNS_MULTIPLE_PHONE_NUMBERS=u'N', AVERAGE_TEXT_MESSAGES__90_DAY_PERIOD_=1114),
     Row(SENTIMENTS=u'satisfied', KEYWORD1=u'battery', KEYWORD2=u'unpredictability', ID=1238, GENDER=u'F', STATUS=u'M', CHILDREN=2, EST_INCOME=Decimal('3193.60'), CAR_OWNER=u'N', AGE=Decimal('54.046667'), MARITAL_STATUS=u'Married', ZIPCODE=None, LONGDISTANCE=Decimal('4.19'), INTERNATIONAL=0, LOCAL=Decimal('114.62'), DROPPED=1, PAYMETHOD=u'CH', LOCALBILLTYPE=u'Budget', LONGDISTANCEBILLTYPE=u'Standard', USAGE=Decimal('118.82'), RATEPLAN=3, DEVICEOWNED=u'ipho', CHURN=u'F', RESPONDED_CAMPAIGN=u'Large Display', OWNS_MULTIPLE_PHONE_NUMBERS=u'N', AVERAGE_TEXT_MESSAGES__90_DAY_PERIOD_=1697),
     Row(SENTIMENTS=u'frustrated', KEYWORD1=u'charger', KEYWORD2=u'switch carrier', ID=1342, GENDER=u'M', STATUS=u'S', CHILDREN=0, EST_INCOME=Decimal('94928.30'), CAR_OWNER=u'N', AGE=Decimal('40.180000'), MARITAL_STATUS=u'Single', ZIPCODE=None, LONGDISTANCE=Decimal('14.42'), INTERNATIONAL=5, LOCAL=Decimal('73.74'), DROPPED=0, PAYMETHOD=u'CC', LOCALBILLTYPE=u'FreeLocal', LONGDISTANCEBILLTYPE=u'Standard', USAGE=Decimal('93.78'), RATEPLAN=1, DEVICEOWNED=u'ipho', CHURN=u'T', RESPONDED_CAMPAIGN=u'Dual SIM', OWNS_MULTIPLE_PHONE_NUMBERS=u'Y', AVERAGE_TEXT_MESSAGES__90_DAY_PERIOD_=1540)]



##### The following code block is intended to get a feel for Spark DataFrame APIs. We attempt to fix some of the column titles to promote readability, and also remove a duplicate column (Status and Marital Status are the same).  Finally convert the DataFrame to Python Pandas structure for visualization. Since some fields are string types from DB2 tables, let us change some of them to other types


```python
# Change some column names

data_joined_callnotes_churn_campaign = data_joined_callnotes_churn_campaign.withColumnRenamed("SENTIMENTS", "SENTIMENT").withColumnRenamed("OWNS_MULTIPLE_PHONE_NUMBERS","OMPN")
data_joined_callnotes_churn_campaign = data_joined_callnotes_churn_campaign.withColumnRenamed("KEYWORD1", "KEYWORD_COMPONENT").withColumnRenamed("KEYWORD2","KEYWORD_QUERY")
data_joined_callnotes_churn_campaign = data_joined_callnotes_churn_campaign.withColumnRenamed("AVERAGE_TEXT_MESSAGES__90_DAY_PERIOD_", "SMSCOUNT").withColumnRenamed("CAR_OWNER","CAROWNERSHIP")
data_joined_callnotes_churn_campaign = data_joined_callnotes_churn_campaign.withColumnRenamed("MARITAL_STATUS", "MARITALSTATUS").withColumnRenamed("EST_INCOME","INCOME")
data_joined_callnotes_churn_campaign = data_joined_callnotes_churn_campaign.drop('Status')

# Change some of the data types

data_joined_callnotes_churn_campaign = data_joined_callnotes_churn_campaign.withColumn("CHILDREN", data_joined_callnotes_churn_campaign["CHILDREN"].cast(IntegerType()))
data_joined_callnotes_churn_campaign = data_joined_callnotes_churn_campaign.withColumn("INCOME", data_joined_callnotes_churn_campaign["INCOME"].cast(DecimalType()))
data_joined_callnotes_churn_campaign = data_joined_callnotes_churn_campaign.withColumn("AGE", data_joined_callnotes_churn_campaign["AGE"].cast(IntegerType()))
data_joined_callnotes_churn_campaign = data_joined_callnotes_churn_campaign.withColumn("LONGDISTANCE", data_joined_callnotes_churn_campaign["LONGDISTANCE"].cast(DecimalType()))
data_joined_callnotes_churn_campaign = data_joined_callnotes_churn_campaign.withColumn("INTERNATIONAL", data_joined_callnotes_churn_campaign["INTERNATIONAL"].cast(DecimalType()))
data_joined_callnotes_churn_campaign = data_joined_callnotes_churn_campaign.withColumn("LOCAL", data_joined_callnotes_churn_campaign["LOCAL"].cast(DecimalType()))
data_joined_callnotes_churn_campaign = data_joined_callnotes_churn_campaign.withColumn("DROPPED", data_joined_callnotes_churn_campaign["DROPPED"].cast(IntegerType()))
data_joined_callnotes_churn_campaign = data_joined_callnotes_churn_campaign.withColumn("USAGE", data_joined_callnotes_churn_campaign["USAGE"].cast(DecimalType()))
data_joined_callnotes_churn_campaign = data_joined_callnotes_churn_campaign.withColumn("RATEPLAN", data_joined_callnotes_churn_campaign["RATEPLAN"].cast(IntegerType()))
data_joined_callnotes_churn_campaign = data_joined_callnotes_churn_campaign.withColumn("SMSCOUNT", data_joined_callnotes_churn_campaign["SMSCOUNT"].cast(IntegerType()))
data_joined_callnotes_churn_campaign.show(10)
data_joined_callnotes_churn_campaign.printSchema()

pandas_df_callnotes_campaign_churn = data_joined_callnotes_churn_campaign.toPandas()
pandas_df_callnotes_campaign_churn.head(12)
```

    +----------+-----------------+----------------+----+------+--------+------+------------+---+-------------+-------+------------+-------------+-----+-------+---------+-------------+--------------------+-----+--------+-----------+-----+------------------+----+--------+
    | SENTIMENT|KEYWORD_COMPONENT|   KEYWORD_QUERY|  ID|GENDER|CHILDREN|INCOME|CAROWNERSHIP|AGE|MARITALSTATUS|ZIPCODE|LONGDISTANCE|INTERNATIONAL|LOCAL|DROPPED|PAYMETHOD|LOCALBILLTYPE|LONGDISTANCEBILLTYPE|USAGE|RATEPLAN|DEVICEOWNED|CHURN|RESPONDED_CAMPAIGN|OMPN|SMSCOUNT|
    +----------+-----------------+----------------+----+------+--------+------+------------+---+-------------+-------+------------+-------------+-----+-------+---------+-------------+--------------------+-----+--------+-----------+-----+------------------+----+--------+
    |          |             help|         support| 148|     M|       2| 91272|           Y| 25|      Married|   null|          27|            0|   13|      0|       CC|    FreeLocal|            Standard|   40|       3|       ipho|    F|     Android Phone|   N|    1900|
    |          |   update records|         address| 463|     M|       0| 69168|           Y| 62|      Married|   null|          14|            6|  215|      0|       CC|       Budget|            Standard|  235|       2|        sam|    T|          Dual SIM|   Y|    1586|
    |analytical|          billing|         charges| 471|     M|       2| 90104|           N| 34|      Married|   null|          12|            8|   45|      0|       CC|       Budget|      Intnl_discount|   66|       3|        sam|    F|      More Storage|   N|    1114|
    | satisfied|          battery|unpredictability|1238|     F|       2|  3194|           N| 54|      Married|   null|           4|            0|  115|      1|       CH|       Budget|            Standard|  119|       3|       ipho|    F|     Large Display|   N|    1697|
    |frustrated|          charger|  switch carrier|1342|     M|       0| 94928|           N| 40|       Single|   null|          14|            5|   74|      0|       CC|    FreeLocal|            Standard|   94|       1|       ipho|    T|          Dual SIM|   Y|    1540|
    |analytical|       new number|   customer care|1591|     F|       0| 45613|           N| 14|       Single|   null|          13|            0|  311|      0|       CC|       Budget|            Standard|  324|       4|       ipho|    F|     Android Phone|   N|    1681|
    |frustrated|  call forwarding|        features|1645|     M|       1| 92648|           N| 56|       Single|   null|          16|            5|   10|      0|       CC|       Budget|            Standard|   32|       4|       ipho|    T|     Android Phone|   N|    2291|
    |analytical|           tablet|    new offering|1959|     F|       1| 13829|           N| 19|      Married|   null|          42|            0|  160|      0|       CC|    FreeLocal|            Standard|  177|       2|       ipho|    T|     Android Phone|   N|    1821|
    |analytical|        rate plan|   customer care|1959|     F|       1| 13829|           N| 19|      Married|   null|          42|            0|  160|      0|       CC|    FreeLocal|            Standard|  177|       2|       ipho|    T|     Android Phone|   N|    1821|
    |          |       new number|         service|2122|     M|       2| 49911|           Y| 51|      Married|   null|          27|            0|   24|      0|       CC|       Budget|            Standard|   51|       1|       ipho|    F|     Android Phone|   N|    1487|
    +----------+-----------------+----------------+----+------+--------+------+------------+---+-------------+-------+------------+-------------+-----+-------+---------+-------------+--------------------+-----+--------+-----------+-----+------------------+----+--------+
    only showing top 10 rows
    
    root
     |-- SENTIMENT: string (nullable = false)
     |-- KEYWORD_COMPONENT: string (nullable = false)
     |-- KEYWORD_QUERY: string (nullable = false)
     |-- ID: integer (nullable = true)
     |-- GENDER: string (nullable = true)
     |-- CHILDREN: integer (nullable = true)
     |-- INCOME: decimal(10,0) (nullable = true)
     |-- CAROWNERSHIP: string (nullable = true)
     |-- AGE: integer (nullable = true)
     |-- MARITALSTATUS: string (nullable = true)
     |-- ZIPCODE: integer (nullable = true)
     |-- LONGDISTANCE: decimal(10,0) (nullable = true)
     |-- INTERNATIONAL: decimal(10,0) (nullable = true)
     |-- LOCAL: decimal(10,0) (nullable = true)
     |-- DROPPED: integer (nullable = true)
     |-- PAYMETHOD: string (nullable = true)
     |-- LOCALBILLTYPE: string (nullable = true)
     |-- LONGDISTANCEBILLTYPE: string (nullable = true)
     |-- USAGE: decimal(10,0) (nullable = true)
     |-- RATEPLAN: integer (nullable = true)
     |-- DEVICEOWNED: string (nullable = true)
     |-- CHURN: string (nullable = true)
     |-- RESPONDED_CAMPAIGN: string (nullable = true)
     |-- OMPN: string (nullable = true)
     |-- SMSCOUNT: integer (nullable = true)
    





<div>
<style>
    .dataframe thead tr:only-child th ***REMOVED***
        text-align: right;
    ***REMOVED***

    .dataframe thead th ***REMOVED***
        text-align: left;
    ***REMOVED***

    .dataframe tbody tr th ***REMOVED***
        vertical-align: top;
    ***REMOVED***
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>SENTIMENT</th>
      <th>KEYWORD_COMPONENT</th>
      <th>KEYWORD_QUERY</th>
      <th>ID</th>
      <th>GENDER</th>
      <th>CHILDREN</th>
      <th>INCOME</th>
      <th>CAROWNERSHIP</th>
      <th>AGE</th>
      <th>MARITALSTATUS</th>
      <th>...</th>
      <th>PAYMETHOD</th>
      <th>LOCALBILLTYPE</th>
      <th>LONGDISTANCEBILLTYPE</th>
      <th>USAGE</th>
      <th>RATEPLAN</th>
      <th>DEVICEOWNED</th>
      <th>CHURN</th>
      <th>RESPONDED_CAMPAIGN</th>
      <th>OMPN</th>
      <th>SMSCOUNT</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td></td>
      <td>help</td>
      <td>support</td>
      <td>148</td>
      <td>M</td>
      <td>2</td>
      <td>91272</td>
      <td>Y</td>
      <td>25</td>
      <td>Married</td>
      <td>...</td>
      <td>CC</td>
      <td>FreeLocal</td>
      <td>Standard</td>
      <td>40</td>
      <td>3</td>
      <td>ipho</td>
      <td>F</td>
      <td>Android Phone</td>
      <td>N</td>
      <td>1900</td>
    </tr>
    <tr>
      <th>1</th>
      <td></td>
      <td>update records</td>
      <td>address</td>
      <td>463</td>
      <td>M</td>
      <td>0</td>
      <td>69168</td>
      <td>Y</td>
      <td>62</td>
      <td>Married</td>
      <td>...</td>
      <td>CC</td>
      <td>Budget</td>
      <td>Standard</td>
      <td>235</td>
      <td>2</td>
      <td>sam</td>
      <td>T</td>
      <td>Dual SIM</td>
      <td>Y</td>
      <td>1586</td>
    </tr>
    <tr>
      <th>2</th>
      <td>analytical</td>
      <td>billing</td>
      <td>charges</td>
      <td>471</td>
      <td>M</td>
      <td>2</td>
      <td>90104</td>
      <td>N</td>
      <td>34</td>
      <td>Married</td>
      <td>...</td>
      <td>CC</td>
      <td>Budget</td>
      <td>Intnl_discount</td>
      <td>66</td>
      <td>3</td>
      <td>sam</td>
      <td>F</td>
      <td>More Storage</td>
      <td>N</td>
      <td>1114</td>
    </tr>
    <tr>
      <th>3</th>
      <td>satisfied</td>
      <td>battery</td>
      <td>unpredictability</td>
      <td>1238</td>
      <td>F</td>
      <td>2</td>
      <td>3194</td>
      <td>N</td>
      <td>54</td>
      <td>Married</td>
      <td>...</td>
      <td>CH</td>
      <td>Budget</td>
      <td>Standard</td>
      <td>119</td>
      <td>3</td>
      <td>ipho</td>
      <td>F</td>
      <td>Large Display</td>
      <td>N</td>
      <td>1697</td>
    </tr>
    <tr>
      <th>4</th>
      <td>frustrated</td>
      <td>charger</td>
      <td>switch carrier</td>
      <td>1342</td>
      <td>M</td>
      <td>0</td>
      <td>94928</td>
      <td>N</td>
      <td>40</td>
      <td>Single</td>
      <td>...</td>
      <td>CC</td>
      <td>FreeLocal</td>
      <td>Standard</td>
      <td>94</td>
      <td>1</td>
      <td>ipho</td>
      <td>T</td>
      <td>Dual SIM</td>
      <td>Y</td>
      <td>1540</td>
    </tr>
    <tr>
      <th>5</th>
      <td>analytical</td>
      <td>new number</td>
      <td>customer care</td>
      <td>1591</td>
      <td>F</td>
      <td>0</td>
      <td>45613</td>
      <td>N</td>
      <td>14</td>
      <td>Single</td>
      <td>...</td>
      <td>CC</td>
      <td>Budget</td>
      <td>Standard</td>
      <td>324</td>
      <td>4</td>
      <td>ipho</td>
      <td>F</td>
      <td>Android Phone</td>
      <td>N</td>
      <td>1681</td>
    </tr>
    <tr>
      <th>6</th>
      <td>frustrated</td>
      <td>call forwarding</td>
      <td>features</td>
      <td>1645</td>
      <td>M</td>
      <td>1</td>
      <td>92648</td>
      <td>N</td>
      <td>56</td>
      <td>Single</td>
      <td>...</td>
      <td>CC</td>
      <td>Budget</td>
      <td>Standard</td>
      <td>32</td>
      <td>4</td>
      <td>ipho</td>
      <td>T</td>
      <td>Android Phone</td>
      <td>N</td>
      <td>2291</td>
    </tr>
    <tr>
      <th>7</th>
      <td>analytical</td>
      <td>tablet</td>
      <td>new offering</td>
      <td>1959</td>
      <td>F</td>
      <td>1</td>
      <td>13829</td>
      <td>N</td>
      <td>19</td>
      <td>Married</td>
      <td>...</td>
      <td>CC</td>
      <td>FreeLocal</td>
      <td>Standard</td>
      <td>177</td>
      <td>2</td>
      <td>ipho</td>
      <td>T</td>
      <td>Android Phone</td>
      <td>N</td>
      <td>1821</td>
    </tr>
    <tr>
      <th>8</th>
      <td>analytical</td>
      <td>rate plan</td>
      <td>customer care</td>
      <td>1959</td>
      <td>F</td>
      <td>1</td>
      <td>13829</td>
      <td>N</td>
      <td>19</td>
      <td>Married</td>
      <td>...</td>
      <td>CC</td>
      <td>FreeLocal</td>
      <td>Standard</td>
      <td>177</td>
      <td>2</td>
      <td>ipho</td>
      <td>T</td>
      <td>Android Phone</td>
      <td>N</td>
      <td>1821</td>
    </tr>
    <tr>
      <th>9</th>
      <td></td>
      <td>new number</td>
      <td>service</td>
      <td>2122</td>
      <td>M</td>
      <td>2</td>
      <td>49911</td>
      <td>Y</td>
      <td>51</td>
      <td>Married</td>
      <td>...</td>
      <td>CC</td>
      <td>Budget</td>
      <td>Standard</td>
      <td>51</td>
      <td>1</td>
      <td>ipho</td>
      <td>F</td>
      <td>Android Phone</td>
      <td>N</td>
      <td>1487</td>
    </tr>
    <tr>
      <th>10</th>
      <td></td>
      <td>lost phone</td>
      <td>service suspension</td>
      <td>2366</td>
      <td>M</td>
      <td>2</td>
      <td>1765</td>
      <td>N</td>
      <td>18</td>
      <td>Married</td>
      <td>...</td>
      <td>CC</td>
      <td>FreeLocal</td>
      <td>Standard</td>
      <td>48</td>
      <td>4</td>
      <td>sam</td>
      <td>F</td>
      <td>More Storage</td>
      <td>Y</td>
      <td>1865</td>
    </tr>
    <tr>
      <th>11</th>
      <td>frustrated</td>
      <td>data plan</td>
      <td>speed</td>
      <td>2659</td>
      <td>F</td>
      <td>1</td>
      <td>98680</td>
      <td>Y</td>
      <td>43</td>
      <td>Married</td>
      <td>...</td>
      <td>CH</td>
      <td>FreeLocal</td>
      <td>Intnl_discount</td>
      <td>26</td>
      <td>3</td>
      <td>sam</td>
      <td>F</td>
      <td>Windows Phone</td>
      <td>N</td>
      <td>1732</td>
    </tr>
  </tbody>
</table>
<p>12 rows × 25 columns</p>
</div>



##### The following brunel based visualization can also be performed from Data Refinery. Shown here to get the feel for APIs


```python
%brunel data('pandas_df_callnotes_campaign_churn') bar y(#count) stack polar color(Sentiment) sort(#count) label(Sentiment, ' (', #count, '%)') tooltip(#all) percent(#count) legends(none)
```


<!--
  ~ Copyright (c) 2015 IBM Corporation and others.
  ~
  ~ Licensed under the Apache License, Version 2.0 (the "License");
  ~ You may not use this file except in compliance with the License.
  ~ You may obtain a copy of the License at
  ~
  ~     http://www.apache.org/licenses/LICENSE-2.0
  ~
  ~ Unless required by applicable law or agreed to in writing, software
  ~ distributed under the License is distributed on an "AS IS" BASIS,
  ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  ~ See the License for the specific language governing permissions and
  ~ limitations under the License.
  -->


<link rel="stylesheet" type="text/css" href="/dsx-jupyter/ibm-private-cloud/1511214783076/nbextensions/brunel_ext/brunel.2.3.css">
<link rel="stylesheet" type="text/css" href="/dsx-jupyter/ibm-private-cloud/1511214783076/nbextensions/brunel_ext/sumoselect.css">

<style>
    
</style>

<div id="controlsid78b73cc2-15c2-11e8-a8dd-8a6a0657da31" class="brunel"/>
<svg id="visid78b7392a-15c2-11e8-a8dd-8a6a0657da31" width="500" height="400"></svg>





    <IPython.core.display.Javascript object>




```python
%brunel data('pandas_df_callnotes_campaign_churn') bar x(Sentiment) y(#count) sort(#count) tooltip(#all)
```


<!--
  ~ Copyright (c) 2015 IBM Corporation and others.
  ~
  ~ Licensed under the Apache License, Version 2.0 (the "License");
  ~ You may not use this file except in compliance with the License.
  ~ You may obtain a copy of the License at
  ~
  ~     http://www.apache.org/licenses/LICENSE-2.0
  ~
  ~ Unless required by applicable law or agreed to in writing, software
  ~ distributed under the License is distributed on an "AS IS" BASIS,
  ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  ~ See the License for the specific language governing permissions and
  ~ limitations under the License.
  -->


<link rel="stylesheet" type="text/css" href="/dsx-jupyter/ibm-private-cloud/1511214783076/nbextensions/brunel_ext/brunel.2.3.css">
<link rel="stylesheet" type="text/css" href="/dsx-jupyter/ibm-private-cloud/1511214783076/nbextensions/brunel_ext/sumoselect.css">

<style>
    
</style>

<div id="controlsid792ccfaa-15c2-11e8-a8dd-8a6a0657da31" class="brunel"/>
<svg id="visid792ccb68-15c2-11e8-a8dd-8a6a0657da31" width="500" height="400"></svg>





    <IPython.core.display.Javascript object>




```python
%brunel data('pandas_df_callnotes_campaign_churn') treemap x(Keyword_Component) color(Keyword_Component) size(#count) label(Keyword_Query) tooltip(#all)
```


<!--
  ~ Copyright (c) 2015 IBM Corporation and others.
  ~
  ~ Licensed under the Apache License, Version 2.0 (the "License");
  ~ You may not use this file except in compliance with the License.
  ~ You may obtain a copy of the License at
  ~
  ~     http://www.apache.org/licenses/LICENSE-2.0
  ~
  ~ Unless required by applicable law or agreed to in writing, software
  ~ distributed under the License is distributed on an "AS IS" BASIS,
  ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  ~ See the License for the specific language governing permissions and
  ~ limitations under the License.
  -->


<link rel="stylesheet" type="text/css" href="/dsx-jupyter/ibm-private-cloud/1511214783076/nbextensions/brunel_ext/brunel.2.3.css">
<link rel="stylesheet" type="text/css" href="/dsx-jupyter/ibm-private-cloud/1511214783076/nbextensions/brunel_ext/sumoselect.css">

<style>
    
</style>

<div id="controlsid798013cc-15c2-11e8-a8dd-8a6a0657da31" class="brunel"/>
<svg id="visid79800db4-15c2-11e8-a8dd-8a6a0657da31" width="500" height="400"></svg>





    <IPython.core.display.Javascript object>



##### The following cell shows an example of how pixiedust can be used to build interactive dashboards, and how it can be exported out


```python
#display(pandas_df_callnotes_campaign_churn)
display(data_joined_callnotes_churn_campaign)
```


<style type="text/css">.pd_warning***REMOVED***display:none;***REMOVED***</style><div class="pd_warning"><em>Hey, there's something awesome here! To see it, open this notebook outside GitHub, in a viewer like Jupyter</em></div>
        <div class="pd_save is-viewer-good" style="padding-right:10px;text-align: center;line-height:initial !important;font-size: xx-large;font-weight: 500;color: coral;">
            
        </div>
    <div id="chartFigure119133d1" class="pd_save is-viewer-good" style="overflow-x:auto">
            
                    
                            <center><img style="max-width:initial !important" src="data:image/png;base64,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" class="pd_save"></center>
                        
                    
                
        </div>


##### Building RandomForest based classifier


```python
si_gender = StringIndexer(inputCol='GENDER', outputCol='GenderIndexed',handleInvalid='error')
si_status = StringIndexer(inputCol='MARITALSTATUS',outputCol='MaritalStatusIndexed',handleInvalid='error')
si_carownership = StringIndexer(inputCol='CAROWNERSHIP',outputCol='CarOwnershipIndexed',handleInvalid='error')
#si_paymentmode = StringIndexer(inputCol='Paymethod',outputCol='PaymethodIndexed',handleInvalid='error')
si_localbill = StringIndexer(inputCol='LOCALBILLTYPE',outputCol='LocalBilltypeIndexed',handleInvalid='error')
si_longdistancebill = StringIndexer(inputCol='LONGDISTANCEBILLTYPE',outputCol='LongDistanceBilltypeIndexed',handleInvalid='error')
si_sentiment = StringIndexer(inputCol='SENTIMENT',outputCol='SentimentIndexed',handleInvalid='error')
si_multiplelines = StringIndexer(inputCol='OMPN',outputCol='OMPNIndexed',handleInvalid='error')
si_churnLabel = StringIndexer(inputCol='CHURN', outputCol='label',handleInvalid='error')
churnLabelIndexer = si_churnLabel.fit(data_joined_callnotes_churn_campaign)

#Apply OneHotEncoder so categorical features aren't given numeric importance
ohe_gender = OneHotEncoder(inputCol="GenderIndexed", outputCol="GenderIndexed"+"classVec")
ohe_maritalstatus = OneHotEncoder(inputCol="MaritalStatusIndexed", outputCol="MaritalStatusIndexed"+"classVec")
ohe_carownership = OneHotEncoder(inputCol="CarOwnershipIndexed", outputCol="CarOwnershipIndexed"+"classVec")
#ohe_paymentmode = OneHotEncoder(inputCol="PaymethodIndexed", outputCol="PaymethodIndexed"+"classVec")
ohe_localbill = OneHotEncoder(inputCol="LocalBilltypeIndexed", outputCol="LocalBilltypeIndexed"+"classVec")
ohe_longdistance = OneHotEncoder(inputCol="LongDistanceBilltypeIndexed", outputCol="LongDistanceBilltypeIndexed"+"classVec")
ohe_sentiment = OneHotEncoder(inputCol='SentimentIndexed', outputCol='SentimentIndexed'+'classVec')
ohe_multiplelines = OneHotEncoder(inputCol='OMPNIndexed', outputCol='OMPNIndexed'+'classVec')

assembler = VectorAssembler(inputCols=["GenderIndexedclassVec", "MaritalStatusIndexedclassVec", "CarOwnershipIndexedclassVec", "LocalBilltypeIndexedclassVec", \
                                       "LongDistanceBilltypeIndexedclassVec","SentimentIndexedclassVec","OMPNIndexedclassVec","CHILDREN", "INCOME", "AGE", \
                                       "LONGDISTANCE", "INTERNATIONAL", "LOCAL", "DROPPED","SMSCOUNT"], outputCol="features")
```


```python
randomforest_classifier=RandomForestClassifier(labelCol="label", featuresCol="features")

# Convert indexed labels back to original labels.
labelConverter = IndexToString(inputCol="prediction", outputCol="predictedLabel", labels=churnLabelIndexer.labels)

pipeline = Pipeline(stages=[si_gender,si_status,si_carownership,si_localbill,si_longdistancebill,si_sentiment,si_multiplelines,churnLabelIndexer, ohe_gender,ohe_maritalstatus,ohe_carownership,ohe_localbill,ohe_longdistance,ohe_sentiment,ohe_multiplelines, assembler, randomforest_classifier, labelConverter])
```

##### Split the dataset into training and test using 70:30 split ratio and build the model


```python
train, test = data_joined_callnotes_churn_campaign.randomSplit([0.7,0.3], seed=7)
train.cache()
test.cache()
model = pipeline.fit(train)
```

##### Testing the test dataset


```python
results = model.transform(test)
results=results.select(results["ID"],results["CHURN"],results["label"],results["predictedLabel"],results["prediction"],results["probability"])
results.toPandas().head(6)
```




<div>
<style>
    .dataframe thead tr:only-child th ***REMOVED***
        text-align: right;
    ***REMOVED***

    .dataframe thead th ***REMOVED***
        text-align: left;
    ***REMOVED***

    .dataframe tbody tr th ***REMOVED***
        vertical-align: top;
    ***REMOVED***
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>ID</th>
      <th>CHURN</th>
      <th>label</th>
      <th>predictedLabel</th>
      <th>prediction</th>
      <th>probability</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>148</td>
      <td>F</td>
      <td>0.0</td>
      <td>F</td>
      <td>0.0</td>
      <td>[0.8728832555, 0.1271167445]</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1959</td>
      <td>T</td>
      <td>1.0</td>
      <td>T</td>
      <td>1.0</td>
      <td>[0.285629950796, 0.714370049204]</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3749</td>
      <td>T</td>
      <td>1.0</td>
      <td>T</td>
      <td>1.0</td>
      <td>[0.165697434112, 0.834302565888]</td>
    </tr>
    <tr>
      <th>3</th>
      <td>2659</td>
      <td>F</td>
      <td>0.0</td>
      <td>F</td>
      <td>0.0</td>
      <td>[0.714051839779, 0.285948160221]</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1238</td>
      <td>F</td>
      <td>0.0</td>
      <td>F</td>
      <td>0.0</td>
      <td>[0.87563833506, 0.12436166494]</td>
    </tr>
    <tr>
      <th>5</th>
      <td>1460</td>
      <td>F</td>
      <td>0.0</td>
      <td>F</td>
      <td>0.0</td>
      <td>[0.925838160212, 0.0741618397881]</td>
    </tr>
  </tbody>
</table>
</div>



##### Model Evaluation


```python
prefix_precision = 'Precision model1 = ***REMOVED***:.2f***REMOVED***.'
print (prefix_precision.format(results.filter(results.label == results.prediction).count() / float(results.count())))

prefix_aoc = 'Area under ROC curve = ***REMOVED***:.2f***REMOVED***.'
evaluator = BinaryClassificationEvaluator(rawPredictionCol="prediction", labelCol="label", metricName="areaUnderROC")
print (prefix_aoc.format(evaluator.evaluate(results)))
```

    Precision model1 = 0.89.
    Area under ROC curve = 0.88.



```python
from repository.mlrepositoryclient import MLRepositoryClient
from repository.mlrepositoryartifact import MLRepositoryArtifact
```


```python
service_path = 'https://internal-nginx-svc.ibm-private-cloud.svc.cluster.local:12443'
ml_repository_client = MLRepositoryClient()
```


```python
model_artifact = MLRepositoryArtifact(model, training_data=train, name="Customer Churn Prediction - db2")

# Add author information for model
model_artifact.meta.add("authorName", "Data Scientist");
```

##### Save pipeline and model artifacts to Machine Learning repository:


```python
saved_model = ml_repository_client.models.save(model_artifact)
```


```python
# Print the saved model properties
print "modelType: " + saved_model.meta.prop("modelType")
print "creationTime: " + str(saved_model.meta.prop("creationTime"))
print "modelVersionHref: " + saved_model.meta.prop("modelVersionHref")
print "label: " + saved_model.meta.prop("label")
```

    modelType: sparkml-model-2.0
    creationTime: 2018-02-19 22:18:53.157000+00:00
    modelVersionHref: https://internal-nginx-svc.ibm-private-cloud.svc.cluster.local:12443/v2/artifacts/models/56af74d4-93f4-41bd-8069-850a5117475d/versions/4de851a3-4d05-4957-a27f-6701418e6ce4
    label: CHURN

