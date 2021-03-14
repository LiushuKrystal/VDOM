import Element from './Element';

function createElement (type, props, children){
    return new Element(type, props, children);
}

function setAttrs(node, prop, value){
    switch(prop){
        case 'value':
            if(node === 'input' || node === 'textarea'){
                node.value = value;
            }
            else node.setAttribute(prop, value);
            break;
        case 'style':
            node.style.cssText = value;
            break;
        default:
            node.setAttribute(prop, value);
            break;
    }
}

//虚拟DOM转换成真实DOM的函数，返回根Dom节点
function render(vDom){
    const { type, props, children } = vDom,
        el = document.createElement(type);

    for(let key in props){
        setAttrs(el, key, props[key])
    }

    children.map((c) => {
        if(c instanceof Element){
            c = render(c);
        }
        else{
            c = document.createTextNode(c);
        }
        el.appendChild(c);
    })

    return el;
}

function renderDOM(rDom, rootEl){
    rootEl.appendChild(rDom);
}

export { createElement,render,setAttrs,renderDOM };