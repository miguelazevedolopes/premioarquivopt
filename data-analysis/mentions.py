import pandas as pd
import re
from os import system
from collections import Counter

def political_groups_frequency(df, groups):
    final_dict = dict()
    # Used for status %
    i = 0
    size = len(df['text'])

    print('morre em 1')

    for text in df['text']:
        # Status print
        i+=1
        system('clear')
        print("Status: "+ str(i*100/size)+"%")

        text = re.sub('[^A-Za-z0-9\s]+', '', text).split()

        word_freq = Counter(word for word in text if word in groups)
        for w in word_freq:
            if(w in final_dict):
                final_dict[w]+=word_freq[w]
            else:
                final_dict[w]=word_freq[w]


    f = open("freq.txt", 'w')

    for w in final_dict:
        line = w + "," + str(final_dict[w]) + '\n'
        f.write(line)
    f.close()


pcp = pd.read_json("data/pcp.json")
political_groups_frequency(pcp, ['PS','IL','Chega', 'Bloco','Livre','PAN', 'PSD'])
