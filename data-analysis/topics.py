import pandas as pd
import re
from os import system
from collections import Counter
from gensim.models import LdaModel
from gensim.corpora import Dictionary
import nltk
from nltk.corpus import stopwords
from sklearn.metrics.pairwise import cosine_similarity
# nltk.download('all')
def political_groups_topics(df):
    final_dict = dict()
    # Used for status %
    i = 0
    size = len(df['text'])

    documents = []
    for text in df['text']:
        # Tokenize the input string into a list of tokens
        # Tokenize the text into words
        words = nltk.word_tokenize(text, language='portuguese')

        # Get the set of Portuguese stopwords
        stop_words = set(stopwords.words('portuguese'))

        # Filter out stopwords
        filtered_words = [word for word in words if word.lower() not in stop_words]

        # Join the filtered words back into a single string
        filtered_text = ' '.join(filtered_words)

        tokens = re.findall(r'\w+', filtered_text.lower())
        documents.append(tokens)

    # Create a dictionary of all the words in your corpus
    dictionary = Dictionary(documents)

    # Convert your corpus into a Bag-of-Words representation
    corpus = [dictionary.doc2bow(doc) for doc in documents]

    # Train an LDA model with 10 topics
    lda_model = LdaModel(corpus=corpus,
                        id2word=dictionary,
                        num_topics=10,
                        passes=10)

    topic_keywords = {
        'Economy': ['economia', 'mercado', 'crescimento', 'desenvolvimento', 'emprego', 'renda'],
        'Education': ['educação', 'ensino', 'escola', 'universidade', 'aprendizado', 'professor'],
        'Healthcare': ['saúde', 'hospital', 'doença', 'medicina', 'tratamento', 'prevenção'],
        'Infrastructure': ['infraestrutura', 'transporte', 'rodovia', 'ferrovia', 'aeroporto', 'porto'],
        'Security': ['segurança', 'violência', 'criminalidade', 'polícia', 'prisão', 'justiça'],
        'Environment': ['meio ambiente', 'sustentabilidade', 'clima', 'energia', 'recursos naturais', 'poluição'],
        'Foreign Policy': ['política externa', 'relações internacionais', 'diplomacia', 'cooperação', 'defesa', 'acordo'],
        'Culture': ['cultura', 'arte', 'música', 'cinema', 'literatura', 'teatro'],
        'Social Issues': ['direitos humanos', 'igualdade', 'diversidade', 'inclusão', 'assistência social', 'proteção'],
        'Politics': ['política', 'governo', 'eleição', 'partido', 'democracia', 'oposição']
    }

    # Extract the top 10 topics and the top 10 words associated with each topic
    top_topics = lda_model.top_topics(corpus, topn=10)

    # Associate the top words with pre-defined topic keywords
    for i, (topic, words) in enumerate(top_topics):
        print(f"Topic {i+1}: ")
        scores = []
        for keyword in topic_keywords.values():
            score = cosine_similarity(dictionary.doc2bow(words), dictionary.doc2bow(keyword))
            scores.append(score[0][0])
        topic_idx = scores.index(max(scores))
        topic_label = list(topic_keywords.keys())[topic_idx]
        print(f"\tLabel: {topic_label}")
        for word, prob in words:
            print(f"\t{word}: {prob:.3f}")

    # f = open("topics.txt", 'w')
    # # Print the top 10 words in each topic
    # # Print the top 10 topics and their top words
    # for topic in lda_model.show_topics(num_topics=10, num_words=10, formatted=False):
    #     line =  f"Topic {topic[0]}: {' '.join([word[0] for word in topic[1]])}" + '\n'
    #     f.write(line)

    # f.close()

chega = pd.read_json("data/chega.json")
political_groups_topics(chega)
