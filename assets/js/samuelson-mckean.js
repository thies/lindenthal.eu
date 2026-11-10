/*
 * Interactive Samuelson-McKean land value chart (no dependencies).
 *
 * Usage:  <div class="smck" data-sigma="15" data-yv="8" data-rf="5" data-gk="1" data-k="100"
 *              data-sigma2="20"></div>        (data-sigma2 optional: adds comparison curve)
 * All rates in percent. Every .smck element on the page is initialised on load.
 *
 *   eta = [ yV - yK + s^2/2 + sqrt((yK - yV - s^2/2)^2 + 2 yK s^2) ] / s^2,   yK = rf - gK
 *   V*  = K eta / (eta - 1)
 *   Land(V) = (V* - K)(V/V*)^eta   for V < V*,   V - K otherwise
 */
(function () {
	'use strict';

	var COL = { land: '#004586', land2: '#579d1c', npv: '#ff420e', hurdle: '#999999', text: '#004586', axis: '#333333' };
	var W = 820, H = 440, M = { l: 70, r: 15, t: 15, b: 88 };
	var PW = W - M.l - M.r, PH = H - M.t - M.b;
	var uid = 0;

	function eta(sigma, yV, yK) {
		var s2 = sigma * sigma;
		return (yV - yK + s2 / 2 + Math.sqrt(Math.pow(yK - yV - s2 / 2, 2) + 2 * yK * s2)) / s2;
	}

	function model(sigma, yV, rf, gK, K) {
		var yK = rf - gK, e = eta(sigma, yV, yK);
		var ok = isFinite(e) && e > 1.0001;
		var vStar = ok ? K * e / (e - 1) : Infinity;
		return {
			yK: yK, eta: e, ok: ok, vStar: vStar,
			land: function (V) {
				if (!ok) return V;	// eta <= 1: never optimal to build, land worth (almost) V
				return V < vStar ? (vStar - K) * Math.pow(V / vStar, e) : V - K;
			}
		};
	}

	function pickStep(range, maxTicks, steps) {
		for (var i = 0; i < steps.length; i++) if (range / steps[i] <= maxTicks) return steps[i];
		return steps[steps.length - 1];
	}

	function fmt(x, d) { return x.toFixed(d === undefined ? 1 : d); }

	function build(el) {
		var id = 'smck' + (uid++);
		var d = el.dataset;
		var defaults = {
			sigma: +(d.sigma || 15), yv: +(d.yv || 8), rf: +(d.rf || 5), gk: +(d.gk || 1), k: +(d.k || 100),
			sigma2: d.sigma2 !== undefined ? +d.sigma2 : 20, compare: d.sigma2 !== undefined
		};
		var sliders = [
			{ key: 'sigma', label: 'Volatility σ<sub>V</sub>', min: 1, max: 50, step: 1, unit: '%' },
			{ key: 'yv', label: 'Asset yield y<sub>V</sub>', min: 0, max: 15, step: 0.5, unit: '%' },
			{ key: 'rf', label: 'Risk-free r<sub>f</sub>', min: 0, max: 10, step: 0.5, unit: '%' },
			{ key: 'gk', label: 'Constr. cost growth g<sub>K</sub>', min: -5, max: 5, step: 0.5, unit: '%' },
			{ key: 'k', label: 'Construction cost K', min: 50, max: 150, step: 1, unit: '', pre: '$' }
		];

		var html = '<div class="smck-wrap tex2jax_ignore" data-prevent-swipe>' +
			'<svg class="smck-svg" viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '"></svg>' +
			'<div class="smck-panel">';
		sliders.forEach(function (s) {
			html += '<label><span class="smck-lab">' + s.label + '</span><span class="smck-val" data-val="' + s.key + '"></span>' +
				'<input type="range" data-key="' + s.key + '" min="' + s.min + '" max="' + s.max + '" step="' + s.step + '"></label>';
		});
		html += '<label class="smck-cmp"><span class="smck-lab"><input type="checkbox" data-key="compare"> Compare σ<sub>V</sub></span>' +
			'<span class="smck-val" data-val="sigma2"></span>' +
			'<input type="range" data-key="sigma2" min="1" max="50" step="1"></label>' +
			'<div class="smck-out"></div>' +
			'<button type="button" class="smck-reset">Reset</button>' +
			'</div></div>';
		el.innerHTML = html;

		var svg = el.querySelector('svg'), out = el.querySelector('.smck-out');
		var inputs = el.querySelectorAll('input');
		var state = {};

		function setState(p) {
			for (var k in p) state[k] = p[k];
			Array.prototype.forEach.call(inputs, function (inp) {
				var k = inp.dataset.key;
				if (inp.type === 'checkbox') inp.checked = state[k]; else inp.value = state[k];
			});
			render();
		}

		Array.prototype.forEach.call(inputs, function (inp) {
			inp.addEventListener('input', function () {
				state[inp.dataset.key] = inp.type === 'checkbox' ? inp.checked : +inp.value;
				render();
			});
			// keep Reveal from navigating while dragging / using arrow keys on a slider
			inp.addEventListener('keydown', function (e) { e.stopPropagation(); });
		});
		el.querySelector('.smck-reset').addEventListener('click', function () { setState(defaults); });

		function render() {
			var K = state.k;
			var m1 = model(state.sigma / 100, state.yv / 100, state.rf / 100, state.gk / 100, K);
			var m2 = state.compare ? model(state.sigma2 / 100, state.yv / 100, state.rf / 100, state.gk / 100, K) : null;

			// slider readouts
			sliders.forEach(function (s) {
				el.querySelector('[data-val="' + s.key + '"]').textContent = (s.pre || '') + fmt(state[s.key], s.step < 1 ? 1 : 0) + s.unit;
			});
			el.querySelector('[data-val="sigma2"]').textContent = state.sigma2 + '%';
			el.querySelector('input[data-key="sigma2"]').disabled = !state.compare;

			// axes: as in the original figure (V up to 1.5 K), stretched if V* lies further out
			var vMaxNeed = 1.5 * K;
			[m1, m2].forEach(function (m) { if (m && m.ok && m.vStar > 0.96 * vMaxNeed) vMaxNeed = Math.max(vMaxNeed, m.vStar * 1.1); });
			var xStep = pickStep(vMaxNeed, 26, [2, 3, 5, 6, 10, 12, 20, 25, 30, 50, 60, 100, 200, 500]);
			var xMax = Math.ceil(vMaxNeed / xStep) * xStep;
			var yNeed = Math.max(xMax - K, 1) * 1.2;
			var yStep = pickStep(yNeed, 7, [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]);
			var yMax = Math.ceil(yNeed / yStep) * yStep;

			var X = function (v) { return M.l + v / xMax * PW; };
			var Y = function (v) { return M.t + PH - Math.min(v, yMax * 1.05) / yMax * PH; };

			var s = '';
			s += '<defs><clipPath id="' + id + 'c"><rect x="' + M.l + '" y="' + (M.t - 2) + '" width="' + PW + '" height="' + (PH + 4) + '"/></clipPath>' +
				'<marker id="' + id + 'a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
				'<path d="M0,0 L10,5 L0,10 z" fill="' + COL.text + '"/></marker></defs>';

			// frame + ticks
			s += '<rect x="' + M.l + '" y="' + M.t + '" width="' + PW + '" height="' + PH + '" fill="none" stroke="' + COL.axis + '" stroke-width="1"/>';
			for (var yv = 0; yv <= yMax + 1e-9; yv += yStep) {
				s += '<line x1="' + (M.l - 6) + '" x2="' + M.l + '" y1="' + Y(yv) + '" y2="' + Y(yv) + '" stroke="#aaa"/>' +
					'<text x="' + (M.l - 9) + '" y="' + (Y(yv) + 6) + '" text-anchor="end" class="smck-tick">$' + yv + '</text>';
			}
			var minor = xStep / 3;
			for (var xm = 0; xm <= xMax + 1e-9; xm += minor) {
				s += '<line x1="' + X(xm) + '" x2="' + X(xm) + '" y1="' + Y(0) + '" y2="' + (Y(0) + 4) + '" stroke="#aaa"/>';
			}
			for (var xv = 0; xv <= xMax + 1e-9; xv += xStep) {
				var tx = X(xv) + 5, ty = Y(0) + 14;
				s += '<text x="' + tx + '" y="' + ty + '" text-anchor="end" transform="rotate(-45 ' + tx + ' ' + ty + ')" class="smck-tick">$' + Math.round(xv) + '</text>';
			}
			s += '<text x="' + (M.l + PW / 2) + '" y="' + (H - 6) + '" text-anchor="middle" class="smck-axt">Value of built property</text>';

			// curves
			var N = 300, g = '<g clip-path="url(#' + id + 'c)">';
			g += '<polyline fill="none" stroke="' + COL.npv + '" stroke-width="3" points="' +
				X(0) + ',' + Y(0) + ' ' + X(K) + ',' + Y(0) + ' ' + X(xMax) + ',' + Y(xMax - K) + '"/>';
			function curve(m, col) {
				var p = [];
				var vEnd = m.ok ? Math.min(m.vStar, xMax) : xMax;
				for (var i = 0; i <= N; i++) { var v = vEnd * i / N; p.push(X(v).toFixed(1) + ',' + Y(m.land(v)).toFixed(1)); }
				return '<polyline fill="none" stroke="' + col + '" stroke-width="3.5" stroke-linejoin="round" points="' + p.join(' ') + '"/>';
			}
			g += curve(m1, COL.land);
			if (m2) g += curve(m2, COL.land2);
			if (m1.ok && m1.vStar < xMax) {
				g += '<line x1="' + X(m1.vStar) + '" x2="' + X(m1.vStar) + '" y1="' + Y(0) + '" y2="' + Y(m1.vStar - K) +
					'" stroke="' + COL.hurdle + '" stroke-width="3.5" stroke-dasharray="14 10"/>';
			}
			g += '</g>';
			s += g;

			// annotations (label + arrow pointing at (V, value)); labels are nudged so they do not overlap
			var boxes = [];
			function clash(x, y, w) {
				return boxes.some(function (b) { return Math.abs(b.x - x) < (b.w + w) / 2 + 8 && Math.abs(b.y - y) < 28; });
			}
			function note(V, val, text, dx, dy) {
				var px = X(V), py = Y(val);
				if (px < M.l || px > M.l + PW || py < M.t || py > M.t + PH) return '';
				var w = text.length * 10.5;
				var lx = Math.max(M.l + w / 2 + 4, Math.min(M.l + PW - w / 2 - 4, px + dx));
				var ly = Math.max(M.t + 24, py + dy), y0 = ly;
				while (clash(lx, ly, w) && ly > M.t + 24) ly -= 6;
				if (clash(lx, ly, w)) { ly = y0; while (clash(lx, ly, w) && ly < py - 20) ly += 6; }
				boxes.push({ x: lx, y: ly, w: w });
				var sx = lx + w * 0.2, sy = ly + 8;
				var len = Math.hypot(px - sx, py - sy), k = (len - 5) / len;
				return '<text x="' + lx + '" y="' + ly + '" text-anchor="middle" class="smck-note">' + text + '</text>' +
					'<line x1="' + sx + '" y1="' + sy + '" x2="' + (sx + (px - sx) * k) + '" y2="' + (sy + (py - sy) * k) +
					'" stroke="' + COL.text + '" stroke-width="1.5" marker-end="url(#' + id + 'a)"/>';
			}
			var vs = m1.ok ? Math.min(m1.vStar, xMax) : xMax;
			var vn = (xMax - vs >= vs - K) ? vs + 0.6 * (xMax - vs) : K + 0.5 * (vs - K);
			s += note(vn, vn - K, 'NPV of construction', -100, -95);
			if (m1.ok && m1.vStar < xMax) s += note(m1.vStar, m1.vStar - K, 'Development optimal', -140, -100);
			var lab1 = m2 ? 'Land Value @ ' + state.sigma + '%' : 'Land Value';
			if (m1.ok) { var va = m1.vStar * Math.pow(0.21, 1 / m1.eta); s += note(va, m1.land(va), lab1, -120, -100); }
			if (m2 && m2.ok) { var vb = m2.vStar * Math.pow(0.35, 1 / m2.eta); s += note(vb, m2.land(vb), 'Land Value @ ' + state.sigma2 + '%', -120, -105); }

			svg.innerHTML = s;

			// key numbers
			function row(m, tag) {
				if (!m.ok) return '<div>' + tag + 'η = ' + fmt(m.eta, 2) + ' &le; 1: never optimal to build</div>';
				return '<div>' + tag + 'η = ' + fmt(m.eta, 2) + ', V* = $' + fmt(m.vStar) + ' (V*/K = ' + fmt(m.vStar / K, 2) + ')</div>';
			}
			out.innerHTML = '<div>y<sub>K</sub> = r<sub>f</sub> &minus; g<sub>K</sub> = ' + fmt(m1.yK * 100) + '%</div>' +
				row(m1, m2 ? '<b style="color:' + COL.land + '">' + state.sigma + '%:</b> ' : '') +
				(m2 ? row(m2, '<b style="color:' + COL.land2 + '">' + state.sigma2 + '%:</b> ') : '');
		}

		setState(defaults);
	}

	function init() { Array.prototype.forEach.call(document.querySelectorAll('.smck'), build); }
	if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
