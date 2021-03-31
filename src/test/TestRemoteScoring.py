import requests, json
from pprint import pprint

json_payload = [{
    "PHASE":"Adult",
    "ID":999,
    "GENDER":"F",
    "STATUS":"M",
    "CHILDREN":2.0,
    "ESTINCOME":77551.100000,
    "CAROWNER":"Y",
    "AGE":33,
    "LONGDISTANCE":20.530000,
    "INTERNATIONAL":0.000000,
    "LOCAL":41.890000,
    "DROPPED":1.000000,
    "PAYMETHOD":"CC",
    "LOCALBILLTYPE":"Budget",
    "LONGDISTANCEBILLTYPE":"Standard",
    "USAGE":62.420000,
    "RATEPLAN":2.000000
}]

scoring_endpoint = 'https://dsxl-api/v3/project/score/Python27/spark-2.0/gc-customer-churn/GC_Telco_Churn_ML_model/1'

header_online = {'Content-Type': 'application/json', 'Authorization':os.environ['DSX_TOKEN']}

response_scoring = requests.post(scoring_endpoint, json=json_payload, headers=header_online)
prediction = response_scoring.json()['object']['output']['predictions'][0]
print ('Prediction = {}'.format(prediction))
probabilities = response_scoring.json()['object']['output']['probabilities'][0]
print ('Probabilities = {}'.format(probabilities))
if prediction == 'F':
    print('Prediction = False')
    print('Probability = {0:.2f}'.format(probabilities[0]*100))
elif prediction == 'T':
    print('Prediction = True')
    print('Probability = {0:.2f}%'.format(probabilities[1]*100))
else:
    print('Probability ERROR')
