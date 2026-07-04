<view class="editor">
  <view wx:for="{{items}}" wx:key="id" class="row">
    <input value="{{item.name}}" placeholder="食材名称" data-index="{{index}}" data-field="name" bindinput="input" />
    <input value="{{item.amount}}" placeholder="用量" data-index="{{index}}" data-field="amount" bindinput="input" />
    <button data-index="{{index}}" bindtap="up">↑</button>
    <button data-index="{{index}}" bindtap="down">↓</button>
    <button data-index="{{index}}" bindtap="remove">删</button>
  </view>
  <button class="add" bindtap="add">添加食材</button>
</view>
