<template>
  <div id="cesiumContainer" ref="cesiumContainer"></div>
</template>

<script setup>
// yarn add cesium
// 将cesium目录下的Build/Cesium4个目录拷贝到public，然后将widgets目录拷贝一份到src下
import * as Cesium from "cesium";
import "./Widgets/widgets.css";
import { onMounted } from "vue";

// 设置cesium token
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhMzNkNTE5Zi1mMjY4LTRiN2QtOTRlZC1lOTUyM2NhNDYzNWYiLCJpZCI6NTU0OTYsImlhdCI6MTYyNTAyNjMyOX0.a2PEM4hQGpeuMfeB9-rPp6_Gkm6O-02Dm4apNbv_Dlk";

// 设置cesium静态资源路径
window.CESIUM_BASE_URL = "/";

// 设置cesium默认视角
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
  // 西边的经度
  89.5,
  // 南边维度
  20.4,
  // 东边经度
  110.4,
  // 北边维度
  61.2
);

onMounted(() => {
  var viewer = new Cesium.Viewer("cesiumContainer", {
    // 是否显示信息窗口
    infoBox: false,
  });

  // 隐藏logo
  viewer.cesiumWidget.creditContainer.style.display = "none";

  // 1/屏幕坐标系统，二维的笛卡尔坐标系，Cartesian2类型
  // 2/地理坐标系统，WGS-84坐标系，Cartographic类型,经度，纬度，高度
  // 3/笛卡尔空间直角坐标系，Cartesian3类型

  // 角度与弧度的转换
  var radians = Cesium.Math.toRadians(90);
  console.log(radians);
  // 弧度转角度
  var degrees = Cesium.Math.toDegrees(2 * Math.PI);
  console.log(degrees);

  // 将经纬度转为笛卡尔坐标
  var cartesian3 = Cesium.Cartesian3.fromDegrees(
    // 经度
    89.5,
    // 纬度
    20.4,
    // 高度
    100
  );
  console.log(cartesian3);

  // 将笛卡尔坐标转为经纬度
  var cartographic = Cesium.Cartographic.fromCartesian(cartesian3);
  console.log(cartographic);
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#cesiumContainer {
  width: 100vw;
  height: 100vh;
}
</style>
