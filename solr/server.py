from flask import Flask, request
import requests
from flask_cors import CORS

app = Flask('solr_server')
CORS(app)

@app.route("/search", methods=['POST'])
def searchSolr():
    baseRequestUrl = "http://localhost:8983/solr/parties/select?hl=on&hl.method=unified&defType=edismax&indent=true&facet=true&facet.field=party"
    requestUrl = baseRequestUrl+'&q.op=AND'
    
    query = request.form['query']
    party = request.form['party']
    start = request.form['start']
    date_range = request.form['date']
    print(party=='null')

    party_filter = '&fq=party:' + party if (party and party != '' and party != 'null') else ''
    query = '&q=' + query
    start_filter = '&start=' + start if (start and start != '' and start != 'null') else ''
    date_range_filter = '&fq=date:' + \
        date_range if (date_range and date_range != '' and date_range != 'null') else ''
    print(query + '&qf=title^5 text' + party_filter + date_range_filter +
          '&rows=10' + start_filter + "&stopwords=true&synonyms=true")
    
    response = requests.post(requestUrl, headers={'Content-Type': 'application/x-www-form-urlencoded'}, data=query + '&qf=title^5 text' + party_filter + date_range_filter + '&rows=10' + start_filter + "&stopwords=true&synonyms=true")
    if(response.status_code==200):
        return response.json()
    else:
        return 500
