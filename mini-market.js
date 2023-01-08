var MiniMarket = {
    canPay: false,
    modeOrder: false,
    totalPrice: 0,
    isClosed: false,
    isLoading: false,

    init: function (options) {
        Telegram.WebApp.ready();
        MiniMarket.apiUrl = options.apiUrl;
        MiniMarket.userId = options.userId;
        MiniMarket.userHash = options.userHash;
     
        $(".card-add-btn").on("click", MiniMarket.addOrder);

        $("body").show();
    },

    addOrder: function(e){
        e.preventDefault();
        var itemEl = $(this).parents(".card");
        MiniMarket.incrClicked(itemEl, 1);
    },

    incrClicked: function(itemEl, delta){
        if (MiniMarket.isLoading || MiniMarket.isClosed) {
            return false;
        }

        var count = +itemEl.data("item-count") || 0;
        count += delta;
        if (count < 0) {
            count = 0;
        }
        itemEl.data("item-count", count);
        MiniMarket.updateItem(itemEl, delta);
    },

    updateItem: function (itemEl, delta) {
        var price = +itemEl.data("item-price");
        var count = +itemEl.data("item-count") || 0;
        
        var orderItemEl = MiniMarket.getOrderItem(itemEl);
        var orderCounterEl = $(".item-counter", orderItemEl);
        orderCounterEl.text(count ? count : 1);
        
    },

    getOrderItem: function (itemEl) {
        var id = itemEl.data("item-id");
        return $(".card").filter(function () {
            return $(this).data("item-id") == id;
        });
    },
}