// Seleciona un numero random entre dos valores dados.
function randomNumberBetween(min, max) {
   return Math.floor(Math.random() * (max - min) + min);
}

// Boton de Buscar y sección de resultados
const searchButton = document.getElementById("btn-search");
const searchButtonRandom = document.getElementById("btn-random");
const sect = document.getElementById("sect");


searchButton.addEventListener("click", (event) => {
   searchProblem();
   event.preventDefault();
});

searchButtonRandom.addEventListener("click", (event) => {
   searchProblemRandom();
   event.preventDefault();
});

function searchProblemRandom() {
   // Petición a problemas de codeforces
   fetch("https://codeforces.com/api/problemset.problems")
      .then((response) => response.json())
      .then((data) => {
         // Comprobamos si la petición a salido bien
         if (data?.status != "OK") return;

         // Obtenemos el Obj de problemas y selecionamos el input
         const problems = data.result.problems;
         let randomIndex = randomNumberBetween(0, Object.keys(problems).length);
         result = problems[randomIndex];

         // Seleciona el boton de Go, añade el sontenido en el section, y genera la URl del probelma.
         sect.innerHTML = `
         <h2 class="problem-title">${result?.name}</h2>
         <h3 class="problem-value">Tags: ${result?.tags}</h3>
         <h3 class="problem-value">Rating:  ${result?.rating}</h3>
         `;

         document.getElementById("go").href = `https://codeforces.com/problemset/problem/${result?.contestId}/${result?.index}`;
      });
}

function searchProblem() {
   // Seleciona el value de el selecionado
   let input = document.getElementById("inp-rating");
   let text = tags.options[tags.selectedIndex].value;
   if (text == "" || input.value == "") return;

   // Petición a problemas de codeforces
   fetch("https://codeforces.com/api/problemset.problems")
      .then((response) => response.json())
      .then((data) => {
         // Comprobamos si la petición a salido bien
         if (data?.status != "OK") return;

         // Obtenemos el Obj de problemas y selecionamos el input
         const problems = data.result.problems;

         // Se filtra por el tag selecionado, devuelbe un conjunto de objetos
         let tagsProblems = problems.filter((problem) => {
            return problem.tags.includes(text);
         });

         // Se filtra por rating en base 10, de los tags selecionados.
         let result = tagsProblems.filter((problem) => {
            return problem?.rating == parseInt(input.value, 10);
         });

         // Añadimos el contenido en el section, y generamos la URl del problema.
         sect.innerHTML = `
            <h2 class="problem-title">${result[0].name}</h2>
            <h3 class="problem-value">Tags: ${result[0].tags}</h3>
            <h3 class="problem-value">Rating:  ${result[0].rating}</h3>
         `;

         document.getElementById("go").href = `https://codeforces.com/problemset/problem/${result[0]?.contestId}/${result[0]?.index}`;
      });
}
