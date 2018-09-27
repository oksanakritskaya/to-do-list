var itemModule = function() {
    eventBus.subscribe(Events.ADD_CARD, fillItem);

    function fillItem(newItem) {
        let newCard = document.querySelector('.list__wrapper').lastChild;
        let newInput = newCard.querySelector('.item__input');
        newInput.readOnly = false;
        newInput.focus();
        newInput.addEventListener('change', function () {
            newItem.text = newInput.value;
            eventBus.publish(Events.PUSH_ITEM, newItem);
        })
    }

    let list = document.querySelector('.list__wrapper');
    list.addEventListener('click', function(e) {
        if(e.path[0].classList.contains('item__delete')) {
            eventBus.publish(Events.DELETE_ITEM, e.target.parentElement.dataset.id);
        } else {
            //здесь могла бы быть смена статуса по клику
            let div = e.target.parentElement;
        }
    });
}();