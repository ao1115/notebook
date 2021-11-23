
import request from "../helpers/request";
const URL = {
    GET: '/notebooks',
    UPDATE: '/notebooks/:id',
    DELETE: '/notebooks/:id',
    ADD: '/notebooks'
}
export default {
    getAll() {
        return new Promise((resolve, reject) => {
            return request(URL.GET,).then(res => {
                res.data = res.data.sort((a, b) => b.createdAt < a.createdAt)
                res.data.forEach(notebook => {
                    let date = new Date(notebook.createdAt)
                    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                    let D = date.getDate() + ' ';
                    let h = date.getHours() + ':';
                    let m = date.getMinutes();
                    notebook.createdAt = M + D + h + m
                })
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })

    },
    updateNoteBook(notebookId, { title = "" } = { title: {} }) {
        return request(URL.UPDATE.replace(':id', notebookId), 'PATCH', { title })
    },
    deleteNoteBook(notebookId) {
        return request(URL.DELETE.replace(':id', notebookId), 'DELETE')
    },
    addNoteBook({ title = "" } = { title: {} }) {
        return request(URL.ADD, 'POST', { title })
    }
}