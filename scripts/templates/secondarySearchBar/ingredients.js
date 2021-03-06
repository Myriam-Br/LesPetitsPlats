class Ingredients{
    constructor(recipes){
        this.$wrapper = document.createElement('article')
        this.$wrapper.setAttribute('id', 'ingredients_search_bar')
        this.$recipe = document.getElementById('recipe_wrapper')
        this.$main = document.getElementById('main')
        // console.log(this.$recipe);
        // console.log(recipes);
        this._recipes  = recipes
   
    }

    
    // drop down to display the ingredients list
    dropDownSection() {
       // console.log(this.$wrapper.querySelector('#drop_down_ingredients'));
        const el = this.$wrapper.querySelector('.drop_down')
        const section = this.$wrapper.querySelector('.list')
        const icone = this.$wrapper.querySelector('i')
        el.addEventListener('click', () => {
            //console.log('ingredients list');
            //console.log(section.style);      
            //console.log(section.getAttribute('opened'));
            if(section.getAttribute('opened')){
                section.style.display='none'
                section.removeAttribute('opened')  
                icone.removeAttribute('fa fa-chevron-up')
                icone.setAttribute('class','fa fa-chevron-down')            
            } else {
                section.style.display='block'
                section.setAttribute('opened', 'true')
                icone.removeAttribute('fa fa-chevron-down')
                icone.setAttribute('class','fa fa-chevron-up')
            }     
        })
    }


    // add/remove ingredient to the sectionAddedIngredient 
    handleIngredients (id){

    const sectionItemAdded = document.getElementById('items_added')
    const elt = this.$wrapper.querySelector('#ingredients_list').querySelector(`[id="${id}" ]`)


        elt.addEventListener('click', () => {
           // console.log(elt);

            //set if elt is added or not
            if (elt.getAttribute('added')) {
                elt.removeAttribute('added')
                //console.log('removed',elt);

            }
            
            else{
                //set added to true
                elt.setAttribute('added', 'true')

                // create eltHTML and add to item added section
                    // create 'p'
                let eltAddedDom = document.createElement('p')
                eltAddedDom.setAttribute('class', elt.innerHTML.toLowerCase())
                eltAddedDom.innerHTML = elt.innerHTML

                    // create button
                let btnDeleteElt = document.createElement('button')
                btnDeleteElt.setAttribute('class', 'btn_delete_elt_added')
                eltAddedDom.appendChild(btnDeleteElt)


                // handle btnDeleteElt
                btnDeleteElt.addEventListener('click', () => {  
                    eltAddedDom.remove() 
                    elt.style.display='block'

                })


                // display none elt that has been added to sectionItemAdded 
                elt.style.display='none'
     
                // link eltAddedDom with sectionItemAdded
                sectionItemAdded.appendChild(eltAddedDom)
            }

        })
    }

    searchIngredient() {
  
        const elt = this.$wrapper.querySelector('#input_ingredients')   
        const recipeFromRecipeSection = this.$recipe.getElementsByClassName('recipe_card')
        const ingredientFromRecipeSection = this.$recipe.getElementsByClassName('ingredient_recipe_list')
       
        elt.addEventListener('keyup', () => {

            // console.log(elt.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
            const ingredientSearched = elt.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
           // console.log(this.$recipe.querySelectorAll('[filter1=active]'));
            for(let i = 0; i < recipeFromRecipeSection.length; i++ ) {
          
                const recipeCard = recipeFromRecipeSection[i] 
                const ingredientsRecipe = recipeCard.querySelectorAll('ul')
                
                for(let j = 0; j < ingredientsRecipe.length; j++) {

                    // get each ingredient of a recipe 
                    const ingredientList = ingredientsRecipe[j].querySelectorAll('li')
   
                   
                    // create new tab to use data
                    const set = new Set(ingredientList)
                    const array = Array.from(set)
                    const compareIngredient = array.some(element => element.getAttribute('class').includes(ingredientSearched))
                    //console.log(ingredientList);
                      /*             
                    if(ingredientSearched.length >=3) {

                        if(compareIngredient) {
                            //console.log(recipeCard);
                            recipeCard.style.display = 'block'
                            recipeCard.setAttribute('filter2', 'active')
                            console.log(recipeCard);
                            //console.log('true');
                        }
                        else{
                            recipeCard.style.display = 'none'
                            recipeCard.removeAttribute('filter2')
                            //console.log(recipeCard);
                            //console.log('false');
                        }            
                                      
                    }
                    else{
                        recipeCard.style.display = 'block'
                        recipeCard.removeAttribute('filter2')
                       // console.log(recipeCard);
                        //console.log('else');
                    }*/
                
                }              
            }
        })
    }

    createSearchBar (){
        const that = this
        
        // CREATE INGREDIENTS SEARCH BAR DOM

        // input
        const labelInputIngredients = document.createElement('label')
        labelInputIngredients.setAttribute('for', 'input_ingredients')
        

        const inputIngredients = document.createElement('input')
        inputIngredients.setAttribute('id', 'input_ingredients')
        inputIngredients.setAttribute('placeholder', 'Rechercher un ingr??dient')
        inputIngredients.setAttribute('value', 'Ingr??dients')
        
        

        //button arrow 
        const btnDropDown = document.createElement('button')
        btnDropDown.setAttribute('class', 'drop_down')
        btnDropDown.setAttribute('id', 'drop_down_ingredients')
        const iconBtnDropDown = document.createElement('i')
        iconBtnDropDown.setAttribute('class', 'fa fa-chevron-down')
        btnDropDown.appendChild(iconBtnDropDown)
   

        // ingredients list
        const ingredientsSection = document.createElement('ul')
        ingredientsSection.setAttribute('id', 'ingredients_list')
        ingredientsSection.setAttribute('class', 'list')
        ingredientsSection.style.display = "none"

        
       const ingredientsTab = []
        for(let i = 0; i < this._recipes.length; i++) {
            // console.log(this._recipes[i].ingredients);
            let ingredients = this._recipes[i].ingredients      
            for(let j = 0; j < ingredients.length; j++) {
                //console.log(ingredients[j]);
                let ingredientsList = ingredients[j]
                //console.log(ingredients[j]);
                
                for (let k = 0; k < ingredientsList.length; k++) {
                    let ingredientToLowerCase = ingredientsList[k].ingredient.toLowerCase()
                    let ingredientSyntax = ingredientToLowerCase.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    ingredientsTab.push(ingredientSyntax)        

                }        
            }
        }

        that.$wrapper.appendChild(ingredientsSection)
        that.$wrapper.appendChild(labelInputIngredients)
        that.$wrapper.appendChild(inputIngredients)
        that.$wrapper.appendChild(btnDropDown)
        that.dropDownSection()

        //retirer les doublons du tableau
        let uniqueIngredientTab = [...new Set(ingredientsTab)]
        //console.log(uniqueIngredientTab);
        uniqueIngredientTab.forEach(element => {
            //console.log(element);
            const ingredientItem = document.createElement('li')   
            ingredientItem.setAttribute('class', element)
            ingredientItem.setAttribute('id', element)        
            const elementSyntax = element.charAt(0).toUpperCase() + element.slice(1)
            ingredientItem.innerHTML= elementSyntax  
            ingredientsSection.appendChild(ingredientItem) 
            that.handleIngredients(element)   
              
        });
      
          
        that.searchIngredient()    
                   
        return that.$wrapper
    }

}

