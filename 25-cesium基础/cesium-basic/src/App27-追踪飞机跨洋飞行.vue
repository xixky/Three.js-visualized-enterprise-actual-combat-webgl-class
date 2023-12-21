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
    infoBox: false,
    terrainProvider: Cesium.createWorldTerrain({
      requestWaterMask: true,
      requestVertexNormals: true,
    }),
    shouldAnimate: true,
  });

  // 隐藏logo
  viewer.cesiumWidget.creditContainer.style.display = "none";
  // 添加3D建筑
  let tiles3d = new Cesium.createOsmBuildings();
  const osmBuildings = viewer.scene.primitives.add(tiles3d);

  const positionProperty = new Cesium.SampledPositionProperty();

  // 时间间隔 30秒
  const timeStepInSeconds = 30;
  // 整个飞行花费的时间
  const totalSeconds = (planeData.length - 1) * timeStepInSeconds;

  // 设置起点时间
  const time = new Date("2022-03-09T23:10:00Z");

  // cesium，默认使用的是儒略日的时间
  // 所以需要起点时间转换成儒略日的时间
  const startJulianDate = Cesium.JulianDate.fromDate(time);
  // 设置终点时间
  const stopJulianDate = Cesium.JulianDate.addSeconds(
    startJulianDate,
    totalSeconds,
    new Cesium.JulianDate()
  );

  // 将查看器的时间调整到起点和结束点的范围
  viewer.clock.startTime = startJulianDate.clone();
  viewer.clock.stopTime = stopJulianDate.clone();
  viewer.clock.currentTime = startJulianDate.clone();
  // console.log(planeData);
  viewer.timeline.zoomTo(startJulianDate, stopJulianDate);

  planeData.forEach((dataPoint, i) => {
    // 当前点的时间
    const time = Cesium.JulianDate.addSeconds(
      startJulianDate,
      i * timeStepInSeconds,
      new Cesium.JulianDate()
    );
    // 设置当前点的位置
    const position = Cesium.Cartesian3.fromDegrees(
      dataPoint.longitude,
      dataPoint.latitude,
      dataPoint.height
    );
    // 添加轨迹采样点
    positionProperty.addSample(time, position);

    // 添加点
    viewer.entities.add({
      position: position,
      point: {
        pixelSize: 10,
        color: Cesium.Color.RED,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
      },
    });
  });
  console.log(positionProperty);

  // 创建飞机
  const planeEntity = viewer.entities.add({
    availability: new Cesium.TimeIntervalCollection([
      new Cesium.TimeInterval({
        start: startJulianDate,
        stop: stopJulianDate,
      }),
    ]),
    name: "飞机",
    // 设置飞机的可用
    position: positionProperty,
    // VelocityOrientationProperty会自动根据采样点，计算出飞机的速度和方向
    orientation: new Cesium.VelocityOrientationProperty(positionProperty),
    model: {
      uri: "./model/Air.glb",
      // minimumPixelSize: 128,
      // maximumScale: 20000,
    },
    // 绘制轨迹线
    path: new Cesium.PathGraphics({
      width: 5,
    }),
  });

  // 相机追踪运动的问题
  viewer.trackedEntity = planeEntity;

  // 设置时间速率
  viewer.clock.multiplier = 60;
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
