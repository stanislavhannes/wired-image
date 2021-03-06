var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { WiredBase, BaseCSS } from "wired-lib/lib/wired-base";
import { rectangle, line } from "wired-lib";
import { customElement, property, css, html } from "lit-element";
const EMPTY_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
let WiredImage = class WiredImage extends WiredBase {
    constructor() {
        super();
        this.elevation = 1;
        this.src = EMPTY_IMAGE;
        this.alt = "";
        if (window.ResizeObserver) {
            this.resizeObserver = new window.ResizeObserver(() => {
                if (this.svg) {
                    this.wiredRender();
                }
            });
        }
    }
    static get styles() {
        return [
            BaseCSS,
            css `
        :host {
          display: inline-block;
          position: relative;
          line-height: 1;
          padding: 3px;
        }
        img {
          display: block;
          box-sizing: border-box;
          max-width: 100%;
          max-height: 100%;
        }
        path {
          stroke-width: 1;
        }
      `
        ];
    }
    render() {
        return html `
      <img src="${this.src}" alt="${this.alt}" />
      <div id="overlay"><svg></svg></div>
    `;
    }
    updated() {
        super.updated();
        this.attachResizeListener();
    }
    disconnectedCallback() {
        this.detachResizeListener();
    }
    attachResizeListener() {
        if (this.resizeObserver && this.resizeObserver.observe) {
            this.resizeObserver.observe(this);
        }
        else if (!this.windowResizeHandler) {
            this.windowResizeHandler = () => this.wiredRender();
            window.addEventListener("resize", this.windowResizeHandler, {
                passive: true
            });
        }
    }
    detachResizeListener() {
        if (this.resizeObserver && this.resizeObserver.unobserve) {
            this.resizeObserver.unobserve(this);
        }
        if (this.windowResizeHandler) {
            window.removeEventListener("resize", this.windowResizeHandler);
        }
    }
    canvasSize() {
        const s = this.getBoundingClientRect();
        const elev = Math.min(Math.max(1, this.elevation), 5);
        const w = s.width + (elev - 1) * 2;
        const h = s.height + (elev - 1) * 2;
        return [w, h];
    }
    draw(svg, size) {
        const elev = Math.min(Math.max(1, this.elevation), 5);
        const s = {
            width: size[0] - (elev - 1) * 2,
            height: size[1] - (elev - 1) * 2
        };
        rectangle(svg, 2, 2, s.width - 4, s.height - 4);
        for (let i = 1; i < elev; i++) {
            line(svg, i * 2, s.height - 4 + i * 2, s.width - 4 + i * 2, s.height - 4 + i * 2).style.opacity = `${(85 - i * 10) / 100}`;
            line(svg, s.width - 4 + i * 2, s.height - 4 + i * 2, s.width - 4 + i * 2, i * 2).style.opacity = `${(85 - i * 10) / 100}`;
            line(svg, i * 2, s.height - 4 + i * 2, s.width - 4 + i * 2, s.height - 4 + i * 2).style.opacity = `${(85 - i * 10) / 100}`;
            line(svg, s.width - 4 + i * 2, s.height - 4 + i * 2, s.width - 4 + i * 2, i * 2).style.opacity = `${(85 - i * 10) / 100}`;
        }
    }
};
__decorate([
    property({ type: Number }),
    __metadata("design:type", Object)
], WiredImage.prototype, "elevation", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], WiredImage.prototype, "src", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], WiredImage.prototype, "alt", void 0);
WiredImage = __decorate([
    customElement("wired-image"),
    __metadata("design:paramtypes", [])
], WiredImage);
export { WiredImage };
