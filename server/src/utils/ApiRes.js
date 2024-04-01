class ApiRes {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }

  /**
   * @description this method takes express response obj from middleware and send structured response
   * @param {*} res
   */
  sendRes(res) {
    res.status(this.statusCode).json(this);
  }
}

export default ApiRes;
