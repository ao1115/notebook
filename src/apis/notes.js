import dayjs from "dayjs";
import request from "../helpers/request";
const URL = {
    GET: '/notes/from/:notebookId',
    ADD: '/notes/to/:notebookId',
    DELETE: '/notes/:noteId',
    UPDATE: '/notes/:noteId'
}
export default {
    getAll({ notebookId }) {
        return new Promise((resolve, reject) => {
            return request(URL.GET.replace(':notebookId', notebookId)).then(res => {
                res.data = res.data.map(note => { note.createAt, note.updatedAt; return note }).sort((a, b) => a.updateAt - b.updateAt)
                res.data.forEach(note => {
                    let date = new Date(note.updatedAt).toISOString()
                    let d = dayjs(date).format('MM-DD HH:mm')
                    note.updatedAt = d
                })
                resolve(res)
                console.log(res)
            }).catch(err => {
                reject(err)
            })
        })

    },
    updateNote({ noteId }, { title, content }) {
        return request(URL.UPDATE.replace(':noteId', noteId), 'PATCH', { title, content })
    },
    deleteNote({ noteId }) {
        return request(URL.DELETE.replace(':noteId', noteId), 'DELETE')
    },
    addNote({ notebookId }, { title = "", content = "" } = { title: {}, content: {} }) {
        return new Promise((resolve, reject) => {
            request(URL.ADD.replace(':notebookId', notebookId), 'POST', { title, content }).then(res => {
                let date = new Date(res.data.updatedAt).toISOString()
                let d = dayjs(date).format('MM-DD HH:mm')
                res.data.updatedAt = d
                resolve(res)
                console.log(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}