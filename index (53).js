<view class="page">
  <recipe-card wx:for="{{recipes}}" wx:key="id" recipe="{{item}}" bind:open="openRecipe" bind:favorite="favorite"></recipe-card>
  <view wx:if="{{recipes.length === 0}}" class="card">
    <empty-state title="还没有收藏菜谱" desc="看到喜欢的菜谱就收藏起来吧"></empty-state>
  </view>
</view>
