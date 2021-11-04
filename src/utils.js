export function calcChangeArr(change, allNominees) {
  const Request = function (amount) {
    this.amount = amount;
    this.changeArr = [];
  };

  Request.prototype = {
    get: function (bill) {
      const currentNomineeQty = allNominees.find(
        (el) => el.nominee === bill
      ).qty;

      const count = Math.floor(this.amount / bill);

      const multiply = currentNomineeQty > count ? count : currentNomineeQty;

      this.amount -= multiply * bill;

      const nomineeForChangeObj = {
        nominee: bill,
        qty: multiply,
      };

      this.changeArr.push(nomineeForChangeObj);
      return this;
    },
  };

  const run = () => {
    const request = new Request(change);

    request.get(100).get(50).get(20).get(10).get(5).get(1);

    return request.changeArr;
  };

  const changeArr = run();

  return changeArr;
}
