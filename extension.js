var Vt = Object.defineProperty;
var jt = (e, n, t) => n in e ? Vt(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var S = (e, n, t) => (jt(e, typeof n != "symbol" ? n + "" : n, t), t);
let We = [];
const ne = {
  on_uninstall: (e) => {
    We.push(e);
  },
  uninstall() {
    We.forEach((e) => {
      e();
    }), We = [];
  }
};
function Pt(e) {
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
const ge = window.React, Qt = window.React.useEffect, qe = window.React.useState, Gt = window.React.useCallback, Jt = window.Blueprint.Select.MultiSelect, lt = window.Blueprint.Core.MenuItem;
function Zt(e, n) {
  let t;
  return function(...o) {
    clearTimeout(t), t = setTimeout(() => e.apply(this, o), n);
  };
}
function en({
  selected: e,
  onSave: n
}) {
  const [t, o] = qe(e), [i, r] = qe([]), [s, a] = qe([]);
  Qt(() => {
    window.roamAlphaAPI.data.async.fast.q(
      `
        [:find [(pull ?b [:block/uid :node/title]) ...]
        :where
            [?b :node/title ?title]
            [(not-empty ?title)]
        ]
        `
    ).then((m) => {
      m.map((f) => ({
        label: f[":node/title"],
        value: f[":block/uid"]
      }));
    });
  }, []);
  const c = Gt(
    Zt((m) => {
      if (!m) {
        a([]);
        return;
      }
      window.roamAlphaAPI.data.async.fast.q(
        `
        [:find [(pull ?b [:block/uid :node/title]) ...]
        :where
            [?b :node/title ?title]
            [(clojure.string/includes?  ?title "${m}")]
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
  ), d = (m) => {
    if (t.some((f) => f.value === m.value)) {
      const f = t.filter((b) => b.value !== m.value);
      o(f), n(f);
    } else {
      const f = [...t, m];
      o(f), n(f);
    }
  }, u = (m) => {
    const f = t.filter(
      (b) => b.label !== m
    );
    o(f), n(f);
  }, p = () => {
    o([]);
  };
  return /* @__PURE__ */ ge.createElement("section", { className: "bp3-dark" }, /* @__PURE__ */ ge.createElement(
    Jt,
    {
      items: s,
      selectedItems: t,
      itemPredicate: () => !0,
      itemRenderer: (m, { handleClick: f, modifiers: b, query: I }) => {
        const M = t.some(
          (v) => v.value === m.value
        );
        return /* @__PURE__ */ ge.createElement(
          lt,
          {
            active: b.active,
            icon: M ? "tick" : "blank",
            key: m.value,
            onClick: f,
            text: m.label,
            shouldDismissPopover: !1
          }
        );
      },
      onItemSelect: d,
      tagRenderer: (m) => m.label,
      onQueryChange: (m) => {
        c(m);
      },
      tagInputProps: {
        onRemove: u,
        rightElement: t.length > 0 ? /* @__PURE__ */ ge.createElement(
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
      noResults: /* @__PURE__ */ ge.createElement(lt, { disabled: !0, text: "No results." }),
      resetOnSelect: !0
    }
  ));
}
let tt = !1, nt = !1, de;
function ot() {
  tt = !1, nt = !1, de && (clearTimeout(de), de = void 0);
}
function tn(e = !1) {
  tt = !0, nt = e, de && clearTimeout(de), de = setTimeout(() => {
    ot();
  }, 1e3);
}
function nn() {
  const e = {
    fromSearchSelection: tt,
    forceOpenInNewTab: nt
  };
  return ot(), e;
}
function on(e) {
  return e instanceof HTMLInputElement && (e.id === "find-or-create-input" || e.getAttribute("placeholder") === "Find or Create Page") && !e.closest(".roam-tabs-switch-omnibar");
}
function sn() {
  const e = document.querySelector(".rm-find-or-create__menu");
  return e ? e.querySelector('.rm-menu-item[style*="background-color"]') || e.querySelector(".rm-menu-item") : null;
}
function an(e) {
  const n = Object.keys(e).find(
    (t) => t.startsWith("__reactProps$")
  );
  if (n)
    return e[n];
}
function rn() {
  const e = sn();
  if (!e)
    return !1;
  const n = an(e);
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
function cn() {
  const e = (n) => {
    if (n.key !== "Enter")
      return;
    const t = document.activeElement;
    if (!on(t))
      return;
    const o = n.metaKey || n.ctrlKey;
    if (tn(o), !o)
      return;
    if (!rn()) {
      ot();
      return;
    }
    n.preventDefault(), n.stopPropagation();
  };
  document.addEventListener("keydown", e, !0), ne.on_uninstall(() => {
    document.removeEventListener("keydown", e, !0);
  });
}
cn();
const ln = window.React.useCallback, dn = window.React.useLayoutEffect, un = window.React.useRef;
function je(e) {
  const n = un(e);
  return dn(() => {
    n.current = e;
  }), ln((...t) => {
    const o = n.current;
    if (o)
      return o(...t);
  }, []);
}
const fn = window.React.useEffect;
let Ae = [];
function At(e) {
  const n = je(e);
  fn(() => (Ae.push(n), () => {
    Ae = Ae.filter((t) => t !== n);
  }), []);
}
function mn() {
  var I, M;
  let e, n = "", t = "", o = { source: "unknown" }, i = 0;
  const r = 20, s = (v, T) => {
    Ae.forEach((y) => {
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
    const y = nn();
    v !== n && (n = v, s(a(v), {
      ...T,
      ...y
    }));
  }, d = (v, T = { source: "unknown" }) => {
    v && (t = v), o = T, e && clearTimeout(e);
    const y = () => {
      const h = window.location.href;
      if (t && h !== t && i < r) {
        i += 1, e = setTimeout(
          y,
          i < 5 ? 0 : 25
        );
        return;
      }
      c(h, o);
    };
    e = setTimeout(y, 0);
  }, u = () => {
    document.querySelectorAll(".bp3-portal").forEach((T) => {
      T.querySelector(".roam-lift-toast") || T.remove();
    });
  }, p = () => {
    u(), c(window.location.href, { source: "hashchange" });
  }, m = (v) => {
    var y, h;
    const T = {
      source: "navigate",
      ensureMainWindow: v.navigationType === "traverse"
    };
    if (v.navigationType === "traverse") {
      d((y = v.destination) == null ? void 0 : y.url, T);
      return;
    }
    c(((h = v.destination) == null ? void 0 : h.url) || window.location.href, T);
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
  window.addEventListener("hashchange", p), window.addEventListener("popstate", f), (I = window.navigation) == null || I.addEventListener("navigate", m), (M = window.navigation) == null || M.addEventListener("currententrychange", b), ne.on_uninstall(() => {
    var v, T;
    window.removeEventListener("hashchange", p), window.removeEventListener("popstate", f), e && clearTimeout(e), (v = window.navigation) == null || v.removeEventListener("navigate", m), (T = window.navigation) == null || T.removeEventListener(
      "currententrychange",
      b
    );
  });
}
mn();
const W = {
  SPINE_WIDTH: 50,
  // 脊宽度
  TITLE_SHOW_AT: 100
  // 🔥 核心配置：当未被遮盖范围剩 100px 时，标题才开始出现
}, B = window.React, hn = window.Blueprint.Core.Menu, z = window.Blueprint.Core.MenuItem, Re = window.Blueprint.Core.MenuDivider, dt = ({
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
  return /* @__PURE__ */ B.createElement(hn, null, /* @__PURE__ */ B.createElement(
    z,
    {
      icon: e.pin ? "pin" : "unpin",
      intent: e.pin ? "danger" : "none",
      onClick: () => {
        p(e.id);
      },
      text: e.pin ? "Unpin" : "Pin"
    }
  ), /* @__PURE__ */ B.createElement(Re, null), /* @__PURE__ */ B.createElement(
    z,
    {
      disabled: e.pin,
      icon: "small-cross",
      text: "Close",
      tagName: "span",
      onClick: () => {
        ye(e.id);
      }
    }
  ), /* @__PURE__ */ B.createElement(
    z,
    {
      icon: "small-cross",
      text: "Close Others",
      onClick: () => {
        c(e.id);
      },
      disabled: t === 1
    }
  ), /* @__PURE__ */ B.createElement(
    z,
    {
      icon: "cross",
      onClick: () => {
        d(n);
      },
      text: "Close to the Right",
      disabled: n + 1 >= t
    }
  ), /* @__PURE__ */ B.createElement(Re, null), /* @__PURE__ */ B.createElement(
    z,
    {
      icon: "duplicate",
      onClick: () => {
        Pt(`[[${e.title}]]`);
      },
      text: "Copy Page Reference"
    }
  ), /* @__PURE__ */ B.createElement(Re, null), /* @__PURE__ */ B.createElement(
    z,
    {
      icon: "add-column-right",
      onClick: () => {
        u(e.blockUid || e.pageUid);
      },
      text: "Open in Sidebar"
    }
  ), /* @__PURE__ */ B.createElement(Re, null), /* @__PURE__ */ B.createElement(
    z,
    {
      text: i ? "Unfold Tab" : "Fold Tab",
      icon: i ? "menu-open" : "menu-closed",
      onClick: () => {
        r(e.id);
      }
    }
  ), /* @__PURE__ */ B.createElement(
    z,
    {
      text: "Fold All Tabs",
      icon: "collapse-all",
      onClick: () => {
        s();
      }
    }
  ), /* @__PURE__ */ B.createElement(
    z,
    {
      text: "Unfold All Tabs",
      icon: "expand-all",
      onClick: () => {
        a();
      }
    }
  ));
}, De = "roam-stack-last-edited-block", Qe = `.${De}`;
function Ge(e, n, t = Qe) {
  if (!e)
    return;
  const o = (i) => {
    var r;
    e.querySelectorAll(t).forEach((s) => {
      s.classList.remove(De);
    }), (r = i.closest(".rm-block-main")) == null || r.classList.add(De), n(i);
  };
  return e.arrive("textarea", o), () => {
    e.unbindArrive("textarea", o);
  };
}
let Ie = () => {
};
function ut() {
  Ie();
  let e = "", n = "";
  const t = document.querySelector("#right-sidebar"), o = Ge(
    t,
    (a) => {
      e = a.id;
    },
    Qe
  ), i = document.querySelector(".roam-main"), r = Ge(
    i,
    (a) => {
      a.closest(".roam-body-main") && (n = a.id);
    },
    `.roam-body-main ${Qe}`
  ), s = (a) => {
    var d;
    [e, n].find(
      (u) => a.id === u
    ) && ((d = a.closest(".rm-block-main")) == null || d.classList.add(De));
  };
  return document.arrive("div", s), Ie = () => {
    document.unbindArrive("div", s), o(), r();
  }, Ie;
}
ne.on_uninstall(() => {
  Ie();
});
function pn() {
  Ie();
}
const L = window.React, gn = window.React.useContext, He = window.React.useEffect, _e = window.React.useRef, be = window.Blueprint.Core.Button, ft = window.Blueprint.Core.Icon, bn = window.Blueprint.Core.ContextMenu, Fe = window.Blueprint.Core.Popover, mt = window.Blueprint.Core.PopoverInteractionKind, ze = window.Blueprint.Core.Position, wn = ({ item: e, index: n, total: t }) => {
  const o = gn(Be);
  if (!o)
    throw new Error("PageCard must be used within StackProvider");
  const {
    focusPage: i,
    focusPageByUid: r,
    focusedIndex: s,
    pageWidth: a,
    isCollapsed: c,
    toggleCollapsed: d
  } = o, u = n < t - 1, p = s === n, m = _e(null), f = c(e.id);
  He(() => {
    setTimeout(async () => {
      if (await window.roamAlphaAPI.ui.components.unmountNode({
        el: m.current
      }), !f) {
        if (e.blockUid !== e.pageUid) {
          window.roamAlphaAPI.ui.components.renderBlock({
            el: m.current,
            uid: e.blockUid,
            "zoom-path?": !0
          }), await new Promise((l) => setTimeout(l, 100));
          return;
        }
        window.roamAlphaAPI.ui.components.renderPage({
          el: m.current,
          uid: e.pageUid
        });
      }
    }, 50);
  }, [e.pageUid, e.blockUid, f]);
  const b = (l) => o.stack.slice(0, l).reduce((w, O) => {
    const P = c(O.id) ? W.SPINE_WIDTH : a;
    return w + (P - W.SPINE_WIDTH);
  }, 0), I = b(n), M = f ? W.SPINE_WIDTH : a, v = I + (M - W.TITLE_SHOW_AT), T = b(Math.max(n - 1, 0)), y = _e(null), h = _e("");
  return He(() => {
    h.current && !f && Ze() && setTimeout(() => {
      var O;
      let w = y.current.querySelector(`[id$="${h.current}"]`);
      w || (w = y.current.querySelector(
        `[id$="${h.current.substr(-9)}"]`
      )), (O = w.closest(".rm-block-main")) == null || O.classList.add("roam-stack-last-edited-block");
    }, 200);
  }, [f]), He(() => {
    if (y.current)
      return Ge(y.current, (l) => {
        if (h.current = l.id, !Ze()) {
          h.current = "";
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
              wo(e.id);
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
        width: `${M}px`,
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
            be,
            {
              minimal: !0,
              intent: e.pin ? "primary" : void 0,
              onClick: (l) => {
                l.stopPropagation();
                const { togglePin: w } = o;
                w(e.id);
              }
            },
            /* @__PURE__ */ L.createElement(ft, { icon: "pin", color: e.pin ? void 0 : "#ABB3BF" })
          ) : /* @__PURE__ */ L.createElement(
            be,
            {
              icon: "cross",
              minimal: !0,
              onClick: (l) => {
                l.stopPropagation(), ye(e.id);
              }
            }
          )
        ),
        /* @__PURE__ */ L.createElement(
          "div",
          {
            className: "roam-stack-card-title",
            onContextMenu: (l) => {
              l.button === 2 && (l.preventDefault(), l.stopPropagation(), bn.show(
                /* @__PURE__ */ L.createElement(
                  dt,
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
          Fe,
          {
            content: /* @__PURE__ */ L.createElement("div", { className: "roam-stack-popover-content" }, "Unfold tab"),
            interactionKind: mt.HOVER,
            position: ze.RIGHT,
            target: /* @__PURE__ */ L.createElement(
              be,
              {
                minimal: !0,
                onClick: (l) => {
                  l.stopPropagation(), d(e.id);
                },
                className: "roam-stack-expand-btn"
              },
              /* @__PURE__ */ L.createElement(ft, { icon: "menu-open" })
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
            width: f ? 0 : Math.max(M - W.SPINE_WIDTH, 0)
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
            Fe,
            {
              content: /* @__PURE__ */ L.createElement("div", { className: "roam-stack-popover-content" }, "Fold tab"),
              interactionKind: mt.HOVER,
              position: ze.BOTTOM,
              target: /* @__PURE__ */ L.createElement(
                be,
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
            Fe,
            {
              autoFocus: !1,
              content: /* @__PURE__ */ L.createElement(
                dt,
                {
                  item: e,
                  index: n,
                  total: t,
                  context: o,
                  isCollapsed: f
                }
              ),
              position: ze.BOTTOM_RIGHT,
              target: /* @__PURE__ */ L.createElement(be, { minimal: !0, icon: "more", small: !0 })
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
              st(e.id);
            },
            className: "roam-stack-card-body",
            ref: m
          }
        )
      )
    )
  );
}, se = window.React, vn = window.React.useContext, kn = window.React.useEffect, ae = window.React.useRef, ht = window.React.useState, Sn = window.Blueprint.Core.Tooltip, Tn = window.Blueprint.Core.Position, In = () => {
  const e = vn(Be);
  if (!e)
    throw new Error("Minimap must be used within StackProvider");
  const { stack: n, containerRef: t, pageWidth: o, collapsedNonce: i, focusedIndex: r } = e, s = ae(null), a = ae(null), c = ae(!1), [d, u] = ht(!1), p = ae(0), m = ae(0), [f, b] = ht(""), I = ae(-1), M = Sn, v = () => {
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
    O && O !== "none" && (P = new DOMMatrix(O).m41), m.current = P;
    const $ = v();
    if ($) {
      const k = P / $.scaleRatio + $.viewportWidth / 2, E = Math.floor(k / o);
      n[E] && (b(n[E].title), I.current = E);
    }
    const H = (g) => {
      if (!c.current || !t.current || !s.current || !a.current)
        return;
      const k = v();
      if (!k)
        return;
      const E = g.clientX - p.current;
      let U = m.current + E;
      const me = k.minimapWidth - k.thumbWidth;
      U < 0 && (U = 0), U > me && (U = me), a.current.style.transform = `translateX(${U}px)`;
      const ee = t.current.style.scrollBehavior;
      t.current.style.scrollBehavior = "auto";
      const X = U / k.scaleRatio;
      t.current.scrollLeft = X, t.current.style.scrollBehavior = ee || "smooth";
      const he = X + k.viewportWidth / 2, ie = Math.floor(he / o);
      if (ie !== I.current) {
        I.current = ie;
        const pe = n[ie];
        pe && b(pe.title);
      }
    }, oe = () => {
      c.current = !1, u(!1), document.removeEventListener("mousemove", H), document.removeEventListener("mouseup", oe);
    };
    document.addEventListener("mousemove", H), document.addEventListener("mouseup", oe);
  }, h = (l) => {
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
  return kn(() => {
    const l = t.current;
    if (l)
      return l.addEventListener("scroll", T), window.addEventListener("resize", v), setTimeout(v, 0), () => {
        l.removeEventListener("scroll", T), window.removeEventListener("resize", v);
      };
  }, [n.length, i]), n.length === 0 ? null : /* @__PURE__ */ se.createElement(
    "div",
    {
      ref: s,
      id: "roam-stack-indicator",
      className: "roam-stack-minimap",
      onMouseDown: h
    },
    /* @__PURE__ */ se.createElement("div", { style: { width: "100%", height: "100%" } }, /* @__PURE__ */ se.createElement("div", { className: "roam-stack-minimap-preview" }, n.map((l, w) => /* @__PURE__ */ se.createElement(
      M,
      {
        key: l.id,
        content: l.title,
        position: Tn.TOP,
        hoverOpenDelay: 0,
        transitionDuration: 100,
        disabled: d
      },
      /* @__PURE__ */ se.createElement(
        "div",
        {
          className: `minimap-block ${w === r ? "minimap-block-focused" : ""}`
        }
      )
    ))), /* @__PURE__ */ se.createElement(
      "div",
      {
        ref: a,
        className: "minimap-thumb",
        onMouseDown: y
      }
    ))
  );
}, re = window.React, yn = window.React.useContext, Cn = () => {
  const e = yn(Be);
  if (!e)
    throw new Error("Layout must be used within StackProvider");
  const { stack: n, containerRef: t, handleScroll: o, hintRef: i } = e;
  return /* @__PURE__ */ re.createElement(
    "div",
    {
      className: "roam-stack-layout"
    },
    /* @__PURE__ */ re.createElement(In, null),
    /* @__PURE__ */ re.createElement(
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
      n.length === 0 && /* @__PURE__ */ re.createElement(
        "div",
        {
          className: "roam-stack-empty-state"
        },
        /* @__PURE__ */ re.createElement(
          "div",
          {
            className: "roam-stack-empty-text"
          },
          "No tabs"
        )
      ),
      n.map((r, s) => /* @__PURE__ */ re.createElement(
        wn,
        {
          key: r.id,
          item: r,
          index: s,
          total: n.length
        }
      ))
    )
  );
}, Je = window.React, Ye = window.React.useRef, En = window.React.createContext, pt = window.React.useState, ke = window.React.useEffect, Be = En(
  void 0
), Rn = ({
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
  const d = Ye(null), u = Ye(null), p = n, m = p.findIndex((g) => g.id === t), f = m, [b, I] = pt(
    new Set(c || [])
  ), [M, v] = pt(0), T = (g) => b.has(g), y = () => {
    const g = new Set(p.map((k) => k.id));
    I(g), Ve(Array.from(g)), v((k) => k + 1);
  }, h = () => {
    I(/* @__PURE__ */ new Set()), Ve([]), v((g) => g + 1);
  }, l = (g) => {
    const k = d.current;
    if (!k)
      return;
    const E = k.children[g];
    if (E) {
      const ee = k.getBoundingClientRect(), X = E.getBoundingClientRect(), he = X.left >= ee.left - 5 && X.right <= ee.right + 5;
      let ie = !1;
      const pe = k.children[g + 1];
      if (pe && pe.getBoundingClientRect().left < X.right - 10 && (ie = !0), he && !ie)
        return;
    }
    const U = p.slice(0, g).reduce((ee, X) => {
      const he = T(X.id) ? W.SPINE_WIDTH : o;
      return ee + (he - W.SPINE_WIDTH);
    }, 0);
    k.scrollTo({
      left: U,
      behavior: "smooth"
    });
    const me = () => {
      setTimeout(() => {
      }, 500);
    };
    "onscrollend" in k ? k.addEventListener("scrollend", me, {
      once: !0
    }) : setTimeout(me, 20);
  }, w = (g) => {
    const k = b.has(g);
    if (I((E) => {
      const U = new Set(E);
      return U.has(g) ? U.delete(g) : U.add(g), Ve(Array.from(U)), U;
    }), v((E) => E + 1), k) {
      const E = p.findIndex((U) => U.id === g);
      E > -1 && (l(E), setTimeout(() => {
        l(E);
      }, 300));
    }
  }, O = (g) => {
    l(g);
  }, P = (g, k) => {
    if (!u.current)
      return;
    const E = g - k;
    if (E > 10) {
      const U = Math.min(E / 200, 1);
      u.current.style.opacity = `${U}`;
    } else
      u.current.style.opacity = "0";
  }, $ = () => {
    if (d.current) {
      const g = d.current, k = g.scrollWidth - g.clientWidth, E = g.scrollLeft;
      g.style.setProperty("--scroll-max", `${k}`), g.style.setProperty("--scroll-x", `${E}`), P(k, E);
    }
  }, H = (g) => {
    if (d.current) {
      const k = g.currentTarget, E = k.scrollLeft, U = k.scrollWidth - k.clientWidth;
      k.style.setProperty("--scroll-x", `${E}`), P(U, E);
    }
  }, oe = Ye(() => {
  });
  return oe.current = () => {
    $(), m > -1 && l(m);
  }, ke(() => {
    const g = d.current;
    if (!g)
      return;
    $();
    const k = new ResizeObserver(() => {
      oe.current();
    });
    return k.observe(g), () => k.disconnect();
  }, []), ke(() => {
    setTimeout($, 100);
  }, [p.length]), ke(() => {
    setTimeout($, 0);
  }, [b]), ke(() => {
    l(m);
  }, [m]), /* @__PURE__ */ Je.createElement(
    Be.Provider,
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
          const k = p.findIndex((E) => E.pageUid === g);
          k > -1 && O(k);
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
        collapsedNonce: M,
        foldAll: y,
        unfoldAll: h
      }
    },
    e
  );
};
let gt = !1;
const On = (e) => {
  var r;
  At(async (s, a) => {
    var T, y;
    const c = async (h, l) => {
      D(h, l);
    };
    if (!s) {
      D(e.tabs, void 0);
      return;
    }
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
      const h = await window.roamAlphaAPI.data.async.q(
        `[:find ?t . :where [?b :block/uid "${d}"] [?b :node/title ?t]
      ]`
      );
      u = [d, h];
    }
    const [m, f] = u, b = {
      uid: m,
      title: f,
      blockUid: p
    };
    if (a != null && a.fromSearchSelection) {
      const h = ct(e.tabs, b);
      if (h) {
        await c(e.tabs, h), await fe(h);
        return;
      }
    }
    if (a != null && a.ensureMainWindow && e.currentTab) {
      const h = Ht(e.currentTab, m);
      if (h) {
        const l = e.tabs.map(
          (w) => w.tabId === e.currentTab.tabId ? h : w
        );
        await c(l, h), await fe(h);
        return;
      }
    }
    const I = e.tabs.findIndex(
      (h) => {
        var l;
        return h.tabId === ((l = e.currentTab) == null ? void 0 : l.tabId);
      }
    );
    if (!!(a != null && a.fromSearchSelection) && !Me() && !((T = e.currentTab) != null && T.pin) ? !!a.forceOpenInNewTab : !!(gt || a != null && a.forceOpenInNewTab || Me() || (y = e.currentTab) != null && y.pin)) {
      const h = te(b), l = [...e.tabs, h];
      await c(l, h);
    } else if (e.tabs.length === 0) {
      const h = te(b);
      await c([h], h);
    } else if (e.currentTab)
      if (I !== -1 && e.tabs[I].uid === m) {
        const h = te(
          b,
          e.tabs[I]
        ), l = e.tabs.map(
          (w) => w.tabId === h.tabId ? h : w
        );
        await c(l, h);
      } else {
        const h = e.tabs.map((w) => w.tabId !== e.currentTab.tabId ? w : qt(w, b)), l = h.find((w) => w.tabId === e.currentTab.tabId) || te(b, e.currentTab);
        await c(h, l);
      }
    else {
      const h = te(b), l = [...e.tabs, h];
      await c(l, h);
    }
  }), ke(() => {
    const s = (a) => {
      gt = a.ctrlKey || a.metaKey;
    };
    return document.addEventListener("pointerdown", s), () => {
      document.removeEventListener("pointerdown", s);
    };
  }, []);
  const n = (s) => {
    const a = e.tabs.map(
      (d) => d.tabId === s ? { ...d, pin: !d.pin } : d
    ), c = a.find((d) => d.tabId === s);
    D(a, c || e.currentTab);
  }, t = (s) => {
    const a = e.tabs.filter((d) => d.pin || d.tabId === s), c = a.find((d) => d.tabId === s);
    D(a, c || e.currentTab);
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
    D(a, d);
  }, i = (s) => {
    window.roamAlphaAPI.ui.rightSidebar.addWindow({
      window: {
        "block-uid": s,
        type: "outline"
      }
    });
  };
  return /* @__PURE__ */ Je.createElement(
    Rn,
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
    /* @__PURE__ */ Je.createElement(Cn, null)
  );
}, Le = window.React, xn = window.ReactDOM, Pn = "roam-main", $e = "roam-stack-container";
ne.on_uninstall(() => {
  Y && (Y.unmount(), Y = null), F && F.remove();
});
let Y = null, F = null;
const An = () => {
  const e = document.querySelector(`.${$e}`);
  e && e.classList.remove("roam-stack-container-hide");
}, Dn = () => {
  const e = document.querySelector(`.${$e}`);
  e && e.classList.add("roam-stack-container-hide");
}, Ln = async (e) => {
  e ? An() : Dn();
}, $n = (e, n, t, o, i = []) => {
  if (Ln(t), e !== "stack") {
    Y && (Y.unmount(), Y = null), F && F.remove();
    return;
  }
  const r = document.querySelector(`.${Pn}`);
  F = document.querySelector(`.${$e}`), r && (F || (F = document.createElement("div"), F.className = $e, r.appendChild(F)), Y || (Y = xn.createRoot(F)), Y.render(
    /* @__PURE__ */ Le.createElement(Un, null, /* @__PURE__ */ Le.createElement(
      On,
      {
        pageWidth: o,
        tabs: n,
        currentTab: t,
        collapsedUids: i
      }
    ))
  ));
};
function Un(e) {
  return /* @__PURE__ */ Le.createElement(Le.Fragment, null, e.children);
}
const A = window.React, Mn = window.React.Component, Bn = window.React.useReducer, Nn = window.ReactDOM, { useEffect: bt } = A, Ke = window.Blueprint.Core.Button, wt = window.Blueprint.Core.Icon, ce = window.Blueprint.Core.MenuItem, Wn = window.Blueprint.Core.Menu, qn = window.Blueprint.Core.ContextMenu, Xe = window.Blueprint.Core.MenuDivider, vt = "roam-tabs";
function Hn(e, n = 500) {
  let t = setTimeout(() => {
  }, 0);
  return (...o) => {
    clearTimeout(t), t = setTimeout(() => {
      e(...o);
    }, n);
  };
}
let G = null, K = null, Dt = () => {
};
const _n = async (e, n) => {
  const t = document.querySelector(".roam-main");
  K = t.querySelector("." + vt);
  const o = t.querySelector(".roam-body-main");
  K ? G == null || G.render(/* @__PURE__ */ A.createElement(kt, { tabs: e, currentTab: n })) : (K = document.createElement("div"), K.className = vt, t.insertBefore(K, o), G = Nn.createRoot(K), G.render(/* @__PURE__ */ A.createElement(kt, { tabs: e, currentTab: n }))), setTimeout(() => {
  }, 100);
};
let Se;
const Lt = (e) => {
  Se = e, Dt();
};
function kt(e) {
  const { tabs: n, currentTab: t } = e;
  Dt = Bn((r) => r + 1, 0)[1];
  const o = je(async (r, s, a, c) => {
    if (r) {
      const d = x(), u = (d == null ? void 0 : d.tabs) || [], p = (d == null ? void 0 : d.activeTab) || t, f = !!(c != null && c.fromSearchSelection) && !Me() && !(p != null && p.pin) ? !!c.forceOpenInNewTab : !!(St || c != null && c.forceOpenInNewTab || p != null && p.pin || Me()), b = {
        uid: r,
        title: s,
        blockUid: a
      }, I = te(b), M = jn(I);
      I.blockUid = M;
      const v = {
        ...b,
        blockUid: M
      };
      if (c != null && c.fromSearchSelection) {
        const l = ct(
          u,
          v
        );
        if (l) {
          D(u, l), fe(l);
          return;
        }
      }
      const T = p ? u.findIndex((l) => l.tabId === p.tabId) : -1;
      let y, h;
      if (f)
        y = [...u, I], h = I;
      else if (u.length === 0)
        y = [I], h = I;
      else if (T !== -1 && u[T].uid === I.uid) {
        const l = te(
          v,
          u[T]
        );
        y = u.map(
          (w) => w.tabId === l.tabId ? l : w
        ), h = l;
      } else if (!p)
        y = [...u, I], h = I;
      else if (T !== -1) {
        const l = qt(u[T], v);
        y = u.map(
          (w, O) => O === T ? l : w
        ), h = l;
      } else
        y = u, h = p;
      D(y, h);
    } else
      D(n, void 0);
  }), i = je(function(s) {
    St = s.ctrlKey || s.metaKey;
  });
  return bt(() => {
    if (document.querySelector(".rm-article-wrapper"))
      return () => {
      };
  }, [n, t]), At((r, s) => {
    var d;
    if (!r) {
      D(n, void 0);
      return;
    }
    const a = Yn(r);
    if (s != null && s.ensureMainWindow && t) {
      const u = Ht(t, a);
      if (u) {
        const m = (((d = x()) == null ? void 0 : d.tabs) || n).map(
          (f) => f.tabId === t.tabId ? u : f
        );
        D(m, u), fe(u);
        return;
      }
    }
    const c = Kn(a);
    o(a, c, r, s);
  }), bt(() => (document.addEventListener("pointerdown", i), () => {
    document.removeEventListener("pointerdown", i);
  }), []), A.useEffect(() => {
    const r = () => {
      Lt(void 0);
    };
    return document.addEventListener("dragend", r), () => {
      document.removeEventListener("dragend", r);
    };
  }, []), /* @__PURE__ */ A.createElement(A.Fragment, null, /* @__PURE__ */ A.createElement("div", { className: "roam-tabs-container" }, n.map((r, s) => {
    const a = r.tabId === (t == null ? void 0 : t.tabId);
    return /* @__PURE__ */ A.createElement(
      Fn,
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
class Fn extends Mn {
  constructor() {
    super(...arguments), this.state = {
      className: ""
    };
  }
  render() {
    const { active: n, tab: t, index: o, tabs: i, currentTab: r } = this.props;
    return /* @__PURE__ */ A.createElement(
      Ke,
      {
        style: {
          outline: "none"
        },
        intent: n ? "primary" : "none",
        outlined: !0,
        small: !0,
        draggable: !0,
        onDragStart: (s) => {
          s.dataTransfer.effectAllowed = "move", Lt(t), s.stopPropagation();
        },
        onDragOver: (s) => {
          if (s.preventDefault(), s.dataTransfer.effectAllowed = "move", Se) {
            const a = {
              ...Se,
              pin: t.pin
            };
            Vn(t, a, i, r);
          }
        },
        "data-dragging": Se === t,
        className: `${this.state.className} ${n ? "roam-tab-active" : ""} ${Se === t ? "ring-1 " : ""} roam-tab`,
        onContextMenu: (s) => {
          s.preventDefault(), s.stopPropagation(), qn.show(
            /* @__PURE__ */ A.createElement(Wn, null, /* @__PURE__ */ A.createElement(
              ce,
              {
                text: "Close",
                tagName: "span",
                onClick: () => {
                  ye(t.tabId);
                }
              }
            ), /* @__PURE__ */ A.createElement(
              ce,
              {
                text: "Close Others",
                onClick: () => {
                  Yt(t.tabId);
                },
                disabled: i.length === 1
              }
            ), /* @__PURE__ */ A.createElement(
              ce,
              {
                onClick: () => {
                  Kt(o);
                },
                text: "Close to the Right",
                disabled: o + 1 >= i.length
              }
            ), /* @__PURE__ */ A.createElement(Xe, null), /* @__PURE__ */ A.createElement(
              ce,
              {
                onClick: () => {
                  Pt(`[[${t.title}]]`);
                },
                text: "Copy Page Reference"
              }
            ), /* @__PURE__ */ A.createElement(Xe, null), /* @__PURE__ */ A.createElement(
              ce,
              {
                onClick: () => {
                  Tt(t.uid);
                },
                text: "Open in Sidebar"
              }
            ), /* @__PURE__ */ A.createElement(Xe, null), /* @__PURE__ */ A.createElement(
              ce,
              {
                onClick: () => {
                  et(t.tabId);
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
            Tt(t.uid);
            return;
          }
          zn(t.blockUid);
        },
        rightIcon: t.pin ? /* @__PURE__ */ A.createElement(
          Ke,
          {
            minimal: !0,
            small: !0,
            intent: "danger",
            icon: /* @__PURE__ */ A.createElement(wt, { icon: "pin" }),
            onClickCapture: (s) => {
              s.preventDefault(), s.stopPropagation(), et(t.tabId);
            }
          }
        ) : /* @__PURE__ */ A.createElement(
          Ke,
          {
            minimal: !0,
            small: !0,
            icon: /* @__PURE__ */ A.createElement(wt, { color: "#ABB3BF", icon: "small-cross" }),
            onClickCapture: (s) => {
              s.preventDefault(), s.stopPropagation(), ye(t.tabId);
            }
          }
        ),
        text: /* @__PURE__ */ A.createElement(
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
const zn = (e) => {
  window.roamAlphaAPI.ui.mainWindow.openBlock({
    block: {
      uid: e
    }
  });
};
let St = !1;
function Yn(e) {
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
function Kn(e) {
  return window.roamAlphaAPI.q(`
[
    :find ?e .
    :where
     [?b :block/uid "${e}"]
     [?b :node/title ?e]
]
`);
}
function Xn(e, n) {
  if (Xt()) {
    G && (G.unmount(), G = null), K && (K.remove(), K = null);
    return;
  }
  _n(e, n);
}
function Tt(e) {
  window.roamAlphaAPI.ui.rightSidebar.addWindow({
    window: {
      "block-uid": e,
      type: "outline"
    }
  });
}
const Vn = Hn(
  (e, n, t, o) => {
    const i = t.findIndex((c) => c.tabId === e.tabId), r = t.findIndex((c) => c.tabId === n.tabId), s = [...t];
    s.splice(r, 1);
    const a = [
      ...s.slice(0, i),
      n,
      ...s.slice(i)
    ];
    D(a, o);
  },
  10
);
function jn(e) {
  return window.roamAlphaAPI.q(`
  [
    :find ?e .
    :where
     [?e :block/uid "${e.blockUid}"]
     [?p :block/uid "${e.uid}"]
     [?e :block/page ?p]
  ]`) ? e.blockUid : e.uid;
}
function Qn(e, n, t) {
  return e = e.slice(), e.splice(t < 0 ? e.length + t : t, 0, e.splice(n, 1)[0]), e;
}
function Oe(e) {
  const n = window.getComputedStyle(e);
  return Math.max(parseInt(n["margin-top"], 10), parseInt(n["margin-bottom"], 10)) + e.getBoundingClientRect().height;
}
function Gn(e) {
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
function we(e, n, t) {
  e && (e.style.transition = `transform ${n}ms${t ? ` ${t}` : ""}`);
}
function Jn(e, n) {
  let t = 0, o = e.length - 1, i;
  for (; t <= o; ) {
    if (i = Math.floor((o + t) / 2), !e[i + 1] || e[i] <= n && e[i + 1] >= n)
      return i;
    e[i] < n && e[i + 1] < n ? t = i + 1 : o = i - 1;
  }
  return -1;
}
const xe = (e) => {
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
function It(e, n) {
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
const le = window.React, Zn = window.ReactDOM, V = 200, j = 10, Q = 10;
class $t extends le.Component {
  constructor(t) {
    super(t);
    S(this, "listRef", le.createRef());
    S(this, "ghostRef", le.createRef());
    S(this, "topOffsets", []);
    S(this, "itemTranslateOffsets", []);
    S(this, "initialYOffset", 0);
    S(this, "lastScroll", 0);
    S(this, "lastYOffset", 0);
    S(this, "lastListYOffset", 0);
    S(this, "dropTimeout");
    S(this, "needle", -1);
    S(this, "afterIndex", -2);
    S(this, "state", {
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
    S(this, "schdOnMouseMove");
    S(this, "schdOnTouchMove");
    S(this, "schdOnEnd");
    S(this, "doScrolling", () => {
      const { scrollingSpeed: t, scrollWindow: o } = this.state, i = this.listRef.current;
      window.requestAnimationFrame(() => {
        o ? window.scrollTo(window.pageXOffset, window.pageYOffset + t * 1.5) : i.scrollTop += t, t !== 0 && this.doScrolling();
      });
    });
    S(this, "getChildren", () => this.listRef && this.listRef.current ? Array.from(this.listRef.current.children) : (console.warn("No items found in the List container. Did you forget to pass & spread the `props` param in renderList?"), []));
    S(this, "calculateOffsets", () => {
      this.topOffsets = this.getChildren().map((t) => t.getBoundingClientRect().top), this.itemTranslateOffsets = this.getChildren().map((t) => Oe(t));
    });
    S(this, "getTargetIndex", (t) => this.getChildren().findIndex((o) => o === t.target || o.contains(t.target)));
    S(this, "onMouseOrTouchStart", (t) => {
      this.dropTimeout && this.state.itemDragged > -1 && (window.clearTimeout(this.dropTimeout), this.finishDrop());
      const o = Gn(t);
      if (!o && t.button !== 0)
        return;
      const i = this.getTargetIndex(t);
      if (i === -1 || this.props.disabled || // @ts-ignore
      this.props.values[i] && this.props.values[i].disabled) {
        this.state.selectedItem !== -1 && (this.setState({ selectedItem: -1 }), this.finishDrop());
        return;
      }
      const r = this.getChildren()[i], s = r.querySelector("[data-movable-handle]");
      if (!(s && !s.contains(t.target)) && !It(t.target, r)) {
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
    S(this, "getYOffset", () => {
      const t = this.listRef.current ? this.listRef.current.scrollTop : 0;
      return window.pageYOffset + t;
    });
    S(this, "onStart", (t, o, i, r) => {
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
    S(this, "onMouseMove", (t) => {
      t.cancelable && t.preventDefault(), this.onMove(t.clientX, t.clientY);
    });
    S(this, "onTouchMove", (t) => {
      t.cancelable && t.preventDefault(), this.onMove(t.touches[0].clientX, t.touches[0].clientY);
    });
    S(this, "onWheel", (t) => {
      this.state.itemDragged < 0 || (this.lastScroll = this.listRef.current.scrollTop += t.deltaY, this.moveOtherItems());
    });
    S(this, "onMove", (t, o) => {
      if (this.state.itemDragged === -1)
        return null;
      _(this.ghostRef.current, o - this.state.initialY, this.props.lockVertically ? 0 : t - this.state.initialX), this.autoScrolling(o, o - this.state.initialY), this.moveOtherItems();
    });
    S(this, "moveOtherItems", () => {
      const t = this.ghostRef.current.getBoundingClientRect(), o = t.top + t.height / 2, i = Oe(this.getChildren()[this.state.itemDragged]), r = this.getYOffset();
      this.initialYOffset !== r && (this.topOffsets = this.topOffsets.map((s) => s - (r - this.initialYOffset)), this.initialYOffset = r), this.isDraggedItemOutOfBounds() && this.props.removableByMove ? this.afterIndex = this.topOffsets.length + 1 : this.afterIndex = Jn(this.topOffsets, o), this.animateItems(this.afterIndex === -1 ? 0 : this.afterIndex, this.state.itemDragged, i);
    });
    S(this, "autoScrolling", (t, o) => {
      const { top: i, bottom: r, height: s } = this.listRef.current.getBoundingClientRect(), a = window.innerHeight || document.documentElement.clientHeight;
      if (r > a && a - t < V && o > Q)
        this.setState({
          scrollingSpeed: Math.min(Math.round((V - (a - t)) / j), Math.round((o - Q) / j)),
          scrollWindow: !0
        });
      else if (i < 0 && t < V && o < -Q)
        this.setState({
          scrollingSpeed: Math.max(Math.round((V - t) / -j), Math.round((o + Q) / j)),
          scrollWindow: !0
        });
      else if (this.state.scrollWindow && this.state.scrollingSpeed !== 0 && this.setState({ scrollingSpeed: 0, scrollWindow: !1 }), s + 20 < this.listRef.current.scrollHeight) {
        let c = 0;
        t - i < V && o < -Q ? c = Math.max(Math.round((V - (t - i)) / -j), Math.round((o + Q) / j)) : r - t < V && o > Q && (c = Math.min(Math.round((V - (r - t)) / j), Math.round((o - Q) / j))), this.state.scrollingSpeed !== c && this.setState({ scrollingSpeed: c });
      }
    });
    S(this, "animateItems", (t, o, i, r = !1) => {
      this.getChildren().forEach((s, a) => {
        if (we(s, this.props.transitionDuration), o === a && r) {
          if (o === t)
            return _(s, null);
          _(s, o < t ? this.itemTranslateOffsets.slice(o + 1, t + 1).reduce((c, d) => c + d, 0) : this.itemTranslateOffsets.slice(t, o).reduce((c, d) => c + d, 0) * -1);
        } else
          o < t && a > o && a <= t ? _(s, -i) : a < o && o > t && a >= t ? _(s, i) : _(s, null);
      });
    });
    S(this, "isDraggedItemOutOfBounds", () => {
      const t = this.getChildren()[this.state.itemDragged].getBoundingClientRect(), o = this.ghostRef.current.getBoundingClientRect();
      return Math.abs(t.left - o.left) > o.width ? (this.state.itemDraggedOutOfBounds === -1 && this.setState({ itemDraggedOutOfBounds: this.state.itemDragged }), !0) : (this.state.itemDraggedOutOfBounds > -1 && this.setState({ itemDraggedOutOfBounds: -1 }), !1);
    });
    S(this, "onEnd", (t) => {
      t.cancelable && t.preventDefault(), document.removeEventListener("mousemove", this.schdOnMouseMove), document.removeEventListener("touchmove", this.schdOnTouchMove), document.removeEventListener("mouseup", this.schdOnEnd), document.removeEventListener("touchup", this.schdOnEnd), document.removeEventListener("touchcancel", this.schdOnEnd);
      const o = this.props.removableByMove && this.isDraggedItemOutOfBounds();
      !o && this.props.transitionDuration > 0 && this.afterIndex !== -2 && xe(() => {
        we(this.ghostRef.current, this.props.transitionDuration, "cubic-bezier(.2,1,.1,1)"), this.afterIndex < 1 && this.state.itemDragged === 0 ? _(this.ghostRef.current, 0, 0) : _(
          this.ghostRef.current,
          // compensate window scroll
          -(window.pageYOffset - this.lastYOffset) + // compensate container scroll
          -(this.listRef.current.scrollTop - this.lastListYOffset) + (this.state.itemDragged < this.afterIndex ? this.itemTranslateOffsets.slice(this.state.itemDragged + 1, this.afterIndex + 1).reduce((i, r) => i + r, 0) : this.itemTranslateOffsets.slice(this.afterIndex < 0 ? 0 : this.afterIndex, this.state.itemDragged).reduce((i, r) => i + r, 0) * -1),
          0
        );
      })(), this.dropTimeout = window.setTimeout(this.finishDrop, o || this.afterIndex === -2 ? 0 : this.props.transitionDuration);
    });
    S(this, "finishDrop", () => {
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
        we(s, 0), _(s, null), s.style.touchAction = "";
      }), this.setState({ itemDragged: -1, scrollingSpeed: 0 }), this.afterIndex = -2, this.lastScroll > 0 && (this.listRef.current.scrollTop = this.lastScroll, this.lastScroll = 0);
    });
    S(this, "onKeyDown", (t) => {
      const o = this.state.selectedItem, i = this.getTargetIndex(t);
      if (!It(t.target, t.currentTarget) && i !== -1) {
        if (t.key === " " && (t.preventDefault(), o === i ? (o !== this.needle && (this.getChildren().forEach((r) => {
          we(r, 0), _(r, null);
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
          const r = Oe(this.getChildren()[o]);
          this.needle++, this.animateItems(this.needle, o, r, !0), this.setState({
            liveText: this.props.voiceover.moved(this.needle + 1, !1)
          });
        }
        if ((t.key === "ArrowUp" || t.key === "k") && o > -1 && this.needle > 0) {
          t.preventDefault();
          const r = Oe(this.getChildren()[o]);
          this.needle--, this.animateItems(this.needle, o, r, !0), this.setState({
            liveText: this.props.voiceover.moved(this.needle + 1, !0)
          });
        }
        t.key === "Escape" && o > -1 && (this.getChildren().forEach((r) => {
          we(r, 0), _(r, null);
        }), this.setState({
          selectedItem: -1,
          liveText: this.props.voiceover.canceled(o + 1)
        }), this.needle = -1), (t.key === "Tab" || t.key === "Enter") && o > -1 && t.preventDefault();
      }
    });
    this.schdOnMouseMove = xe(this.onMouseMove), this.schdOnTouchMove = xe(this.onTouchMove), this.schdOnEnd = xe(this.onEnd);
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
    return le.createElement(
      le.Fragment,
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
      this.state.itemDragged > -1 && Zn.createPortal(this.props.renderItem({
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
      le.createElement("div", { "aria-live": "assertive", role: "log", "aria-atomic": "true", style: {
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
S($t, "defaultProps", {
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
const eo = $t, N = window.React, yt = window.React.useState, Ct = window.React.useEffect, to = window.Blueprint.Core.MenuItem, no = window.Blueprint.Core.Icon, oo = window.Blueprint.Select.Omnibar, io = window.ReactDOM, q = {
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
function so(e) {
  return e.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
function Et(e, n) {
  let t = 0;
  const o = n.split(/\s+/).filter((a) => a.length > 0).map(so);
  if (o.length === 0)
    return [e];
  const i = new RegExp(o.join("|"), "gi"), r = [];
  for (; ; ) {
    const a = i.exec(e);
    if (!a)
      break;
    const c = a[0].length, d = e.slice(t, i.lastIndex - c);
    d.length > 0 && r.push(d), t = i.lastIndex, r.push(/* @__PURE__ */ N.createElement("strong", { key: t }, a[0]));
  }
  const s = e.slice(t);
  return s.length > 0 && r.push(s), r;
}
const ao = document.body, Ut = "roam-tabs-switch-el";
let ve = document.querySelector(`.${Ut}`);
function ro(e, n) {
  ve || (ve = document.createElement("div"), ve.className = Ut, ao.appendChild(ve)), io.createRoot(ve).render(
    /* @__PURE__ */ N.createElement(
      co,
      {
        tabs: e,
        currentTab: n,
        onTabSorted: (t) => {
          D(t, n);
        },
        onTabSelect: (t) => {
          st(t.tabId);
        }
      }
    )
  );
}
function co({ tabs: e, currentTab: n, onTabSelect: t, onTabSorted: o }) {
  const [i, r] = yt({
    open: !1
  });
  Ct(() => q.listen((u) => {
    r({ open: u });
  }), []);
  const [s, a] = yt([]), [c, d] = N.useState(null);
  return N.useEffect(() => {
    if (document.querySelector(".roam-tabs-switch-el")) {
      d(document.querySelector(".roam-tabs-switch-el"));
      return;
    }
    const u = document.createElement("div");
    return u.className = "roam-tabs-switch-el", document.body.appendChild(u), d(u), () => {
      u.remove();
    };
  }, []), Ct(() => {
    i.open ? setTimeout(() => {
      const u = document.querySelector(
        ".bp3-omnibar input"
      );
      u && u.select();
    }, 0) : a([]);
  }, [i.open]), /* @__PURE__ */ N.createElement(
    oo,
    {
      isOpen: i.open,
      onClose: () => q.close(),
      overlayProps: {
        className: "roam-tabs-switch-omnibar"
      },
      items: e,
      itemPredicate: (u, p) => p.title.toLowerCase().includes(u.toLowerCase()),
      itemRenderer: (u, p) => /* @__PURE__ */ N.createElement(
        to,
        {
          onClick: p.handleClick,
          ...p.modifiers,
          text: Et(u.title, p.query)
        }
      ),
      onItemSelect: (u) => {
        t(u), q.close();
      },
      itemListRenderer: (u) => {
        const p = s.length > 0 && s.every(
          (m) => u.filteredItems.some((f) => f.tabId === m.tabId)
        ) ? s : u.filteredItems;
        return /* @__PURE__ */ N.createElement(
          eo,
          {
            container: c,
            values: p,
            onChange: ({
              oldIndex: m,
              newIndex: f
            }) => {
              const b = Qn(
                p,
                m,
                f
              );
              o(b), a(b);
            },
            renderList: ({
              children: m,
              props: f,
              isDragged: b
            }) => (b ? c == null || c.classList.add("show") : c == null || c.classList.remove("show"), /* @__PURE__ */ N.createElement(
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
              m
            )),
            renderItem: ({
              value: m,
              props: f,
              isDragged: b,
              isSelected: I
            }) => {
              var M;
              return /* @__PURE__ */ N.createElement(
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
                /* @__PURE__ */ N.createElement(
                  "div",
                  {
                    className: `bp3-menu-item${(n == null ? void 0 : n.tabId) === m.tabId ? " bp3-active" : ""}`,
                    style: {
                      background: ((M = u.activeItem) == null ? void 0 : M.tabId) === m.tabId ? "#efefef" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      padding: "10px 7px"
                    },
                    onClick: () => {
                      t(m), q.close();
                    }
                  },
                  /* @__PURE__ */ N.createElement("span", { className: "roam-switch-command-title" }, Et(m.title, u.query)),
                  u.query ? null : /* @__PURE__ */ N.createElement(
                    no,
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
const lo = window.React, R = {
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
function uo(e) {
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
  }), ne.on_uninstall(() => {
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
            ), t.target.checked ? ut() : pn();
          }
        }
      },
      ...Ee() ? [
        {
          id: R.Client,
          name: "Initial Tabs for Visitors",
          description: "Set initial tabs for collaborators and visitors",
          action: {
            type: "reactComponent",
            component: ({}) => {
              var t;
              return /* @__PURE__ */ lo.createElement(
                en,
                {
                  selected: (((t = Wt()) == null ? void 0 : t.tabs) || []).map(
                    (o) => ({
                      value: o.uid,
                      label: o.title
                    })
                  ),
                  onSave: (o) => bo(
                    o.map((i) => ({
                      tabId: Mt(i.value),
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
      t && ye(t.tabId);
    }
  }), C.ui.commandPalette.addCommand({
    label: "Roam Tabs: Close Other Tabs",
    callback: () => {
      var o;
      const t = (o = x()) == null ? void 0 : o.activeTab;
      t && Yt(t.tabId);
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
      o !== -1 && Kt(o);
    }
  }), C.ui.commandPalette.addCommand({
    label: "Roam Tabs: Pin",
    callback: () => {
      var o;
      const t = (o = x()) == null ? void 0 : o.activeTab;
      t && et(t.tabId);
    }
  });
  const n = (t) => {
    if (!(t.metaKey || t.ctrlKey) || t.shiftKey || t.altKey)
      return;
    const o = t.code === "BracketLeft" || t.key === "[" ? "back" : t.code === "BracketRight" || t.key === "]" ? "forward" : void 0;
    !o || !ko() || (t.preventDefault(), t.stopPropagation(), !(o === "back" ? So() : To())) || (o === "back" ? Io() : yo());
  };
  document.addEventListener("keydown", n, !0), ne.on_uninstall(() => {
    document.removeEventListener("keydown", n, !0);
  }), Ze() && ut(), J();
}
function Ze() {
  return C.settings.get(R.StackRememberLastEditedBlock) === !0;
}
function fo() {
  return C && C.settings.get(R.StackPageWidth) || 650;
}
const J = () => {
  setTimeout(() => {
    var t, o, i;
    ho();
    const e = [...((t = x()) == null ? void 0 : t.tabs) || []], n = (o = x()) != null && o.activeTab ? { ...(i = x()) == null ? void 0 : i.activeTab } : void 0;
    Xn(e, n), mo(), ro(e, n);
  }, 10);
}, mo = () => {
  setTimeout(() => {
    var o, i, r;
    const e = ((o = x()) == null ? void 0 : o.tabs) || [], n = ((i = x()) == null ? void 0 : i.activeTab) || void 0, t = ((r = x()) == null ? void 0 : r.collapsedUids) || [];
    $n(
      C.settings.get(R.TabMode),
      e,
      n,
      fo(),
      t
    );
  });
}, ho = () => {
  const e = document.querySelector(".roam-app");
  e && (Xt() ? e.classList.add("roam-app-stack") : e.classList.remove("roam-app-stack"));
}, Ee = () => {
  var e;
  return ((e = window.roamAlphaAPI.user) == null ? void 0 : e.isAdmin()) ?? !1;
}, Ne = () => {
  var e;
  return ((e = window.roamAlphaAPI.user) == null ? void 0 : e.uid()) ?? "";
};
function Mt(e = "") {
  const n = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`, t = typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : n;
  return e ? `tab-${e}-${t}` : `tab-${t}`;
}
function po(e, n) {
  return `legacy-tab-${n}-${e.uid}-${e.blockUid || e.uid}`;
}
function Rt(e) {
  if (e != null && e.uid)
    return {
      uid: e.uid,
      title: e.title || e.uid,
      blockUid: e.blockUid || e.uid
    };
}
function Ue(e, n = 0) {
  if (e != null && e.uid)
    return {
      tabId: e.tabId || po(e, n),
      uid: e.uid,
      title: e.title || e.uid,
      blockUid: e.blockUid || e.uid,
      scrollTop: e.scrollTop,
      pin: e.pin ?? !1,
      backStack: (e.backStack || []).map((t) => Rt(t)).filter(Boolean),
      forwardStack: (e.forwardStack || []).map((t) => Rt(t)).filter(Boolean)
    };
}
function Bt(e, n) {
  return !(e != null && e.uid) || !(n != null && n.uid) ? !1 : e.uid === n.uid && (e.blockUid || e.uid) === (n.blockUid || n.uid) && (e.title || e.uid) === (n.title || n.uid);
}
function Te(e) {
  if (!e)
    return;
  const n = (e.tabs || []).map((i, r) => Ue(i, r)).filter(Boolean), t = Ue(e.activeTab, n.length), o = t ? n.find((i) => i.tabId === t.tabId) || n.find((i) => Bt(i, t)) || t : void 0;
  return {
    tabs: n,
    ...o && { activeTab: o },
    collapsedUids: e.collapsedUids || []
  };
}
function Nt(e) {
  return e.map((n, t) => Ue(n, t)).filter(Boolean);
}
function go(e, n) {
  const t = Ue(n, e.length);
  if (t)
    return e.find((o) => o.tabId === t.tabId) || e.find((o) => Bt(o, t)) || t;
}
function ue() {
  const e = Ne();
  return Ee() ? `${R.Tabs}-${e}` : `${R.ClientConfig}-${e}`;
}
function Me() {
  return C.settings.get(R.Auto) === !0;
}
function it() {
  return !!C.settings.get(R.ClientCanSaveConfig);
}
function x() {
  if (Ee()) {
    const n = C.settings.get(ue());
    return Te(n || (C.settings.get(R.Tabs) ?? {
      tabs: []
    }));
  }
  if (!Ne())
    return Te(
      C.settings.get(R.ClientConfig) ?? {
        tabs: []
      }
    );
  if (it())
    try {
      const n = localStorage.getItem(ue());
      if (n)
        return Te(JSON.parse(n));
    } catch (n) {
      console.error("Failed to parse cached tabs from localStorage:", n);
    }
  return Wt();
}
function Wt() {
  return Te(
    C.settings.get(R.ClientConfig) ?? {
      tabs: []
    }
  );
}
function bo(e) {
  C.settings.set(R.ClientConfig, {
    tabs: Nt(e)
  });
}
function D(e, n) {
  Co(e, n), J();
}
function ye(e) {
  var a;
  const n = x(), t = (n == null ? void 0 : n.tabs) || [], o = t.find((c) => c.tabId === e);
  if (!o)
    return;
  const i = t.findIndex((c) => c.tabId === e);
  if (o.pin) {
    const c = t.findIndex((d) => !d.pin);
    c > -1 && D(t, t[c]);
    return;
  }
  const r = t.filter((c) => c.tabId !== e);
  if (((a = n == null ? void 0 : n.activeTab) == null ? void 0 : a.tabId) !== e) {
    D(r, n == null ? void 0 : n.activeTab);
    return;
  }
  const s = r.length ? r[Math.min(i, r.length - 1)] : void 0;
  D(r, s), setTimeout(() => {
    s ? window.roamAlphaAPI.ui.mainWindow.openBlock({
      block: {
        uid: s.blockUid || s.uid
      }
    }) : window.roamAlphaAPI.ui.mainWindow.openDailyNotes();
  }, 100);
}
function wo(e) {
  const n = x(), t = [...(n == null ? void 0 : n.tabs) || []], o = t.findIndex((i) => i.tabId === e);
  o > -1 && (t[o].blockUid = t[o].uid, D(t, t[o]));
}
function st(e) {
  const n = x(), t = (n == null ? void 0 : n.tabs) || [], o = t.findIndex((i) => i.tabId === e);
  o > -1 && (D(t, t[o]), window.roamAlphaAPI.ui.mainWindow.openBlock({
    block: {
      uid: t[o].blockUid || t[o].uid
    }
  }));
}
function Ce(e) {
  return e ? !!window.roamAlphaAPI.q(`
[
  :find ?e .
  :where
    [?e :block/uid "${e}"]
]
`) : !1;
}
function at(e) {
  if (!(!(e != null && e.uid) || !Ce(e.uid)))
    return e.blockUid && Ce(e.blockUid) ? e : {
      ...e,
      blockUid: e.uid
    };
}
function Z(e = []) {
  const n = [...e];
  for (; n.length; ) {
    const t = at(n[n.length - 1]);
    if (t) {
      n[n.length - 1] = t;
      break;
    }
    n.pop();
  }
  return n;
}
function Ot(e = [], n = []) {
  return e.length === n.length && e.every((t, o) => {
    const i = n[o];
    return t.uid === (i == null ? void 0 : i.uid) && t.title === (i == null ? void 0 : i.title) && t.blockUid === (i == null ? void 0 : i.blockUid);
  });
}
function rt(e) {
  if (e)
    return at({
      uid: e.uid,
      title: e.title,
      blockUid: e.blockUid
    });
}
function te(e, n) {
  return {
    tabId: (n == null ? void 0 : n.tabId) || Mt(e.uid),
    uid: e.uid,
    title: e.title,
    blockUid: e.blockUid || e.uid,
    scrollTop: n == null ? void 0 : n.scrollTop,
    pin: (n == null ? void 0 : n.pin) ?? !1,
    backStack: [...(n == null ? void 0 : n.backStack) || []],
    forwardStack: [...(n == null ? void 0 : n.forwardStack) || []]
  };
}
function qt(e, n) {
  const t = rt(e);
  return {
    ...e,
    ...n,
    pin: e.pin,
    backStack: t ? [...e.backStack || [], t] : [...e.backStack || []],
    forwardStack: []
  };
}
function Ht(e, n) {
  const t = rt(e);
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
function _t(e) {
  const n = Z(e.backStack || []);
  return n[n.length - 1];
}
function Ft(e) {
  const n = Z(e.forwardStack || []);
  return n[n.length - 1];
}
function ct(e, n, t) {
  const o = at(n);
  if (!o)
    return;
  const i = o.blockUid || o.uid;
  return e.find(
    (r) => r.tabId !== t && r.uid === o.uid && (r.blockUid || r.uid) === i
  );
}
function vo(e) {
  return e ? Z(e.backStack || []).length > 0 || Z(e.forwardStack || []).length > 0 : !1;
}
function ko() {
  var e;
  return vo((e = x()) == null ? void 0 : e.activeTab);
}
function So() {
  var n;
  const e = (n = x()) == null ? void 0 : n.activeTab;
  return !!e && !!_t(e);
}
function To() {
  var n;
  const e = (n = x()) == null ? void 0 : n.activeTab;
  return !!e && !!Ft(e);
}
async function zt(e) {
  const n = x(), t = n == null ? void 0 : n.activeTab, o = (n == null ? void 0 : n.tabs) || [];
  if (!t)
    return !1;
  const i = rt(t), r = Z(t.backStack || []), s = Z(
    t.forwardStack || []
  ), a = {
    ...t,
    backStack: r,
    forwardStack: s
  }, c = !Ot(t.backStack || [], r) || !Ot(t.forwardStack || [], s), d = e === "back" ? _t(a) : Ft(a);
  if (!d) {
    if (c) {
      const f = o.map(
        (b) => b.tabId === t.tabId ? a : b
      );
      D(f, a);
    }
    return !1;
  }
  const u = ct(
    o,
    d,
    t.tabId
  );
  if (u) {
    if (c) {
      const f = o.map(
        (b) => b.tabId === t.tabId ? a : b
      );
      return D(f, u), await fe(u), !0;
    }
    return st(u.tabId), !0;
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
  }, m = o.map(
    (f) => f.tabId === t.tabId ? p : f
  );
  return D(m, p), await fe(p), !0;
}
function Io() {
  return zt("back");
}
function yo() {
  return zt("forward");
}
let Pe = null;
function xt(e) {
  return !e || !Ce(e) ? void 0 : window.roamAlphaAPI.q(`
[
    :find ?e .
    :where
     [?b :block/uid "${e}"]
     [?b :block/page ?p]
     [?p :block/uid ?e]
]
`) || e;
}
async function fe(e) {
  if (!e)
    return;
  const n = e.blockUid && Ce(e.blockUid) && e.blockUid || Ce(e.uid) && e.uid || void 0;
  if (!n)
    return;
  const t = window.roamAlphaAPI.ui.mainWindow.getOpenPageOrBlockUid(), o = xt(n), i = xt(t);
  if (t !== n && !(n === o && i === o) && Pe !== n) {
    Pe = n;
    try {
      await window.roamAlphaAPI.ui.mainWindow.openBlock({
        block: {
          uid: n
        }
      });
    } finally {
      setTimeout(() => {
        Pe === n && (Pe = null);
      }, 0);
    }
  }
}
function Yt(e) {
  const n = x(), t = (n == null ? void 0 : n.tabs) || [], o = t.find((r) => r.tabId === e);
  if (!o)
    return;
  const i = t.filter((r) => r.pin || r.tabId === e);
  D(i, o);
}
function Kt(e) {
  const n = x(), t = (n == null ? void 0 : n.tabs) || [], o = [
    ...t.slice(0, e + 1),
    ...t.slice(e + 1).filter((s) => s.pin)
  ], i = o.findIndex(
    (s) => {
      var a;
      return s.tabId === ((a = n == null ? void 0 : n.activeTab) == null ? void 0 : a.tabId);
    }
  ), r = i === -1 || i > e ? o[e] : n == null ? void 0 : n.activeTab;
  D(o, r);
}
function et(e) {
  var s;
  const n = x(), o = ((n == null ? void 0 : n.tabs) || []).map(
    (a) => a.tabId === e ? { ...a, pin: !a.pin } : a
  ), i = [
    ...o.filter((a) => a.pin),
    ...o.filter((a) => !a.pin)
  ], r = i.find((a) => a.tabId === e) || (((s = n == null ? void 0 : n.activeTab) == null ? void 0 : s.tabId) === e ? { ...n.activeTab, pin: !n.activeTab.pin } : n == null ? void 0 : n.activeTab);
  D(i, r);
}
function Co(e, n) {
  if (!Ne())
    return;
  const o = x(), i = Nt(e), r = go(i, n), s = {
    tabs: i,
    ...r && { activeTab: r },
    collapsedUids: (o == null ? void 0 : o.collapsedUids) || []
  };
  if (Ee()) {
    C.settings.set(ue(), s);
    return;
  }
  if (it())
    try {
      localStorage.setItem(ue(), JSON.stringify(s));
    } catch (a) {
      console.error("Failed to save tabs to localStorage:", a);
    }
}
function Xt() {
  return C.settings.get(R.TabMode) === "stack";
}
function Ve(e) {
  if (!Ne())
    return;
  const t = x() || { tabs: [] }, o = {
    tabs: t.tabs || [],
    ...t.activeTab && { activeTab: t.activeTab },
    collapsedUids: e
  };
  if (Ee()) {
    C.settings.set(ue(), o), J();
    return;
  }
  if (it())
    try {
      localStorage.setItem(ue(), JSON.stringify(o)), J();
    } catch (i) {
      console.error("Failed to save collapsedUids to localStorage:", i);
    }
}
function Eo({ extensionAPI: e }) {
  uo(e);
}
function Ro() {
  ne.uninstall();
}
const Po = {
  onload: Eo,
  onunload: Ro
};
export {
  Po as default
};
//# sourceMappingURL=extension.js.map
