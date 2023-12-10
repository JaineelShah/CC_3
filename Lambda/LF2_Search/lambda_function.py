import boto3
import requests
import json
botId = 'Y0HFVTS7UH'
botAliasId = 'TSTALIASID'
userId='notebook'
def get_data_es(labels):
    print("inside elastic seach. Labels: ", labels)
    # Replace 'your-es-domain-endpoint' with the actual endpoint of your Elasticsearch domain
    es_domain_endpoint = (
        "search-photos-57tpacqywvjdkpranduppda6ua.us-east-1.es.amazonaws.com"
    )

    # Replace 'your-master-username' and 'your-master-password' with your Elasticsearch master user credentials
    master_username = "photos"
    master_password = "Photos1!"

    # Set up the Elasticsearch endpoint URL
    es_url = f"https://{es_domain_endpoint}/photos"

    # Create a requests session with AWS SigV4 authentication
    session = requests.Session()
    session.auth = (master_username, master_password)
    session.headers.update({"Content-Type": "application/x-ndjson"})

    # labels = ["Wood", "Cat", "helicopter"]
    responses = []
    img_data = {}
    for key in labels.keys():
        if labels[key] > 0:
            label = key
            query = {
                "query": {
                    # "labels":label
                    "fuzzy": {"labels": label}
                }
            }
            response = session.get(es_url + f"/_search", data=json.dumps(query))
            hits = response.json()["hits"]["hits"]
            print(f"Hits received: ", hits)
            
            for hit in hits:
                img_data[hit["_source"]["objectKey"]] = {"url":hit["_source"]["objectKey"],"labels":hit["_source"]["labels"]}
    return list(img_data.values())
    
def search_intent(event):
    sentence = event["interpretations"][0]["intent"]["slots"]["Tag"]["value"]["interpretedValue"].lower()
    keywords = {}

    ans = ""
    
    for word in sentence.split(' '):
        keywords[word]=1
    
    ans = ', '.join(list(keywords.keys()))

    # es_search = get_data_es(keywords)
    # print("elastic search: ", es_search)
    response = {
        "results":get_data_es(keywords)
    }

    return response


def lambda_handler(event, context):
    print("event",event)
    print("param",event['queryStringParameters']["q"])
    print(context)
    client = boto3.client('lexv2-runtime')
    
    response = client.recognize_text(
    botId=botId,
    botAliasId=botAliasId,
    localeId='en_US',
    sessionId=userId,
    text=event['queryStringParameters']["q"])
    
    print("response",response)
    # search_intent(response)
    return {
    "isBase64Encoded": False,
    "statusCode": 200,
    "headers":    {"Access-Control-Allow-Headers":"*","Access-Control-Allow-Methods":"*","Access-Control-Allow-Origin":"*"},
    "body":  json.dumps(search_intent(response))
    }
    return {"results":[{"url":"abc","labels":["123"]}]}
    return json.dumps({"results":[{"url":"abc","labels":["123"]}]})
    # NLU threshold
    # thresh = 0.1
    # print(f"Event: {event}\n")
    # intents = ""

    # curr_conf = 0.0
    # intent = ""
    # data = None
    # for val in event["interpretations"]:
    #     if "nluConfidence" in val:
    #         if val["nluConfidence"] > curr_conf and val["nluConfidence"] > thresh:
    #             intent = val["intent"]["name"]
    #             curr_conf = val["nluConfidence"]

    # out = None
    # if intent == "SearchIntent":
    #     out = search_intent(event)

    # # TODO implement

    # if out is None:
    #     out = {
    #         "sessionState": {
    #             "dialogAction": {"type": "Close"},
    #             "intent": {"name": "FallbackIntent", "state": "Fulfilled"},
    #         },
    #         "messages": [
    #             {"contentType": "PlainText", "content": "Please provide a valid intent"}
    #         ],
    #     }

    # return out


# if __name__ == '__main__':
#     lambda_handler(None, None)
