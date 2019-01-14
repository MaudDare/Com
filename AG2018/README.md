**Attention:** pour tester en local, les fichiers doivent être servis par un serveur web.

Le plus simple est d'utiliser python :
    cd Com/
    python -m SimpleHTTPServer 8080
et de pointer son navigateur sur *http://localhost:8080/AG2017/*


## Structure
Les slides par section sont dans des fichiers markdown à part.
inclus dans *index.html* de cette manière :

    <section data-markdown="BilanMoral.md"
    			data-separator="^\n\n\n"
    			data-separator-vertical="^\n\n"
    			data-separator-notes="^Note:"
    			data-charset="utf-8">
    </section>


## Format fichiers slides

* **2 retours chariot** entre chaque slide
* Possibilité d'ajouter des notes pour le speaker (touche **s** pour faire apparaitre la fenêtre)

Exemple :

    # slide 1
    * point 1.1
    * point 2.1

    Note:
    notes du présentateur slide 1


    # slide 2
    * point 2.1
    * point 2.2


