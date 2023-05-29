import spacy
import pandas as pd
from spacytextblob.spacytextblob import SpacyTextBlob
import datetime
from os import system
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
    end = 1000000
    texts = []
    while (len(text[start:]) >= 1000000):
        texts.append(text[start:end])
        start = end
        end += 1000000
    texts.append(text[end:])
    return texts


def get_legislatura(date):
    date = date.to_pydatetime().date()
    for l in legislaturas:
        if (date >= legislaturas[l]["start"] and date <= legislaturas[l]["end"]):
            return l


# parties = ['bloco', 'il', 'livre', 'pan', 'pcp', 'ps', 'psd']
parties = ['chega']

for k in range(len(parties)):
    party = parties[k]

    df = pd.read_json('./data/'+party+'.json')

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

        if (len(text) >= 1000000):
            texts = divide_text(text)
            for t in texts:
                # Status print
                i += 1/len(texts)
                clear()
                print("Party "+str(k+1)+"/"+str(len(parties)))
                print("Status: " + str(i*100/size)+"%")
                translation = translator.translate(t)
                text = translation.text
                doc = nlp(text)
                dictionary[legislatura]["subjectivity"].append(doc._.blob.subjectivity)
                dictionary[legislatura]["polarity"].append(doc._.blob.polarity)
        else:
            # Status print
            i += 1
            clear()
            print("Party "+str(k+1)+"/"+str(len(parties)))
            print("Status: " + str(i*100/size)+"%")
            translation = translator.translate(t)
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
    with open("./output/sentiment/"+party+"_sentiment.json", "w") as outfile:
        outfile.write(json_object)

# text = 'I had a really horrible day. It was the worst day ever! But every now and then I have a really good day that makes me happy.'
# doc = nlp(text)
# doc._.blob.polarity                            # Polarity: -0.125
# doc._.blob.subjectivity                        # Subjectivity: 0.9
# doc._.blob.sentiment_assessments.assessments   # Assessments: [(['really', 'horrible'], -1.0, 1.0, None), (['worst', '!'], -1.0, 1.0, None), (['really', 'good'], 0.7, 0.6000000000000001, None), (['happy'], 0.8, 1.0, None)]
# doc._.blob.ngrams()
