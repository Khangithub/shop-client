"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _effects = require("redux-saga/effects");

var _product = require("../actions/product");

var _product2 = require("../apis/product");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(getMostDiscountsProductsGenerator),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(getBestSaleProductsGenerator),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(getMostDiscountsProductsRequestWatcher),
    _marked4 =
/*#__PURE__*/
regeneratorRuntime.mark(getBestSaleProductsRequestWatcher);

// generator sagas
function getMostDiscountsProductsGenerator(_ref) {
  var _ref$payload, pageIndex, limit, products;

  return regeneratorRuntime.wrap(function getMostDiscountsProductsGenerator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ref$payload = _ref.payload, pageIndex = _ref$payload.pageIndex, limit = _ref$payload.limit;
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.call)(_product2.getMostDiscountProductsCall, {
            pageIndex: pageIndex,
            limit: limit
          });

        case 4:
          products = _context.sent;
          _context.next = 7;
          return (0, _effects.put)((0, _product.getMostDiscountsProductsSuccess)({
            products: products
          }));

        case 7:
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          _context.next = 13;
          return (0, _effects.put)((0, _product.getFailedRequest)({
            err: _context.t0
          }));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 9]]);
}

function getBestSaleProductsGenerator(_ref2) {
  var _ref2$payload, pageIndex, limit, products;

  return regeneratorRuntime.wrap(function getBestSaleProductsGenerator$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _ref2$payload = _ref2.payload, pageIndex = _ref2$payload.pageIndex, limit = _ref2$payload.limit;
          
          _context2.prev = 2;
          _context2.next = 5;
          return (0, _effects.call)(_product2.getBestSaleProductsCall, {
            pageIndex: pageIndex,
            limit: limit
          });

        case 5:
          products = _context2.sent;
          _context2.next = 8;
          return (0, _effects.put)((0, _product.getBestSaleProductSuccess)({
            products: products
          }));

        case 8:
          _context2.next = 14;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](2);
          _context2.next = 14;
          return (0, _effects.put)((0, _product.getFailedRequest)({
            err: _context2.t0
          }));

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, null, [[2, 10]]);
} // watcher sagas


function getMostDiscountsProductsRequestWatcher() {
  return regeneratorRuntime.wrap(function getMostDiscountsProductsRequestWatcher$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _effects.takeLatest)(_product.Types.GET_MOST_DISCOUNTS_PRODUCTS_REQUEST, getMostDiscountsProductsGenerator);

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3);
}

function getBestSaleProductsRequestWatcher() {
  return regeneratorRuntime.wrap(function getBestSaleProductsRequestWatcher$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _effects.takeLatest)(_product.Types.GET_BEST_SALE_PRODUCTS_REQUEST, getBestSaleProductsGenerator);

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4);
}

var productSaga = [(0, _effects.fork)(getMostDiscountsProductsRequestWatcher, getBestSaleProductsRequestWatcher)];
var _default = productSaga;
exports["default"] = _default;