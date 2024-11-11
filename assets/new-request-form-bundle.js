import {
  j as e,
  F as n,
  L as t,
  S as s,
  I as r,
  M as a,
  H as o,
  r as i,
  u as l,
  a as u,
  N as c,
  T as d,
  C as m,
  s as f,
  b as h,
  d as p,
  e as j,
  O as b,
  f as g,
  h as x,
  i as w,
  k as v,
  l as q,
  p as y,
  m as k,
  n as _,
  o as C,
  P as S,
  A as I,
  q as T,
  t as F,
  v as P,
  D as R,
  w as L,
  K as N,
  x as $,
  y as E,
  z as D,
  B as M,
  E as V,
  G as A,
  J as z,
  Q as G,
  R as H,
  U as X,
  V as B,
  W as O,
  X as U,
  Y as W,
  Z as K,
  _ as Y,
  $ as Z,
  a0 as J,
  a1 as Q,
  a2 as ee,
  a3 as ne,
  a4 as te,
  a5 as se,
  a6 as re,
  a7 as ae,
  a8 as oe,
} from 'shared';
function ie({ field: i, onChange: l }) {
  const { label: u, error: c, value: d, name: m, required: f, description: h, type: p } = i,
    j = {},
    b = 'integer' === p || 'decimal' === p ? 'number' : 'text';
  'integer' === p && (j.step = '1'), 'decimal' === p && (j.step = 'any');
  const g = 'anonymous_requester_email' === p ? 'email' : void 0;
  return e.jsxs(n, {
    className: 'custom-form-field-layout',
    children: [
      e.jsxs(t, {
        className: 'custom-title',
        children: [u, f && e.jsx(s, { 'aria-hidden': 'true', children: '*' })],
      }),
      e.jsx(r, {
        name: m,
        type: b,
        defaultValue: d && '' !== d ? d : `Enter ${u}`,
        validation: c ? 'error' : void 0,
        required: f,
        onChange: (e) => {
          l && l(e.target.value);
        },
        autoComplete: g,
        className: 'custom-input',
        ...j,
      }),
      c && e.jsx(a, { validation: 'error', children: c }),
      h && e.jsx(o, { dangerouslySetInnerHTML: { __html: h } }),
    ],
  });
}
const le = f(a)`
  .ck.ck-editor + & {
    margin-top: ${(e) => e.theme.space.xs};
  }
`;
function ue({
  field: r,
  hasWysiwyg: a,
  baseLocale: f,
  hasAtMentions: p,
  userRole: j,
  brandId: b,
  onChange: g,
}) {
  const { label: x, error: w, value: v, name: q, required: y, description: k } = r,
    _ = (function ({ hasWysiwyg: n, baseLocale: t, hasAtMentions: s, userRole: r, brandId: a }) {
      const o = i.useRef(!1),
        { addToast: f } = l(),
        { t: h } = u();
      return i.useCallback(
        async (i) => {
          if (n && i && !o.current) {
            o.current = !0;
            const { createEditor: n } = await import('wysiwyg').then(function (e) {
              return e.m;
            });
            (
              await n(i, {
                editorType: 'supportRequests',
                hasAtMentions: s,
                userRole: r,
                brandId: a,
                baseLocale: t,
              })
            ).plugins
              .get('Notification')
              .on('show', (n, t) => {
                n.stop();
                const s = t.message instanceof Error ? t.message.message : t.message,
                  { type: r, title: a } = t;
                f(({ close: n }) =>
                  e.jsxs(c, {
                    type: r,
                    children: [
                      e.jsx(d, { children: a }),
                      s,
                      e.jsx(m, {
                        'aria-label': h('new-request-form.close-label', 'Close'),
                        onClick: n,
                      }),
                    ],
                  })
                );
              });
          }
        },
        [n, t, s, r, a, f, h]
      );
    })({ hasWysiwyg: a, baseLocale: f, hasAtMentions: p, userRole: j, brandId: b });
  return e.jsxs(n, {
    className: 'custom-form-field-layout',
    children: [
      e.jsxs(t, {
        className: 'custom-title',
        children: [x, y && e.jsx(s, { 'aria-hidden': 'true', children: '*' })],
      }),
      e.jsx(h, {
        ref: _,
        name: q,
        defaultValue: v && '' !== v ? v : 'Describe your issue.',
        validation: w ? 'error' : void 0,
        required: y,
        onChange: (e) => g(e.target.value),
        rows: 6,
        isResizable: !0,
      }),
      w && e.jsx(le, { validation: 'error', children: w }),
      k && e.jsx(o, { className: 'custom-hint', dangerouslySetInnerHTML: { __html: k } }),
    ],
  });
}
function ce() {
  const { t: n } = u();
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx(s, { 'aria-hidden': 'true', children: 'Select an option' }),
      e.jsx(s, {
        hidden: !0,
        children: n('new-request-form.dropdown.empty-option', 'Select an option'),
      }),
    ],
  });
}
function de({ field: n, onChange: t }) {
  const { label: s, options: r, error: a, value: o, name: l, required: u, description: c } = n,
    d = null == o ? '' : o.toString(),
    m = i.useRef(null);
  return (
    i.useEffect(() => {
      if (m.current && u) {
        const e = m.current.querySelector('[role=combobox]');
        e?.setAttribute('aria-required', 'true');
      }
    }, [m, u]),
    e.jsxs(p, {
      className: 'custom-form-field-layout',
      children: [
        e.jsxs(j, {
          ref: m,
          inputProps: { name: l, required: u },
          isEditable: !1,
          validation: a ? 'error' : void 0,
          inputValue: d,
          selectionValue: d,
          renderValue: ({ selection: n }) => n?.label || e.jsx(ce, {}),
          onChange: ({ selectionValue: e }) => {
            void 0 !== e && t(e);
          },
          className: 'custom-combobox',
          children: [
            !u && e.jsx(b, { value: '', label: '-', children: e.jsx(ce, {}) }),
            r.map((n) => e.jsx(b, { value: n.value.toString(), label: n.name }, n.value)),
          ],
        }),
        a && e.jsx(g, { validation: 'error', children: a }),
        c && e.jsx(x, { dangerouslySetInnerHTML: { __html: c } }),
      ],
    })
  );
}
function me({ field: r, onChange: l }) {
  const { label: u, error: c, value: d, name: m, required: f, description: h } = r,
    [p, j] = i.useState(d);
  return e.jsxs(n, {
    children: [
      e.jsx('input', { type: 'hidden', name: m, value: 'off' }),
      e.jsxs(w, {
        name: m,
        required: f,
        defaultChecked: d,
        value: p ? 'on' : 'off',
        onChange: (e) => {
          const { checked: n } = e.target;
          j(n), l(n);
        },
        children: [
          e.jsxs(t, { children: [u, f && e.jsx(s, { 'aria-hidden': 'true', children: '*' })] }),
          h && e.jsx(o, { dangerouslySetInnerHTML: { __html: h } }),
        ],
      }),
      c && e.jsx(a, { validation: 'error', children: c }),
    ],
  });
}
const fe = '[]';
function he(e) {
  return `[${e.join('::')}]`;
}
function pe(e) {
  return e.startsWith('[') && e.endsWith(']');
}
function je(e) {
  const n = he(e.slice(0, -1));
  return {
    type: 'SubGroup',
    name: e[e.length - 1],
    backOption: { type: 'previous', label: 'Back', value: n },
    options: [],
  };
}
function be({ options: e, hasEmptyOption: n }) {
  const t = i.useMemo(
      () =>
        (function (e, n) {
          const t = { [fe]: { type: 'RootGroup', options: n ? [{ label: '-', value: '' }] : [] } };
          return (
            e.forEach((e) => {
              const { name: n, value: s } = e;
              if (n.includes('::')) {
                const [e, r] = (function (e) {
                    const n = e.split('::');
                    return [n.slice(0, -1), n.slice(-1)[0]];
                  })(n),
                  a = he(e);
                t[a] || (t[a] = je(e)),
                  t[a]?.options.push({ value: s, label: n.split('::').join(' > '), menuLabel: r });
                for (let n = 0; n < e.length; n++) {
                  const s = e.slice(0, n),
                    r = e.slice(0, n + 1),
                    a = he(s),
                    o = he(r);
                  t[a] || (t[a] = je(s)),
                    void 0 === t[a]?.options.find((e) => e.value === o) &&
                      t[a]?.options.push({ type: 'next', label: r[r.length - 1], value: o });
                }
              } else t[fe].options.push({ value: s, label: n });
            }),
            t
          );
        })(e, n),
      [e, n]
    ),
    [s, r] = i.useState(
      (function (e) {
        const n = { type: 'RootGroup', options: [] };
        return (
          Object.values(e).forEach(({ options: e }) => {
            n.options.push(...e.filter(({ type: e }) => void 0 === e));
          }),
          n
        );
      })(t)
    );
  i.useEffect(() => {
    r(t[fe]);
  }, [t]);
  return {
    currentGroup: s,
    isGroupIdentifier: pe,
    setCurrentGroupByIdentifier: (e) => {
      const n = t[e];
      n && r(n);
    },
  };
}
function ge({ field: n }) {
  const { label: t, options: r, error: a, value: o, name: l, required: u, description: c } = n,
    {
      currentGroup: d,
      isGroupIdentifier: m,
      setCurrentGroupByIdentifier: f,
    } = be({ options: r, hasEmptyOption: !1 }),
    [h, w] = i.useState(o || []),
    y = i.useRef(null);
  i.useEffect(() => {
    if (y.current && u) {
      const e = y.current.querySelector('[role=combobox]');
      e?.setAttribute('aria-required', 'true');
    }
  }, [y, u]);
  return e.jsxs(p, {
    className: 'custom-form-field-layout',
    children: [
      h.map((n) => e.jsx('input', { type: 'hidden', name: `${l}[]`, value: n }, n)),
      e.jsxs(v, {
        className: 'custom-title',
        children: [t, u && e.jsx(s, { 'aria-hidden': 'true', children: '*' })],
      }),
      e.jsxs(j, {
        ref: y,
        isMultiselectable: !0,
        inputProps: { required: u },
        isEditable: !1,
        validation: a ? 'error' : void 0,
        onChange: (e) => {
          if (Array.isArray(e.selectionValue)) {
            const n = e.selectionValue.slice(-1).toString();
            m(n) ? f(n) : w(e.selectionValue);
          }
        },
        selectionValue: h,
        maxHeight: 'auto',
        className: 'custom-combobox',
        children: [
          'SubGroup' === d.type && e.jsx(b, { ...d.backOption }),
          'SubGroup' === d.type
            ? e.jsx(q, {
                'aria-label': d.name,
                children: d.options.map((n) =>
                  e.jsx(b, { ...n, children: n.menuLabel ?? n.label }, n.value)
                ),
              })
            : d.options.map((n) => e.jsx(b, { ...n }, n.value)),
        ],
      }),
      a && e.jsx(g, { validation: 'error', children: a }),
      c && e.jsx(x, { dangerouslySetInnerHTML: { __html: c } }),
    ],
  });
}
const xe = 'return-focus-to-ticket-form-field';
function we({ field: n, newRequestPath: t }) {
  const s = i.createRef();
  return (
    i.useEffect(() => {
      sessionStorage.getItem(xe) && (sessionStorage.removeItem(xe), s.current?.firstChild?.focus());
    }, []),
    e.jsxs(e.Fragment, {
      children: [
        e.jsx('input', { type: 'hidden', name: n.name, value: n.value }),
        n.options.length > 1 &&
          e.jsxs(p, {
            children: [
              e.jsx(v, { children: n.label }),
              e.jsx(j, {
                isEditable: !1,
                onChange: ({ selectionValue: e }) => {
                  if (e && 'number' == typeof e) {
                    const n = new URL(window.location.href);
                    n.searchParams.set('ticket_form_id', e),
                      sessionStorage.setItem(xe, 'true'),
                      window.location.assign(`${t}${n.search}`);
                  }
                },
                ref: s,
                children: n.options.map((t) =>
                  e.jsx(
                    b,
                    {
                      value: t.value,
                      label: t.name,
                      isSelected: n.value === t.value,
                      children: t.name,
                    },
                    t.value
                  )
                ),
              }),
            ],
          }),
      ],
    })
  );
}
function ve({ field: n }) {
  const { value: t, name: s } = n;
  return e.jsx('input', { type: 'hidden', name: s, value: t });
}
function qe(e) {
  const n = i.useRef(!1),
    t = i.useRef(!1);
  return {
    formRefCallback: i.useCallback(
      (s) => {
        s &&
          !n.current &&
          ((n.current = !0),
          (s.submit = async () => {
            if (!1 === t.current) {
              t.current = !0;
              const n = await (async function () {
                  const e = await fetch('/api/v2/help_center/sessions.json'),
                    { current_session: n } = await e.json();
                  return n.csrf_token;
                })(),
                r = document.createElement('input');
              (r.type = 'hidden'), (r.name = 'authenticity_token'), (r.value = n), s.appendChild(r);
              const a = e.filter((e) => 'partialcreditcard' === e.type);
              for (const e of a) {
                const n = s.querySelector(`input[name="${e.name}"]`);
                n &&
                  n instanceof HTMLInputElement &&
                  4 === n.value.length &&
                  (n.value = `XXXXXXXXX${n.value}`);
              }
              HTMLFormElement.prototype.submit.call(s);
            }
          }));
      },
      [e]
    ),
    handleSubmit: (e) => {
      e.preventDefault(), e.target.submit();
    },
  };
}
const ye = ['true', 'false'],
  ke = [
    'pre',
    'strong',
    'b',
    'p',
    'blockquote',
    'ul',
    'ol',
    'li',
    'h2',
    'h3',
    'h4',
    'i',
    'em',
    'br',
  ];
function _e(e, n) {
  if (!Number.isNaN(Number(e))) {
    const t = `request[custom_fields][${e}]`;
    return n.ticketFields.find((e) => e.name === t);
  }
  switch (e) {
    case 'anonymous_requester_email':
      return n.emailField;
    case 'due_at':
      return n.dueDateField;
    case 'collaborators':
      return n.ccField;
    case 'organization_id':
      return n.organizationField;
    default:
      return n.ticketFields.find((n) => n.name === `request[${e}]`);
  }
}
function Ce({ ticketFields: e, ccField: n, dueDateField: t, emailField: s, organizationField: r }) {
  return i.useMemo(
    () =>
      (function (e) {
        const { href: n } = location,
          t = new URL(n).searchParams,
          s = { ...e, ticketFields: [...e.ticketFields] };
        if (n.length > 2048) return e;
        if (t.get('parent_id')) return e;
        for (const [e, n] of t) {
          if (!e.startsWith('tf_')) continue;
          const t = _e(e.substring(3), s);
          if (!t) continue;
          const r = y.sanitize(n, { ALLOWED_TAGS: ke });
          switch (t.type) {
            case 'partialcreditcard':
              continue;
            case 'multiselect':
              t.value = r.split(',').filter((e) => t.options.some((n) => n.value === e));
              break;
            case 'checkbox':
              ye.includes(r) && (t.value = 'true' === r ? 'on' : 'false' === r ? 'off' : '');
              break;
            default:
              t.value = r;
          }
        }
        return s;
      })({ ticketFields: e, ccField: n, dueDateField: t, emailField: s, organizationField: r }),
    [e, n, t, s, r]
  );
}
const Se = f.div`
  flex: 1;
`;
function Ie({ file: n, onRemove: t }) {
  const { t: s } = u(),
    r = (e) => {
      ('Enter' !== e.code && 'Space' !== e.code && 'Delete' !== e.code && 'Backspace' !== e.code) ||
        (e.preventDefault(), t());
    },
    a = 'pending' === n.status ? n.file_name : n.value.file_name,
    o = s('new-request-form.attachments.stop-upload', 'Stop upload'),
    i = s('new-request-form.attachments.remove-file', 'Remove file');
  return e.jsx(k.Item, {
    children: e.jsx(_, {
      type: 'generic',
      title: a,
      onKeyDown: (e) => {
        ('Delete' !== e.code && 'Backspace' !== e.code) || (e.preventDefault(), t());
      },
      children:
        'pending' === n.status
          ? e.jsxs(e.Fragment, {
              children: [
                e.jsx(Se, { children: a }),
                e.jsx(C, {
                  content: o,
                  children: e.jsx(_.Close, {
                    'aria-label': o,
                    onClick: () => {
                      t();
                    },
                    onKeyDown: r,
                  }),
                }),
                e.jsx(S, {
                  value: n.progress,
                  'aria-label': s(
                    'new-request-form.attachments.uploading',
                    'Uploading {{fileName}}',
                    { fileName: a }
                  ),
                }),
              ],
            })
          : e.jsxs(e.Fragment, {
              children: [
                e.jsx(Se, {
                  children: e.jsx(I, {
                    isExternal: !0,
                    href: n.value.url,
                    target: '_blank',
                    children: a,
                  }),
                }),
                e.jsx(C, {
                  content: i,
                  children: e.jsx(_.Delete, {
                    'aria-label': i,
                    onClick: () => {
                      t();
                    },
                    onKeyDown: r,
                  }),
                }),
                e.jsx(S, { value: 100, 'aria-hidden': 'true' }),
              ],
            }),
    }),
  });
}
async function Te() {
  const e = await fetch('/api/v2/users/me.json'),
    {
      user: { authenticity_token: n },
    } = await e.json();
  return n;
}
function Fe({ field: s }) {
  const { label: o, error: f, name: h, attachments: p } = s,
    {
      files: j,
      addPendingFile: b,
      setPendingFileProgress: g,
      setUploaded: x,
      removePendingFile: w,
      removeUploadedFile: v,
    } = (function (e) {
      const [n, t] = i.useState(e);
      return {
        files: n,
        addPendingFile: i.useCallback((e, n, s) => {
          t((t) => [...t, { status: 'pending', id: e, file_name: n, progress: 0, xhr: s }]);
        }, []),
        setPendingFileProgress: i.useCallback((e, n) => {
          t((t) =>
            t.map((t) => ('pending' === t.status && t.id === e ? { ...t, progress: n } : t))
          );
        }, []),
        removePendingFile: i.useCallback((e) => {
          t((n) => n.filter((n) => 'pending' !== n.status || n.id !== e));
        }, []),
        removeUploadedFile: i.useCallback((e) => {
          t((n) => n.filter((n) => 'uploaded' !== n.status || n.value.id !== e));
        }, []),
        setUploaded: i.useCallback((e, n) => {
          t((t) =>
            t.map((t) =>
              'pending' === t.status && t.id === e ? { status: 'uploaded', value: n } : t
            )
          );
        }, []),
      };
    })(p.map((e) => ({ status: 'uploaded', value: e })) ?? []),
    { addToast: q } = l(),
    { t: y } = u(),
    k = i.useCallback(
      (n) => {
        q(({ close: t }) =>
          e.jsxs(c, {
            type: 'error',
            children: [
              e.jsx(d, {
                children: y('new-request-form.attachments.upload-error-title', 'Upload error'),
              }),
              y(
                'new-request-form.attachments.upload-error-description',
                'There was an error uploading {{fileName}}. Try again or upload another file.',
                { fileName: n }
              ),
              e.jsx(m, { 'aria-label': y('new-request-form.close-label', 'Close'), onClick: t }),
            ],
          })
        );
      },
      [q, y]
    ),
    _ = i.useCallback(
      async (e) => {
        const n = await Te();
        for (const t of e) {
          const e = new XMLHttpRequest(),
            s = new URL(`${window.location.origin}/api/v2/uploads.json`);
          if ((s.searchParams.append('filename', t.name), e.open('POST', s), t.type))
            e.setRequestHeader('Content-Type', t.type);
          else {
            const n = T.getType(t.name);
            e.setRequestHeader('Content-Type', n || 'application/octet-stream');
          }
          e.setRequestHeader('X-CSRF-Token', n), (e.responseType = 'json');
          const r = crypto.randomUUID();
          b(r, t.name, e),
            e.upload.addEventListener('progress', ({ loaded: e, total: n }) => {
              const t = Math.round((e / n) * 100);
              t <= 90 && g(r, t);
            }),
            e.addEventListener('load', () => {
              if (e.status >= 200 && e.status < 300) {
                const {
                  upload: {
                    attachment: { file_name: n, content_url: t },
                    token: s,
                  },
                } = e.response;
                x(r, { id: s, file_name: n, url: t });
              } else k(t.name), w(r);
            }),
            e.addEventListener('error', () => {
              k(t.name), w(r);
            }),
            e.send(t);
        }
      },
      [b, w, g, x, k]
    ),
    { getRootProps: C, getInputProps: S, isDragActive: I } = F({ onDrop: _ });
  return e.jsxs(n, {
    className: 'custom-form-field-layout',
    children: [
      e.jsx(t, { className: 'custom-title', children: o }),
      f && e.jsx(a, { validation: 'error', children: f }),
      e.jsxs(P, {
        ...C(),
        isDragging: I,
        className:
          '!border-0 !bg-light-surface-3 dark:!bg-dark-surface-3 !rounded-xl !py-3 flex flex-row space-x-4 !px-4',
        children: [
          e.jsx(Pe, {}),
          I
            ? e.jsx('span', {
                children: y('new-request-form.attachments.drop-files-label', 'Drop files here'),
              })
            : e.jsx('span', {
                className: 'button-label-2 !text-light-neutral-1 dark:!text-dark-neutral-1',
                children: y(
                  'new-request-form.attachments.choose-file-label',
                  'Add file or drop files here'
                ),
              }),
          e.jsx(r, { ...S() }),
        ],
      }),
      j.map((n) =>
        e.jsx(
          Ie,
          {
            file: n,
            onRemove: () => {
              (async (e) => {
                if ('pending' === e.status) e.xhr.abort(), w(e.id);
                else {
                  const n = await Te(),
                    t = e.value.id;
                  v(e.value.id),
                    await fetch(`/api/v2/uploads/${t}.json`, {
                      method: 'DELETE',
                      headers: { 'X-CSRF-Token': n },
                    });
                }
              })(n);
            },
          },
          'pending' === n.status ? n.id : n.value.id
        )
      ),
      j.map(
        (n) =>
          'uploaded' === n.status &&
          e.jsx('input', { type: 'hidden', name: h, value: JSON.stringify(n.value) }, n.value.id)
      ),
    ],
  });
}
const Pe = () =>
  e.jsx('svg', {
    className: 'mx-0.5 min-w-4 min-h-4',
    xmlns: 'http://www.w3.org/2000/svg',
    width: '25',
    height: '24',
    viewBox: '0 0 25 24',
    fill: 'none',
    children: e.jsx('path', {
      d: 'M15.25 6V3.75L19.75 8.25H17.5C15.92 8.25 15.25 7.58 15.25 6ZM17.5 9.75C15.08 9.75 13.75 8.42 13.75 6V3H8.5C6.5 3 5.5 4 5.5 6V18C5.5 20 6.5 21 8.5 21H17.5C19.5 21 20.5 20 20.5 18V9.75H17.5Z',
      className: 'fill-light-neutral-1 dark:fill-dark-neutral-1',
    }),
  });
function Re(e, n) {
  return n.filter((n) => n.child_fields.some((n) => n.id === e));
}
function Le(e, n, t) {
  return e.filter((e) => {
    const s = t.find((n) => n.id === e.parent_field_id);
    if (!s) return !1;
    const r = Re(s.id, n);
    return s.value === e.value && (0 === r.length || Le(r, n, t).length > 0);
  });
}
function Ne(e, n) {
  return 0 === n.length
    ? e
    : e.reduce((t, s) => {
        const r = Re(s.id, n);
        if (0 === r.length) return [...t, s];
        const a = Le(r, n, e);
        return a.length > 0
          ? [
              ...t,
              {
                ...s,
                required: a.some((e) => e.child_fields.some((e) => e.id == s.id && e.is_required)),
              },
            ]
          : t;
      }, []);
}
function $e({ field: l, locale: u, valueFormat: c, onChange: d }) {
  const { label: m, error: f, value: h, name: p, required: j, description: b } = l,
    [g, x] = i.useState(h ? new Date(h) : void 0),
    w = (e) => {
      if (void 0 === e) return '';
      const n = e.toISOString();
      return 'dateTime' === c ? n : n.split('T')[0];
    };
  return e.jsxs(n, {
    children: [
      e.jsxs(t, { children: [m, j && e.jsx(s, { 'aria-hidden': 'true', children: '*' })] }),
      b && e.jsx(o, { dangerouslySetInnerHTML: { __html: b } }),
      e.jsx(R, {
        value: g,
        onChange: (e) => {
          const n = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), 12, 0, 0));
          x(n);
          const t = w(n);
          void 0 !== t && d(t);
        },
        locale: u,
        children: e.jsx(r, {
          required: j,
          lang: u,
          onChange: (e) => {
            '' === e.target.value && (x(void 0), d(''));
          },
          validation: f ? 'error' : void 0,
        }),
      }),
      f && e.jsx(a, { validation: 'error', children: f }),
      e.jsx('input', { type: 'hidden', name: p, value: w(g) }),
    ],
  });
}
const Ee =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  De = f(E)`
  padding: ${(e) => `${e.theme.space.xxs} ${e.theme.space.sm}`};

  // Removes white spaces for inline elements
  font-size: 0;

  // Same as height of Tag size="large" + base space (4px)
  // to give some vertical space between tags
  --line-height: ${(e) => 8 * e.theme.space.base + e.theme.space.base}px;
  line-height: var(--line-height);
`,
  Me = f.span`
  display: inline-block;
  margin-right: ${(e) => e.theme.space.sm};
`,
  Ve = f(D)`
  ${(e) => $({ theme: e.theme, shadowWidth: 'sm', selector: '&:focus' })}
`,
  Ae = f.div`
  display: inline-block;
  position: relative;
`,
  ze = f(E)`
  display: inline-block;
  min-width: 200px;
  opacity: 0;
  user-select: none;
  height: var(--line-height);
  line-height: var(--line-height);
`,
  Ge = f(r)`
  position: absolute;
  top: 0;
  left: 0;
  height: var(--line-height);
  line-height: var(--line-height);
`;
function He({ field: r }) {
  const { label: l, value: c, name: d, error: m, description: f } = r,
    { t: h } = u(),
    p = c ? c.split(',').map((e) => e.trim()) : [],
    [j, b] = i.useState(p),
    [g, x] = i.useState(''),
    w = i.useRef(null),
    v = i.useRef(null),
    {
      getContainerProps: q,
      getGridProps: y,
      getGridRowProps: k,
      getGridCellProps: _,
      getTagCloseProps: S,
      getInputProps: I,
      getAnnouncementProps: T,
      announcement: F,
    } = (function ({
      tags: e,
      onTagsChange: n,
      inputValue: t,
      onInputValueChange: s,
      inputRef: r,
      gridRowRef: a,
      i18n: o,
    }) {
      const [l, u] = i.useState(0),
        [c, d] = i.useState(''),
        m = i.useCallback(
          (e, n) => {
            u(n);
          },
          [u]
        ),
        { getGridProps: f, getGridCellProps: h } = L({
          matrix: [e],
          rowIndex: 0,
          colIndex: l,
          onChange: m,
        }),
        p = (n) => e.includes(n),
        j = (t) => {
          n([...e, t]), d(o.addedTag(t));
        },
        b = (t) => {
          const s = e[t];
          n(e.filter((e, n) => n !== t)),
            d(o.removedTag(s)),
            u(0),
            setTimeout(() => {
              const e = a.current?.querySelector('[tabindex="0"]');
              e?.focus();
            }, 100);
        },
        g = (e) => {
          e.target === e.currentTarget && r.current?.focus();
        },
        x = () => {
          u(0);
        },
        w = (e) => {
          const n = e.target.value;
          !n ||
            (e.key !== N.SPACE && e.key !== N.ENTER && e.key !== N.TAB && e.key !== N.COMMA) ||
            (e.preventDefault(), p(n) || j(n), s(''));
        },
        v = (e) => {
          const n = e.target.value,
            [t, r] = [n.slice(0, -1), n.slice(-1)];
          ' ' === r || ',' === r ? (t.length > 0 && !p(t) && j(t), s('')) : s(n);
        },
        q = (t) => {
          t.preventDefault();
          const s = t.clipboardData.getData('text'),
            r = new Set(s.split(/[\s,;]+/).filter((n) => !e.includes(n)));
          n([...e, ...r]), d(o.addedTags([...r]));
        },
        y = (e) => {
          const n = e.target.value;
          n && (p(n) || j(n), s(''));
        },
        k = (e) => (n) => {
          'Backspace' === n.code && (n.preventDefault(), b(e));
        },
        _ = (e) => () => {
          b(e);
        };
      return {
        getContainerProps: () => ({ onClick: g, onBlur: x, tabIndex: -1 }),
        getGridProps: f,
        getGridRowProps: () => ({ role: 'row' }),
        getGridCellProps: (e) => h({ rowIndex: 0, colIndex: e, onKeyDown: k(e) }),
        getTagCloseProps: (e) => ({ onClick: _(e) }),
        getInputProps: () => ({ value: t, onChange: v, onKeyDown: w, onPaste: q, onBlur: y }),
        announcement: c,
        getAnnouncementProps: () => ({ 'aria-live': 'polite', 'aria-relevant': 'text' }),
      };
    })({
      tags: j,
      onTagsChange: b,
      inputValue: g,
      onInputValueChange: x,
      inputRef: w,
      gridRowRef: v,
      i18n: {
        addedTag: (e) =>
          h('new-request-form.cc-field.email-added', '{{email}} has been added', { email: e }),
        removedTag: (e) =>
          h('new-request-form.cc-field.email-removed', '{{email}} has been removed', { email: e }),
        addedTags: (e) =>
          h('new-request-form.cc-field.emails-added', '{{emails}} have been added', { emails: e }),
      },
    }),
    P = (n, t, s) =>
      e.jsxs(Ve, {
        size: 'large',
        'aria-label': h(
          'new-request-form.cc-field.email-label',
          '{{email}} - Press Backspace to remove',
          { email: s }
        ),
        hue: t ? void 0 : 'red',
        children: [
          !t && e.jsx(D.Avatar, { children: e.jsx(M, {}) }),
          e.jsx('span', { children: s }),
          e.jsx(D.Close, { ...S(n) }),
        ],
      });
  return e.jsxs(n, {
    children: [
      e.jsx(t, { children: l }),
      f && e.jsx(o, { children: f }),
      e.jsxs(De, {
        ...q(),
        children: [
          j.length > 0 &&
            e.jsx('span', {
              ...y({
                'aria-label': h('new-request-form.cc-field.container-label', 'Selected CC emails'),
              }),
              children: e.jsx('span', {
                ref: v,
                ...k(),
                children: j.map((n, t) => {
                  const s = Ee.test(n);
                  return s
                    ? e.jsx(Me, { ..._(t), children: P(t, s, n) }, t)
                    : e.jsx(
                        C,
                        {
                          content: h(
                            'new-request-form.cc-field.invalid-email',
                            'Invalid email address'
                          ),
                          children: e.jsx(Me, { ..._(t), children: P(t, s, n) }),
                        },
                        t
                      );
                }),
              }),
            }),
          e.jsxs(Ae, {
            children: [
              e.jsx(ze, { isBare: !0, 'aria-hidden': 'true', tabIndex: -1, children: g }),
              e.jsx(Ge, { ref: w, isBare: !0, ...I() }),
            ],
          }),
        ],
      }),
      m && e.jsx(a, { validation: 'error', children: m }),
      j.map((n) => e.jsx('input', { type: 'hidden', name: d, value: n }, n)),
      e.jsx(s, { hidden: !0, ...T(), children: F }),
    ],
  });
}
const Xe = f(s)`
  margin-left: ${(e) => e.theme.space.xxs};
  font-weight: ${(e) => e.theme.fontWeights.medium};
`;
function Be({ field: r, onChange: i }) {
  const { t: l } = u(),
    { label: c, error: d, value: m, name: f, required: h, description: p } = r,
    j = (function (e) {
      return e ? e.replaceAll('X', '') : '';
    })(m);
  return e.jsxs(n, {
    children: [
      e.jsxs(t, {
        children: [
          c,
          h && e.jsx(s, { 'aria-hidden': 'true', children: '*' }),
          e.jsx(Xe, { children: l('new-request-form.credit-card-digits-hint', '(Last 4 digits)') }),
        ],
      }),
      p && e.jsx(o, { dangerouslySetInnerHTML: { __html: p } }),
      e.jsx(V, {
        start: e.jsx(A, {}),
        name: f,
        type: 'text',
        value: j,
        onChange: (e) => i(e.target.value),
        validation: d ? 'error' : void 0,
        required: h,
        maxLength: 4,
        placeholder: 'XXXX',
      }),
      d && e.jsx(a, { validation: 'error', children: d }),
    ],
  });
}
function Oe({ field: n, onChange: t }) {
  const { label: r, options: a, error: o, value: l, name: u, required: c, description: d } = n,
    {
      currentGroup: m,
      isGroupIdentifier: f,
      setCurrentGroupByIdentifier: h,
    } = be({ options: a, hasEmptyOption: !0 }),
    w = l ?? '',
    [y, k] = i.useState(!1),
    _ = i.useRef(null);
  i.useEffect(() => {
    if (_.current && c) {
      const e = _.current.querySelector('[role=combobox]');
      e?.setAttribute('aria-required', 'true');
    }
  }, [_, c]);
  return e.jsxs(p, {
    className: 'custom-form-field-layout',
    children: [
      e.jsxs(v, {
        className: 'custom-title',
        children: [r, c && e.jsx(s, { 'aria-hidden': 'true', children: '*' })],
      }),
      e.jsxs(j, {
        ref: _,
        inputProps: { required: c, name: u },
        isEditable: !1,
        validation: o ? 'error' : void 0,
        onChange: (e) => {
          'string' == typeof e.selectionValue && f(e.selectionValue)
            ? h(e.selectionValue)
            : ('string' == typeof e.selectionValue && t(e.selectionValue),
              void 0 !== e.isExpanded && k(e.isExpanded));
        },
        selectionValue: w,
        inputValue: w,
        renderValue: ({ selection: n }) => n?.label ?? e.jsx(ce, {}),
        isExpanded: y,
        className: 'custom-combobox',
        children: [
          'SubGroup' === m.type && e.jsx(b, { ...m.backOption }),
          'SubGroup' === m.type
            ? e.jsx(q, {
                'aria-label': m.name,
                children: m.options.map((n) =>
                  e.jsx(b, { ...n, children: n.menuLabel ?? n.label }, n.value)
                ),
              })
            : m.options.map((n) =>
                '' === n.value
                  ? e.jsx(b, { ...n, children: e.jsx(ce, {}) }, n.value)
                  : e.jsx(b, { ...n }, n.value)
              ),
        ],
      }),
      o && e.jsx(g, { validation: 'error', children: o }),
      d && e.jsx(x, { className: 'custom-hint', dangerouslySetInnerHTML: { __html: d } }),
    ],
  });
}
const Ue = f.h3`
  font-size: ${(e) => e.theme.fontSizes.md};
  font-weight: ${(e) => e.theme.fontWeights.bold};
`,
  We = f(G)`
  color: ${(e) => z('successHue', 700, e.theme)};
`,
  Ke = f(H)`
  position: absolute;
  top: ${(e) => 5.5 * e.theme.space.base}px;
  inset-inline-start: ${(e) => 4 * e.theme.space.base + 'px'};
`,
  Ye = f(I)`
  display: inline-block;
  margin-top: ${(e) => e.theme.space.sm};
`;
function Ze({
  authToken: n,
  interactionAccessToken: t,
  articles: s,
  requestId: r,
  hasRequestManagement: a,
  isSignedIn: o,
  helpCenterPath: l,
  requestsPath: c,
  requestPath: d,
}) {
  const [m, f] = i.useState(0),
    h = X(),
    { t: p } = u(),
    j = () => String(s[m]?.article_id),
    b = () => {
      Q({
        type: 'success',
        message: p(
          'new-request-form.answer-bot-modal.request-submitted',
          'Your request was successfully submitted'
        ),
      }),
        window.location.assign(
          (() => {
            if (o) return a ? d : l;
            {
              const e = new URLSearchParams();
              return e.set('return_to', c), `${l}?${e.toString()}`;
            }
          })()
        );
    };
  return e.jsxs(B, {
    appendToNode: h,
    onClose: () => {
      b();
    },
    children: [
      e.jsxs(We, {
        tag: 'h2',
        children: [
          e.jsx(Ke, {}),
          p(
            'new-request-form.answer-bot-modal.request-submitted',
            'Your request was successfully submitted'
          ),
        ],
      }),
      e.jsxs(O, {
        children: [
          e.jsx(Ue, {
            children: p(
              'new-request-form.answer-bot-modal.title',
              'While you wait, do any of these articles answer your question?'
            ),
          }),
          e.jsx('p', {
            children: p(
              'new-request-form.answer-bot-modal.footer-content',
              'If it does, we can close your recent request {{requestId}}',
              { requestId: `‭#${r}‬` }
            ),
          }),
          e.jsx(U, {
            level: 4,
            expandedSections: [m],
            onChange: (e) => {
              f(e);
            },
            children: s.map(({ article_id: t, html_url: s, snippet: r, title: a }) =>
              e.jsxs(
                U.Section,
                {
                  children: [
                    e.jsx(U.Header, { children: e.jsx(U.Label, { children: a }) }),
                    e.jsxs(U.Panel, {
                      children: [
                        e.jsx(W, { dangerouslySetInnerHTML: { __html: r } }),
                        e.jsx(Ye, {
                          isExternal: !0,
                          href: `${s}?auth_token=${n}`,
                          target: '_blank',
                          children: p(
                            'new-request-form.answer-bot-modal.view-article',
                            'View article'
                          ),
                        }),
                      ],
                    }),
                  ],
                },
                t
              )
            ),
          }),
        ],
      }),
      e.jsxs(K, {
        children: [
          e.jsx(Y, {
            children: e.jsx(Z, {
              onClick: () => {
                (async () => {
                  await fetch('/api/v2/answer_bot/rejection', {
                    method: 'POST',
                    body: JSON.stringify({
                      article_id: j(),
                      interaction_access_token: t,
                      reason_id: 0,
                    }),
                    headers: { 'Content-Type': 'application/json' },
                  }),
                    b();
                })();
              },
              children: p('new-request-form.answer-bot-modal.mark-irrelevant', 'No, I need help'),
            }),
          }),
          e.jsx(Y, {
            children: e.jsx(Z, {
              isPrimary: !0,
              onClick: () => {
                (async () => {
                  (
                    await fetch('/api/v2/answer_bot/resolution', {
                      method: 'POST',
                      body: JSON.stringify({ article_id: j(), interaction_access_token: t }),
                      headers: { 'Content-Type': 'application/json' },
                    })
                  ).ok
                    ? Q({
                        type: 'success',
                        message: p(
                          'new-request-form.answer-bot-modal.request-closed',
                          'Nice. Your request has been closed.'
                        ),
                      })
                    : Q({
                        type: 'error',
                        message: p(
                          'new-request-form.answer-bot-modal.solve-error',
                          'There was an error closing your request'
                        ),
                      }),
                    (window.location.href = l);
                })();
              },
              children: p(
                'new-request-form.answer-bot-modal.solve-request',
                'Yes, close my request'
              ),
            }),
          }),
        ],
      }),
      e.jsx(J, { 'aria-label': p('new-request-form.close-label', 'Close') }),
    ],
  });
}
const Je = { value: '', name: '-' };
function Qe({ field: n, userId: t, organizationId: r, onChange: a }) {
  const {
      id: o,
      label: l,
      error: c,
      value: d,
      name: m,
      required: f,
      description: h,
      relationship_target_type: w,
    } = n,
    [q, y] = i.useState([]),
    [k, _] = i.useState(null),
    [C, S] = i.useState(d),
    [I, T] = i.useState(!1),
    { t: F } = u(),
    P = w.replace('zen:custom_object:', '');
  const R = {
      name: F('new-request-form.lookup-field.loading-options', 'Loading items...'),
      id: 'loading',
    },
    L = {
      name: F('new-request-form.lookup-field.no-matches-found', 'No matches found'),
      id: 'no-results',
    },
    N = i.useCallback(
      async (e) => {
        try {
          const n = await fetch(`/api/v2/custom_objects/${P}/records/${e}`);
          if (n.ok) {
            const { custom_object_record: e } = await n.json(),
              t = { name: e.name, value: e.id };
            _(t), S(e.name);
          }
        } catch (e) {
          console.error(e);
        }
      },
      [P]
    ),
    $ = i.useCallback(
      async (e) => {
        const n = new URLSearchParams();
        n.set('name', e.toLocaleLowerCase()),
          n.set('source', 'zen:ticket'),
          n.set('field_id', o.toString()),
          n.set('requester_id', t.toString()),
          null !== r && n.set('organization_id', r),
          T(!0);
        try {
          const e = await fetch(`/api/v2/custom_objects/${P}/records/autocomplete?${n.toString()}`),
            t = await e.json();
          if (e.ok) {
            let e = t.custom_object_records.map(({ name: e, id: n }) => ({ name: e, value: n }));
            k && ((e = e.filter((e) => e.value !== k.value)), (e = [k, ...e])), y(e);
          } else y([]);
        } catch (e) {
          console.error(e);
        } finally {
          T(!1);
        }
      },
      [P, o, r, k, t]
    ),
    E = i.useMemo(() => ee($, 300), [$]);
  i.useEffect(() => () => E.cancel(), [E]);
  const D = i.useCallback(
    ({ inputValue: e, selectionValue: n }) => {
      if (void 0 !== n)
        if ('' == n) _(Je), S(Je.name), y([]), a(Je.value);
        else {
          const e = q.find((e) => e.value === n);
          e && (S(e.name), _(e), y([e]), a(e.value));
        }
      void 0 !== e && (S(e), E(e));
    },
    [E, a, q]
  );
  i.useEffect(() => {
    d && N(d);
  }, []);
  return e.jsxs(p, {
    children: [
      e.jsxs(v, { children: [l, f && e.jsx(s, { 'aria-hidden': 'true', children: '*' })] }),
      h && e.jsx(x, { dangerouslySetInnerHTML: { __html: h } }),
      e.jsxs(j, {
        inputProps: { required: f },
        'data-test-id': 'lookup-field-combobox',
        validation: c ? 'error' : void 0,
        inputValue: C,
        selectionValue: k?.value,
        isAutocomplete: !0,
        placeholder: F('new-request-form.lookup-field.placeholder', 'Search {{label}}', {
          label: l.toLowerCase(),
        }),
        onFocus: () => {
          S(''), $('*');
        },
        onChange: D,
        renderValue: () => (k ? k?.name : Je.name),
        children: [
          k?.name !== Je.name && e.jsx(b, { value: '', label: '-', children: e.jsx(ce, {}) }),
          I && e.jsx(b, { isDisabled: !0, value: R.name }, R.id),
          !I &&
            C?.length > 0 &&
            0 === q.length &&
            e.jsx(b, { isDisabled: !0, value: L.name }, L.id),
          !I &&
            0 !== q.length &&
            q.map((n) =>
              e.jsx(
                b,
                { value: n.value, label: n.name, 'data-test-id': `option-${n.name}` },
                n.value
              )
            ),
        ],
      }),
      c && e.jsx(g, { validation: 'error', children: c }),
      e.jsx('input', { type: 'hidden', name: m, value: k?.value }),
    ],
  });
}
const en = f(W)`
  margin: ${(e) => e.theme.space.md} 0;
`,
  nn = f.form`
  display: flex;
  flex-direction: column;
  gap: ${(e) => e.theme.space.md};
`,
  tn = f.div`
  margin-top: ${(e) => e.theme.space.md};
`;
function sn({
  requestForm: n,
  wysiwyg: r,
  newRequestPath: a,
  parentId: o,
  parentIdPath: l,
  locale: c,
  baseLocale: d,
  hasAtMentions: m,
  userRole: f,
  userId: h,
  brandId: p,
  organizations: j,
  answerBotModal: b,
}) {
  const {
      ticket_fields: g,
      action: x,
      http_method: w,
      accept_charset: v,
      errors: q,
      parent_id_field: y,
      ticket_form_field: k,
      email_field: _,
      cc_field: C,
      organization_field: S,
      due_date_field: T,
      end_user_conditions: F,
      attachments_field: P,
      inline_attachments_fields: R,
      description_mimetype_field: L,
    } = n,
    { answerBot: N } = b,
    {
      ticketFields: $,
      emailField: E,
      ccField: D,
      organizationField: M,
      dueDateField: V,
    } = Ce({ ticketFields: g, emailField: _, ccField: C, organizationField: S, dueDateField: T }),
    [A, z] = i.useState($),
    [G, H] = i.useState(M),
    [X, B] = i.useState(V),
    O = Ne(A, F),
    { formRefCallback: U, handleSubmit: W } = qe(A),
    { t: K } = u(),
    Y = j.length > 0 && j[0]?.id ? j[0]?.id?.toString() : null,
    J = i.useCallback(
      (e, n) => {
        z(A.map((t) => (t.name === e.name ? { ...t, value: n } : t)));
      },
      [A]
    );
  return e.jsxs(e.Fragment, {
    children: [
      o &&
        e.jsx(en, {
          children: e.jsx(I, {
            href: l,
            children: K(
              'new-request-form.parent-request-link',
              'Follow-up to request {{parentId}}',
              { parentId: `‭#${o}‬` }
            ),
          }),
        }),
      e.jsxs(nn, {
        ref: U,
        action: x,
        method: w,
        acceptCharset: v,
        noValidate: !0,
        onSubmit: W,
        children: [
          q && e.jsx(ne, { type: 'error', children: q }),
          y && e.jsx(ve, { field: y }),
          k.options.length > 0 && e.jsx(we, { field: k, newRequestPath: a }),
          E && e.jsx(ie, { field: E }, E.name),
          D && e.jsx(He, { field: D }),
          G &&
            e.jsx(
              de,
              {
                field: G,
                onChange: (e) => {
                  !(function (e) {
                    null !== G && H({ ...G, value: e });
                  })(e);
                },
              },
              G.name
            ),
          O.map((n) => {
            switch (n.type) {
              case 'subject':
                return e.jsxs('div', {
                  className: 'custom-form-field-layout',
                  children: [
                    e.jsxs(t, {
                      className: 'custom-title',
                      children: ['Subject', e.jsx(s, { 'aria-hidden': 'true', children: '*' })],
                    }),
                    e.jsx(ie, { field: n, onChange: (e) => J(n, e) }, n.name),
                  ],
                });
              case 'text':
              case 'integer':
              case 'decimal':
              case 'regexp':
                return e.jsx(ie, { field: n, onChange: (e) => J(n, e) }, n.name);
              case 'partialcreditcard':
                return e.jsx(Be, { field: n, onChange: (e) => J(n, e) });
              case 'description':
                return e.jsxs(e.Fragment, {
                  children: [
                    e.jsx(
                      ue,
                      {
                        field: n,
                        hasWysiwyg: r,
                        baseLocale: d,
                        hasAtMentions: m,
                        userRole: f,
                        brandId: p,
                        onChange: (e) => J(n, e),
                      },
                      n.name
                    ),
                    e.jsx('input', {
                      type: 'hidden',
                      name: L.name,
                      value: r ? 'text/html' : 'text/plain',
                    }),
                  ],
                });
              case 'textarea':
                return e.jsx(
                  ue,
                  {
                    field: n,
                    hasWysiwyg: !1,
                    baseLocale: d,
                    hasAtMentions: m,
                    userRole: f,
                    brandId: p,
                    onChange: (e) => J(n, e),
                  },
                  n.name
                );
              case 'priority':
              case 'basic_priority':
              case 'tickettype':
                return e.jsxs(e.Fragment, {
                  children: [
                    e.jsx(de, { field: n, onChange: (e) => J(n, e) }, n.name),
                    'task' === n.value &&
                      e.jsx($e, {
                        field: X,
                        locale: d,
                        valueFormat: 'dateTime',
                        onChange: (e) => {
                          !(function (e) {
                            null !== X && B({ ...X, value: e });
                          })(e);
                        },
                      }),
                  ],
                });
              case 'checkbox':
                return e.jsx(me, { field: n, onChange: (e) => J(n, e) });
              case 'date':
                return e.jsx($e, {
                  field: n,
                  locale: d,
                  valueFormat: 'date',
                  onChange: (e) => J(n, e),
                });
              case 'multiselect':
                return n.label.includes('RA:'), e.jsx(ge, { field: n });
              case 'tagger':
                return e.jsx(Oe, { field: n, onChange: (e) => J(n, e) }, n.name);
              case 'lookup':
                return e.jsx(
                  Qe,
                  {
                    field: n,
                    userId: h,
                    organizationId: null !== G ? G.value : Y,
                    onChange: (e) => J(n, e),
                  },
                  n.name
                );
              default:
                return e.jsx(e.Fragment, {});
            }
          }),
          P && e.jsx(Fe, { field: P }),
          R.map(({ type: n, name: t, value: s }, r) =>
            e.jsx('input', { type: n, name: t, value: s }, r)
          ),
          e.jsx(tn, {
            className: '!mt-0',
            children:
              (0 === k.options.length || k.value) &&
              e.jsx(Z, {
                isPrimary: !0,
                type: 'submit',
                className: 'custom-submit-button',
                children: K('new-request-form.submit', 'Submit'),
              }),
          }),
        ],
      }),
      N.auth_token &&
        N.interaction_access_token &&
        N.articles.length > 0 &&
        N.request_id &&
        e.jsx(Ze, {
          authToken: N.auth_token,
          interactionAccessToken: N.interaction_access_token,
          articles: N.articles,
          requestId: N.request_id,
          ...b,
        }),
    ],
  });
}
async function rn(n, t, s) {
  const { baseLocale: r } = t;
  te(r),
    await se(r, () =>
      (function (e) {
        switch (e) {
          case './translations/locales/af.json':
            return import('new-request-form-translations').then(function (e) {
              return e.a;
            });
          case './translations/locales/ar-x-pseudo.json':
            return import('new-request-form-translations').then(function (e) {
              return e.b;
            });
          case './translations/locales/ar.json':
            return import('new-request-form-translations').then(function (e) {
              return e.c;
            });
          case './translations/locales/az.json':
            return import('new-request-form-translations').then(function (e) {
              return e.d;
            });
          case './translations/locales/be.json':
            return import('new-request-form-translations').then(function (e) {
              return e.e;
            });
          case './translations/locales/bg.json':
            return import('new-request-form-translations').then(function (e) {
              return e.f;
            });
          case './translations/locales/bn.json':
            return import('new-request-form-translations').then(function (e) {
              return e.g;
            });
          case './translations/locales/bs.json':
            return import('new-request-form-translations').then(function (e) {
              return e.h;
            });
          case './translations/locales/ca.json':
            return import('new-request-form-translations').then(function (e) {
              return e.i;
            });
          case './translations/locales/cs.json':
            return import('new-request-form-translations').then(function (e) {
              return e.j;
            });
          case './translations/locales/cy.json':
            return import('new-request-form-translations').then(function (e) {
              return e.k;
            });
          case './translations/locales/da.json':
            return import('new-request-form-translations').then(function (e) {
              return e.l;
            });
          case './translations/locales/de-de.json':
            return import('new-request-form-translations').then(function (e) {
              return e.m;
            });
          case './translations/locales/de-x-informal.json':
            return import('new-request-form-translations').then(function (e) {
              return e.n;
            });
          case './translations/locales/de.json':
            return import('new-request-form-translations').then(function (e) {
              return e.o;
            });
          case './translations/locales/el.json':
            return import('new-request-form-translations').then(function (e) {
              return e.p;
            });
          case './translations/locales/en-001.json':
            return import('new-request-form-translations').then(function (e) {
              return e.q;
            });
          case './translations/locales/en-150.json':
            return import('new-request-form-translations').then(function (e) {
              return e.r;
            });
          case './translations/locales/en-au.json':
            return import('new-request-form-translations').then(function (e) {
              return e.s;
            });
          case './translations/locales/en-ca.json':
            return import('new-request-form-translations').then(function (e) {
              return e.t;
            });
          case './translations/locales/en-gb.json':
            return import('new-request-form-translations').then(function (e) {
              return e.u;
            });
          case './translations/locales/en-my.json':
            return import('new-request-form-translations').then(function (e) {
              return e.v;
            });
          case './translations/locales/en-ph.json':
            return import('new-request-form-translations').then(function (e) {
              return e.w;
            });
          case './translations/locales/en-se.json':
            return import('new-request-form-translations').then(function (e) {
              return e.x;
            });
          case './translations/locales/en-us.json':
            return import('new-request-form-translations').then(function (e) {
              return e.y;
            });
          case './translations/locales/en-x-dev.json':
            return import('new-request-form-translations').then(function (e) {
              return e.z;
            });
          case './translations/locales/en-x-keys.json':
            return import('new-request-form-translations').then(function (e) {
              return e.A;
            });
          case './translations/locales/en-x-obsolete.json':
            return import('new-request-form-translations').then(function (e) {
              return e.B;
            });
          case './translations/locales/en-x-pseudo.json':
            return import('new-request-form-translations').then(function (e) {
              return e.C;
            });
          case './translations/locales/en-x-test.json':
            return import('new-request-form-translations').then(function (e) {
              return e.D;
            });
          case './translations/locales/es-419.json':
            return import('new-request-form-translations').then(function (e) {
              return e.E;
            });
          case './translations/locales/es-es.json':
            return import('new-request-form-translations').then(function (e) {
              return e.F;
            });
          case './translations/locales/es.json':
            return import('new-request-form-translations').then(function (e) {
              return e.G;
            });
          case './translations/locales/et.json':
            return import('new-request-form-translations').then(function (e) {
              return e.H;
            });
          case './translations/locales/eu.json':
            return import('new-request-form-translations').then(function (e) {
              return e.I;
            });
          case './translations/locales/fa-af.json':
            return import('new-request-form-translations').then(function (e) {
              return e.J;
            });
          case './translations/locales/fa.json':
            return import('new-request-form-translations').then(function (e) {
              return e.K;
            });
          case './translations/locales/fi.json':
            return import('new-request-form-translations').then(function (e) {
              return e.L;
            });
          case './translations/locales/fil.json':
            return import('new-request-form-translations').then(function (e) {
              return e.M;
            });
          case './translations/locales/fo.json':
            return import('new-request-form-translations').then(function (e) {
              return e.N;
            });
          case './translations/locales/fr-ca.json':
            return import('new-request-form-translations').then(function (e) {
              return e.O;
            });
          case './translations/locales/fr.json':
            return import('new-request-form-translations').then(function (e) {
              return e.P;
            });
          case './translations/locales/ga.json':
            return import('new-request-form-translations').then(function (e) {
              return e.Q;
            });
          case './translations/locales/he.json':
            return import('new-request-form-translations').then(function (e) {
              return e.R;
            });
          case './translations/locales/hi.json':
            return import('new-request-form-translations').then(function (e) {
              return e.S;
            });
          case './translations/locales/hr.json':
            return import('new-request-form-translations').then(function (e) {
              return e.T;
            });
          case './translations/locales/hu.json':
            return import('new-request-form-translations').then(function (e) {
              return e.U;
            });
          case './translations/locales/hy.json':
            return import('new-request-form-translations').then(function (e) {
              return e.V;
            });
          case './translations/locales/id.json':
            return import('new-request-form-translations').then(function (e) {
              return e.W;
            });
          case './translations/locales/is.json':
            return import('new-request-form-translations').then(function (e) {
              return e.X;
            });
          case './translations/locales/it-ch.json':
            return import('new-request-form-translations').then(function (e) {
              return e.Y;
            });
          case './translations/locales/it.json':
            return import('new-request-form-translations').then(function (e) {
              return e.Z;
            });
          case './translations/locales/ja.json':
            return import('new-request-form-translations').then(function (e) {
              return e._;
            });
          case './translations/locales/ka.json':
            return import('new-request-form-translations').then(function (e) {
              return e.$;
            });
          case './translations/locales/kk.json':
            return import('new-request-form-translations').then(function (e) {
              return e.a0;
            });
          case './translations/locales/kl-dk.json':
            return import('new-request-form-translations').then(function (e) {
              return e.a1;
            });
          case './translations/locales/ko.json':
            return import('new-request-form-translations').then(function (e) {
              return e.a2;
            });
          case './translations/locales/ku.json':
            return import('new-request-form-translations').then(function (e) {
              return e.a3;
            });
          case './translations/locales/lt.json':
            return import('new-request-form-translations').then(function (e) {
              return e.a4;
            });
          case './translations/locales/lv.json':
            return import('new-request-form-translations').then(function (e) {
              return e.a5;
            });
          case './translations/locales/mk.json':
            return import('new-request-form-translations').then(function (e) {
              return e.a6;
            });
          case './translations/locales/mn.json':
            return import('new-request-form-translations').then(function (e) {
              return e.a7;
            });
          case './translations/locales/ms.json':
            return import('new-request-form-translations').then(function (e) {
              return e.a8;
            });
          case './translations/locales/mt.json':
            return import('new-request-form-translations').then(function (e) {
              return e.a9;
            });
          case './translations/locales/my.json':
            return import('new-request-form-translations').then(function (e) {
              return e.aa;
            });
          case './translations/locales/nl-be.json':
            return import('new-request-form-translations').then(function (e) {
              return e.ab;
            });
          case './translations/locales/nl.json':
            return import('new-request-form-translations').then(function (e) {
              return e.ac;
            });
          case './translations/locales/no.json':
            return import('new-request-form-translations').then(function (e) {
              return e.ad;
            });
          case './translations/locales/pl.json':
            return import('new-request-form-translations').then(function (e) {
              return e.ae;
            });
          case './translations/locales/pt-br.json':
            return import('new-request-form-translations').then(function (e) {
              return e.af;
            });
          case './translations/locales/pt.json':
            return import('new-request-form-translations').then(function (e) {
              return e.ag;
            });
          case './translations/locales/ro.json':
            return import('new-request-form-translations').then(function (e) {
              return e.ah;
            });
          case './translations/locales/ru.json':
            return import('new-request-form-translations').then(function (e) {
              return e.ai;
            });
          case './translations/locales/sk.json':
            return import('new-request-form-translations').then(function (e) {
              return e.aj;
            });
          case './translations/locales/sl.json':
            return import('new-request-form-translations').then(function (e) {
              return e.ak;
            });
          case './translations/locales/sq.json':
            return import('new-request-form-translations').then(function (e) {
              return e.al;
            });
          case './translations/locales/sr-me.json':
            return import('new-request-form-translations').then(function (e) {
              return e.am;
            });
          case './translations/locales/sr.json':
            return import('new-request-form-translations').then(function (e) {
              return e.an;
            });
          case './translations/locales/sv.json':
            return import('new-request-form-translations').then(function (e) {
              return e.ao;
            });
          case './translations/locales/th.json':
            return import('new-request-form-translations').then(function (e) {
              return e.ap;
            });
          case './translations/locales/tr.json':
            return import('new-request-form-translations').then(function (e) {
              return e.aq;
            });
          case './translations/locales/uk.json':
            return import('new-request-form-translations').then(function (e) {
              return e.ar;
            });
          case './translations/locales/ur.json':
            return import('new-request-form-translations').then(function (e) {
              return e.as;
            });
          case './translations/locales/uz.json':
            return import('new-request-form-translations').then(function (e) {
              return e.at;
            });
          case './translations/locales/vi.json':
            return import('new-request-form-translations').then(function (e) {
              return e.au;
            });
          case './translations/locales/zh-cn.json':
            return import('new-request-form-translations').then(function (e) {
              return e.av;
            });
          case './translations/locales/zh-tw.json':
            return import('new-request-form-translations').then(function (e) {
              return e.aw;
            });
          default:
            return new Promise(function (n, t) {
              ('function' == typeof queueMicrotask
                ? queueMicrotask
                : setTimeout)(t.bind(null, new Error('Unknown variable dynamic import: ' + e)));
            });
        }
      })(`./translations/locales/${r}.json`)
    ),
    re.render(e.jsx(ae, { theme: oe(n), children: e.jsx(sn, { ...t }) }), s);
}
export { rn as renderNewRequestForm };
