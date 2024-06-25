const add_btn = document.getElementById('addBtn')
const mainPage = document.getElementById('firstDiv')
const modalPage = document.getElementById('modal')
const modalBtnClose = document.getElementById('modalBtn2')
const modalBtnAdd = document.getElementById('modalBtn1');
const modalInput = document.getElementById('modalInput');
const deleteItemBtn = document.getElementsByClassName('btnInsideItem')
const emptyDiv = document.querySelector('#emptyDiv')

// add item to a list
const modalPage2 = document.getElementById('modal2')
const modalBtnClose2 = document.getElementById('modalBtn22')
const modalBtnAdd2 = document.getElementById('modalBtn21');
const modalInput2 = document.getElementById('modalInput2');

// alerts
const alt = document.getElementById('msg')
const altDiv = document.getElementById('msgDiv')

// mark items inside a list of items
const mark = document.getElementsByClassName('markBtnInsideItem')

function showAlert(msg) {
    altDiv.style.display = 'block';
    alt.innerHTML = msg;

    setTimeout(() => {
        altDiv.style.display = 'none';
        location.reload();
    }, 1000);
}

// showAlert()

// utility function to toggle between old screen and add new item
add_btn.addEventListener('click', () => {
    mainPage.style.display = 'none';
    modalPage.style.display = 'block'
})

modalBtnClose.addEventListener('click', () => {
    mainPage.style.display = 'block';
    modalPage.style.display = 'none'
    location.reload()
})

// utility function to add new list
function test(heading, allItems) {
    var element = document.createElement("div");
    element.className = 'items';
    element.id = 'items';
    var p = document.createElement('p')
    p.innerHTML = heading
    p.className = 'headings'
    element.appendChild(p)
    var h = document.createElement('hr')
    h.id = 'hr'
    element.appendChild(h)
    var innerDiv = document.createElement('div');
    innerDiv.className = 'items1';

    for (let i in allItems) {
        var innerDivDiv = document.createElement('div');
        innerDivDiv.className = 'itemsInsideItem';
        var sp = document.createElement('span');
        sp.className = 'itemsInsideItem';
        sp.innerHTML = i;
        var bt = document.createElement('button');
        bt.type = 'button';
        bt.className = 'markBtnInsideItem';
        bt.innerHTML = 'Done';
        innerDivDiv.appendChild(sp);
        innerDivDiv.appendChild(bt);
        innerDiv.appendChild(innerDivDiv)
        if (!allItems[i]) {
            sp.style.textDecoration = 'line-through';
            bt.style.display = 'none';
        }
    }

    element.appendChild(innerDiv);
    var ld = document.createElement('div');
    ld.className = 'btnInsideItem';
    var ld1 = document.createElement('button')
    var ld2 = document.createElement('button');
    ld1.type = 'button';
    ld2.type = 'button';
    ld1.id = 'btnInsideItem1'
    ld2.id = 'btnInsideItem2';
    ld1.innerHTML = 'More';
    ld2.innerHTML = 'Delete';
    ld1.className = 'buttons'
    ld2.className = 'buttons'
    ld.appendChild(ld1);
    ld.appendChild(ld2);
    element.appendChild(ld)

    const parent = document.getElementById('itemsList');
    parent.appendChild(element);

}


// to load all the previous plans
Object.keys(localStorage).forEach(function(key) {
    var item = JSON.parse(localStorage.getItem(key));
    test(key, item);
});


// to add new list
modalBtnAdd.addEventListener('click', () => {
    const newTableName = modalInput.value
    var myObj = {}
    window.localStorage.setItem(newTableName, JSON.stringify(myObj))
    mainPage.style.display = 'block';
    modalPage.style.display = 'none'

    var item = JSON.parse(localStorage.getItem(newTableName));
    test(newTableName, item);
    showAlert('List Added');
})

// delete a complete itemList
for (let current in deleteItemBtn) {
    if (deleteItemBtn[current].parentNode) {
        deleteItemBtn[current].childNodes[1].addEventListener('click', (e) => {
            localStorage.removeItem(deleteItemBtn[current].parentNode.childNodes[0].innerHTML)
            showAlert('List Deleted')
        })
    }
}

// to add items in a particular list
for (let current in deleteItemBtn) {
    if (deleteItemBtn[current].parentNode) {
        deleteItemBtn[current].childNodes[0].addEventListener('click', (e) => {
            mainPage.style.display = 'none';
            modalPage2.style.display = 'block'
            const cardName = deleteItemBtn[current].parentNode.childNodes[0].innerHTML
            modalBtnAdd2.addEventListener('click', () => {
                const newItem = modalInput2.value
                console.log(newItem)
                const myObj = JSON.parse(window.localStorage.getItem(cardName))
                window.localStorage.removeItem(cardName);
                myObj[newItem] = 1;
                window.localStorage.setItem(cardName, JSON.stringify(myObj))
                mainPage.style.display = 'block';
                modalPage2.style.display = 'none'

                var item = JSON.parse(localStorage.getItem(cardName));
                // test(cardName, item);
                showAlert('Item Added in ' + cardName)
            })
        })
    }
}

modalBtnClose2.addEventListener('click', () => {
    mainPage.style.display = 'block';
    modalPage2.style.display = 'none'
})


// marking item
for (let ele in mark) {
    if (mark[ele].parentNode) {
        mark[ele].addEventListener('click', () => {
            // console.log(mark[ele], mark[ele].parentNode.parentNode.parentNode.childNodes[0].innerHTML)
            const cardName = mark[ele].parentNode.parentNode.parentNode.childNodes[0].innerHTML;
            const itemName = mark[ele].parentNode.childNodes[0].innerHTML
            const myObj = JSON.parse(window.localStorage.getItem(cardName))
            window.localStorage.removeItem(cardName);
            myObj[itemName] = 0;
            window.localStorage.setItem(cardName, JSON.stringify(myObj))
            showAlert('List Updated, Marked ' + itemName + ' in ' + cardName);
        })
    }
}

// ---------------------------------- FULL VIEW     --------------
// For a particular item
const goBack = document.getElementById("modalBtn31")
const addNewList = document.getElementById('modalBtn32')
const fullViewDiv = document.getElementById('itemsListFullView')
const head = document.getElementsByClassName('headings');
const modal3 = document.getElementById('modal3')
const fullViewAddDel = document.getElementsByClassName('btnInsideItem3')
const addMore = document.getElementById('btnInsideItem1')

var markItems = document.getElementsByClassName('markBtnInsideItem9')



// utility to show a list 
function fullViewHelper(heading, allItems) {

    var element = document.createElement("div");
    element.className = 'items';
    element.id = 'items';
    var p = document.createElement('p')
    p.innerHTML = heading
    p.className = 'headings'
    element.appendChild(p)
    var h = document.createElement('hr')
    h.id = 'hr'
    element.appendChild(h)
    var innerDiv = document.createElement('div');
    innerDiv.className = 'items1';

    for (let i in allItems) {
        var innerDivDiv = document.createElement('div');
        innerDivDiv.className = 'itemsInsideItem';
        var sp = document.createElement('span');
        sp.className = 'itemsInsideItem';
        sp.innerHTML = i;
        var bt = document.createElement('button');
        bt.type = 'button';
        bt.className = 'markBtnInsideItem markBtnInsideItem9';
        bt.innerHTML = 'Done';
        bt.setAttribute("onclick", "markItemFunction(this)");
        innerDivDiv.appendChild(sp);
        innerDivDiv.appendChild(bt);
        innerDiv.appendChild(innerDivDiv)
        if (!allItems[i]) {
            sp.style.textDecoration = 'line-through';
            bt.style.display = 'none';
        }
    }

    element.appendChild(innerDiv);
    var ld = document.createElement('div');
    ld.className = 'btnInsideItem3';
    var ld1 = document.createElement('button')
    var ld2 = document.createElement('button');
    ld1.type = 'button';
    ld2.type = 'button';
    ld1.id = 'btnInsideItem1';
    ld2.id = 'btnInsideItem2';
    ld1.innerHTML = 'More';
    ld2.innerHTML = 'Delete';
    ld1.className = 'buttons'
    ld2.className = 'buttons'
    ld1.setAttribute("onclick", "addMoreFunction(this)");
    ld.appendChild(ld1);
    ld.appendChild(ld2);
    element.appendChild(ld)

    const parent = document.getElementById('itemsListFullView');
    parent.appendChild(element);

}


// function addItemInFullView(ele) {
//     const newItem = modalInput2.value
//     console.log(newItem)
//     const myObj = JSON.parse(window.localStorage.getItem(cardName))
//     window.localStorage.removeItem(cardName);
//     myObj[newItem] = 1;
//     window.localStorage.setItem(cardName, JSON.stringify(myObj))
//         // fullViewDiv.firstElementChild.style.display = 'none'
//         // console.log(fullViewDiv.children);
//     modal3.style.display = 'block';
//     modalPage2.style.display = 'none'

//     var item = JSON.parse(localStorage.getItem(cardName));
//     // fullViewHelper(cardName, item);
//     // location.reload();
//     // window.alert("Item added.")
//     list.innerHTML += ` <div class="itemsInsideItem">
//         <span class="itemsInsideItem">${newItem} </span>
//         <button type="button" class="markBtnInsideItem">Mark</button>
//         </div>`
// }


// utility function to add items in list 
function addMoreFunction(ele) {
    var list = ele.parentNode.parentNode.childNodes[2]
    var cardName = ele.parentNode.parentNode.childNodes[0].innerHTML
    console.log('add item clicked')
    modal3.style.display = 'none';
    modalPage2.style.display = 'block'
    modalBtnAdd2.addEventListener('click', () => {
        const newItem = modalInput2.value
        console.log(newItem)
        const myObj = JSON.parse(window.localStorage.getItem(cardName))
        window.localStorage.removeItem(cardName);
        myObj[newItem] = 1;
        window.localStorage.setItem(cardName, JSON.stringify(myObj))
        modal3.style.display = 'block';
        modalPage2.style.display = 'none'

        var item = JSON.parse(localStorage.getItem(cardName));
        // location.reload();
        list.innerHTML += `<div class="itemsInsideItem"><span class="itemsInsideItem">${newItem}</span><button type="button" onclick="markItemFunction(this)" class="markBtnInsideItem">Done</button></div>`
    }, { once: true })
}

function markItemFunction(ele) {
    // console.log(ele)
    const cardName = ele.parentNode.parentNode.parentNode.childNodes[0].innerHTML;
    const itemName = ele.parentNode.childNodes[0].innerHTML
        // console.log(ele.parentNode.childNodes[1])
        // console.log(itemName)
    const myObj = JSON.parse(window.localStorage.getItem(cardName))
    window.localStorage.removeItem(cardName);
    myObj[itemName] = 0;
    window.localStorage.setItem(cardName, JSON.stringify(myObj))
        // location.reload();
    ele.parentNode.childNodes[0].style.textDecoration = 'line-through';
    ele.parentNode.childNodes[1].style.display = 'none';
}

// to go to particular list of items
for (let i in head) {
    if (head[i].parentNode) {
        head[i].addEventListener('click', () => {
            // console.log('Full view')
            mainPage.style.display = 'none';
            modal3.style.display = 'block'
            const cardName = head[i].innerHTML
            const myObj = JSON.parse(window.localStorage.getItem(cardName))
            fullViewHelper(cardName, myObj);

            // to delete an item in full view
            const deleteList = document.getElementById('btnInsideItem2')
            deleteList.addEventListener('click', () => {
                console.log('delete clicked')
                window.localStorage.removeItem(cardName)
                location.reload();
            })
        })
    }
}

// to go back to main Page
goBack.addEventListener('click', () => {
    modal3.style.display = 'none';
    mainPage.style.display = 'block';
    location.reload();
})

// add item from Full View
addNewList.addEventListener('click', () => {
    modal3.style.display = 'none';
    modalPage.style.display = 'block'
})


// to show text for empty lists
if (window.localStorage.length == 0) {
    emptyDiv.style.display = 'block';
} else {
    emptyDiv.style.display = 'none';
}