var listModule = function() {
    let items = [{
        id: 1,
        text: 'to do 1',
        status: 'default'
    },{
        id: 2,
        text: 'to do 2',
        status: 'done'
    },{
        id: 3,
        text: 'to do 3',
        status: 'undone'
    },{
        id: 4,
        text: 'to do 4',
        status: 'default'
    },{
        id: 5,
        text: 'to do 5',
        status: 'default'
    }];

    document.querySelector('.item__add').addEventListener('click', function() {
        const newItem = {
            id: null,
            text: null,
            status: 'default'
        };
        newItem['id'] = items.length+1;
        items.push(newItem);
        renderItems();

        eventBus.publish(Events.ADD_CARD, newItem);
    });

    eventBus.subscribe(Events.PUSH_ITEM, pushItem);
    function pushItem(itemPush) {
        items[items.length-1] = itemPush;
        renderItems();
    }

    eventBus.subscribe(Events.DELETE_ITEM, deleteItem);
    function deleteItem(itemId) {
        console.log('delete');
        let deleteIndex = items.findIndex(function(elem) {
            if(elem.id === parseInt(itemId)) {
                return elem;
            }
        });
        console.log(items[deleteIndex]);
        items.splice(deleteIndex, 1);
        renderItems();
    }

    function renderItems() {
        let list = document.querySelector('.list__wrapper');
        list.textContent = '';
        items.forEach(function(item) {
            let card = document.createElement('div');
            card.classList.add('item');
            card.classList.add('item--'+item.status);
            card.dataset.id = item.id;

            let input = document.createElement('input');
            input.classList.add('item__input');
            input.value = item.text;
            input.readOnly = true;
            card.appendChild(input);

            let buttonDelete = document.createElement('button');
            buttonDelete.classList.add('item__delete');
            buttonDelete.textContent = '✗';
            buttonDelete.type = 'button';
            card.appendChild(buttonDelete);

            list.appendChild(card);
        });
    }
    
    renderItems();
}();