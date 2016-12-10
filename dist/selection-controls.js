var $jscomp = {scope:{}};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function(d, a, b) {
  if (b.get || b.set) {
    throw new TypeError("ES3 does not support getters and setters.");
  }
  d != Array.prototype && d != Object.prototype && (d[a] = b.value);
};
$jscomp.getGlobal = function(d) {
  return "undefined" != typeof window && window === d ? d : "undefined" != typeof global && null != global ? global : d;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function(d) {
  return $jscomp.SYMBOL_PREFIX + (d || "") + $jscomp.symbolCounter_++;
};
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var d = $jscomp.global.Symbol.iterator;
  d || (d = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[d] && $jscomp.defineProperty(Array.prototype, d, {configurable:!0, writable:!0, value:function() {
    return $jscomp.arrayIterator(this);
  }});
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.arrayIterator = function(d) {
  var a = 0;
  return $jscomp.iteratorPrototype(function() {
    return a < d.length ? {done:!1, value:d[a++]} : {done:!0};
  });
};
$jscomp.iteratorPrototype = function(d) {
  $jscomp.initSymbolIterator();
  d = {next:d};
  d[$jscomp.global.Symbol.iterator] = function() {
    return this;
  };
  return d;
};
$jscomp.array = $jscomp.array || {};
$jscomp.iteratorFromArray = function(d, a) {
  $jscomp.initSymbolIterator();
  d instanceof String && (d += "");
  var b = 0, g = {next:function() {
    if (b < d.length) {
      var e = b++;
      return {value:a(e, d[e]), done:!1};
    }
    g.next = function() {
      return {done:!0, value:void 0};
    };
    return g.next();
  }};
  g[Symbol.iterator] = function() {
    return g;
  };
  return g;
};
$jscomp.polyfill = function(d, a, b, g) {
  if (a) {
    b = $jscomp.global;
    d = d.split(".");
    for (g = 0;g < d.length - 1;g++) {
      var e = d[g];
      e in b || (b[e] = {});
      b = b[e];
    }
    d = d[d.length - 1];
    g = b[d];
    a = a(g);
    a != g && null != a && $jscomp.defineProperty(b, d, {configurable:!0, writable:!0, value:a});
  }
};
$jscomp.polyfill("Array.prototype.keys", function(d) {
  return d ? d : function() {
    return $jscomp.iteratorFromArray(this, function(a) {
      return a;
    });
  };
}, "es6-impl", "es3");
(function() {
  function d(a) {
    this.object = a;
    this.target = new THREE.Vector3;
    this.minDistance = 0;
    this.maxDistance = Infinity;
    this.minZoom = 0;
    this.maxZoom = Infinity;
    this.minPolarAngle = 0;
    this.maxPolarAngle = Math.PI;
    this.minAzimuthAngle = -Infinity;
    this.maxAzimuthAngle = Infinity;
    this.enableDamping = !1;
    this.dampingFactor = .25;
    this.enableTargetLock = this.enableGroundLock = !1;
    var b = this, d, e, p = 0, n = 0, m = 1, q = new THREE.Vector3, r = !1;
    this.getPolarAngle = function() {
      return e;
    };
    this.getAzimuthalAngle = function() {
      return d;
    };
    this.rotateLeft = function(a) {
      n -= a;
    };
    this.rotateUp = function(a) {
      p -= a;
    };
    this.panLeft = function() {
      var a = new THREE.Vector3;
      return function(d) {
        var b = this.object.matrix.elements;
        a.set(b[0], b[1], b[2]);
        a.multiplyScalar(-d);
        q.add(a);
      };
    }();
    this.panUp = function() {
      var a = new THREE.Vector3;
      return function(d) {
        var l = this.object.matrix.elements;
        b.enableGroundLock ? (a.set(l[4] * (1 - b.object.up.x), l[5] * (1 - b.object.up.y), l[6] * (1 - b.object.up.z)), a.normalize()) : a.set(l[4], l[5], l[6]);
        a.multiplyScalar(d);
        q.add(a);
      };
    }();
    this.pan = function(a, d, e, f) {
      b.object instanceof THREE.PerspectiveCamera ? (e = b.object.position.clone().sub(b.target).length(), e *= Math.tan(b.object.fov / 2 * Math.PI / 180), b.panLeft(2 * a * e / f), b.panUp(2 * d * e / f)) : b.object instanceof THREE.OrthographicCamera ? (b.panLeft(a * (b.object.right - b.object.left) / e), b.panUp(d * (b.object.top - b.object.bottom) / f)) : console.warn("WARNING: SelectionControls.js encountered an unknown camera type - pan disabled.");
    };
    this.dollyIn = function(a) {
      b.object instanceof THREE.PerspectiveCamera ? m /= a : b.object instanceof THREE.OrthographicCamera ? (b.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom * a)), b.object.updateProjectionMatrix(), r = !0) : console.warn("WARNING: SelectionControls.js encountered an unknown camera type - dolly/zoom disabled.");
    };
    this.dollyOut = function(a) {
      b.object instanceof THREE.PerspectiveCamera ? m *= a : b.object instanceof THREE.OrthographicCamera ? (b.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / a)), b.object.updateProjectionMatrix(), r = !0) : console.warn("WARNING: SelectionControls.js encountered an unknown camera type - dolly/zoom disabled.");
    };
    this.update = function() {
      var b = new THREE.Vector3, g = (new THREE.Quaternion).setFromUnitVectors(a.up, new THREE.Vector3(0, 1, 0)), z = g.clone().inverse(), f = new THREE.Vector3, c = new THREE.Quaternion;
      return function() {
        var a = this.object.position;
        b.copy(a).sub(this.target);
        b.applyQuaternion(g);
        d = Math.atan2(b.x, b.z);
        e = Math.atan2(Math.sqrt(b.x * b.x + b.z * b.z), b.y);
        d += n;
        e += p;
        d = Math.max(this.minAzimuthAngle, Math.min(this.maxAzimuthAngle, d));
        e = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, e));
        e = Math.max(1E-6, Math.min(Math.PI - 1E-6, e));
        var l = b.length() * m, l = Math.max(this.minDistance, Math.min(this.maxDistance, l));
        this.enableTargetLock || this.target.add(q);
        b.x = l * Math.sin(e) * Math.sin(d);
        b.y = l * Math.cos(e);
        b.z = l * Math.sin(e) * Math.cos(d);
        b.applyQuaternion(z);
        a.copy(this.target).add(b);
        this.object.lookAt(this.target);
        !0 === this.enableDamping ? (n *= 1 - this.dampingFactor, p *= 1 - this.dampingFactor) : p = n = 0;
        m = 1;
        q.set(0, 0, 0);
        return r || 1E-6 < f.distanceToSquared(this.object.position) || 1E-6 < 8 * (1 - c.dot(this.object.quaternion)) ? (f.copy(this.object.position), c.copy(this.object.quaternion), r = !1, !0) : !1;
      };
    }();
  }
  THREE.SelectionControls = function(a, b) {
    function g(a, b) {
      var E = c.domElement === document ? c.domElement.body : c.domElement;
      f.pan(a, b, E.clientWidth, E.clientHeight);
    }
    function e() {
      return Math.pow(.95, c.zoomSpeed);
    }
    function p(a) {
      if (!1 !== c.enabled) {
        a.preventDefault();
        if (a.button === c.mouseButtons.ORBIT) {
          if (!1 === c.enableRotate) {
            return;
          }
          k = h.ROTATE;
          A.set(a.clientX, a.clientY);
        } else {
          if (a.button === c.mouseButtons.ZOOM) {
            if (!1 === c.enableZoom) {
              return;
            }
            k = h.DOLLY;
            t.set(a.clientX, a.clientY);
          } else {
            if (a.button === c.mouseButtons.PAN) {
              if (!1 === c.enablePan) {
                return;
              }
              k = h.PAN;
              u.set(a.clientX, a.clientY);
            } else {
              a.button === c.mouseButtons.SELECT && (k = h.SELECT, c.dispatchEvent({type:"select-start", content:a}));
            }
          }
        }
        k !== h.NONE && document.addEventListener("mouseup", n, !1);
      }
    }
    function n(a) {
      !1 !== c.enabled && (document.removeEventListener("mouseup", n, !1), k === h.SELECT && c.dispatchEvent({type:"select-end", content:a}), k = h.NONE);
    }
    function m(a) {
      if (!1 !== c.enabled && !1 !== c.enableZoom && k === h.NONE) {
        a.preventDefault();
        a.stopPropagation();
        var b = 0;
        void 0 !== a.wheelDelta ? b = a.wheelDelta : void 0 !== a.detail && (b = -a.detail);
        0 < b ? f.dollyOut(e()) : 0 > b && f.dollyIn(e());
        c.enableZoomToMouse && 0 < b && (b = a.target.getBoundingClientRect(), g(-(a.clientX - (b.left + c.domElement.clientWidth / 2)) / 10, -(a.clientY - (b.top + c.domElement.clientHeight / 2)) / 10));
        c.update();
      }
    }
    function q(a) {
      if (!1 !== c.enabled && !1 !== c.enableKeys && !1 !== c.enablePan) {
        switch(a.keyCode) {
          case c.keys.UP:
            g(0, c.keyPanSpeed);
            c.update();
            break;
          case c.keys.BOTTOM:
            g(0, -c.keyPanSpeed);
            c.update();
            break;
          case c.keys.LEFT:
            g(c.keyPanSpeed, 0);
            c.update();
            break;
          case c.keys.RIGHT:
            g(-c.keyPanSpeed, 0);
            c.update();
            break;
          case c.keys.ESC:
            c.dispatchEvent({type:"abort", content:a});
        }
      }
    }
    function r(a) {
      if (!1 !== c.enabled) {
        switch(a.touches.length) {
          case 1:
            if (!1 === c.enableRotate) {
              break;
            }
            k = h.SELECT;
            c.dispatchEvent({type:"select-start", content:a});
            break;
          case 2:
            if (!1 === c.enableZoom) {
              break;
            }
            k = h.TOUCH_DOLLY;
            var b = a.touches[0].pageX - a.touches[1].pageX;
            a = a.touches[0].pageY - a.touches[1].pageY;
            t.set(0, Math.sqrt(b * b + a * a));
            break;
          case 3:
            if (!1 === c.enablePan) {
              break;
            }
            k = h.TOUCH_PAN;
            u.set(a.touches[0].pageX, a.touches[0].pageY);
            break;
          default:
            k = h.NONE;
        }
      }
    }
    function l(a) {
      if (!1 !== c.enabled) {
        switch(a.preventDefault(), a.stopPropagation(), a.touches.length) {
          case 1:
            break;
          case 2:
            if (!1 === c.enableZoom) {
              break;
            }
            if (k !== h.TOUCH_DOLLY) {
              break;
            }
            var b = a.touches[0].pageX - a.touches[1].pageX;
            a = a.touches[0].pageY - a.touches[1].pageY;
            v.set(0, Math.sqrt(b * b + a * a));
            w.subVectors(v, t);
            0 < w.y ? f.dollyOut(e()) : 0 > w.y && f.dollyIn(e());
            t.copy(v);
            c.update();
            break;
          case 3:
            if (!1 === c.enablePan) {
              break;
            }
            if (k !== h.TOUCH_PAN) {
              break;
            }
            x.set(a.touches[0].pageX, a.touches[0].pageY);
            y.subVectors(x, u);
            g(y.x, y.y);
            u.copy(x);
            c.update();
            break;
          default:
            k = h.NONE;
        }
      }
    }
    function D(a) {
      !1 !== c.enabled && (k === h.SELECT && c.dispatchEvent({type:"select-end", content:a}), k = h.NONE);
    }
    function z(a) {
      a.preventDefault();
    }
    var f = new d(a);
    this.domElement = void 0 !== b ? b : document;
    Object.defineProperty(this, "constraint", {get:function() {
      return f;
    }});
    this.getPolarAngle = function() {
      return f.getPolarAngle();
    };
    this.getAzimuthalAngle = function() {
      return f.getAzimuthalAngle();
    };
    this.enableGroundLock = function() {
      f.enableGroundLock = !0;
    };
    this.enableTargetLock = function() {
      f.enableTargetLock = !0;
    };
    this.disableTargetLock = function() {
      f.enableTargetLock = !1;
    };
    this.setMaxPolarAngle = function(a) {
      f.maxPolarAngle = a;
    };
    this.enabled = !0;
    this.center = this.target;
    this.enableZoom = !0;
    this.zoomSpeed = 1;
    this.enableRotate = !0;
    this.rotateSpeed = 1;
    this.enablePan = !0;
    this.keyPanSpeed = 7;
    this.autoRotate = !1;
    this.autoRotateSpeed = 2;
    this.enableKeys = !0;
    this.enableZoomToMouse = !1;
    this.keys = {LEFT:37, UP:38, RIGHT:39, BOTTOM:40, ESC:27};
    THREE.MOUSE.WHEEL = 999;
    this.mouseButtons = {SELECT:THREE.MOUSE.LEFT, ORBIT:THREE.MOUSE.RIGHT, ZOOM:THREE.MOUSE.WHEEL, PAN:THREE.MOUSE.MIDDLE};
    var c = this, A = new THREE.Vector2, B = new THREE.Vector2, C = new THREE.Vector2, u = new THREE.Vector2, x = new THREE.Vector2, y = new THREE.Vector2, t = new THREE.Vector2, v = new THREE.Vector2, w = new THREE.Vector2, h = {NONE:-1, ROTATE:0, DOLLY:1, PAN:2, TOUCH_ROTATE:3, TOUCH_DOLLY:4, TOUCH_PAN:5, SELECT:6}, k = h.NONE;
    this.target0 = this.target.clone();
    this.position0 = this.object.position.clone();
    this.zoom0 = this.object.zoom;
    this.manualPan = function(a, b) {
      return g(a, b);
    };
    this.manualDolly = function(a) {
      return 0 < a ? f.dollyIn(a) : f.dollyOut(Math.abs(a));
    };
    this.update = function() {
      this.autoRotate && k === h.NONE && f.rotateLeft(2 * Math.PI / 60 / 60 * c.autoRotateSpeed);
      !0 === f.update() && this.dispatchEvent({type:"change", content:""});
    };
    this.reset = function() {
      k = h.NONE;
      this.target.copy(this.target0);
      this.object.position.copy(this.position0);
      this.object.zoom = this.zoom0;
      this.object.updateProjectionMatrix();
      this.dispatchEvent({type:"change", content:""});
      this.update();
    };
    this.dispose = function() {
      this.domElement.removeEventListener("contextmenu", z, !1);
      this.domElement.removeEventListener("mousedown", p, !1);
      this.domElement.removeEventListener("mousewheel", m, !1);
      this.domElement.removeEventListener("MozMousePixelScroll", m, !1);
      this.domElement.removeEventListener("touchstart", r, !1);
      this.domElement.removeEventListener("touchend", D, !1);
      this.domElement.removeEventListener("touchmove", l, !1);
      document.removeEventListener("mouseup", n, !1);
      window.removeEventListener("keydown", q, !1);
    };
    this.domElement.addEventListener("contextmenu", z, !1);
    this.domElement.addEventListener("mousedown", p, !1);
    this.domElement.addEventListener("mousemove", function(a) {
      if (!1 !== c.enabled) {
        a.preventDefault();
        var b = c.domElement === document ? c.domElement.body : c.domElement;
        if (k === h.ROTATE) {
          if (!1 === c.enableRotate) {
            return;
          }
          B.set(a.clientX, a.clientY);
          C.subVectors(B, A);
          f.rotateLeft(2 * Math.PI * C.x / b.clientWidth * c.rotateSpeed);
          f.rotateUp(2 * Math.PI * C.y / b.clientHeight * c.rotateSpeed);
          A.copy(B);
        } else {
          if (k === h.DOLLY) {
            if (!1 === c.enableZoom) {
              return;
            }
            v.set(a.clientX, a.clientY);
            w.subVectors(v, t);
            0 < w.y ? f.dollyIn(e()) : 0 > w.y && f.dollyOut(e());
            t.copy(v);
          } else {
            if (k === h.PAN) {
              if (!1 === c.enablePan) {
                return;
              }
              x.set(a.clientX, a.clientY);
              y.subVectors(x, u);
              g(y.x, y.y);
              u.copy(x);
            } else {
              k === h.SELECT ? c.dispatchEvent({type:"select-move", content:a}) : c.dispatchEvent({type:"canvas-move", content:a});
            }
          }
        }
        k !== h.NONE && c.update();
      }
    }, !1);
    this.domElement.addEventListener("mousewheel", m, !1);
    this.domElement.addEventListener("MozMousePixelScroll", m, !1);
    this.domElement.addEventListener("touchstart", r, !1);
    this.domElement.addEventListener("touchend", D, !1);
    this.domElement.addEventListener("touchmove", l, !1);
    window.addEventListener("keydown", q, !1);
    this.domElement.addEventListener("dblclick", function(a) {
      c.dispatchEvent({type:"select-double", content:a});
    }, !1);
    this.update();
  };
  THREE.SelectionControls.prototype = Object.create(THREE.EventDispatcher.prototype);
  THREE.SelectionControls.prototype.constructor = THREE.SelectionControls;
  Object.defineProperties(THREE.SelectionControls.prototype, {object:{get:function() {
    return this.constraint.object;
  }}, target:{get:function() {
    return this.constraint.target;
  }, set:function(a) {
    console.warn("THREE.SelectionControls: target is now immutable. Use target.set() instead.");
    this.constraint.target.copy(a);
  }}, minDistance:{get:function() {
    return this.constraint.minDistance;
  }, set:function(a) {
    this.constraint.minDistance = a;
  }}, maxDistance:{get:function() {
    return this.constraint.maxDistance;
  }, set:function(a) {
    this.constraint.maxDistance = a;
  }}, minZoom:{get:function() {
    return this.constraint.minZoom;
  }, set:function(a) {
    this.constraint.minZoom = a;
  }}, maxZoom:{get:function() {
    return this.constraint.maxZoom;
  }, set:function(a) {
    this.constraint.maxZoom = a;
  }}, minPolarAngle:{get:function() {
    return this.constraint.minPolarAngle;
  }, set:function(a) {
    this.constraint.minPolarAngle = a;
  }}, maxPolarAngle:{get:function() {
    return this.constraint.maxPolarAngle;
  }, set:function(a) {
    this.constraint.maxPolarAngle = a;
  }}, minAzimuthAngle:{get:function() {
    return this.constraint.minAzimuthAngle;
  }, set:function(a) {
    this.constraint.minAzimuthAngle = a;
  }}, maxAzimuthAngle:{get:function() {
    return this.constraint.maxAzimuthAngle;
  }, set:function(a) {
    this.constraint.maxAzimuthAngle = a;
  }}, enableDamping:{get:function() {
    return this.constraint.enableDamping;
  }, set:function(a) {
    this.constraint.enableDamping = a;
  }}, dampingFactor:{get:function() {
    return this.constraint.dampingFactor;
  }, set:function(a) {
    this.constraint.dampingFactor = a;
  }}, noZoom:{get:function() {
    console.warn("THREE.SelectionControls: .noZoom has been deprecated. Use .enableZoom instead.");
    return !this.enableZoom;
  }, set:function(a) {
    console.warn("THREE.SelectionControls: .noZoom has been deprecated. Use .enableZoom instead.");
    this.enableZoom = !a;
  }}, noRotate:{get:function() {
    console.warn("THREE.SelectionControls: .noRotate has been deprecated. Use .enableRotate instead.");
    return !this.enableRotate;
  }, set:function(a) {
    console.warn("THREE.SelectionControls: .noRotate has been deprecated. Use .enableRotate instead.");
    this.enableRotate = !a;
  }}, noPan:{get:function() {
    console.warn("THREE.SelectionControls: .noPan has been deprecated. Use .enablePan instead.");
    return !this.enablePan;
  }, set:function(a) {
    console.warn("THREE.SelectionControls: .noPan has been deprecated. Use .enablePan instead.");
    this.enablePan = !a;
  }}, noKeys:{get:function() {
    console.warn("THREE.SelectionControls: .noKeys has been deprecated. Use .enableKeys instead.");
    return !this.enableKeys;
  }, set:function(a) {
    console.warn("THREE.SelectionControls: .noKeys has been deprecated. Use .enableKeys instead.");
    this.enableKeys = !a;
  }}, staticMoving:{get:function() {
    console.warn("THREE.SelectionControls: .staticMoving has been deprecated. Use .enableDamping instead.");
    return !this.constraint.enableDamping;
  }, set:function(a) {
    console.warn("THREE.SelectionControls: .staticMoving has been deprecated. Use .enableDamping instead.");
    this.constraint.enableDamping = !a;
  }}, dynamicDampingFactor:{get:function() {
    console.warn("THREE.SelectionControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.");
    return this.constraint.dampingFactor;
  }, set:function(a) {
    console.warn("THREE.SelectionControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.");
    this.constraint.dampingFactor = a;
  }}});
})();

