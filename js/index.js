/**
 *
 *  @auth xlx_good@qq.com
 *  @date 18/5/22.
 *
 */

var map,vm,_dataSet,gpsData,options,layer;

/**
 * 创建地图
 * */
/*function createMap(cityName) {
    var cityCenters = {
        '重庆': {lat: 29.52,lng: 106.53},
        '成都': {lat: 30.65,lng: 104.06}
    }
    var cityCenter = cityCenters[cityName] || cityCenters['重庆'];

    /!*百度地图API功能*!/
    map = new BMap.Map("map", {
        enableMapClick: false
    });    // 创建Map实例
    map.centerAndZoom(new BMap.Point(cityCenter.lng, cityCenter.lat), 12);  // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放

    // 地图自定义样式
    map.setMapStyle({styleJson: styleJson});
    var options = {
        fillStyle: 'rgba(255, 250, 50, 0.6)',
        //shadowColor: 'rgba(255, 250, 50, 0.5)',
        //shadowBlur: 3,
        size: 4,
        draw: 'simple',
        animation: {
            type: 'time',
            stepsRange: {
                start: 0,
                end: 50
            },
            trails: 1,
            duration: 3,
        }
    };
    dataSet = new mapv.DataSet([]);

    var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);
}*/

/**
 * 绘制地图
 * @param <string> 城市Name
 * @param <array>gps 数据
 * */
/*function drawMap(data) {

    var _data = [];
    for(var i = 0; i < data.length; i++){
        var item = data[i];
        _data.push({
            geometry: {
                type: 'Point',
                coordinates: [ item.longitude, item.latitude]
            },
            time: Math.random() * 10
        });
    }
    dataSet.set(_data);
    console.log(dataSet)
}*/
function createMap(cityName) {
    var cityCenters = {
        '重庆': {lat: 29.52,lng: 106.53},
        '成都': {lat: 30.65,lng: 104.06}
    }
    var cityCenter = cityCenters[cityName] || cityCenters['重庆'];
    map = new BMap.Map("map", {
        enableMapClick: false
    });    // 创建Map实例
    map.centerAndZoom(new BMap.Point(cityCenter.lng, cityCenter.lat), 12);  // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    //鼠标拖拽监听
    map.addEventListener("dragstart", function(evt){
        drawMap2()
    });

    // 地图自定义样式
    map.setMapStyle({styleJson: styleJson});

    _dataSet = new mapv.DataSet([]);
    console.log(_dataSet);

     options = {
        fillStyle: 'rgba(255, 250, 50, 0.6)',
        //shadowColor: 'rgba(255, 250, 50, 0.5)',
        //shadowBlur: 3,
        size: 4,
        draw: 'simple',
        animation: {
            type: 'time',
            stepsRange: {
                start: 0,
                end: 50
            },
            trails: 1,
            duration: 3,
        }
    };

    new mapv.baiduMapLayer(map, _dataSet, options);
}

function drawMap() {
    var _data = [];
    for(var i = 0; i < gpsData.length; i++){
        var item = gpsData[i];
        _data.push({
            geometry: {
                type: 'Point',
                coordinates: [ item.longitude, item.latitude]
            },
            time: Math.random() * 10
        });
    }
    _dataSet.set(_data)
}
function drawMap2() {
    var _data = [];
    for(var i = 0; i < gpsData.length; i++){
        var item = gpsData[i];
        _data.push({
            geometry: {
                type: 'Point',
                coordinates: [ item.longitude, item.latitude]
            },
            time: Math.random() * 10
        });
    }
    map.clearOverlays(layer);
    layer = new mapv.baiduMapLayer(map, _dataSet, options);
}

function drawChart21(data1, data2, data3) {

    var myChart21 = echarts.init(document.getElementById('zhy-z2-cha1'));
    var option21 = {
            title:{
                text:'驾驶行为分布 近七天',
                x:'center',
                y:35,
                textStyle:{
                    fontSize:18,
                    fontWeight:500,
                    color:'#fff'
                }
            },
            legend:{
                y:63,
                data:['三急行为','疲劳驾驶','故障行驶'],
                textStyle:{
                    color:'#fff'
                }
            },
            grid:{
                x:68,
                y:90,
                x2:50,
                y2:55
            },
            color: ['#579bd3', '#bdc6d3', '#bd6c67'],
            tooltip:{
                trigger:'axis',
                borderRadius : 8,
                padding: 10   // [5, 10, 15, 20]
            },
            xAxis: {
                type: 'category',
                data: vm.myDates/*['4月10日', '4月11日', '4月12日', '4月13日', '4月14日', '4月15日', '4月16日']*/,
                axisTick:{
                    alignWithLabel:true
                },
                axisLine:{
                    lineStyle:{
                        color:'#fff',
                        width:2,
                        opacity:.3
                    }
                },
                axisLabel:{
                    interval:0,
                    textStyle:{
                        fontSize:10
                    }
                }
            },
            yAxis: {
                type: 'value',
                data: [200,400,600,800,1000],
                axisTick:{
                    show:false
                },
                boundaryGap: true,
                axisLine:{
                    lineStyle:{
                        color:'#fff',
                        width:2,
                        opacity:.3
                    }
                },
                splitLine:{
                    show:true,
                    lineStyle:{
                        color:'#2af',
                        width:1,
                        type:'solid'
                    }

                }
            },
            series: [{
                name:'三急行为',
                type: 'bar',
                data: data1,
                barGap:.2
            },{
                name:'疲劳驾驶',
                type: 'bar',
                data: data2
            },{
                name:'故障行驶',
                type: 'bar',
                data: data3
            }]
        };
    myChart21.setOption(option21)
}

function drawChart22(data1,data2) {
    var myChart22 = echarts.init( document.getElementById('zhy-z2-cha2') );
    /*var data221 = vm.towTimes,
        data222 = vm.crashTimes;*/
    /*zone2图表显示*/
   var  option22 = {
        title:{
            text:'事件警告分布 近七天',
            x:'center',
            y:35,
            textStyle:{
                fontSize:18,
                fontWeight:500,
                color:'#fff'
            }
        },
        legend:{
            y:63,
            data:['拖吊','碰撞'],
            textStyle:{
                color:'#fff'
            }
        },
        grid:{
            x:68,
            y:90,
            x2:50,
            y2:55
        },
        color: ['#a331d3', '#34b2bc'],
        tooltip:{
            trigger:'axis',
            borderRadius : 8,
            padding: 10   // [5, 10, 15, 20]
        },
        xAxis: {
            type: 'category',
            data: vm.myDates,
            axisTick:{
                alignWithLabel:true
            },
            axisLine:{
                lineStyle:{
                    color:'#fff',
                    width:2,
                    opacity:.3
                }
            },
            axisLabel:{
                interval:0,
                textStyle:{
                    fontSize:10
                }
            }
        },
        yAxis: {
            type: 'value',
            data: [200,400,600,800,1000],
            axisTick:{
                show:false
            },
            boundaryGap: true,
            axisLine:{
                lineStyle:{
                    color:'#fff',
                    width:2,
                    opacity:.3
                }
            },
            splitLine:{
                show:true,
                lineStyle:{
                    color:'#2af',
                    width:1,
                    type:'solid'
                }

            }
        },
        series: [{
            name:'拖吊',
            type: 'bar',
            data: data1,
            barGap:.2,
            barWidth:18
        },{
            name:'碰撞',
            type: 'bar',
            data: data2,
            barWidth:18
        }]
    }
    myChart22.setOption( option22 );

}

function drawChart31(data1) {
    var myChart31 = echarts.init(document.getElementById('zhy-z3-cha1'));
    /*zone2图表显示*/
    var option31= {
        title:{
            text:'车辆行驶(点火)时段分布',
            x:'center',
            y:'28',
            textStyle:{
                fontSize:18,
                fontWeight:'500',
                color:'#fff'
            }
        },
        grid:{//调整图表位置(网格)
            x:50,
            y:75,
            x2:50,
            y2:55
        },
        tooltip:{//鼠标悬浮弹框提示
            trigger:'axis',
            /*trigger:'item',*/
            show:true,
            showDelay:0,
            hideDelay:0,
            transitionDuration:0,
            /*borderColor : '#f50',*/
            borderRadius : 8,
            borderWidth: 2,
            padding: 10,    // [5, 10, 15, 20]
            formatter: function (params) {
                var relVal = params[0].name+'<br>点火:'+params[0].value;
                /*for (var i = 0, l = params.length; i < l; i++) {
                 relVal +='<br>等级: ' + params[i].value
                 }*/
                return relVal;
            }
        },
        xAxis: {
            type: 'category',
            data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00','16:00','18:00','20:00','22:00'],
            /*boundaryGap: false,//刻度前后留白*/
            axisTick:{
                alignWithLabel:true//坐标刻度对齐
            },
            axisLine:{
                lineStyle:{
                    color:'#fff',
                    width:2,
                    opacity:.3
                }
            },
            axisLabel:{
                interval:0,
                /*rotate:30,*/
                textStyle:{
                    fontSize:10
                }
            }
        },
        yAxis: {
            type: 'value',
            data: [100,200,300,400,500,600],
            axisTick:{
                show:false//刻度显示
            },
            axisLine:{
                lineStyle:{
                    color:'#fff',
                    width:2,
                    opacity:.3
                }
            },
            splitLine:{//分割线(辅助线)
                show:true,
                lineStyle:{
                    color:'#2af',
                    width:1,
                    type:'solid'
                }

            }
        },
        series: [{
            data: data1,
            type: 'line',
            color:'#fff',
            lineStyle:{//折线样式(光边)
                shadowColor:'rgba(0,0,255,1)',
                shadowBlur:'10'
            }
        }]
    };
    myChart31.setOption(option31);

}

function drawChart32(data1) {
    var myChart32 = echarts.init(document.getElementById('zhy-z3-cha2'));
    /*zone2图表显示*/
    var option32 = {
        title:{
            text:'车辆行驶 平均时速 时段分布',
            x:'center',
            y:'28',
            textStyle:{
                fontSize:18,
                fontWeight:'500',
                color:'#fff'
            }
        },
        grid:{
            x:50,
            y:75,
            x2:50,
            y2:55,
            borderWidth:1
        },
        color:'#fff',
        tooltip:{
            trigger:'axis',
            show:true,
            borderRadius: 8,
            borderWidth: 2,
            padding: 10,
            formatter:function(params){
                var relVal=params[0].name+'<br>平均时速:'+params[0].value;
                return relVal;
            }
        },
        xAxis: {
            type: 'category',
            data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00','16:00','18:00','20:00','22:00'],
            axisTick:{
                alignWithLabel:true
            },
            axisLine:{
                lineStyle:{
                    color:'#fff',
                    width:2,
                    opacity:.3
                }
            },
            axisLabel:{
                interval:0,
                /*rotate:30,*/
                textStyle:{
                    fontSize:10
                }
            }
        },
        yAxis: {
            type: 'value',
            data: [20,40,60,80,100,120],
            axisTick:{
                show:false
            },
            axisLine:{
                lineStyle:{
                    color:'#fff',
                    width:2,
                    opacity:.3
                }
            },
            splitLine:{
                show:true,
                lineStyle:{
                    color:'#2af',
                    width:1,
                    type:'solid'
                }
            }
        },
        series: [{
            data: data1,
            type: 'line',
            lineStyle:{
                shadowColor:'rgba(0,0,255,1)',
                shadowBlur:'10'
            }
        }]
    };
    myChart32.setOption(option32);

}

function drawChart33(data1) {
    var myChart33 = echarts.init(document.getElementById('zhy-z3-cha3'));
    /*zone2图表显示*/
    var option33 = {
        title:{
            text:'车辆通行里程时段分布',
            x:'center',
            y:'28',
            textStyle:{
                fontSize:18,
                fontWeight:'500',
                color:'#fff'
            }
        },
        grid:{
            x:58,
            y:75,
            x2:50,
            y2:55
        },
        color:'#fff',
        tooltip : {
            trigger: 'axis',
            show:true,
            borderRadius: 8,
            borderWidth: 2,
            padding: 10,
            formatter: function(params){
                var relVal=params[0].name+'<br>里程:'+params[0].value;
                return relVal;
            }
        },
        xAxis: {
            type: 'category',
            data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00','16:00','18:00','20:00','22:00'],
            axisTick:{
                alignWithLabel:true
            },
            axisLine:{
                lineStyle:{
                    color:'#fff',
                    width:2,
                    opacity:.3
                }
            },
            axisLabel:{
                interval:0,
                /*rotate:30,*/
                textStyle:{
                    fontSize:10
                }
            }
        },
        yAxis: {
            type: 'value',
            data: [5,10,15,20,25,30],
            axisTick:{
                show:false
            },
            axisLine:{
                lineStyle:{
                    color:'#fff',
                    width:2,
                    opacity:.3
                }
            },
            splitLine:{
                show:true,
                lineStyle:{
                    color:'#2af',
                    width:1,
                    type:'solid'
                }
            }
        },
        series: [{
            data: data1,
            type: 'line',
            lineStyle:{
                shadowColor:'rgba(0,0,255,1)',
                shadowBlur:'10'
            }
        }]
    };
    myChart33.setOption(option33);

}

function initVue() {
    vm = new Vue({
        el: '#app',
        data: {
            isZone1: true,
            isZone2: true,
            isZone3: true,
            isZone4: true,
            isZone5: true,
            isZone6: true,
            areaList: [],
            count: 30,
            curTime: (new Date),
            area:{
                id: null,
                name: '--'
            },
            mjCityId: null,
            isAreaList: false,
            fireNum: '--',
            duration: '--',
            mileage: '--',
            fuel: '--',
            weather: '--',
            date: '--',
            day: '--',
            time: '--',
            myDates: [],
            gpsData: []

        },
        methods: {
            //获取区域列表
            getAreaList: function () {
                getAreaList({}, function (resp) {
                    if(resp.code=='000000'){
                        vm.areaList = resp.data || [];
                        vm.area = resp.data[0] || {};
                        vm.mjCityId = resp.data[0].mjcityid || {};
                    }
                })
            },
            //切换区域
            checkArea: function (item) {
                this.isAreaList = false;
                this.area = item;
                this.mjCityId = item.mjcityid;
                createMap(item.name);
                this.getDriveGps();
                this.getFireNum();
                this.getTotal();
                this.getDays();
                this.getHours();
                this.getWeather();
            },
            //获取gps
            getDriveGps: function () {
                getDriveGps({areaId: this.area.id || 1}, function (resp) {
                    if(resp.code == '000000'){
                        /*drawMap(resp.data);*/
                        //todo  测试数据
                        /*resp.data= [
                            {
                                "openCarId":"0",
                                "longitude": 106.5331,
                                "latitude": 29.5222,
                                "heading": 200.6
                            },
                            {
                                "openCarId":"1",
                                "longitude": 106.5332,
                                "latitude": 29.522,
                                "heading": 200.6
                            },
                            {
                                "openCarId":"2",
                                "longitude": 106.5333,
                                "latitude": 29.5225,
                                "heading": 200.6
                            },
                            {
                                "openCarId":"3",
                                "longitude": 106.5335,
                                "latitude": 29.5228,
                                "heading": 200.6
                            },
                            {
                                "openCarId":"4",
                                "longitude": 106.5331,
                                "latitude": 29.5240,
                                "heading": 200.6
                            },
                            {
                                "openCarId":"5",
                                "longitude": 106.5341,
                                "latitude": 29.5225,
                                "heading": 200.6
                            },
                            ];*/
                        gpsData=resp.data;
                        drawMap()
                    }
                })
            },
            //倒计时
            countDown: function () {
                this.curTime = (new Date);
                if(this.count > 0){
                    this.count--;
                }else{
                    this.count = 30;
                    this.getDriveGps();
                }

            },
            //实时点火数
            getFireNum: function () {
                getFireNum({areaId: this.area.id || 1}, function (resp) {
                    if(resp.code == '000000'){
                        vm.fireNum = resp.data;
                        /*console.log(this.fireNum)*/
                    }
                })
            },
            //当天累积值
            getTotal: function () {
                getTotal({areaId: this.area.id || 1}, function (resp) {
                    if(resp.code == '000000'){
                        vm.duration=resp.data.duration;
                        vm.mileage=resp.data.mileage.toFixed(2);
                        vm.fuel=resp.data.fuel.toFixed(2);
                        /*console.log(mileage)*/
                    }
                })
            },
            //天分布(柱状图)
            getDays: function () {
                getDays({areaId: this.area.id || 1}, function (resp) {
                    if(resp.code == '000000'){
                        //@todo 测试数据
                        /*let resp={
                            "code": "000000",
                            "message": "操作成功!",
                            "data": [
                            {
                                "date": 20180501,
                                "accTimes": 100,
                                "decTimes": 100,
                                "turnTimes": 100,
                                "fatigueNum": 100,
                                "dtcNum": 100,
                                "towTimes": 100,
                                "crashTimes": 100
                            },
                            {
                                "date": 1,
                                "accTimes": 50,
                                "decTimes": 50,
                                "turnTimes": 50,
                                "fatigueNum": 50,
                                "dtcNum": 50,
                                "towTimes": 50,
                                "crashTimes": 50
                            },
                            {
                                    "date": 20180501,
                                    "accTimes": 200,
                                    "decTimes": 200,
                                    "turnTimes": 200,
                                    "fatigueNum": 200,
                                    "dtcNum": 200,
                                    "towTimes": 200,
                                    "crashTimes": 200
                                },
                            {
                                    "date": 20180501,
                                    "accTimes": 100,
                                    "decTimes": 100,
                                    "turnTimes": 100,
                                    "fatigueNum": 100,
                                    "dtcNum": 100,
                                    "towTimes": 100,
                                    "crashTimes": 100
                                },
                            {
                                    "date": 20180501,
                                    "accTimes": 300,
                                    "decTimes": 300,
                                    "turnTimes": 300,
                                    "fatigueNum": 300,
                                    "dtcNum": 300,
                                    "towTimes": 300,
                                    "crashTimes": 300
                                },
                            {
                                    "date": 20180501,
                                    "accTimes": 200,
                                    "decTimes": 200,
                                    "turnTimes": 200,
                                    "fatigueNum": 700,
                                    "dtcNum": 700,
                                    "towTimes": 700,
                                    "crashTimes": 700
                                },
                            {
                                    "date": 20180501,
                                    "accTimes": 100,
                                    "decTimes": 100,
                                    "turnTimes": 100,
                                    "fatigueNum": 300,
                                    "dtcNum": 300,
                                    "towTimes": 300,
                                    "crashTimes": 300
                                }
                        ]
                        };*/

                        var treTimes = [],
                            fatigueNum = [],
                            dtcNum = [],
                            towTimes = [],
                            crashTimes = [];

                        for (var i=0;i<resp.data.length;i++){
                            treTimes.push(resp.data[i].accTimes + resp.data[i].decTimes + resp.data[i].turnTimes);
                            fatigueNum.push(resp.data[i].fatigueNum);
                            dtcNum.push(resp.data[i].dtcNum);
                            towTimes.push(resp.data[i].towTimes);
                            crashTimes.push(resp.data[i].crashTimes);
                        }
                        drawChart21(treTimes, fatigueNum, dtcNum);
                        drawChart22(towTimes,crashTimes);
                    }
                })
            },
            //小时时段分布(折线图)
            getHours: function () {
                getHours({areaId: this.area.id || 1}, function (resp) {
                    if(resp.code == '000000'){
                        //@todo 测试数据
                        /*let resp={
                            "code": "000000",
                            "message": "操作成功!",
                            "data": [
                                {
                                    "date": 2018050101,
                                    "driveNum": 100,
                                    "avgSpeed": 100,
                                    "mileage": 100
                                },
                                {
                                    "date": 2018050101,
                                    "driveNum": 200,
                                    "avgSpeed": 200,
                                    "mileage": 200
                                },
                                {
                                    "date": 2018050101,
                                    "driveNum": 100,
                                    "avgSpeed": 100,
                                    "mileage": 100
                                },
                                {
                                    "date": 2018050101,
                                    "driveNum": 300,
                                    "avgSpeed": 300,
                                    "mileage": 300
                                },
                                {
                                    "date": 2018050101,
                                    "driveNum": 100,
                                    "avgSpeed": 100,
                                    "mileage": 100
                                },
                                {
                                    "date": 2018050101,
                                    "driveNum": 100,
                                    "avgSpeed": 100,
                                    "mileage": 100
                                },
                                {
                                    "date": 2018050101,
                                    "driveNum": 100,
                                    "avgSpeed": 100,
                                    "mileage": 100
                                },
                                {
                                    "date": 2018050101,
                                    "driveNum": 100,
                                    "avgSpeed": 100,
                                    "mileage": 100
                                },
                                {
                                    "date": 2018050101,
                                    "driveNum": 100,
                                    "avgSpeed": 100,
                                    "mileage": 100
                                },
                                {
                                    "date": 2018050101,
                                    "driveNum": 100,
                                    "avgSpeed": 100,
                                    "mileage": 100
                                },
                                {
                                    "date": 2018050101,
                                    "driveNum": 100,
                                    "avgSpeed": 100,
                                    "mileage": 100
                                },
                                {
                                    "date": 2018050101,
                                    "driveNum": 100,
                                    "avgSpeed": 100,
                                    "mileage": 100
                                }
                        ]
                        };*/

                        var driveNum = [],
                            avgSpeed = [],
                            mileages = [];
                        for (var i=0;i<resp.data.length;i++){
                            driveNum.push(resp.data[i].driveNum);
                            avgSpeed.push(resp.data[i].avgSpeed.toFixed(2));
                            mileages.push(resp.data[i].mileage.toFixed(2));
                        }

                        drawChart31(driveNum);
                        drawChart32(avgSpeed);
                        drawChart33(mileages)
                    }
                })
            },
            //天气查询
            getWeather: function () {
                getWeather({mjcityid: this.mjCityId || 52},function (resp) {
                    vm.weather = resp.data.conditionDay;
                })
            },

            //刷新
            refresh: function () {
                this.isZone1=true;
                this.isZone2=true;
                this.isZone3=true;
                this.isZone4=true;
                this.isZone5=true;
                this.isZone6=true;
                this.isZone7=true;
                this.getDriveGps();
                this.getFireNum();
                this.getTotal();
                this.getDays();
                this.getHours();
                this.countDown();
            },



            //时间日期
            //补0显示
            zeroPadding: function (num, digit) {
                var zero = '';
                for(var i = 0; i < digit; i++) {
                    zero += '0';
                }
                return (zero + num).slice(-digit);
            },
            //获取当前日期后N天的方法
            getDateN: function (d,weekDay) {
                var dd = new Date(),
                    myDate;
                dd.setDate(dd.getDate()+d);
                myDate =this.zeroPadding( parseInt(dd.getMonth()+1) ,2)+ '-'  + this.zeroPadding(dd.getDate(),2) + '(' + weekDay[dd.getDay()] + ')';
                return myDate;
            },
            //时分更新
            updateTime: function () {
                var cd = new Date();
                this.time = this.zeroPadding(cd.getHours(), 2) + '时' + this.zeroPadding(cd.getMinutes(), 2) + '分';
                },
            //天更新
            updateDay: function () {
                var cd = new Date(),
                    weekDay = ['日','一','二','三','四','五','六'],
                    myDate;
                this.time = this.zeroPadding(cd.getHours(), 2) + '时' + this.zeroPadding(cd.getMinutes(), 2) + '分';
                this.day = '周'+weekDay[cd.getDay()];
                this.date = cd.getFullYear() + '年' + parseInt(cd.getMonth()+1) + '月' + cd.getDate() + '日';


                //近7天横轴日期
                this.myDates=[];
                for(var i=0;i<7;i++){
                    myDate= this.getDateN(i,weekDay);
                    this.myDates.push(myDate);
                }
            }

        },
        computed: {
            countStr: function () {

            },
        },
        filters: {
            formatDate: function (time) {
                return format(time, 'yyyy年mm月dd日 hh时ii分')
            },
            filterCount: function (count) {
                if(count<10){
                    return '0' + count
                }
                return count
            }
        },
        created: function () {
            setInterval(function () {
                vm.countDown();
            },1000);
            this.getAreaList();
            this.getDriveGps();
            this.getFireNum();
            this.getTotal();
            this.getDays();
            this.getHours();
            this.getWeather();
            this.updateDay();
            setInterval(this.updateTime,1000);


        },
        mounted: function(){

        },
        updated: function(){

        }
    })
}

function init() {
    initVue();
    createMap();
}




!(function (document) {
    document.addEventListener('DOMContentLoaded',init, false);
})(document);