var avg = 0;
var datacount = 0;
var max = 0;
var min = 0;
//var socket = io.connect();

function minSec(){
    var d = new Date();
    var min = d.getMinutes();
    min = (min < 10) ? ('0' + min) : min;

    var sec = d.getSeconds();
    sec = (sec < 10) ? ('0' + sec) : sec;

    return min+ ":" + sec;
 }

function pseudo(){
	var data =  Math.floor(Math.random()*40);
	datacount++;
	avg = avg*((datacount-1)/datacount)+data*(1/datacount);
	if(datacount == 1){
		max = data; min = data;
	}
	else{
		if(data > max) max = data;
		if(data < min) min = data;
	}

	//資執行資料設置
	$('#avg').text(avg.toPrecision(5));
	$('#max').text(max);
	$('#min').text(min);

	return data;
}


$(document).ready(function(){
	//環境設定
	//var socket = io.connect();

	var chart = c3.generate({
		padding:{ right:50 },
		size: { 
		  width:600, 
		  height:300
		},
		data: {
		  columns:[
		    ['Time',minSec()],
		    ['Temp',pseudo()]
		  ],
		  x: 'Time',
		  xFormat: '%M:%S',
		  colors:{'Temp':'#ff6600'}
		},
		axis:{
		  x:{
		    type: 'timeseries',
		    label: 'min:sec',
		    tick: {
		      rotate:30, 
		      format:'%M:%S'
		    }
		  },
		  y:{
		    label: 'Temp',
		    max: 50, 
		    min: 0
		  }
		}
	});

	var tckCount = 0;
	var totalTck = 20;
	// setInterval(function(){
	// 	//移動chart01
	// 	chart.flow({
	// 	  columns:[
	// 	    ['Time',minSec()],
	// 	    ['Temp',pseudo()]
	// 	  ],
	// 	  length: (tckCount < totalTck)? 0:1,
	// 	  duration: 300,
	// 	  done: function(){
	// 	    tckCount++;
	// 	  }
	// 	});
	// },2000);


	$('#update').on('click',function(){
		//value = pseudo();

		chart.flow({
		  columns:[
		    ['Time',minSec()],
		    ['Temp',pseudo()]
		  ],
		  length: (tckCount < totalTck)? 0:1,
		  duration: 300,
		  done: function(){
		    tckCount++;
		  }
		});

		//socket.emit('test',{'msg', '測試訪問'});

		//儲存資料
		// socket.emit('update',{
		// 	'device': 'device007',
		// 	'collection': 'temperature',
		// 	'y-name': 'Temp',
		// 	'data': value
		// });
	});

});

// 'x': Number,
// 'y': Number,
// 'data_date': {type: Date, default: Date.now }

