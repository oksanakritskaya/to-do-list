var Events = function(){
    return {
        ADD_ITEM: 'ADD_ITEM',
        PUSH_ITEM: 'PUSH_ITEM',
        DELETE_ITEM: 'DELETE_ITEM'
    }
}();

var eventBus = (function() {
    var callbacks = {};

    return {
        publish: publish,
        subscribe: subscribe
    }

    function publish(type, event) {
        if(callbacks[type] == null) {
            return;
        }
        callbacks[type].forEach(function(callback) {
            callback(event);
        })
    }

    function subscribe(type, callback) {
        if(callback[type] == null) {
            callbacks[type] = [];
        }
        callbacks[type].push(callback);
    }
})();