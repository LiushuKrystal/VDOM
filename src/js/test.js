//建立补丁
const patches = {
    0: [
        //第0项有可能有多个改变，也就是补丁
        {
            type: 'ATTR',
            attrs: {
                class: 'list-wrap'
            }
        }
    ],
    2:[
        {
            type: 'ATTR',
            attrs: {
                class: 'title'
            }
        }
    ],
    3:[
        {
            type: 'TEXT',
            attrs: {

            }
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