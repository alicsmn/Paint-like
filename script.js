window.addEventListener('load', function () {

    var context = document.getElementById('paint').getContext('2d');
    context.rect(0, 0, 680, 600);
	context.fillStyle = "white";
	context.fill();
    var canvas = document.getElementById('paint');
    var paint = false;
    var start = false;
    var chLargeur = false;
    var first = false;
    var change = "trace";
    var largeur = 3;
    var cursorX;
    var cursorY;
    var cursorX2;
    var cursorY2;
    var h;
    var w;
    var r;

    var color;
    var dataURL = canvas.toDataURL('image/png');
    var selectedImage = document.getElementById('selectedImage');
    var picture = new FileReader();
    var img;
  

    function change(e){
    color = this.value;
	}
	document.getElementById("color").onchange = change;
    var button = document.getElementById('download');
	
    
    function defLargeur() {
        if (!isNaN(document.getElementById('largeur').value) && chLargeur === true) {
            largeur = document.getElementById('largeur').value;
            document.getElementById('pixel').value = document.getElementById('largeur').value + " pixels";
        }
    }
    function trace() {
        if (!start) {
            context.beginPath();
            context.moveTo(cursorX, cursorY);
            start = true;
            context.strokeStyle = color;
        } else {
            context.lineTo(cursorX, cursorY);
            context.lineWidth = largeur;
            context.lineWidth = color;
            if (change === "gomme") {
                context.strokeStyle = "#FFF";
            } else {
            	color = document.getElementById("color");
                context.strokeStyle = color.value;
            }
            context.stroke();
        }
    }
    context.lineJoin = 'round';
    context.lineCap = 'round';

    canvas.addEventListener('mousedown', function (e) {
        if (change === "trace" || change === "gomme") {
            paint = true;

            cursorX = (e.pageX - canvas.offsetLeft);
            cursorY = (e.pageY - canvas.offsetTop);
        }
    });
    canvas.addEventListener('mousemove', function (e) {

        if ((paint && change === "trace") || (paint && change === "gomme")) {
            cursorX = (e.pageX - canvas.offsetLeft);
            cursorY = (e.pageY - canvas.offsetTop);
            trace();
        }
    });

    canvas.addEventListener('click', function (e) {
        if (first === false) {
            context.beginPath();

            cursorX = (e.pageX - canvas.offsetLeft);
            cursorY = (e.pageY - canvas.offsetTop);

            first = true;
        } else {
            cursorX2 = (e.pageX - canvas.offsetLeft);
            cursorY2 = (e.pageY - canvas.offsetTop);
            h = cursorY2 - cursorY;
            w = cursorX2 - cursorX;
            r = Math.sqrt(((cursorX - cursorX2) * (cursorX - cursorX2)) + ((cursorY - cursorY2) * (cursorY - cursorY2)));
            color = document.getElementById("color");
            if (change === "rectangle") {
                context.rect(cursorX, cursorY, w, h);
                context.lineWidth = largeur;
                context.strokeStyle = color.value;
                context.stroke(); 
                
            }
            else if (change === "rectangleplein") {
                context.rect(cursorX, cursorY, w, h);
                context.lineWidth = largeur;
                context.strokeStyle = color.value;
                context.fillStyle = color.value;
                context.fill();
                context.stroke(); 
                
            } 
            else if (change === "trait") {
                context.moveTo(cursorX, cursorY);
                context.lineTo(cursorX2, cursorY2);
                context.lineWidth = largeur;
                context.strokeStyle = color.value;
                context.stroke();
            }
            else if (change === "cercle") {
                context.arc(cursorX, cursorY, r, 0, 2 * Math.PI);
                context.lineWidth = largeur;
                context.strokeStyle = color.value;
                context.stroke();
            }
            else if (change === "cercleplein") {
                context.arc(cursorX, cursorY, r, 0, 2 * Math.PI);
                context.lineWidth = largeur;
                context.strokeStyle = color.value;
                context.fillStyle = color.value;
                 context.fill();            
                context.stroke();
            }
            first = false;
        }  
    });
    function readImage() {
    	if ( this.files && this.files[0] ) {
        	picture.onload = function(e) {
           		img = new Image();
           		img.src = e.target.result;
           		img.onload = function() {
            		context.drawImage(img, 0, 0, 512, 512);
        		};
    		};       
        	picture.readAsDataURL( this.files[0] );
    	}
	}
	selectedImage.onchange = readImage;
	canvas.onclick = function(e) {
		var x = e.offsetX;
  		var y = e.offsetY;
  		color = onchange;
	context.beginPath();
  	context.fillStyle = color.value;
  	context.arc(x, y, 5, 0, Math.PI * 2);
  	context.fill();
	};
    document.addEventListener('mouseup', function () {
        paint = false;
        start = false;
        defLargeur();
        chLargeur = false;
    });
    document.addEventListener('mousedown', function () {
        chLargeur = true;
    });
    document.getElementById('trace').addEventListener('click', function () {
        change = "trace";
        trace();
    });
        document.getElementById('color').addEventListener('click', function () {
    
        change = "color";
        trace();
    });
    document.getElementById('gomme').addEventListener('click', function () {
        change = "gomme";
        trace();
    });
    document.getElementById('rectangle').addEventListener('click', function () {
        change = "rectangle";
        first = false;
    });
    document.getElementById('cercle').addEventListener('click', function () {
        change = "cercle";
        first = false;
    });
    document.getElementById('rectangleplein').addEventListener('click', function () {
        change = "rectangleplein";
        first = false;
    });
    document.getElementById('cercleplein').addEventListener('click', function () {
        change = "cercleplein";
        first = false;
    });
    document.getElementById('trait').addEventListener('click', function () {
        change = "trait";
        first = false;
    });
	document.getElementById('btn-clear').addEventListener('click', function () {
        context.clearRect(0,0,canvas.width,canvas.height);
    });
	document.getElementById('btn-download').addEventListener('click', function () {
          button.href = dataURL;
    });
});
