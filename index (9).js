<view wx:if="{{show}}">
  <view class="mask"></view>
  <view class="dialog">
    <view class="title">{{title}}</view>
    <view class="content">{{content}}</view>
    <view class="actions">
      <button bindtap="cancel">取消</button>
      <button class="ok" bindtap="confirm">确认</button>
    </view>
  </view>
</view>
