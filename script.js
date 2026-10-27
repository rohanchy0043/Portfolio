const siteConfig = {
  email: "rohanchaudhary0980@gmail.com",
};

document.documentElement.classList.add("js", "motion-ready");

const revealItems = [...document.querySelectorAll("[data-reveal]")];
revealItems.forEach((item, index) => {
  item.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 65}ms`);
});

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const menuButton = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");
if (menuButton && primaryNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    primaryNav.classList.toggle("is-open", !isOpen);
  });
  primaryNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      primaryNav.classList.remove("is-open");
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      primaryNav.classList.remove("is-open");
      menuButton.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!primaryNav.contains(event.target) && !menuButton.contains(event.target)) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      primaryNav.classList.remove("is-open");
    }
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      primaryNav.classList.remove("is-open");
    }
  });
}

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const configuredEmail = siteConfig.email.trim();
if (configuredEmail) {
  document.querySelectorAll("[data-email-link]").forEach((link) => {
    link.href = `mailto:${configuredEmail}`;
    link.hidden = false;
  });
  document.querySelectorAll(".email-separator").forEach((separator) => { separator.hidden = false; });
} else {
  document.querySelectorAll("[data-email-link]").forEach((link) => { link.hidden = true; });
  document.querySelectorAll(".email-separator").forEach((separator) => { separator.hidden = true; });
}

(() => {
  const wordmark = document.querySelector("[data-wordmark]");
  if (!wordmark) return;

  const liveText = wordmark.querySelector(".wordmark-live");
  const prefix = wordmark.querySelector("[data-wordmark-prefix]");
  const suffix = wordmark.querySelector("[data-wordmark-suffix]");
  const cursor = wordmark.querySelector(".wordmark-cursor");
  if (!liveText || !prefix || !suffix || !cursor) return;

  const fullText = "rohan.dev";
  const prefixText = "rohan";
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let timeoutId = 0;
  let generation = 0;

  function cancelTimer() {
    window.clearTimeout(timeoutId);
    timeoutId = 0;
  }

  function setText(length) {
    prefix.textContent = fullText.slice(0, Math.min(length, prefixText.length));
    suffix.textContent = length > prefixText.length ? fullText.slice(prefixText.length, length) : "";
  }

  function setStatic() {
    generation += 1;
    cancelTimer();
    setText(fullText.length);
    liveText.classList.remove("is-fading", "is-empty");
    cursor.hidden = true;
  }

  function schedule(callback, delay, token) {
    timeoutId = window.setTimeout(() => {
      timeoutId = 0;
      if (token === generation && !motionPreference.matches) callback();
    }, delay);
  }

  function startLoop() {
    generation += 1;
    cancelTimer();
    const token = generation;
    let typedLength = 0;

    setText(0);
    liveText.classList.remove("is-fading", "is-empty");
    cursor.hidden = false;

    function typeNext() {
      typedLength += 1;
      setText(typedLength);
      if (typedLength < fullText.length) {
        schedule(typeNext, 110, token);
      } else {
        schedule(fadeAndClear, 5000, token);
      }
    }

    function fadeAndClear() {
      liveText.classList.add("is-fading");
      schedule(() => {
        setText(0);
        liveText.classList.remove("is-fading");
        liveText.classList.add("is-empty");
        schedule(startLoop, 450, token);
      }, 280, token);
    }

    schedule(typeNext, 110, token);
  }

  if (motionPreference.matches) setStatic();
  else startLoop();

  motionPreference.addEventListener("change", (event) => {
    if (event.matches) setStatic();
    else startLoop();
  });
})();

(() => {
  const heading = document.querySelector("[data-scramble-name]");
  const visualText = heading?.querySelector("[data-name-visual]");
  if (!heading || !visualText) return;

  const target = Array.from(visualText.textContent.trim());
  const randomCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*?";
  const duration = 1600;
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let frameId = 0;
  let generation = 0;

  function showStatic() {
    generation += 1;
    window.cancelAnimationFrame(frameId);
    visualText.textContent = target.join("");
    heading.classList.remove("is-shimmering");
  }

  function startDecode() {
    generation += 1;
    window.cancelAnimationFrame(frameId);
    heading.classList.remove("is-shimmering");

    if (motionPreference.matches) {
      visualText.textContent = target.join("");
      return;
    }

    const token = generation;
    const startTime = performance.now();

    function renderFrame(now) {
      if (token !== generation) return;
      const progress = Math.min((now - startTime) / duration, 1);
      const resolvedCount = Math.floor(progress * target.length);
      visualText.textContent = target.map((character, index) => {
        if (character === " " || index < resolvedCount) return character;
        return randomCharacters[Math.floor(Math.random() * randomCharacters.length)];
      }).join("");

      if (progress >= 1) {
        visualText.textContent = target.join("");
        heading.classList.add("is-shimmering");
      } else {
        frameId = window.requestAnimationFrame(renderFrame);
      }
    }

    frameId = window.requestAnimationFrame(renderFrame);
  }

  if (motionPreference.matches) showStatic();
  else startDecode();

  motionPreference.addEventListener("change", (event) => {
    if (event.matches) showStatic();
    else startDecode();
  });
})();

(() => {
  "use strict";

  // Behavior and appearance reference: Fayaz Ahmed's robot-heads (MIT).
  // This is an independent vanilla Canvas 2D recreation; package code is not bundled.
  // https://github.com/fayazara/robot-heads

  const stage = document.querySelector("[data-robot-stage]");
  if (!stage) return;

  let canvas = stage.querySelector("canvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.className = "robot-canvas";
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label", "Animated robot avatar for Rohan Chaudhary");
    stage.prepend(canvas);
  }
  const context = canvas?.getContext("2d", { alpha: true });
  if (!canvas || !context) return;
  stage.querySelector(".robot-fallback")?.remove();
  Object.assign(canvas.style, {
    position: "absolute", top: "-20%", left: "-14%", display: "block",
    width: "128%", height: "140%", overflow: "visible", pointerEvents: "none",
  });

  // The source component's documented default is a 160px resting box. The
  // antenna, side knobs, and floor shadow may extend beyond that box.
  const BASE_SIZE = 160;
  const DPR_LIMIT = 2;
  const pointer = { x: 0, y: 0, active: false };
  const pose = { gazeX: 0, gazeY: 0, yaw: 0, pitch: 0, tilt: 0 };
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let width = 0;
  let height = 0;
  let scale = 1;
  let pixelRatio = 1;
  let frame = 0;
  let previousTime = 0;
  let elapsed = 0;
  let resizeFrame = 0;
  let lastBlink = -5;
  let blinkStart = -1;
  let clickTime = -10;
  let running = false;
  let resizeObserver = null;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const mix = (a, b, amount) => a + (b - a) * amount;
  const ease = (from, to, amount) => mix(from, to, 1 - Math.exp(-amount));

  function measure() {
    const box = stage.getBoundingClientRect();
    const canvasBox = canvas.getBoundingClientRect();
    if (!box.width || !box.height || !canvasBox.width || !canvasBox.height) return;

    width = box.width;
    height = box.height;
    scale = width / BASE_SIZE;
    pixelRatio = Math.min(DPR_LIMIT, window.devicePixelRatio || 1);

    const backingWidth = Math.max(1, Math.round(canvasBox.width * pixelRatio));
    const backingHeight = Math.max(1, Math.round(canvasBox.height * pixelRatio));
    if (canvas.width !== backingWidth || canvas.height !== backingHeight) {
      canvas.width = backingWidth;
      canvas.height = backingHeight;
    }
    canvas._origin = {
      x: (box.left + box.width / 2 - canvasBox.left) / scale,
      y: (box.top + box.height / 2 - canvasBox.top) / scale,
    };
  }

  function roundRect(ctx, x, y, w, h, radius) {
    const r = Math.min(radius, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function gradient(ctx, x0, y0, x1, y1, stops) {
    const value = ctx.createLinearGradient(x0, y0, x1, y1);
    for (const [at, color] of stops) value.addColorStop(at, color);
    return value;
  }

  function drawKnob(ctx, x, y, direction, light) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(direction, 1);

    const shell = ctx.createRadialGradient(-4, -6, 1, 0, 0, 14);
    shell.addColorStop(0, "#e3e9f5");
    shell.addColorStop(0.18, "#a9b9d8");
    shell.addColorStop(0.54, "#637aa8");
    shell.addColorStop(0.82, "#354c7b");
    shell.addColorStop(1, "#202b48");
    ctx.fillStyle = "rgba(8, 13, 25, .34)";
    ctx.beginPath();
    ctx.ellipse(2, 5, 15, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(0, 0, 13.5, 13.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = shell;
    ctx.fill();
    ctx.lineWidth = 1.15;
    ctx.strokeStyle = "rgba(234, 241, 255, .62)";
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(0, 0, 8, 8, 0, 0, Math.PI * 2);
    ctx.fillStyle = gradient(ctx, -7, -6, 7, 7, [[0, "#8fa2c4"], [0.55, "#596d96"], [1, "#354669"]]);
    ctx.fill();
    ctx.strokeStyle = "rgba(19, 27, 45, .48)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(-2.8, -3.4, 3.1, 1.7, -0.55, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, .65)";
    ctx.fill();
    if (light) {
      ctx.beginPath();
      ctx.arc(0, 0, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = "#c4e0ff";
      ctx.fill();
    }
    ctx.restore();
  }

  function drawAntenna(ctx, tick, hop) {
    const sway = motionPreference.matches ? 0 : Math.sin(tick * 2.4) * 2.2 + pose.yaw * 9 + hop * 11;
    const tipX = sway;
    const baseY = -42;
    const tipY = -77 - hop * 3;

    ctx.save();
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(0, baseY);
    ctx.bezierCurveTo(sway * 0.12 - 3, -54, sway * 0.66 + 2, -60, tipX, tipY + 6);
    ctx.strokeStyle = "rgba(8, 14, 27, .5)";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-1.1, baseY);
    ctx.bezierCurveTo(sway * 0.12 - 4, -54, sway * 0.66 + 1, -60, tipX - 1, tipY + 6);
    ctx.strokeStyle = gradient(ctx, -5, -57, 4, -57, [[0, "#6b7b9d"], [0.45, "#dce5f4"], [1, "#8292b0"]]);
    ctx.lineWidth = 3.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, baseY + 2, 6.5, 0, Math.PI * 2);
    ctx.fillStyle = gradient(ctx, -6, -49, 6, -36, [[0, "#f0f4fb"], [0.35, "#9caecc"], [1, "#4c618a"]]);
    ctx.fill();

    const bulb = ctx.createRadialGradient(tipX - 3, tipY - 4, 1, tipX, tipY, 10);
    bulb.addColorStop(0, "#fbffff");
    bulb.addColorStop(0.22, "#bdeeff");
    bulb.addColorStop(0.58, "#5dd6f2");
    bulb.addColorStop(1, "#1387be");
    ctx.shadowColor = "rgba(52, 200, 245, .7)";
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(tipX, tipY, 6.2, 0, Math.PI * 2);
    ctx.fillStyle = bulb;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(233, 250, 255, .8)";
    ctx.stroke();
    ctx.restore();
  }

  function drawEye(ctx, centerX, centerY, gazeX, gazeY, blink, happy) {
    if (blink > 0.82) {
      ctx.beginPath();
      ctx.moveTo(centerX - 7, centerY);
      ctx.quadraticCurveTo(centerX, centerY + 2.5, centerX + 7, centerY);
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = "#75c9ff";
      ctx.stroke();
      return;
    }

    if (happy) {
      const pattern = ["00100", "01010", "10001"];
      ctx.fillStyle = "#d5f2ff";
      ctx.shadowColor = "#4bbcff";
      ctx.shadowBlur = 4;
      for (let row = 0; row < pattern.length; row += 1) {
        for (let col = 0; col < pattern[row].length; col += 1) {
          if (pattern[row][col] !== "1") continue;
          ctx.beginPath();
          ctx.arc(centerX + (col - 2) * 2.7 + gazeX, centerY + (row - 1) * 3.2 + gazeY, 1.18, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.shadowBlur = 0;
      return;
    }

    const height = 9 * (1 - blink * 0.9);
    const cols = 5;
    const rows = 4;
    const stepX = 2.45;
    const stepY = height / (rows - 1);
    const radius = 1.12;
    const ledGlow = ctx.createRadialGradient(centerX, centerY, 1, centerX, centerY, 12);
    ledGlow.addColorStop(0, "rgba(74, 190, 255, .25)");
    ledGlow.addColorStop(1, "rgba(74, 190, 255, 0)");
    ctx.fillStyle = ledGlow;
    ctx.fillRect(centerX - 11, centerY - 8, 22, 17);

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const x = centerX + (col - (cols - 1) / 2) * stepX + gazeX * 1.55;
        const y = centerY + (row - (rows - 1) / 2) * stepY + gazeY * 1.2;
        const radiusScale = row === 0 || row === rows - 1 ? 0.86 : 1;
        ctx.beginPath();
        ctx.arc(x, y, radius * radiusScale, 0, Math.PI * 2);
        ctx.fillStyle = row === 0 ? "#8bd8ff" : "#d5f2ff";
        ctx.shadowColor = "#4bbcff";
        ctx.shadowBlur = 4;
        ctx.fill();
      }
    }
    ctx.shadowBlur = 0;
  }

  function drawFace(ctx, blink, happy) {
    // A dark, slightly recessed glass panel with a crisp LED pixel matrix.
    roundRect(ctx, -43, -29, 86, 57, 12);
    ctx.fillStyle = gradient(ctx, 0, -29, 0, 28, [[0, "#101a2e"], [0.52, "#080e1c"], [1, "#121d32"]]);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#172541";
    ctx.stroke();

    roundRect(ctx, -38.5, -24.5, 77, 48, 9);
    ctx.fillStyle = gradient(ctx, -30, -24, 30, 24, [[0, "#07101f"], [0.6, "#0c1728"], [1, "#08111f"]]);
    ctx.fill();

    // Faint LED-cell grid gives the face the matrix texture in the source.
    ctx.fillStyle = "rgba(71, 128, 176, .13)";
    for (let x = -34; x <= 34; x += 5.5) {
      for (let y = -19; y <= 18; y += 5.5) {
        ctx.beginPath();
        ctx.arc(x, y, 0.62, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    drawEye(ctx, -17, -2, pose.gazeX, pose.gazeY, blink, happy);
    drawEye(ctx, 17, -2, pose.gazeX, pose.gazeY, blink, happy);
    if (happy) {
      ctx.save();
      ctx.shadowColor = "#4bbcff";
      ctx.shadowBlur = 4;
      ctx.fillStyle = "#d5f2ff";
      for (const [x, y] of [[-5, 11], [-3, 13], [-1, 14], [1, 14], [3, 13], [5, 11]]) {
        ctx.beginPath();
        ctx.arc(x, y, 1.12, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // Softbox reflection across the glass; it moves subtly as the head turns.
    ctx.save();
    roundRect(ctx, -38.5, -24.5, 77, 48, 9);
    ctx.clip();
    const shift = -pose.yaw * 14;
    const reflection = ctx.createLinearGradient(-35 + shift, -24, 15 + shift, 24);
    reflection.addColorStop(0, "rgba(231, 244, 255, 0)");
    reflection.addColorStop(0.38, "rgba(231, 244, 255, 0)");
    reflection.addColorStop(0.46, "rgba(231, 244, 255, .10)");
    reflection.addColorStop(0.53, "rgba(231, 244, 255, 0)");
    reflection.addColorStop(0.66, "rgba(231, 244, 255, .035)");
    reflection.addColorStop(0.72, "rgba(231, 244, 255, 0)");
    ctx.fillStyle = reflection;
    ctx.fillRect(-42, -28, 84, 56);
    ctx.restore();
  }

  function drawRobot(time, dt) {
    const reduced = motionPreference.matches;
    const idleX = reduced ? 0 : Math.sin(time * 0.55) * 0.12 + Math.sin(time * 0.19) * 0.05;
    const idleY = reduced ? 0 : Math.sin(time * 0.39) * 0.08;
    const targetX = pointer.active && !reduced ? pointer.x * 0.44 : idleX;
    const targetY = pointer.active && !reduced ? pointer.y * 0.34 : idleY;
    if (reduced) {
      pose.gazeX = pose.gazeY = pose.yaw = pose.pitch = 0;
    } else {
      pose.gazeX = ease(pose.gazeX, targetX, dt * 5.5);
      pose.gazeY = ease(pose.gazeY, targetY, dt * 5.5);
      pose.yaw = ease(pose.yaw, targetX, dt * 4.5);
      pose.pitch = ease(pose.pitch, targetY * 0.72, dt * 4.2);
    }

    let blink = 0;
    if (!reduced) {
      const blinkCycle = (time + 1.25) % 4.35;
      if (blinkCycle < 0.2) {
        blink = Math.sin((blinkCycle / 0.2) * Math.PI);
        lastBlink = time;
      } else if (time - lastBlink > 7.4 && blinkStart < 0) {
        blinkStart = time;
      }
      if (blinkStart >= 0) {
        const fastBlink = time - blinkStart;
        if (fastBlink < 0.42) blink = Math.max(blink, Math.sin((fastBlink / 0.42) * Math.PI));
        else { blinkStart = -1; lastBlink = time; }
      }
    }

    const clickAge = reduced ? 10 : Math.max(0, time - clickTime);
    const hop = clickAge < 1.1 ? Math.exp(-clickAge * 2.65) * Math.sin(clickAge * 8.2) : 0;
    const hopLift = clickAge < 1.1 ? Math.max(0, Math.sin(clickAge * 5.4)) * Math.exp(-clickAge * 2.5) : 0;
    const idleHop = !reduced ? Math.max(0, Math.sin(time * 0.48 - 1.2)) ** 10 * 2.3 : 0;
    const bounce = -hopLift * 15 - idleHop;
    const spin = clickAge < 0.9 ? clamp(clickAge / 0.9, 0, 1) * Math.PI * 2 : 0;
    const tilt = reduced ? 0 : Math.sin(time * 0.72) * 0.018 + pose.yaw * -0.065 + spin + hop * 0.06;

    const origin = canvas._origin || { x: 0, y: 0 };
    context.setTransform(pixelRatio * scale, 0, 0, pixelRatio * scale, 0, 0);
    context.clearRect(0, 0, canvas.width / (pixelRatio * scale), canvas.height / (pixelRatio * scale));
    context.save();
    context.translate(origin.x, origin.y);

    // A soft floor shadow anchors the floating head without clipping its hop.
    const shadowY = 71 + (bounce < 0 ? -bounce * 0.42 : 0);
    const shadowScale = Math.max(0.72, 1 - Math.abs(bounce) * 0.018);
    context.save();
    context.translate(0, shadowY);
    context.scale(shadowScale, 0.17);
    const shadow = context.createRadialGradient(0, 0, 3, 0, 0, 58);
    shadow.addColorStop(0, "rgba(17, 23, 38, .30)");
    shadow.addColorStop(0.5, "rgba(17, 23, 38, .12)");
    shadow.addColorStop(1, "rgba(17, 23, 38, 0)");
    context.fillStyle = shadow;
    context.beginPath();
    context.arc(0, 0, 58, 0, Math.PI * 2);
    context.fill();
    context.restore();

    context.translate(0, bounce);
    context.rotate(tilt);
    context.scale(Math.max(0.86, Math.cos(pose.yaw * 0.78)), Math.max(0.97, Math.cos(pose.pitch * 0.7)));

    // Antenna sits behind the shell and flexes when the robot moves.
    drawAntenna(context, time, hopLift);

    // Ears are drawn before the casing so their bases tuck into the shell.
    drawKnob(context, -55, 5, -1, false);
    drawKnob(context, 55, 5, 1, false);

    // Dark cast shadow and the visible side wall make the casing read as 3D.
    context.save();
    context.shadowColor = "rgba(12, 17, 29, .32)";
    context.shadowBlur = 15;
    context.shadowOffsetY = 8;
    roundRect(context, -53, -42, 106, 88, 16);
    context.fillStyle = "#1b2d54";
    context.fill();
    context.restore();

    context.beginPath();
    context.moveTo(43, -39);
    context.lineTo(54, -34);
    context.quadraticCurveTo(59, -30, 59, -22);
    context.lineTo(59, 30);
    context.quadraticCurveTo(58, 39, 50, 44);
    context.lineTo(43, 46);
    context.closePath();
    context.fillStyle = gradient(context, 43, -30, 60, 12, [[0, "#425b8a"], [0.44, "#243a67"], [1, "#152444"]]);
    context.fill();
    context.strokeStyle = "rgba(210, 224, 249, .24)";
    context.lineWidth = 1;
    context.stroke();

    const shell = context.createLinearGradient(-52, -43, 49, 48);
    shell.addColorStop(0, "#7790bd");
    shell.addColorStop(0.1, "#526eaa");
    shell.addColorStop(0.38, "#354f91");
    shell.addColorStop(0.74, "#263e7a");
    shell.addColorStop(1, "#1d3266");
    roundRect(context, -55, -45, 110, 90, 16);
    context.fillStyle = shell;
    context.fill();
    context.lineWidth = 1.5;
    context.strokeStyle = "rgba(223, 234, 255, .58)";
    context.stroke();

    // Rolled top and lower lips catch a cool studio highlight.
    context.save();
    roundRect(context, -51, -41, 102, 82, 13);
    context.clip();
    context.fillStyle = gradient(context, 0, -45, 0, -27, [[0, "rgba(255,255,255,.44)"], [0.45, "rgba(220,235,255,.15)"], [1, "rgba(220,235,255,0)"]]);
    context.fillRect(-52, -46, 104, 19);
    context.fillStyle = gradient(context, 0, 34, 0, 47, [[0, "rgba(6,13,31,0)"], [1, "rgba(6,13,31,.32)"]]);
    context.fillRect(-55, 34, 110, 15);
    context.restore();

    // Bezel surrounds the inset LED glass.
    roundRect(context, -45, -31, 90, 62, 11);
    context.fillStyle = gradient(context, -44, -31, 44, 31, [[0, "#26324a"], [0.2, "#111a2c"], [0.75, "#18243b"], [1, "#0e1728"]]);
    context.fill();
    context.lineWidth = 1.1;
    context.strokeStyle = "rgba(189, 207, 240, .4)";
    context.stroke();
    drawFace(context, blink, clickAge < 0.95);

    // Four tiny recessed fasteners and fine side grooves finish the shell.
    for (const [x, y] of [[-48, -37], [48, -37], [-48, 37], [48, 37]]) {
      context.beginPath();
      context.arc(x, y, 2.1, 0, Math.PI * 2);
      context.fillStyle = "#1a2b4e";
      context.fill();
      context.beginPath();
      context.arc(x - 0.45, y - 0.5, 0.55, 0, Math.PI * 2);
      context.fillStyle = "rgba(230, 240, 255, .7)";
      context.fill();
    }
    context.strokeStyle = "rgba(181, 199, 230, .3)";
    context.lineWidth = 1;
    for (let index = 0; index < 3; index += 1) {
      context.beginPath();
      context.moveTo(-48 + index * 4, 29);
      context.lineTo(-48 + index * 4, 33);
      context.stroke();
      context.beginPath();
      context.moveTo(40 + index * 4, 29);
      context.lineTo(40 + index * 4, 33);
      context.stroke();
    }

    // A curved edge reflection gives the glossy, rolled shell a clear coat.
    context.beginPath();
    context.moveTo(-42, -35);
    context.quadraticCurveTo(-37, -42, -25, -42);
    context.strokeStyle = "rgba(255,255,255,.35)";
    context.lineWidth = 1.2;
    context.stroke();
    context.restore();
    context.restore();
  }

  function triggerHop() {
    if (motionPreference.matches) return;
    clickTime = elapsed;
  }

  function trackPointer(event) {
    const box = stage.getBoundingClientRect();
    if (!box.width || !box.height) return;
    const dx = event.clientX - (box.left + box.width / 2);
    const dy = event.clientY - (box.top + box.height / 2);
    if (Math.hypot(dx, dy) > 700) { pointer.active = false; return; }
    pointer.x = clamp(dx / (box.width / 2), -1, 1);
    pointer.y = clamp(dy / (box.height / 2), -1, 1);
    pointer.active = true;
  }

  function clearPointer() { pointer.active = false; }

  function tick(timestamp) {
    if (!running || document.hidden) return;
    const dt = previousTime ? Math.min(0.05, (timestamp - previousTime) / 1000) : 0;
    previousTime = timestamp;
    elapsed += dt;
    const box = stage.getBoundingClientRect();
    if (Math.abs(box.width - width) > 0.25 || Math.abs(box.height - height) > 0.25) measure();
    drawRobot(elapsed, dt);
    frame = window.requestAnimationFrame(tick);
  }

  function start() {
    if (running) return;
    running = true;
    previousTime = 0;
    if (motionPreference.matches) {
      drawRobot(elapsed, 0);
      return;
    }
    frame = window.requestAnimationFrame(tick);
  }

  function stop() {
    running = false;
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
  }

  function refreshMotion() {
    stop();
    drawRobot(elapsed, 0);
    if (!motionPreference.matches && !document.hidden) start();
  }

  function queueResize() {
    window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(() => {
      measure();
      drawRobot(elapsed, 0);
    });
  }

  document.addEventListener("pointermove", trackPointer, { passive: true });
  document.addEventListener("pointerleave", clearPointer, { passive: true });
  window.addEventListener("blur", clearPointer, { passive: true });
  stage.addEventListener("click", triggerHop);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else refreshMotion();
  });
  if (motionPreference.addEventListener) motionPreference.addEventListener("change", refreshMotion);
  else motionPreference.addListener(refreshMotion);

  if ("ResizeObserver" in window) {
    resizeObserver = new ResizeObserver(() => {
      measure();
      drawRobot(elapsed, 0);
    });
    resizeObserver.observe(stage);
    // Keep a strong reference: some browsers collect an unreferenced observer.
    stage.__robotResizeObserver = resizeObserver;
  }
  window.addEventListener("resize", queueResize, { passive: true });
  window.visualViewport?.addEventListener("resize", queueResize, { passive: true });

  measure();
  drawRobot(0, 0);
  if (!motionPreference.matches) start();
})();
