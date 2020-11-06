import {IDocument} from '../store/retail/interfaces';

export default class DocumentsService {

  getByType(docs: IDocument[], type: string): IDocument[] {
    return docs.filter(doc => {
      switch (type) {
        case 'default': return doc.tags.includes('generated')
        case 'uploaded': return !doc.tags.includes('generated')
        default: return true
      }
    })
  }

}
