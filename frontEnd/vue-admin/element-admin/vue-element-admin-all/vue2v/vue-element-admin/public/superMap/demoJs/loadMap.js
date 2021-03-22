/*
 * @Author: your name
 * @Date: 2020-11-16 14:34:49
 * @LastEditTime: 2020-11-16 16:27:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \viewe:\www\JAVASCRIPTceshi\demo\js\loadMap.js
 */
// axios.get('http://localhost:8090/iserver/services/map-chongli/rest/maps/L01_prj_1@chongli').then(res=>{
//     console.log(res,'resres')
// })

//声明变量map、layer、url
var baselayer;//基础图层
var drawLine, ewlsLineLayer,layer, drawPolygon, ewlsPolygonLayer,
	style = {
		strokeColor: "#304DBE",
		strokeWidth: 2,
		pointerEvents: "visiblePainted",
		fillColor: "#304DBE",
		fillOpacity: 0.8
	};
// var mapHost="http://localhost:8090/iserver/services/map-chongli/rest/maps/L17_prj@chongli";
var url=   "http://localhost:8090/iserver/services/map-chongli/rest/maps/L01_prj_1@chongli"
//创建地图控件
function init() {
    map = new SuperMap.Map ("map");
    //创建分块动态REST图层，该图层显示iserver 8C 服务发布的地图,
    //其中"world"为图层名称，url图层的服务地址，{transparent: true}设置到url的可选参数
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", url, 
    null, {maxResolution:"auto"});
    layer.events.on({"layerInitialized": addLayer});
    // 添加控件  公里数字          
    map.addControl(new SuperMap.Control.ScaleLine());
    // 修改控件显示位置
    map.addControl(new SuperMap.Control.ScaleLine(), new SuperMap.Pixel(800,400));
    //构造geometry对象
    vectorLayer = new SuperMap.Layer.Vector();
    //创建一个名为“Vector Layer”    、采用 Canvas2 渲染方式渲染的矢量图层。
    var vectorLayer = new SuperMap.Layer.Vector("Vector Layer", {renderers: ["Canvas2"]});
}             
function addLayer() {
    //将Layer图层加载到Map对象上
    map.addLayer(layer);
    //出图，map.setCenter函数显示地图
    map.setCenter(new SuperMap.LonLat(0, 0), 0);   
    addFeature();     
    var geometry = new SuperMap.Geometry.Point(-115,10);
    var style = {
        strokeColor:"#339933",
        strokeOpacity:1,
        strokeWidth:3,
        pointRadius:6
    }
    var pointFeature = new SuperMap.Feature.Vector(geometry,null,style);
    vectorLayer.addFeatures(pointFeature);
}
function addFeature(){
var point = new SuperMap.Geometry.Point(0,0);
var pointVector = new SuperMap.Feature.Vector(point);
//添加矢量图形覆盖物
vectorLayer.addFeatures(pointVector);
}