let searchBtn = document.querySelector('#search-btn');
let menuDetails = document.querySelector('#html-div');
let errorMassage = document.querySelector('#error-massege');
let foodDetailsDiv = document.getElementById('pop-up');
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    errorMassage.style.display = 'none';
    menuDetails.innerHTML = '';
    let searchBarValue = document.querySelector('#search-bar').value;
    if (searchBarValue.length == 1) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchBarValue}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.meals == null) {
                    menuDetails.style.display = 'none';
                    foodDetailsDiv.innerHTML = '';
                    errorMassage.style.display = 'block';
                }
                else {

                    showMealsByFirstWord(data.meals);
                }


            })
    }
    else if (searchBarValue.length == 0) {
        alert("Hello! I am an alert box!!");
    }
    else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBarValue}`)
            .then((response) => response.json())
            .then((result) => {
                if (result.meals == null) {
                    menuDetails.innerHTML = '';
                    errorMassage.style.display = 'block';
                }
                else {

                    showMealsByFirstWord(result.meals);
                }

            })
    }
})

const showMealsByFirstWord = (foods) => {
    foods.map((food) => {
        console.log(food);

        // let htmlDiv = document.getElementById('html-div');

        let div = document.createElement('div');
        div.className = 'card';
        div.style.margin = '10px'
        div.style.width = '18rem';
        div.onclick = function click(){
            menuDetails.style.display = 'none';
            displayDetails(`${food.idMeal}`);
        }
        



        let img = document.createElement('img');
        img.className = 'card-img-top';
        img.src = food.strMealThumb;

//         htmlDiv.innerHTML = `  <div class="card" onclick="displayDetails('${food.idMeal}')" style="width:18rem; margin:10px;" ata-toggle="modal" data-target="#exampleModal">
//       <img class="card-img-top" src=${food.strMealThumb} alt="" />
//       <div className="card-body">
//           <h5 className="card-title">${food.strMeal}</h5>
//       </div>
//   </div>`
//   console.log(htmlDiv);









        // let foodInfo = `
        // <div class="card-body">
        // <h5 class="card-title">${food.strMeal}</h5>
        // </div>
        // `;

        let cardBodyDiv = document.createElement('div');
        cardBodyDiv.className = 'card-body';
        let h5 = document.createElement('h5');
        h5.className = 'card-title';
        h5.innerText = food.strMeal;



        cardBodyDiv.appendChild(h5);

        div.appendChild(img);
        div.appendChild(cardBodyDiv);

        console.log(div);

        menuDetails.appendChild(div);



    });
}


const displayDetails = (name) => {

    console.log('name:'+name)
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {

            renderFoodInfo(data.meals[0]);
            // console.log(data.meals[0]);
        });
}

const renderFoodInfo = food => {
    
  
    console.log(foodDetailsDiv);
    foodDetailsDiv.innerHTML = ` <img class="img-fluid rounded mb-4" style="width:400px; height:300px" src="${food.strMealThumb}" alt="">
    <h4>${food.strMeal}</h4>
    
    <h5 class="pt-3 pb-2"><i class="icon-fire icons"></i> Ingredients</h5>
    <ul class="list-unstyled mb-0">
        <li><i class="icon-check icons"></i>${food.strMeasure1}, ${food.strIngredient1}</li>
        <li><i class="icon-check icons"></i>${food.strMeasure2}, ${food.strIngredient2}</li>
        <li><i class="icon-check icons"></i>${food.strMeasure3}, ${food.strIngredient3}</li>
        <li><i class="icon-check icons"></i>${food.strMeasure4}, ${food.strIngredient4}</li>
    </ul>
    <button onclick="dismiss()"  class="btn btn-primary">Dismiss</button>`;
   
    ;
    

};

const dismiss = ()=>{
   console.log("dismiss");
   foodDetailsDiv.innerHTML = '';
   menuDetails.style.display = 'flex';
}

