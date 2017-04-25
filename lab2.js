function Triangle(a, b) {
	this.a = a == undefined ? 0.0 : a;
	this.b = b == undefined ? 0.0 : b;

	this.Radius_of_the_circumscribed_circle = function (){
		return (Math.sqrt(this.a * this.a + this.b * this.b) / 2).toFixed(2);
	}
	this.half_perimetr = function(){
		return ((Math.sqrt(this.a * this.a + this.b * this.b) + parseFloat(this.a) + parseFloat(this.b))/2).toFixed(2);
	}
	this.OneOfTheCorners = function(){
		return (Math.asin(this.a / Math.sqrt(this.a * this.a + this.b* this.b)) / Math.PI * 180).toFixed(2);
	}
	this.SecondCorner = function(){
		return (90 - this.OneOfTheCorners ()).toFixed(2);

	}
	this.Increase1 = function (rowIndex){
		var percent = parseFloat(document.getElementById ("input" + rowIndex).value);
		this.a = (parseFloat(this.a) + parseFloat(this.a) / 100 * percent).toFixed(2);
		return (this.a);
	}
	this.Decrease2 = function (rowIndex){
		var percent = parseFloat(document.getElementById ("input" + rowIndex).value);
		this.b = (parseFloat(this.b) - parseFloat(this.b) / 100 * percent).toFixed(2);
		return (this.b);	
	}
	this.Increase2 = function (rowIndex){
		var percent = parseFloat(document.getElementById ("input" + rowIndex).value);
		this.b =  (parseFloat(this.b) + parseFloat(this.b) / 100 * percent).toFixed(2);
		return (this.b);

	}
	this.Decrease1 = function(rowIndex){
		var percent = parseFloat(document.getElementById ("input" + rowIndex).value);
		this.a = (parseFloat(this.a) - parseFloat(this.a)/ 100 * percent).toFixed(2);
		return (this.a);
	}

}

function TriangleView(a, b) {
	Triangle.call(this, a, b);

	
	this.inputfield = function (rowIndex){
		var view = document.createDocumentFragment();
		var input = document.createElement("input");
		input.id = "input" + rowIndex;
		input.placeholder = "Введите на сколько изменить";
		view.appendChild(input);
		return view;
	}
	this.Decreasebutton1 = function (rowIndex){
		var view = document.createDocumentFragment();
		var Decreasebutton1 = document.createElement("button");
		var sup = this;
		Decreasebutton1.appendChild(document.createTextNode("Уменьшить"));
		Decreasebutton1.addEventListener("click", function() {
		sup.Decrease1(rowIndex);
		}
		);
		
		view.appendChild(Decreasebutton1);
		return view;
	}
	this.Increasebutton1 = function (rowIndex){
		var view = document.createDocumentFragment();
		var Increasebutton1 = document.createElement("button");
		var sup = this;
		Increasebutton1.appendChild(document.createTextNode("Увеличить"));
		Increasebutton1.addEventListener("click", function() {
		sup.Increase1(rowIndex);
		}
		);
		
		view.appendChild(Increasebutton1);
		return view;
	}
		this.Decreasebutton2 = function (rowIndex){
		var view = document.createDocumentFragment();
		var Decreasebutton2 = document.createElement("button");
		var sup = this;
		Decreasebutton2.appendChild(document.createTextNode("Уменьшить"));
		Decreasebutton2.addEventListener("click", function() {
		sup.Decrease2(rowIndex);
		}
		);
		view.appendChild(Decreasebutton2);
		
		return view;
	}
	this.Increasebutton2 = function (rowIndex){
		var view = document.createDocumentFragment();
		var Increasebutton2 = document.createElement("button");
		var sup = this;
		Increasebutton2.appendChild(document.createTextNode("Увеличить "));
		Increasebutton2.addEventListener("click", function() {
		sup.Increase2(rowIndex);
		}
		);
		

		view.appendChild(Increasebutton2);
		return view;
	}
	this.createRow = function(rowIndex) {
	    var tr = document.createElement('tr');
	    tr.id = "row_" + rowIndex;

	    var td1 = document.createElement('td');
	    td1.appendChild(document.createTextNode(rowIndex));
		tr.appendChild(td1);

	    var td2 = document.createElement('td');
	    td2.appendChild(document.createTextNode(this.a));
	    td2.id = "newsize1-"+ rowIndex; 
	    tr.appendChild(td2);
	    
	    var td3 = document.createElement('td');
	    td3.appendChild(document.createTextNode(this.b));
	    td3.id = "newsize2-"+ rowIndex; 
		tr.appendChild(td3);


		var td4 = document.createElement('td');
	    td4.appendChild(document.createTextNode(this.Radius_of_the_circumscribed_circle()));
	    td4.id = "radius-"+ rowIndex; 
		tr.appendChild(td4);

		var td5 = document.createElement('td');
	    td5.appendChild(document.createTextNode(this.half_perimetr()));
	    td5.id = "perimetr-"+ rowIndex;
		tr.appendChild(td5);

		var td6 = document.createElement('td');
	    td6.appendChild(document.createTextNode(this.OneOfTheCorners()));
	    td6.id = "corner1-"+ rowIndex;
		tr.appendChild(td6);

		var td7 = document.createElement('td');
	    td7.appendChild(document.createTextNode(this.SecondCorner()));
	    td7.id = "corner2-"+ rowIndex;
		tr.appendChild(td7);

		var td8 = document.createElement('td');
	    td8.appendChild(this.inputfield(rowIndex));
		tr.appendChild(td8);


		var td9 = document.createElement('td');
	    td9.appendChild(this.Decreasebutton1(rowIndex));
	    td9.appendChild(this.Increasebutton1(rowIndex));
	    tr.appendChild(td9);


		var td10 = document.createElement('td');
	    td10.appendChild(this.Decreasebutton2(rowIndex));
	    td10.appendChild(this.Increasebutton2(rowIndex));
		tr.appendChild(td10);
		return tr;
	}
}
function getRandom() {
	return Math.round(Math.random()*30)+1;
}

var data = {
	triangles : [],
	
	refreshTable : function() {
		var tableBody = document.getElementById('triangles');
		tableBody.innerHTML = '';
		for(var i = 0; i < this.triangles.length; ++i) {
			tableBody.appendChild(this.triangles[i].createRow(i));
		}
	},

	add : function(a, b) {
		this.triangles.push(new TriangleView(a, b));
		this.refreshTable();
	},

	addRandom : function() {
		this.add(getRandom(), getRandom());
	},

	deleteTriangle : function(index) {
		this.triangles.splice(index, 1);
		this.refreshTable();
	},

	clear : function() {
		this.triangles = [];
		this.refreshTable();
	},
	addNew: function(){

		var first = parseFloat(document.getElementById("side1").value);
		var second = parseFloat(document.getElementById("side2").value);
		this.add(first, second);
		this.refreshTable();
	}

}

