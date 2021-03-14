import {
    ATTR,
    TEXT,
    REPLACE,
    REMOVE
} from './patchTypes';


let patches = {};
let nodeIdx = 0;


function domDiff (oldVDom, newVDom) {
    vNodeWalk(oldVDom, newVDom, nodeIdx);
    return patches;
}


//一个节点的walk函数，index表示当前节点的标号
function vNodeWalk (oldNode, newNode, index) {
    //每个节点都要有一个自己的补丁
    console.log(oldNode,newNode,index);
    let vnPatch = [];

    //以下四种情况分别对应四个patchTypes：REMOVE,TEXT,ATTR,REPLACE
    if(!newNode){
        vnPatch.push({
            type: REMOVE,
            index: index
        })
    } else if(typeof oldNode === 'string' && typeof newNode === 'string'){
        if(oldNode !== newNode){
            vnPatch.push({
                type: TEXT,
                text: newNode
            })
        }
    } else if(oldNode.type === newNode.type) {
        //如果两个节点的类型一致，就遍历它们的属性
        const attrPatch = attrsWalk(oldNode.props, newNode.props);

        if(Object.keys(attrPatch).length > 0){
            vnPatch.push({
                type: ATTR,
                attrs: attrPatch
            })
        }

        childrenWalk(oldNode.children, newNode.children);
    } else {
        //如果两个节点类型不相同，直接替换
        vnPatch.push({
            type: REPLACE,
            newNode: newNode
        })
    }

    //将当前节点的补丁数组填入总的patches对象
    if(vnPatch.length > 0){
        patches[index] = vnPatch;
    }
}

//遍历新旧节点的属性
function attrsWalk(oldAttrs, newAttrs){
    let attrPatch = {};

    for(let key in oldAttrs){
        //修改属性
        if(oldAttrs[key] !== newAttrs[key]){
            attrPatch[key] = newAttrs[key];
        }
    }

    //增加属性
    for(let key in newAttrs){
        if(!oldAttrs.hasOwnProperty(key)){
            attrPatch[key] = newAttrs[key];
        }
    }

    return attrPatch;
}

//遍历children的函数，index会随着递归的顺序深度优先的更新
function childrenWalk (oldChildren, newChildren){
    oldChildren.map((child, index) => {
        vNodeWalk(child, newChildren[index], ++nodeIdx)
    })
}

export default domDiff;