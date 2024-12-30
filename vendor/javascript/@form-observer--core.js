/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.37.0.
 * Original file: /npm/@form-observer/core@0.9.1/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
function e(e) {
  if (!(e instanceof HTMLFormElement))
    throw new TypeError(
      `Expected argument to be an instance of \`HTMLFormElement\`. Instead, received \`${e}\`.`
    );
}
class t {
  #e;
  #t;
  #r;
  #n = new Map();
  #s = new Map();
  constructor(e, t, r) {
    const n = (e) =>
      (e instanceof Array ? e : [e]).map((e) => (t) => {
        if (this.#s.has(t.target.form)) return e(t);
      });
    return (
      (function (e) {
        if ("string" == typeof e) return;
        if (e instanceof Array && e.every((e) => "string" == typeof e)) return;
        throw new TypeError(
          "You must provide a `string` or an `array` of strings for the event `types`."
        );
      })(e),
      e instanceof Array
        ? ((function (e, t) {
            if (!(t instanceof Array)) {
              if ("function" == typeof t) return;
              throw new TypeError(
                "The `listeners` must be a `function` or an `array` of functions when `types` is an `array`."
              );
            }
            if (t.some((e) => "function" != typeof e))
              throw new TypeError(
                "The `listeners` must be a `function` or an `array` of functions when `types` is an `array`."
              );
            if (t.length === e.length) return;
            throw new TypeError(
              "The `listeners` array must have the same length as the `types` array."
            );
          })(e, t),
          t instanceof Array
            ? ((this.#e = e),
              (this.#t = n(t)),
              void (this.#r =
                r instanceof Array
                  ? r
                  : Array.from({ length: e.length }, () => r)))
            : ((this.#e = e), (this.#t = n(t)), void (r && (this.#r = [r]))))
        : ((function (e) {
            if ("function" == typeof e) return;
            throw new TypeError(
              "The `listener` must be a `function` when `types` is a `string`."
            );
          })(t),
          (this.#e = [e]),
          (this.#t = n(t)),
          void (r && (this.#r = [r])))
    );
  }
  observe(t) {
    if ((e(t), this.#s.has(t))) return !1;
    const r = t.getRootNode();
    let n = this.#n.get(r);
    if (
      (n
        ? (n.add(t), this.#s.set(t, r))
        : ((n = new Set()), n.add(t), this.#n.set(r, n), this.#s.set(t, r)),
      n.size > 1)
    )
      return !0;
    if (1 === this.#t.length) {
      const e = this.#t[0],
        t = this.#r?.[0];
      this.#e.forEach((n) => r.addEventListener(n, e, t));
    } else
      this.#e.forEach((e, t) => {
        r.addEventListener(e, this.#t[t], this.#r?.[t]);
      });
    return !0;
  }
  unobserve(t) {
    e(t);
    const r = this.#s.get(t);
    if (!r) return !1;
    this.#s.delete(t);
    const n = this.#n.get(r);
    if ((n.delete(t), 0 !== n.size)) return !0;
    if ((this.#n.delete(r), 1 === this.#t.length)) {
      const e = this.#t[0],
        t = this.#r?.[0];
      this.#e.forEach((n) => r.removeEventListener(n, e, t));
    } else
      this.#e.forEach((e, t) => {
        r.removeEventListener(e, this.#t[t], this.#r?.[t]);
      });
    return !0;
  }
  disconnect() {
    const e = this.#s.keys();
    for (let t = e.next().value; t; t = e.next().value) this.unobserve(t);
  }
}
class r extends t {
  #i;
  constructor(e, t) {
    super(e, n, { passive: !0, capture: t?.useEventCapturing }),
      (this.#i = t?.automate ?? "loading");
  }
  observe(e) {
    const t = super.observe(e);
    return !t || ("loading" !== this.#i && "both" !== this.#i) || r.load(e), t;
  }
  static load(t, n) {
    if ((e(t), null == n)) {
      const e = new Set();
      for (let n = 0; n < t.elements.length; n++) {
        const s = t.elements[n];
        if (e.has(s.name)) {
          n += t.elements.namedItem(s.name).length - 2;
        } else "radio" === s.type && e.add(s.name), s.name && r.load(t, s.name);
      }
      return;
    }
    if ("" === n) return;
    const i = t.elements.namedItem(n);
    if (!i) return;
    if (!(i instanceof RadioNodeList) && i.name !== n) {
      const e = `Expected to find a field with name "${n}", but instead found a field with name "${i.name}".`;
      throw new Error(
        `${e} ${"Did you accidentally provide your field's `id` instead of your field's `name`?"}`
      );
    }
    if (i instanceof HTMLFieldSetElement) return;
    if (i instanceof HTMLOutputElement) return;
    if (i instanceof HTMLObjectElement) return;
    if (
      i instanceof HTMLInputElement &&
      ("password" === i.type || "hidden" === i.type || "file" === i.type)
    )
      return;
    const o = localStorage.getItem(s(t.name, n));
    if (!o) return;
    const a = JSON.parse(o);
    if (i instanceof HTMLInputElement && "checkbox" === i.type) i.checked = a;
    else if (i instanceof HTMLSelectElement && i.multiple && Array.isArray(a)) {
      let e;
      for (let t = 0; t < i.options.length; t++) {
        if (!a.length) {
          e = t;
          break;
        }
        const r = i.options[t],
          n = a.findIndex((e) => e === r.value);
        (r.selected = n >= 0), n >= 0 && a.splice(n, 1);
      }
      for (let t = e; t < i.options.length; t++) i.options[t].selected = !1;
    } else i.value = a;
  }
  unobserve(e) {
    const t = super.unobserve(e);
    return (
      !t || ("deletion" !== this.#i && "both" !== this.#i) || r.clear(e), t
    );
  }
  static clear(t, r) {
    if ((e(t), r)) return localStorage.removeItem(s(t.name, r));
    for (let e = 0; e < t.elements.length; e++) {
      const r = t.elements[e];
      r.name && localStorage.removeItem(s(t.name, r.name));
    }
  }
}
function n(e) {
  const t = e.target;
  if (!t.name) return;
  if (t instanceof HTMLFieldSetElement) return;
  if (t instanceof HTMLOutputElement) return;
  if (t instanceof HTMLObjectElement) return;
  const r = s(t.form.name, t.name);
  if (t instanceof HTMLSelectElement && t.multiple) {
    const e = [];
    for (let r = 0; r < t.selectedOptions.length; r++)
      e.push(t.selectedOptions[r].value);
    localStorage.setItem(r, JSON.stringify(e));
  } else {
    if (t instanceof HTMLInputElement) {
      if ("checkbox" === t.type)
        return localStorage.setItem(r, JSON.stringify(t.checked));
      if ("password" === t.type || "hidden" === t.type || "file" === t.type)
        return;
    }
    localStorage.setItem(r, JSON.stringify(t.value));
  }
}
function s(e, t) {
  return `form:${e || "global-scope"}:${t}`;
}
const i = Object.freeze({
  "aria-describedby": "aria-describedby",
  "aria-invalid": "aria-invalid",
  "data-fvo-revalidate": "data-fvo-revalidate",
});
class o extends t {
  #o;
  #a;
  #l;
  #d;
  #f;
  #c;
  #u = new Map();
  constructor(e, t) {
    const r = [],
      n = [];
    "string" == typeof e &&
      (r.push(e),
      n.push((e) => {
        const t = e.target.name;
        t && this.validateField(t);
      })),
      "string" == typeof t?.revalidateOn &&
        (r.push(t.revalidateOn),
        n.push((e) => {
          const t = this.#h(e.target.name);
          t?.hasAttribute(i["data-fvo-revalidate"]) &&
            this.validateField(t.name);
        })),
      super(r, n, { passive: !0, capture: t?.useEventCapturing }),
      (this.#l = t?.scroller ?? a),
      (this.#d = t?.renderer ?? l),
      (this.#f = t?.renderByDefault),
      (this.#c = t?.defaultErrors);
  }
  observe(e) {
    if (this.#o && e instanceof HTMLFormElement && e !== this.#o)
      throw new Error(
        `A single \`${this.constructor.name}\` can only watch 1 form at a time.`
      );
    const t = super.observe(e);
    return (this.#o = e), t && (this.#a = this.#o.getRootNode()), t;
  }
  unobserve(e) {
    return (
      e === this.#o &&
        (this.#u.clear(), (this.#o = void 0), (this.#a = void 0)),
      super.unobserve(e)
    );
  }
  disconnect() {
    this.#o && this.unobserve(this.#o);
  }
  validateFields(e) {
    c(this.#o);
    let t = !0;
    const r = { enableRevalidation: e?.enableRevalidation };
    let n;
    const s = new Set();
    for (let e = 0; e < this.#o.elements.length; e++) {
      const i = this.#o.elements[e];
      if (d(i)) continue;
      const { name: o } = i;
      if (s.has(o)) {
        e += this.#o.elements.namedItem(o).length - 2;
        continue;
      }
      "radio" === i.type && s.add(o);
      const a = this.validateField(o, r);
      !0 !== a && (!1 !== a ? (n ? n.push(a) : (n = [a])) : (t = !1));
    }
    return n
      ? Promise.allSettled(n).then((r) => {
          const n =
            t && r.every((e) => "fulfilled" === e.status && !0 === e.value);
          return this.#m({ pass: n, validatedRadiogroups: s }, e);
        })
      : this.#m({ pass: t, validatedRadiogroups: s }, e);
  }
  #m(e, t) {
    if (e.pass) return !0;
    if (t?.focus) {
      const t = this.#o.elements;
      for (let r = 0; r < t.length; r++) {
        const n = t[r];
        if (d(n)) continue;
        const { name: s } = n;
        if (
          (e.validatedRadiogroups.has(s) && (r += t.namedItem(s).length - 1),
          f(n).getAttribute(i["aria-invalid"]) === String(!0))
        ) {
          this.#p(n);
          break;
        }
      }
    }
    return !1;
  }
  validateField(e, t) {
    const r = this.#h(e);
    if (!r) return !1;
    if (!r.willValidate) return !0;
    (t?.enableRevalidation ?? 1) &&
      r.setAttribute(i["data-fvo-revalidate"], ""),
      r.setCustomValidity?.("");
    const n = (s = r.validity).badInput
      ? "badinput"
      : s.valueMissing
      ? "required"
      : s.tooShort
      ? "minlength"
      : s.rangeUnderflow
      ? "min"
      : s.tooLong
      ? "maxlength"
      : s.rangeOverflow
      ? "max"
      : s.stepMismatch
      ? "step"
      : s.typeMismatch
      ? "type"
      : s.patternMismatch
      ? "pattern"
      : void 0;
    var s;
    if (n) {
      const s = this.#u.get(e)?.[n] ?? this.#c?.[n];
      return "object" == typeof s
        ? this.#g(r, s, t)
        : this.#g(r, s || r.validationMessage, t);
    }
    const o = this.#u.get(e)?.validate ?? this.#c?.validate,
      a = o?.(r);
    return a instanceof Promise
      ? a.then((e) => this.#g(r, e, t))
      : this.#g(r, a, t);
  }
  #g(e, t, r) {
    return t
      ? ("object" == typeof t && "message" in t
          ? this.setFieldError(e.name, t.message, t.render)
          : this.setFieldError(e.name, t),
        r?.focus && this.#p(e),
        !1)
      : (this.clearFieldError(e.name), !0);
  }
  #p(e) {
    const t = f(e);
    t.hasAttribute(i["aria-describedby"])
      ? (this.#l(t), e.focus({ preventScroll: !0 }))
      : e.reportValidity?.();
  }
  setFieldError(e, t, r = this.#f) {
    const n = this.#h(e);
    if (!n) return;
    const s = "function" == typeof t ? t(n) : t;
    if (!s) return;
    const o = f(n);
    o.setAttribute(i["aria-invalid"], String(!0));
    const a = this.#a?.getElementById(o.getAttribute(i["aria-describedby"]));
    if (r) {
      if (!a) return;
      return this.#d(a, s);
    }
    if ("string" != typeof s)
      throw new TypeError(
        "A field's error message must be a `string` when the `render` option is not `true`"
      );
    a && (a.textContent = s), n.setCustomValidity?.(s);
  }
  clearFieldError(e) {
    const t = this.#h(e);
    if (!t) return;
    const r = f(t);
    r.setAttribute(i["aria-invalid"], String(!1));
    const n = this.#a?.getElementById(r.getAttribute(i["aria-describedby"]));
    n && this.#d(n, null), t.setCustomValidity?.("");
  }
  configure(e, t) {
    "undefined" != typeof window && this.#u.set(e, t);
  }
  #h(e) {
    c(this.#o);
    const t = this.#o.elements.namedItem(e);
    return t instanceof RadioNodeList ? t[0] : t;
  }
}
function a(e) {
  e.scrollIntoView({ behavior: "smooth" });
}
function l(e, t) {
  if (null === t) return e.replaceChildren();
  e.innerHTML = t;
}
function d(e) {
  return (
    !e.name ||
    e instanceof HTMLOutputElement ||
    e instanceof HTMLObjectElement ||
    e instanceof HTMLFieldSetElement
  );
}
function f(e) {
  const t = "radio" === e.type ? e.closest("fieldset[role='radiogroup']") : e;
  if (t) return t;
  throw new Error(
    "Validated radio buttons must be placed inside a `<fieldset>` with role `radiogroup`"
  );
}
function c(e) {
  if (!(e instanceof HTMLFormElement))
    throw new Error(
      "This action cannot be performed on a form field before its owning form is `observe`d."
    );
}
export {
  t as FormObserver,
  r as FormStorageObserver,
  o as FormValidityObserver,
  l as defaultErrorRenderer,
  a as defaultScroller,
};
export default null;
//# sourceMappingURL=/sm/72a35fb3a8bc4f887672abdaa9ba502c54dcfc03580aa7a246c83cf46139c778.map
