function blank(order) {
  return { id: 'step_' + Date.now(), order, description: '', image: '' };
}

function withOrder(items) {
  return items.map((item, index) => Object.assign({}, item, { order: index + 1 }));
}

Component({
  properties: {
    items: {
      type: Array,
      value: [blank(1)]
    }
  },
  methods: {
    emit(items) {
      this.triggerEvent('change', { items: withOrder(items) });
    },
    input(e) {
      const items = this.data.items.slice();
      items[e.currentTarget.dataset.index].description = e.detail.value;
      this.emit(items);
    },
    chooseImage(e) {
      const index = e.currentTarget.dataset.index;
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        success: res => {
          const items = this.data.items.slice();
          items[index].image = res.tempFiles[0].tempFilePath;
          this.emit(items);
        },
        fail: () => wx.showToast({ title: '已取消选择图片', icon: 'none' })
      });
    },
    add() {
      this.emit(this.data.items.concat(blank(this.data.items.length + 1)));
    },
    remove(e) {
      const items = this.data.items.slice();
      if (items.length === 1) {
        this.emit([blank(1)]);
        return;
      }
      items.splice(e.currentTarget.dataset.index, 1);
      this.emit(items);
    },
    up(e) {
      const index = e.currentTarget.dataset.index;
      const items = this.data.items.slice();
      if (index <= 0) return;
      [items[index - 1], items[index]] = [items[index], items[index - 1]];
      this.emit(items);
    },
    down(e) {
      const index = e.currentTarget.dataset.index;
      const items = this.data.items.slice();
      if (index >= items.length - 1) return;
      [items[index + 1], items[index]] = [items[index], items[index + 1]];
      this.emit(items);
    }
  }
});
