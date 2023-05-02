import pandas as pd
from nltk.corpus import stopwords
from collections import Counter
from os import system

path = "./words/"

def import_refined_data(group):
    df = pd.read_json("data/" + group + '.json')
    return df


def plot_wordcloud(df_without_stopwords, group):
    final_dict = dict()
    # Used for status %
    i = 0
    size = len(df_without_stopwords['text'])

    for text in df_without_stopwords['text']:

        # Status print
        i+=1
        system('clear')
        print("Status: "+ str(i*100/size)+"%")

        topic_words = text.split()
        topic_words = [x.lower() for x in topic_words if x.lower()
                       not in stopwords.words("portuguese")]
        word_count_dict = dict(Counter(topic_words))
        for w in word_count_dict:
            if(w in final_dict):
                final_dict[w]+=word_count_dict[w]
            else:
                final_dict[w]=word_count_dict[w]

    final_dict_sorted = sorted(final_dict,key=final_dict.get, reverse=True)
    final_dict_sorted = final_dict_sorted[0:50]

    f = open(path + group + ".txt", 'w')

    for w in final_dict_sorted:
        line = w + "," + str(final_dict[w]) + '\n'
        f.write(line)
    f.close()

def run():
    political_parties = ['pcp']

    for group in political_parties:
        df = import_refined_data(group)
        plot_wordcloud(df, group)

run()
