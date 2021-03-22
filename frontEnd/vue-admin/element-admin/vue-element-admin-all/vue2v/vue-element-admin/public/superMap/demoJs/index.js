/*
 * @Author: your name
 * @Date: 2020-11-18 11:38:05
 * @LastEditTime: 2020-11-19 21:06:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\demoJs\index.js
 */

// 所有按钮都状态 name  对应图层名字
var statusData = {
	btn: [
		{
			name: 'qiujiMarker',
			status: true,
		},
		{
			name: 'qiangMarker',
			status: true,
		},
		{
			name: 'zhenCeMarker',
			status: true,
		},
		{
			name: 'zhence',
			status: true,
		},
		{
			name: 'weizhen',
			status: true,
		},
		{
			name: 'naijie',
			status: true,
		},
	],
}
var map
var layer,
	vectors,
	zhenCevectors,
	markers,
	imgMarker,
	qiujiMarker,
	qiangMarker,
	zhenCeMarker
var vectorInfoWin,
	markerInfoWin,qiujiInfoWin,qiangInfoWin,zhenCeInfoWin,qiujiMarker1
	url =
		'http://localhost:8090/iserver/services/map-chongli/rest/maps/L01_prj_1@chongli'
 
        // loadingMsgs('正在查询，请稍后...',0,0)
function init() {
    console.log('ssssss')
	//1.在指定DOM元素上初始化地图对象。
	map = new SuperMap.Map('map')
	//2.添加控件。
	map.addControl(new SuperMap.Control.ScaleLine())
	map.addControl(new SuperMap.Control.LayerSwitcher())
	map.addControl(new SuperMap.Control.MousePosition())
	//2.初始化图层。
	//创建分块动态REST图层，该图层显示iserver 8C 服务发布的地图,
	//其中"想要"为图层名称，url图层的服务地址，{transparent: true}设置到url的可选参数
	layer = new SuperMap.Layer.TiledDynamicRESTLayer('zibo', url, null, {
		maxResolution: 'auto',
	})
	//监听图层信息加载完成事件，异步加载图层。
	layer.events.on({ layerInitialized: addLayer })
	//构建 标记类覆盖物 图层。
	markers = new SuperMap.Layer.Markers('Markers')
	// //构建 矢量类覆盖物 图层。
	vectors = new SuperMap.Layer.Vector('Vectors')
}
function addLayer() {
	//将Layer图层加载到Map对象上。
	map.addLayers([layer, markers, vectors])
	//出图，设置中心点，指定放缩级别。
	map.setCenter(new SuperMap.LonLat(115.4367, 40.94572), 9)
}
// 添加图层--------------------------------------------------------------------------------------------------
// 添加图层事件 获取数据后调用一次 渲染数据, 然后点击浮游按钮 传值控制
function addVector(data) {

   
	// markers.removeMarker(imgMarker);
	// 判断大数组是否数据 是否有传值  。有传值是Btn按钮调用
	
	if (facilityData && facilityData.length && !data) {
		dataSet(facilityData)
	}
	// vectors.destroy()
}
// 添加图层事件  便利数据  每一个类都设备模块分割 
function dataSet(data) {
	// 侦测添加
	zhenCeAdd(data)
	// 枪机添加
	qiangAdd(data)
	// 球机添加
	qiujiAdd(data)
	// var origion
	// var sides = 30
	// var cuvr = null
	// var cuvreVector = new SuperMap.Feature.Vector()
	// var size = new SuperMap.Size(44, 33)
	// var offset = new SuperMap.Pixel(-(size.w / 2), -size.h)
	// var icon = new SuperMap.Icon('./img/fanwu.png', size, offset)
	// for (var i = 0; i < data.length; i++) {
	// 	// console.log(data,'sss')
	// 	origion = new SuperMap.Geometry.Point(data[i].lng, data[i].lat)
	// 	cuvre = SuperMap.Geometry.Polygon.createRegularPolygonCurve(
	// 		origion,
	// 		0.01,
	// 		sides,
	// 		80,
	// 		220
	// 	)
	// 	cuvreVector = new SuperMap.Feature.Vector(cuvre)
	// 	cuvreVector.style = {
	// 		strokeColor: '#1E90FF',
	// 		fillColor: '#C6E2FF',
	// 		strokeWidth: 2,
	// 		fillOpacity: 0.5,
	// 	}

	// 	vectors.addFeatures(cuvreVector)
	// 	imgMarker = new SuperMap.Marker(
	// 		new SuperMap.LonLat(data[i].lon, data[i].lat),
	// 		icon
	// 	)
	// 	markers.addMarker(imgMarker)
	// }
	// vectors.addFeatures(cuvreVector);
	// vectors.addFeatures(cuvreVector);
}
// 添加图层结束--------------------------------------------------------------------------------------------------
// 浮游按钮 显示隐藏设备--------------------------------------------------------------------------------------------------------------
// 所有按钮点击事件 显示隐藏某类设备 传值
function seBtn(data) {
    console.log(data,'sssssssssss')
	// 获取所有按钮都状态
	var btnStatus = statusData.btn
	// 循环判断
	for (var i = 0; i < btnStatus.length; i++) {
		// 找出传值匹配对应的状态 name对应btn按钮
		if (btnStatus[i].name === data) {
			// 如果是显示 则删除此图层 , 不显示都话，添加此图层
			if (btnStatus[i].status) {
                console.log(btnStatus[i],'sssssssssss')
				// 调用方法  如果是成功后对应把状态修改
				removeVector(data)
			} else {
				// 调用方法  如果是成功后对应把状态修改
				addVector(data)
			}

		}
	}

	// console.log(data, 'ssssss')
}

// 删除设备  传值是图层名字 删除
function removeVector(data) {
   console.log(data,'datadatadata')

//  markers.markers.map(item=>{
      
//     if (item.type == data) {
//         markers.removeMarker(item)
//         // return item
//     }
// })
for (var i = 0; i < markers.markers.length; i++) {
    if (markers.markers[i].type == data) {
        markers.removeMarker(markers.markers[i])
        // return item
    }
}
if (data =='zhenCeMarker') {
    vectors.removeAllFeatures()
}
// 清空图层上所有的markers。
// markers.clearMarkers(qiujiMarker1);

      console.log(markers,'markers')
    // console.log(dataSet,'11111111111111111111')

// removeData.clearMarkers()
	// markers.removeMarker(removeData)
    // markers.destroy()
    // markers.addMarker(marker);
    // markers.destroy()
	// vectors.removeAllFeatures()
}
// 浮游按钮 结束-------------------------------------------------------------------------------------------------------------

// 球机区域---------------------------------------------------------------------------------------------------------------
// 球机添加事件
function qiujiAdd(data) {
	if (mapData.qiuji && mapData.qiuji.length) {
		// console.log('000000000000')
		var origion
		var sides = 30
		var cuvr = null
		var cuvreVector = new SuperMap.Feature.Vector()
		var size = new SuperMap.Size(40, 40)
		var control = new SuperMap.Control()
		var offset = new SuperMap.Pixel(-(size.w / 2), -size.h)
		var icon = new SuperMap.Icon(
			'./img/zhoujie_qiuji_btn.png',
			size,
			offset
		)
		
		for (var i = 0; i < mapData.qiuji.length; i++) {
			qiujiMarker = new SuperMap.Marker(new SuperMap.LonLat(mapData.qiuji[i].lng, mapData.qiuji[i].lat),icon)
            // 每个图层添加类别  删除用
            qiujiMarker.type = 'qiujiMarker'
            // 每个图层添加数据
			qiujiMarker.data = mapData.qiuji[i]
			// map.addControl(control);
            markers.addMarker(qiujiMarker)
         
			qiujiMarker.events.on({
				click: qiujiMarkerOn,
			})
		}
	}
}
// 点击地图标记都时候 按钮传参
var sendDataQiuji={}
function qiujiMarkerOn(event) {
	// console.log(event,'eventeventevent')
    qiujiMarkerClose()
	var marker = this
	var lonlat = marker.getLonLat()

    // 变量 点击预览得时候传参
    sendDataQiuji={}
    sendDataQiuji=marker.data
    
    // sendData.push(marker.data)
    // console.log( sendData,'sendData')
    var contentHTML =
    '<div class="qiuModal"><div class="qiuModalTtle">球机摄像头 <button type="button" class="layui-btn" onclick="ModaBtn()" id="ModaBtn">预览</button></div><div class="layui-row"><p class="layui-col-xs5 qiuModalleft">摄像头编号</p><p class="layui-col-xs6 qiuModalRight">' +
    marker.data.code +
    '</p></div><div class="layui-row"><p class="layui-col-xs5 qiuModalleft">摄像头名称</p><p class="layui-col-xs6 qiuModalRight">' +
    marker.data.name +
    '</p></div><div class="layui-row"><p class="layui-col-xs5 qiuModalleft">经度</p><p class="layui-col-xs6 qiuModalRight">' +
    marker.data.lat +
    '</p></div><div class="layui-row"><p class="layui-col-xs5 qiuModalleft">纬度</p><p class="layui-col-xs6 qiuModalRight">' +
    marker.data.lng +
    '</p></div><div class="layui-row"><p class="layui-col-xs5 qiuModalleft">IP</p><p class="layui-col-xs6 qiuModalRight">' +
    marker.data.ip +
    '</p></div><div class="layui-row"><p class="layui-col-xs5 qiuModalleft">距起点(米)</p><p class="layui-col-xs6 qiuModalRight">' +
    marker.data.code +
    '</p></div><div class="layui-row"><p class="layui-col-xs5 qiuModalleft">摄像头类型</p><p class="layui-col-xs6 qiuModalRight">' +
    marker.data.code +
    '</p></div><div class="layui-row"><p class="layui-col-xs5 qiuModalleft">摄像头ID</p><p class="layui-col-xs6 qiuModalRight">' +
    marker.data.code +
    '</p></div><div class="layui-row"><p class="layui-col-xs5 qiuModalleft">摄像头Type</p><p class="layui-col-xs6 qiuModalRight">' +
    marker.data.code +
    '</span></div class="layui-row"></div>';



	var popup = new SuperMap.Popup.FramedCloud(
		'chicken',
		new SuperMap.LonLat(lonlat.lon, lonlat.lat),
		new SuperMap.Size(100,20),
		contentHTML,
		null,
		true
    )
    
    qiujiInfoWin = popup;
    //在地图中添加弹出窗口
    map.addPopup(popup); 
    
    // $('#ModaBtn')
    
	// layui.use('layer', function () {
	// 	var $ = layui.jquery,
	// 		layer = layui.layer //独立版的layer无需执行这一句
	// 	layer.open({
	// 		title: '摄像头信息',
	// 		type: 1,
	// 		area: '488px',
	// 		offset: '摄像头信息', //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
	// 		id: 'layerDemo' + marker.data.id, //防止重复弹出
	// 		content:
	// 			'<div class="qiuModal"><div class="layui-row"><p class="layui-col-xs4">摄像头编号</p><p class="layui-col-xs6">' +
	// 			marker.data.code +
	// 			'</p></div><div class="layui-row"><p class="layui-col-xs4">摄像头名称</p><p class="layui-col-xs6">' +
	// 			marker.data.name +
	// 			'</p></div><div class="layui-row"><p class="layui-col-xs4">经度</p><p class="layui-col-xs6">' +
	// 			marker.data.lat +
	// 			'</p></div><div class="layui-row"><p class="layui-col-xs4">纬度</p><p class="layui-col-xs6">' +
	// 			marker.data.lng +
	// 			'</p></div><div class="layui-row"><p class="layui-col-xs4">IP</p><p class="layui-col-xs6">' +
	// 			marker.data.ip +
	// 			'</p></div><div class="layui-row"><p class="layui-col-xs4">距起点(米)</p><p class="layui-col-xs6">' +
	// 			marker.data.code +
	// 			'</p></div><div class="layui-row"><p class="layui-col-xs4">摄像头类型</p><p class="layui-col-xs6">' +
	// 			marker.data.code +
	// 			'</p></div><div class="layui-row"><p class="layui-col-xs4">摄像头ID</p><p class="layui-col-xs6">' +
	// 			marker.data.code +
	// 			'</p></div><div class="layui-row"><p class="layui-col-xs4">摄像头Type</p><p class="layui-col-xs6">' +
	// 			marker.data.code +
	// 			'</span></div class="layui-row"></div>',
	// 		btn: '关闭',
	// 		btnAlign: 'c', //按钮居中
	// 		shade: 0, //不显示遮罩
	// 		yes: function () {
	// 			layer.closeAll()
	// 		},
	// 	})
	// })
	
}
// 球机点击 预览事件
function ModaBtn() {
    layui.use('layer', function () {
		var $ = layui.jquery,
			layer = layui.layer //独立版的layer无需执行这一句
    layer.open({
        type: 2 //此处以iframe举例
        ,title: '<span>视频展示</span> <span>设备编号</span></span>'
        ,area: ['488px', '260px']
        ,shade: 0
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
        //   Math.random()*($(window).height()-300)
        //   ,Math.random()*($(window).width()-390)
        ] 
        ,content: './../Modal/qiuModal.html'
        ,btn: ['关闭'] //只是为了演示
        ,btnAlign: 'c' //按钮居中
        ,yes: function(){
            layer.closeAll();
        }
        
      });
    });
    console.log(sendDataQiuji,'paramsparams')
}
//b.3. 销毁 Popup.Anchored 弹窗。
function qiujiMarkerClose() {
   
	if (qiujiInfoWin) {
		qiujiInfoWin.hide()
		qiujiInfoWin.destroy()
	}
}
// 球机区域结束--------------------------------------------------------------------------------------------------------------------


// 枪机区域--------------------------------------------------------------------------------------------------------------------

// 枪机添加事件
function qiangAdd(data) {
	if (mapData.qiang && mapData.qiang.length) {
		var origion
		var sides = 30
		var cuvr = null
		var cuvreVector = new SuperMap.Feature.Vector()
		var size = new SuperMap.Size(50, 50)
		var offset = new SuperMap.Pixel(-(size.w / 2), -size.h)
		var icon = new SuperMap.Icon(
			'./img/zhoujie_qiangji_btn.png',
			size,
			offset
		)
		for (var i = 0; i < mapData.qiang.length; i++) {
			qiangMarker = new SuperMap.Marker(
				new SuperMap.LonLat(mapData.qiang[i].lng, mapData.qiang[i].lat),
				icon
            )
             // 每个图层添加类别  删除用
             qiangMarker.type = 'qiangMarker'
             // 每个图层添加数据
             qiangMarker.data = mapData.qiang[i]   
            markers.addMarker(qiangMarker)
            qiangMarker.events.on({
				click: qiangMarkerOn,
			})
		}
	}
}
// 发送数据
var sendDataQiang={}
function qiangMarkerOn(data) {
    qiangMarkerClose()
	var marker = this
	var lonlat = marker.getLonLat()

    // 变量 点击预览得时候传参
    sendDataQiang={}
    sendDataQiang=marker.data
    console.log(marker,'marker')
    // sendData.push(marker.data)
    // console.log( sendData,'sendData')
    var contentHTML =
    '<div class="qiuModal"><div class="qiuModalTtle">枪机摄像头 <button type="button" class="layui-btn" onclick="qiangModaBtn()" id="ModaBtn">预览</button></div><div class="layui-row"><p class="layui-col-xs5 qiuModalleft">摄像头编号</p><p class="layui-col-xs6 qiuModalRight">' +
    marker.data.code +
    '</p></div><div class="layui-row"><p class="layui-col-xs5 qiuModalleft">摄像头名称</p><p class="layui-col-xs6 qiuModalRight">' +
    marker.data.name +
    '</p></div><div class="layui-row"><p class="layui-col-xs5 qiuModalleft">经度</p><p class="layui-col-xs6 qiuModalRight">' +
    marker.data.lat +
    '</p></div><div class="layui-row"><p class="layui-col-xs5 qiuModalleft">纬度</p><p class="layui-col-xs6 qiuModalRight">' +
    marker.data.lng +
    '</p></div><div class="layui-row"><p class="layui-col-xs5 qiuModalleft">IP</p><p class="layui-col-xs6 qiuModalRight">' +
    marker.data.ip +
    '</p></div><div class="layui-row"><p class="layui-col-xs5 qiuModalleft">距起点(米)</p><p class="layui-col-xs6 qiuModalRight">' +
    marker.data.code +
    '</p></div><div class="layui-row"><p class="layui-col-xs5 qiuModalleft">摄像头类型</p><p class="layui-col-xs6 qiuModalRight">' +
    marker.data.code +
    '</p></div><div class="layui-row"><p class="layui-col-xs5 qiuModalleft">摄像头ID</p><p class="layui-col-xs6 qiuModalRight">' +
    marker.data.code +
    '</p></div><div class="layui-row"><p class="layui-col-xs5 qiuModalleft">摄像头Type</p><p class="layui-col-xs6 qiuModalRight">' +
    marker.data.code +
    '</span></div class="layui-row"></div>';
	var popup = new SuperMap.Popup.FramedCloud(
		'chicken',
		new SuperMap.LonLat(lonlat.lon, lonlat.lat),
		new SuperMap.Size(100,20),
		contentHTML,
		null,
		true
    )
    
    qiangInfoWin = popup;
    //在地图中添加弹出窗口
    map.addPopup(popup); 
}
// 枪机点击 预览事件
function qiangModaBtn() {
    console.log(sendDataQiang,'paramsparams')
    layui.use('layer', function () {
		var $ = layui.jquery,
			layer = layui.layer //独立版的layer无需执行这一句
    layer.open({
        type: 2 //此处以iframe举例
        ,title: '<span>视频展示</span> <span>设备编号</span></span>'
        ,area: ['488px', '260px']
        ,shade: 0
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
        //   Math.random()*($(window).height()-300)
        //   ,Math.random()*($(window).width()-390)
        ] 
        ,content: './../Modal/qiuModal.html'
        ,btn: ['关闭'] //只是为了演示
        ,btnAlign: 'c' //按钮居中
        ,yes: function(){
            layer.closeAll();
        }
        
      });
    });
}
// 关闭事件
function qiangMarkerClose(params) {
    if (qiangInfoWin) {
		qiangInfoWin.hide()
		qiangInfoWin.destroy()
	}
}
// 枪机区域结束----------------------------------------------------------------------------------------------------------------

// 侦测雷达区域----------------------------------------------------------------------------------------------------------------------------
// 侦测添加事件
function zhenCeAdd(data) {
	if (mapData.zhenCe && mapData.zhenCe.length) {
		var origion
		var sides = 30
		var cuvr = null
		var cuvreVector = new SuperMap.Feature.Vector()
		var size = new SuperMap.Size(50, 50)
		var offset = new SuperMap.Pixel(-(size.w / 2), -size.h)
		var icon = new SuperMap.Icon(
			'./img/zhenceguanzhi_btn.png',
			size,
			offset
		)
		// zhenCevectors, markers, imgMarker, qiujiMarker, qiangMarker,zhenCeMarker
		for (var i = 0; i < mapData.zhenCe.length; i++) {
			origion = new SuperMap.Geometry.Point(
				mapData.zhenCe[i].lng + 0.1,
				mapData.zhenCe[i].lat + 0.1
			)
			cuvre = SuperMap.Geometry.Polygon.createRegularPolygonCurve(
				origion,
				0.05,
				sides,
				80,
				220
			)
			cuvreVector = new SuperMap.Feature.Vector(cuvre)
			cuvreVector.style = {
				strokeColor: '#1E90FF',
				fillColor: '#C6E2FF',
				strokeWidth: 2,
				fillOpacity: 0.5,
			}

			vectors.addFeatures(cuvreVector)
			zhenCeMarker = new SuperMap.Marker(
				new SuperMap.LonLat(
					mapData.zhenCe[i].lng + 0.1,
					mapData.zhenCe[i].lat + 0.1
				),
				icon
            )
            // 每个图层添加类别  删除用
            zhenCeMarker.type = 'zhenCeMarker'
            // 每个图层添加数据
			zhenCeMarker.data = mapData.zhenCe[i]
          
			
            markers.addMarker(zhenCeMarker)
            // qiujiInfoWin,qiangInfoWin,zhenCeInfoWin
            zhenCeMarker.events.on({
				click: zhenCeMarkerOn,
			})
		}
	}
}
// 点击地图标记都时候 按钮传参
var sendDatazhenCe={}
function zhenCeMarkerOn(event) {
    zhenCeMarkerClose()
	var marker = this
	var lonlat = marker.getLonLat()
    // 变量 点击预览得时候传参
    sendDatazhenCe={}
    sendDatazhenCe=marker.data
    var contentHTMLA =
    '<div class="zhenCeIDv">'+
    '<div class="layui-row zhenCeModal">'+
        '<div class="zhenCeModalTtle">侦测管制</div>'+
        '<div class="layui-col-xs6">'+
            '<div class="grid-demo">'+
                '<div class="zhenCeBT">'+
                '<h4 class="zhenCeModalTtleR">基础信息</h4>'+
                '<div class="layui-row" style=" text-align: center;">'+
                        '暂无报警'+
                '</div>'+
                '<div class="layui-row" style=" text-align: center;">'+
                    '<button type="button" class="zhenCeModalbtn layui-btn layui-btn-normal">驱离</button>'+
                    '<button type="button" class="zhenCeModalbtn layui-btn layui-btn-normal">迫降</button>'+
                    '<button type="button" class="zhenCeModalbtn layui-btn">关闭</button>'+
                '</div>'+
            '</div>'+
        '</div>'+
        '</div>'+
        '<div class="layui-col-xs6">'+
            '<div class="grid-demo">'+
                '<div class="zhenCeBT">'+
                    '<h4 class="zhenCeModalTtleR">基础信息</h4>'+
                    '<div class="layui-row">'+
                        '<p class="layui-col-xs5 zhenCeModalleft">设备名称</p><p class="layui-col-xs6 zhenCeModalRight">' +
                        marker.data.code +
                        '</p></div><div class="layui-row"><p class="layui-col-xs5 zhenCeModalleft">设备编码</p><p class="layui-col-xs6 zhenCeModalRight">' +
                        marker.data.name +
                        '</p></div><div class="layui-row"><p class="layui-col-xs5 zhenCeModalleft">经度</p><p class="layui-col-xs6 zhenCeModalRight">' +
                        marker.data.lat +
                        '</p></div><div class="layui-row"><p class="layui-col-xs5 zhenCeModalleft">纬度</p><p class="layui-col-xs6 zhenCeModalRight">' +
                        marker.data.lng +
                        '</p></div><div class="layui-row"><p class="layui-col-xs5 zhenCeModalleft">监测范围</p><p class="layui-col-xs6 zhenCeModalRight">' +
                        marker.data.ip +
                        '</span>'+
                    '</div class="layui-row">'+
                '</div>'
            '</div>'+
        '</div>'+
    '</div>'+
    '</div>'
    
	var popup = new SuperMap.Popup.FramedCloud(
		'chicken',
		new SuperMap.LonLat(lonlat.lon, lonlat.lat),
		new SuperMap.Size(100,20),
		contentHTMLA,
		null,
		true
    )
    
    // 显示状态
    zhenCeInfoWin = popup;
    //在地图中添加弹出窗口
    map.addPopup(popup); 
}
function zhenceboxOn(params) {
    $('#zhencebox').on('click', function(){
       console.log('ssssssssssss')
      });
}
// 侦测点击 预览事件
function zhenCeModaBtn() {
    console.log(sendDatazhenCe,'paramsparams')
    layui.use('layer', function () {
		var $ = layui.jquery,
			layer = layui.layer //独立版的layer无需执行这一句
    layer.open({
        type: 2 //此处以iframe举例
        ,title: '<span>视频展示</span> <span>设备编号</span></span>'
        ,area: ['488px', '260px']
        ,shade: 0
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
        //   Math.random()*($(window).height()-300)
        //   ,Math.random()*($(window).width()-390)
        ] 
        ,content: './../Modal/zhenCeModal.html'
        ,btn: ['关闭'] //只是为了演示
        ,btnAlign: 'c' //按钮居中
        ,yes: function(){
            layer.closeAll();
        }
        
      });
    });
}
// 侦测销毁 Popup.Anchored 弹窗。
function zhenCeMarkerClose() {
   
	if (zhenCeInfoWin) {
		zhenCeInfoWin.hide()
		zhenCeInfoWin.destroy()
	}
}
//侦测区域结束 ----------------------------------------------------------------------------------------------------------------

//    -------------------------------------------------------
//a.2. 点击矢量要素覆盖物，触发调用此函数。
function onFeatureSelected(feature) {
	closeVectorInfoWin()
	//创建一个具有指向和边框的浮动弹窗
	var popup = new SuperMap.Popup.FramedCloud(
		'popwin',
		new SuperMap.LonLat(13648644.286396, 5518190.5813769),
		null,
		'矢量要素覆盖物鼠标点击事件',
		null,
		true
	)
	vectorInfoWin = popup
	//在地图中添加弹出窗口
	map.addPopup(popup)
}
//a.3. 销毁 Popup.FramedCloud 弹窗。
function closeVectorInfoWin() {
	if (vectorInfoWin) {
		vectorInfoWin.hide()
		vectorInfoWin.destroy()
	}
}

//b.1. 按钮生成一个标记覆盖物，注册click事件，并添加到标记图层。
function addMarker() {
	//SuperMap.Size 用来描绘一对高宽值的实例
	var size = new SuperMap.Size(30, 30)
	//依据size创建屏幕坐标
	//SuperMap.Pixel 此类用x, y坐标描绘屏幕坐标
	var offset = new SuperMap.Pixel(-(size.w / 2), -size.h)
	//SuperMap.Icon 创建图标，在网页中表现为div标签中的image标签
	var icon = new SuperMap.Icon('./theme/images/marker-gold.png', size, offset)
	//依据位置和大小初始化标记覆盖物
	qiujiMarker = new SuperMap.Marker(
		new SuperMap.LonLat(10454187.286396, 4740367.5813769),
		icon
	)
	//添加 标记覆盖物 到 标记图层
	markers.addMarker(qiujiMarker)
	//注册 click 事件,触发 mouseClickHandler()方法
	qiujiMarker.events.on({
		click: mouseClickHandler,
	})
}
//b.2. 点击标记覆盖物，触发click事件会调用此函数。
function mouseClickHandler(event) {
	closeMarkerInfoWin()
	//构建固定位置浮动弹窗，自适应显示
	var popup = new SuperMap.Popup.Anchored(
		'marker', //唯一标识
		qiujiMarker.getLonLat(), //标记覆盖物的坐标
		new SuperMap.Size(220, 140),
		'标记覆盖物鼠标点击事件',
		null,
		true,
		null
	)
	popup.autoSize = true
	markerInfoWin = popup
	map.addPopup(popup)
}
//b.3. 销毁 Popup.Anchored 弹窗。
function closeMarkerInfoWin() {
	if (markerInfoWin) {
		markerInfoWin.hide()
		markerInfoWin.destroy()
	}
}

//c.1. 地图放大 ，在当前缩放级别的基础上放大一级。
function mapEnlarge() {
	map.zoomIn()
}
//c.2. 地图缩小，在当前缩放级别的基础上缩小一级。
function mapReduce() {
	map.zoomOut()
}
//c.3. 地图平移 ，根据指定的屏幕像素（-20，-8）值平移地图。
function mapPan() {
	map.pan(-20, -8)
}

//d.1. 设置图层可见性。
function layerShowOrHide() {
	var temp = document.getElementById('isShow').value
	if (temp == '隐藏') {
		layer.setVisibility(false)
		document.getElementById('isShow').value = '显示'
	} else {
		layer.setVisibility(true)
		document.getElementById('isShow').value = '隐藏'
	}
}
//d.2. 移除图层，不可恢复。
function layerRemove() {
	map.removeLayer(layer)
}
