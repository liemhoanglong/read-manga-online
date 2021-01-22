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

  hbs.registerHelper("select", function (value, options) {
    return options
      .fn(this)
      .split("\n")
      .map(function (v) {
        const t = 'value="' + value + '"';
        return !RegExp(t).test(v)
          ? v
          : v.replace(t, t + ' selected="selected"');
      })
      .join("\n");
  });
  hbs.registerHelper("selectState", (state, value) => {
    if (state === value) {
      return "selected";
    }
    return "";
  });
  hbs.registerHelper(
    "when",
    function (operand_1, operator, operand_2, options) {
      const operators = {
          eq: (l, r) => l == r, //  {{/when}}
          noteq: (l, r) => l != r,
          gt: (l, r) => +l > +r, // {{#when var1 'eq' var2}}
          gteq: (l, r) => +l > +r || l == r, //               eq
          lt: (l, r) => +l < +r, // {{else when var1 'gt' var2}}
          lteq: (l, r) => +l < +r || l == r, //               gt
          or: (l, r) => l || r, // {{else}}
          and: (l, r) => l && r, //               lt
          "%": (l, r) => l % r === 0, // {{/when}}
        },
        result = operators[operator](operand_1, operand_2);

      if (result) return options.fn(this);
      else return options.inverse(this);
    }
  );

  hbs.registerHelper("sliceString", function (title, start, end) {
    // console.log(title.toString())
    const temp = title.toString().slice(start, end);
    return temp;
  });

  hbs.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
  });
  hbs.registerHelper('times2', function(n, m, block) {
    var accum = '';
    for(var i = 0; i < n-m; ++i)
        accum += block.fn(i);
    return accum;
  });
};
