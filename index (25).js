.frog {
  position: relative;
  width: 128rpx;
  height: 112rpx;
  margin: 0 auto;
}
.small { transform: scale(.78); }
.face {
  position: absolute;
  left: 8rpx;
  right: 8rpx;
  bottom: 0;
  height: 92rpx;
  background: #69B96B;
  border-radius: 54rpx 54rpx 44rpx 44rpx;
  box-shadow: inset 0 -8rpx 0 rgba(53, 122, 74, .1);
}
.eye {
  position: absolute;
  top: 0;
  z-index: 2;
  width: 42rpx;
  height: 42rpx;
  background: #FFFFFF;
  border: 8rpx solid #69B96B;
  border-radius: 50%;
}
.eye:after {
  content: "";
  position: absolute;
  left: 12rpx;
  top: 12rpx;
  width: 10rpx;
  height: 10rpx;
  background: #23352A;
  border-radius: 50%;
}
.eye.left { left: 18rpx; }
.eye.right { right: 18rpx; }
.dot {
  position: absolute;
  top: 48rpx;
  width: 10rpx;
  height: 10rpx;
  background: #357A4A;
  border-radius: 50%;
}
.dot.left { left: 42rpx; }
.dot.right { right: 42rpx; }
.mouth {
  position: absolute;
  left: 48rpx;
  top: 56rpx;
  width: 32rpx;
  height: 16rpx;
  border-bottom: 4rpx solid #357A4A;
  border-radius: 0 0 32rpx 32rpx;
}
