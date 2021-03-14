//建立补丁
const patches = {
    0: [
        //第0项有可能有多个改变，也就是补丁
        {
            type: 'ATTR',
            attr: 'list-wrap'
        }
    ],
    2:[
        {
            type: 'ATTR',
            attr: 'title'
        }
    ],
    3:[
        {
            type: 'TEXT',
            attr: ''
        }
    ],
    6:[
        {
            type: 'REMOVE',
            index: 6
        }
    ],
    7: [
        {
            type: 'REPLACE',
            newNode: newNode
        }
    ]
}