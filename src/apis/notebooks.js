import dayjs from "dayjs";
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
                    let date = new Date(notebook.createdAt).toISOString()
                    let d = dayjs(date).format('MM-DD HH:mm')
                    notebook.createdAt = d
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
        return new Promise((resolve, reject) => {
            request(URL.ADD, 'POST', { title }).then(res => {
                let date = new Date(res.data.createdAt).toISOString()
                let d = dayjs(date).format('MM-DD HH:mm')
                res.data.createdAt = d
                resolve(res)
                console.log(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}