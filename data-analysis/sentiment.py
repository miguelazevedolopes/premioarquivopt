import spacy
import pandas as pd
from spacytextblob.spacytextblob import SpacyTextBlob
import datetime
from os import system
import time
from googletrans import Translator

import json


legislaturas = {
    "VIII Legislatura": {
        "start": datetime.date(1999, 10, 25),
        "end": datetime.date(2002, 4, 4),
        "governo": ["PS"],
        "maioria_absoluta": False
    },
    "IX Legislatura": {
        "start": datetime.date(2002, 4, 5),
        "end": datetime.date(2005, 3, 9),
        "governo": ["PSD", "CDS"],
        "maioria_absoluta": False
    },
    "X Legislatura": {
        "start": datetime.date(2005, 3, 10),
        "end": datetime.date(2009, 10, 14),
        "governo": ["PS"],
        "maioria_absoluta": True
    },
    "XI Legislatura": {
        "start": datetime.date(2009, 10, 15),
        "end": datetime.date(2011, 6, 19),
        "governo": ["PS"],
        "maioria_absoluta": False
    },
    "XII Legislatura": {
        "start": datetime.date(2011, 6, 22),
        "end": datetime.date(2015, 10, 22),
        "governo": ["PSD", "CDS"],
        "maioria_absoluta": False
    },
    "XIII Legislatura": {
        "start": datetime.date(2015, 10, 23),
        "end": datetime.date(2019, 10, 24),
        "governo": ["PS"],
        "maioria_absoluta": False
    },
    "XIV Legislatura": {
        "start": datetime.date(2019, 10, 25),
        "end": datetime.date(2022, 12, 31),
        "governo": ["PS"],
        "maioria_absoluta": False
    },

}


def clear(): return system('clear')

translator = Translator()

nlp = spacy.load("en_core_web_lg")
nlp.add_pipe('spacytextblob')


def divide_text(text):
    t = text
    start = 0
    end = 100000
    texts = []
    while (len(text[start:]) >= 100000):
        texts.append(text[start:end])
        start = end
        end += 100000
    texts.append(text[end:])
    return texts


def get_legislatura(date):
    date = date.to_pydatetime().date()
    for l in legislaturas:
        if (date >= legislaturas[l]["start"] and date <= legislaturas[l]["end"]):
            return l


parties = [ 'livre', 'pan', 'pcp', 'ps', 'psd','be']
# parties = ['chega']

for k in range(len(parties)):
    party = parties[k]

    df = pd.read_json('../solr/data/'+party+'.json')

    dictionary = {}

    for l in legislaturas:
        dictionary[l] = {"subjectivity": [], "polarity": []}

    # Used for status %
    i = 0
    size = len(df['text'])

    for index in range(size):
        date = df['date'][index]
        text = df['text'][index]
        legislatura = get_legislatura(df['date'][index])
        if(legislatura==None):
            continue

        if (len(text) >= 100000):
            texts = divide_text(text)
            for t in texts:
                flag=True
                # Status print
                i += 1/len(texts)
                clear()
                print("Party "+str(k+1)+"/"+str(len(parties)))
                print("Status: " + str(i*100/size)+"%")
                while(flag):
                    try:
                        translation = translator.translate(t)
                        flag=False
                    except:
                        flag=True
                        pass
                    
                text = translation.text
                doc = nlp(text)
                dictionary[legislatura]["subjectivity"].append(doc._.blob.subjectivity)
                dictionary[legislatura]["polarity"].append(doc._.blob.polarity)
        else:
            # Status print
            i += 1
            clear()
            flag=True

            print("Party "+str(k+1)+"/"+str(len(parties)))
            print("Status: " + str(i*100/size)+"%")
            while(flag):
                try:
                    translation = translator.translate(text)
                    flag=False
                except:
                    flag=True
                    pass
            text = translation.text
            doc = nlp(text)
            dictionary[legislatura]["subjectivity"].append(doc._.blob.subjectivity)
            dictionary[legislatura]["polarity"].append(doc._.blob.polarity)

    for legislatura in legislaturas:
        if (len(dictionary[legislatura]["subjectivity"]) == 0):
            continue
        dictionary[legislatura]["subjectivity"] = sum(
            dictionary[legislatura]["subjectivity"])/len(dictionary[legislatura]["subjectivity"])
        dictionary[legislatura]["polarity"] = sum(
            dictionary[legislatura]["polarity"])/len(dictionary[legislatura]["polarity"])

    # Serializing json
    json_object = json.dumps(dictionary, indent=4)

    # Writing to file
    with open("./output/copia/sentiment/"+party+"_sentiment.json", "w") as outfile:
        outfile.write(json_object)
