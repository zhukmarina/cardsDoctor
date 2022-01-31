    function submit(evt) {
        evt.preventDefault();
    };
    
    function filter(evt) {
        evt.preventDefault();
        let input = document.querySelector('#site-search');
        let inputValue = input.value.toLowerCase();	
        let cards = document.querySelectorAll('.card_discription');
    
        cards.forEach(
            function getMatch(info) {
                let heading = info.querySelector('h3');
                let headingContent = heading.innerHTML.toLowerCase();
                
                if (headingContent.includes(inputValue)) {
                    info.classList.add('show');
                    info.classList.remove('hide');	
                }
                else {
                    info.classList.add('hide');
                    info.classList.remove('show');
                }
            }
        )

        console.log(1)
    }
    
    function autoReset() {
        let input = document.querySelector('#site-search');
        let cards = document.querySelectorAll('card_discription');
    
        cards.forEach(
            function getMatch(info) {
                if (input.value == null, input.value == "") {
                    info.classList.remove('show');
                    info.classList.remove('show');
                }
                else {
                    return;
                }			
            }
        )
    }
    
    let formSearch = document.querySelector('.search-form');
    
    formSearch.addEventListener('keyup', filter);
    
    formSearch.addEventListener('submit', submit);

    