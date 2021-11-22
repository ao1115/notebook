import { friendlyDate } from "../helpers/util"
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
                    console.log(date)
                    let Y = date.getFullYear() + '-';
                    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                    let D = date.getDate() + ' ';
                    console.log(Y + M + D);
                    notebook.createdAt = Y + M + D
                })
                resolve(res)
                console.log(res)
            }).catch(err => {
                reject(err)
            })
        })

    },
    updateNoteBook(noteBookId, { title = "" } = { title: {} }) {
        return request(URL.UPDATE.replace(':id', noteBookId), 'POST', { title })
    },
    deleteNoteBook(noteBookId) {
        return request(URL.DELETE.replace(':id', noteBookId), 'DELETE')
    },
    addNoteBook({ title = "" } = { title: {} }) {
        return request(URL.ADD, 'POST', { title })
    }
}