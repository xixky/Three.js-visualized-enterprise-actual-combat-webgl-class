<template>
  <div id="cesiumContainer" ref="cesiumContainer"></div>
</template>

<script setup>
// yarn add cesium
// 将cesium目录下的Build/Cesium4个目录拷贝到public，然后将widgets目录拷贝一份到src下
import * as Cesium from "cesium";
import "./Widgets/widgets.css";
import { onMounted } from "vue";
import gsap from "gsap";
import planeData from "@/assets/json/plane.json";

// 设置cesium token
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhMzNkNTE5Zi1mMjY4LTRiN2QtOTRlZC1lOTUyM2NhNDYzNWYiLCJpZCI6NTU0OTYsImlhdCI6MTYyNTAyNjMyOX0.a2PEM4hQGpeuMfeB9-rPp6_Gkm6O-02Dm4apNbv_Dlk";

// 设置cesium静态资源路径
window.CESIUM_BASE_URL = "/";

// 设置cesium默认视角
// Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
//   // 西边的经度
//   89.5,
//   // 南边维度
//   20.4,
//   // 东边经度
//   110.4,
//   // 北边维度
//   61.2
// );

onMounted(() => {
  var viewer = new Cesium.Viewer("cesiumContainer", {
    // 是否显示信息窗口
    // infoBox: false,

    shouldAnimate: true,
  });

  // 设置沙箱允许使用js
  var iframe = document.getElementsByClassName("cesium-infoBox-iframe")[0];
  iframe.setAttribute(
    "sandbox",
    "allow-same-origin allow-scripts allow-popups allow-forms"
  );
  iframe.setAttribute("src", "");

  // 隐藏logo
  viewer.cesiumWidget.creditContainer.style.display = "none";
  // 添加3D建筑
  let tiles3d = new Cesium.createOsmBuildings();
  const osmBuildings = viewer.scene.primitives.add(tiles3d);
  // 广州塔
  var postion = Cesium.Cartesian3.fromDegrees(
    // 经度
    113.3191,
    // 纬度
    23.109,
    // 高度
    1000
  );
  viewer.camera.flyTo({
    destination: postion,
    duration: 2,
  });

  // console.log(tiles3d);
  // tiles3d.style = new Cesium.Cesium3DTileStyle({
  //   // 颜色设置，颜色名称/16进制颜色值/rgba颜色值
  //   // color: "color('yellow')",
  //   // color: "rgba(255, 255, 0, 0.5)",
  //   color: "color('#f00')",
  //   show: true,
  // });

  tiles3d.style = new Cesium.Cesium3DTileStyle({
    defines: {
      distance:
        "distance(vec2(${feature['cesium#longitude']},${feature['cesium#latitude']}),vec2(113.3191,23.109))",
    },
    color: {
      conditions: [
        ["${distance} < 0.01", "color('rgba(0,0,50, 0.7)')"],
        ["${distance} < 0.02", "color('rgba(0,0,50, 0.5)')"],
        ["${distance} < 0.04", "color('rgba(0,0,50, 0.2)')"],
        ["true", "color('white')"],
      ],
    },
    show: "${distance} < 0.04 && ${feature['building']} === 'apartments'",
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
