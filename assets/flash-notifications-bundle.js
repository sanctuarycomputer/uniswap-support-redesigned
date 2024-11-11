import {
  u as e,
  r as s,
  j as o,
  N as n,
  T as t,
  C as a,
  a9 as r,
  a6 as i,
  a7 as c,
  a8 as l,
} from 'shared';
function d({ notifications: r, closeLabel: i }) {
  const { addToast: c } = e();
  return (
    s.useEffect(() => {
      for (const e of r) {
        const { type: s, title: r, message: l } = e;
        c(({ close: e }) =>
          o.jsxs(n, {
            type: s,
            children: [
              r && o.jsx(t, { children: r }),
              l,
              o.jsx(a, { 'aria-label': i, onClick: e }),
            ],
          })
        );
      }
    }, [c, r, i]),
    o.jsx(o.Fragment, {})
  );
}
function f(e, s) {
  const n = window.sessionStorage.getItem(r);
  if (null !== n) {
    window.sessionStorage.removeItem(r);
    try {
      const t = JSON.parse(n),
        a = document.createElement('div');
      document.body.appendChild(a),
        i.render(
          o.jsx(c, { theme: l(e), children: o.jsx(d, { notifications: t, closeLabel: s }) }),
          a
        );
    } catch (e) {
      console.error('Cannot render flash notifications', e);
    }
  }
}
export { f as renderFlashNotifications };
