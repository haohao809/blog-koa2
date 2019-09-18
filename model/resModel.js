var __extends = (this && this.__extends) || (function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p] }
    return extendStatics(d, b)
  }
  return function (d, b) {
    extendStatics(d, b)
    function __ () { this.constructor = d }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __())
  }
})()
var BaseModel = /** @class */ (function () {
  function BaseModel (data, message) {
    if (typeof data === 'string') {
      this.message = data
      data = null
      message = null
    }
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
  return BaseModel
}())
var SuccessModel = /** @class */ (function (_super) {
  __extends(SuccessModel, _super)
  function SuccessModel (data, message) {
    var _this = _super.call(this, data, message) || this
    _this.errorCode = 0
    return _this
  }
  return SuccessModel
}(BaseModel))
var ErrorModel = /** @class */ (function (_super) {
  __extends(ErrorModel, _super)
  function ErrorModel (data, message) {
    var _this = _super.call(this, data, message) || this
    _this.errorCode = -1
    return _this
  }
  return ErrorModel
}(BaseModel))
module.exports = {
  SuccessModel: SuccessModel,
  ErrorModel: ErrorModel
}
