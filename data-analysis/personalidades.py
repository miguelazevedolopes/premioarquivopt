import spacy
import pandas as pd 
from os import system
import json

clear = lambda: system('clear')

nlp = spacy.load("pt_core_news_lg")

def divide_text(text):
    t=text
    start=0
    end=1000000
    texts = []
    while(len(text[start:])>=1000000):
        texts.append(text[start:end])
        start=end
        end+=1000000
    texts.append(text[end:])
    return texts
        



parties = ['chega','bloco','il','livre','pan','pcp','ps','psd']

for k in range(len(parties)):
    party=parties[k]

    df = pd.read_json('./data/'+party+'.json')

    dictionary = {}

    for i in range(1996,2023):
        dictionary[i]={}

    # Used for status %
    i=0
    size = len(df['text'])

    for index in range(size):

        year = df['date'][index].year
        text =  df['text'][index]
        
        # Status print
        i+=1
        clear()
        print("Party "+str(k+1)+"/"+str(len(parties)))
        print("Status: "+ str(i*100/size)+"%")


        if(len(text)>=1000000):
            texts = divide_text(text)
            for t in texts:
                doc = nlp(t)
                for ent in doc.ents:
                    if(ent.label_=='PER'):
                        if(ent.text in dictionary[year].keys()):
                            dictionary[year][ent.text]+=1
                        else:
                            dictionary[year][ent.text]=1
        else:
            doc = nlp(text)
            for ent in doc.ents:
                if(ent.label_=='PER'):
                    if(ent.text in dictionary[year].keys()):
                        dictionary[year][ent.text]+=1
                    else:
                        dictionary[year][ent.text]=1

        


    for i in range(1996,2023):
        dictionary[i]=dict(sorted(dictionary[i].items(),key=lambda x: x[1]))


    # Serializing json
    json_object = json.dumps(dictionary, indent=4)
    
    # Writing to file
    with open(party+"_personalidades.json", "w") as outfile:
        outfile.write(json_object)


