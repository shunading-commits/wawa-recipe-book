const storage = require('../../utils/storage');

Page({
  data: {
    items: [],
    totalCount: 0
  },
  onShow() {
    this.load();
  },
  load() {
    const items = storage.getOrderItems()
      .map(item => Object.assign({}, item, { recipe: storage.getRecipeById(item.recipeId) }))
      .filter(item => item.recipe);
    this.setData({
      items,
      totalCount: items.reduce((sum, item) => sum + item.count, 0)
    });
  },
  setCount(e) {
    storage.updateOrderItem(e.currentTarget.dataset.id, Number(e.currentTarget.dataset.count));
    this.load();
  },
  clear() {
    storage.clearOrderItems();
    this.load();
  },
  openRecipe(e) {
    wx.navigateTo({ url: '/pages/recipe-detail/index?id=' + e.currentTarget.dataset.id });
  }
});
