import { createElement, render,renderDOM } from './virtualDom';
import domDiff from './domDiff';

const vDom1 = createElement('ul',
    {
        class: 'list',
        style: 'width:300px; height: 300px; background-color: orange'
    },
    [
        createElement('li',{
            class:'item', 'data-index':0
        },[
            createElement('p',{class: 'text'},['第一个列表项'])
        ]),
        createElement('li',{
            class: 'item', 'data-index': 1
            }, [
                createElement('p',{
                    class: 'text',
                },[
                    createElement('span',{
                        class:'title'
                    },[])
                ])
        ]),
        createElement('li',{
            class: 'item',
            'data-index': 2
        },[
            '第三个列表项'
        ])
    ]);

const vDom2 = createElement('ul',{
    class: 'list-wrap',
    style: 'width: 300px; height: 300px; background-color: purple;'
},[
    createElement('li',{
        class: 'item',
        'data-index': 0
    },[
        createElement('p',{
            class: 'title'
        },['特殊列表项'])
    ]),
    createElement('li',{
        class: 'item',
        'data-index': 1
    },[createElement('p',{
        class: 'text'
    },[])
    ]),
    createElement('div',{
        class: 'item',
        'data-index': 2
    },['第三个列表项'])
]);

// const newVDom = createElement()
//
// const rDom = render(vDom);
//
// renderDOM(rDom, document.getElementById('app'));

const patches =  domDiff(vDom1, vDom2);

console.log(patches);

