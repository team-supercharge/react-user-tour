"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactMotion = require("react-motion");

var _tourButton = require("./tour-button");

var _tourButton2 = _interopRequireDefault(_tourButton);

var _tourButtonContainer = require("./tour-button-container");

var _tourButtonContainer2 = _interopRequireDefault(_tourButtonContainer);

var _arrow = require("./arrow");

var _arrow2 = _interopRequireDefault(_arrow);

var _positionHelpers = require("./helpers/position-helpers");

var _positionHelpers2 = _interopRequireDefault(_positionHelpers);

var _viewboxHelpers = require("./helpers/viewbox-helpers");

var viewBoxHelpers = _interopRequireWildcard(_viewboxHelpers);

var _scrollToPosition = require("./helpers/scroll-to-position");

var _scrollToPosition2 = _interopRequireDefault(_scrollToPosition);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactUserTour = function (_Component) {
	_inherits(ReactUserTour, _Component);

	function ReactUserTour(props) {
		_classCallCheck(this, ReactUserTour);

		var _this = _possibleConstructorReturn(this, (ReactUserTour.__proto__ || Object.getPrototypeOf(ReactUserTour)).call(this, props));

		_this.prevPos = {
			top: 0,
			left: 0
		};
		_this.getStepPosition = _this.getStepPosition.bind(_this);
		return _this;
	}

	_createClass(ReactUserTour, [{
		key: "shouldComponentUpdate",
		value: function shouldComponentUpdate(nextProps) {
			return this.props.step !== nextProps.step || this.props.active !== nextProps.active;
		}
	}, {
		key: "getStepPosition",
		value: function getStepPosition(selector, tourElWidth, tourElHeight, overridePos, scrollTo) {
			var margin = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 25;
			var horizontalOffset = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
			var verticalOffset = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;

			var windowHeight = window.innerHeight;
			var windowWidth = window.innerWidth;
			var el = document.querySelector(selector);
			if (el) {
				var position = el ? el.getBoundingClientRect() : {};
				var isElementBelowViewBox = viewBoxHelpers.isElementBelowViewBox(windowHeight, position.top);
				var isElementAboveViewBox = viewBoxHelpers.isElementAboveViewBox(position.bottom);

				if (scrollTo !== undefined) {
					position = (0, _scrollToPosition2.default)(el, scrollTo);
				} else if (isElementBelowViewBox) {
					position = (0, _scrollToPosition2.default)(el, position.bottom);
				} else if (isElementAboveViewBox) {
					position = (0, _scrollToPosition2.default)(el, window.pageYOffset + position.top);
				}
				var shouldPositionLeft = viewBoxHelpers.shouldPositionLeft(windowWidth, position.left);
				var shouldPositionAbove = viewBoxHelpers.shouldPositionAbove(windowHeight, position.bottom);
				var shouldPositionBelow = viewBoxHelpers.shouldPositionBelow(position.top);
				var elPos = void 0;
				if (overridePos && _positionHelpers2.default[overridePos]) {
					elPos = _positionHelpers2.default[overridePos]({
						position: position,
						tourElWidth: tourElWidth,
						tourElHeight: tourElHeight,
						arrowSize: this.props.arrowSize,
						offsetHeight: el.offsetHeight,
						margin: margin
					});
				} else if (shouldPositionLeft && !shouldPositionAbove && !shouldPositionBelow) {
					elPos = _positionHelpers2.default.left({
						position: position,
						tourElWidth: tourElWidth,
						margin: margin
					});
				} else if (shouldPositionAbove) {
					elPos = shouldPositionLeft ? _positionHelpers2.default.topLeft({
						position: position,
						tourElWidth: tourElWidth,
						tourElHeight: tourElHeight,
						arrowSize: this.props.arrowSize,
						margin: margin
					}) : _positionHelpers2.default.top({
						position: position,
						tourElHeight: tourElHeight,
						arrowSize: this.props.arrowSize,
						margin: margin
					});
				} else if (shouldPositionBelow) {
					elPos = shouldPositionLeft ? _positionHelpers2.default.bottomLeft({
						position: position,
						tourElWidth: tourElWidth,
						arrowSize: this.props.arrowSize,
						offsetHeight: el.offsetHeight,
						margin: margin
					}) : _positionHelpers2.default.bottom({
						position: position,
						arrowSize: this.props.arrowSize,
						offsetHeight: el.offsetHeight,
						margin: margin
					});
				} else {
					elPos = _positionHelpers2.default.right({
						position: position,
						margin: margin
					});
				}

				elPos.left += horizontalOffset;
				elPos.top += verticalOffset;

				this.prevPos = elPos;
				return elPos;
			} else {
				return this.prevPos;
			}
		}
	}, {
		key: "getCustomArrow",
		value: function getCustomArrow(position) {
			return typeof this.props.arrow === "function" ? this.props.arrow({
				position: position.positioned,
				width: this.props.style.width,
				height: this.props.style.height,
				size: this.props.arrowSize,
				color: this.props.arrowColor
			}) : this.props.arrow;
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			var currentTourStep = this.props.steps.filter(function (step) {
				return step.step === _this2.props.step;
			})[0];
			if (!this.props.active || !currentTourStep) {
				return _react2.default.createElement("span", null);
			}

			var tourElHeight = currentTourStep.height ? currentTourStep.height : this.props.style.height;
			var tourElWidth = currentTourStep.width ? currentTourStep.width : this.props.style.width;

			var position = this.getStepPosition(currentTourStep.selector, tourElWidth, tourElHeight, currentTourStep.position, currentTourStep.scrollToPosition, currentTourStep.margin, currentTourStep.horizontalOffset, currentTourStep.verticalOffset);
			var style = _extends({}, this.props.style);
			var arrow = this.props.arrow ? this.getCustomArrow(position) : _react2.default.createElement(_arrow2.default, {
				position: position.positioned,
				width: this.props.style.width,
				height: this.props.style.height,
				size: this.props.arrowSize,
				color: this.props.arrowColor
			});

			var extraButtonProps = this.props.buttonStyle ? { style: this.props.buttonStyle } : {};

			var nextButton = this.props.step !== this.props.steps.length ? _react2.default.createElement(
				_tourButton2.default,
				_extends({
					onClick: function onClick() {
						return _this2.props.onNext(_this2.props.step + 1);
					}
				}, extraButtonProps, {
					className: "react-user-tour-next-button" }),
				this.props.nextButtonText
			) : "";

			var backButton = this.props.step !== 1 ? _react2.default.createElement(
				_tourButton2.default,
				_extends({
					onClick: function onClick() {
						return _this2.props.onBack(_this2.props.step - 1);
					}
				}, extraButtonProps, {
					className: "react-user-tour-back-button" }),
				this.props.backButtonText
			) : "";

			var doneButton = this.props.step === this.props.steps.length ? _react2.default.createElement(
				_tourButton2.default,
				_extends({
					onClick: function onClick() {
						return _this2.props.onCancel();
					},
					onTouchTap: function onTouchTap() {
						return _this2.props.onCancel();
					}
				}, extraButtonProps, {
					className: "react-user-tour-done-button" }),
				this.props.doneButtonText
			) : "";

			var tourButtonContainer = !this.props.hideButtons ? _react2.default.createElement(
				_tourButtonContainer2.default,
				{ style: this.props.buttonContainerStyle },
				nextButton,
				doneButton,
				backButton
			) : "";

			var xStyle = {
				"float": "right",
				"cursor": "pointer",
				"paddingRight": 10,
				"paddingTop": 10
			};

			var closeButton = !this.props.hideClose ? _react2.default.createElement(
				"span",
				{ className: "react-user-tour-close",
					style: xStyle,
					onClick: this.props.onCancel,
					onTouchTap: this.props.onCancel },
				this.props.closeButtonText
			) : "";

			if (currentTourStep.fixed) {
				Object.assign(style, { position: "fixed" });
			}

			var svgStyle = {
				position: "absolute",
				zIndex: 9999,
				width: '100%',
				height: '100%'
			};

			if (currentTourStep.fixed) {
				Object.assign(svgStyle, { position: "fixed" });
			}

			var backdropStyle = {
				fill: "rgba(0, 0, 0, 0.4)",
				fillRule: 'evenodd'
			};

			var backdrop = void 0;
			if (currentTourStep.highlight) {
				var left = void 0,
				    right = void 0,
				    top = void 0,
				    bottom = void 0;
				var el = document.querySelector(currentTourStep.selector);

				if (currentTourStep.position === 'centerOfWindow') {
					left = window.innerWidth / 2;
					top = window.innerHeight / 2;
					right = left;
					bottom = top;
				} else if (el) {
					var target = el.getBoundingClientRect();
					left = target.left + window.scrollX;
					right = left + target.width;
					top = target.top + window.scrollY;
					bottom = top + target.height;
				}

				backdrop = _react2.default.createElement(
					"svg",
					{ style: svgStyle, version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
					_react2.default.createElement(
						_reactMotion.Motion,
						{ style: { x1: (0, _reactMotion.spring)(left), x2: (0, _reactMotion.spring)(right), y1: (0, _reactMotion.spring)(top), y2: (0, _reactMotion.spring)(bottom) } },
						function (_ref) {
							var x1 = _ref.x1,
							    x2 = _ref.x2,
							    y1 = _ref.y1,
							    y2 = _ref.y2;
							return _react2.default.createElement("path", { style: backdropStyle, d: "M0,0 L100000,0 100000,100000 0,100000 M" + x1 + "," + y1 + " L" + x2 + "," + y1 + " " + x2 + "," + y2 + " " + x1 + "," + y2 + " z" });
						}
					)
				);
			}

			return _react2.default.createElement(
				"div",
				null,
				backdrop,
				_react2.default.createElement(
					"div",
					{ className: "react-user-tour-container", style: this.props.containerStyle },
					_react2.default.createElement(
						_reactMotion.Motion,
						{ style: { x: (0, _reactMotion.spring)(position.left), y: (0, _reactMotion.spring)(position.top) } },
						function (_ref2) {
							var x = _ref2.x,
							    y = _ref2.y;
							return _react2.default.createElement(
								"div",
								{ style: _extends({}, style, { transform: "translate3d(" + x + "px, " + y + "px, 0)" }) },
								arrow,
								closeButton,
								currentTourStep.title,
								currentTourStep.body,
								tourButtonContainer
							);
						}
					)
				)
			);
		}
	}]);

	return ReactUserTour;
}(_react.Component);

exports.default = ReactUserTour;


ReactUserTour.defaultProps = {
	style: {
		height: 150,
		width: 350,
		position: "absolute",
		zIndex: 9999,
		backgroundColor: "#fff",
		color: "#494949",
		boxShadow: "0 6px 8px 0 rgba(0, 0, 0, 0.24)"
	},
	containerStyle: {},
	onCancel: function onCancel() {},
	onNext: function onNext() {},
	onBack: function onBack() {},
	nextButtonText: "Next",
	backButtonText: "Back",
	doneButtonText: "Done",
	closeButtonText: "Close",
	buttonContainerStyle: {
		position: "absolute",
		bottom: 10,
		right: 0
	},
	hideButtons: false,
	hideClose: false,
	arrowColor: "#fff",
	arrowSize: 15
};