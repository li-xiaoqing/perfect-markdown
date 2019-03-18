import { insertEnter, insertTab, unInsertTab } from './insert'
const KEYS = {
    ENTER: 13, // enter
    TAB: 9
}

export function keyboardListener(el, $vue) {
    el.addEventListener('keydown', (e) => {
        if (!(e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey) {
            switch (e.keyCode) {
                case KEYS['ENTER']:
                    insertEnter(el, e, $vue)
                    break
                case KEYS['TAB']:
                    insertTab(el, e, $vue)
                    e.preventDefault()
                    break
                default:
                    break
            }
        } else if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey) {
            // ctrl +
        } else if (!(e.ctrlKey || e.metaKey) && e.shiftKey && !e.altKey) {
            // shift +
            switch (e.keyCode) {
                case KEYS['TAB']:
                    unInsertTab(el, e, $vue)
                    e.preventDefault()
                    break
                default:
                    break
            }
        }
    })
}
