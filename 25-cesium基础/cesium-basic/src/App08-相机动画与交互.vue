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
  var position = Cesium.Cartesian3.fromDegrees(116.393428, 39.90923, 100);
  // viewer.camera.setView({
  //   // 指定相机位置
  //   destination: position,
  //   // 指定相机视角
  //   orientation: {
  //     // 指定相机的朝向,偏航角
  //     heading: Cesium.Math.toRadians(0),
  //     // 指定相机的俯仰角,0度是竖直向上,-90度是向下
  //     pitch: Cesium.Math.toRadians(-20),
  //     // 指定相机的滚转角,翻滚角
  //     roll: 0,
  //   },
  // });

  // flyto,让相机飞往某个地方
  viewer.camera.flyTo({
    destination: position,
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-20),
      roll: 0,
    },
  });

  // 通过按键移动相机
  document.addEventListener("keydown", (e) => {
    // console.log(e);
    // 获取相机离地面的高度
    var height = viewer.camera.positionCartographic.height;
    var moveRate = height / 100;
    if (e.key == "w") {
      // 设置相机向前移动
      viewer.camera.moveForward(moveRate);
    } else if (e.key == "s") {
      // 设置相机向后移动
      viewer.camera.moveBackward(moveRate);
    } else if (e.key == "a") {
      // 设置相机向左移动
      viewer.camera.moveLeft(moveRate);
    } else if (e.key == "d") {
      // 设置相机向右移动
      viewer.camera.moveRight(moveRate);
    } else if (e.key == "q") {
      // 设置相机向左旋转相机
      viewer.camera.lookLeft(Cesium.Math.toRadians(0.1));
    } else if (e.key == "e") {
      // 设置相机向右旋转相机
      viewer.camera.lookRight(Cesium.Math.toRadians(0.1));
    } else if (e.key == "r") {
      // 设置相机向上旋转相机
      viewer.camera.lookUp(Cesium.Math.toRadians(0.1));
    } else if (e.key == "f") {
      // 设置相机向下旋转相机
      viewer.camera.lookDown(Cesium.Math.toRadians(0.1));
    } else if (e.key == "g") {
      // 向左逆时针翻滚
      viewer.camera.twistLeft(Cesium.Math.toRadians(0.1));
    } else if (e.key == "h") {
      // 向右顺时针翻滚
      viewer.camera.twistRight(Cesium.Math.toRadians(0.1));
    }
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
