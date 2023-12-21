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
    // terrainProvider: Cesium.createWorldTerrain(),
  });

  // 隐藏logo
  viewer.cesiumWidget.creditContainer.style.display = "none";
  // 添加3D建筑
  // const osmBuildings = viewer.scene.primitives.add(
  //   new Cesium.createOsmBuildings()
  // );
  // 使用entity创建矩形

  // let material = new Cesium.ColorMaterialProperty(
  //   new Cesium.Color(1.0, 1.0, 1.0, 1.0)
  // );
  // 棋盘纹理
  // let material = new Cesium.CheckerboardMaterialProperty({
  //   evenColor: Cesium.Color.RED,
  //   oddColor: Cesium.Color.YELLOW,
  //   repeat: new Cesium.Cartesian2(2, 2),
  // });
  // 条纹纹理
  // let material = new Cesium.StripeMaterialProperty({
  //   evenColor: Cesium.Color.WHITE,
  //   oddColor: Cesium.Color.BLACK,
  //   repeat: 8,
  // });
  // 网格纹理
  let material = new Cesium.GridMaterialProperty({
    color: Cesium.Color.YELLOW,
    cellAlpha: 0.2,
    lineCount: new Cesium.Cartesian2(4, 4),
    lineThickness: new Cesium.Cartesian2(4.0, 4.0),
  });

  console.log(material);

  var rectangle = viewer.entities.add({
    id: "entityRect",
    rectangle: {
      coordinates: Cesium.Rectangle.fromDegrees(
        // 西边的经度
        90,
        // 南边维度
        20,
        // 东边经度
        110,
        // 北边维度
        30
      ),
      // 设置entity材质，MaterialProperty
      // material: Cesium.Color.RED.withAlpha(0.5),
      material: material,
    },
  });
  console.log(rectangle);

  // primivite创建矩形
  // 01-创建几何体
  let rectGeometry = new Cesium.RectangleGeometry({
    rectangle: Cesium.Rectangle.fromDegrees(
      // 西边的经度
      115,
      // 南边维度
      20,
      // 东边经度
      135,
      // 北边维度
      30
    ),
    // 距离表面高度
    height: 0,
    vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
  });

  // 02-创建几何体实例
  let instance = new Cesium.GeometryInstance({
    id: "redRect",
    geometry: rectGeometry,
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(
        Cesium.Color.RED.withAlpha(0.5)
      ),
    },
  });

  let rectGeometry1 = new Cesium.RectangleGeometry({
    rectangle: Cesium.Rectangle.fromDegrees(
      // 西边的经度
      140,
      // 南边维度
      20,
      // 东边经度
      160,
      // 北边维度
      30
    ),
    // 距离表面高度
    height: 0,
    vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
  });

  let instance2 = new Cesium.GeometryInstance({
    id: "blueRect",
    geometry: rectGeometry1,
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(
        Cesium.Color.BLUE.withAlpha(0.5)
      ),
    },
  });

  // 03-设置外观
  let appearance = new Cesium.PerInstanceColorAppearance({
    flat: true,
  });
  // 04-图元
  let primitive = new Cesium.Primitive({
    geometryInstances: [instance, instance2],
    appearance: appearance,
  });
  // 05-添加到viewer
  viewer.scene.primitives.add(primitive);

  viewer.camera.setView(viewer.entities);
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
