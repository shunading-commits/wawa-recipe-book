Component({
  data: {
    open: false
  },
  methods: {
    toggle() {
      this.setData({ open: !this.data.open });
    },
    close() {
      this.setData({ open: false });
    },
    manual() {
      this.close();
      wx.navigateTo({ url: '/pages/recipe-edit/index' });
    },
    importUrl() {
      this.close();
      wx.navigateTo({ url: '/pages/recipe-import/index' });
    },
    category() {
      this.close();
      wx.navigateTo({ url: '/pages/category-manage/index' });
    }
  }
});
