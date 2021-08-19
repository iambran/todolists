
document.querySelector('#form').addEventListener('submit', saveLists);

function saveLists(e) {

    e.preventDefault();

    let input = document.querySelector('#input').value;

    if (!validateForm(input)) {
        return false;
    }

    let list = {
        name: input
    }

    if(localStorage.getItem('lists') === null){
        let lists = [];
        lists.push(list);
        localStorage.setItem('lists', JSON.stringify(lists));
    } else {
        let lists = JSON.parse(localStorage.getItem('lists'));
        lists.push(list);
        localStorage.setItem('lists', JSON.stringify(lists));
    }

    document.querySelector('#form').reset();

    fetchLists();
};


function fetchLists() {

    let lists = JSON.parse(localStorage.getItem('lists'));
    let displayLists = document.querySelector('#displayLists');

    // Show description when there are lists, hide it if there are none.
    if (lists.length < 1) {
        document.querySelector('.description').style.display = "none";
    } else {
        document.querySelector('.description').style.display = "block";
    }

    displayLists.innerHTML = '';

    for (let i = 0; i < lists.length; i++) {
        let name = lists[i].name;
        displayLists.innerHTML += `
            <div class="list-item">
                <p class="list-name">${name}</p>
                <span>Delete</span>
            </div>
        `;
    };
};


function validateForm(input) {  

    if(!input) {
        alert('Please add to do item');
        return false;
    }

    return true;
};


(async ()=> {

    await fetchLists();

    document.querySelector('#displayLists').addEventListener('click', toggleFinish);


    function toggleFinish(e) {

        if (e.target.classList.contains('list-item')) {
            // console.log(e.srcElement);
            // srcElement will work as well
            // e.srcElement.classList.toggle('finish');
            e.target.classList.toggle('finish');
        } else if (e.target.classList.contains('list-name')) {
            // console.log(e.srcElement);
            // srcElement will work as well
            // e.srcElement.parentElement.classList.toggle('finish');
            e.target.parentElement.classList.toggle('finish');
        } else {
            //console.log(e.srcElement);
            // This will only remove the list from DOM, not local storage
            // e.target.parentElement.style.display = "none";

            e.stopPropagation();

            console.log(e.target.previousElementSibling.textContent);

            var lists = JSON.parse(localStorage.getItem('lists'));
            for (let i=0; i < lists.length; i++ ) {
                if(lists[i].name == e.target.previousElementSibling.textContent) {
                    lists.splice(i, 1);
                }
                localStorage.setItem('lists', JSON.stringify(lists));
                fetchLists();
            }
        };
    };   


})(); 