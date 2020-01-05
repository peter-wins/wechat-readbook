import axios from 'axios'
import { setLocalForage } from '@/utils/localForage'
import { getCategoryName } from '@/utils/book'

export function home () {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_LOCAL_API_URL}/mall`
  })
}

export function categoryList () {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_API_URL}/categoryList`
  })
}

export function detail (book) {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_LOCAL_API_URL}/book/detail`,
    params: {
      fileName: book.fileName
    }
  })
}

export function list () {
  // console.log('list', `${process.env.VUE_APP_LOCAL_API_URL}/book/list`)
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_LOCAL_API_URL}/book/list`
  })
}

export function shelf () {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_LOCAL_API_URL}/book/shelf`
  })
}

export function download (item, onSuccess, onFailed, onError, onProgress) {
  axios.create({
    baseURL: process.env.VUE_APP_EPUB_URL,
    method: 'get',
    responseType: 'blob',
    timeout: 180 * 1000,
    onDownloadProgress: progressEvent => {
      if (onProgress) onProgress(progressEvent)
    }
  }).get(`${getCategoryName(item.category)}/${item.fileName}.epub`)
    .then(res => {
      const blob = new Blob([res.data])
      setLocalForage(item.fileName, blob, () => {
        if (onSuccess) onSuccess(item)
      }, err => {
        if (onFailed) onFailed(err)
      })
    })
    .catch(err => {
      if (onError) onError(err)
    })
}
