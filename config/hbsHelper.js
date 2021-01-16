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
};
