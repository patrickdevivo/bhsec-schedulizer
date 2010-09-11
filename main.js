"use strict";	
// Functions
function translate(course_code) {
	var i = 0;
	var payload = new Array()
	payload = course_code.split(",", 3); // ["4", "Year 1 Seminar"]
	return payload;
}


function list() {
	$('.block').each(function(period) {
		$(this).append('<h1 id="period-'+ (period) +'">Period ' + (period) + ' Classes</h1>');
		var i = 0;
		while (i<=classes.length - 1) {
			var course_code = translate(classes[i].toString());
			if (classes[i][3] == period) {
				$(this).append('<span class="class-selectors" type="checkbox" name="' + classes[i] + '" title="Meets ' + classes[i][4].toString().replace(/false/gi, "").replace(/,/gi, "").toUpperCase() + ' (' + classes[i][5] +' credit class)">' + classes[i][1] + ', ' + classes[i][2] + '</span><br />');
				//console.log(course_code);
			}	
	
		i++
		}
		});
}

function insert(course_code) {
	var i = 0;
	course_code = translate(course_code);
	while (i<=classes.length - 1) {
		if (course_code[0] == classes[i][0] && course_code[1] == classes[i][1] && course_code[2] == classes[i][2]) {
				//cycle through days
				for(d=0;d<=classes[i][4].length - 1;d++) {
					if (classes[i][4][d] != false ) {
						$('#' + classes[i][4][d] + classes[i][3]).append("<p title='" + classes[i] + "'>"+classes[i][1]+"</p>");
					}
				}
		}
		i++
	}
	$('.class-selectors').each(function() {
		var name = $(this).attr('name');
		name = translate(name);
		if (name[0] == course_code[0] && name[1] == course_code[1] && name[2] == course_code[2]) {
			$(this).addClass('selected');
		}
	});
}

function remove(course_code) {
	var i = 0;
	course_code = translate(course_code);
	while (i<=classes.length - 1) {
		if (course_code[0] == classes[i][0] && course_code[1] == classes[i][1] && course_code[2] == classes[i][2]) {
				//cycle through days
				for(d=0;d<=classes[i][4].length - 1;d++) {
					if (classes[i][4][d] != false ) {
						$("#" + classes[i][4][d] + classes[i][3] + " p'[title=" + classes[i] + "]'").remove();
					}
				}
		}
		i++
	}
	$('.class-selectors').each(function() {
		var name = $(this).attr('name');
		name = translate(name);
		if (name[0] == course_code[0] && name[1] == course_code[1] && name[2] == course_code[2]) {
			$(this).removeClass('selected');
		}
	});
}

function check() {
	$('td').each(function() {
		var length = $(this).children().length;
		if (length > 1) {
			$(this).addClass('conflict');
		}
		else if (length <= 1 && $(this).hasClass('conflict') == true) {
			$(this).removeClass('conflict');	
		}
	});
}

function creditCount() {
	var count = 0;
	$('.checked').each(function() {
		
	});
	return count;
}

//$('#main').append("<input type='checkbox' name='" + classes[i] + "'>" + title + ", " + teacher + "</input><br />");
$(document).ready(function() {
	
	$.msgbox("<strong>Welcome to the BHSEC Schedulizer</strong>. The class list for Fall 2010 has been added (Year 2 Seminar left out). Please report any errors or bugs so I can fix them as soon as possible.", {type:"info", buttons: [{type: "submit", value: "OK"}]} ); 

	list(); //list all the classes

	$('#start-over').click(function() {
		$('td').each(function() {
			$(this).children().remove();
			$(this).removeClass('conflict');
		})
		$('.class-selectors').each(function() {
			$(this).removeClass('selected');							   
		})
	});
	
	$('#print').click(function() {
		$('#schedule').printElement({pageTitle:'Schedule.html'}); 			
	});
	
	$('#table-block').scrollFollow({
		easing: 'easeOutElastic',
		offset: 20

	});
	
	
	$('.class-selectors').click(function() {
		var name = $(this).attr('name');
		if ($(this).hasClass('selected') == false) {
			insert(name);
			check();
		}
		else {
			remove(name);
			$(this).removeClass('selected');
			check();
		}
	});
	
	$('span.class-selectors').qtip({
		position: {
		corner: {
			target: 'leftMiddle',
				tooltip: 'rightMiddle'
		}
   }

				   
	})
});