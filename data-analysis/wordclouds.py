import pandas as pd
from nltk.corpus import stopwords
from collections import Counter

path = "words/"

def import_refined_data(group):
    df = pd.read_json("data/" + group + '.json')
    return df


def plot_wordcloud(df_without_stopwords, group):
    topic_words = [ z.lower() for y in
                       [ x.split() for x in df_without_stopwords['text'] if isinstance(x, str)]
                       for z in y]
    word_count_dict = dict(Counter(topic_words))
    popular_words = sorted(word_count_dict, key = word_count_dict.get, reverse = True)
    popular_words_nonstop = [w for w in popular_words if w not in stopwords.words("portuguese")]

    f = open(path + group + ".txt",'w')

    for w in popular_words_nonstop[0:50]:
        line = w + "," + str(word_count_dict[w]) + '\n'
        f.write(line)
    f.close()

def run():
    political_parties = ['pcp']

    for group in political_parties:
        df = import_refined_data(group)
        plot_wordcloud(df, group)

run()