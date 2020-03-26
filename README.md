# Loup Garou

Ce code reprend le jeu du loup garou pour la dernière séance de cours avec les L2 de l'UGA.

## Déroulement de la séance

- Etant donné que le serveur Discord principal n'a pas de salon pour React, je vous invite sur un [autre serveur](https://discord.gg/qk3TzeV).
- Je suis également disponible toute la journée sur skype -- mon identifiant est pl.guhur.
- Pendant la séance, nous allons travailler sur Material UI et Styled components
- Puis un TP noté va reprendre l'ensemble des notions vues en cours.
- Pensez à cloner ce repo et à répondre aux questions en modifiant directement ce README.

## Sass

Au cas où vous avez un trou de mémoire sur Sass, voici un [rappel de la syntaxe](https://devhints.io/sass).

## Material UI

Je vous invite à regarder la vidéo de [Human Talks Paris](https://www.youtube.com/watch?v=D3tB_DGgICE).


Quelques petites questions :

- Résumer en une phrase l'intérêt de Material UI 
Material UI est une librairie développer par Google qui inclus des composants (boutons, menu, loader)

- Comment importer `material-ui` dans un fichier ?
import Button from "@material-ui/core/Button";

- Comment une application peut utiliser un thème à travers l'ensemble d'un projet ?
En encapsulant dans un MuiThemeProvider

- A quoi sert `createMuiTheme` ?
Il sert a personnaliser les composants

- A quoi correspond `palette` ?
Modifier la couleur

- Comment re-définir des propriétés ?
Avec overrides

- A quoi vous fait penser `withStyle` ? Comment l'utiliser ?
 On l'importe et on créé un fichier style pour l'export.

- Reproduire les deux boutons rouge et bleu présentées dans la vidéo.
```javascript
import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme, withStyles } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import Button from "@material-ui/core/Button";

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <Button className={this.props.classes.myLeftButton}>Bonjour </Button>
                    <Button>Human Talks !!</Button>
                </div>
            </MuiThemeProvider>
            );
    }
}

const styles = {
    myLeftButton: {
        backgroundColor: "blue"
    }
};

const theme = createMuiTheme({
    palette: {
        primary: blue
    },
    typography: {
        fontSize: 15,
        fontFamily: "Arial"
    },
    overrides:{
        MuiButton: {
            root:{
                backgroundColor: "red",
                "&:hover": {backgroundColor: "yellow"}
            }
        }
    }
});

export default withStyles(styles)(App);
```


## Styled Components

De la même manière, voici une [vidéo](https://www.youtube.com/watch?v=mS0UKNBh-Ig) pour introduire le sujet.

Quelques petites questions :

- Qu'est-ce que le CSS-in-JS ?
Le CSS-in-Js comme son nom l'indique permet de faire du CSS dans du JS.

- Qu'est-ce que sont les tagged templates (délimitées par des backticks) ?
Ils permettent de simplifier le code.

- Donner un exemple d'un bouton personnalisé avec et sans les tagged templates ?
```javascript
//Avec tagged templates
const Button = styled.button`
        background-color: red;
        `
        
//Sans tagged templates
const Button = styled.button(["background-color: red"]);
```

- Comment utilise-t-on les props dans cette librarie ?
On utilise les props dans la css. background-color: ${props => props.disabled ? 'red' : 'green'};

- Reprendre l'exemple du Material UI avec styled-components; l'écrire avec la composition et avec l'héritage.
```javascript
//code avec la composition

import React, { Component } from "react";
import styled from 'styled-components';


class App extends Component {
    render() {
        return (
          <div>
              <Button1>Bleu </Button1>
              <Button2>Rouge</Button2>
          </div>
            );
    }
}

const commonStyle = `
  border-radius: 3px;
  cursor: pointer;
  padding: 8px 16px;
  fontSize: 15;
  fontFamily: "Arial";
  `

const Button1 = styled.button`
  ${commonStyle};
  background-color: blue;
  `

const Button2 = styled.button`
  ${commonStyle};
  background-color: red;
  `
  
export default (App);


//code avec l'héritage

import React, { Component } from "react";
import styled from 'styled-components';

class App extends Component {
    render() {
        return (
          <div>
              <Button1>Bleu </Button1>
              <Button2>Rouge</Button2>
          </div>
            );
    }
}

const Button1 = styled.button`
  border-radius: 3px;
  cursor: pointer;
  padding: 8px 16px;
  fontSize: 15;
  fontFamily: "Arial";
  
  background-color: blue;
  `
  
const Button2 = styled(Button1)`
  background-color: red;
  `

export default (App);

```
- Quelles sont les fonctions du contexte de styled-components ? Le contexte de styled-components permet de faciliter la création de composants visuels pour styliser.


## Mise en place du design

Pour mettre en pratique ces notions, je vous propose de designer une application reprenant le principe de jeu du loup garou.

Cette plateforme est entièrement numérique, ce qui permet de s'affranchir d'un maître du jeu, et donc d'avoir un joueur supplémentaire.

A l'initialisation de la partie, un joueur démarre une partie. Un court identifiant est alors communiqué aux autres joueurs, qui doivent rejoindre la partie.
Lorsque tous les joueurs ont rejoint la partie, la partie peut démarrer. Chaque joueur joue à tour de rôle depuis son téléphone.

Une contrainte importante est la synchronisation des joueurs : chaque joueur utilise son propre téléphone. Il reçoit un message lorsque c'est à son tour de jouer, ou attend autrement. Pour résoudre techniquement cette contrainte, tout en évitant d'écrire une application en backend, on utilise Firebase. Firebase permet d'utiliser des observateurs, qui réagissent lors d'un appel extérieur, ce qui donne une impression de temps réel.

Une partie du code vous est fournie, afin de faciliter la mise en place de Firebase et des context providers. Il vous est demandé d'explorer le code, d'y apporter un design responsive, et de compléter l'application pour ajouter les différentes étapes de jeu.

Copier .env dans .env.local et remplir de dernier à l'aide de ses identifiants Firebase.
Activer l'authentification anonyme dans la console de Firebase.

### Découverte du code

- Le code utilise des fonctions plutôt que des classes. Ecrire un bouton sous la forme d'une classe et d'une fonction. Retrouver les équivalences entre les méthodes des composants (telles que setState) et celles des fonctions ?
```javascript
//Bouton sous la forme d'une classe

class Button extends Component {
    render() {
        return (
          <div>
              <button>Ceci est un bouton</button>
          </div>
            );
    }
}

export default Button;

//Bouton sous la forme d'une fonction

const Button = (props) => {
  return (
  <button>Ceci est un bouton</button>
  );
}

export default Button;

```

- Comment récupérer les props dans une fonction ?
```javascript
const quelquechose = (props) => {
  const { onClick, children } = props;
...
}

```

- Dans `App.js`, identifier les différents producteurs de données. Retrouver leur définition. Quelles données partagent-ils à l'ensemble de l'application ?
1. MasterGameProvider est le maître du jeu. Il échange avec firebase.
2. GameProvider est le jeu. Il échange des infos du jeu avec firebase.
3. UserProvider est le joueur. Il échange avec firebase les infos de connexion.

- Identifier les différentes pages de l'application. Décrire à l'aide d'une phrase le rôle de chacune d'entre elles.
1. AlivePage: Page qui s'affiche aux joueurs vivants.
2. CastPage: Page pour procéder au vote.
3. CodePage: Page qui créer un code à partager à nos amis pour qu'ils rejoignent la partie.
4. CreatePage: Page pour créer la partie.
5. DeadPage: Page qui s'affiche aux joueurs morts.
6. EndPage: Page des résultats finaux de la partie.
7. NightPage: Page qui affiche les actions durant la nuit.
8. ResultsPage: Page qui affiche les personnes mortes durant la nuit.
9. SpellPage: Page des actions que peut faire le magicien.
10. StartPage: Page d'accueil lorsque l'on lance le jeu. On choisit si on créer une partie ou si on en rejoind une.

- Pourquoi voit-on sur plusieurs pages "Chargement du master game en cours" ?
Il est affiché sur plusieurs pages parce qu'il est appelé dans game.js. Il tourne dans le vide parce que la partie est pas commencé.

- Avec les classes, nous utilisions `withMyContext` pour s'inscrire aux données d'un provider. Identifier dans services/Game.js la fonction qui joue désormais ce rôle.
```javascript
export const useGame = () => {
  const {game} = useContext(gameContext);
  return {game};
};
```

- Dans `CodePage`, rappeler comment un formulaire gère les champs de remplissage des données.o

### Reprise du design

- En utilisant styled-components, reprendre le design du composant Button.
- Votre nouveau bouton peut alors être utilisé pour améliorer l'affichage de la page `StartPage`.
- Ajouter un header et un footer sur toutes les pages de l'application. 
- Réaliser le design du formulaire de de `CodePage`, utilisé pour rejoindre l'application.
- Faire de même avec `CreatePage`.


### Utilisation de Firebase

- Dans 'User.js', comment fait-on pour garder une trace persistente de l'application, même lorsqu'on rafraichit la page ? Comment reconnait-on l'utilisateur lorsqu'il revient dans l'application ?
- Dans Firebase, nous ne pouvons pas ajouter des champs à un utilisateur. Par conséquent, nous devons créer une collection d'utilisateurs et synchroniser les utilisateurs avec cette table. Expliquer où est-ce que cette synchronisation a lieu.
- A votre avis, à quoi sert useEffect ?
- A quoi sert la fonction `unsubscribe` utilisée dans les `useEffect` de `User.js` ?
- Décrire les trois valeurs de retour de `UseUser`.
- Combien de collections dans Firebase pouvez-vous identifier ? A quoi correspondent les `doc` ?

### Contribuer à l'application

- Lors du lancement du jeu, ajouter l'attribution des rôles à chaque joueur : loup-garou, villageois, petite fille ou sorcier. Le nombre de loup-garou est calculé en fonction du nombre de joueurs.
- Chaque joueur reçoit alors une image de son rôle. Partager cette information depuis /wait.
- Lorsque la nuit tombe, la liste des joueurs encore vivants est proposée aux  loups garous, qui doivent se mettre d'accord. Réaliser cette fonction.
- Lorsque le jour arrive, tous les joueurs reçoivent une notification indiquant la cible des loups garous. Cette dernière est redirigée vers DeadPage.
- Les joueurs vivant votent pour éliminer un joueur, suspecté d'être un loup garou. Réaliser cette fonction.

### Rapport

Rédiger un court rapport -- inférieur à une page, expliquant les modifications apportées au projet. Motiver ses choix. Expliquer les difficultés rencontrées.

