from flask import Flask
import requests
app = Flask('solr_server')

@app.route("/search")
def searchSolr():
    baseRequestUrl="http://localhost:8983/solr/parties/select?hl=on&hl.method=unified&defType=edismax&indent=true"
    requestUrl=  baseRequestUrl+'&q.op=AND'
    requests.post('http://130.211.81.80:8983/',)
    