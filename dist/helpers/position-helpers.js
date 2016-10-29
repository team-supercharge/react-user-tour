"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var positions = {
	right: function right(_ref) {
		var position = _ref.position,
		    margin = _ref.margin;

		return {
			left: position.right + margin,
			top: position.top + window.pageYOffset,
			positioned: "right"
		};
	},
	left: function left(_ref2) {
		var position = _ref2.position,
		    tourElWidth = _ref2.tourElWidth,
		    margin = _ref2.margin;

		return {
			left: position.left - margin - tourElWidth,
			top: position.top + window.pageYOffset,
			positioned: "left"
		};
	},
	top: function top(_ref3) {
		var position = _ref3.position,
		    tourElHeight = _ref3.tourElHeight,
		    arrowSize = _ref3.arrowSize,
		    margin = _ref3.margin;

		return {
			left: position.left,
			top: position.top + window.pageYOffset - tourElHeight - arrowSize,
			positioned: "top"
		};
	},
	topLeft: function topLeft(_ref4) {
		var position = _ref4.position,
		    tourElWidth = _ref4.tourElWidth,
		    tourElHeight = _ref4.tourElHeight,
		    arrowSize = _ref4.arrowSize,
		    margin = _ref4.margin;

		return {
			left: position.left + margin - tourElWidth,
			top: position.top + window.pageYOffset - tourElHeight - arrowSize,
			positioned: "topLeft"
		};
	},
	bottom: function bottom(_ref5) {
		var position = _ref5.position,
		    arrowSize = _ref5.arrowSize,
		    offsetHeight = _ref5.offsetHeight,
		    margin = _ref5.margin;

		return {
			left: position.left,
			top: position.top + window.pageYOffset + offsetHeight + arrowSize,
			positioned: "bottom"
		};
	},
	bottomLeft: function bottomLeft(_ref6) {
		var position = _ref6.position,
		    tourElWidth = _ref6.tourElWidth,
		    arrowSize = _ref6.arrowSize,
		    offsetHeight = _ref6.offsetHeight,
		    margin = _ref6.margin;

		return {
			left: position.left + margin - tourElWidth,
			top: position.top + window.pageYOffset + offsetHeight + arrowSize,
			positioned: "bottomLeft"
		};
	},
	centerOfWindow: function centerOfWindow(_ref7) {
		var position = _ref7.position,
		    tourElWidth = _ref7.tourElWidth,
		    tourElHeight = _ref7.tourElHeight,
		    arrowSize = _ref7.arrowSize,
		    margin = _ref7.margin;

		return {
			left: window.innerWidth / 2 - tourElWidth / 2,
			top: window.innerHeight / 2 - tourElHeight / 2,
			positioned: "centerOfWindow"
		};
	}
};

exports.default = positions;