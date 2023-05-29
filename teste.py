import spacy
from spacytextblob.spacytextblob import SpacyTextBlob
from googletrans import Translator

nlp = spacy.load('en_core_web_sm')
nlp.add_pipe('spacytextblob')

text = "O PS subiu pouco o salário minimo"
translator = Translator()
translation = translator.translate(text)
text = translation.text
print(text)


doc = nlp(text)

print(doc._.blob.polarity)

print(doc._.blob.subjectivity)
