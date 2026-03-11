var nn = Object.defineProperty;
var on = (e, n, t) => n in e ? nn(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var k = (e, n, t) => (on(e, typeof n != "symbol" ? n + "" : n, t), t);
let Fe = [];
const oe = {
  on_uninstall: (e) => {
    Fe.push(e);
  },
  uninstall() {
    Fe.forEach((e) => {
      e();
    }), Fe = [];
  }
};
function $t(e) {
  try {
    navigator.clipboard.writeText(e).then(() => {
    });
  } catch {
    n(e);
  }
  function n(t) {
    const o = document.createElement("textarea");
    o.value = t, document.body.appendChild(o), o.select(), document.execCommand("copy"), document.body.removeChild(o);
  }
}
const we = window.React, sn = window.React.useEffect, ze = window.React.useState, an = window.React.useCallback, rn = window.Blueprint.Select.MultiSelect, mt = window.Blueprint.Core.MenuItem;
function cn(e, n) {
  let t;
  return function(...o) {
    clearTimeout(t), t = setTimeout(() => e.apply(this, o), n);
  };
}
function ln({
  selected: e,
  onSave: n
}) {
  const [t, o] = ze(e), [i, r] = ze([]), [s, a] = ze([]);
  sn(() => {
    window.roamAlphaAPI.data.async.fast.q(
      `
        [:find [(pull ?b [:block/uid :node/title]) ...]
        :where
            [?b :node/title ?title]
            [(not-empty ?title)]
        ]
        `
    ).then((h) => {
      h.map((f) => ({
        label: f[":node/title"],
        value: f[":block/uid"]
      }));
    });
  }, []);
  const c = an(
    cn((h) => {
      if (!h) {
        a([]);
        return;
      }
      window.roamAlphaAPI.data.async.fast.q(
        `
        [:find [(pull ?b [:block/uid :node/title]) ...]
        :where
            [?b :node/title ?title]
            [(clojure.string/includes?  ?title "${h}")]
        ]
        `
      ).then((f) => {
        const b = f.map((I) => ({
          label: I[":node/title"],
          value: I[":block/uid"]
        }));
        a(b);
      }).catch((f) => {
        console.error("Error querying pages:", f), a([]);
      });
    }, 300),
    [i]
  ), d = (h) => {
    if (t.some((f) => f.value === h.value)) {
      const f = t.filter((b) => b.value !== h.value);
      o(f), n(f);
    } else {
      const f = [...t, h];
      o(f), n(f);
    }
  }, u = (h) => {
    const f = t.filter(
      (b) => b.label !== h
    );
    o(f), n(f);
  }, p = () => {
    o([]);
  };
  return /* @__PURE__ */ we.createElement("section", { className: "bp3-dark" }, /* @__PURE__ */ we.createElement(
    rn,
    {
      items: s,
      selectedItems: t,
      itemPredicate: () => !0,
      itemRenderer: (h, { handleClick: f, modifiers: b, query: I }) => {
        const U = t.some(
          (v) => v.value === h.value
        );
        return /* @__PURE__ */ we.createElement(
          mt,
          {
            active: b.active,
            icon: U ? "tick" : "blank",
            key: h.value,
            onClick: f,
            text: h.label,
            shouldDismissPopover: !1
          }
        );
      },
      onItemSelect: d,
      tagRenderer: (h) => h.label,
      onQueryChange: (h) => {
        c(h);
      },
      tagInputProps: {
        onRemove: u,
        rightElement: t.length > 0 ? /* @__PURE__ */ we.createElement(
          "button",
          {
            className: "bp3-button bp3-minimal bp3-icon-cross",
            onClick: p,
            "aria-label": "Clear selection"
          }
        ) : void 0,
        placeholder: "Select pages..."
      },
      placeholder: "Select pages...",
      noResults: /* @__PURE__ */ we.createElement(mt, { disabled: !0, text: "No results." }),
      resetOnSelect: !0
    }
  ));
}
let st = !1, at = !1, fe;
function rt() {
  st = !1, at = !1, fe && (clearTimeout(fe), fe = void 0);
}
function dn(e = !1) {
  st = !0, at = e, fe && clearTimeout(fe), fe = setTimeout(() => {
    rt();
  }, 1e3);
}
function un() {
  const e = {
    fromSearchSelection: st,
    forceOpenInNewTab: at
  };
  return rt(), e;
}
function fn(e) {
  return e instanceof HTMLInputElement && (e.id === "find-or-create-input" || e.getAttribute("placeholder") === "Find or Create Page") && !e.closest(".roam-tabs-switch-omnibar");
}
function mn() {
  const e = document.querySelector(".rm-find-or-create__menu");
  return e ? e.querySelector('.rm-menu-item[style*="background-color"]') || e.querySelector(".rm-menu-item") : null;
}
function hn(e) {
  const n = Object.keys(e).find(
    (t) => t.startsWith("__reactProps$")
  );
  if (n)
    return e[n];
}
function pn() {
  const e = mn();
  if (!e)
    return !1;
  const n = hn(e);
  return typeof (n == null ? void 0 : n.onMouseDown) != "function" ? !1 : (n.onMouseDown({
    button: 0,
    buttons: 1,
    metaKey: !1,
    ctrlKey: !1,
    altKey: !1,
    shiftKey: !1,
    preventDefault() {
    },
    stopPropagation() {
    },
    currentTarget: e,
    target: e,
    nativeEvent: {
      button: 0,
      buttons: 1
    }
  }), !0);
}
function gn() {
  const e = (n) => {
    if (n.key !== "Enter")
      return;
    const t = document.activeElement;
    if (!fn(t))
      return;
    const o = n.metaKey || n.ctrlKey;
    if (dn(o), !o)
      return;
    if (!pn()) {
      rt();
      return;
    }
    n.preventDefault(), n.stopPropagation();
  };
  document.addEventListener("keydown", e, !0), oe.on_uninstall(() => {
    document.removeEventListener("keydown", e, !0);
  });
}
gn();
const Ce = () => ({
  fromTabSwitch: !1
});
let ne = Ce(), me;
function ct() {
  ne = Ce(), me && (clearTimeout(me), me = void 0);
}
function bn() {
  Bt(1e3);
}
function Bt(e) {
  me && clearTimeout(me), me = setTimeout(() => {
    ct();
  }, e);
}
function wn(e, n) {
  ne = {
    fromTabSwitch: !0,
    targetTabId: e,
    targetUid: n
  }, bn();
}
function vn() {
  ct();
}
function Sn(e) {
  if (!ne.fromTabSwitch)
    return Ce();
  if (ne.targetUid) {
    if (!e)
      return Ce();
    if (ne.targetUid !== e)
      return Ut(), Ce();
  }
  const n = ne;
  return ct(), n;
}
function Ut(e = 100) {
  ne.fromTabSwitch && Bt(e);
}
const kn = window.React.useCallback, Tn = window.React.useLayoutEffect, In = window.React.useRef;
function Ze(e) {
  const n = In(e);
  return Tn(() => {
    n.current = e;
  }), kn((...t) => {
    const o = n.current;
    if (o)
      return o(...t);
  }, []);
}
const yn = window.React.useEffect;
let Le = [];
function Nt(e) {
  const n = Ze(e);
  yn(() => (Le.push(n), () => {
    Le = Le.filter((t) => t !== n);
  }), []);
}
function Cn() {
  var I, U;
  let e, n = "", t = "", o = { source: "unknown" }, i = 0;
  const r = 20, s = (v, T) => {
    Le.forEach((y) => {
      y(v, T);
    });
  }, a = (v) => {
    const T = new URL(v, window.location.origin).hash, y = window.roamAlphaAPI.graph.name.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    ), l = new RegExp(`/${y}/page/([^/?#]+)`).exec(T);
    return l != null && l[1] ? decodeURIComponent(l[1]) : void 0;
  }, c = (v, T = { source: "unknown" }) => {
    e && (clearTimeout(e), e = void 0), t = "", o = { source: "unknown" }, i = 0;
    const y = un();
    if (v === n) {
      Ut();
      return;
    }
    n = v;
    const m = a(v);
    s(m, {
      ...T,
      ...y,
      ...Sn(m)
    });
  }, d = (v, T = { source: "unknown" }) => {
    v && (t = v), o = T, e && clearTimeout(e);
    const y = () => {
      const m = window.location.href;
      if (t && m !== t && i < r) {
        i += 1, e = setTimeout(
          y,
          i < 5 ? 0 : 25
        );
        return;
      }
      c(m, o);
    };
    e = setTimeout(y, 0);
  }, u = () => {
    document.querySelectorAll(".bp3-portal").forEach((T) => {
      T.querySelector(".roam-lift-toast") || T.remove();
    });
  }, p = () => {
    u(), c(window.location.href, { source: "hashchange" });
  }, h = (v) => {
    var y, m;
    const T = {
      source: "navigate",
      ensureMainWindow: v.navigationType === "traverse"
    };
    if (v.navigationType === "traverse") {
      d((y = v.destination) == null ? void 0 : y.url, T);
      return;
    }
    c(((m = v.destination) == null ? void 0 : m.url) || window.location.href, T);
  }, f = () => {
    c(window.location.href, {
      source: "popstate",
      ensureMainWindow: !0
    });
  }, b = () => {
    c(
      window.location.href,
      o.source === "unknown" ? { source: "currententrychange" } : o
    );
  };
  window.addEventListener("hashchange", p), window.addEventListener("popstate", f), (I = window.navigation) == null || I.addEventListener("navigate", h), (U = window.navigation) == null || U.addEventListener("currententrychange", b), oe.on_uninstall(() => {
    var v, T;
    window.removeEventListener("hashchange", p), window.removeEventListener("popstate", f), e && clearTimeout(e), (v = window.navigation) == null || v.removeEventListener("navigate", h), (T = window.navigation) == null || T.removeEventListener(
      "currententrychange",
      b
    );
  });
}
Cn();
const W = {
  SPINE_WIDTH: 50,
  // 脊宽度
  TITLE_SHOW_AT: 100
  // 🔥 核心配置：当未被遮盖范围剩 100px 时，标题才开始出现
}, N = window.React, En = window.Blueprint.Core.Menu, z = window.Blueprint.Core.MenuItem, Pe = window.Blueprint.Core.MenuDivider, ht = ({
  item: e,
  index: n,
  total: t,
  context: o,
  isCollapsed: i
}) => {
  const {
    toggleCollapsed: r,
    foldAll: s,
    unfoldAll: a,
    removeOtherTabs: c,
    removeToTheRightTabs: d,
    openInSidebar: u,
    togglePin: p
  } = o;
  return /* @__PURE__ */ N.createElement(En, null, /* @__PURE__ */ N.createElement(
    z,
    {
      icon: e.pin ? "pin" : "unpin",
      intent: e.pin ? "danger" : "none",
      onClick: () => {
        p(e.id);
      },
      text: e.pin ? "Unpin" : "Pin"
    }
  ), /* @__PURE__ */ N.createElement(Pe, null), /* @__PURE__ */ N.createElement(
    z,
    {
      disabled: e.pin,
      icon: "small-cross",
      text: "Close",
      tagName: "span",
      onClick: () => {
        Re(e.id);
      }
    }
  ), /* @__PURE__ */ N.createElement(
    z,
    {
      icon: "small-cross",
      text: "Close Others",
      onClick: () => {
        c(e.id);
      },
      disabled: t === 1
    }
  ), /* @__PURE__ */ N.createElement(
    z,
    {
      icon: "cross",
      onClick: () => {
        d(n);
      },
      text: "Close to the Right",
      disabled: n + 1 >= t
    }
  ), /* @__PURE__ */ N.createElement(Pe, null), /* @__PURE__ */ N.createElement(
    z,
    {
      icon: "duplicate",
      onClick: () => {
        $t(`[[${e.title}]]`);
      },
      text: "Copy Page Reference"
    }
  ), /* @__PURE__ */ N.createElement(Pe, null), /* @__PURE__ */ N.createElement(
    z,
    {
      icon: "add-column-right",
      onClick: () => {
        u(e.blockUid || e.pageUid);
      },
      text: "Open in Sidebar"
    }
  ), /* @__PURE__ */ N.createElement(Pe, null), /* @__PURE__ */ N.createElement(
    z,
    {
      text: i ? "Unfold Tab" : "Fold Tab",
      icon: i ? "menu-open" : "menu-closed",
      onClick: () => {
        r(e.id);
      }
    }
  ), /* @__PURE__ */ N.createElement(
    z,
    {
      text: "Fold All Tabs",
      icon: "collapse-all",
      onClick: () => {
        s();
      }
    }
  ), /* @__PURE__ */ N.createElement(
    z,
    {
      text: "Unfold All Tabs",
      icon: "expand-all",
      onClick: () => {
        a();
      }
    }
  ));
}, Be = "roam-stack-last-edited-block", et = `.${Be}`;
function tt(e, n, t = et) {
  if (!e)
    return;
  const o = (i) => {
    var r;
    e.querySelectorAll(t).forEach((s) => {
      s.classList.remove(Be);
    }), (r = i.closest(".rm-block-main")) == null || r.classList.add(Be), n(i);
  };
  return e.arrive("textarea", o), () => {
    e.unbindArrive("textarea", o);
  };
}
let Ee = () => {
};
function pt() {
  Ee();
  let e = "", n = "";
  const t = document.querySelector("#right-sidebar"), o = tt(
    t,
    (a) => {
      e = a.id;
    },
    et
  ), i = document.querySelector(".roam-main"), r = tt(
    i,
    (a) => {
      a.closest(".roam-body-main") && (n = a.id);
    },
    `.roam-body-main ${et}`
  ), s = (a) => {
    var d;
    [e, n].find(
      (u) => a.id === u
    ) && ((d = a.closest(".rm-block-main")) == null || d.classList.add(Be));
  };
  return document.arrive("div", s), Ee = () => {
    document.unbindArrive("div", s), o(), r();
  }, Ee;
}
oe.on_uninstall(() => {
  Ee();
});
function Rn() {
  Ee();
}
const L = window.React, On = window.React.useContext, Ye = window.React.useEffect, Ke = window.React.useRef, ve = window.Blueprint.Core.Button, gt = window.Blueprint.Core.Icon, xn = window.Blueprint.Core.ContextMenu, Xe = window.Blueprint.Core.Popover, bt = window.Blueprint.Core.PopoverInteractionKind, Qe = window.Blueprint.Core.Position, Pn = ({ item: e, index: n, total: t }) => {
  const o = On(qe);
  if (!o)
    throw new Error("PageCard must be used within StackProvider");
  const {
    focusPage: i,
    focusPageByUid: r,
    focusedIndex: s,
    pageWidth: a,
    isCollapsed: c,
    toggleCollapsed: d
  } = o, u = n < t - 1, p = s === n, h = Ke(null), f = c(e.id);
  Ye(() => {
    setTimeout(async () => {
      if (await window.roamAlphaAPI.ui.components.unmountNode({
        el: h.current
      }), !f) {
        if (e.blockUid !== e.pageUid) {
          window.roamAlphaAPI.ui.components.renderBlock({
            el: h.current,
            uid: e.blockUid,
            "zoom-path?": !0
          }), await new Promise((l) => setTimeout(l, 100));
          return;
        }
        window.roamAlphaAPI.ui.components.renderPage({
          el: h.current,
          uid: e.pageUid
        });
      }
    }, 50);
  }, [e.pageUid, e.blockUid, f]);
  const b = (l) => o.stack.slice(0, l).reduce((w, O) => {
    const P = c(O.id) ? W.SPINE_WIDTH : a;
    return w + (P - W.SPINE_WIDTH);
  }, 0), I = b(n), U = f ? W.SPINE_WIDTH : a, v = I + (U - W.TITLE_SHOW_AT), T = b(Math.max(n - 1, 0)), y = Ke(null), m = Ke("");
  return Ye(() => {
    m.current && !f && ot() && setTimeout(() => {
      var O;
      let w = y.current.querySelector(`[id$="${m.current}"]`);
      w || (w = y.current.querySelector(
        `[id$="${m.current.substr(-9)}"]`
      )), (O = w.closest(".rm-block-main")) == null || O.classList.add("roam-stack-last-edited-block");
    }, 200);
  }, [f]), Ye(() => {
    if (y.current)
      return tt(y.current, (l) => {
        if (m.current = l.id, !ot()) {
          m.current = "";
          return;
        }
      });
  }, []), /* @__PURE__ */ L.createElement(
    "div",
    {
      ref: y,
      onClick: (l) => {
        const w = l.target;
        if (["rm-zoom-item", "rm-zoom-item-content"].some((P) => w.classList.contains(P))) {
          const P = w.closest(".rm-zoom-item");
          if (P) {
            const $ = P.parentElement.children;
            if (Array.from($).indexOf(P) === 0) {
              xo(e.id);
              return;
            }
          }
        }
        i(n);
      },
      className: `roam-stack-card ${f ? "roam-stack-card-collapsed" : ""}`,
      style: {
        // 传递给 CSS
        "--title-trigger": `${v}`,
        "--overlap-start": `${T}`,
        // --- 核心 A: 标题透明度 ---
        // 范围：从 (可见宽度100px) 到 (可见宽度50px/完全折叠)
        // 距离差是 50px (SPINE_WIDTH ~ 100px)
        // 计算：(当前滚动 - 触发点) / 50
        //   "--title-opacity": `clamp(0, (var(--scroll-x) - var(--title-trigger)) / 50, 1)`,
        // --- 核心 B: 阴影透明度 ---
        // 一旦开始重叠，30px 内阴影显现
        "--shadow-opacity": n === 0 ? "0" : "clamp(0, (var(--scroll-x) - var(--overlap-start)) / 30, 1)",
        width: `${U}px`,
        // 你的老朋友 sticky left
        left: `${n * W.SPINE_WIDTH}px`,
        //   zIndex: index,
        cursor: u ? "pointer" : "default",
        // 左侧外阴影 (覆盖在前一页上的阴影)
        boxShadow: f ? "none" : `
            -10px 0 20px -5px rgba(0,0,0, calc(0.3 * var(--shadow-opacity))),
            -30px 0 50px -10px rgba(0,0,0, calc(0.1 * var(--shadow-opacity)))
          `
      }
    },
    /* @__PURE__ */ L.createElement(
      "div",
      {
        className: `roam-stack-card-content ${p ? "roam-stack-card-focused" : ""}`
      },
      /* @__PURE__ */ L.createElement(
        "div",
        {
          className: "roam-stack-card-spine",
          style: {
            width: `${W.SPINE_WIDTH}px`,
            lineHeight: `${W.SPINE_WIDTH}px`
          },
          onDoubleClick: (l) => {
            l.stopPropagation(), d(e.id);
          }
        },
        /* @__PURE__ */ L.createElement(
          "div",
          {
            className: "roam-stack-card-spine-buttons"
          },
          e.pin ? /* @__PURE__ */ L.createElement(
            ve,
            {
              minimal: !0,
              intent: e.pin ? "primary" : void 0,
              onClick: (l) => {
                l.stopPropagation();
                const { togglePin: w } = o;
                w(e.id);
              }
            },
            /* @__PURE__ */ L.createElement(gt, { icon: "pin", color: e.pin ? void 0 : "#ABB3BF" })
          ) : /* @__PURE__ */ L.createElement(
            ve,
            {
              icon: "cross",
              minimal: !0,
              onClick: (l) => {
                l.stopPropagation(), Re(e.id);
              }
            }
          )
        ),
        /* @__PURE__ */ L.createElement(
          "div",
          {
            className: "roam-stack-card-title",
            onContextMenu: (l) => {
              l.button === 2 && (l.preventDefault(), l.stopPropagation(), xn.show(
                /* @__PURE__ */ L.createElement(
                  ht,
                  {
                    item: e,
                    index: n,
                    total: t,
                    context: o,
                    isCollapsed: f
                  }
                ),
                { left: l.clientX, top: l.clientY },
                () => {
                }
              ));
            }
          },
          e.title
        ),
        f && /* @__PURE__ */ L.createElement(
          Xe,
          {
            content: /* @__PURE__ */ L.createElement("div", { className: "roam-stack-popover-content" }, "Unfold tab"),
            interactionKind: bt.HOVER,
            position: Qe.RIGHT,
            target: /* @__PURE__ */ L.createElement(
              ve,
              {
                minimal: !0,
                onClick: (l) => {
                  l.stopPropagation(), d(e.id);
                },
                className: "roam-stack-expand-btn"
              },
              /* @__PURE__ */ L.createElement(gt, { icon: "menu-open" })
            )
          }
        )
      ),
      /* @__PURE__ */ L.createElement(
        "div",
        {
          className: "roam-stack-card-main",
          style: {
            display: "flex",
            width: f ? 0 : Math.max(U - W.SPINE_WIDTH, 0)
          }
        },
        /* @__PURE__ */ L.createElement(
          "div",
          {
            className: "roam-stack-card-header",
            style: f ? {
              opacity: 0
            } : null
          },
          /* @__PURE__ */ L.createElement(
            Xe,
            {
              content: /* @__PURE__ */ L.createElement("div", { className: "roam-stack-popover-content" }, "Fold tab"),
              interactionKind: bt.HOVER,
              position: Qe.BOTTOM,
              target: /* @__PURE__ */ L.createElement(
                ve,
                {
                  minimal: !0,
                  icon: "menu-closed",
                  small: !0,
                  onClick: () => d(e.id)
                }
              )
            }
          ),
          /* @__PURE__ */ L.createElement(
            Xe,
            {
              autoFocus: !1,
              content: /* @__PURE__ */ L.createElement(
                ht,
                {
                  item: e,
                  index: n,
                  total: t,
                  context: o,
                  isCollapsed: f
                }
              ),
              position: Qe.BOTTOM_RIGHT,
              target: /* @__PURE__ */ L.createElement(ve, { minimal: !0, icon: "more", small: !0 })
            }
          )
        ),
        /* @__PURE__ */ L.createElement(
          "div",
          {
            onPointerDown: (l) => {
              var O;
              if (l.button !== 0)
                return;
              const w = l.target;
              if (w.classList.contains("rm-page-ref")) {
                const P = (O = w.closest("[data-link-uid]")) == null ? void 0 : O.getAttribute("data-link-uid");
                P && r(P);
                return;
              }
              _e(e.id);
            },
            className: "roam-stack-card-body",
            ref: h
          }
        )
      )
    )
  );
}, re = window.React, Dn = window.React.useContext, An = window.React.useEffect, ce = window.React.useRef, wt = window.React.useState, Ln = window.Blueprint.Core.Tooltip, $n = window.Blueprint.Core.Position, Bn = () => {
  const e = Dn(qe);
  if (!e)
    throw new Error("Minimap must be used within StackProvider");
  const { stack: n, containerRef: t, pageWidth: o, collapsedNonce: i, focusedIndex: r } = e, s = ce(null), a = ce(null), c = ce(!1), [d, u] = wt(!1), p = ce(0), h = ce(0), [f, b] = wt(""), I = ce(-1), U = Ln, v = () => {
    const l = t.current;
    if (!l || !s.current || !a.current || n.length === 0)
      return null;
    const w = l.clientWidth, O = l.scrollWidth, P = s.current.clientWidth - 8;
    if (O <= w)
      return s.current.style.display = "none", null;
    s.current.style.display = "block";
    const $ = P / O, H = w * $;
    a.current.style.width = `${H}px`;
    const g = l.scrollLeft * $;
    return a.current.style.transform = `translateX(${g}px)`, {
      scaleRatio: $,
      minimapWidth: P,
      thumbWidth: H,
      contentWidth: O,
      viewportWidth: w
    };
  }, T = () => {
    var P;
    if (c.current)
      return;
    const l = v();
    if (!l)
      return;
    const O = (((P = t.current) == null ? void 0 : P.scrollLeft) || 0) * l.scaleRatio;
    a.current && (a.current.style.transform = `translateX(${O}px)`);
  }, y = (l) => {
    if (l.preventDefault(), l.stopPropagation(), !a.current || !t.current)
      return;
    c.current = !0, u(!0), p.current = l.clientX;
    const O = window.getComputedStyle(a.current).transform;
    let P = 0;
    O && O !== "none" && (P = new DOMMatrix(O).m41), h.current = P;
    const $ = v();
    if ($) {
      const S = P / $.scaleRatio + $.viewportWidth / 2, E = Math.floor(S / o);
      n[E] && (b(n[E].title), I.current = E);
    }
    const H = (g) => {
      if (!c.current || !t.current || !s.current || !a.current)
        return;
      const S = v();
      if (!S)
        return;
      const E = g.clientX - p.current;
      let B = h.current + E;
      const pe = S.minimapWidth - S.thumbWidth;
      B < 0 && (B = 0), B > pe && (B = pe), a.current.style.transform = `translateX(${B}px)`;
      const ee = t.current.style.scrollBehavior;
      t.current.style.scrollBehavior = "auto";
      const X = B / S.scaleRatio;
      t.current.scrollLeft = X, t.current.style.scrollBehavior = ee || "smooth";
      const ge = X + S.viewportWidth / 2, ae = Math.floor(ge / o);
      if (ae !== I.current) {
        I.current = ae;
        const be = n[ae];
        be && b(be.title);
      }
    }, se = () => {
      c.current = !1, u(!1), document.removeEventListener("mousemove", H), document.removeEventListener("mouseup", se);
    };
    document.addEventListener("mousemove", H), document.addEventListener("mouseup", se);
  }, m = (l) => {
    if (l.target === a.current)
      return;
    const w = v();
    if (!w || !s.current || !t.current)
      return;
    const O = s.current.getBoundingClientRect();
    let $ = l.clientX - O.left - 6 - w.thumbWidth / 2;
    const H = w.minimapWidth - w.thumbWidth;
    $ < 0 && ($ = 0), $ > H && ($ = H), t.current.style.scrollBehavior = "smooth", t.current.scrollLeft = $ / w.scaleRatio, setTimeout(() => {
      t.current && (t.current.style.scrollBehavior = "auto");
    }, 300);
  };
  return An(() => {
    const l = t.current;
    if (l)
      return l.addEventListener("scroll", T), window.addEventListener("resize", v), setTimeout(v, 0), () => {
        l.removeEventListener("scroll", T), window.removeEventListener("resize", v);
      };
  }, [n.length, i]), n.length === 0 ? null : /* @__PURE__ */ re.createElement(
    "div",
    {
      ref: s,
      id: "roam-stack-indicator",
      className: "roam-stack-minimap",
      onMouseDown: m
    },
    /* @__PURE__ */ re.createElement("div", { style: { width: "100%", height: "100%" } }, /* @__PURE__ */ re.createElement("div", { className: "roam-stack-minimap-preview" }, n.map((l, w) => /* @__PURE__ */ re.createElement(
      U,
      {
        key: l.id,
        content: l.title,
        position: $n.TOP,
        hoverOpenDelay: 0,
        transitionDuration: 100,
        disabled: d
      },
      /* @__PURE__ */ re.createElement(
        "div",
        {
          className: `minimap-block ${w === r ? "minimap-block-focused" : ""}`
        }
      )
    ))), /* @__PURE__ */ re.createElement(
      "div",
      {
        ref: a,
        className: "minimap-thumb",
        onMouseDown: y
      }
    ))
  );
}, le = window.React, Un = window.React.useContext, Nn = () => {
  const e = Un(qe);
  if (!e)
    throw new Error("Layout must be used within StackProvider");
  const { stack: n, containerRef: t, handleScroll: o, hintRef: i } = e;
  return /* @__PURE__ */ le.createElement(
    "div",
    {
      className: "roam-stack-layout"
    },
    /* @__PURE__ */ le.createElement(Bn, null),
    /* @__PURE__ */ le.createElement(
      "div",
      {
        ref: t,
        onScroll: o,
        className: "roam-stack-layout-container",
        style: {
          "--scroll-x": "0",
          "--scroll-max": "0"
        }
      },
      n.length === 0 && /* @__PURE__ */ le.createElement(
        "div",
        {
          className: "roam-stack-empty-state"
        },
        /* @__PURE__ */ le.createElement(
          "div",
          {
            className: "roam-stack-empty-text"
          },
          "No tabs"
        )
      ),
      n.map((r, s) => /* @__PURE__ */ le.createElement(
        Pn,
        {
          key: r.id,
          item: r,
          index: s,
          total: n.length
        }
      ))
    )
  );
}, nt = window.React, Ve = window.React.useRef, Mn = window.React.createContext, vt = window.React.useState, Te = window.React.useEffect, qe = Mn(
  void 0
), Wn = ({
  children: e,
  tabs: n,
  active: t,
  pageWidth: o,
  onTogglePin: i,
  onRemoveOtherTabs: r,
  onRemoveToTheRightTabs: s,
  onOpenInSidebar: a,
  initialCollapsedUids: c
}) => {
  const d = Ve(null), u = Ve(null), p = n, h = p.findIndex((g) => g.id === t), f = h, [b, I] = vt(
    new Set(c || [])
  ), [U, v] = vt(0), T = (g) => b.has(g), y = () => {
    const g = new Set(p.map((S) => S.id));
    I(g), Je(Array.from(g)), v((S) => S + 1);
  }, m = () => {
    I(/* @__PURE__ */ new Set()), Je([]), v((g) => g + 1);
  }, l = (g) => {
    const S = d.current;
    if (!S)
      return;
    const E = S.children[g];
    if (E) {
      const ee = S.getBoundingClientRect(), X = E.getBoundingClientRect(), ge = X.left >= ee.left - 5 && X.right <= ee.right + 5;
      let ae = !1;
      const be = S.children[g + 1];
      if (be && be.getBoundingClientRect().left < X.right - 10 && (ae = !0), ge && !ae)
        return;
    }
    const B = p.slice(0, g).reduce((ee, X) => {
      const ge = T(X.id) ? W.SPINE_WIDTH : o;
      return ee + (ge - W.SPINE_WIDTH);
    }, 0);
    S.scrollTo({
      left: B,
      behavior: "smooth"
    });
    const pe = () => {
      setTimeout(() => {
      }, 500);
    };
    "onscrollend" in S ? S.addEventListener("scrollend", pe, {
      once: !0
    }) : setTimeout(pe, 20);
  }, w = (g) => {
    const S = b.has(g);
    if (I((E) => {
      const B = new Set(E);
      return B.has(g) ? B.delete(g) : B.add(g), Je(Array.from(B)), B;
    }), v((E) => E + 1), S) {
      const E = p.findIndex((B) => B.id === g);
      E > -1 && (l(E), setTimeout(() => {
        l(E);
      }, 300));
    }
  }, O = (g) => {
    l(g);
  }, P = (g, S) => {
    if (!u.current)
      return;
    const E = g - S;
    if (E > 10) {
      const B = Math.min(E / 200, 1);
      u.current.style.opacity = `${B}`;
    } else
      u.current.style.opacity = "0";
  }, $ = () => {
    if (d.current) {
      const g = d.current, S = g.scrollWidth - g.clientWidth, E = g.scrollLeft;
      g.style.setProperty("--scroll-max", `${S}`), g.style.setProperty("--scroll-x", `${E}`), P(S, E);
    }
  }, H = (g) => {
    if (d.current) {
      const S = g.currentTarget, E = S.scrollLeft, B = S.scrollWidth - S.clientWidth;
      S.style.setProperty("--scroll-x", `${E}`), P(B, E);
    }
  }, se = Ve(() => {
  });
  return se.current = () => {
    $(), h > -1 && l(h);
  }, Te(() => {
    const g = d.current;
    if (!g)
      return;
    $();
    const S = new ResizeObserver(() => {
      se.current();
    });
    return S.observe(g), () => S.disconnect();
  }, []), Te(() => {
    setTimeout($, 100);
  }, [p.length]), Te(() => {
    setTimeout($, 0);
  }, [b]), Te(() => {
    l(h);
  }, [h]), /* @__PURE__ */ nt.createElement(
    qe.Provider,
    {
      value: {
        stack: p,
        focusPage: O,
        containerRef: d,
        handleScroll: H,
        focusedIndex: f,
        hintRef: u,
        pageWidth: o,
        foldOffset: o - W.SPINE_WIDTH,
        titleTriggerOffset: o - W.TITLE_SHOW_AT,
        focusPageByUid: (g) => {
          const S = p.findIndex((E) => E.pageUid === g);
          S > -1 && O(S);
        },
        togglePin: (g) => {
          i(g);
        },
        removeOtherTabs: (g) => {
          r(g);
        },
        removeToTheRightTabs: (g) => {
          s(g);
        },
        openInSidebar: (g) => {
          a(g);
        },
        isCollapsed: T,
        toggleCollapsed: w,
        collapsedNonce: U,
        foldAll: y,
        unfoldAll: m
      }
    },
    e
  );
};
let St = !1;
const qn = (e) => {
  var r;
  Nt(async (s, a) => {
    var T, y;
    const c = async (m, l) => {
      A(m, l);
    };
    if (!s) {
      A(e.tabs, void 0);
      return;
    }
    if (a != null && a.fromTabSwitch)
      return;
    const d = s;
    if (!d)
      return;
    let u = await window.roamAlphaAPI.data.async.q(
      `[:find [?e ?t]  :where [?b :block/uid "${d}"] [?b :block/page ?p]
     [?p :block/uid ?e]
     [?p :node/title ?t]
    ]`
    ), p = d;
    if (!u) {
      const m = await window.roamAlphaAPI.data.async.q(
        `[:find ?t . :where [?b :block/uid "${d}"] [?b :node/title ?t]
      ]`
      );
      u = [d, m];
    }
    const [h, f] = u, b = {
      uid: h,
      title: f,
      blockUid: p
    };
    if (a != null && a.fromSearchSelection) {
      const m = ft(e.tabs, b);
      if (m) {
        await c(e.tabs, m), await ie(m);
        return;
      }
    }
    if (a != null && a.ensureMainWindow && e.currentTab) {
      const m = Xt(e.currentTab, h);
      if (m) {
        const l = e.tabs.map(
          (w) => w.tabId === e.currentTab.tabId ? m : w
        );
        await c(l, m), await ie(m);
        return;
      }
    }
    const I = e.tabs.findIndex(
      (m) => {
        var l;
        return m.tabId === ((l = e.currentTab) == null ? void 0 : l.tabId);
      }
    );
    if (!!(a != null && a.fromSearchSelection) && !We() && !((T = e.currentTab) != null && T.pin) ? !!a.forceOpenInNewTab : !!(St || a != null && a.forceOpenInNewTab || We() || (y = e.currentTab) != null && y.pin)) {
      const m = te(b), l = [...e.tabs, m];
      await c(l, m);
    } else if (e.tabs.length === 0) {
      const m = te(b);
      await c([m], m);
    } else if (e.currentTab)
      if (I !== -1 && e.tabs[I].uid === h) {
        const m = te(
          b,
          e.tabs[I]
        ), l = e.tabs.map(
          (w) => w.tabId === m.tabId ? m : w
        );
        await c(l, m);
      } else {
        const m = e.tabs.map((w) => w.tabId !== e.currentTab.tabId ? w : Kt(w, b)), l = m.find((w) => w.tabId === e.currentTab.tabId) || te(b, e.currentTab);
        await c(m, l);
      }
    else {
      const m = te(b), l = [...e.tabs, m];
      await c(l, m);
    }
  }), Te(() => {
    const s = (a) => {
      St = a.ctrlKey || a.metaKey;
    };
    return document.addEventListener("pointerdown", s), () => {
      document.removeEventListener("pointerdown", s);
    };
  }, []);
  const n = (s) => {
    const a = e.tabs.map(
      (d) => d.tabId === s ? { ...d, pin: !d.pin } : d
    ), c = a.find((d) => d.tabId === s);
    A(a, c || e.currentTab);
  }, t = (s) => {
    const a = e.tabs.filter((d) => d.pin || d.tabId === s), c = a.find((d) => d.tabId === s);
    A(a, c || e.currentTab);
  }, o = (s) => {
    const a = [
      ...e.tabs.slice(0, s + 1),
      ...e.tabs.slice(s + 1).filter((u) => u.pin)
    ], c = a.findIndex(
      (u) => {
        var p;
        return u.tabId === ((p = e.currentTab) == null ? void 0 : p.tabId);
      }
    ), d = c === -1 || c > s ? a[s] : e.currentTab;
    A(a, d);
  }, i = (s) => {
    window.roamAlphaAPI.ui.rightSidebar.addWindow({
      window: {
        "block-uid": s,
        type: "outline"
      }
    });
  };
  return /* @__PURE__ */ nt.createElement(
    Wn,
    {
      tabs: e.tabs.map((s) => ({
        id: s.tabId,
        pageUid: s.uid,
        title: s.title,
        blockUid: s.blockUid,
        pin: s.pin
      })),
      active: (r = e.currentTab) == null ? void 0 : r.tabId,
      pageWidth: e.pageWidth,
      onTogglePin: n,
      onRemoveOtherTabs: t,
      onRemoveToTheRightTabs: o,
      onOpenInSidebar: i,
      initialCollapsedUids: e.collapsedUids
    },
    /* @__PURE__ */ nt.createElement(Nn, null)
  );
}, Ue = window.React, Hn = window.ReactDOM, _n = "roam-main", Ne = "roam-stack-container";
oe.on_uninstall(() => {
  Y && (Y.unmount(), Y = null), F && F.remove();
});
let Y = null, F = null;
const Fn = () => {
  const e = document.querySelector(`.${Ne}`);
  e && e.classList.remove("roam-stack-container-hide");
}, zn = () => {
  const e = document.querySelector(`.${Ne}`);
  e && e.classList.add("roam-stack-container-hide");
}, Yn = async (e) => {
  e ? Fn() : zn();
}, Kn = (e, n, t, o, i = []) => {
  if (Yn(t), e !== "stack") {
    Y && (Y.unmount(), Y = null), F && F.remove();
    return;
  }
  const r = document.querySelector(`.${_n}`);
  F = document.querySelector(`.${Ne}`), r && (F || (F = document.createElement("div"), F.className = Ne, r.appendChild(F)), Y || (Y = Hn.createRoot(F)), Y.render(
    /* @__PURE__ */ Ue.createElement(Xn, null, /* @__PURE__ */ Ue.createElement(
      qn,
      {
        pageWidth: o,
        tabs: n,
        currentTab: t,
        collapsedUids: i
      }
    ))
  ));
};
function Xn(e) {
  return /* @__PURE__ */ Ue.createElement(Ue.Fragment, null, e.children);
}
const D = window.React, Qn = window.React.Component, Vn = window.React.useReducer, jn = window.ReactDOM, { useEffect: kt } = D, je = window.Blueprint.Core.Button, Tt = window.Blueprint.Core.Icon, de = window.Blueprint.Core.MenuItem, Gn = window.Blueprint.Core.Menu, Jn = window.Blueprint.Core.ContextMenu, Ge = window.Blueprint.Core.MenuDivider, It = "roam-tabs";
function Zn(e, n = 500) {
  let t = setTimeout(() => {
  }, 0);
  return (...o) => {
    clearTimeout(t), t = setTimeout(() => {
      e(...o);
    }, n);
  };
}
let G = null, K = null, Mt = () => {
};
const eo = async (e, n) => {
  const t = document.querySelector(".roam-main");
  K = t.querySelector("." + It);
  const o = t.querySelector(".roam-body-main");
  K ? G == null || G.render(/* @__PURE__ */ D.createElement(yt, { tabs: e, currentTab: n })) : (K = document.createElement("div"), K.className = It, t.insertBefore(K, o), G = jn.createRoot(K), G.render(/* @__PURE__ */ D.createElement(yt, { tabs: e, currentTab: n }))), setTimeout(() => {
  }, 100);
};
let Ie;
const Wt = (e) => {
  Ie = e, Mt();
};
function yt(e) {
  const { tabs: n, currentTab: t } = e;
  Mt = Vn((r) => r + 1, 0)[1];
  const o = Ze(async (r, s, a, c) => {
    if (r) {
      const d = x(), u = (d == null ? void 0 : d.tabs) || [], p = (d == null ? void 0 : d.activeTab) || t, f = !!(c != null && c.fromSearchSelection) && !We() && !(p != null && p.pin) ? !!c.forceOpenInNewTab : !!(Ct || c != null && c.forceOpenInNewTab || p != null && p.pin || We()), b = {
        uid: r,
        title: s,
        blockUid: a
      }, I = te(b), U = ao(I);
      I.blockUid = U;
      const v = {
        ...b,
        blockUid: U
      };
      if (c != null && c.fromSearchSelection) {
        const l = ft(
          u,
          v
        );
        if (l) {
          A(u, l), ie(l);
          return;
        }
      }
      const T = p ? u.findIndex((l) => l.tabId === p.tabId) : -1;
      let y, m;
      if (f)
        y = [...u, I], m = I;
      else if (u.length === 0)
        y = [I], m = I;
      else if (T !== -1 && u[T].uid === I.uid) {
        const l = te(
          v,
          u[T]
        );
        y = u.map(
          (w) => w.tabId === l.tabId ? l : w
        ), m = l;
      } else if (!p)
        y = [...u, I], m = I;
      else if (T !== -1) {
        const l = Kt(u[T], v);
        y = u.map(
          (w, O) => O === T ? l : w
        ), m = l;
      } else
        y = u, m = p;
      A(y, m);
    } else
      A(n, void 0);
  }), i = Ze(function(s) {
    Ct = s.ctrlKey || s.metaKey;
  });
  return kt(() => {
    if (document.querySelector(".rm-article-wrapper"))
      return () => {
      };
  }, [n, t]), Nt((r, s) => {
    var d;
    if (!r) {
      A(n, void 0);
      return;
    }
    if (s != null && s.fromTabSwitch)
      return;
    const a = no(r);
    if (s != null && s.ensureMainWindow && t) {
      const u = Xt(t, a);
      if (u) {
        const h = (((d = x()) == null ? void 0 : d.tabs) || n).map(
          (f) => f.tabId === t.tabId ? u : f
        );
        A(h, u), ie(u);
        return;
      }
    }
    const c = oo(a);
    o(a, c, r, s);
  }), kt(() => (document.addEventListener("pointerdown", i), () => {
    document.removeEventListener("pointerdown", i);
  }), []), D.useEffect(() => {
    const r = () => {
      Wt(void 0);
    };
    return document.addEventListener("dragend", r), () => {
      document.removeEventListener("dragend", r);
    };
  }, []), /* @__PURE__ */ D.createElement(D.Fragment, null, /* @__PURE__ */ D.createElement("div", { className: "roam-tabs-container" }, n.map((r, s) => {
    const a = r.tabId === (t == null ? void 0 : t.tabId);
    return /* @__PURE__ */ D.createElement(
      to,
      {
        key: r.tabId,
        active: a,
        index: s,
        tab: r,
        tabs: n,
        currentTab: t
      }
    );
  })));
}
class to extends Qn {
  constructor() {
    super(...arguments), this.state = {
      className: ""
    };
  }
  render() {
    const { active: n, tab: t, index: o, tabs: i, currentTab: r } = this.props;
    return /* @__PURE__ */ D.createElement(
      je,
      {
        style: {
          outline: "none"
        },
        intent: n ? "primary" : "none",
        outlined: !0,
        small: !0,
        draggable: !0,
        onDragStart: (s) => {
          s.dataTransfer.effectAllowed = "move", Wt(t), s.stopPropagation();
        },
        onDragOver: (s) => {
          if (s.preventDefault(), s.dataTransfer.effectAllowed = "move", Ie) {
            const a = {
              ...Ie,
              pin: t.pin
            };
            so(t, a, i, r);
          }
        },
        "data-dragging": Ie === t,
        className: `${this.state.className} ${n ? "roam-tab-active" : ""} ${Ie === t ? "ring-1 " : ""} roam-tab`,
        onContextMenu: (s) => {
          s.preventDefault(), s.stopPropagation(), Jn.show(
            /* @__PURE__ */ D.createElement(Gn, null, /* @__PURE__ */ D.createElement(
              de,
              {
                text: "Close",
                tagName: "span",
                onClick: () => {
                  Re(t.tabId);
                }
              }
            ), /* @__PURE__ */ D.createElement(
              de,
              {
                text: "Close Others",
                onClick: () => {
                  Zt(t.tabId);
                },
                disabled: i.length === 1
              }
            ), /* @__PURE__ */ D.createElement(
              de,
              {
                onClick: () => {
                  en(o);
                },
                text: "Close to the Right",
                disabled: o + 1 >= i.length
              }
            ), /* @__PURE__ */ D.createElement(Ge, null), /* @__PURE__ */ D.createElement(
              de,
              {
                onClick: () => {
                  $t(`[[${t.title}]]`);
                },
                text: "Copy Page Reference"
              }
            ), /* @__PURE__ */ D.createElement(Ge, null), /* @__PURE__ */ D.createElement(
              de,
              {
                onClick: () => {
                  Et(t.uid);
                },
                text: "Open in Sidebar"
              }
            ), /* @__PURE__ */ D.createElement(Ge, null), /* @__PURE__ */ D.createElement(
              de,
              {
                onClick: () => {
                  it(t.tabId);
                },
                text: t.pin ? "Unpin" : "Pin"
              }
            )),
            { left: s.clientX, top: s.clientY },
            () => {
            }
          );
        },
        onClick: (s) => {
          if (s.shiftKey) {
            Et(t.uid);
            return;
          }
          _e(t.tabId);
        },
        rightIcon: t.pin ? /* @__PURE__ */ D.createElement(
          je,
          {
            minimal: !0,
            small: !0,
            intent: "danger",
            icon: /* @__PURE__ */ D.createElement(Tt, { icon: "pin" }),
            onClickCapture: (s) => {
              s.preventDefault(), s.stopPropagation(), it(t.tabId);
            }
          }
        ) : /* @__PURE__ */ D.createElement(
          je,
          {
            minimal: !0,
            small: !0,
            icon: /* @__PURE__ */ D.createElement(Tt, { color: "#ABB3BF", icon: "small-cross" }),
            onClickCapture: (s) => {
              s.preventDefault(), s.stopPropagation(), Re(t.tabId);
            }
          }
        ),
        text: /* @__PURE__ */ D.createElement(
          "div",
          {
            style: {
              display: "inline-block",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              minWidth: 100,
              maxWidth: 200
            }
          },
          t.title
        )
      }
    );
  }
}
let Ct = !1;
function no(e) {
  return window.roamAlphaAPI.q(`
[
    :find ?e .
    :where
     [?b :block/uid "${e}"]
     [?b :block/page ?p]
     [?p :block/uid ?e]
]
`) || e;
}
function oo(e) {
  return window.roamAlphaAPI.q(`
[
    :find ?e .
    :where
     [?b :block/uid "${e}"]
     [?b :node/title ?e]
]
`);
}
function io(e, n) {
  if (tn()) {
    G && (G.unmount(), G = null), K && (K.remove(), K = null);
    return;
  }
  eo(e, n);
}
function Et(e) {
  window.roamAlphaAPI.ui.rightSidebar.addWindow({
    window: {
      "block-uid": e,
      type: "outline"
    }
  });
}
const so = Zn(
  (e, n, t, o) => {
    const i = t.findIndex((c) => c.tabId === e.tabId), r = t.findIndex((c) => c.tabId === n.tabId), s = [...t];
    s.splice(r, 1);
    const a = [
      ...s.slice(0, i),
      n,
      ...s.slice(i)
    ];
    A(a, o);
  },
  10
);
function ao(e) {
  return window.roamAlphaAPI.q(`
  [
    :find ?e .
    :where
     [?e :block/uid "${e.blockUid}"]
     [?p :block/uid "${e.uid}"]
     [?e :block/page ?p]
  ]`) ? e.blockUid : e.uid;
}
function ro(e, n, t) {
  return e = e.slice(), e.splice(t < 0 ? e.length + t : t, 0, e.splice(n, 1)[0]), e;
}
function De(e) {
  const n = window.getComputedStyle(e);
  return Math.max(parseInt(n["margin-top"], 10), parseInt(n["margin-bottom"], 10)) + e.getBoundingClientRect().height;
}
function co(e) {
  return e.touches && e.touches.length || e.changedTouches && e.changedTouches.length;
}
function _(e, n = 0, t = 0) {
  if (e) {
    if (n === null || t === null) {
      e.style.removeProperty("transform");
      return;
    }
    e.style.transform = `translate(${t}px, ${n}px)`;
  }
}
function Se(e, n, t) {
  e && (e.style.transition = `transform ${n}ms${t ? ` ${t}` : ""}`);
}
function lo(e, n) {
  let t = 0, o = e.length - 1, i;
  for (; t <= o; ) {
    if (i = Math.floor((o + t) / 2), !e[i + 1] || e[i] <= n && e[i + 1] >= n)
      return i;
    e[i] < n && e[i + 1] < n ? t = i + 1 : o = i - 1;
  }
  return -1;
}
const Ae = (e) => {
  let n = [], t = null;
  const o = (...i) => {
    n = i, !t && (t = requestAnimationFrame(() => {
      t = null, e(...n);
    }));
  };
  return o.cancel = () => {
    t && cancelAnimationFrame(t);
  }, o;
};
function Rt(e, n) {
  const t = [
    "input",
    "textarea",
    "select",
    "option",
    "optgroup",
    "video",
    "audio",
    "button",
    "a"
  ], o = [
    "button",
    "link",
    "checkbox",
    "radio",
    "switch",
    "tab"
  ];
  if (!e || !n)
    return !1;
  for (; e !== n; ) {
    if (e.getAttribute("data-movable-handle"))
      return !1;
    if (t.includes(e.tagName.toLowerCase()))
      return !0;
    const i = e.getAttribute("role");
    if (i && o.includes(i.toLowerCase()) || e.tagName.toLowerCase() === "label" && e.hasAttribute("for"))
      return !0;
    e.tagName && (e = e.parentElement);
  }
  return !1;
}
const ue = window.React, uo = window.ReactDOM, Q = 200, V = 10, j = 10;
class qt extends ue.Component {
  constructor(t) {
    super(t);
    k(this, "listRef", ue.createRef());
    k(this, "ghostRef", ue.createRef());
    k(this, "topOffsets", []);
    k(this, "itemTranslateOffsets", []);
    k(this, "initialYOffset", 0);
    k(this, "lastScroll", 0);
    k(this, "lastYOffset", 0);
    k(this, "lastListYOffset", 0);
    k(this, "dropTimeout");
    k(this, "needle", -1);
    k(this, "afterIndex", -2);
    k(this, "state", {
      itemDragged: -1,
      itemDraggedOutOfBounds: -1,
      selectedItem: -1,
      initialX: 0,
      initialY: 0,
      targetX: 0,
      targetY: 0,
      targetHeight: 0,
      targetWidth: 0,
      liveText: "",
      scrollingSpeed: 0,
      scrollWindow: !1
    });
    k(this, "schdOnMouseMove");
    k(this, "schdOnTouchMove");
    k(this, "schdOnEnd");
    k(this, "doScrolling", () => {
      const { scrollingSpeed: t, scrollWindow: o } = this.state, i = this.listRef.current;
      window.requestAnimationFrame(() => {
        o ? window.scrollTo(window.pageXOffset, window.pageYOffset + t * 1.5) : i.scrollTop += t, t !== 0 && this.doScrolling();
      });
    });
    k(this, "getChildren", () => this.listRef && this.listRef.current ? Array.from(this.listRef.current.children) : (console.warn("No items found in the List container. Did you forget to pass & spread the `props` param in renderList?"), []));
    k(this, "calculateOffsets", () => {
      this.topOffsets = this.getChildren().map((t) => t.getBoundingClientRect().top), this.itemTranslateOffsets = this.getChildren().map((t) => De(t));
    });
    k(this, "getTargetIndex", (t) => this.getChildren().findIndex((o) => o === t.target || o.contains(t.target)));
    k(this, "onMouseOrTouchStart", (t) => {
      this.dropTimeout && this.state.itemDragged > -1 && (window.clearTimeout(this.dropTimeout), this.finishDrop());
      const o = co(t);
      if (!o && t.button !== 0)
        return;
      const i = this.getTargetIndex(t);
      if (i === -1 || this.props.disabled || // @ts-ignore
      this.props.values[i] && this.props.values[i].disabled) {
        this.state.selectedItem !== -1 && (this.setState({ selectedItem: -1 }), this.finishDrop());
        return;
      }
      const r = this.getChildren()[i], s = r.querySelector("[data-movable-handle]");
      if (!(s && !s.contains(t.target)) && !Rt(t.target, r)) {
        if (t.preventDefault(), this.props.beforeDrag && this.props.beforeDrag({
          elements: this.getChildren(),
          index: i
        }), o) {
          const a = { passive: !1 };
          r.style.touchAction = "none", document.addEventListener("touchend", this.schdOnEnd, a), document.addEventListener("touchmove", this.schdOnTouchMove, a), document.addEventListener("touchcancel", this.schdOnEnd, a);
        } else {
          document.addEventListener("mousemove", this.schdOnMouseMove), document.addEventListener("mouseup", this.schdOnEnd);
          const a = this.getChildren()[this.state.itemDragged];
          a && a.style && (a.style.touchAction = "");
        }
        this.onStart(r, o ? t.touches[0].clientX : t.clientX, o ? t.touches[0].clientY : t.clientY, i);
      }
    });
    k(this, "getYOffset", () => {
      const t = this.listRef.current ? this.listRef.current.scrollTop : 0;
      return window.pageYOffset + t;
    });
    k(this, "onStart", (t, o, i, r) => {
      this.state.selectedItem > -1 && (this.setState({ selectedItem: -1 }), this.needle = -1);
      const s = t.getBoundingClientRect(), a = window.getComputedStyle(t);
      this.calculateOffsets(), this.initialYOffset = this.getYOffset(), this.lastYOffset = window.pageYOffset, this.lastListYOffset = this.listRef.current.scrollTop, this.setState({
        itemDragged: r,
        targetX: s.left - parseInt(a["margin-left"], 10),
        targetY: s.top - parseInt(a["margin-top"], 10),
        targetHeight: s.height,
        targetWidth: s.width,
        initialX: o,
        initialY: i
      });
    });
    k(this, "onMouseMove", (t) => {
      t.cancelable && t.preventDefault(), this.onMove(t.clientX, t.clientY);
    });
    k(this, "onTouchMove", (t) => {
      t.cancelable && t.preventDefault(), this.onMove(t.touches[0].clientX, t.touches[0].clientY);
    });
    k(this, "onWheel", (t) => {
      this.state.itemDragged < 0 || (this.lastScroll = this.listRef.current.scrollTop += t.deltaY, this.moveOtherItems());
    });
    k(this, "onMove", (t, o) => {
      if (this.state.itemDragged === -1)
        return null;
      _(this.ghostRef.current, o - this.state.initialY, this.props.lockVertically ? 0 : t - this.state.initialX), this.autoScrolling(o, o - this.state.initialY), this.moveOtherItems();
    });
    k(this, "moveOtherItems", () => {
      const t = this.ghostRef.current.getBoundingClientRect(), o = t.top + t.height / 2, i = De(this.getChildren()[this.state.itemDragged]), r = this.getYOffset();
      this.initialYOffset !== r && (this.topOffsets = this.topOffsets.map((s) => s - (r - this.initialYOffset)), this.initialYOffset = r), this.isDraggedItemOutOfBounds() && this.props.removableByMove ? this.afterIndex = this.topOffsets.length + 1 : this.afterIndex = lo(this.topOffsets, o), this.animateItems(this.afterIndex === -1 ? 0 : this.afterIndex, this.state.itemDragged, i);
    });
    k(this, "autoScrolling", (t, o) => {
      const { top: i, bottom: r, height: s } = this.listRef.current.getBoundingClientRect(), a = window.innerHeight || document.documentElement.clientHeight;
      if (r > a && a - t < Q && o > j)
        this.setState({
          scrollingSpeed: Math.min(Math.round((Q - (a - t)) / V), Math.round((o - j) / V)),
          scrollWindow: !0
        });
      else if (i < 0 && t < Q && o < -j)
        this.setState({
          scrollingSpeed: Math.max(Math.round((Q - t) / -V), Math.round((o + j) / V)),
          scrollWindow: !0
        });
      else if (this.state.scrollWindow && this.state.scrollingSpeed !== 0 && this.setState({ scrollingSpeed: 0, scrollWindow: !1 }), s + 20 < this.listRef.current.scrollHeight) {
        let c = 0;
        t - i < Q && o < -j ? c = Math.max(Math.round((Q - (t - i)) / -V), Math.round((o + j) / V)) : r - t < Q && o > j && (c = Math.min(Math.round((Q - (r - t)) / V), Math.round((o - j) / V))), this.state.scrollingSpeed !== c && this.setState({ scrollingSpeed: c });
      }
    });
    k(this, "animateItems", (t, o, i, r = !1) => {
      this.getChildren().forEach((s, a) => {
        if (Se(s, this.props.transitionDuration), o === a && r) {
          if (o === t)
            return _(s, null);
          _(s, o < t ? this.itemTranslateOffsets.slice(o + 1, t + 1).reduce((c, d) => c + d, 0) : this.itemTranslateOffsets.slice(t, o).reduce((c, d) => c + d, 0) * -1);
        } else
          o < t && a > o && a <= t ? _(s, -i) : a < o && o > t && a >= t ? _(s, i) : _(s, null);
      });
    });
    k(this, "isDraggedItemOutOfBounds", () => {
      const t = this.getChildren()[this.state.itemDragged].getBoundingClientRect(), o = this.ghostRef.current.getBoundingClientRect();
      return Math.abs(t.left - o.left) > o.width ? (this.state.itemDraggedOutOfBounds === -1 && this.setState({ itemDraggedOutOfBounds: this.state.itemDragged }), !0) : (this.state.itemDraggedOutOfBounds > -1 && this.setState({ itemDraggedOutOfBounds: -1 }), !1);
    });
    k(this, "onEnd", (t) => {
      t.cancelable && t.preventDefault(), document.removeEventListener("mousemove", this.schdOnMouseMove), document.removeEventListener("touchmove", this.schdOnTouchMove), document.removeEventListener("mouseup", this.schdOnEnd), document.removeEventListener("touchup", this.schdOnEnd), document.removeEventListener("touchcancel", this.schdOnEnd);
      const o = this.props.removableByMove && this.isDraggedItemOutOfBounds();
      !o && this.props.transitionDuration > 0 && this.afterIndex !== -2 && Ae(() => {
        Se(this.ghostRef.current, this.props.transitionDuration, "cubic-bezier(.2,1,.1,1)"), this.afterIndex < 1 && this.state.itemDragged === 0 ? _(this.ghostRef.current, 0, 0) : _(
          this.ghostRef.current,
          // compensate window scroll
          -(window.pageYOffset - this.lastYOffset) + // compensate container scroll
          -(this.listRef.current.scrollTop - this.lastListYOffset) + (this.state.itemDragged < this.afterIndex ? this.itemTranslateOffsets.slice(this.state.itemDragged + 1, this.afterIndex + 1).reduce((i, r) => i + r, 0) : this.itemTranslateOffsets.slice(this.afterIndex < 0 ? 0 : this.afterIndex, this.state.itemDragged).reduce((i, r) => i + r, 0) * -1),
          0
        );
      })(), this.dropTimeout = window.setTimeout(this.finishDrop, o || this.afterIndex === -2 ? 0 : this.props.transitionDuration);
    });
    k(this, "finishDrop", () => {
      const t = this.props.removableByMove && this.isDraggedItemOutOfBounds(), o = this.state.itemDragged, i = this.afterIndex > -2 && o !== this.afterIndex, r = i ? t ? -1 : Math.max(this.afterIndex, 0) : o;
      (t || i) && this.props.onChange({
        oldIndex: o,
        newIndex: r,
        targetRect: this.ghostRef.current.getBoundingClientRect()
      }), this.props.afterDrag && this.props.afterDrag({
        elements: this.getChildren(),
        oldIndex: o,
        newIndex: r
      }), this.getChildren().forEach((s) => {
        Se(s, 0), _(s, null), s.style.touchAction = "";
      }), this.setState({ itemDragged: -1, scrollingSpeed: 0 }), this.afterIndex = -2, this.lastScroll > 0 && (this.listRef.current.scrollTop = this.lastScroll, this.lastScroll = 0);
    });
    k(this, "onKeyDown", (t) => {
      const o = this.state.selectedItem, i = this.getTargetIndex(t);
      if (!Rt(t.target, t.currentTarget) && i !== -1) {
        if (t.key === " " && (t.preventDefault(), o === i ? (o !== this.needle && (this.getChildren().forEach((r) => {
          Se(r, 0), _(r, null);
        }), this.props.onChange({
          oldIndex: o,
          newIndex: this.needle,
          targetRect: this.getChildren()[this.needle].getBoundingClientRect()
        }), this.getChildren()[this.needle].focus()), this.setState({
          selectedItem: -1,
          liveText: this.props.voiceover.dropped(o + 1, this.needle + 1)
        }), this.needle = -1) : (this.setState({
          selectedItem: i,
          liveText: this.props.voiceover.lifted(i + 1)
        }), this.needle = i, this.calculateOffsets())), (t.key === "ArrowDown" || t.key === "j") && o > -1 && this.needle < this.props.values.length - 1) {
          t.preventDefault();
          const r = De(this.getChildren()[o]);
          this.needle++, this.animateItems(this.needle, o, r, !0), this.setState({
            liveText: this.props.voiceover.moved(this.needle + 1, !1)
          });
        }
        if ((t.key === "ArrowUp" || t.key === "k") && o > -1 && this.needle > 0) {
          t.preventDefault();
          const r = De(this.getChildren()[o]);
          this.needle--, this.animateItems(this.needle, o, r, !0), this.setState({
            liveText: this.props.voiceover.moved(this.needle + 1, !0)
          });
        }
        t.key === "Escape" && o > -1 && (this.getChildren().forEach((r) => {
          Se(r, 0), _(r, null);
        }), this.setState({
          selectedItem: -1,
          liveText: this.props.voiceover.canceled(o + 1)
        }), this.needle = -1), (t.key === "Tab" || t.key === "Enter") && o > -1 && t.preventDefault();
      }
    });
    this.schdOnMouseMove = Ae(this.onMouseMove), this.schdOnTouchMove = Ae(this.onTouchMove), this.schdOnEnd = Ae(this.onEnd);
  }
  componentDidMount() {
    this.calculateOffsets(), document.addEventListener("touchstart", this.onMouseOrTouchStart, {
      passive: !1,
      capture: !1
    }), document.addEventListener("mousedown", this.onMouseOrTouchStart);
  }
  componentDidUpdate(t, o) {
    o.scrollingSpeed !== this.state.scrollingSpeed && o.scrollingSpeed === 0 && this.doScrolling();
  }
  componentWillUnmount() {
    document.removeEventListener("touchstart", this.onMouseOrTouchStart), document.removeEventListener("mousedown", this.onMouseOrTouchStart), this.dropTimeout && window.clearTimeout(this.dropTimeout), this.schdOnMouseMove.cancel(), this.schdOnTouchMove.cancel(), this.schdOnEnd.cancel();
  }
  render() {
    const t = {
      userSelect: "none",
      WebkitUserSelect: "none",
      MozUserSelect: "none",
      msUserSelect: "none",
      boxSizing: "border-box",
      position: "relative"
    }, o = {
      ...t,
      top: this.state.targetY,
      left: this.state.targetX,
      width: this.state.targetWidth,
      height: this.state.targetHeight,
      position: "fixed",
      marginTop: 0
    };
    return ue.createElement(
      ue.Fragment,
      null,
      this.props.renderList({
        children: this.props.values.map((i, r) => {
          const s = r === this.state.itemDragged, a = r === this.state.selectedItem, c = Boolean(this.props.disabled || this.props.values[r] && typeof this.props.values[r] == "object" && // @ts-expect-error value doesn't necessarily have a `disabled` property
          this.props.values[r].disabled), d = {
            key: r,
            tabIndex: c ? -1 : 0,
            "aria-roledescription": this.props.voiceover.item(r + 1),
            onKeyDown: this.onKeyDown,
            style: {
              ...t,
              visibility: s ? "hidden" : void 0,
              zIndex: a ? 5e3 : 0
            }
          };
          return this.props.renderItem({
            value: i,
            props: d,
            index: r,
            isDragged: !1,
            isSelected: a,
            isOutOfBounds: !1,
            isDisabled: c
          });
        }),
        isDragged: this.state.itemDragged > -1,
        props: {
          ref: this.listRef
        }
      }),
      this.state.itemDragged > -1 && uo.createPortal(this.props.renderItem({
        value: this.props.values[this.state.itemDragged],
        props: {
          ref: this.ghostRef,
          style: o,
          onWheel: this.onWheel
        },
        index: this.state.itemDragged,
        isDragged: !0,
        isSelected: !1,
        isDisabled: !1,
        isOutOfBounds: this.state.itemDraggedOutOfBounds > -1
      }), this.props.container || document.body),
      ue.createElement("div", { "aria-live": "assertive", role: "log", "aria-atomic": "true", style: {
        position: "absolute",
        width: "1px",
        height: "1px",
        margin: "-1px",
        border: "0px",
        padding: "0px",
        overflow: "hidden",
        clip: "rect(0px, 0px, 0px, 0px)",
        clipPath: "inset(100%)"
      } }, this.state.liveText)
    );
  }
}
k(qt, "defaultProps", {
  transitionDuration: 300,
  lockVertically: !1,
  removableByMove: !1,
  voiceover: {
    item: (t) => `You are currently at a draggable item at position ${t}. Press space bar to lift.`,
    lifted: (t) => `You have lifted item at position ${t}. Press j to move down, k to move up, space bar to drop and escape to cancel.`,
    moved: (t, o) => `You have moved the lifted item ${o ? "up" : "down"} to position ${t}. Press j to move down, k to move up, space bar to drop and escape to cancel.`,
    dropped: (t, o) => `You have dropped the item. It has moved from position ${t} to ${o}.`,
    canceled: (t) => `You have cancelled the movement. The item has returned to its starting position of ${t}.`
  }
});
const fo = qt, M = window.React, Ot = window.React.useState, xt = window.React.useEffect, mo = window.Blueprint.Core.MenuItem, ho = window.Blueprint.Core.Icon, po = window.Blueprint.Select.Omnibar, go = window.ReactDOM, q = {
  listeners: [],
  isOpen: !1,
  open: () => {
    q.isOpen = !0, q.listeners.forEach((e) => e(!0));
  },
  close: () => {
    q.isOpen = !1, q.listeners.forEach((e) => e(!1));
  },
  listen: (e) => (q.listeners.push(e), () => {
    q.listeners = q.listeners.filter((n) => n !== e);
  })
};
function bo(e) {
  return e.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
function Pt(e, n) {
  let t = 0;
  const o = n.split(/\s+/).filter((a) => a.length > 0).map(bo);
  if (o.length === 0)
    return [e];
  const i = new RegExp(o.join("|"), "gi"), r = [];
  for (; ; ) {
    const a = i.exec(e);
    if (!a)
      break;
    const c = a[0].length, d = e.slice(t, i.lastIndex - c);
    d.length > 0 && r.push(d), t = i.lastIndex, r.push(/* @__PURE__ */ M.createElement("strong", { key: t }, a[0]));
  }
  const s = e.slice(t);
  return s.length > 0 && r.push(s), r;
}
const wo = document.body, Ht = "roam-tabs-switch-el";
let ke = document.querySelector(`.${Ht}`);
function vo(e, n) {
  ke || (ke = document.createElement("div"), ke.className = Ht, wo.appendChild(ke)), go.createRoot(ke).render(
    /* @__PURE__ */ M.createElement(
      So,
      {
        tabs: e,
        currentTab: n,
        onTabSorted: (t) => {
          A(t, n);
        },
        onTabSelect: (t) => {
          _e(t.tabId);
        }
      }
    )
  );
}
function So({ tabs: e, currentTab: n, onTabSelect: t, onTabSorted: o }) {
  const [i, r] = Ot({
    open: !1
  });
  xt(() => q.listen((u) => {
    r({ open: u });
  }), []);
  const [s, a] = Ot([]), [c, d] = M.useState(null);
  return M.useEffect(() => {
    if (document.querySelector(".roam-tabs-switch-el")) {
      d(document.querySelector(".roam-tabs-switch-el"));
      return;
    }
    const u = document.createElement("div");
    return u.className = "roam-tabs-switch-el", document.body.appendChild(u), d(u), () => {
      u.remove();
    };
  }, []), xt(() => {
    i.open ? setTimeout(() => {
      const u = document.querySelector(
        ".bp3-omnibar input"
      );
      u && u.select();
    }, 0) : a([]);
  }, [i.open]), /* @__PURE__ */ M.createElement(
    po,
    {
      isOpen: i.open,
      onClose: () => q.close(),
      overlayProps: {
        className: "roam-tabs-switch-omnibar"
      },
      items: e,
      itemPredicate: (u, p) => p.title.toLowerCase().includes(u.toLowerCase()),
      itemRenderer: (u, p) => /* @__PURE__ */ M.createElement(
        mo,
        {
          onClick: p.handleClick,
          ...p.modifiers,
          text: Pt(u.title, p.query)
        }
      ),
      onItemSelect: (u) => {
        t(u), q.close();
      },
      itemListRenderer: (u) => {
        const p = s.length > 0 && s.every(
          (h) => u.filteredItems.some((f) => f.tabId === h.tabId)
        ) ? s : u.filteredItems;
        return /* @__PURE__ */ M.createElement(
          fo,
          {
            container: c,
            values: p,
            onChange: ({
              oldIndex: h,
              newIndex: f
            }) => {
              const b = ro(
                p,
                h,
                f
              );
              o(b), a(b);
            },
            renderList: ({
              children: h,
              props: f,
              isDragged: b
            }) => (b ? c == null || c.classList.add("show") : c == null || c.classList.remove("show"), /* @__PURE__ */ M.createElement(
              "div",
              {
                ...f,
                className: "bp3-menu",
                style: {
                  ...f.style,
                  overflowY: "scroll",
                  overflowX: "hidden",
                  maxHeight: 500,
                  cursor: b ? "grabbing" : void 0
                }
              },
              h
            )),
            renderItem: ({
              value: h,
              props: f,
              isDragged: b,
              isSelected: I
            }) => {
              var U;
              return /* @__PURE__ */ M.createElement(
                "li",
                {
                  ...f,
                  key: f.key,
                  style: {
                    ...f.style,
                    cursor: b ? "grabbing" : "grab",
                    // padding: "1.5em",
                    // margin: "0.5em 0em",
                    // listStyleType: "none",
                    // border: "2px solid #CCC",
                    // boxShadow: "3px 3px #AAA",
                    // color: "#333",
                    // borderRadius: "5px",
                    backgroundColor: b || I ? "#f5f5f5" : "transparent",
                    opacity: b ? 0.8 : 1,
                    zIndex: b ? 99 : 1
                  }
                },
                /* @__PURE__ */ M.createElement(
                  "div",
                  {
                    className: `bp3-menu-item${(n == null ? void 0 : n.tabId) === h.tabId ? " bp3-active" : ""}`,
                    style: {
                      background: ((U = u.activeItem) == null ? void 0 : U.tabId) === h.tabId ? "#efefef" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      padding: "10px 7px"
                    },
                    onClick: () => {
                      t(h), q.close();
                    }
                  },
                  /* @__PURE__ */ M.createElement("span", { className: "roam-switch-command-title" }, Pt(h.title, u.query)),
                  u.query ? null : /* @__PURE__ */ M.createElement(
                    ho,
                    {
                      icon: "drag-handle-vertical",
                      "data-movable-handle": !0,
                      style: {
                        cursor: "grab",
                        opacity: 0.5,
                        marginLeft: "8px",
                        userSelect: "none"
                      }
                    }
                  )
                )
              );
            }
          }
        );
      }
    }
  );
}
const ko = window.React, R = {
  Auto: "Auto",
  Tabs: "Tabs",
  Close: "Close",
  Client: "Client",
  ClientConfig: "ClientConfig",
  ClientCanSaveConfig: "ClientCanSaveConfig",
  TabMode: "TabMode",
  StackPageWidth: "StackPageWidth",
  StackRememberLastEditedBlock: "StackRememberLastEditedBlock"
};
let C;
function To(e) {
  C = e, e.ui.commandPalette.addCommand({
    label: "Tabs: Change to Horizontal Mode",
    callback: () => {
      C.settings.set(R.TabMode, "horizontal"), J();
    }
  }), e.ui.commandPalette.addCommand({
    label: "Roam Tabs: Change to Stack Mode",
    callback: () => {
      C.settings.set(R.TabMode, "stack"), J();
    }
  }), oe.on_uninstall(() => {
    e.ui.commandPalette.removeCommand({
      label: "Roam Tabs: Change to Horizontal Mode"
    }), e.ui.commandPalette.removeCommand({
      label: "Roam Tabs: Change to Stack Mode"
    });
  }), e.settings.panel.create({
    tabTitle: "Tabs",
    settings: [
      {
        id: R.Auto,
        name: "Auto Mode",
        description: "Automatically open links in new tabs",
        action: {
          type: "switch",
          onChange: (t) => {
            C.settings.set(R.Auto, t.target.checked);
          }
        }
      },
      {
        id: R.TabMode,
        name: "Tab Display Mode",
        description: "Choose how tabs are displayed: Horizontal (default) or Stack Mode (pages open to the right, horizontal scrolling)",
        action: {
          type: "select",
          items: ["horizontal", "stack"],
          onChange: (t) => {
            C.settings.set(R.TabMode, t), J();
          }
        }
      },
      {
        id: R.StackPageWidth,
        name: "Stack Page Width",
        description: "Set the width of the stack page, default is 650, !",
        action: {
          type: "input",
          placeholder: "650",
          onChange: (t) => {
            const o = t.target.value;
            Number(o) && (C.settings.set(R.StackPageWidth, Number(o)), J());
          }
        }
      },
      {
        id: R.StackRememberLastEditedBlock,
        name: "Remember Last Edited Block",
        description: "",
        action: {
          type: "switch",
          onChange: (t) => {
            C.settings.set(
              R.StackRememberLastEditedBlock,
              t.target.checked
            ), t.target.checked ? pt() : Rn();
          }
        }
      },
      ...xe() ? [
        {
          id: R.Client,
          name: "Initial Tabs for Visitors",
          description: "Set initial tabs for collaborators and visitors",
          action: {
            type: "reactComponent",
            component: ({}) => {
              var t;
              return /* @__PURE__ */ ko.createElement(
                ln,
                {
                  selected: (((t = Yt()) == null ? void 0 : t.tabs) || []).map(
                    (o) => ({
                      value: o.uid,
                      label: o.title
                    })
                  ),
                  onSave: (o) => Oo(
                    o.map((i) => ({
                      tabId: _t(i.value),
                      uid: i.value,
                      title: i.label,
                      blockUid: "",
                      pin: !1
                    }))
                  )
                }
              );
            }
          }
        },
        {
          id: R.ClientCanSaveConfig,
          name: "Collaborator Tabs",
          description: "When enabled, allows collaborators to save their personal tab state to browser local storage, which will be restored after page refresh",
          action: {
            type: "switch",
            onChange: (t) => {
              C.settings.set(
                R.ClientCanSaveConfig,
                t.target.checked
              );
            }
          }
        }
      ] : []
    ]
  }), C.ui.commandPalette.addCommand({
    label: "Roam Tabs: Toggle Auto Mode",
    callback: () => {
      const t = C.settings.get(R.Auto);
      C.settings.set(R.Auto, !t);
    }
  }), C.ui.commandPalette.addCommand({
    label: "Roam Tabs: Switch Tab...",
    callback() {
      q.open();
    }
  }), C.ui.commandPalette.addCommand({
    label: "Roam Tabs: Close Current Tab",
    callback: () => {
      var o;
      const t = (o = x()) == null ? void 0 : o.activeTab;
      t && Re(t.tabId);
    }
  }), C.ui.commandPalette.addCommand({
    label: "Roam Tabs: Close Other Tabs",
    callback: () => {
      var o;
      const t = (o = x()) == null ? void 0 : o.activeTab;
      t && Zt(t.tabId);
    }
  }), C.ui.commandPalette.addCommand({
    label: "Roam Tabs: Close to the right",
    callback: () => {
      var i, r;
      const t = (i = x()) == null ? void 0 : i.activeTab;
      if (!t)
        return;
      const o = (r = x()) == null ? void 0 : r.tabs.findIndex(
        (s) => s.tabId === t.tabId
      );
      o !== -1 && en(o);
    }
  }), C.ui.commandPalette.addCommand({
    label: "Roam Tabs: Pin",
    callback: () => {
      var o;
      const t = (o = x()) == null ? void 0 : o.activeTab;
      t && it(t.tabId);
    }
  });
  const n = (t) => {
    if (!(t.metaKey || t.ctrlKey) || t.shiftKey || t.altKey)
      return;
    const o = t.code === "BracketLeft" || t.key === "[" ? "back" : t.code === "BracketRight" || t.key === "]" ? "forward" : void 0;
    !o || !Do() || (t.preventDefault(), t.stopPropagation(), !(o === "back" ? Ao() : Lo())) || (o === "back" ? $o() : Bo());
  };
  document.addEventListener("keydown", n, !0), oe.on_uninstall(() => {
    document.removeEventListener("keydown", n, !0);
  }), ot() && pt(), J();
}
function ot() {
  return C.settings.get(R.StackRememberLastEditedBlock) === !0;
}
function Io() {
  return C && C.settings.get(R.StackPageWidth) || 650;
}
const J = () => {
  setTimeout(() => {
    var t, o, i;
    Co();
    const e = [...((t = x()) == null ? void 0 : t.tabs) || []], n = (o = x()) != null && o.activeTab ? { ...(i = x()) == null ? void 0 : i.activeTab } : void 0;
    io(e, n), yo(), vo(e, n);
  }, 10);
}, yo = () => {
  setTimeout(() => {
    var o, i, r;
    const e = ((o = x()) == null ? void 0 : o.tabs) || [], n = ((i = x()) == null ? void 0 : i.activeTab) || void 0, t = ((r = x()) == null ? void 0 : r.collapsedUids) || [];
    Kn(
      C.settings.get(R.TabMode),
      e,
      n,
      Io(),
      t
    );
  });
}, Co = () => {
  const e = document.querySelector(".roam-app");
  e && (tn() ? e.classList.add("roam-app-stack") : e.classList.remove("roam-app-stack"));
}, xe = () => {
  var e;
  return ((e = window.roamAlphaAPI.user) == null ? void 0 : e.isAdmin()) ?? !1;
}, He = () => {
  var e;
  return ((e = window.roamAlphaAPI.user) == null ? void 0 : e.uid()) ?? "";
};
function _t(e = "") {
  const n = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`, t = typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : n;
  return e ? `tab-${e}-${t}` : `tab-${t}`;
}
function Eo(e, n) {
  return `legacy-tab-${n}-${e.uid}-${e.blockUid || e.uid}`;
}
function Dt(e) {
  if (e != null && e.uid)
    return {
      uid: e.uid,
      title: e.title || e.uid,
      blockUid: e.blockUid || e.uid
    };
}
function Me(e, n = 0) {
  if (e != null && e.uid)
    return {
      tabId: e.tabId || Eo(e, n),
      uid: e.uid,
      title: e.title || e.uid,
      blockUid: e.blockUid || e.uid,
      scrollTop: e.scrollTop,
      pin: e.pin ?? !1,
      backStack: (e.backStack || []).map((t) => Dt(t)).filter(Boolean),
      forwardStack: (e.forwardStack || []).map((t) => Dt(t)).filter(Boolean)
    };
}
function Ft(e, n) {
  return !(e != null && e.uid) || !(n != null && n.uid) ? !1 : e.uid === n.uid && (e.blockUid || e.uid) === (n.blockUid || n.uid) && (e.title || e.uid) === (n.title || n.uid);
}
function ye(e) {
  if (!e)
    return;
  const n = (e.tabs || []).map((i, r) => Me(i, r)).filter(Boolean), t = Me(e.activeTab, n.length), o = t ? n.find((i) => i.tabId === t.tabId) || n.find((i) => Ft(i, t)) || t : void 0;
  return {
    tabs: n,
    ...o && { activeTab: o },
    collapsedUids: e.collapsedUids || []
  };
}
function zt(e) {
  return e.map((n, t) => Me(n, t)).filter(Boolean);
}
function Ro(e, n) {
  const t = Me(n, e.length);
  if (t)
    return e.find((o) => o.tabId === t.tabId) || e.find((o) => Ft(o, t)) || t;
}
function he() {
  const e = He();
  return xe() ? `${R.Tabs}-${e}` : `${R.ClientConfig}-${e}`;
}
function We() {
  return C.settings.get(R.Auto) === !0;
}
function lt() {
  return !!C.settings.get(R.ClientCanSaveConfig);
}
function x() {
  if (xe()) {
    const n = C.settings.get(he());
    return ye(n || (C.settings.get(R.Tabs) ?? {
      tabs: []
    }));
  }
  if (!He())
    return ye(
      C.settings.get(R.ClientConfig) ?? {
        tabs: []
      }
    );
  if (lt())
    try {
      const n = localStorage.getItem(he());
      if (n)
        return ye(JSON.parse(n));
    } catch (n) {
      console.error("Failed to parse cached tabs from localStorage:", n);
    }
  return Yt();
}
function Yt() {
  return ye(
    C.settings.get(R.ClientConfig) ?? {
      tabs: []
    }
  );
}
function Oo(e) {
  C.settings.set(R.ClientConfig, {
    tabs: zt(e)
  });
}
function A(e, n) {
  Uo(e, n), J();
}
function Re(e) {
  var a;
  const n = x(), t = (n == null ? void 0 : n.tabs) || [], o = t.find((c) => c.tabId === e);
  if (!o)
    return;
  const i = t.findIndex((c) => c.tabId === e);
  if (o.pin) {
    const c = t.findIndex((d) => !d.pin);
    c > -1 && A(t, t[c]);
    return;
  }
  const r = t.filter((c) => c.tabId !== e);
  if (((a = n == null ? void 0 : n.activeTab) == null ? void 0 : a.tabId) !== e) {
    A(r, n == null ? void 0 : n.activeTab);
    return;
  }
  const s = r.length ? r[Math.min(i, r.length - 1)] : void 0;
  A(r, s), setTimeout(() => {
    s ? window.roamAlphaAPI.ui.mainWindow.openBlock({
      block: {
        uid: s.blockUid || s.uid
      }
    }) : window.roamAlphaAPI.ui.mainWindow.openDailyNotes();
  }, 100);
}
function xo(e) {
  const n = x(), t = [...(n == null ? void 0 : n.tabs) || []], o = t.findIndex((i) => i.tabId === e);
  o > -1 && (t[o].blockUid = t[o].uid, A(t, t[o]));
}
function _e(e) {
  const n = x(), t = (n == null ? void 0 : n.tabs) || [], o = t.findIndex((i) => i.tabId === e);
  if (o > -1) {
    const i = t[o], r = Gt(i), s = Jt(r);
    if (A(t, i), !s) {
      vn();
      return;
    }
    wn(e, r), ie(i, r);
  }
}
function Oe(e) {
  return e ? !!window.roamAlphaAPI.q(`
[
  :find ?e .
  :where
    [?e :block/uid "${e}"]
]
`) : !1;
}
function dt(e) {
  if (!(!(e != null && e.uid) || !Oe(e.uid)))
    return e.blockUid && Oe(e.blockUid) ? e : {
      ...e,
      blockUid: e.uid
    };
}
function Z(e = []) {
  const n = [...e];
  for (; n.length; ) {
    const t = dt(n[n.length - 1]);
    if (t) {
      n[n.length - 1] = t;
      break;
    }
    n.pop();
  }
  return n;
}
function At(e = [], n = []) {
  return e.length === n.length && e.every((t, o) => {
    const i = n[o];
    return t.uid === (i == null ? void 0 : i.uid) && t.title === (i == null ? void 0 : i.title) && t.blockUid === (i == null ? void 0 : i.blockUid);
  });
}
function ut(e) {
  if (e)
    return dt({
      uid: e.uid,
      title: e.title,
      blockUid: e.blockUid
    });
}
function te(e, n) {
  return {
    tabId: (n == null ? void 0 : n.tabId) || _t(e.uid),
    uid: e.uid,
    title: e.title,
    blockUid: e.blockUid || e.uid,
    scrollTop: n == null ? void 0 : n.scrollTop,
    pin: (n == null ? void 0 : n.pin) ?? !1,
    backStack: [...(n == null ? void 0 : n.backStack) || []],
    forwardStack: [...(n == null ? void 0 : n.forwardStack) || []]
  };
}
function Kt(e, n) {
  const t = ut(e);
  return {
    ...e,
    ...n,
    pin: e.pin,
    backStack: t ? [...e.backStack || [], t] : [...e.backStack || []],
    forwardStack: []
  };
}
function Xt(e, n) {
  const t = ut(e);
  if (!t)
    return;
  const o = Z(e.backStack || []), i = o[o.length - 1];
  if ((i == null ? void 0 : i.uid) === n)
    return {
      ...e,
      ...i,
      pin: e.pin,
      backStack: o.slice(0, -1),
      forwardStack: [...e.forwardStack || [], t]
    };
  const r = Z(e.forwardStack || []), s = r[r.length - 1];
  if ((s == null ? void 0 : s.uid) === n)
    return {
      ...e,
      ...s,
      pin: e.pin,
      backStack: [...o, t],
      forwardStack: r.slice(0, -1)
    };
}
function Qt(e) {
  const n = Z(e.backStack || []);
  return n[n.length - 1];
}
function Vt(e) {
  const n = Z(e.forwardStack || []);
  return n[n.length - 1];
}
function ft(e, n, t) {
  const o = dt(n);
  if (!o)
    return;
  const i = o.blockUid || o.uid;
  return e.find(
    (r) => r.tabId !== t && r.uid === o.uid && (r.blockUid || r.uid) === i
  );
}
function Po(e) {
  return e ? Z(e.backStack || []).length > 0 || Z(e.forwardStack || []).length > 0 : !1;
}
function Do() {
  var e;
  return Po((e = x()) == null ? void 0 : e.activeTab);
}
function Ao() {
  var n;
  const e = (n = x()) == null ? void 0 : n.activeTab;
  return !!e && !!Qt(e);
}
function Lo() {
  var n;
  const e = (n = x()) == null ? void 0 : n.activeTab;
  return !!e && !!Vt(e);
}
async function jt(e) {
  const n = x(), t = n == null ? void 0 : n.activeTab, o = (n == null ? void 0 : n.tabs) || [];
  if (!t)
    return !1;
  const i = ut(t), r = Z(t.backStack || []), s = Z(
    t.forwardStack || []
  ), a = {
    ...t,
    backStack: r,
    forwardStack: s
  }, c = !At(t.backStack || [], r) || !At(t.forwardStack || [], s), d = e === "back" ? Qt(a) : Vt(a);
  if (!d) {
    if (c) {
      const f = o.map(
        (b) => b.tabId === t.tabId ? a : b
      );
      A(f, a);
    }
    return !1;
  }
  const u = ft(
    o,
    d,
    t.tabId
  );
  if (u) {
    if (c) {
      const f = o.map(
        (b) => b.tabId === t.tabId ? a : b
      );
      return A(f, u), await ie(u), !0;
    }
    return _e(u.tabId), !0;
  }
  const p = e === "back" ? {
    ...a,
    ...d,
    pin: a.pin,
    backStack: (a.backStack || []).slice(0, -1),
    forwardStack: i ? [...a.forwardStack || [], i] : [...a.forwardStack || []]
  } : {
    ...a,
    ...d,
    pin: a.pin,
    backStack: i ? [...a.backStack || [], i] : [...a.backStack || []],
    forwardStack: (a.forwardStack || []).slice(0, -1)
  }, h = o.map(
    (f) => f.tabId === t.tabId ? p : f
  );
  return A(h, p), await ie(p), !0;
}
function $o() {
  return jt("back");
}
function Bo() {
  return jt("forward");
}
let $e = null;
function Gt(e) {
  if (e)
    return e.blockUid && Oe(e.blockUid) && e.blockUid || Oe(e.uid) && e.uid || void 0;
}
function Lt(e) {
  return !e || !Oe(e) ? void 0 : window.roamAlphaAPI.q(`
[
    :find ?e .
    :where
     [?b :block/uid "${e}"]
     [?b :block/page ?p]
     [?p :block/uid ?e]
]
  `) || e;
}
function Jt(e) {
  if (!e)
    return !1;
  const n = window.roamAlphaAPI.ui.mainWindow.getOpenPageOrBlockUid(), t = Lt(e), o = Lt(n);
  return !(n === e || e === t && o === t || $e === e);
}
async function ie(e, n = Gt(e)) {
  if (Jt(n)) {
    $e = n;
    try {
      await window.roamAlphaAPI.ui.mainWindow.openBlock({
        block: {
          uid: n
        }
      });
    } finally {
      setTimeout(() => {
        $e === n && ($e = null);
      }, 0);
    }
  }
}
function Zt(e) {
  const n = x(), t = (n == null ? void 0 : n.tabs) || [], o = t.find((r) => r.tabId === e);
  if (!o)
    return;
  const i = t.filter((r) => r.pin || r.tabId === e);
  A(i, o);
}
function en(e) {
  const n = x(), t = (n == null ? void 0 : n.tabs) || [], o = [
    ...t.slice(0, e + 1),
    ...t.slice(e + 1).filter((s) => s.pin)
  ], i = o.findIndex(
    (s) => {
      var a;
      return s.tabId === ((a = n == null ? void 0 : n.activeTab) == null ? void 0 : a.tabId);
    }
  ), r = i === -1 || i > e ? o[e] : n == null ? void 0 : n.activeTab;
  A(o, r);
}
function it(e) {
  var s;
  const n = x(), o = ((n == null ? void 0 : n.tabs) || []).map(
    (a) => a.tabId === e ? { ...a, pin: !a.pin } : a
  ), i = [
    ...o.filter((a) => a.pin),
    ...o.filter((a) => !a.pin)
  ], r = i.find((a) => a.tabId === e) || (((s = n == null ? void 0 : n.activeTab) == null ? void 0 : s.tabId) === e ? { ...n.activeTab, pin: !n.activeTab.pin } : n == null ? void 0 : n.activeTab);
  A(i, r);
}
function Uo(e, n) {
  if (!He())
    return;
  const o = x(), i = zt(e), r = Ro(i, n), s = {
    tabs: i,
    ...r && { activeTab: r },
    collapsedUids: (o == null ? void 0 : o.collapsedUids) || []
  };
  if (xe()) {
    C.settings.set(he(), s);
    return;
  }
  if (lt())
    try {
      localStorage.setItem(he(), JSON.stringify(s));
    } catch (a) {
      console.error("Failed to save tabs to localStorage:", a);
    }
}
function tn() {
  return C.settings.get(R.TabMode) === "stack";
}
function Je(e) {
  if (!He())
    return;
  const t = x() || { tabs: [] }, o = {
    tabs: t.tabs || [],
    ...t.activeTab && { activeTab: t.activeTab },
    collapsedUids: e
  };
  if (xe()) {
    C.settings.set(he(), o), J();
    return;
  }
  if (lt())
    try {
      localStorage.setItem(he(), JSON.stringify(o)), J();
    } catch (i) {
      console.error("Failed to save collapsedUids to localStorage:", i);
    }
}
function No({ extensionAPI: e }) {
  To(e);
}
function Mo() {
  oe.uninstall();
}
const Ho = {
  onload: No,
  onunload: Mo
};
export {
  Ho as default
};
//# sourceMappingURL=extension.js.map
