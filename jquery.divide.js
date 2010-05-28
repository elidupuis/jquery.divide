/**
 *	jQuery divide plugin
 *	@version 0.2
 *	@date Nov 4, 2009
 *	@author Eli Dupuis
 *	@copyright (c) 2009 Lift Interactive (http://liftinteractive.com)
 *	Dual licensed under the MIT and GPL licenses:
 *	http://www.opensource.org/licenses/mit-license.php
 *	http://www.gnu.org/licenses/gpl.html
 *	Requires: jQuery v1.3.2 or later (most likely works fine with earlier versions, but unteseted)

*/

(function($) {

var ver = '0.2';

jQuery.fn.divide = function(options) {

	// iterate and reformat each matched element
	return this.each(function() {
		var $this = $(this);
		var opts = $.extend({}, $.fn.divide.defaults, options);
		
		var elm;
		if (opts.target) {
			elm = $this.find(opts.target);
		}else{
			elm = $this;
		};
		
		//	set vars that will be used throughout:
		var childr = elm.children();
		var numChildr = childr.length;
		
		//	only proceed if number of children is higher than threshold:
		if (numChildr > opts.threshold) {
			
			//	retrieve original element type
			var elmType = elm[0].nodeName;
			//	determine minimum number of children to be in each column:
			var minPerCol = Math.floor(numChildr / opts.cols);
			//	determine number of columns that will house extra children 
			var tallCols = numChildr % opts.cols;

			var wrapper;
			if (opts.target) {
				//	use existing parent element.
				wrapper = elm.parent();
			}else{
				//	create wrapper element.
				wrapper = $('<' +  opts.wrapper + '>');
			};
			
			//	retain classes and ids from original element:
			if (elm.attr('class')) wrapper.attr('class',elm.attr('class'));
			if (elm.attr('id')) wrapper.attr('id',elm.attr('id'));
			
			//	loop through specified number of columns:
			for (var i=0; i < opts.cols; i++) {
				
				//	determine number of elements to get for this column:
				var itemsToGet = minPerCol;
				if (i < tallCols) itemsToGet = minPerCol + 1;

				//	create new element for this column:
				var thisList = $('<' + elmType + ' class="column-' + (i+1) + '">');
				//	add desired children to new element:
				thisList.append(childr.slice(0,itemsToGet));
				//	add new element to temp container:
				wrapper.append(thisList);
				
				//	filter newly added children out original children:
				childr = childr.filter(':gt(' + (itemsToGet - 1) + ')');
			};

			//	clean up and place new children or remove stray parents:
			if (opts.target) {
				//	remove original parent. new children have already been placed.
				elm.remove();
			}else{
				//	replace original parent element with freshly created children elements.
				elm.replaceWith(wrapper);
			};

		};
	});
};	

//	defaults
$.fn.divide.defaults = {
	threshold:0,		//	only act if number of children is greater than this number
	cols:2,				//	number of columns to create out of initial items
	wrapper:'div',		//	not used if 'target' is set
	target:null			//	expression for selecting child (if something other than all children is required)
};

//	public function/method
$.fn.divide.ver = function() { return "jquery.divide ver. " + ver; };
	
// end of closure
})(jQuery);