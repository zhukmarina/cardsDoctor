 const btnFltrUrgency = document.getElementById('filterUrg');
 const btnFltrStatus = document.getElementById("filterStatus")
    
const items_el =  document.getElementById('cards-container');
 
function filterCard() {
 console.log(1)     
const items = items_el.getElementsByClassName('card_discription');
    
    for (let i=0; i<items.length; i++) {
        if (items[i].classList.contains(this.value)) {
          items[i].classList.add('show');
          items[i].classList.remove('hide');
      } else {
          items[i].classList.add('hide');
          items[i].classList.remove('show');
      }
    }
  };
    
btnFltrUrgency.addEventListener("change",filterCard);
btnFltrStatus.addEventListener("change",filterCard);


  

