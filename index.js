//initialize variable

let searchBtn = document.querySelector('#search-btn');
let menuDetails = document.querySelector('#html-div');
let errorMassage = document.querySelector('#error-massege');
let foodDetailsDiv = document.getElementById('pop-up');

// capture search bar value and call api after click search button.
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    errorMassage.style.display = 'none';
    menuDetails.innerHTML = '';
    let searchBarValue = document.querySelector('#search-bar').value;
    showSpinner(true);

    if (searchBarValue.length == 1) {
        // api use from mealDB.com. This api load value using first latter of the searching meal
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchBarValue}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.meals == null) {
                    showSpinner(false);
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
        alert("Please give search value");
    }
    else {
        // api use from mealDB.com This api load value using full meal name.
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBarValue}`)
            .then((response) => response.json())
            .then((result) => {
                // if do not load data from api then this block is working
                if (result.meals == null) {
                    showSpinner(false);
                    menuDetails.innerHTML = '';
                    errorMassage.style.display = 'block';
                }
                else {

                    showMealsByFirstWord(result.meals);
                }

            })
    }
})


// This function take data from api then show in user interface.
const showMealsByFirstWord = (foods) => {
    foods.map((food) => {
        console.log(food);

        
        // create div element and set attribute
        let div = document.createElement('div');
        div.className = 'card';
        div.style.margin = '10px'
        div.style.width = '18rem';
        div.onclick = function click(){
            menuDetails.style.display = 'none';
            displayDetails(`${food.idMeal}`);
        }
        


        /// create image element and set attribute.
        let img = document.createElement('img');
        img.className = 'card-img-top';
        img.src = food.strMealThumb;


        let cardBodyDiv = document.createElement('div');
        cardBodyDiv.className = 'card-body';
        let h5 = document.createElement('h5');
        h5.className = 'card-title';
        h5.innerText = food.strMeal;


        // after creating element set inside the html
        cardBodyDiv.appendChild(h5);
        div.appendChild(img);
        div.appendChild(cardBodyDiv);
        menuDetails.appendChild(div);
        showSpinner(false);


    });
}

// This function use for call api. which api work by using meal id.
const displayDetails = (name) => {

    // api use from mealDB.com
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {

            renderFoodInfo(data.meals[0]);
            
        });
}


// show single meal details 
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

// This function call after click in dismiss button
const dismiss = ()=>{
   console.log("dismiss");
   foodDetailsDiv.innerHTML = '';
   menuDetails.style.display = 'flex';
}

const showSpinner = (show)=>{
    const spinner = document.getElementById('loading-spinner');
    if(show){
        spinner.classList.remove('d-none');
    }
    else{
        spinner.classList.add('d-none');
    }
}

// Thank you for checking my code.