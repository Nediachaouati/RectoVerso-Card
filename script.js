const cardsContainer = document.getElementById("cards-container"); //bech tselecty l'élément eli fel  HTML eli aandou l id cards-container eli howa conteneur mtaa cart eli au center
const addContainer = document.getElementById("add-container");//bech nestaamlou fy halen u taskir l formulaire eli yodhhor wa9teli nenzel aala btn add new card
const showButton = document.getElementById("show");//btn bech tdhahrelna lformulaire
const hideButton = document.getElementById("hide");//btn bech tmaski lformulaire
const addCardButton = document.getElementById("add-card");//btn bech nestaamlouh wa9teli nabaathou les donnes de form
const prevButton = document.getElementById("previous");//btn trajaa m loul (les fleches)
const nextButton = document.getElementById("next");//btn t9adem 
const currentText = document.getElementById("current");//fyh les nb des cartes  

let cards = []; //liste vide bch nhotou feha les cartes 
let currentIndex = 0;// variable t7ot fiha index mta3 l'carte li aana

// fct bech trecuperylna les cartes ml db.json
function getAllCards() {
  fetch("http://localhost:5000/cards") //par defaut method GET
    .then((response) => response.json()) //bech nrecupery response u nhawelha l format json 
    .then((data) => {
      cards = data; // nhotou les données fi list cards
      showCards(); //naamlou appel ll fct showCards eli taamlelna l'affichage mtaa les cartes
    });
}

// fct tdhaherlek le formulaire li fih question w answer waqteli teklicki 3ala btn Add New Card
showButton.addEventListener("click", () => {
  addContainer.classList.add("show");
});

// fct tmaskilk lformulaire waqteli teklicki 3ala croix
hideButton.addEventListener("click", () => {
  addContainer.classList.remove("show");
});

//fct bech tzyd card ll db.json
function addCard(question, answer) {
  fetch("http://localhost:5000/cards", {
    method: "POST", //bech nabaathou donnes lezem method post 
    body: JSON.stringify({
      id: crypto.randomUUID(),//bech id ykoun crypter
      question: question,//les donnes eli bch nabaathohom
      answer: answer,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      cards.push(data); // tzyd data f list
      showCards(); // appel ll fct mtaa l'affichage 
    });
}

//wa9teli tenzel aala addcard bch déclancha
addCardButton.addEventListener("click", () => {
  const questionInput = document.getElementById("question").value.trim(); //bech nrecupery les valeurs de champs saisie
  const answerInput = document.getElementById("answer").value.trim();

  if (questionInput !== "" && answerInput !== "") {
    addCard(questionInput, answerInput); // ken les champs c bon mahomech ferghyn naamlou appel ll fct addCard bech tzyd card ll list

    // bech nrajaaou les champs vides
    document.getElementById("question").value = "";
    document.getElementById("answer").value = "";

    // nsakrou l form
    addContainer.classList.remove("show");
  } else { //ken vide bech yabaaeth alert
    alert("Veuillez remplir les deux champs");
  }
});

// bech t'affichi les cartes fel container cardsContainer
function showCards() {
  cardsContainer.innerHTML = ""; // bech nfarghou container

  cards.forEach((card, index) => { //bech nparcouriw les cartes lkol
    const cardDiv = document.createElement("div"); //fy kol card div jdyda bech tetsna3 container jdyd

    cardDiv.classList.add("card");

    // bech nasnaaou l'interieur card question u answer
    const innerCard = document.createElement("div");
    innerCard.classList.add("inner-card");

    // bech nasnaaou lface mtaa question u nzydouha ll interieur 
    const question = document.createElement("div");
    question.classList.add("inner-card-question");
    question.textContent = card.question;

    // bech nasnaaou face mtaa answer
    const answer = document.createElement("div");
    answer.classList.add("inner-card-answer");
    answer.textContent = card.answer;

    // zedna question w answer fel card
    innerCard.appendChild(question);
    innerCard.appendChild(answer);

    // baaed nhotouh fel container
    cardDiv.appendChild(innerCard);

    // bech tbadel card twali verso u tdhaher answer
    cardDiv.addEventListener("click", () => {
      innerCard.classList.toggle("show-answer");
    });

    // nchouf l'index ==currentIndex nhotouh active f l'affichage u baaed nhotouh fel container card
    if (index === currentIndex) {
      cardDiv.classList.add("active");
    } else {
      cardDiv.classList.remove("active");
    }

    cardsContainer.appendChild(cardDiv);
  });

  // tbadl txt li yben fel interface bch ywari l'currentIndex mtaa l card
  currentText.textContent = `${currentIndex + 1} / ${cards.length}`;
}

// trajaaek ll card eli 9bal
prevButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    showCards();
  }
});

// yhezek ll card eli baaed
nextButton.addEventListener("click", () => {
  if (currentIndex < cards.length - 1) {
    currentIndex++;
    showCards();
  }
});


getAllCards(); //appel ll fct getAllCards
