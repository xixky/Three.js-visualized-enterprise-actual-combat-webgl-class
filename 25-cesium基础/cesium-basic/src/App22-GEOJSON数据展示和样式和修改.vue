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
    // terrainProvider: Cesium.createWorldTerrain(),
  });

  // 隐藏logo
  viewer.cesiumWidget.creditContainer.style.display = "none";
  // 添加3D建筑
  // const osmBuildings = viewer.scene.primitives.add(
  //   new Cesium.createOsmBuildings()
  // );

  // https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json

  // 加载geojson数据
  let dataGeo = Cesium.GeoJsonDataSource.load(
    "https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json",
    {
      stroke: Cesium.Color.RED,
      fill: Cesium.Color.SKYBLUE.withAlpha(0.5),
      strokeWidth: 4,
    }
  );
  // console.log(dataGeo);
  // viewer.dataSources.add(dataGeo);

  dataGeo.then((dataSources) => {
    console.log(dataSources);
    viewer.dataSources.add(dataSources);
    let entities = dataSources.entities.values;
    entities.forEach((entity, i) => {
      entity.polygon.material = new Cesium.ColorMaterialProperty(
        Cesium.Color.fromRandom({
          alpha: 1,
        })
      );
      entity.polygon.outline = false;
      let randomNum = parseInt(Math.random() * 5);
      entity.polygon.extrudedHeight = 100000 * randomNum;
    });
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
