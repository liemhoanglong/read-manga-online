module.exports = function (hbs) {
  hbs.registerHelper("ifeq", function (a, b, options) {
    console.log(a, b);
    if (a == b) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  hbs.registerHelper("ifUnd", function (a, options) {
    if (a === undefined) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  hbs.registerHelper("section", function (name, options) {
    if (!this._sections) this._sections = {};
    this._sections[name] = options.fn(this);
    return null;
  });

  hbs.registerHelper("when",function(operand_1, operator, operand_2, options) {
    var operators = {
      'eq': (l,r) => l == r,              							 //  {{/when}}
      'noteq': (l,r) => l != r,
      'gt': (l,r) => (+l) > (+r),                        // {{#when var1 'eq' var2}}
      'gteq': (l,r) => ((+l) > (+r)) || (l == r),        //               eq
      'lt': (l,r) => (+l) < (+r),                        // {{else when var1 'gt' var2}}
      'lteq': (l,r) => ((+l) < (+r)) || (l == r),        //               gt
      'or': (l,r) => l || r,                             // {{else}}
      'and': (l,r) => l && r,                            //               lt
      '%': (l,r) => (l % r) === 0                        // {{/when}}
    }
    , result = operators[operator](operand_1,operand_2);
  
    if (result) return options.fn(this);
    else  return options.inverse(this);
  });
};


