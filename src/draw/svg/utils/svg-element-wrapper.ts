export default class SVGElementWrapper {
    private readonly proxy;
    public constructor(public element: SVGElement) {
        this.proxy = new Proxy(this, {
            get: (proxy, name: PropertyKey) => {
                if (this.hasOwnProperty(name)) {
                    // @ts-ignore
                    return this[name];
                }
                // @ts-ignore
                if (this[name]) {
                    // @ts-ignore
                    return this[name].bind(this);
                }
                // @ts-ignore
                return proxy.element[name].bind(this.element);
            },
            set: (proxy, name, value) => {
                // @ts-ignore
                proxy.element[name] = value;
                return true;
            }
        });
        return this.proxy;
    }
    public appChild_(child: SVGElement | SVGElementWrapper): SVGElementWrapper {
        if (child instanceof SVGElement) {
            this.element.appendChild(child);
        } else {
            this.element.appendChild(child.element);
        }
        return this.proxy;
    }

    public prepChild_(child: SVGElement | SVGElementWrapper): SVGElementWrapper {
        if (child instanceof SVGElement) {
            this.element.insertBefore(child, this.element.childNodes[0]);
        } else {
            this.element.insertBefore(child.element, this.element.childNodes[0]);
        }
        return this.proxy;
    }

    public setAttrib_(attr: string, value: string): SVGElementWrapper {
        this.element.setAttribute(attr, value);
        return this.proxy;
    }
    public rm_() {
        this.element.remove();
        return this.proxy;
    }

    /**
     * @param name - event name
     * @param handler - event handler
     * @return Proxy - proxy for this element
     */
    public addEvtListen_(name: string, handler: (evt: Event) => void) {
        this.element.addEventListener(name, handler);
        return this.proxy;
    }
}
