import {
    ATTR,
    TEXT,
    REPLACE,
    REMOVE
} from './patchTypes';
import {setAttrs} from "./virtualDom";
import {render} from "./virtualDom";
import Element from "./Element";

let finalPatches = {},
    rnIndex = 0;

function doPatch (rDom,patches){
    finalPatches = patches;
    rNodeWalk(rDom);
}

function rNodeWalk (rNode) {
    const rnPatch = finalPatches[rnIndex ++],
        childNodes = rNode.childNodes;

    //返回一个NodeList类型，是一个类数组，用展开语法把它展开成数组
    [...childNodes].map((c) => {
        rNodeWalk(c);
    })

    //先处理所有子节点，再对当前节点打补丁
    if(rnPatch){
        patchAction(rNode, rnPatch);
    }
}

function patchAction (rNode,rnPatch){
    rnPatch.map((p) => {
        switch (p.type) {
            case ATTR:
                for (let key in p.attrs){
                    const value = p.attrs[key];

                    if(value) {
                        setAttrs(rNode,key,value);
                    } else{
                        rNode.removeAttribute(key);
                    }
                }
                break;
            case TEXT:
                rNode.textContent = p.text;
                break;
            case REPLACE://类型不同，需要创建节点，这个时候需要先将虚拟DOM转换成真实DOM
                const newNode = (p.newNode instanceof Element)
                                ? render(p.newNode)
                                : document.createTextNode(p.newNode);
                rNode.parentNode.replaceChild(newNode,rNode);
                break;
            case REMOVE:
                rNode.parentNode.removeChild(rNode);
                break;
            default:
                break;
        }
    })
}

export default doPatch;

//vNode = virtual Node
//vnPatch = virtual Node patch
//rNode = real Node
//rnPatch = real Node patch