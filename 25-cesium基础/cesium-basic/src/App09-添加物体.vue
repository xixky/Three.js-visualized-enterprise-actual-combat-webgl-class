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

  // setview瞬间到达指定位置，视角
  // 生成position是天安门的位置
  // var position = Cesium.Cartesian3.fromDegrees(116.393428, 39.90923, 100);
  // 生成广州塔的位置,113.3191, 23.109
  var position2 = Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 2000);

  // flyto,让相机飞往某个地方
  viewer.camera.flyTo({
    destination: position2,
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-90),
      roll: 0,
    },
  });

  // 添加3D建筑
  const osmBuildings = viewer.scene.primitives.add(
    new Cesium.createOsmBuildings()
  );

  // 创建一个点
  // var point = viewer.entities.add({
  //   // 定位点
  //   position: Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 700),
  //   // 点
  //   point: {
  //     pixelSize: 10,
  //     color: Cesium.Color.RED,
  //     outlineColor: Cesium.Color.WHITE,
  //     outlineWidth: 4,
  //   },
  // });

  // 添加文字标签和广告牌
  var label = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 750),
    label: {
      text: "广州塔",
      font: "24px sans-serif",
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 4,
      // FILL填充文字，OUTLINE勾勒标签，FILL_AND_OUTLINE填充文字和勾勒标签
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      // 设置文字的偏移量
      pixelOffset: new Cesium.Cartesian2(0, -24),
      // 设置文字的显示位置,LEFT /RIGHT /CENTER
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      // 设置文字的显示位置
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    },
    billboard: {
      image: "./texture/gzt.png",
      width: 50,
      height: 50,
      // 设置广告牌的显示位置
      verticalOrigin: Cesium.VerticalOrigin.TOP,
      // 设置广告牌的显示位置
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
    },
  });
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
